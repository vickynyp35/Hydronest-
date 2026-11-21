# HydroNest

Smart water tank monitoring and management system (web app prototype).

**Status:** the prototype runs on **simulated sensor data**. No hardware is connected yet. Sensor-based monitoring with ESP32 + HC-SR04 is the planned next phase.

## Features
- Multi-tank dashboard (Home, School, Village) with level %, litres and "empty / full in X hours" prediction
- Leak detection: night-time outflow with the motor OFF is flagged as a possible leak
- Auto motor control: ON below 20%, OFF at 90%, every start and stop is logged
- Daily limit alerts (editable), smart tips, 0-100 water-saving score and leaderboard
- Yesterday vs today: water saved or extra used, with money in rupees (editable rate)
- Usage by tank, 7-day chart, PDF monthly report
- Tamil / English, Owner and Caretaker PIN login

## Tech
HTML, CSS, JavaScript (frontend) | Python Flask (API) | SQLite (database) | ESP32 + HC-SR04 (planned)

## Project structure
```
HydroNest/
  app.py             Flask backend + SQLite
  requirements.txt
  esp32_sensor.ino   sample ESP32 code (not tested on hardware)
  static/
    index.html
    style.css
    script.js
```

## Run
Frontend only (no database): open `static/index.html` in Chrome.

With backend and database:
```
pip install -r requirements.txt
python app.py
```
Open http://localhost:5000

Demo PINs: Owner `1234`, Caretaker `0000`. Change them with the environment variables `OWNER_PIN` and `CARETAKER_PIN`.

## Demo flow
1. Login, then press **-25%**: low tanks start the motor automatically.
2. Press **11 PM**, then **Simulate leak** on a tank: a "Possible leak" alert appears.
3. Open **Report**: yesterday vs today, usage by tank, score, PDF download.

## API
`POST /api/login`, `POST /api/readings`, `POST /api/alerts`, `POST /api/daily` (need login token), `GET /api/history`, `GET /api/stats`, `POST /api/sensor` (ESP32, header `X-Sensor-Key`).

## Limitations
- Sensor data is simulated; the ESP32 code is untested on real hardware.
- The rate of Rs 0.03 per litre is an assumption (editable in the app).
- Demo PINs, no HTTPS or real user accounts yet.

## Future scope
Real ESP32 sensors, WhatsApp / Telegram / SMS alerts, real accounts and HTTPS, ML-based prediction, water quality (TDS, pH), mobile app.

## Team
Vigneshwaran B, Shanmathi R, Srika AK, Saranya - Muthayammal Engineering College
