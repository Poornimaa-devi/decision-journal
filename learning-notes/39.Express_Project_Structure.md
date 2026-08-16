# Day 39 — Express Project Structure & Middleware

## 1. Why shouldn't everything be written inside server.js?
Because one file becomes crowded and hard to maintain. A backend grows bigger as you add routes, validations, logic, and middleware. Splitting responsibilities makes the project easier to understand and debug.

## 2. What is separation of concerns?
Separation of concerns means each part of the application has one clear responsibility. For example, the route file decides which URL should trigger which logic, while the controller performs the actual work.

## 3. What is the responsibility of a route?
A route decides which URL and HTTP method should run a specific action. It connects a request to a function.

## 4. What is the responsibility of a controller?
A controller contains the actual logic for handling a request and sending a response. It performs the task, such as getting all goals, creating a new goal, or deleting a goal.

## 5. What is middleware?
Middleware is a function that runs between the incoming request and the final response. It can log the request, validate input, check authentication, or modify request data before the controller runs.

## 6. Why is middleware useful?
Middleware helps organize logic that should happen before or during request processing. It is useful for logging, validation, authentication, error handling, and JSON parsing.

## 7. What does next() mean?
`next()` tells Express to continue to the next middleware or route handler in the pipeline. If middleware does not call `next()` and also does not send a response, the request may hang.

## 8. Can middleware stop a request?
Yes. Middleware can send a response and stop the request immediately. For example, if a user is not authenticated, the middleware can return a 401 response and prevent the controller from running.

## 9. Can middleware modify a request?
Yes. Middleware can add properties to `req`, change values, or validate the incoming data before the controller handles it.

## 10. Why do we need JSON body-parsing middleware?
Because clients often send data as JSON in POST or PATCH requests. Without `express.json()`, the server cannot read `req.body` properly.

## 11. What should server.js ideally be responsible for?
`server.js` should mainly set up the app, register middleware, connect the routes, and start the server. It should not contain all the business logic.

## 12. What is the difference between a route and a controller?
A route answers: “Which function handles this request?”  
A controller answers: “What should happen when this request arrives?”

## 13. Where will the database model fit into our architecture?
Later, the model will represent the Goal data and how it is stored in the database. Models normally handle interactions with the database, while controllers coordinate requests and responses.

## 14. Explain the complete request flow in your Decision Journal.
A request comes into the app. Middleware may run first. Then the route matches the URL and method. The controller executes the logic, interacts with the goal data, and sends a response back to the client. This is the basic request-response pipeline in Express.

---

## Project structure we are moving toward
- `server.js` → app setup and startup
- `routes/` → URL and method definitions
- `controllers/` → CRUD logic
- `middleware/` → reusable request logic
- later: `models/` → database data handling

## Key idea
A real Express app should separate setup, routes, logic, and middleware so the project stays organized as it grows.