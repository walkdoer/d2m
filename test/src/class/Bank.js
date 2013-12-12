define(function (require, exports, module) {
    'use strict';
    /**
     * Bank
     * @param {Number} money   the money in the bank
     *                         and the robber is desire for this
     * @constructor
     */
    var Bank = function (money) {
        this.money = money;
    };
    return Bank;
});