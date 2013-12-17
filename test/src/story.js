/**
 * this is a story about a bank robber. he rob money,
 * he kill cops, and finnaly go to prison
 * @module BankRooberStory
 * @author zhangmh
 */
define(function (require, exports, module) {
    'use strict';
    var BankRobber = require('class/BankRobber');


    var robber = new BankRobber('andrew');

    robber.rob();

    robber.run();

    robber.fire();
});