define(function (require, exports, module) {
    'use strict';
    /**
     * Bank
     * @param {Number} money   the money in the bank
     *                         and the robber is desire for this
     * @param {Number} security   the security rate of the bank
     *                        higher number means more sicurity
     * @constructor
     */
    var Bank = function (money, security) {
        this.money = money;
    };
    return Bank;
});