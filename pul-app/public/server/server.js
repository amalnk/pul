const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load existing data or create an empty array
const FILE_PATH = "utilities.json";
let utilities = [];

if (fs.existsSync(FILE_PATH)) {
  const fileData = fs.readFileSync(FILE_PATH);
  utilities = JSON.parse(fileData);
}

// API to save form data
app.post("/save", (req, res) => {
  const data = req.body;
  utilities.push(data);

  fs.writeFile(FILE_PATH, JSON.stringify(utilities, null, 2), (err) => {
    if (err) {
      res.status(500).json({ message: "Error saving data" });
    } else {
      res.json({ message: "Data saved successfully!" });
    }
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
