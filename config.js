/*
 * docs to markdown
 * https://github.com/zhangmhao/d2m
 *
 * Copyright (c) 2013 zhangmhao
 * Licensed under the MIT license.
 */
'use strict';

var configObj = {};

exports.init = function (userConfig) {
    for (var key in userConfig) {
        if (userConfig.hasOwnProperty(key)) {
            configObj[key] = userConfig[key];
        }
    }
};

exports.get = function (key) {
    return configObj[key];
};