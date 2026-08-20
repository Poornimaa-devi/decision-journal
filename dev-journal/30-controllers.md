Today's Goal

Today my goal was to understand Express routing and controllers more deeply and apply the project structure I learned on Day 39.

I wanted to understand how server.js, routers, routes, middleware, and controllers communicate with each other.

What I Learned

Today I learned:

Express routing
express.Router()
app.use()
Route and controller separation
Request flow
Modular backend structure
How middleware fits into the request pipeline
How to debug a broken route

The main concept I focused on was:

server.js
    ↓
Router
    ↓
Route
    ↓
Controller
    ↓
Response
What I Built

I extended my Decision Journal backend by creating a separate resource and organizing its endpoints using routes and controllers.

Instead of keeping the implementation inside server.js, I separated the responsibilities into different files.

My structure now follows the idea of:

backend/
│
├── server.js
├── routes/
├── controllers/
├── middleware/
└── package.json
Architecture

Before learning modular routing, it was easy to put everything inside server.js.

Now I understand that server.js should mainly configure the application and connect the different parts of the backend.

The request flow is:

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

This makes the application easier to understand and maintain.

Testing

I tested my endpoints individually instead of implementing everything and testing at the end.

I checked:

GET
POST
PUT
DELETE

I also tested an invalid endpoint to understand what happens when no route matches.

Debugging
Problem

While connecting my routes and controllers, I encountered issues with the request flow.

What I Expected

I expected the request to reach the correct controller and return the expected response.

What Actually Happened

The request did not behave as expected.

How I Investigated

I traced the request step by step:

server.js
    ↓
router
    ↓
route
    ↓
controller

I checked whether the router was correctly connected, whether the route matched the request, and whether the controller function was correctly referenced.

What I Learned

I learned that debugging an Express application becomes easier when I understand the request flow instead of changing code randomly.

Reflection

The biggest improvement from Day 39 to Day 40 is that I now have a clearer understanding of how routes and controllers work together.