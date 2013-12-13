/*
 * docs parse
 * https://github.com/zhangmhao/d2m
 *
 * Copyright (c) 2013 zhangmhao
 * Licensed under the MIT license.
 */
'use strict';
var RE_PARAM = /@param[\w\W]*?(?=\s*\*\s*@)/g,
    RE_PARAM_TYPE = /{(.*)}/,
    RE_PARAM_NAME = /{.*}\s*(\b\w*\b)/,
    RE_PARAM_DESCRIPTION = /^\s*.*{.*}\s*\b\w*\b\s*(.*)|\s*\*?\s*(.*)$/m;

var docParser = {
    getParams: function (doc) {
        var paramsStringArray = doc.match(RE_PARAM),
            paramsArray = null;
        if (paramsStringArray) {
            paramsArray = [];
            paramsStringArray.forEach(function (itm) {
                var param = {},
                    splitLines = itm.split('\n') || itm.split('\n\r');
                //@param  {type}  [description
                //*                  decription in another line]
                var typeParseRes = RE_PARAM_TYPE.exec(itm),
                    nameParseRes = RE_PARAM_NAME.exec(itm);
                if (typeParseRes) {
                    param.type = typeParseRes[1];
                }
                if (nameParseRes) {
                    param.name = nameParseRes[1];
                }
                var description = '';
                splitLines.forEach(function (line, i) {
                    var descriptionParseRes = RE_PARAM_DESCRIPTION.exec(line);
                    if (descriptionParseRes) {
                        if (i === 0) {
                            description += descriptionParseRes[1];
                        } else {
                            description += descriptionParseRes[2];
                        }
                    }
                });
                param.description = description;
                paramsArray.push(param);
            });
        } else {
            console.log('no param in this doc'.red);
        }
        return paramsArray;
    },
    parse: function (comment) {
        var params = docParser.getParams(comment),
            result = {};
        if (params) {
            result.params = params;
        }
        return result;
    }
};

exports.parse = docParser.parse;