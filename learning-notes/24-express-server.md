# Day 37 — Express Server

## 1. What is Express?

Express is a web framework that runs on Node.js.

It provides convenient tools for building web servers and REST APIs.

Instead of handling HTTP requests using only Node.js low-level APIs, Express makes routing and request/response handling much easier.

---

## 2. Why do we use Express with Node.js?

Node.js provides the runtime environment for executing JavaScript outside the browser.

Express runs on top of Node.js and provides tools for:

- Creating servers
- Defining routes
- Handling HTTP requests
- Sending responses
- Building APIs

The relationship is:

Node.js
↓
Express
↓
HTTP Server
↓
API

---

## 3. What is a server?

A server is a program that listens for requests and sends responses.

In my Decision Journal project, my Express application acts as the server.

The basic flow is:

Client
↓
Request
↓
Server
↓
Response
↓
Client

---

## 4. What does localhost mean?

`localhost` means my own computer.

When I use:

http://localhost:3000

I am accessing the server running on my own computer on port 3000.

---

## 5. What is a port?

A port is a numbered communication endpoint used by network applications.

For example:

localhost:3000

Here:

- `localhost` → my computer
- `3000` → port number

My Express server listens on port 3000.

---

# Express Concepts

## 6. What is an Express application?

An Express application is created using:

```javascript
const app = express();