# Decision Journal

A frontend web application for setting goals, tracking progress, managing priorities, and reflecting on personal growth.

## 📌 Problem Statement

Students and self-learners often set goals but struggle to consistently track their progress, deadlines, priorities, and outcomes.

The Decision Journal is designed to provide a simple and structured way to manage goals while encouraging users to monitor their progress and make better decisions over time.

---

## 🎯 Objective

The main objective of Decision Journal is to build a personal productivity and reflection application that allows users to:

* Create and manage goals
* Set deadlines and priorities
* Track goal progress
* Identify completed and pending goals
* Search, filter, and sort goals
* View goal statistics through a dashboard
* Store goals using browser Local Storage
* Receive feedback through toast notifications
* Handle invalid input and edge cases
* Provide a responsive user experience

---

## 👥 Target Users

* Students
* Self-learners
* Developers
* Working professionals
* Competitive exam aspirants

---

## ✨ Current Features

### 🎯 Goal Management

* Create new goals
* Edit existing goals
* Delete goals
* Assign priorities
* Set deadlines
* Track progress from 0–100%
* Automatically mark goals as completed when progress reaches 100%

### 📊 Dashboard

The dashboard dynamically displays:

* Total Goals
* Completed Goals
* Pending Goals
* High Priority Goals

Dashboard values are calculated directly from the goals data instead of being stored separately.

### 🔍 Search, Filter & Sort

Users can:

* Search goals by title
* Filter goals by priority
* Sort goals by:

  * Title A–Z
  * Title Z–A
  * Deadline
  * Priority

### 💾 Local Storage

Goals are stored in the browser's Local Storage so that data remains available after refreshing the page.

The application also handles invalid or missing stored data safely.

### ✅ Form Validation

The application validates:

* Empty goal titles
* Minimum goal title length
* Valid priority values
* Required deadlines
* Past deadlines
* Progress values between 0 and 100

Invalid submissions are stopped before they enter the application data.

### 🔔 Notifications

Toast notifications provide feedback for actions such as:

* Goal creation
* Goal updates
* Goal deletion
* Validation errors
* Missing goals
* Search results

### 📱 Responsive Design

The interface adapts to different screen sizes including:

* Mobile
* Tablet
* Laptop
* Desktop

Responsive layouts are implemented using Flexbox, Grid, relative units, and media queries.

### 🧩 Component-Based UI

The interface is organized conceptually into reusable components such as:

* Header
* Hero Section
* Dashboard Cards
* Goal Form
* Search and Filter
* Goal Cards
* Notifications
* Footer

### 🛡️ Error Handling & Empty States

The application handles common edge cases such as:

* No goals available
* No search results
* Editing a deleted/non-existent goal
* Invalid Local Storage data
* Invalid form input
* Cancelled editing

Friendly empty-state messages are displayed instead of leaving sections blank.

---

## 🏗️ Project Architecture

The project is organized using Separation of Concerns.

```text
decision-journal/
│
├── index.html
├── README.md
│
├── css/
│   ├── styles.css
│   ├── components.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   │
│   ├── data/
│   │   └── goals.js
│   │
│   ├── ui/
│   │   ├── render.js
│   │   ├── dashboard.js
│   │   ├── notifications.js
│   │   └── progress.js
│   │
│   ├── storage/
│   │   └── localStorage.js
│   │
│   ├── validation/
│   │   └── validateGoal.js
│   │
│   └── utils/
│       ├── helpers.js
│       └── constants.js
│
├── assets/
│   ├── images/
│   └── icons/
│
├── docs/
├── learning-notes/
└── dev-journal/
```

Each module has a specific responsibility.

### `app.js`

Acts as the entry point and coordinates the application.

### `validateGoal.js`

Contains goal validation logic.

### `localStorage.js`

Handles saving and loading goal data.

### `render.js`

Responsible for displaying goals on the page.

### `dashboard.js`

Calculates and displays dashboard statistics.

### `notifications.js`

Handles reusable toast notifications.

