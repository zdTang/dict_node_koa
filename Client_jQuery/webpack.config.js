const PATH = require('path');
module.exports={
    entry:{
        1:"./dist/1.js"
    },
    output:{
        path: PATH.resolve('./bundles/'),
        filename:'[name].bundle.js'
    }

}