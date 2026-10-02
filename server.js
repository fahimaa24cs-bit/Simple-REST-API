const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "records.json");

app.use(express.json());

// Read records from the JSON file.
function readRecords() {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Save records to the JSON file.
function saveRecords(records) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), "utf8");
}

app.get("/", (req, res) => {
  res.json({
    message: "CodeOrbit Task 3 REST API is running.",
    endpoints: [
      "GET /api/records",
      "GET /api/records/:id",
      "POST /api/records",
      "PUT /api/records/:id",
      "DELETE /api/records/:id"
    ]
  });
});

// GET all records.
app.get("/api/records", (req, res) => {
  res.json(readRecords());
});

// GET one record by ID.
app.get("/api/records/:id", (req, res) => {
  const id = Number(req.params.id);
  const record = readRecords().find(item => item.id === id);
  if (!record) return res.status(404).json({ error: "Record not found." });
  res.json(record);
});

// POST a new record.
app.post("/api/records", (req, res) => {
  const { name, email, note } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const records = readRecords();
  const id = records.length ? Math.max(...records.map(item => item.id)) + 1 : 1;
  const record = {
    id,
    name: String(name).trim(),
    email: String(email).trim(),
    note: note ? String(note).trim() : ""
  };

  records.push(record);
  saveRecords(records);
  res.status(201).json(record);
});

// PUT/update a record.
app.put("/api/records/:id", (req, res) => {
  const id = Number(req.params.id);
  const records = readRecords();
  const index = records.findIndex(item => item.id === id);

  if (index === -1) return res.status(404).json({ error: "Record not found." });

  const { name, email, note } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  records[index] = {
    id,
    name: String(name).trim(),
    email: String(email).trim(),
    note: note ? String(note).trim() : ""
  };

  saveRecords(records);
  res.json(records[index]);
});

// DELETE a record.
app.delete("/api/records/:id", (req, res) => {
  const id = Number(req.params.id);
  const records = readRecords();
  const index = records.findIndex(item => item.id === id);

  if (index === -1) return res.status(404).json({ error: "Record not found." });

  const deleted = records.splice(index, 1)[0];
  saveRecords(records);
  res.json({ message: "Record deleted successfully.", record: deleted });
});

// Return a JSON error for malformed request bodies.
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ error: "Invalid JSON body." });
  }
  next(error);
});

app.listen(PORT, () => {
  console.log(`REST API running at http://localhost:${PORT}`);
});