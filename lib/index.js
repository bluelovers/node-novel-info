"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
function array_unique(array) {
    return array.filter(function (el, index, arr) {
        return index == arr.indexOf(el);
    });
}
exports.array_unique = array_unique;
exports.deepmergeOptions = {
    isMergeableObject(value, isMergeableObject) {
        let bool;
        if (bool = moment.isMoment(value)) {
            return false;
        }
    }
};
const self = require("./index");
exports.default = self;
