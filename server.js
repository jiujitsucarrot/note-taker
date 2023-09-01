const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Path to the db.json file
const dbPath = path.join(__dirname, './db/db.json');

// GET route to serve the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// GET route to serve the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});


// API routes
let notes = require('./db/db.json');

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;

// Assign a unique ID to the new note (you can use a library for generating UUIDs)
    newNote.id = Math.floor(Math.random() * 100000).toString();
    notes.push(newNote);
    saveNotesToFile();
    res.json(newNote);
});

// Function to save notes to db.json
function saveNotesToFile() {
    fs.writeFileSync(dbPath, JSON.stringify(notes), 'utf8');
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});