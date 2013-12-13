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
    d2m = {},
    RE_COMMENT = /\/\*{2}[\s\S]*?\*\//g;


/**
 * All tags
 *
 *  @param  {type}  name [descripttion]
 *  @author
 *  @email
 *  @class
 *  @return
 *  @constructor
 *
 */
function parseFile(fileName, fileContent) {
    console.log(('-----------------' + fileName + '--------------').rainbow);
    console.log(fileContent.grey.italic);
    /*
        [{
            type: 'method', //doc type
            description: 'method description',
            params: [...], //method parameters
            author: 'andrew',
            email: 'example@mail.com'
            private: true | false, // private method flag
            public: true | false  //public method flag
        }]
    */
    var parseResultObjectArray = null; //解析结果数组
    var docBlockArray = fileContent.match(RE_COMMENT);
    if (docBlockArray) {
        parseResultObjectArray = [];
        docBlockArray.forEach(function (comment) {
            console.log('-------------------'.yellow);
            console.log(comment.cyan);
            parseResultObjectArray.push(docParser.parse(comment));
        });
    } else {
        console.warn('can\'t find comment in this file'.red);
    }
    console.log(parseResultObjectArray);
    return parseResultObjectArray;
}

function processFile(filePath, fileProcessor) {
    var realPath = fs.realpathSync(filePath);
    fs.readFile(filePath, CHATSET_UTF_8, function (err, data) {
        console.log(('processing file ' + realPath).green);
        if (err) {
            throw err;
        }
        if (typeof fileProcessor === 'function') {
            fileProcessor(filePath, data);
        }
    });
}

function processPath(path, fileProcessor) {
    var stats = fs.statSync(path);
    if (stats.isFile()) {
        processFile(path, fileProcessor);
        return;
    }
    fs.readdir(path, function (err, files) {
        if (err) {
            throw err;
        }
        files.forEach(function (itm) {
            //will not process the file start with "."  eg  .DS_Store
            if (itm.indexOf('.') === 0) { return; }
            var filePath = path + '/' + itm,
                stats = fs.statSync(filePath);
            if (stats.isFile()) {
                processFile(filePath, fileProcessor);
            } else if (stats.isDirectory()) {
                processPath(filePath, fileProcessor);
            }
        });
    });
}

/**
 * @param  {Object} options d2m options
 *   {
 *       src: './test/src',
 *       output: './test/docs'
 *   }
 * @return {this}
 */
d2m.config = function (options) {
    d2m.srcDir = options.src;
    d2m.outputDir = options.output;
    return d2m;
};

/**
 * 生成文档
 * @return {[type]} [description]
 */
d2m.generate = function () {
    console.log('generate...'.green);
    processPath(d2m.srcDir, parseFile);
};

exports.config = d2m.config;
exports.generate = d2m.generate;