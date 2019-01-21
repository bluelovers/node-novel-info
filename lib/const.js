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
     * 遊戲化
     */
    EnumNovelStatus[EnumNovelStatus["P_GAME"] = 2048] = "P_GAME";
})(EnumNovelStatus = exports.EnumNovelStatus || (exports.EnumNovelStatus = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUg7O0dBRUc7QUFDSCxJQUFZLGVBaURYO0FBakRELFdBQVksZUFBZTtJQUUxQix5REFBZSxDQUFBO0lBRWY7O09BRUc7SUFDSCxtRUFBb0IsQ0FBQTtJQUNwQjs7T0FFRztJQUNILDJFQUF3QixDQUFBO0lBQ3hCOztPQUVHO0lBQ0gsdUVBQXVCLENBQUE7SUFFdkI7O09BRUc7SUFDSCxnRUFBa0IsQ0FBQTtJQUVsQjs7T0FFRztJQUNILHdFQUFzQixDQUFBO0lBRXRCOztPQUVHO0lBQ0gsZ0VBQWtCLENBQUE7SUFFbEI7O09BRUc7SUFDSCwyREFBZSxDQUFBO0lBQ2Y7O09BRUc7SUFDSCw2REFBZ0IsQ0FBQTtJQUNoQjs7T0FFRztJQUNILDhEQUFnQixDQUFBO0lBQ2hCOztPQUVHO0lBQ0gsNERBQWUsQ0FBQTtBQUVoQixDQUFDLEVBakRXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBaUQxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvMTIvMjIvMDIyLlxuICovXG5cbi8qKlxuICog5bCP6Kqq54uA5oWLIGZsYWcg5qC55pOaIHJlYWRtZS5tZCDlhafoqK3lrppcbiAqL1xuZXhwb3J0IGVudW0gRW51bU5vdmVsU3RhdHVzXG57XG5cdFVOS05PVyA9IDB4MDAwMCxcblxuXHQvKipcblx0ICog5L2c6ICF5bey5a6M57WQXG5cdCAqL1xuXHRBVVRIT1JfRE9ORSA9IDB4MDAwMSxcblx0LyoqXG5cdCAqIOS9nOiAheW3suajhOWdkVxuXHQgKi9cblx0QVVUSE9SX05PVVBEQVRFID0gMHgwMDAyLFxuXHQvKipcblx0ICog5L2c6ICF5bey5Yiq6ZmkXG5cdCAqL1xuXHRBVVRIT1JfREVMRVRFID0gMHgwMDAwNCxcblxuXHQvKipcblx0ICog5pys5pu45bey5a6M57WQIOS4puS4lOiZleeQhuWujOeVolxuXHQgKi9cblx0VVNFUl9ET05FID0gMHgwMDEwLFxuXG5cdC8qKlxuXHQgKiDmkKzpgYvmo4TlnZFcblx0ICovXG5cdFVTRVJfTk9VUERBVEUgPSAweDAwMjAsXG5cblx0LyoqXG5cdCAqIOaQrOmBi+WujOe1kCDkvYbmnKrmlbTnkIZcblx0ICovXG5cdFVTRVJfVE9ETyA9IDB4MDA0MCxcblxuXHQvKipcblx0ICog5paH5bqr5YyWXG5cdCAqL1xuXHRQX0JPT0sgPSAweDAxMDAsXG5cdC8qKlxuXHQgKiDmvKvnlavljJZcblx0ICovXG5cdFBfQ09NSUMgPSAweDAyMDAsXG5cdC8qKlxuXHQgKiDli5XnlavljJZcblx0ICovXG5cdFBfQU5JTUUgPSAweDA0MDAsXG5cdC8qKlxuXHQgKiDpgYrmiLLljJZcblx0ICovXG5cdFBfR0FNRSA9IDB4MDgwMCxcblxufVxuIl19