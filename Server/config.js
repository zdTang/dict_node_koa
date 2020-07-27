/*====================================================================
Discription: this file stores configuration data 
FileName: config.js
Project: Karmax
Programmer: Zhendong Tang (Mike)
Date      : Jan 30, 2020
=====================================================================*/
module.exports={

       //Database 
        DB_HOST: 'localhost',
        //DB_HOST: '10.144.18.14',
        DB_PORT: '3306',
        //DB_USER:  'root',
        //DB_USER: 'ztang',
        DB_USER: 'root',
        //DB_USER: 'root',
        //DB_PASS: 'mysql',
        //DB_PASS: 'Conestoga123456@@',
        DB_PASS: 'mysql',
        //DB_PASS: 'Conestoga-Karmax-20',
        DB_NAME: 'dict',
      
        //Encryption
        ADMIN_SUFFIX: '_?:L$"OPUIOSIFJ(*UPT:LKRFG',

        //Server
        HTTP_ROOT:'http://localhost:9090',
        PORT:'9090',

        // Bing Map API
        travelMode:'driving',
        //travelMode:'truck',
        //BingMapAPI:'Av6HeYXCVFYCzmXbCz4FSEftgqOs13PR0egufzP-PJRIIviEZe8MrJV25CtwxeIg', //my key
        BingMapAPI: 'Ah2MR4h0RIJMmFT1aawsGwyppbp5O-BlR0qiAkVWU8TkBzNd25yRMRkckNPtVdA3' ,  //Karmax 
        
        // Interest location distance

        InterestDistance : 50




}