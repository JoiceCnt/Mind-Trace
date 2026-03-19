# Mind-Trace

- Overview
  Mind trace is a Single Page Application (SPA) built with React to support and strengthen the relationship between a counselor and their patients.
  It serves as a bridge between therapy sessions, allowing both parties to stay connected and informed about the patient’s emotional journey.

The platform has two types of users:

1. Professional

·Can log in (no account restrictions), manage an agenda and calendar, and create patient accounts.

·Follows up on patient progress outside of sessions by reviewing emotional logs.

·Can download patient logs for discussion during therapy.

·Uses these insights to improve, guide, and accelerate treatment.

2. Patient

·Only created by a professional; credentials are provided to them.

·Can log in and record daily emotional entries in a very simple way:

·Select an emoji representing their current mood.

·Optionally add a description explaining their feelings.

·Can review their emotional history and reschedule appointments within available slots.

This approach is particularly beneficial for patients dealing with anxiety, panic attacks, or other psychological issues.

It helps:

Track emotions over time.

Monitor stress levels and symptoms.

Make patients more conscious of their emotional state.

Avoid losing small but important details that could aid diagnosis.

For professionals, these logs become valuable data points that may reveal patterns, triggers, or improvements that the patient might not recall during a session.
The ability to download these logs ensures that they can be reviewed together in therapy, improving communication and making the patient feel supported even outside of sessions.

---

- Main Features
  For Professionals
  Login to a secure dashboard.

Manage appointments via an interactive calendar.

Create patient accounts and share credentials.

View patient emotional history and download logs for discussion in sessions.

For Patients
Login using credentials provided by the professional.

Select an emoji representing their current mood.

Add a diary entry describing why they feel that way.

View their own emotional history.

Reschedule appointments within available time slots.

---

Operation················ Description································Endpoint Example
CREATE ···········Patient creates a new log entry ····················POST /logs
READ············· Fetch all logs, appointments, emojis, patients ·····GET /logs, GET /appointments
UPDATE··········· Reschedule appointments, edit patient profiles····· PATCH /appointments/:id
DELETE··········· Cancel appointments or remove logs··················DELETE /appointments/:id

---

- API & Data Structure
  The backend is deployed on Render:
  Base URL: https://backend-repo-tjm4.onrender.com

Main resources:

/emojis → List of available emotions with prompts.

/logs → Patient diary entries (linked to patientId).

/appointments → Professional’s schedule (available & booked slots).

/patients → Patient accounts.

Example log object:

json
Copy
Edit
{
"id": 1,
"patientId": "patient_1",
"date": "2025-07-15",
"emojiId": "e01",
"nameId": "Happy",
"prompt": "That's great to see! What brought you joy today?",
"description": "Felt proud"
}

---

- Tools & Technologies
  Frontend
  React – SPA structure & component-based UI.

React Router DOM – Multi-page navigation without reloads.

Axios / Fetch API – Communication with backend.

CSS Modules – Component-specific styling.

Netlify – Deployment of the frontend.

Backend
json-server – Mock REST API for local and production.

Render – Backend hosting.

Development
Vite – Fast React development server & build tool.

Environment Variables – .env.local for local dev, Netlify environment for production.

---

- How to Run Locally

1- Clone Repositories
bash
Copy
Edit

# Frontend

git clone <https://github.com/JoiceCnt/Mind-Trace>
cd <frontend-Mind-Trace-folder>

# Backend

git clone <https://github.com/JoiceCnt/Backend_repo>
cd <backend-repo-folder>
2️- Install Dependencies
bash
Copy
Edit
npm install
3️- Start Backend (Local)
bash
Copy
Edit
npx json-server --watch db.json --port 5005
4️- Start Frontend (Local)
bash
Copy
Edit
npm run dev
Ensure your .env.local contains:

ini
Copy
Edit
VITE_JSONSERVER_URL=http://localhost:5005

---

- Deployed Versions
  Frontend (Netlify): https://bucolic-quokka-36c2ae.netlify.app

Backend (Render): https://backend-repo-tjm4.onrender.com

---

- Usage Instructions

1. Professional login

   Can log in with any username and password.

   Once logged in, they can create a patient account to test the patient side.

2. Patient login

   Requires an existing account (created by a professional).

   Use the credentials provided by the professional to log in.

3. Patient actions

   Select an emoji representing their mood.

   Optionally write a diary entry.

   View history of entries.

   Reschedule appointments in available slots.

4. Professional actions

   Manage appointments and patient records.

   View patient logs and export them for discussion during therapy.

---

- Project Requirements Check

* SPA with multiple views
* Integrated with a mock backend API
* Supports full CRUD operations
* Deployed frontend & backend
* Two separate GitHub repos
* Meets all technical deliverables
