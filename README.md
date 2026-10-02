# CodeOrbit Task 3 — Simple REST API with Node.js

A beginner-friendly REST API built with **Node.js** and **Express** for the CodeOrbit Tech Full Stack Development Internship.

## Technologies Used
- Node.js
- Express.js
- JavaScript
- JSON file storage
- Postman for API testing

## Features
- View all records
- View one record by ID
- Add a record
- Update a record
- Delete a record
- JSON-file storage with no database setup
- Basic validation and error handling

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/records` | Get all records |
| GET | `/api/records/:id` | Get one record |
| POST | `/api/records` | Create a record |
| PUT | `/api/records/:id` | Update a record |
| DELETE | `/api/records/:id` | Delete a record |

## Setup

1. Install Node.js.
2. Open this folder in PyCharm or VS Code.
3. Open the terminal.
4. Run:

```bash
npm install
```

5. Start the server:

```bash
npm start
```

The API runs at:

`http://localhost:3000`

## Postman Testing

### GET all
`GET http://localhost:3000/api/records`

### GET one
`GET http://localhost:3000/api/records/1`

### POST
`POST http://localhost:3000/api/records`

Body → raw → JSON:

```json
{
  "name": "Anu",
  "email": "anu@example.com",
  "note": "New contact"
}
```

### PUT
`PUT http://localhost:3000/api/records/1`

```json
{
  "name": "Fahima A",
  "email": "fahimaa24cs@example.com",
  "note": "Updated contact"
}
```

### DELETE
`DELETE http://localhost:3000/api/records/1`

## GitHub Repository

`https://github.com/fahimaa24cs-bit/CodeOrbit-Task3-REST-API`

## CodeOrbit Task 3 Requirement

This project implements a basic REST API using Node.js and Express, with endpoints to add, view, update, and delete simple records. Data is stored in a JSON file, and the API can be tested with Postman.
