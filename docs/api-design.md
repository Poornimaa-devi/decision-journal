# Decision Journal API Design

## 1. API Overview

The Decision Journal API will allow the frontend application to communicate with the backend and manage application data.

The future architecture will be:

```text
React Frontend
      ↓
HTTP Request
      ↓
Express API
      ↓
Node.js
      ↓
MongoDB
      ↓
HTTP Response
      ↓
React Frontend
```

The API will follow REST principles.

The main resources planned for the application are:

* Users
* Goals
* Progress
* Milestones
* Reflections

The API base path will be:

```text
/api
```

---

## 2. Authentication Endpoints

Authentication will be added when user accounts are implemented.

| Method | Endpoint             | Purpose                 |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Login an existing user  |
| POST   | `/api/auth/logout`   | Logout the current user |

---

## 3. Goal Endpoints

Goals are the first major resource of the Decision Journal.

| Method | Endpoint         | Purpose               |
| ------ | ---------------- | --------------------- |
| POST   | `/api/goals`     | Create a new goal     |
| GET    | `/api/goals`     | Get all goals         |
| GET    | `/api/goals/:id` | Get one specific goal |
| PATCH  | `/api/goals/:id` | Update part of a goal |
| DELETE | `/api/goals/:id` | Delete a goal         |

### Create Goal

```text
POST /api/goals
```

Request body:

```json
{
    "title": "Learn React",
    "priority": "High",
    "status": "Pending",
    "deadline": "2026-09-01"
}
```

Possible response:

```text
201 Created
```

---

### Get All Goals

```text
GET /api/goals
```

Possible response:

```text
200 OK
```

The response will contain a list of goals.

---

### Get One Goal

```text
GET /api/goals/:id
```

Example:

```text
GET /api/goals/123
```

The `123` value is a route parameter identifying the goal.

Possible responses:

```text
200 OK
```

or:

```text
404 Not Found
```

if the goal does not exist.

---

### Update Goal

```text
PATCH /api/goals/:id
```

Example:

```text
PATCH /api/goals/123
```

Request body:

```json
{
    "status": "Completed"
}
```

PATCH is useful when only part of the goal needs to be changed.

---

### Delete Goal

```text
DELETE /api/goals/:id
```

Example:

```text
DELETE /api/goals/123
```

Possible response:

```text
200 OK
```

---

## 4. Progress Endpoints

Progress can be associated with a particular goal.

Potential endpoints:

```text
GET   /api/goals/:id/progress
POST  /api/goals/:id/progress
PATCH /api/progress/:id
DELETE /api/progress/:id
```

These endpoints will be implemented later.

---

## 5. Milestone Endpoints

Potential milestone endpoints:

```text
GET   /api/goals/:id/milestones
POST  /api/goals/:id/milestones
PATCH /api/milestones/:id
DELETE /api/milestones/:id
```

These will allow milestones to be associated with goals.

---

## 6. Reflection Endpoints

Potential reflection endpoints:

```text
GET    /api/goals/:id/reflections
POST   /api/goals/:id/reflections
PATCH  /api/reflections/:id
DELETE /api/reflections/:id
```

These will support the reflection-journal functionality planned for the application.

---

## 7. HTTP Methods

The API will use HTTP methods according to the operation being performed.

| Operation | HTTP Method |
| --------- | ----------- |
| Create    | POST        |
| Read      | GET         |
| Update    | PATCH / PUT |
| Delete    | DELETE      |

The URL represents the resource while the HTTP method represents the operation.

For example:

```text
GET /api/goals
```

retrieves goals.

```text
POST /api/goals
```

creates a goal.

---

## 8. Status Codes

The API will use meaningful HTTP status codes.

| Status Code | Meaning                |
| ----------- | ---------------------- |
| 200         | OK / Request succeeded |
| 201         | Resource created       |
| 400         | Bad request            |
| 401         | Unauthorized           |
| 403         | Forbidden              |
| 404         | Resource not found     |
| 500         | Internal server error  |

---

## 9. Request/Response Examples

### Example: Create a Goal

Request:

```text
POST /api/goals
```

Body:

```json
{
    "title": "Learn Node.js",
    "priority": "High",
    "status": "Pending"
}
```

The backend will:

```text
Receive request
      ↓
Validate data
      ↓
Create goal
      ↓
Store in MongoDB
      ↓
Return response
```

Expected status:

```text
201 Created
```

---

### Example: Filter Goals

To retrieve high-priority pending goals:

```text
GET /api/goals?priority=high&status=pending
```

Here:

* `/api/goals` → resource
* `priority=high` → query parameter
* `status=pending` → query parameter

The query parameters are used for filtering.

---

### Example: Update Goal Status

Request:

```text
PATCH /api/goals/123
```

Body:

```json
{
    "status": "Completed"
}
```

The backend will update only the required part of the goal.

---

## Conclusion

The Decision Journal API will follow a consistent REST-style structure.

The main Goal API is:

```text
POST   /api/goals
GET    /api/goals
GET    /api/goals/:id
PATCH  /api/goals/:id
DELETE /api/goals/:id
```

The API design will be implemented gradually when the Express backend is introduced.
