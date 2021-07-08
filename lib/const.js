"use strict";
/**
 * Created by user on 2018/12/22/022.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepmergeOptions = exports.EnumNovelStatus = void 0;
const tslib_1 = require("tslib");
const moment_1 = require("moment");
const jsdom_url_1 = require("jsdom-url");
const RawObject_1 = (0, tslib_1.__importDefault)(require("mdconf2/lib/RawObject"));
/**
 * 小說狀態 flag 根據 readme.md 內設定
 */
var EnumNovelStatus;
(function (EnumNovelStatus) {
    EnumNovelStatus[EnumNovelStatus["UNKNOW"] = 0] = "UNKNOW";
    /**
     * 作者已完結
     */
    EnumNovelStatus[EnumNovelStatus["AUTHOR_DONE"] = 1] = "AUTHOR_DONE";
    /**
     * 作者已棄坑
     */
    EnumNovelStatus[EnumNovelStatus["AUTHOR_NOUPDATE"] = 2] = "AUTHOR_NOUPDATE";
    /**
     * 作者已刪除
     */
    EnumNovelStatus[EnumNovelStatus["AUTHOR_DELETE"] = 4] = "AUTHOR_DELETE";
    /**
     * 作者已過世
     */
    EnumNovelStatus[EnumNovelStatus["AUTHOR_DEAD"] = 8] = "AUTHOR_DEAD";
    /**
     * 本書已完結 並且處理完畢
     */
    EnumNovelStatus[EnumNovelStatus["USER_DONE"] = 16] = "USER_DONE";
    /**
     * 搬運棄坑
     */
    EnumNovelStatus[EnumNovelStatus["USER_NOUPDATE"] = 32] = "USER_NOUPDATE";
    /**
     * 搬運完結 但未整理
     */
    EnumNovelStatus[EnumNovelStatus["USER_TODO"] = 64] = "USER_TODO";
    /**
     * 文庫化
     */
    EnumNovelStatus[EnumNovelStatus["P_BOOK"] = 256] = "P_BOOK";
    /**
     * 漫畫化
     */
    EnumNovelStatus[EnumNovelStatus["P_COMIC"] = 512] = "P_COMIC";
    /**
     * 動畫化
     */
    EnumNovelStatus[EnumNovelStatus["P_ANIME"] = 1024] = "P_ANIME";
    /**
     * 遊戲
     */
    EnumNovelStatus[EnumNovelStatus["P_GAME"] = 2048] = "P_GAME";
    /**
     * 數位/電子書
     */
    EnumNovelStatus[EnumNovelStatus["P_DIGITAL"] = 4096] = "P_DIGITAL";
    /**
     * 電影
     */
    EnumNovelStatus[EnumNovelStatus["P_MOVIE"] = 8192] = "P_MOVIE";
    /**
     * 真人/舞台
     */
    EnumNovelStatus[EnumNovelStatus["P_REAL"] = 16384] = "P_REAL";
    /**
     * 自印/同人
     */
    EnumNovelStatus[EnumNovelStatus["P_PRINT"] = 32768] = "P_PRINT";
})(EnumNovelStatus = exports.EnumNovelStatus || (exports.EnumNovelStatus = {}));
exports.deepmergeOptions = {
    isMergeableObject(value, isMergeableObject) {
        let bool;
        if ((0, moment_1.isMoment)(value) || RawObject_1.default.isRawObject(value)) {
            return false;
        }
        if (value instanceof jsdom_url_1.URL || value && typeof value.href == 'string') {
            return false;
        }
    },
};
//# sourceMappingURL=const.js.map