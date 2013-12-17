define(function (require, exports, module) {
    'use strict';
    /**
     * Gun
     * @Class Gun
     * @constructor
     */
    var Gun = function (name) {
        this.name = name;
    };
    /**
     * fire
     * @return {Gun} self
     */
    Gun.prototype.fire = function () {
        //fire process
        return this;
    };

    /**
     * reload the gun
     * @return {Gun}  self
     */
    Gun.prototype.reload = function () {
        //reload process
        return this;
    };


    /**
     * Tool
     * @Class Tool
     * @constructor
     */
    var Tool = function (name) {
        this.name = name;
    };
    /**
     * fire
     * @return {Tool} self
     */
    Tool.prototype.fire = function () {
        //fire process
        return this;
    };

    /**
     * reload the gun
     * @return {Tool}  self
     */
    Tool.prototype.reload = function () {
        //reload process
        return this;
    };
});