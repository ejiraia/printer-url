import sqlite3 from 'sqlite3'
const con = sqlite3.verbose() 
const db = new con.Database('mydb.sqlite');

export default db