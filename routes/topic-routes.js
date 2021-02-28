const express = require('express');
const router = express.Router();
const topics = require("../controllers/topic-controller.js");

router.post("/topics",  topics.create);

router.put("/topics/:id",  topics.update);

router.delete("/topics/:id", topics.delete);

router.get("/topics/:id", topics.findOne);

router.get("/topics", topics.findAll);

module.exports = router;
