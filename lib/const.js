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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUg7O0dBRUc7QUFDSCxJQUFZLGVBeUVYO0FBekVELFdBQVksZUFBZTtJQUUxQix5REFBZSxDQUFBO0lBRWY7O09BRUc7SUFDSCxtRUFBb0IsQ0FBQTtJQUNwQjs7T0FFRztJQUNILDJFQUF3QixDQUFBO0lBQ3hCOztPQUVHO0lBQ0gsdUVBQXVCLENBQUE7SUFDdkI7O09BRUc7SUFDSCxtRUFBcUIsQ0FBQTtJQUVyQjs7T0FFRztJQUNILGdFQUFrQixDQUFBO0lBRWxCOztPQUVHO0lBQ0gsd0VBQXNCLENBQUE7SUFFdEI7O09BRUc7SUFDSCxnRUFBa0IsQ0FBQTtJQUVsQjs7T0FFRztJQUNILDJEQUFlLENBQUE7SUFDZjs7T0FFRztJQUNILDZEQUFnQixDQUFBO0lBQ2hCOztPQUVHO0lBQ0gsOERBQWdCLENBQUE7SUFDaEI7O09BRUc7SUFDSCw0REFBZSxDQUFBO0lBRWY7O09BRUc7SUFDSCxrRUFBa0IsQ0FBQTtJQUVsQjs7T0FFRztJQUNILDhEQUFnQixDQUFBO0lBRWhCOztPQUVHO0lBQ0gsNkRBQWUsQ0FBQTtJQUVmOztPQUVHO0lBQ0gsK0RBQWdCLENBQUE7QUFFakIsQ0FBQyxFQXpFVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQXlFMUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzEyLzIyLzAyMi5cbiAqL1xuXG4vKipcbiAqIOWwj+iqqueLgOaFiyBmbGFnIOagueaTmiByZWFkbWUubWQg5YWn6Kit5a6aXG4gKi9cbmV4cG9ydCBlbnVtIEVudW1Ob3ZlbFN0YXR1c1xue1xuXHRVTktOT1cgPSAweDAwMDAsXG5cblx0LyoqXG5cdCAqIOS9nOiAheW3suWujOe1kFxuXHQgKi9cblx0QVVUSE9SX0RPTkUgPSAweDAwMDEsXG5cdC8qKlxuXHQgKiDkvZzogIXlt7Lmo4TlnZFcblx0ICovXG5cdEFVVEhPUl9OT1VQREFURSA9IDB4MDAwMixcblx0LyoqXG5cdCAqIOS9nOiAheW3suWIqumZpFxuXHQgKi9cblx0QVVUSE9SX0RFTEVURSA9IDB4MDAwMDQsXG5cdC8qKlxuXHQgKiDkvZzogIXlt7LpgY7kuJZcblx0ICovXG5cdEFVVEhPUl9ERUFEID0gMHgwMDAwOCxcblxuXHQvKipcblx0ICog5pys5pu45bey5a6M57WQIOS4puS4lOiZleeQhuWujOeVolxuXHQgKi9cblx0VVNFUl9ET05FID0gMHgwMDEwLFxuXG5cdC8qKlxuXHQgKiDmkKzpgYvmo4TlnZFcblx0ICovXG5cdFVTRVJfTk9VUERBVEUgPSAweDAwMjAsXG5cblx0LyoqXG5cdCAqIOaQrOmBi+WujOe1kCDkvYbmnKrmlbTnkIZcblx0ICovXG5cdFVTRVJfVE9ETyA9IDB4MDA0MCxcblxuXHQvKipcblx0ICog5paH5bqr5YyWXG5cdCAqL1xuXHRQX0JPT0sgPSAweDAxMDAsXG5cdC8qKlxuXHQgKiDmvKvnlavljJZcblx0ICovXG5cdFBfQ09NSUMgPSAweDAyMDAsXG5cdC8qKlxuXHQgKiDli5XnlavljJZcblx0ICovXG5cdFBfQU5JTUUgPSAweDA0MDAsXG5cdC8qKlxuXHQgKiDpgYrmiLJcblx0ICovXG5cdFBfR0FNRSA9IDB4MDgwMCxcblxuXHQvKipcblx0ICog5pW45L2NL+mbu+WtkOabuFxuXHQgKi9cblx0UF9ESUdJVEFMID0gMHgxMDAwLFxuXG5cdC8qKlxuXHQgKiDpm7vlvbFcblx0ICovXG5cdFBfTU9WSUUgPSAweDIwMDAsXG5cblx0LyoqXG5cdCAqIOecn+S6ui/oiJ7lj7Bcblx0ICovXG5cdFBfUkVBTCA9IDB4NDAwMCxcblxuXHQvKipcblx0ICog6Ieq5Y2wL+WQjOS6ulxuXHQgKi9cblx0UF9QUklOVCA9IDB4ODAwMCxcblxufVxuIl19