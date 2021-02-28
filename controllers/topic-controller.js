const Topic = require("../models/topic-model.js");

//Create and save a new topic
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a Topic
  const topic = new Topic({
    description: req.body.description,
    sort_code: req.body.sort_code,
    status: req.body.status

  });

  // Save Topic in the database
  Topic.create(topic, res)
};

// Update a topic identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Topic.updateById(req.params.id, new Topic(req.body), res) 
};

// Delete a topic with the specified id in the request
exports.delete = (req, res) => {
  Topic.remove(req.params.id, res) ;
};


// Find a single topic with an id
exports.findOne = (req, res) => {  
  Topic.findById(req.params.id, res);
};



// Retrieve all topics from the database.
exports.findAll = (req, res) => {
  Topic.getAll(res);
};
