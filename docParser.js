/*
 * docs parse
 * https://github.com/zhangmhao/d2m
 *
 * Copyright (c) 2013 zhangmhao
 * Licensed under the MIT license.
 */
'use strict';
var RE_DESCRIPTION = /\/\*{2}\s*\*\s([\w\W]*?)(?=\*\s*@)/,
    RE_PARAM = /@param[\w\W]*?(?=\s*\*\s*@)/g,
    RE_PARAM_TYPE = /{(.*)}/,
    RE_PARAM_NAME = /{.*}\s*(\b\w*\b)/,
    RE_PARAM_DESCRIPTION = /^\s*.*{.*}\s*\b\w*\b\s*(.*)|\s*\*?\s*(.*)$/m;

var docParser = {
    getParams: function (docBlock) {
        var paramsStringArray = docBlock.match(RE_PARAM),
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

    getDescription: function (docBlock) {
        var desParseRes = docBlock.match(RE_DESCRIPTION),
            description;
        if (desParseRes && desParseRes[1]) {
            description = desParseRes[1];
            console.log(description.green);
            var splitLine = description.split('\n');
            splitLine = splitLine.map(function (line, i) {
                if (i > 0) {
                    line = line.trim();
                    line = line.replace(/^\*/, '');
                }
                if (!line) {
                    console.log('line is empty'.red);
                }
                return line;
            });
            splitLine = splitLine.filter(function (line, i) {
                return !!line;
            });
            return splitLine.join('\n');
        }
    },
    parse: function (docBlock) {
        var description = docParser.getDescription(docBlock),
            params = docParser.getParams(docBlock),
            result = {
                description: description
            };
        if (params) {
            result.params = params;
        }
        return result;
    }
};

exports.parse = docParser.parse;