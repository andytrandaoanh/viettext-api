const Genre = require("../models/genre-model.js");

//Create and save a new genre
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a Genre
  const genre = new Genre({
    description: req.body.description,
    sort_code: req.body.sort_code,
    status: req.body.status

  });

  // Save Genre in the database
  Genre.create(genre, res)
};

// Update a genre identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Genre.updateById(req.params.id, new Genre(req.body), res) 
};

// Delete a genre with the specified id in the request
exports.delete = (req, res) => {
  Genre.remove(req.params.id, res) ;
};


// Find a single genre with an id
exports.findOne = (req, res) => {  
  Genre.findById(req.params.id, res);
};



// Retrieve all genres from the database.
exports.findAll = (req, res) => {
  Genre.getAll(res);
};
