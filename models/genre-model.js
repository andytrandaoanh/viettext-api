const query = require("./db.js");

// constructor
const Genre = function(genre) {  
  this.description = genre.description;
  this.sort_code = genre.sort_code;
  this.status = genre.status ? genre.status : 0;  
};


Genre.create = async (newGenre, response) => {
  
  try {
   
    var result = await query("INSERT INTO genres SET ?", newGenre);
    console.log("created genre: ", { id: result.insertId, ...newGenre });
    response.send({ id: result.insertId, ...newGenre });
  } 
  
  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while creating an genre."
         });

  }

};


Genre.updateById = async (id, genre, response) => {

 try {
  var sql = "UPDATE genres SET description = ?, sort_code = ?, status = ? WHERE id = ? "
  var result = await query(sql, [genre.description, genre.sort_code, genre.status, id]);
  
    if (result.affectedRows === 0) {
      response.status(404).send({
        message: `Not found genre with id ${id}.`
      });
    
    }
    else {
      console.log("updated genre: ", { id: id, ...genre });
      response.send({ id: id, ...genre });
    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while creating an genre."
        });

  }


};


Genre.remove = async (id, response) => {


  try {
    var sql = "DELETE FROM genres WHERE id = ? "
    var result = await query(sql, id);
  
    if (result.affectedRows === 0) {
      response.status(404).send({
        message: `Not found genre with id ${id}.`
      });
    
    }
    else {
      console.log("Deleted genre with id: ", id);
      response.send(result);
    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while deleting genre."
        });

  }

};


Genre.findById = async (id, response) => {

 try {
  var sql = "SELECT * FROM genres WHERE id = ? "
  var result = await query(sql, id);
  
    if (result.length) {
      response.send(result[0])
    
    }
    else {
      response.status(404).send({
        message: `Not found genre with id ${id}.`
      });    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || `Some error occurred while retrieving genre.`
        });

  }



};


Genre.getAll = async response => {
  try {
    var sql = "SELECT * FROM genres ORDER by sort_code "
    var result = await query(sql);
    
      
      response.send(result)
  }
  
  catch(err) {
          response.status(500).send({
              message:
                err.message || `Some error occurred while retrieving genres.`
          });
  
    }
};

module.exports = Genre;
