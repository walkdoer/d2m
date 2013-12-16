/*
 * belong plugin
 * https://github.com/zhangmhao/d2m
 * @author andrew zhang <zhangmhao@gmail.com>
 * Copyright (c) 2013 zhangmhao
 * Licensed under the MIT license.
 */
'use strict';

var RE_BELONG = /@belong\s*\b([\w\d]*)\b/;
exports.handlers = {
    parse: function (comment, helper) {
        return {
            belong: helper.getTargetFromComment(comment, RE_BELONG)
        };
    }
};