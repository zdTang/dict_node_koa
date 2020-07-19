const PATH = require('path');
module.exports={
    mode:"development",
    entry:{
        1:"./dist/main.js"
    },
    output:{
        path: PATH.resolve('./bundles/'),
        filename:'[name].bundle.js'
    }

}