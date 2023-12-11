require('dotenv').config();                                         //dotenv includes our database connection information (database in render)
const {Pool} = require('pg');

const pgPool = new Pool({                                           //creating the connection to our database
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    ssl: true
});

pgPool.connect((err)=> {                                            //creating the connection to our database
    if(err){
        console.log(err.message);
    }
});



module.exports = { pgPool };