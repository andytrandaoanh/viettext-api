const express = require('express');
const router = express.Router();
const authors = require("../controllers/author-controller.js");

router.post("/authors",  authors.create);

router.put("/authors/:id",  authors.update);

router.delete("/authors/:id", authors.delete);

router.get("/authors/:id", authors.findOne);

router.get("/authors", authors.findAll);

module.exports = router;
