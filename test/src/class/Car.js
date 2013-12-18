define(function (require, exports, module) {
    'use strict';
    /**
     * An automobile, autocar, motor car or car is a wheeled motor vehicle 
     * used for transporting passengers, which also carries its own engine 
     * or motor. Most definitions of the term specify that automobiles are designed 
     * to run primarily on roads, to have seating for one to eight people, to typically 
     * have four wheels, and to be constructed principally for 
     * the transport of people rather than goods.[3]
     * @param {Number} speed the max speed of the car
     * @constructor
     */
    var Car = function (speed) {
        this.speed = speed;
    };
    /**
     * start the engine of the car
     * @private
     * @belong Car
     * @return {Boolean}  the result of the start operation
     */
    Car.prototype._startEngine = function () {
        return this.engine.start();
    };
    /**
     * use this method, you can start the engine and run the car
     * @belong Car
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