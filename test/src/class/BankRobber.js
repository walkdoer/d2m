/**
 * Bank Robber
 * @module M_BankRobber
 */
define(function (require, exports, module) {
    'use strict';
    /**
     * Bank Robber hepler
     * @module M_BankRobber_helper
     */
    var helper = {

    };
    /**
     * try to sleep
     * @belong M_BankRobber
     * @return {Boolean} true/false
     */
    function tryToSleep() {
        return false;
    }
    /**
     * Bank Robber
     * @Class BankRobber
     * @belong M_BankRobber
     * @constructor
     */
    var BankRobber = function (name, car, gun) {
        this.name = name;
        this.car = car;
        this.gun = gun;
    };
    /**
     * rob a bank
     *         and get all the money
     *                 test line**
     * @param {Bank} bank  the **bank** that the robber 
     *                     is target @at
     * @belong BankRobber
     * @return {Number} the money from the bank
     */
    BankRobber.prototype.rob = function (bank) {
        // rob bank
        return bank.money;
    };

    /**
     * run away
     * @param {Number} speed  run speed
     * @belong BankRobber
     * @return {BankRobber} robber self
     */
    BankRobber.prototype.run = function (speed) {
        // start run
        this.car.start();
        return this;
    };

    /**
     * go to sleep
     * @private
     * @belong BankRobber
     * @return {BankRobber} robber self
     */
    BankRobber.prototype._sleep = function () {
        //sleeping zZZ...
        return this;
    };

    /**
     * gun fire
     * @belong BankRobber
     * @return {BankRobber} robber self
     */
    BankRobber.prototype.fire = function () {
        // need fire
        this.gun.fire();
        return this;
    };
});