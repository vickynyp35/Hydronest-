import os, sqlite3, secrets
from functools import wraps
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder="static", static_url_path="/static")
DB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "hydronest.db")
PINS = {os.environ.get("OWNER_PIN", "1234"): "owner", os.environ.get("CARETAKER_PIN", "0000"): "caretaker"}
SENSOR_KEY = os.environ.get("SENSOR_KEY", "hydronest-demo")
TOKENS = {}  # token -> role (in memory; cleared on restart)

def db():
    c = sqlite3.connect(DB)
    c.row_factory = sqlite3.Row
    return c

with db() as c:
    c.executescript("""
    CREATE TABLE IF NOT EXISTS readings(id INTEGER PRIMARY KEY, tank TEXT, level REAL, outflow REAL, sim_min INTEGER, src TEXT DEFAULT 'sim', ts DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS alerts(id INTEGER PRIMARY KEY, tank TEXT, kind TEXT, pct INTEGER, at TEXT, ts DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS daily(id INTEGER PRIMARY KEY, used REAL, ts DEFAULT CURRENT_TIMESTAMP);
    """)

def login_required(f):
    @wraps(f)
    def w(*a, **k):
        if request.headers.get("X-Token", "") not in TOKENS:
            return jsonify(error="login required"), 401
        return f(*a, **k)
    return w

@app.get("/")
def home():
    return send_from_directory("static", "index.html")

@app.get("/style.css")
def css():
    return send_from_directory("static", "style.css")

@app.get("/script.js")
def js():
    return send_from_directory("static", "script.js")

@app.post("/api/login")
def login():
    role = PINS.get(str((request.get_json(force=True) or {}).get("pin", "")))
    if not role:
        return jsonify(error="wrong pin"), 401
    t = secrets.token_hex(16)
    TOKENS[t] = role
    return jsonify(role=role, token=t)

@app.post("/api/readings")
@login_required
def add_readings():
    d = request.get_json(force=True)
    with db() as c:
        c.executemany("INSERT INTO readings(tank,level,outflow,sim_min) VALUES(?,?,?,?)",
                      [(t["n"], t["v"], t["out"], d["min"]) for t in d["tanks"]])
        c.execute("DELETE FROM readings WHERE id < (SELECT MAX(id) - 5000 FROM readings)")
    return jsonify(ok=True)

@app.post("/api/alerts")
@login_required
def add_alert():
    d = request.get_json(force=True)
    with db() as c:
        c.execute("INSERT INTO alerts(tank,kind,pct,at) VALUES(?,?,?,?)", (d["tank"], d["kind"], d["pct"], d["at"]))
    return jsonify(ok=True)

@app.post("/api/daily")
@login_required
def add_daily():
    with db() as c:
        c.execute("INSERT INTO daily(used) VALUES(?)", (float(request.get_json(force=True)["used"]),))
    return jsonify(ok=True)

@app.get("/api/history")
def history():
    with db() as c:
        rows = c.execute("SELECT used FROM daily ORDER BY id DESC LIMIT 7").fetchall()
    return jsonify(days=[r["used"] for r in reversed(rows)])

@app.post("/api/sensor")
def sensor():
    """Real hardware endpoint (ESP32). Header X-Sensor-Key, JSON: {"tank":"Home","level_pct":63.5}"""
    if request.headers.get("X-Sensor-Key") != SENSOR_KEY:
        return jsonify(error="bad sensor key"), 401
    d = request.get_json(force=True)
    with db() as c:
        c.execute("INSERT INTO readings(tank,level,outflow,sim_min,src) VALUES(?,?,?,?,?)",
                  (d["tank"], float(d["level_pct"]), 0, -1, "esp32"))
    return jsonify(ok=True)

@app.get("/api/stats")
def stats():
    with db() as c:
        r = c.execute("SELECT COUNT(*) FROM readings").fetchone()[0]
        a = c.execute("SELECT COUNT(*) FROM alerts").fetchone()[0]
        last = [dict(x) for x in c.execute("SELECT tank,kind,pct,at FROM alerts ORDER BY id DESC LIMIT 5")]
    return jsonify(readings=r, alerts=a, last_alerts=last)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
