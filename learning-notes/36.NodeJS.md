# Day 36 — Node.js

## 1. What is Node.js?

Node.js is a runtime environment that allows JavaScript to run outside the browser.

It uses the V8 JavaScript engine and can be used to build backend and server-side applications.

---

## 2. Is Node.js a language, framework, or runtime?

Node.js is a runtime environment.

JavaScript is the programming language.

Express is a framework that runs on Node.js.

---

## 3. What is a runtime environment?

A runtime environment provides the tools and environment required to execute a program.

Node.js allows JavaScript code to execute outside the browser.

---

## 4. Node.js vs Browser JavaScript

Browser JavaScript mainly runs inside a web browser and can interact with the DOM.

Node.js runs outside the browser and provides APIs for server-side and system-level tasks.

For example, normal Node.js code does not have access to `document` like browser JavaScript does.

---

## 5. Why doesn't Node.js normally have access to the DOM?

The DOM belongs to the browser environment.

Node.js runs outside the browser, so objects such as `window` and `document` are not normally available.

---

## 6. What is npm?

npm stands for Node Package Manager.

It is used to manage Node.js packages and dependencies.

It can also be used to run project scripts.

---

## 7. What is a package?

A package is reusable code that can be added to a Node.js project.

For example, Express is a package that can be installed using npm.

---

## 8. What is package.json?

`package.json` is the configuration and metadata file for a Node.js project.

It contains information such as:

- Project name
- Version
- Scripts
- Dependencies

---

## 9. What is node_modules?

`node_modules` contains the packages installed for a Node.js project and their dependencies.

---

## 10. Why shouldn't node_modules normally be committed to Git?

It can become very large and can be recreated using the project's dependency information.

Therefore, `node_modules` is normally added to `.gitignore`.

---

## 11. What is package-lock.json?

`package-lock.json` records the exact dependency versions installed for the project.

It helps make installations more consistent across different environments.

---

## 12. Node.js vs Express

Node.js is the runtime environment.

Express is a web framework that runs on Node.js.

Node.js provides the environment for executing JavaScript, while Express provides convenient tools for creating HTTP servers and APIs.

---

## My First Node.js Experiment

I created `server.js` and executed it using:

node server.js

The JavaScript code successfully executed outside the browser.

I also created two files and experimented with sharing data between Node.js modules.

---

## What I Learned

The most important thing I learned today is that Node.js is not a programming language or a framework.

It is a runtime environment that allows JavaScript to run outside the browser.

My future backend architecture will be:

JavaScript
↓
Node.js
↓
Express
↓
REST API
↓
MongoDB