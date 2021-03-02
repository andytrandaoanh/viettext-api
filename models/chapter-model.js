const query = require("./db.js");

// constructor
const Chapter = function(chapter) {  
  this.work_id = chapter.work_id;
  this.content = chapter.content;
  this.note = chapter.note;
  this.serial = chapter.serial;
  this.status = chapter.status ? chapter.status : 0;

};



Chapter.create = async (newChapter, response) => {
  
  try {
   
    var result = await query("INSERT INTO chapters SET ?", newChapter);
    console.log("created chapter: ", { id: result.insertId, ...newChapter });
    response.send({ id: result.insertId, ...newChapter });
  } 
  
  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while creating  chapter."
         });

  }

};


Chapter.updateById = async (id, chapter, response) => {

 try {
  var sql = `UPDATE chapters SET work_id = ?, content = ?, note = ?, serial = ?,             
            status = ?  WHERE id = ? `
  var result = await query(sql, 
        [ chapter.work_id, chapter.content, chapter.note, chapter.serial,        
        chapter.status, id]);
  
    if (result.affectedRows === 0) {
      response.status(404).send({
        message: `Not found chapter with id ${id}.`
      });
    
    }
    else {
      console.log("updated chapter: ", { id: id, ...chapter });
      response.send({ id: id, ...chapter });
    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while updating chapter."
        });

  }


};


Chapter.remove = async (id, response) => {


  try {
    var sql = "DELETE FROM chapters WHERE id = ? "
    var result = await query(sql, id);
  
    if (result.affectedRows === 0) {
      response.status(404).send({
        message: `Not found chapter with id ${id}.`
      });
    
    }
    else {
      console.log("Deleted chapter with id: ", id);
      response.send(result);
    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while deleting chapter."
        });

  }

};


Chapter.findById = async (id, response) => {

 try {
  var sql = "SELECT * FROM chapters WHERE id = ? "
  var result = await query(sql, id);
  
    if (result.length) {
      response.send(result[0])
    
    }
    else {
      response.status(404).send({
        message: `Not found chapter with id ${id}.`
      });    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || `Some error occurred while retrieving chapter.`
        });

  }



};


Chapter.getAll = async response => {
  try {
    var sql = "SELECT * FROM chapters ORDER by id "
    var result = await query(sql);
    
      
      response.send(result)
  }
  
  catch(err) {
          response.status(500).send({
              message:
                err.message || `Some error occurred while retrieving chapters.`
          });
  
    }
};

module.exports = Chapter;
