# Day 38 — Express Routing & HTTP Methods

## Today's Goal
Build a working CRUD-style API for the Decision Journal goals resource using Express.

## What routing means
Routing means telling Express what should happen when a request comes in for a particular URL and method. In our project, the app now decides which logic runs for GET, POST, PATCH, and DELETE requests.

## What I learned about HTTP methods
- GET = read data
- POST = create data
- PATCH = update part of data
- DELETE = remove data
A request is often described as URL + method, which together decide the action.

## My Goal API endpoints
- `GET /api/goals`
- `GET /api/goals/:id`
- `POST /api/goals`
- `PATCH /api/goals/:id`
- `DELETE /api/goals/:id`

## How req.params works
`req.params` reads values from the route, like `:id` in `/api/goals/2`. That lets the server find the correct goal.

## How req.query works
`req.query` reads values from the URL query string, such as `?completed=false` or `?priority=high`. This is good for filtering results.

## How req.body works
`req.body` carries JSON data sent from the client during POST or PATCH requests. That is where we put new goal data or updates.

## What happened when I restarted the server
The goals were stored in memory in the server file, so they disappeared after a restart. This shows why a real project needs a database.

## Why we need a database
A database persists data after the server restarts or crashes. In-memory arrays are fine for learning, but they are not reliable for real apps.

## One thing I struggled with
Understanding the difference between route params, query params, and body data was tricky at first.

## One thing I can explain confidently
I can now explain that Express routes are defined by URL + HTTP method, and each route performs one CRUD action for the resources in my app.

## Reflection
This was the first time my backend acted like a real API instead of just returning hardcoded data. I now understand the request lifecycle better and can see how frontend and backend communicate using JSON and status codes.
