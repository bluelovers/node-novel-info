/**
 * Created by user on 2018/12/22/022.
 */

/**
 * 小說狀態 flag 根據 readme.md 內設定
 */
export enum EnumNovelStatus
{
	UNKNOW = 0x0000,

	/**
	 * 作者已完結
	 */
	AUTHOR_DONE = 0x0001,
	/**
	 * 作者已棄坑
	 */
	AUTHOR_NOUPDATE = 0x0002,
	/**
	 * 作者已刪除
	 */
	AUTHOR_DELETE = 0x00004,

	/**
	 * 本書已完結 並且處理完畢
	 */
	USER_DONE = 0x0010,

	/**
	 * 搬運棄坑
	 */
	USER_NOUPDATE = 0x0020,

	/**
	 * 搬運完結 但未整理
	 */
	USER_TODO = 0x0040,

	/**
	 * 文庫化
	 */
	P_BOOK = 0x0100,
	/**
	 * 漫畫化
	 */
	P_COMIC = 0x0200,
	/**
	 * 動畫化
	 */
	P_ANIME = 0x0400,
	/**
	 * 遊戲化
	 */
	P_GAME = 0x0800,

}
