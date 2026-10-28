# MITS ACM STUDENT CHAPTER — Full-Stack Web Platform

Official website and digital operations platform for **MITS ACM STUDENT CHAPTER**, Madhav Institute of Technology & Science (MITS), Gwalior, Madhya Pradesh, India.

---

## 🏛️ Project Summary
- **Official Chapter Name:** `MITS ACM STUDENT CHAPTER`
- **Institution:** Madhav Institute of Technology & Science, Gwalior
- **Parent Organization:** ACM (Association for Computing Machinery)
- **Tagline:** *"Code. Create. Connect."*
- **Supporting Vision:** *"Empowering the next generation of computing professionals at MITS Gwalior."*

---

## 👨‍💻 Mandatory Developer Credits
Visible across all public-facing pages in the designated footer:
1. **Aditya Ahamana**
2. **Mritunjay Dubey**
3. **Ronak Gupta**

---

## 🚀 Key Features

### 1. Public Experience
- **Interactive Animated Hero:** Sleek dark navy/electric blue tech theme, glassmorphic panels, and animated cards.
- **Dynamic Homepage Stats:** Real member counts, events organized, and workshop data.
- **About Page:** Clarifies the mission, chapter goals, milestones, and clearly distinguishes local student chapter participation from official ACM International membership.
- **Our Team Directory:** Search by member name or designation, categorized by wings (Faculty Coordinators, Executive Board, Tech, DSA, Marketing).
- **Events & Hackathons:** Event discovery, categorization (Hackathons, Workshops, Coding Competitions), detailed event agendas, rules, and internal/external registration workflows.
- **Learning Hub:** Filterable resource center with tracks (DSA, Web Dev, AI/ML, Cybersecurity, Placements) and difficulty filters (Beginner, Intermediate, Advanced).
- **Achievements:** Verified chapter accomplishments, hackathon victories, and research milestones.
- **Gallery:** Categorized photo albums with lightbox image preview.
- **Recruitment & Join Us:** Interactive volunteer/membership application form with duplicate protection.
- **Contact Page:** Inquiry form with validation, campus map coordinates, and chapter FAQs.

### 2. Admin Portal (`/admin`)
- **Overview Dashboard:** Live statistics on events, applications, registered attendees, and messages.
- **Event Management:** Create, publish, archive, or cancel chapter events with custom posters.
- **Team Management:** Add, edit, reorder, or delete team members and categories.
- **Participant Registrations:** Search attendees and **Export CSV** for event coordinators.
- **Recruitment Review:** Review applicant qualifications, statement, and update application statuses (*Pending*, *Shortlisted*, *Accepted*, *Rejected*).
- **Contact Inbox:** Manage inquiries and mark as read.
- **Site Settings:** Live customization of homepage taglines and metrics.

---

## 🛠️ Technology Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, React Router v7, Framer Motion, Lucide React.
- **Backend:** Python 3.13+, Flask, Flask-SQLAlchemy, PyJWT, Werkzeug.
- **Database:** Supabase PostgreSQL compatible (with seamless SQLite fallback for local test execution).
- **Deployment Ready:** Vercel (Frontend) and Render / Railway / Supabase (Backend & DB).

---

## ⚙️ Quick Start Guide

### 1. Backend Setup
```bash
cd backend

# Create & activate virtual environment (Windows)
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install flask flask-cors flask-sqlalchemy pyjwt werkzeug psycopg2-binary

# Run local development server
python run.py
```
*Backend runs on `http://127.0.0.1:5000`.*

### 2. Frontend Setup
```bash
cd frontend

# Install npm dependencies
npm install

# Start Vite dev server
npm run dev

# Or compile production bundle
npm run build
```
*Frontend runs on `http://localhost:5173`.*

---

## 🔐 Administrative Credentials
To access `/admin`:
- **Username:** `admin` (or `acm@mitsgwalior.in`)
- **Password:** `Admin@ACMMits2025!`

