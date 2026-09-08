import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host:process.env.DB_Host || 'localhost',
  user:process.env.DB_User || 'gpt-admin',
  password:process.env.DB_Password || '123456',
  database:process.env.DB_DATABASE || 'gpt-clone',
});
 

export default db;
