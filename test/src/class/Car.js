define(function (require, exports, module) {
    'use strict';
    /**
     * Car
     * @param {Number} speed the max speed of the car
     * @constructor
     */
    var Car = function (speed) {
        this.speed = speed;
    };
    /**
     * start the engine of the car
     * @private
     * @return {Boolean}  the result of the start operation
     */
    Car.prototype._startEngine = function () {
        return this.engine.start();
    };
    /**
     * run the car
     * @return {[type]} [description]
     */
    Car.prototype.run = function () {
        //start the engine and run
        this._startEngine();
        //...run
    };
    /**
     * [test1 description]
     * @param  {[type]} a [description]
     * @param  {[type]} b [description]
     * @param  {[type]} c [description]
     * @return {[type]}   [description]
     */
    function test1(a, b, c) {

    } 


    /**
     * [test2 description]
     * @param  {[type]} kk [description]
     * @param  {[type]} bb [description]
     * @return {[type]}    [description]
     */
    function test2(kk, bb) {

    }
    return Car;
});