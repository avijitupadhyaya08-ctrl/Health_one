Project Name: LumiHealth (Health Monitoring System)
Overview: LumiHealth is a premium healthcare web platform designed to provide a seamless patient experience for managing health records, booking appointments, and communicating with medical professionals. The application focuses heavily on a modern, user-friendly UI utilizing a glassmorphism design aesthetic.

Project Structure & Key Modules:
1. Landing & Authentication Flow:


index.html
: The main landing page featuring hero sections, value propositions, and navigation to authentication.

login.html
 & 

signup.html
: Dedicated pages for user authentication, equipped with loading states and user-data handling.

forgot-password.html
: Interface for account recovery.
2. Core User Dashboard:


dashboard.html
: The central hub for authenticated users providing an overview of their health metrics, upcoming appointments, and recent notifications.

main.html
: Secondary dashboard or main application frame.
3. Healthcare Services:


appointments.html
 & 

appointment-history.html
: Interfaces for users to schedule new visits (physical or virtual) and review previous consultations.

doctors.html
 & 

search.html
: Directories to search for, filter, and discover participating top-rated healthcare specialists.

records.html
: A secure area for patients to view medical histories, lab results, and active prescriptions.

emergency.html
: Quick-access page providing critical emergency contacts and protocols.
4. Communication & Support:


chatbot.html
: An integrated AI chatbot or virtual assistant designed to handle quick queries, triage, or navigate the platform.

contact.html
: Standard customer support and hospital contact interface.

notifications.html
: A dedicated panel for real-time alerts regarding prescription refills, test results, and appointment reminders.
5. User Settings & Personalization:


profile.html
: Interface for managing personal patient details.

settings.html
: User preferences, encompassing features like UI themes (e.g., light/dark mode toggles) and account configurations.
Technical & Design Details:
Tech Stack: The frontend is primarily structured using HTML, stylized with vanilla CSS, and made interactive via JavaScript.
Design Language: You've implemented a highly modern "glassmorphism" aesthetic. The design relies on curated color palettes (Blues and Emeralds), subtle micro-animations, blur effects over background "blobs," and high-quality typography using the 'Outfit' font family.
Data Handling / Logic: From recent updates, the app utilizes localStorage for immediate, persistent frontend state management (like tracking logged-in user names). However, there's also an infrastructure setup moving toward a backend integration (MongoDB/Node.js based authentication and a Supabase client connection).

                ┌────────────────────┐
                │   User (Patient)   │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │  Sensors Layer     │
                │--------------------│
                │ • BP Sensor        │
                │ • Temp Sensor      │
                │ • (Future: Weight) │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │ Microcontroller    │
                │     (ESP32)        │
                │--------------------│
                │ • Read sensor data │
                │ • Process values   │
                │ • Format JSON      │
                └─────────┬──────────┘
                          │
              WiFi / Bluetooth (API)
                          │
                          ▼
                ┌────────────────────┐
                │   Backend Server   │
                │ (Supabase/Firebase)│
                │--------------------│
                │ • Store data       │
                │ • Authentication   │
                │ • Real-time sync   │
                └─────────┬──────────┘
                          │
          Real-Time Fetch (API / WebSocket)
                          │
                          ▼
                ┌────────────────────┐
                │   Frontend App     │
                │ (HTML/CSS/JS)      │
                │--------------------│
                │ • Dashboard UI     │
                │ • Live readings    │
                │ • Charts/History   │
                │ • Alerts 🚨        │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │   User Interface   │
                │--------------------│
                │ • View health data │
                │ • Input weight     │
                │ • Track calories   │
                └────────────────────┘

    Sensors → ESP32 → Internet → Backend → Frontend Dashboard → User
    
         ┌──────────────┐
         │ Sensor Data  │
         └──────┬───────┘
                ▼
        ┌──────────────┐
        │   ESP32      │
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │   Backend    │
        └──────┬───────┘
               │
┌──────────────┐   ┌──────────────┐
│ Database     │   │ Alert System │
└──────┬───────┘   └──────┬───────┘
       ▼                  ▼
┌──────────────┐   ┌──────────────┐
│ Frontend UI  │   │ Notifications│
└──────────────┘   └──────────────┘

🧩 Modules You’ll Build
Hardware Module → Sensors + ESP32
API Module → Send/receive data
Database Module → Store readings
UI Module → Dashboard
Analytics Module (later) → Calories, trends
    Settings -.->|Logout| Index
    Profile -.->|Logout| Index

     ┌──────────┴──────────┐
     ▼                     ▼
