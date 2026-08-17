1. What is Express Routing?

Routing determines how an Express application responds to a particular HTTP method and URL.

For example:

GET /api/goals
POST /api/goals
PUT /api/goals/:id
DELETE /api/goals/:id

Each route can be connected to a specific controller function.

2. What is a Route?

A route defines:

HTTP method
URL/path
Function that should handle the request

The route mainly answers:

Which function should handle this request?

3. What is a Controller?

A controller contains the logic that should execute when a route is accessed.

The controller answers:

What should happen when this request arrives?

So:

Route       → Where should the request go?
Controller  → What should happen?
4. Why Separate Routes and Controllers?

Keeping routes and controllers separate makes the application:

Easier to understand
Easier to maintain
Easier to debug
Easier to extend
Less dependent on one large server.js file

As the Decision Journal grows, I can create separate route and controller files for resources such as:

Goals
Progress
Milestones
Reflections
Users
5. What is express.Router()?

express.Router() allows me to create a separate group of related routes.

Instead of putting every route inside server.js, I can organize routes into separate files.

For example:

routes/
├── goalRoutes.js
├── progressRoutes.js
└── userRoutes.js

This makes the backend modular.

6. What is app.use()?

app.use() is used to attach middleware or routers to the Express application.

For routers, it allows server.js to connect a particular base path with a router.

Conceptually:

server.js
    ↓
/api/goals
    ↓
goal router
    ↓
goal routes
7. Request Flow

A request in my Decision Journal backend can flow like this:

Client
   ↓
server.js
   ↓
Middleware
   ↓
Router
   ↓
Route
   ↓
Controller
   ↓
Response

Understanding this flow helps me debug problems instead of randomly changing code.

8. app.get() vs router.get()

app.get() defines a route directly on the Express application.

router.get() defines a route inside an Express router.

When using a modular architecture, router.get() is useful because related routes can be kept in their own route file.

9. What Happens When No Route Matches?

If a request doesn't match any available route, Express cannot find a handler for that request.

This can eventually be handled using custom 404/error-handling middleware.

I don't need to implement advanced error handling yet, but I should understand where the problem occurs in the request flow.

10. Middleware and Controllers

Middleware and controllers have different responsibilities.

Middleware
    ↓
Performs tasks before the controller

Examples:

Logging
Authentication
Validation
Parsing request data

The controller handles the actual operation for the endpoint.