Mind Trace - Backend

This is the backend service for the Mind Trace application, a mental health journaling platform.

It is built using Node.js and json-server, providing a simple REST API for managing patients, logs, emojis, and appointments.

---

Features

- REST API powered by json-server

- Custom Express-like server configuration

- CORS enabled for frontend communication

- Logging with Morgan

- Custom DELETE endpoint for appointments

---

Tech Stack

- Node.js

- json-server

- Morgan

- dotenv

  ***

  backend/
  ├── app.js # Server configuration
  ├── db.json # Mock database
  ├── package.json
  └── README.md

  ***

  Setup & Run

1- Navigate to the backend folder:

cd backend

2- Install dependencies:

npm install

3- Start the server:

node app.js
