"use strict";
/**
 * Created by user on 2018/12/22/022.
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
     * 本書已完結 並且處理完畢
     */
    EnumNovelStatus[EnumNovelStatus["USER_DONE"] = 16] = "USER_DONE";
})(EnumNovelStatus = exports.EnumNovelStatus || (exports.EnumNovelStatus = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUg7O0dBRUc7QUFDSCxJQUFZLGVBcUJYO0FBckJELFdBQVksZUFBZTtJQUUxQix5REFBZSxDQUFBO0lBRWY7O09BRUc7SUFDSCxtRUFBb0IsQ0FBQTtJQUNwQjs7T0FFRztJQUNILDJFQUF3QixDQUFBO0lBQ3hCOztPQUVHO0lBQ0gsdUVBQXVCLENBQUE7SUFFdkI7O09BRUc7SUFDSCxnRUFBa0IsQ0FBQTtBQUNuQixDQUFDLEVBckJXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBcUIxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvMTIvMjIvMDIyLlxuICovXG5cbi8qKlxuICog5bCP6Kqq54uA5oWLIGZsYWcg5qC55pOaIHJlYWRtZS5tZCDlhafoqK3lrppcbiAqL1xuZXhwb3J0IGVudW0gRW51bU5vdmVsU3RhdHVzXG57XG5cdFVOS05PVyA9IDB4MDAwMCxcblxuXHQvKipcblx0ICog5L2c6ICF5bey5a6M57WQXG5cdCAqL1xuXHRBVVRIT1JfRE9ORSA9IDB4MDAwMSxcblx0LyoqXG5cdCAqIOS9nOiAheW3suajhOWdkVxuXHQgKi9cblx0QVVUSE9SX05PVVBEQVRFID0gMHgwMDAyLFxuXHQvKipcblx0ICog5L2c6ICF5bey5Yiq6ZmkXG5cdCAqL1xuXHRBVVRIT1JfREVMRVRFID0gMHgwMDAwNCxcblxuXHQvKipcblx0ICog5pys5pu45bey5a6M57WQIOS4puS4lOiZleeQhuWujOeVolxuXHQgKi9cblx0VVNFUl9ET05FID0gMHgwMDEwLFxufVxuIl19