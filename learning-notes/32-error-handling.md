# Day 41 — Middleware and Validation

## What I learned
Today I learned that Express applications are built around middleware, routes, and controllers.

## Why it matters
Middleware helps run code between receiving a request and sending a response. Validation helps ensure the data is correct before any business logic runs.

## Project connection
In Decision Journal, middleware can log requests and validate goal data before creating or updating a goal.

## Key idea
Request flow:
server.js -> middleware -> route -> controller -> response

## Important concept
Validation prevents invalid data from entering the system. Error handling makes the API clearer and more professional.

## Common mistakes
- forgetting to mount routes
- not validating request data
- returning vague errors
- not checking the request body