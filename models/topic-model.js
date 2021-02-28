const query = require("./db.js");

// constructor
const Topic = function(topic) {  
  this.description = topic.description;
  this.sort_code = topic.sort_code;
  this.status = topic.status ? topic.status : 0;  
};


Topic.create = async (newTopic, response) => {
  
  try {
   
    var result = await query("INSERT INTO topics SET ?", newTopic);
    console.log("created topic: ", { id: result.insertId, ...newTopic });
    response.send({ id: result.insertId, ...newTopic });
  } 
  
  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while creating an topic."
         });

  }

};


Topic.updateById = async (id, topic, response) => {

 try {
  var sql = "UPDATE topics SET description = ?, sort_code = ?, status = ? WHERE id = ? "
  var result = await query(sql, [topic.description, topic.sort_code, topic.status, id]);
  
    if (result.affectedRows === 0) {
      response.status(404).send({
        message: `Not found topic with id ${id}.`
      });
    
    }
    else {
      console.log("updated topic: ", { id: id, ...topic });
      response.send({ id: id, ...topic });
    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while creating an topic."
        });

  }


};


Topic.remove = async (id, response) => {


  try {
    var sql = "DELETE FROM topics WHERE id = ? "
    var result = await query(sql, id);
  
    if (result.affectedRows === 0) {
      response.status(404).send({
        message: `Not found topic with id ${id}.`
      });
    
    }
    else {
      console.log("Deleted topic with id: ", id);
      response.send(result);
    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || "Some error occurred while deleting topic."
        });

  }

};


Topic.findById = async (id, response) => {

 try {
  var sql = "SELECT * FROM topics WHERE id = ? "
  var result = await query(sql, id);
  
    if (result.length) {
      response.send(result[0])
    
    }
    else {
      response.status(404).send({
        message: `Not found topic with id ${id}.`
      });    }
    
    } 

  catch(err) {
        response.status(500).send({
            message:
              err.message || `Some error occurred while retrieving topic.`
        });

  }



};


Topic.getAll = async response => {
  try {
    var sql = "SELECT * FROM topics ORDER by sort_code "
    var result = await query(sql);
    
      
      response.send(result)
  }
  
  catch(err) {
          response.status(500).send({
              message:
                err.message || `Some error occurred while retrieving topics.`
          });
  
    }
};

module.exports = Topic;
