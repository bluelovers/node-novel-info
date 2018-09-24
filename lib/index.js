"use strict";
/**
 * Created by user on 2018/1/28/028.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge = require("deepmerge-plus");
exports.deepmerge = deepmerge;
const moment = require("moment");
exports.moment = moment;
const mdconf = require("mdconf2");
exports.mdconf = mdconf;
const jsdom_url_1 = require("jsdom-url");
const array_hyper_unique_1 = require("array-hyper-unique");
exports.array_unique = array_hyper_unique_1.array_unique;
exports.deepmergeOptions = {
    isMergeableObject(value, isMergeableObject) {
        let bool;
        if (moment.isMoment(value) || mdconf.RawObject.isRawObject(value)) {
            return false;
        }
        if (value instanceof jsdom_url_1.URL || value && typeof value.href == 'string') {
            return false;
        }
    }
};
const self = require("./index");
exports.default = self;
//export default exports;
