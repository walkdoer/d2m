/**
 * @module a bank robber's story
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