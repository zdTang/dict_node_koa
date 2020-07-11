const PATH = require('path');
module.exports={
    mode:"production",
    entry:{
        1:"./dist/1.js"
    },
    output:{
        path: PATH.resolve('./bundles/'),
        filename:'[name].bundle.js'
    }

}