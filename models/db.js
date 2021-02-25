const mysql = require('mysql');
const util = require('util');


const params =   {  
    host: process.env.HOST, 
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  
  }



const pool = mysql.createPool(params);

const query = util.promisify(pool.query).bind(pool);

module.exports = query;
