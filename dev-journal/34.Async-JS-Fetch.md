# Day 34 — Development Journal

## Today's Goal

Today's goal was to understand asynchronous JavaScript and how the `fetch()` API can be used to communicate with a server.

I created a small API experiment using a public test API instead of connecting to my actual Decision Journal backend.

---

## API Experiment

I used:

```text
https://jsonplaceholder.typicode.com/todos
```

to practice making a GET request.

The basic flow was:

```text
fetch()
   ↓
Promise
   ↓
Response
   ↓
JSON
   ↓
Data
   ↓
DOM
```

---

## What I Learned

I learned that `fetch()` does not immediately give me the requested data.

It returns a Promise.

After the Promise is fulfilled, I receive a Response object.

Then I use:

```javascript
response.json()
```

to read the response body and obtain the actual data.

---

## My Request Flow

My experiment followed this flow:

```text
JavaScript
    ↓
fetch()
    ↓
API Request
    ↓
Server
    ↓
Response
    ↓
response.json()
    ↓
Todo Data
    ↓
DOM
```

---

## What Surprised Me

One important thing I learned is that a `404` HTTP error does not automatically make `fetch()` reject.

Therefore, I need to check:

```javascript
if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
}
```

This makes HTTP errors easier to handle using `catch`.

---

## Error Handling Experiment

I intentionally changed the API URL to an invalid endpoint.

This helped me understand what happens when an API request does not return a successful HTTP response.

After testing the error case, I restored the correct API URL.

---

## What I Learned About Promises

A Promise can have three states:

```text
Pending
Fulfilled
Rejected
```

This helped me understand why API communication is asynchronous.

---

## `async` and `await`

I learned that:

```javascript
async
```

is used to create an asynchronous function.

And:

```javascript
await
```

allows me to wait for a Promise to settle before continuing inside that function.

This makes asynchronous code easier to read.

---

## Biggest Learning

My biggest learning today was understanding the difference between the Response object and the actual JSON data.

```text
fetch()
   ↓
Response object
   ↓
response.json()
   ↓
Actual data
```

Before today, I thought receiving the Response meant I already had the data. Now I understand that the response body needs to be read and parsed.

---

## What I Want to Learn Next

I want to understand how these concepts will connect to my actual Decision Journal application.

In particular, I want to learn how to:

* Send data using POST
* Retrieve goals using GET
* Handle API loading states
* Handle API errors
* Connect JavaScript to a real backend
* Eventually replace Local Storage with MongoDB

---

## Day 34 Status

* [x] Created API experiment
* [x] Used `fetch()`
* [x] Made a GET request
* [x] Learned about Promises
* [x] Learned `async` and `await`
* [x] Processed JSON data
* [x] Displayed API data on the page
* [x] Tested an invalid endpoint
* [x] Learned HTTP error handling
* [x] Created learning notes
* [x] Created development journal
