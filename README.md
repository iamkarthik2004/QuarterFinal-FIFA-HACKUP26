# ⚽ National Fan Zone & Live-Cart Merchandise Store

A modern, immersive football-themed web application built for **FIFA HACKUP '26 - Quarter Final (Group 2)**.

The application allows football fans to explore their favorite national teams (Argentina 🇦🇷, Brazil 🇧🇷, Portugal 🇵🇹, India 🇮🇳), discover legendary players, watch live background videos, browse official jerseys, and interact with a dynamic merchandise store featuring team-customized dark glassmorphism cart aesthetics and user authentication.

---

## 👥 Project About & Developers

### **Developed By:**
* 👨‍💻 **Karthik Krishnan** — [LinkedIn](https://www.linkedin.com/in/karthikkk708/)
* 👨‍💻 **Deon George** — [LinkedIn](https://www.linkedin.com/in/deon-george-vadakkel/)

### **About The Project:**
National Fan Zone is an interactive digital hub designed for football enthusiasts. Built during FIFA HACKUP '26, it brings together team customization, live hero video playback, real-time fan reactions, match score prediction, and an interactive jersey checkout store tailored dynamically to each nation's color identity.

---

# 🚀 Challenge Overview

**Challenge:** National Fan Base & Multi-Kit Megastore

Build a National Team Fan Zone & Live-Cart Merchandise Store featuring:

* Flag & country-themed UI with dynamic switching
* Dedicated team portals for Argentina, Brazil, Portugal, and India
* Exactly two legendary player cards per team with portrait styling
* Exactly three official jerseys per team with interactive size selection and favorite heart animations
* Live fan comments simulator with live chat posting
* Team-customized shopping cart with live badge counter and dynamic total calculations
* Match Score Predictor interactive feature

---

# ✨ Features

## 🏠 Home Page & Hero Section
* Premium football stadium aesthetic with dark glassmorphism
* Dynamic HTML5 hero video playback tailored for each national team
* Instant smooth-scroll navigation to merchandise and checkout sections

## 🏳️ Team Portals & Dynamic Switching
Seamless switching between national team hubs:
* 🇮🇳 **India** (Blue Tigers — Saffron & Royal Blue theme)
* 🇦🇷 **Argentina** (La Albiceleste — Sky Blue theme)
* 🇧🇷 **Brazil** (Seleção — Canary Yellow theme)
* 🇵🇹 **Portugal** (Seleção das Quinas — Crimson Red theme)

## ⭐ National Legends
Each portal showcases two iconic national football legends with portrait cards, jersey numbers, and career highlights:
* **India:** Sunil Chhetri (#11), I.M. Vijayan (#15)
* **Argentina:** Lionel Messi (#10), Diego Maradona (#10)
* **Brazil:** Neymar Jr (#10), Kaká (#10)
* **Portugal:** Cristiano Ronaldo (#7), Luís Figo (#10)

## 👕 Merchandise Store
Three official 24/25 kits per nation with size selectors (`S`, `M`, `L`, `XL`), stateful animated heart favorites, and instant add-to-cart handlers.

## 🛒 Place Your Order (Team Cart Section)
* Fully integrated dark glassmorphic checkout portal
* Dynamically styled text, input borders, and price highlights matching each selected team's color palette
* Live order summary calculation and user shipping confirmation toast notifications

## 💬 Live Fan Comments & User Authentication
* Simulated live fan feed updating automatically
* Real-time user login and sign-up modal backed by a Flask API and SQLite database
* Logged-in users can post their own comments directly into the live fan discussion board

## 🏆 Match Winner Predictor
An automated winner prediction engine that evaluates match outcomes based on real-time FIFA World Rankings:
* **FIFA Ranking Matrix**: Utilizes an internal data structure indexing global team standings (e.g., Argentina #1, Spain #2, France #3, Portugal #5, Brazil #6).
* **Automated Comparison Algorithm**: Dynamically extracts the home team and selected opponent, comparing their global numerical ranks (`homeRank` vs `awayRank`).
* **Deterministic Outcome Determination**: Predicts victory for the team holding the higher global ranking (lower numerical index) or evaluates a draw for equal ranks.
* **Interactive UI Simulation**: Features a smooth simulated evaluation buffer with animated spinner indicators before displaying the highlighted result.

---

# 🧱 Project Structure

```
QuarterFinal-FIFA-HACKUP26/
│
├── backend/                # Flask backend server & authentication API
│   ├── app.py              # Main Flask server application & API endpoints
│   └── users.db            # SQLite database storing user authentication credentials
│
├── frontend/               # Web application frontend assets
│   ├── indexA.html         # Argentina Fan Portal
│   ├── indexB.html         # Brazil Fan Portal
│   ├── indexP.html         # Portugal Fan Portal
│   ├── indexI.html         # India Fan Portal
│   ├── styleA.css          # Argentina stylesheet (Sky Blue theme)
│   ├── styleB.css          # Brazil stylesheet (Canary Yellow theme)
│   ├── styleP.css          # Portugal stylesheet (Crimson Red theme)
│   ├── styleI.css          # India stylesheet (Saffron Orange theme)
│   ├── scriptA.js          # Argentina client-side interactivity & predictor engine
│   ├── scriptB.js          # Brazil client-side interactivity & predictor engine
│   ├── scriptP.js          # Portugal client-side interactivity & predictor engine
│   ├── scriptI.js          # India client-side interactivity & predictor engine
│   ├── images/             # Official jersey assets & legend player portraits
│   └── video/              # Dynamic background stadium hero videos
│
├── requirements.txt        # Python backend dependencies
├── update_predictor.py     # Batch update utility script for winner predictor
└── README.md               # Comprehensive project documentation
```

---

# 🛠️ Technologies Used

* **Backend:** Python 3, Flask REST API, SQLite3
* **Frontend:** HTML5, CSS3 (Vanilla Glassmorphism & Custom Properties), Vanilla JavaScript (ES6+)
* **Styling & Icons:** FontAwesome 6, Google Fonts (Inter)
* **Design System:** Responsive Flexbox/Grid, Glassmorphism Cards, Dynamic CSS Variables

---

# 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/iamkarthik2004/QuarterFinal-FIFA-HACKUP26.git
cd QuarterFinal-FIFA-HACKUP26
cd backend
```

### How to run the App
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```
The App will be running on `http://127.0.0.1:5000`.


---

# 👨‍💻 Developed For

**FIFA HACKUP '26 – Quarter Final**  
**Group 2: National Fan Base & Multi-Kit Megastore**  

Built with ❤️ by **Karthik Krishnan** and **Deon George** for football fans worldwide.
