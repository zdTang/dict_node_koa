/*====================================================================
Discription: An instance of DB--mySql
FileName: Database.js
Project: Dictionary
Programmer: Zhendong Tang (Mike)
Date      : April 20, 2020
=====================================================================*/
const mysql=require('mysql');
const co=require('co-mysql');
const config=require('./config');
let conn=mysql.createPool({
    host:config.DB_HOST,
    user:config.DB_USER,
    password:config.DB_PASS,
    database:config.DB_NAME,
    multipleStatements: true  // can execute multiple SQL statements 
});

module.exports=co(conn);
