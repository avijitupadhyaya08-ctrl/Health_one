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

graph TD
    %% Define Styles
    classDef landing fill:#0ea5e9,stroke:#0284c7,stroke-width:2px,color:white,font-weight:bold;
    classDef auth fill:#10b981,stroke:#059669,stroke-width:2px,color:white,font-weight:bold;
    classDef dashboard fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:white,font-weight:bold;
    classDef service fill:#f8fafc,stroke:#94a3b8,stroke-width:2px,color:#0f172a,border-radius:10px;
    classDef util fill:#e2e8f0,stroke:#64748b,stroke-width:2px,color:#1e293b,border-radius:10px;

    %% Nodes
    Index[Landing Page\nindex.html]:::landing
    
    %% Auth
    Login[Login Page\nlogin.html]:::auth
    Signup[Sign Up Page\nsignup.html]:::auth
    ForgotPw[Forgot Password\nforgot-password.html]:::auth
    
    %% Dashboard
    Dashboard[User Dashboard\ndashboard.html / main.html]:::dashboard
    
    %% Core Services Modules
    Appointments[Appointments Hub\nappointments.html]:::service
    ApptHistory[History\nappointment-history.html]:::util
    Doctors[Find Doctors\ndoctors.html]:::util
    Search[Search System\nsearch.html]:::util
    
    Records[Medical Records\nrecords.html]:::service
    
    %% Utilities & Communication
    Chatbot[AI Assistant\nchatbot.html]:::service
    Emergency[Emergency Services\nemergency.html]:::service
    Notifications[Alerts\nnotifications.html]:::service
    Contact[Support\ncontact.html]:::service
    
    %% User Profile & Settings
    Profile[User Profile\nprofile.html]:::service
    Settings[Settings\nsettings.html]:::service
    
    %% Flow / Links
    Index -->|Existing User| Login
    Index -->|New User| Signup
    
    Login -->|Forgot Password?| ForgotPw
    ForgotPw -->|Reset Success| Login
    
    Login -->|Authentication Success| Dashboard
    Signup -->|Registration Success| Dashboard
    
    %% Dashboard to Modules Integrations
    Dashboard --> Appointments
    Dashboard --> Records
    Dashboard --> Chatbot
    Dashboard --> Emergency
    Dashboard --> Notifications
    
    %% Sub-flows
    Appointments --> ApptHistory
    Appointments --> Doctors
    Appointments --> Search
    Dashboard --> Search
    
    %% Navigating utilities from Dashboard (header/sidebar)
    Dashboard -.-> Profile
    Dashboard -.-> Settings
    Dashboard -.-> Contact
    
    %% Logout Flow
    Settings -.->|Logout| Index
    Profile -.->|Logout| Index
