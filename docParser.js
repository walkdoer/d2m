/*
 * docs parse
 * https://github.com/zhangmhao/d2m
 *
 * Copyright (c) 2013 zhangmhao
 * Licensed under the MIT license.
 */
'use strict';
var RE_VALID_FUNCTION_NAME = /^[$A-Z_][0-9A-Z_$]*$/i,
    RE_DOC_BLOCK = /\/\*{2}[\s\S]*?\*\//g,
    RE_DESCRIPTION = /\/\*{2}\s*\*\s([\w\W]*?)(?=\*\s*@)/,
    RE_METHOD_NAME_TYPE1 = /^[^(){}]*?\b(\w+)\b\s*=\s*function\s*\([\w\W]*?\)\s*{[\w\W]*?}/,
    RE_METHOD_NAME_TYPE2 = /[\w\W]*?function?\s*(\w+)\s*\([\w\W]*?\)\s*{/,
    RE_PARAM = /@param[\w\W]*?(?=\s*\*\s*@)/g,
    RE_PARAM_TYPE = /{(.*)}/,
    RE_PARAM_NAME = /{.*}\s*(\b\w*\b)/,
    RE_PARAM_DESCRIPTION = /^\s*.*{.*}\s*\b\w*\b\s*(.*)|\s*\*?\s*(.*)$/m,
    RE_MODULE_NAME = /@module\s*\b([\w\d]*)\b/,
    /** Type Name */
    TYPE_MODULE = 'module';


var isValidFunctionName = function (name) {
    return RE_VALID_FUNCTION_NAME.test(name);
};
var docParser = {
    /**
      * get parameters of an document block
     * @param  {String} docBlock document block
     * @return {Array}    parametersArray
     */
    _getParams: function (docBlock) {
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
    /**
     * get description of an document block
     * @param  {String} docBlock document block
     * @return {String}          descript of document block
     */
    _getDescription: function (docBlock) {
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
            splitLine = splitLine.filter(function (line) {
                return !!line;
            });
            return splitLine.join('\n');
        }
    },
    /**
     * get description of an document block
     * @param  {String} docBlock document block
     * @return {String} type of document block it may class|method
     */
    _getDocType: function (docBlock) {
        var hasConstructor = ~docBlock.indexOf('@constructor'),
            isModule =  ~docBlock.indexOf('@module');
        return isModule ? 'module' : hasConstructor ? 'class' : 'method';
    },
    /**
     * is a method private or public
     * @param  {String} docBlock document block
     * @return {String} 
     */
    _getMethodCharactor: function (docBlock) {
        var isPrivateMethod = ~docBlock.indexOf('@private');
        return isPrivateMethod ? 'private' : 'public';
    },
    _getMethodName: function (docBlock) {
        var index = docParser.fileContent.indexOf(docBlock),
            content = docParser.fileContent.substr(index + docBlock.length);
        //console.log('-------' + content.red + '-------');
        var methodNameParseRes = content.match(RE_METHOD_NAME_TYPE1);
        if (!methodNameParseRes || methodNameParseRes.length !== 2 || 
            !isValidFunctionName(methodNameParseRes[1])) {
            methodNameParseRes = content.match(RE_METHOD_NAME_TYPE2);
        }
        if (isValidFunctionName(methodNameParseRes[1])) {
            return methodNameParseRes[1];
        } else {
            console.error('invalid method name'.red);
        }
        return null;
    },
    _getBelong: function () {
        return '';
    },
    _getModuleName: function (docBlock) {
        return docParser._getTargetFromDocBlock(docBlock, RE_MODULE_NAME);
    },
    _getTargetFromDocBlock: function (docBlock, regexp, index) {
        var targetParseRes = docBlock.match(regexp);
        if (targetParseRes) {
            return targetParseRes[index || 1];
        }
    },
    parseDocBlock: function (docBlock) {
        var description = docParser._getDescription(docBlock),
            params = docParser._getParams(docBlock),
            methodCharactor = docParser._getMethodCharactor(docBlock),
            result = {
                name: docParser._getMethodName(docBlock),
                type: docParser._getDocType(docBlock),
                belong: docParser._getBelong(docBlock),
                description: description
            };
        if (result.type === TYPE_MODULE) {
            result.name = docParser._getModuleName(docBlock);
        }
        if (methodCharactor === 'private') {
            result.private = true;
        } else {
            result.public = true;
        }
        if (params) {
            result.params = params;
        }
        return result;
    },
    parse: function (fileName, fileContent) {
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
        var docBlockArray = fileContent.match(RE_DOC_BLOCK);
        docParser.fileContent = fileContent;
        if (docBlockArray) {
            parseResultObjectArray = [];
            docBlockArray.forEach(function (docBlock) {
                var resultObj = docParser.parseDocBlock(docBlock);
                console.log('-------------------'.yellow);
                console.log(docBlock.cyan);
                parseResultObjectArray.push(resultObj);
            });
        } else {
            console.warn('can\'t find docBlock in this file'.red);
        }
        return parseResultObjectArray;
    }
};

exports.parse = docParser.parse;