### `constants.js`

Stores application-wide fixed values such as:

* Goal priorities
* Progress limits
* Storage keys
* Completion threshold

This prevents repeated hardcoded values and provides a single source of truth.

---

## 🔄 Application Data Flow

```text
User Action
     │
     ▼
   app.js
     │
     ▼
 Validation
     │
     ▼
 Goals Data
     │
     ├──────────────► Local Storage
     │
     ├──────────────► Dashboard
     │
     ├──────────────► Rendering
     │
     ├──────────────► Search / Filter / Sort
     │
     └──────────────► Notifications
```

The goals array acts as the **source of truth**.

The dashboard and UI derive their information from the goals data.

---

## 🧠 Key Concepts Learned

During the first 31 days of development, the project has been used to learn and apply:

* HTML structure
* Semantic HTML
* CSS fundamentals
* Responsive design
* JavaScript fundamentals
* Variables and data types
* Functions
* Arrays and objects
* DOM manipulation
* Event handling
* CRUD operations
* Search
* Filtering
* Sorting
* Local Storage
* Form validation
* Fail Fast
* Error handling
* Empty states
* User feedback
* Toast notifications
* Component-based thinking
* Separation of Concerns
* JavaScript modules
* Import and export
* Constants
* Configuration
* Single Source of Truth
* Responsive UI design
* Refactoring
* Defensive programming

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)

### Browser APIs

* DOM API
* Local Storage

### Development Tools

* Git
* GitHub
* Visual Studio Code
* Browser Developer Tools

### Planned Stack

The project will gradually evolve toward:

* React.js
* Node.js
* Express.js
* MongoDB

---

## 📚 Learning Documentation

The repository contains documentation for the learning process.

### `learning-notes/`

Contains notes covering the concepts learned throughout the project.

Examples:

```text
20-Dashboard.md
21-Week3-Review.md
22-Form-Validation.md
23-Notifications.md
24-UI-Components.md
25-Goal-Progress.md
26-Responsive-Design.md
27-Error-Handling.md
28-Week4-Review.md
29-Project-Architecture.md
30-JavaScript-Modules.md
31-Constants-Configuration.md
```

### `dev-journal/`

Contains daily development reflections documenting:

* What was built
* What was learned
* Challenges faced
* Mistakes made
* Improvements made
* Future goals

---

## 🚀 Project Status

**Current Stage: Day 31 / 90**

The project currently has a functional frontend with:

* Complete Goal CRUD
* Progress tracking
* Dashboard statistics
* Search
* Filtering
* Sorting
* Local Storage
* Form validation
* Notifications
* Error handling
* Empty states
* Responsive design
* Modular JavaScript architecture
* Centralized constants

The project is being developed incrementally as part of a 90-day learning journey.

---

## 🔮 Future Features

Planned improvements include:

* User authentication
* User profiles
* Decision logging
* Reflection journal
* Milestones
* Progress analytics
* Advanced dashboard
* Notifications and reminders
* Backend API
* MongoDB database
* React frontend
* Node.js and Express backend
* AI-powered insights
* Deployment and production configuration

---

## 📈 90-Day Learning Journey

Decision Journal is not only a project but also a structured learning journey.

The development process focuses on gradually moving from:

```text
HTML
  ↓
CSS
  ↓
JavaScript
  ↓
DOM
  ↓
CRUD
  ↓
Local Storage
  ↓
Responsive Design
  ↓
Modular JavaScript
  ↓
React
  ↓
Node.js
  ↓
Express
  ↓
MongoDB
  ↓
Full-Stack Application
```

The goal is to understand the concepts behind each technology rather than simply building the application.

---

## 👩‍💻 Author

**Poornimaa Devi**

B.Tech Information Technology Student

Interested in:

* Software Development
* Cloud & DevOps
* Full-Stack Development
* Java
* JavaScript
* MERN Stack
* Problem Solving

---

## 📄 License

This project is created for learning, experimentation, and portfolio development.
