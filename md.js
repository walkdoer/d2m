/*
 * docs to markdown
 * https://github.com/zhangmhao/d2m
 *
 * Copyright (c) 2013 zhangmhao
 * Licensed under the MIT license.
 */
'use strict';
var fs = require('fs'),
    colors = require('colors'),
    docParser = require('./docParser'),
    CHATSET_UTF_8 = 'utf8',
    d2m = {};

function is(type) {
    return function (docObject) {
        return docObject.type === type;
    };
}

var isModule = is('module'),
    isClass = is('class'),
    isMethod = is('method');
exports.md = function (fileName, docObject) {
    fs.open()
    if (isModule(docObject)) {
    }
};