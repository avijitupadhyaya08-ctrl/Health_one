#  LumiHealth

LumiHealth is a premium, feature-rich healthcare web platform designed to provide a seamless patient experience. Patients can manage their health records, track vitals, book specialist appointments, and communicate directly with medical professionals through an intuitive, modern, glassmorphism-inspired UI.

![LumiHealth Dashboard Concept](https://via.placeholder.com/1000x500.png?text=LumiHealth+Dashboard)

---

##  Features

*   **Secure Authentication:** End-to-end user registration and login flows with password hashing (`bcryptjs`) and local session capabilities.
*   **Appointment Booking:** Dynamic scheduling system linked up to underlying SQLite database to book, list, and softly cancel medical visits.
*   **User Dashboard:** A central hub providing an overview of health metrics, upcoming appointments, and recent notifications.
*   **Feature-Based Architecture:** Beautifully isolated frontend and backend environments spanning isolated modules (auth, appointments, medical core).
*   **Elegant UI/UX:** Built with a "glassmorphism" aesthetic, utilizing carefully curated color palettes (Blues and Emeralds), subtle micro-animations, and the 'Outfit' font family.

---

##  Project Structure

LumiHealth has been built with an ultra-clean **Feature-Based Architecture**. 

Every feature encompasses its respective frontend view and backend route to keep the project highly modular and scalable:

```text
LumiHealth/
├── src/
│   ├── config/                # Database configurations (SQLite3)
│   │   └── database.js
│   ├── features/
│   │   ├── appointments/      # Appointments logic & views
│   │   │   ├── appointments.routes.js   
│   │   │   ├── appointments.html        
│   │   │   └── appointment-history.html
│   │   ├── auth/              # Authentication logic & views
│   │   │   ├── auth.routes.js           
│   │   │   ├── login.html               
│   │   │   └── signup.html
│   │   ├── dashboard/         # End-user central dash
│   │   │   └── dashboard.html
│   │   ├── medical/           # Medical tracking & records
│   │   │   └── records.html
│   │   ├── user/              # Account preferences & profiles
│   │   │   └── profile.html
│   │   ├── core/              # Main Landing page
│   │   │   └── index.html
│   │   ├── skin-disease/      # AI Skin Disease Classification
│   │   │   ├── skin-disease.routes.js   
│   │   │   └── skin-disease.html
│   │   └── support/           # AI interactions
│   │       └── chatbot.html
├── skin-disease-model/        # Python ML Inference Engine
│   ├── detect.py
│   ├── skin_disease_model_ISIC_densenet.h5
│   └── requirements.txt
├── server.js                  # Master Express entry point
└── database.sqlite            # Live SQLite database file
```

---

## Technology Stack

*   **Frontend:** Vanilla HTML5, CSS3, JavaScript
*   **Backend framework:** Node.js, Express.js
*   **Database:** SQLite3
*   **Security:** bcryptjs
*   **AI/ML Inference:** Python, TensorFlow, Keras
*   **Routing:** Express Routers mounted dynamically to feature static directories

---

## Getting Started

### 1. Prerequisites
Ensure you have the following installed on your local machine:
*   [Node.js](https://nodejs.org/en/) (v14 or higher)
*   npm (Node Package Manager)
*   [Python](https://www.python.org/downloads/) (v3.8 or higher)
*   pip (Python Package Installer)

### 2. Installation

Clone the repository and install the backend and ML modules:
```bash
# Navigate to the project directory
cd Health_one

# Install necessary Node modules
npm install

# Install necessary Python dependencies for AI Analysis
pip install -r skin-disease-model/requirements.txt
```

### 3. Run the Application

Start the Express web server natively:
```bash
node server.js
```

You should see:
```bash
Server is running on http://localhost:8080
Connected to the SQLite database.
```

Visit [http://localhost:8080](http://localhost:8080) directly in your browser.

---

## Data Flow Diagram (DFD)

The current implementation of LumiHealth operates as a pure software ecosystem. The data flow architecture relies on a robust Node.js backend to securely bridge the frontend user interfaces directly with the SQLite database.

```mermaid
graph TD;
    %% External Entities
    User((Patient / User))
    
    %% Processes (Node.js/Express)
    Auth[Authentication Service]
    Booking[Appointment Engine]
    Dashboard[Dashboard API & Renderer]
    
    %% Data Stores (SQLite)
    DB[(SQLite Database)]
    
    %% Data Flow
    User -->|Registration / Login| Auth
    User -->|Selects Specialist & Date| Booking
    User -->|Requests Records| Dashboard
    
    Auth -->|Hash & Verify Credentials| DB
    Booking -->|Insert New Reservation| DB
    
    DB -->|Provide Session Token / Profile| Auth
    DB -->|Fetch Appointment Row| Booking
    DB -->|Provide Historical Medical Data| Dashboard
    
    Auth -->|Grants Access| User
    Dashboard -->|Renders UI Dashboards| User
    Booking -->|Confirmation Alerts| User
```

## Contribution
Contributions, issues, and feature requests are welcome! 
Feel free to check out the [issues page](https://github.com/your-repo/issues) to contribute.

---
*Crafted with precision for the future of healthcare technology.*
