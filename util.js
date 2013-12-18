/*
 * docs to markdown util
 * https://github.com/zhangmhao/d2m
 *
 * Copyright (c) 2013 zhangmhao
 * Licensed under the MIT license.
 */

'use strict';

var FOLDER_SPLITOR = '/';

exports.fixFolderPath = function (src) {
    var strObj = new String(src);
    src += strObj[strObj.length - 1] === FOLDER_SPLITOR ? '' : FOLDER_SPLITOR;
    return src;
};