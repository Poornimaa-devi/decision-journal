# Day 33 — APIs, HTTP and Client-Server Communication

## 1. What is an API?

API stands for **Application Programming Interface**.

An API provides a defined way for different software applications to communicate with each other.

In my Decision Journal project, the future React frontend will communicate with the backend through an API.

The basic flow will be:

```text
React Frontend
      ↓
    API
      ↓
Express / Node.js
      ↓
   MongoDB
```

The API acts as the communication bridge between the frontend and backend.

---

## 2. What is a Client?

A client is the application that makes a request to a server.

In my future Decision Journal application:

```text
React Application = Client
```

The React application will run in the user's browser and send requests to the backend.

---

## 3. What is a Server?

A server receives requests from clients and processes them.

In my future MERN application:

```text
Node.js + Express = Server/Backend
```

The backend will handle application logic, validation, and communication with MongoDB.

---

## 4. What is an HTTP Request?

An HTTP request is a message sent by the client to the server asking it to perform an operation.

For example:

```text
GET /api/goals
```

This means:

> Give me the goals.

Another example:

```text
POST /api/goals
```

This means:

> Create a new goal.

---

## 5. What is an HTTP Response?

An HTTP response is the message sent by the server back to the client after processing a request.

For example:

```text
Frontend
   ↓
GET /api/goals
   ↓
Backend
   ↓
Goals data
   ↓
Frontend
```

The response may contain the requested data or information about whether the operation succeeded or failed.

---

## 6. What is JSON?

JSON stands for **JavaScript Object Notation**.

It is a common format used to exchange structured data between the frontend and backend.

Example:

```json
{
    "title": "Learn React",
    "priority": "High",
    "status": "Pending"
}
```

JSON makes it possible for the client and server to exchange structured information in a standard format.

---

# 7. HTTP Methods

HTTP methods describe what operation the client wants the server to perform.

The main methods used in my Decision Journal application are:

| CRUD Operation | HTTP Method |
| -------------- | ----------- |
| Create         | POST        |
| Read           | GET         |
| Update         | PUT / PATCH |
| Delete         | DELETE      |

---

## GET

GET is used to retrieve data.

Example:

```text
GET /api/goals
```

Meaning:

> Get all goals.

To get one specific goal:

```text
GET /api/goals/:id
```

---

## POST

POST is used to create a new resource.

Example:

```text
POST /api/goals
```

The request can contain goal information such as:

```json
{
    "title": "Learn React",
    "priority": "High",
    "deadline": "2026-09-01"
}
```

---

## PUT

PUT is used to update an existing resource.

Example:

```text
PUT /api/goals/123
```

It is commonly used when replacing or updating the resource as a whole.

---

## PATCH

PATCH is also used to update an existing resource.

Example:

```text
PATCH /api/goals/123
```

It is commonly used when changing only part of a resource.

For example, changing only the progress:

```json
{
    "progress": 75
}
```

---

## DELETE

DELETE is used to remove a resource.

Example:

```text
DELETE /api/goals/123
```

Meaning:

> Delete goal 123.

---

# 8. HTTP Status Codes

HTTP status codes tell the client what happened when the server processed a request.

### 200 — OK

The request was successful.

Example:

```text
GET /api/goals
        ↓
   200 OK
```

---

### 201 — Created

A new resource was successfully created.

Example:

```text
POST /api/goals
        ↓
   201 Created
```

---

### 400 — Bad Request

The client sent invalid information.

Example:

```text
Title is missing
```

---

### 401 — Unauthorized

Authentication is required or the provided credentials are invalid.

---

### 403 — Forbidden

The server understands the request but refuses to allow it.

---

### 404 — Not Found

The requested resource does not exist.

Example:

```text
GET /api/goals/999
```

If goal `999` does not exist, the server can return:

```text
404 Not Found
```

---

### 500 — Internal Server Error

Something went wrong on the server.

---

# 9. API vs Database

An API and a database are not the same thing.

### API

The API provides communication between the frontend and backend.

```text
React ↔ API ↔ Backend
```

### Database

The database stores application data.

```text
MongoDB
```

The complete architecture is:

```text
React
  ↓
API
  ↓
Express / Node.js
  ↓
MongoDB
```

React should not directly connect to MongoDB.

---

# 10. Current vs Future Architecture

## Current Decision Journal

My current application stores goals using Local Storage.

```text
Browser
   ↓
JavaScript
   ↓
Local Storage
```

Local Storage belongs to the specific browser/device.

Therefore, goals stored on one device are not automatically available on another device.

---

## Future MERN Decision Journal

The future architecture will be:

```text
Browser
   ↓
React
   ↓
HTTP / API
   ↓
Express
   ↓
Node.js
   ↓
MongoDB
```

This allows application data to be stored centrally on the server/database.

It will make features such as user accounts, authentication, multiple-device access, and centralized persistence possible.

---

# 11. Future Decision Journal API

My planned API endpoints are:

| Method | Endpoint         | Purpose       |
| ------ | ---------------- | ------------- |
| GET    | `/api/goals`     | Get all goals |
| POST   | `/api/goals`     | Create a goal |
| GET    | `/api/goals/:id` | Get one goal  |
| PATCH  | `/api/goals/:id` | Update a goal |
| DELETE | `/api/goals/:id` | Delete a goal |

---

# 12. Complete Request-Response Flow

For creating a goal:

```text
User
 ↓
React Frontend
 ↓
POST Request
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
React Frontend
 ↓
UI Updates
 ↓
User sees success
```

For deleting a goal:

```text
User clicks Delete
        ↓
React Frontend
        ↓
DELETE /api/goals/:id
        ↓
Express Backend
        ↓
MongoDB
        ↓
Goal Deleted
        ↓
HTTP Response
        ↓
React
        ↓
UI Updates
```

---

# 13. Important Learning

The most important idea I learned today is that the frontend should not directly communicate with the database.

Instead:

```text
Frontend
   ↓
API
   ↓
Backend
   ↓
Database
```

The API is the communication bridge between the client and server.

---

# 14. Key Concepts to Remember

```text
API
→ Communication interface

Client
→ Makes the request

Server
→ Processes the request

Request
→ Client asks for an operation

Response
→ Server sends the result

JSON
→ Common data exchange format

GET
→ Read

POST
→ Create

PUT/PATCH
→ Update

DELETE
→ Delete
```

The complete CRUD mapping is:

```text
CREATE → POST
READ   → GET
UPDATE → PUT/PATCH
DELETE → DELETE
```
