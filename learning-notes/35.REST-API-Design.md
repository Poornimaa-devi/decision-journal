# Day 35 — REST API Design

## 1. What does REST mean?

REST stands for Representational State Transfer.

For my project, I understand REST as a set of principles for designing APIs around resources.

My Decision Journal resources include:

* Users
* Goals
* Progress
* Milestones
* Reflections

---

## 2. What is a resource?

A resource is a type of data that an application manages.

For example, a Goal is a resource in my Decision Journal.

A goal can contain information such as:

```text
title
description
priority
status
deadline
```

---

## 3. What is an endpoint?

An endpoint is a specific API URL through which the client can interact with a resource.

Example:

```text
/api/goals
```

An endpoint should be understood as:

```text
HTTP Method + URL + Purpose
```

For example:

```text
GET /api/goals
```

means retrieving goals.

---

## 4. What is a route parameter?

A route parameter is a value in the URL used to identify a specific resource.

Example:

```text
/api/goals/123
```

Here:

```text
123
```

is the goal identifier.

In Express, this can be represented as:

```text
/api/goals/:id
```

---

## 5. What is a query parameter?

A query parameter is information added to a URL to control filtering, searching, sorting, pagination, or similar operations.

Example:

```text
/api/goals?status=completed
```

The query parameter is:

```text
status=completed
```

Another example:

```text
/api/goals?priority=high&status=pending
```

---

## 6. Difference Between Route and Query Parameters

### Route parameter

Used to identify a specific resource.

```text
/api/goals/123
```

Think:

> Which goal?

### Query parameter

Used to filter or control the returned data.

```text
/api/goals?status=completed
```

Think:

> Which subset of goals?

---

## 7. What is a request body?

A request body contains data sent from the client to the server.

For example, when creating a goal:

```json
{
    "title": "Learn React",
    "priority": "High",
    "status": "Pending"
}
```

The request body is useful for sending structured information to the backend.

---

## 8. What are HTTP headers?

HTTP headers contain additional information or metadata about an HTTP request or response.

For example:

```text
Content-Type: application/json
```

This indicates that the data being sent is JSON.

Later, authentication can use headers such as:

```text
Authorization
```

---

## 9. Why should URLs represent resources rather than actions?

REST-style APIs use the URL to represent the resource and the HTTP method to describe the operation.

Instead of:

```text
/getGoals
/createGoal
/deleteGoal
```

we use:

```text
GET /api/goals
POST /api/goals
DELETE /api/goals/:id
```

This provides a more consistent API structure.

---

## 10. CRUD Endpoints for Goals

My Goal API is:

```text
POST   /api/goals
GET    /api/goals
GET    /api/goals/:id
PATCH  /api/goals/:id
DELETE /api/goals/:id
```

The mapping is:

```text
CREATE → POST
READ   → GET
UPDATE → PATCH
DELETE → DELETE
```

---

## 11. Endpoint to Filter Goals by Status

To get completed goals:

```text
GET /api/goals?status=completed
```

To get pending goals:

```text
GET /api/goals?status=pending
```

Multiple filters can also be used:

```text
GET /api/goals?priority=high&status=pending
```

---

## 12. Endpoint to Update Only a Goal's Status

I would use:

```text
PATCH /api/goals/123
```

with the request body:

```json
{
    "status": "completed"
}
```

PATCH is suitable because only part of the goal is being modified.

---

## What I Learned Today

The main thing I learned is that API design should happen before implementation.

The basic design process is:

```text
Requirement
    ↓
Resource
    ↓
Endpoint
    ↓
Request
    ↓
Response
    ↓
Implementation
```

This will help me build the Express backend in a more organized way.
