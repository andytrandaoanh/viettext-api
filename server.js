require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authorRoutes = require('./routes/author-routes');
const workRoutes = require('./routes/work-routes');

const PORT = process.env.PORT | 5000;
const app = express();

app.use(cors());

app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Viettex API." });
});

app.use('/api', authorRoutes);
app.use('/api', workRoutes);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
