const Work = require("../models/work-model.js");

//Create and save a new work
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a Work
  const work = new Work({
    title: req.body.title,
    author_id: req.body.author_id,
    signature: req.body.signature,
    genre_id: req.body.genre_id,    
    topic_id: req.body.topic_id,
    published_year: req.body.published_year,
    notes: req.body.notes,
    status: req.body.status 

  });

  // Save Work in the database
  Work.create(work, res)
};

// Update a work identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Work.updateById(req.params.id, new Work(req.body), res) 
};

// Delete a work with the specified id in the request
exports.delete = (req, res) => {
  Work.remove(req.params.id, res) ;
};


// Find a single work with an id
exports.findOne = (req, res) => {  
  Work.findById(req.params.id, res);
};



// Retrieve all works from the database.
exports.findAll = (req, res) => {
  Work.getAll(res);
};
