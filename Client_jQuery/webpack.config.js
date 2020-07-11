const PATH = require('path');
module.exports={
    mode:"development",
    entry:{
        3:"./dist/3.js"
    },
    output:{
        path: PATH.resolve('./bundles/'),
        filename:'[name].bundle.js'
    }

}