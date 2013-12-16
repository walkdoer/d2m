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


/**
 * All tags
 *
 *  @param  {type}  name [descripttion]
 *  @author [author name]
 *  @email [example@example.com]
 *  @class
 *  @return
 *  @constructor
 *
 */
function parseFile(fileName, fileContent) {
    console.log(('-----------------' + fileName + '--------------').rainbow);
    console.log(fileContent.grey.italic);
    var parseResult = docParser.parse(fileName, fileContent);
    console.log(parseResult);
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
 * generate document
 * @return {[type]} [description]
 */
d2m.generate = function () {
    console.log('generate...'.green);
    var stats = fs.statSync(d2m.srcDir);
    if (stats.isFile()) {
        processFile(d2m.srcDir, parseFile);
    } else if (stats.isDirectory()) {
        processPath(d2m.srcDir, parseFile);
    } else {
        console.error('src config is wrong, please check');
    }
};

exports.config = d2m.config;
exports.generate = d2m.generate;