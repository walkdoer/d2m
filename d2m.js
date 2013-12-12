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
    CHATSET_UTF_8 = 'utf8',
    d2m = {},
    REGEXP_COMMENT = /\/\*{2}[\s\S]*?\*\//g;


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
    var commentArray = fileContent.match(REGEXP_COMMENT);
    if (commentArray) {
        commentArray.slice(0).forEach(function (comment) {
            console.log('-------------------'.yellow);
            console.log(comment.cyan);
        });
    } else {
        console.warn('can\'t find comment in this file'.red);
    }
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
                stats = fs.statSync(filePath),
                realPath = fs.realpathSync(filePath);

            if (stats.isFile()) {
                fs.readFile(filePath, CHATSET_UTF_8, function (err, data) {
                    console.log('processing file ' + realPath);
                    if (err) {
                        throw err;
                    }
                    if (typeof fileProcessor === 'function') {
                        fileProcessor(itm, data);
                    }
                });
            } else if (stats.isDirectory()) {
                console.log('processing directory ' + realPath);
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