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
    Mustache = require('mustache'),
    CHATSET_UTF_8 = 'utf8';
/**
 * get filename from file path
 * @param  {String} filePath  file path
 * @return {String} filename without ext
 */
function getFileName(filePath) {
    var filePathArr = filePath.split('/'),
        fileName = filePathArr[filePathArr.length - 1],
        fileNameArr = fileName.split('.');
    fileNameArr.splice(fileNameArr.length - 1, 1);
    return fileNameArr.join('.');
}
/**
 * load template file
 * @param  {String}   tplFileName  template file
 * @param  {Function} callback success Call back
 */
function loadTemplate(tplFileName, callback) {
    var tplPath = config.get('tplPath'),
        filePath = tplPath + tplFileName;
    fs.readFile(filePath, CHATSET_UTF_8, function (err, data) {
        if (err) {
            throw err;
        }
        if (typeof callback === 'function') {
            callback(data);
        }
    });
}

exports.md = function (filePath, docObject) {
    var fileName = getFileName(filePath) + '.md',
        docPath = config.get('outputDir'),
        fullFilePath = docPath + fileName;
    loadTemplate('module.tpl', function (data) {
        var content = Mustache.render(data, docObject);
        fs.open(fullFilePath, 'w', function (err, fd) {
            fs.write(fd, content, 0, CHATSET_UTF_8, function (err) {
                if (err) {
                    fs.closeSync(fd);
                    throw err;
                }
                fs.closeSync(fd);
                console.log(('write file' + fullFilePath).green);
            });
        });
    });
};