
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Our first API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Dearie's backend! ♡" });
});

// Save a user's name
app.post("/api/users", (req, res) => {
  const { name } = req.body || {};

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      message: "Please enter your name ♡",
    });
  }

  // Replace the single prototype user
  const existingUser = db
    .prepare("SELECT id FROM users ORDER BY id DESC LIMIT 1")
    .get();

  let user;

  if (existingUser) {
    db.prepare("UPDATE users SET name = ? WHERE id = ?")
      .run(name.trim(), existingUser.id);

    user = {
      id: existingUser.id,
      name: name.trim(),
    };
  } else {
    const result = db
      .prepare("INSERT INTO users (name) VALUES (?)")
      .run(name.trim());

    user = {
      id: Number(result.lastInsertRowid),
      name: name.trim(),
    };
  }

  res.status(201).json({
    message: "Welcome to Dearie! ♡",
    user,
  });
});

// Get the saved user
app.get("/api/users", (req, res) => {
  const user = db
    .prepare("SELECT id, name FROM users ORDER BY id DESC LIMIT 1")
    .get();

  res.json(user || null);
});

// Save a mood
app.post("/api/moods", (req, res) => {
  const { mood } = req.body || {};

  const allowedMoods = ["low", "sad", "angry", "happy", "loved"];

  if (!allowedMoods.includes(mood)) {
    return res.status(400).json({
      message: "Please select a valid mood ♡",
    });
  }

  const createdAt = new Date().toISOString();

  // Save the mood to SQLite
  const result = db
    .prepare(
      "INSERT INTO moods (mood, created_at) VALUES (?, ?)"
    )
    .run(mood, createdAt);

  const newMood = {
    id: Number(result.lastInsertRowid),
    mood,
    createdAt,
  };

  res.status(201).json({
    message: "Mood saved successfully! ♡",
    entry: newMood,
  });
});

// Get all saved moods
app.get("/api/moods", (req, res) => {
  const moods = db
    .prepare(
      `SELECT id, mood, created_at AS createdAt
       FROM moods
       ORDER BY id DESC`
    )
    .all();

  res.json(moods);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Dearie server running on http://localhost:${PORT}`);
});
