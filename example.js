/*
 * docs parse example
 * https://github.com/zhangmhao/d2m
 *
 * Copyright (c) 2013 zhangmhao
 * Licensed under the MIT license.
 */
'use strict';
var d2m = require('./d2m');



d2m.config({
    src: './test/src/class/BankRobber.js',
    output: './test/docs'
}).generate();

