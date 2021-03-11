const query = require("./db.js");

// constructor
const Author = function(author) {  
  this.name = author.name;
  this.sort_code = author.sort_code;
  this.type = author.type ? author.type : 0;
  this.status = author.status ? author.status : 0;  
};


Author.create = async (newAuthor, response) => {
  
  try {
   
    var result = await query("INSERT INTO authors SET ?", newAuthor);
    console.log("created author: ", { id: result.insertId, ...newAuthor });
    response.send({ id: result.insertId, ...newAuthor });
  } 
  
  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while creating an author."
         });

  }

};


Author.updateById = async (id, author, response) => {

 try {
  var sql = "UPDATE authors SET name = ?, sort_code = ?, type=?, status = ? WHERE id = ? "
  var result = await query(sql, [author.name, author.sort_code, author.type, author.status, id]);
  
    if (result.affectedRows === 0) {
      response.status(404).send({
        message: `Not found author with id ${id}.`
      });
    
    }
    else {
      console.log("updated author: ", { id: id, ...author });
      response.send({ id: id, ...author });
    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while creating an author."
        });

  }


};


Author.remove = async (id, response) => {


  try {
    var sql = "DELETE FROM authors WHERE id = ? "
    var result = await query(sql, id);
  
    if (result.affectedRows === 0) {
      response.status(404).send({
        message: `Not found author with id ${id}.`
      });
    
    }
    else {
      console.log("Deleted author with id: ", id);
      response.send(result);
    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while deleting author."
        });

  }

};


Author.findById = async (id, response) => {

 try {
  var sql = "SELECT * FROM authors WHERE id = ? "
  var result = await query(sql, id);
  
    if (result.length) {
      response.send(result[0])
    
    }
    else {
      response.status(404).send({
        message: `Not found author with id ${id}.`
      });    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || `Some error occurred while retrieving author.`
        });

  }



};


Author.getAll = async response => {
  try {
    var sql = "SELECT * FROM authors ORDER by sort_code "
    var result = await query(sql);
    
      
      response.send(result)
  }
  
  catch(err) {
          response.status(500).send({
              message:
                err.message || `Some error occurred while retrieving authors.`
          });
  
    }
};


Author.findByQuery = async (request, response) => {


  let sql = `SELECT * FROM authors ORDER by id`;

  if ('type' in request.query) 
    sql = `SELECT * FROM authors
    where type =  ${request.query.type} order by sort_code`;
  else if ('recentupdate' in request.query) {
      let limit = request.query.limit ? request.query.limit : 10; 
      sql = `SELECT * FROM authors  order by id desc limit  ${limit}`;

    }
  try {      
    
    var result = await query(sql);
    
      if (result.length) {
        response.send(result)
      
      }
      else {
        response.status(404).send({
          message: `Not found authors with query parameters`
        });    }
      
      } 
  
    catch(err) {
          response.status(500).send({
              message:
                err.message || `Some error occurred while retrieving authors.`
          });
  
    }
  
};




module.exports = Author;
