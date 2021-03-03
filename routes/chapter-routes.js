const express = require('express');
const router = express.Router();
const chapters = require("../controllers/chapter-controller.js");

router.post("/chapters",  chapters.create);

router.put("/chapters/:id",  chapters.update);

router.delete("/chapters/:id", chapters.delete);

router.get("/chapters/search", chapters.filter);

router.get("/chapters/:id", chapters.findOne);

router.get("/chapters", chapters.findAll);

module.exports = router;
