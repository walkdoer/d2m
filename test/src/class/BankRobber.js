define(function (require, exports, module) {
    'use strict';
    /**
     * Bank Robber
     * @Class BankRobber
     * @constructor
     */
    var BankRobber = function (name, car, gun) {
        this.name = name;
        this.car = car;
        this.gun = gun;
    };
    /**
     * rob a bank
     * @return {Number} the money from the bank
     */
    BankRobber.prototype.rob = function (bank) {
        // rob bank
        return bank.money;
    };

    /**
     * run away
     * @return {BankRobber} robber self
     */
    BankRobber.prototype.run = function () {
        // start run
        this.car.start();
        return this;
    };

    /**
     * gun fire
     * @return {BankRobber} robber self
     */
    BankRobber.prototype.fire = function () {
        // need fire
        this.gun.fire();
        return this;
    };
});