const express = require('express');
const router = express.Router();
const works = require("../controllers/work-controller.js");

router.post("/works",  works.create);

router.put("/works/:id",  works.update);

router.delete("/works/:id", works.delete);

router.get("/works/:id", works.findOne);

router.get("/works", works.findAll);

module.exports = router;
