const Author = require("../models/author-model.js");

//Create and save a new author
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a Author
  const author = new Author({
    name: req.body.name,
    sort_code: req.body.sort_code,
    type: req.body.type,    
    status: req.body.status

  });

  // Save Author in the database
  Author.create(author, res)
};

// Update a author identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Author.updateById(req.params.id, new Author(req.body), res) 
};

// Delete a author with the specified id in the request
exports.delete = (req, res) => {
  Author.remove(req.params.id, res) ;
};


// Find a single author with an id
exports.findOne = (req, res) => {  
  Author.findById(req.params.id, res);
};



// Retrieve all Examples from the database.
exports.findAll = (req, res) => {
  Author.getAll(res);
};
