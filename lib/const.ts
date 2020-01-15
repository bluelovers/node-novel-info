/**
 * Created by user on 2018/12/22/022.
 */

import deepmergeNS from 'deepmerge-plus/core';
import moment, { isMoment } from 'moment';
import { URL } from 'jsdom-url';
import RawObject from 'mdconf2/lib/RawObject';

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
	 * 作者已過世
	 */
	AUTHOR_DEAD = 0x00008,

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
	 * 遊戲
	 */
	P_GAME = 0x0800,

	/**
	 * 數位/電子書
	 */
	P_DIGITAL = 0x1000,

	/**
	 * 電影
	 */
	P_MOVIE = 0x2000,

	/**
	 * 真人/舞台
	 */
	P_REAL = 0x4000,

	/**
	 * 自印/同人
	 */
	P_PRINT = 0x8000,

}

export const deepmergeOptions: deepmergeNS.Options = {
	isMergeableObject(value, isMergeableObject)
	{
		let bool;

		if (isMoment(value) || RawObject.isRawObject(value))
		{
			return false;
		}

		if (value instanceof URL || value && typeof value.href == 'string')
		{
			return false;
		}
	},
};
