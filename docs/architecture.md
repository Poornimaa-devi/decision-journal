# Decision Journal - System Architecture

## High-Level Architecture

```text
                User
                  │
                  ▼
        Browser (React Frontend)
                  │
             HTTP Request
                  │
                  ▼
      Node.js + Express Backend
                  │
           Database Query
                  │
                  ▼
              MongoDB
```

## Components

### User
The user interacts with the application by creating goals, recording decisions, tracking progress, and writing reflections.

### Browser (Frontend)
The frontend provides the user interface. It displays information, accepts user input, and sends requests to the backend.

### HTTP Request
HTTP is the communication method used by the browser to send data to the server and receive responses.

### Node.js + Express Server
The backend processes requests, validates data, performs business logic, and communicates with the database.

### MongoDB
MongoDB stores all application data such as users, goals, decisions, progress updates, and reflections.