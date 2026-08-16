# Day 38 — Express Routing & HTTP Methods

## 1. What is routing?
Routing is how an Express app decides what to do when a request hits a specific URL. A route matches a URL and an HTTP method, then runs a function.

## 2. What is the difference between a route and an endpoint?
A route is the URL pattern, while an endpoint is the combination of URL + HTTP method. For example, `GET /api/goals` and `POST /api/goals` are different endpoints even though they share the same path.

## 3. What is the purpose of GET?
GET is used to read data. It asks the server for a resource or a list of resources.

## 4. What is the purpose of POST?
POST is used to create a new resource. The client sends data in the request body.

## 5. What is the purpose of PATCH?
PATCH is used to partially update an existing resource. Only the fields being changed are sent.

## 6. What is the purpose of DELETE?
DELETE removes a resource from the server.

## 7. What is req.params?
`req.params` contains values from route parameters like `:id` in `/api/goals/:id`.

## 8. What is req.query?
`req.query` contains query string values from the URL, such as `?completed=true&priority=high`.

## 9. What is req.body?
`req.body` contains data sent by the client in the request payload, usually JSON.

## 10. What is req.headers?
`req.headers` contains metadata about the incoming request, such as content type, authorization, and browser information.

## 11. Difference between PATCH and PUT
PATCH partially updates a resource, while PUT usually replaces the whole resource or sets it to a new full version.

## 12. Why does POST usually return 201?
`201 Created` tells the client that a new resource was successfully created.

## 13. Why do we return 404 when a goal doesn't exist?
A 404 means the requested resource was not found, which clearly communicates that the client asked for a missing goal.

## 14. Why does data disappear when the server restarts?
The data was stored in memory, not in a database, so it disappears when Node stops and the process resets.

---

## Goal API we built today
- `GET /api/goals` — get all goals
- `GET /api/goals/:id` — get one goal
- `POST /api/goals` — create a new goal
- `PATCH /api/goals/:id` — update a goal
- `DELETE /api/goals/:id` — delete a goal

## Key concept
HTTP method + URL defines the operation. This is the foundation of REST-style APIs.
