const express = require('express');
const router = express.Router();
const genres = require("../controllers/genre-controller.js");

router.post("/genres",  genres.create);

router.put("/genres/:id",  genres.update);

router.delete("/genres/:id", genres.delete);

router.get("/genres/:id", genres.findOne);

router.get("/genres", genres.findAll);

module.exports = router;
