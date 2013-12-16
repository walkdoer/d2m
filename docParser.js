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
    TYPE_MODULE = 'module',
    //plugin path
    PLUGIN_PATH = './plugin/';

var fs = require('fs');

var isValidFunctionName = function (name) {
    return RE_VALID_FUNCTION_NAME.test(name);
};


var helper = {
    getTargetFromComment: function (comment, regexp, index) {
        var targetParseRes = comment.match(regexp);
        if (targetParseRes) {
            return targetParseRes[index || 1];
        }
    }
};
var docParser = {
    /**
      * get parameters of an document block
     * @param  {String} comment document comment block
     * @return {Array}    parametersArray
     */
    _getParams: function (comment) {
        var paramsStringArray = comment.match(RE_PARAM),
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
     * @param  {String} comment document block
     * @return {String}          descript of document block
     */
    _getDescription: function (comment) {
        var desParseRes = comment.match(RE_DESCRIPTION),
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
     * @param  {String} comment document block
     * @return {String} type of document block it may class|method
     */
    _getDocType: function (comment) {
        var hasConstructor = ~comment.indexOf('@constructor'),
            isModule =  ~comment.indexOf('@module');
        return isModule ? 'module' : hasConstructor ? 'class' : 'method';
    },
    /**
     * is a method private or public
     * @param  {String} comment document block
     * @return {String} 
     */
    _getMethodCharactor: function (comment) {
        var isPrivateMethod = ~comment.indexOf('@private');
        return isPrivateMethod ? 'private' : 'public';
    },
    _getMethodName: function (comment) {
        var index = docParser.fileContent.indexOf(comment),
            content = docParser.fileContent.substr(index + comment.length);
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
    _getModuleName: function (comment) {
        return helper.getTargetFromComment(comment, RE_MODULE_NAME);
    },
    parseDocBlock: function (comment) {
        var description = docParser._getDescription(comment),
            params = docParser._getParams(comment),
            methodCharactor = docParser._getMethodCharactor(comment),
            result = {
                name: docParser._getMethodName(comment),
                type: docParser._getDocType(comment),
                description: description
            };
        if (result.type === TYPE_MODULE) {
            result.name = docParser._getModuleName(comment);
        }
        if (methodCharactor === 'private') {
            result.private = true;
        } else {
            result.public = true;
        }
        if (params) {
            result.params = params;
        }

        //plugin parse result
        var parseResultArray = docParser.pluginParse(comment);
        parseResultArray.forEach(function (pluginRes) {
            var value;
            for (var key in pluginRes) {
                value = pluginRes[key];
                if (pluginRes.hasOwnProperty(key) && value) {
                    result[key] = value;
                }
            }
        });
        return result;
    },
    /**
     * read plugin file and excute
     * @param  {String} comment  document comment
     * @return {Array}  plugin parse result array
     */
    pluginParse: function (comment) {
        var parseResult = [];
        var files = fs.readdirSync(PLUGIN_PATH);
        files.forEach(function (itm) {
            if (itm.indexOf('.') === 0) {
                return;
            }
            //if it's a javascript file
            if (/^.*.js$/.test(itm)) {
                var plugin = require(PLUGIN_PATH + itm);
                if (!plugin.handlers) {
                    console.error('has no handler in plugin/' + itm);
                    return;
                }
                if (typeof plugin.handlers.beforParse === 'function') {
                    comment = plugin.handlers.beforParse(comment, helper) || comment;
                }
                if (typeof plugin.handlers.parse === 'function') {
                    parseResult.push(plugin.handlers.parse(comment, helper));
                }
            }
        });
        return parseResult;
    },
    // _arrangeModule: function (moduleArray, classArray, methodArray) {
    //     moduleArray.forEach(function (mod) {
    //         if (classArray) {
    //             docParser._arrangeClass(classArray, methodArray, function (cls) {
    //                 if (cls.belong === mod.name) {
    //                     if (!mod.classes) {
    //                         mod.classes = [];
    //                     }
    //                     mod.classes.push(cls);
    //                 }
    //             });
    //         } else {
    //             methodArray.forEach(function (method) {
    //                 if (method.belong === mod.name) {
    //                     if (!mod.methods) {
    //                         mod.methods = [];
    //                     }
    //                     mod.methods.push(method);
    //                 }
    //             });
    //         }
    //     });
    // },
    // _arrangeClass: function (classArray, methodArray, process) {
    //     classArray.forEach(function (cls) {
    //         process && process(cls);
    //         methodArray.forEach(function (method) {
    //             if (method.belong === cls.name) {
    //                 if (!cls.methods) {
    //                     cls.methods = [];
    //                 }
    //                 cls.methods.push(method);
    //             }
    //         });
    //     });
    // },
    /**
     * arrange parse result
     * Module
     *   |__Class(consturctor)
     *        |___method
     *
     * @param  {Array} parseResultArray parse result
     * @return {Array}
     */
    arrangeParseResult: function (parseResultArray) {
        var woods = {
                'moduleList': [],
                'classList': [],
                'methodList': []
            };

        parseResultArray.forEach(function (itm) {
            var wood = woods[itm.type + 'List'];
            if (wood) {
                wood.push(itm);
            }
        });
        DocArranger.arrange(woods);
        return woods;
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
        var commentArray = fileContent.match(RE_DOC_BLOCK);
        docParser.fileContent = fileContent;
        if (commentArray) {
            parseResultObjectArray = [];
            commentArray.forEach(function (comment) {
                var resultObj = docParser.parseDocBlock(comment);
                console.log('-------------------'.yellow);
                console.log(comment.cyan);
                parseResultObjectArray.push(resultObj);
            });
        } else {
            console.warn('can\'t find comment in this file'.red);
        }
        return docParser.arrangeParseResult(parseResultObjectArray);
    }
};

var DocArranger = {
    arrange : function (woods) {
        DocArranger.woods = woods;
        DocArranger.arrangeMethod();
        DocArranger.arrangeClass();
    },
    _getParent: function (methodItm) {
        var classArray = DocArranger.woods.classList,
            moduleArray = DocArranger.woods.moduleList,
            moduleItm,
            classItm,
            len,
            i;
        if (methodItm.belong) {
            for (i = 0, len = classArray.length; i < len; i++) {
                classItm = classArray[i];
                if (methodItm.belong === classItm.name) {
                    return classItm;
                }
            }
            for (i = 0, len = moduleArray.length; i < len; i++) {
                moduleItm = moduleArray[i];
                if (methodItm.belong === moduleItm.name) {
                    return moduleItm;
                }
            }
            return null;
        }
        //no parent
        else {
            return null;
        }
    },
    arrangeMethod: function () {
        var methodArray = DocArranger.woods.methodList,
            parentItm;
        for (var i = 0, len = methodArray.length, methodItm; i < len; i++) {
            methodItm = methodArray[i];
            parentItm = DocArranger._getParent(methodItm);
            if (parentItm) {
                if (!parentItm.methods) {
                    parentItm.methods = [];
                }
                parentItm.methods.push(methodItm);
                methodArray.splice(i, 1);
                i--;
                len--;
            }
        }
    },
    arrangeClass : function () {
        var classArray = DocArranger.woods.classList,
            parentItm;
        for (var i = 0, len = classArray.length, classItm; i < len; i++) {
            classItm = classArray[i];
            parentItm = DocArranger._getParent(classItm);
            if (parentItm) {
                if (!parentItm.classes) {
                    parentItm.classes = [];
                }
                parentItm.classes.push(classItm);
                classArray.splice(i, 1);
                i--;
                len--;
            }
        }
    }
};
exports.parse = docParser.parse;