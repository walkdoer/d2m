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
    config = require('./config'),
    CHATSET_UTF_8 = 'utf8';

function is(type) {
    return function (docObject) {
        return docObject.type === type;
    };
}

function getFileName(filePath) {
    var filePathArr = filePath.split('/'),
        fileName = filePathArr[filePathArr.length - 1],
        fileNameArr = fileName.split('.');
    fileNameArr.splice(fileNameArr.length - 1, 1);
    return fileNameArr.join('.');
}

var isModule = is('module'),
    isClass = is('class'),
    isMethod = is('method');
exports.md = function (filePath, docObject) {
    var fileName = getFileName(filePath) + '.md',
        docPath = config.get('outputDir'),
        fullFilePath = docPath + fileName;
    fs.open(fullFilePath, 'w', function (err, fd) {
        fs.write(fd, filePath, 0, CHATSET_UTF_8, function (err) {
            if (err) {
                fs.closeSync(fd);
                throw err;
            }
            fs.closeSync(fd);
            console.log(('write file' + fullFilePath).green);
        });
    });
    if (isModule(docObject)) {
    }
};