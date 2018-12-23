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
     * 本書已完結 並且處理完畢
     */
    USER_DONE = 16
}
