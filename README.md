# ⚽ National Fan Zone & Live-Cart Merchandise Store

A modern football-themed web application built for **FIFA HACKUP '26 - Quarter Final (Group 2)**.

The application allows football fans to explore their favorite national teams, discover legendary players, browse official jerseys, and interact with a dynamic merchandise store with live cart functionality.

---

# 🚀 Challenge Overview

**Challenge:** National Fan Base & Multi-Kit Megastore

Build a National Team Fan Zone & Live-Cart Merchandise Store featuring:

* Flag-themed UI
* Team switching
* Two legendary player cards
* Exactly three jerseys
* Live fan comments
* Shopping cart with counter badge
* One creative feature

---

# ✨ Features

## 🏠 Home Page

* Modern football-inspired interface
* Stadium-themed hero section
* Responsive design for desktop and mobile
* National team themed background
* Smooth animations and transitions

---

## 🏳️ Team Switching

Users can switch between multiple national teams.

Current supported teams:

* 🇮🇳 India
* 🇦🇷 Argentina
* 🇧🇷 Brazil
* 🇵🇹 Portugal

When switching teams, the application dynamically updates:

* Theme colors
* Background flag
* Hero section
* Legendary players
* Merchandise store
* Fan comments

---

## ⭐ Legend Section

Each team displays **exactly two legendary football players**.

Each legend card includes:

* Player image
* Player name
* Playing position
* Short description

---

## 👕 Merchandise Store

Each selected team contains **exactly three jerseys**.

Every jersey card includes:

* Jersey image
* Jersey name
* Price
* Add to Cart button

---

## 🛒 Shopping Cart

Shopping functionality includes:

* Cart icon in navbar
* Live cart counter badge
* Add to Cart functionality
* Counter updates instantly
* Multiple items can be added

---

## 💬 Live Fan Comments

Dynamic fan reactions are displayed for every team.

Example comments:

```
🔥 Rahul: Vamos Argentina!
⚽ Mia: Portugal all the way!
💙 Alex: Brazil will win!
🇮🇳 Arjun: Jai Hind! Blue Tigers forever!
```

Comments automatically update whenever the selected team changes.

---

# 🎨 UI / UX Highlights

* Premium football aesthetic
* Glassmorphism cards
* Responsive layout
* Team-colored gradients
* Smooth hover effects
* Animated transitions
* Modern typography
* Stadium-inspired visuals

---

# ⚙️ Interactive Features

### Team Switching

Switching teams updates:

* ✅ Theme
* ✅ Background flag
* ✅ Hero section
* ✅ Legend cards
* ✅ Jerseys
* ✅ Fan comments

---

### Cart Logic

* Click **Add to Cart**
* Cart counter increments instantly
* Supports multiple additions

---

# 🌟 Creative Feature

## 🏆 Match Score Predictor

A football prediction feature where fans can predict the score of an upcoming match.

### Features

* Select Team A score
* Select Team B score
* Submit prediction
* Display prediction instantly
* Updates automatically when the selected team changes

### Why this feature?

The Match Score Predictor increases fan engagement by allowing users to interact beyond shopping. It creates a more immersive fan experience while matching the football theme of the application.

---

# 🧱 Project Structure

```
src/
│
├── components/
│   ├── Navbar
│   ├── TeamTabs
│   ├── Hero
│   ├── LegendCard
│   ├── Legends
│   ├── JerseyCard
│   ├── Store
│   ├── FanComments
│   ├── MatchScorePredictor
│   ├── Cart
│   └── Footer
│
├── data/
│   ├── teams.js
│   ├── legends.js
│   ├── jerseys.js
│   └── comments.js
│
├── assets/
│
├── App.jsx
└── main.jsx
```

---

# 🛠️ Technologies Used

* React
* JavaScript
* HTML5
* CSS3
* React Hooks
* Responsive Design

---

# ✅ Challenge Requirement Checklist

| Requirement                    | Status                  |
| ------------------------------ | ----------------------- |
| Flag-themed Layout             | ✅                       |
| Team Switching                 | ✅                       |
| Exactly 2 Legend Cards         | ✅                       |
| Live Fan Comments              | ✅                       |
| Exactly 3 Jerseys              | ✅                       |
| Add to Cart Button             | ✅                       |
| Cart Counter Badge             | ✅                       |
| Team Switching Updates Content | ✅                       |
| Cart Counter Increments        | ✅                       |
| One Creative Feature           | ✅ Match Score Predictor |

---

# 🚀 Getting Started

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

# 👨‍💻 Developed For

**FIFA HACKUP '26 – Quarter Final**

**Group 2: National Fan Base & Multi-Kit Megastore**

Built with ❤️ for football fans.
