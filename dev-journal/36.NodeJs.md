# Day 36 — Node.js

## Today's Goal

Understand what Node.js is and create the initial backend foundation for my Decision Journal project.

---

## What Node.js Actually Is

Node.js is a runtime environment that allows JavaScript to run outside the browser.

It can be used to build backend applications and servers.

---

## How Node.js Differs From Browser JavaScript

Browser JavaScript runs inside the browser and can interact with the DOM.

Node.js runs outside the browser and does not normally have access to objects such as `document`.

Node.js provides APIs that are useful for backend and system-level applications.

---

## What I Learned About npm

npm is the Node Package Manager.

I used npm to initialize my backend project and create `package.json`.

npm can also be used to install packages and run project scripts.

---

## What I Learned About package.json

`package.json` is the configuration and metadata file for my Node.js project.

It contains information such as the project name, version, scripts and dependencies.

---

## My First Node.js Experiment

I created:

- `backend/server.js`
- `backend/file1.js`
- `backend/file2.js`

I executed JavaScript using Node with:

node server.js

I also experimented with importing/reusing code between Node.js files.

---

## What Confused Me

Initially, I thought Node.js itself was a backend framework.

I learned that Node.js is actually a runtime environment, while Express is a framework that runs on Node.js.

---

## What I Can Now Explain Confidently

I can now explain:

- What Node.js is
- What a runtime environment is
- Difference between Node.js and browser JavaScript
- What npm is
- What package.json is
- What node_modules is
- Why node_modules should not normally be committed
- Why Express and Node.js are different

---

## My Future Backend Architecture

JavaScript
↓
Node.js
↓
Express
↓
REST API
↓
MongoDB

---

## Biggest Learning

Node.js allows me to use JavaScript beyond the browser and provides the foundation for building the backend of my Decision Journal.