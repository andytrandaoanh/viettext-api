const query = require("./db.js");

// constructor
const Work = function(work) {  
  this.title = work.title;
  this.author_id = work.author_id;
  this.signature = work.signature;
  this.genre_id = work.genre_id;  
  this.topic_id = work.topic_id;
  this.published_year = work.published_year;
  this.notes = work.notes;
  this.status = work.status ? work.status : 0;

};


Work.create = async (newWork, response) => {
  
  try {
   
    var result = await query("INSERT INTO works SET ?", newWork);
    console.log("created work: ", { id: result.insertId, ...newWork });
    response.send({ id: result.insertId, ...newWork });
  } 
  
  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while creating  work."
         });

  }

};


Work.updateById = async (id, work, response) => {

 try {
  var sql = `UPDATE works SET title = ?, author_id = ?, signature = ?, 
            genre_id=?, topic_id =?, published_year =?, notes =?,  
            status = ?  WHERE id = ? `
  var result = await query(sql, 
        [ work.title, work.author_id, work.signature, 
        work.genre_id, work.topic_id, work.published_year, work.notes, 
        work.status, id]);
  
    if (result.affectedRows === 0) {
      response.status(404).send({
        message: `Not found work with id ${id}.`
      });
    
    }
    else {
      console.log("updated work: ", { id: id, ...work });
      response.send({ id: id, ...work });
    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while updating work."
        });

  }


};


Work.remove = async (id, response) => {


  try {
    var sql = "DELETE FROM works WHERE id = ? "
    var result = await query(sql, id);
  
    if (result.affectedRows === 0) {
      response.status(404).send({
        message: `Not found work with id ${id}.`
      });
    
    }
    else {
      console.log("Deleted work with id: ", id);
      response.send(result);
    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while deleting work."
        });

  }

};


Work.findById = async (id, response) => {

 try {
  var sql = "SELECT * FROM works WHERE id = ? "
  var result = await query(sql, id);
  
    if (result.length) {
      response.send(result[0])
    
    }
    else {
      response.status(404).send({
        message: `Not found work with id ${id}.`
      });    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || `Some error occurred while retrieving work.`
        });

  }



};


Work.getAll = async response => {
  try {
    var sql = "SELECT * FROM works ORDER by id "
    var result = await query(sql);
    
      
      response.send(result)
  }
  
  catch(err) {
          response.status(500).send({
              message:
                err.message || `Some error occurred while retrieving works.`
          });
  
    }
};

module.exports = Work;
