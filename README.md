# PERN App

A full-stack web application built with the **PERN** stack (PostgreSQL, Express.js, React, Node.js).  
It includes rate-limiting and bot detection with Arcjet, a clean backend API, and a scalable project structure.

---

## 🚀 Features

- 🌐 Full-stack architecture (PostgreSQL + Express + React + Node.js)
- 🛡️ Bot Detection and Rate Limiting with Arcjet
- 🧠 Secure environment variable usage via dotenv
- 🪪 Helmet for added security
- 📝 HTTP request logging with Morgan
- 🔁 Nodemon for backend hot reloading
- 🎯 Modular backend routing and controller structure

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js, PostgreSQL (via Neon)
- **Security**: Arcjet, Helmet
- **Logging**: Morgan
- **Config**: dotenv
- **Dev Tools**: Nodemon
- **Frontend**: React (inside `frontend/` folder)

---

## ⚙️ Setup `.env` file

Create a `.env` file in the root directory:

```env
PORT=5000

# PostgreSQL config
PGUSER='neondb_owner'
PGPASSWORD='npg_jVqwg4hQT3mr'
PGHOST='ep-long-haze-a28gk91i-pooler.eu-central-1.aws.neon.tech'
PGDATABASE='neondb'

# Arcjet config
ARCJET_KEY=ajkey_01jqp2w63geys8nh0k50sdmfdg
ARCJET_ENV=development
