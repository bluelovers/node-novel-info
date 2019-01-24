/**
 * Created by user on 2018/12/22/022.
 */
/**
 * 小說狀態 flag 根據 readme.md 內設定
 */
export declare enum EnumNovelStatus {
    UNKNOW = 0,
    /**
     * 作者已完結
     */
    AUTHOR_DONE = 1,
    /**
     * 作者已棄坑
     */
    AUTHOR_NOUPDATE = 2,
    /**
     * 作者已刪除
     */
    AUTHOR_DELETE = 4,
    /**
     * 作者已過世
     */
    AUTHOR_DEAD = 8,
    /**
     * 本書已完結 並且處理完畢
     */
    USER_DONE = 16,
    /**
     * 搬運棄坑
     */
    USER_NOUPDATE = 32,
    /**
     * 搬運完結 但未整理
     */
    USER_TODO = 64,
    /**
     * 文庫化
     */
    P_BOOK = 256,
    /**
     * 漫畫化
     */
    P_COMIC = 512,
    /**
     * 動畫化
     */
    P_ANIME = 1024,
    /**
     * 遊戲
     */
    P_GAME = 2048,
    /**
     * 數位/電子書
     */
    P_DIGITAL = 4096,
    /**
     * 電影
     */
    P_MOVIE = 8192,
    /**
     * 真人/舞台
     */
    P_REAL = 16384,
    /**
     * 自印/同人
     */
    P_PRINT = 32768
}
