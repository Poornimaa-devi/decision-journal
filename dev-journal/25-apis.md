# Day 33 — Development Journal

## Today's Goal

Today's goal was to understand how APIs allow a frontend and backend to communicate.

I learned the fundamentals of client-server architecture, HTTP requests and responses, HTTP methods, JSON, and HTTP status codes.

I also designed the future API architecture for my Decision Journal project.

---

## What an API Means in My Own Words

An API is a communication bridge between two applications.

In my Decision Journal project, the future React frontend will use an API to communicate with the Express/Node.js backend.

The backend will then communicate with MongoDB.

The basic flow is:

```text
React
 ↓
API
 ↓
Express / Node.js
 ↓
MongoDB
```

---

## What Surprised Me

I learned that React should not directly connect to MongoDB.

Instead, the frontend communicates with the backend through an API.

The backend is responsible for handling requests, validating data, performing operations, and communicating with the database.

I also understood that Local Storage is limited to the particular browser/device where the data is stored.

---

## My Future Decision Journal API Endpoints

I designed the following endpoints:

```text
GET    /api/goals
POST   /api/goals
GET    /api/goals/:id
PATCH  /api/goals/:id
DELETE /api/goals/:id
```

Their purposes are:

```text
GET    → Read goals
POST   → Create a goal
GET    → Read one goal
PATCH  → Update a goal
DELETE → Delete a goal
```

---

## One Complete Request-Response Flow

For creating a goal:

```text
User
 ↓
React Frontend
 ↓
POST /api/goals
 ↓
Express API
 ↓
Backend Validation
 ↓
MongoDB
 ↓
Goal Stored
 ↓
HTTP Response
 ↓
React
 ↓
UI Updates
 ↓
User sees success
```

This helped me understand that clicking a button can trigger a complete communication flow between the frontend, backend, and database.

---

## What I Want to Understand Better Tomorrow

I want to understand how JavaScript communicates with an API.

In particular, I want to learn:

* `fetch()`
* Promises
* `async`
* `await`
* `.then()`
* `.catch()`
* Loading states
* Error handling for API requests

I also want to make my first real API request and understand what happens behind the scenes.

---

## Today's Key Learning

The biggest concept I learned today is:

> Frontend → API → Backend → Database

I now understand how my current Local Storage-based Decision Journal can eventually evolve into a MERN application with React, Express, Node.js, and MongoDB.

---

## Day 33 Status

* [x] Learned what an API is
* [x] Understood client and server
* [x] Understood requests and responses
* [x] Learned HTTP methods
* [x] Learned JSON
* [x] Learned HTTP status codes
* [x] Designed Decision Journal API endpoints
* [x] Understood the future MERN architecture
* [x] Created learning notes
* [x] Created development journal
