"use strict";
/*
* FILENAME      : dal.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : April 20, 2020
* DESCRIPTION   :
*   This class is for access database
*/
const db=require(`./database`)
module.exports = class dal{
    //private Status: typeof Status;
    /*=========================================================================
    MethodName: Constructor
    Description: this status will be updated by Position Object
    Arguments: string
    Return Value: none
    ===========================================================================*/

    //get words from database
    static async GetWord(word:string){
        let result:string="";
        result = await db.query(`call GetWord(?)`,[word]);
        return result;
    };
     //get words from database
    static async GetClass(){
        let word=undefined;
        word = await db.query(`Select * from Class`);
        return word;
    };

    static async GetFamily(){
        let word=undefined;
        word = await db.query(`Select * from Class`);
        return word;
    };

};