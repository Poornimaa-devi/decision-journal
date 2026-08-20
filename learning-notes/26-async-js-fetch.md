# Day 34 — Async JavaScript, Fetch and Promises

## 1. Why is API communication asynchronous?

API communication is asynchronous because a request can take some time to complete.

The browser should not freeze while waiting for the server to respond.

JavaScript can continue performing other work while the request is being processed.

The flow is:

```text
JavaScript
    ↓
Send API request
    ↓
Continue other work
    ↓
Server responds
    ↓
Process response
```

---

## 2. What is a Promise?

A Promise represents the eventual result of an asynchronous operation.

For example, an API request may not return the data immediately.

The Promise represents the operation while JavaScript waits for its result.

---

## 3. What are the states of a Promise?

A Promise has three main states:

### Pending

The operation is still in progress.

### Fulfilled

The operation completed successfully.

### Rejected

The operation failed.

```text
Pending
   ↓
Fulfilled

or

Pending
   ↓
Rejected
```

---

## 4. What does `fetch()` return?

`fetch()` returns a Promise.

Example:

```javascript
const response = await fetch(API_URL);
```

The Promise eventually gives us a Response object.

---

## 5. What does `.then()` do?

`.then()` is used to specify what should happen when a Promise is successfully fulfilled.

Conceptually:

```javascript
fetch(API_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });
```

---

## 6. What does `.catch()` do?

`.catch()` handles errors from a rejected Promise.

Example:

```javascript
fetch(API_URL)
    .then(function(response) {
        return response.json();
    })
    .catch(function(error) {
        console.error(error);
    });
```

---

## 7. What is `async`?

`async` is used to declare an asynchronous function.

Example:

```javascript
async function fetchTodos() {

}
```

An async function always returns a Promise.

---

## 8. What does `await` do?

`await` waits for a Promise to settle inside an async function.

Example:

```javascript
const response = await fetch(API_URL);
```

The code waits for the fetch operation to complete before continuing to the next statement.

---

## 9. Difference between Response object and JSON data

The Response object contains information about the HTTP response.

For example:

```javascript
response.status
response.ok
```

The actual data is obtained by reading the response body:

```javascript
const data = await response.json();
```

Therefore:

```text
fetch()
   ↓
Response object
   ↓
response.json()
   ↓
Actual JavaScript data
```

---

## 10. Why do we need loading states?

API requests take time.

During that time, the user needs feedback that something is happening.

For example:

```text
Loading goals...
```

A loading state improves the user experience because the page does not appear broken or unresponsive.

---

## 11. Why do we need error states?

API requests can fail because of network problems, invalid requests, server errors, or other issues.

Instead of leaving the user with a blank page, the application should display a useful message.

For example:

```text
Unable to load goals. Please try again.
```

---

## 12. Does a 404 automatically cause `fetch()` to reject?

No.

This is an important concept.

A HTTP error such as `404` normally still gives us a Response object.

Therefore, we should check:

```javascript
if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
}
```

Then the error can be handled by `catch`.

---

## 13. Day 34 Request-Response Flow

My API experiment follows this flow:

```text
fetch()
   ↓
Promise
   ↓
Response
   ↓
response.json()
   ↓
JSON data
   ↓
JavaScript
   ↓
DOM
   ↓
User
```

---

## 14. What I Learned From the API Experiment

I used a public test API to understand how JavaScript communicates with a server.

I learned that `fetch()` returns a Promise and that the response body must be parsed using `response.json()` to access the actual data.

I also learned why HTTP status checking and error handling are important.

---

## Key Concepts

```text
fetch()
→ Starts an HTTP request and returns a Promise.

Promise
→ Represents the future result of an asynchronous operation.

async
→ Declares an asynchronous function.

await
→ Waits for a Promise to settle inside an async function.

Response
→ Represents the server's HTTP response.

response.json()
→ Reads and parses the response body as JSON.

response.ok
→ Indicates whether the HTTP response was successful.
```
