# Day 35 — Development Journal

## Today's Goal

Today I learned how to design a REST API before implementing the backend.

I focused on understanding resources, endpoints, route parameters, query parameters, request bodies, headers, and HTTP methods.

---

## What REST Means to Me

REST is a way of designing APIs around resources.

Instead of putting actions directly into URLs, the resource is represented by the URL and the HTTP method describes what operation should be performed.

For example:

```text
GET /api/goals
```

retrieves goals, while:

```text
POST /api/goals
```

creates a goal.

---

## Resources in My Decision Journal

The main resources I identified are:

* Users
* Goals
* Progress
* Milestones
* Reflections

The Goal resource is currently the main resource I have designed completely.

---

## My First API Design

My initial Goal API is:

```text
POST   /api/goals
GET    /api/goals
GET    /api/goals/:id
PATCH  /api/goals/:id
DELETE /api/goals/:id
```

These endpoints support the basic CRUD operations for goals.

---

## One Endpoint I Designed

### Update Goal Status

```text
PATCH /api/goals/123
```

Request body:

```json
{
    "status": "completed"
}
```

I chose PATCH because I am modifying only one part of the goal rather than replacing the entire goal.

---

## One Design Decision I Made and Why

I decided to use:

```text
GET /api/goals?priority=high&status=pending
```

for filtering goals.

The reason is that priority and status are filters rather than identifiers for one specific goal.

This helped me understand the difference between route parameters and query parameters.

---

## One Thing I Still Find Confusing

I understand the basic difference between PUT and PATCH, but I still want more practical experience with both when I start building the Express backend.

---

## Today's Takeaway

Before implementing an API, I should first understand:

```text
What resource am I managing?
        ↓
What operation is required?
        ↓
What endpoint should I use?
        ↓
What data does the client send?
        ↓
What should the server return?
```

This makes API development more structured and easier to maintain.
