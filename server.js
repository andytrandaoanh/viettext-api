require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authorRoutes = require('./routes/author-routes');
const genreRoutes = require('./routes/genre-routes');
const topicRoutes = require('./routes/topic-routes');
const workRoutes = require('./routes/work-routes');
const chapterRoutes = require('./routes/chapter-routes');

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
app.use('/api', genreRoutes);
app.use('/api', workRoutes);
app.use('/api', topicRoutes);
app.use('/api', chapterRoutes);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
