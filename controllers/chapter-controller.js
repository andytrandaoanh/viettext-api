const Chapter = require("../models/chapter-model.js");

//Create and save a new chapter
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a Chapter
  const chapter = new Chapter({
    work_id: req.body.work_id,
    content: req.body.content,
    note: req.body.note,
    serial: req.body.serial,    
    status: req.body.status 

  });

  // Save Chapter in the database
  Chapter.create(chapter, res)
};

// Update a chapter identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Chapter.updateById(req.params.id, new Chapter(req.body), res) 
};

// Delete a chapter with the specified id in the request
exports.delete = (req, res) => {
  Chapter.remove(req.params.id, res) ;
};


// Find a single chapter with an id
exports.findOne = (req, res) => {  
  Chapter.findById(req.params.id, res);
};



// Retrieve all chapters from the database.
exports.findAll = (req, res) => {
  Chapter.getAll(res);
};
