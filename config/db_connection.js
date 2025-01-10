const config = require('./dbConfig');
const database_env = process.env.APP_ENV==="Stage"?"stage_database":'production_database';
db = require('knex')(config[database_env]);
// db.raw(`select * from "sevaData"`).then((data) => {
//     console.log(data.rows);
//     console.log("PostgreSQL connected");
// })
module.exports = db;
