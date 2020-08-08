"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Static = require('koa-static');
module.exports = function (router, options) {
    options = options || {};
    options.image = options.image || 30;
    options.script = options.script || 1;
    options.styles = options.styles || 30;
    options.html = options.html || 30;
    options.other = options.other || 7;
    router.all(/((\.jpg)|(\.png)|(\.gif))$/i, Static('../static', {
        maxage: options.image * 86400 * 1000
    }));
    router.all(/((\.js)|(\.jsx))$/i, Static('../static', {
        maxage: options.script * 86400 * 1000
    }));
    router.all(/(\.css)$/i, Static('../static', {
        maxage: options.styles * 86400 * 1000
    }));
    router.all(/((\.html)|(\.htm))$/i, Static('../static', {
        maxage: options.html * 86400 * 1000
    }));
    router.all('*', Static('../static', {
        maxage: options.other * 86400 * 1000
    }));
};
