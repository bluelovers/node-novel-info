"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge = require("deepmerge-plus");
exports.deepmerge = deepmerge;
const moment = require("moment");
exports.moment = moment;
const mdconf = require("mdconf2");
exports.mdconf = mdconf;
function array_unique(array) {
    return array.filter(function (el, index, arr) {
        return index == arr.indexOf(el);
    });
}
exports.array_unique = array_unique;
exports.deepmergeOptions = {
    isMergeableObject(value, isMergeableObject) {
        let bool;
        if (moment.isMoment(value) || mdconf.RawObject.isRawObject(value)) {
            return false;
        }
    }
};
const self = require("./index");
exports.default = self;
