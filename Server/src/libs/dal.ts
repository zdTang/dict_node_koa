"use strict";
/*
* FILENAME      : dal.ts
* CREATED BY    : Zhendong Tang
* MODIFIED BY	: N/A
* CREATION DATE : April 20, 2020
* DESCRIPTION   :
*   This class is for access database
*/

module.exports = class dalClass {
    //private Status: typeof Status;
    /*=========================================================================
    MethodName: Constructor
    Description: this status will be updated by Position Object
    Arguments: string
    Return Value: none
    ===========================================================================*/
    private db:any;
    constructor() {  
        this.db=require(`./database`)
    }
    //get words from database
    public async GetWord(){
        let word:any=undefined;
        word = await this.db.query(`Select * from Class`);
        return word;
    }
     //get words from database
     public async GetClass(){
        let word:any=undefined;
        word = await this.db.query(`Select * from Class`);
        return word;
    }

    public async GetFamily(){
        let word:any=undefined;
        word = await this.db.query(`Select * from Class`);
        return word;
    }

};