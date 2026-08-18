# Day 41 — Middleware and Validation

## What I learned
I learned that middleware is a part of the Express request lifecycle. It runs before the controller and can help with logging, validation, and error handling.

## What I built
I reviewed the structure of my Decision Journal backend and identified how routes, controllers, and middleware connect in the project.

## Problems I faced
I found that my project already has route and controller files, but the goal routes are not fully connected to the server. I also realized that validation and error handling are the next important steps.

## How I solved them
I traced the request flow step by step and identified the missing wiring in the backend architecture. I focused on understanding how each part of the app should work together.

## What I understood
I understand that middleware can handle cross-cutting concerns, while routes decide which controller will run. Controllers do the actual business logic, and validation protects the system from bad input.

## What I will learn next
I will learn how to add proper validation and improve the goal API so that invalid requests are rejected cleanly and the backend feels more production-ready.