/**
 * Created by user on 2019/1/21/021.
 */
import {
	chkInfo,
	getNovelTitleFromMeta,
	IMdconfMeta,
	IMdconfMetaOptionsNovelSite,
	IOptionsParse,
	parse,
	stringify,
} from './index';
import bind from 'bind-decorator';
import { array_unique, deepmerge, deepmergeOptions } from './lib';
import { EnumNovelStatus } from './lib/const';
import moment = require('moment');
import cloneDeep = require('lodash/cloneDeep');
import { toHex } from 'hex-lib';

export type INodeNovelInfoOptions = IOptionsParse & {};

const defaultOptions: Readonly<INodeNovelInfoOptions> = Object.freeze({});

export class NodeNovelInfo<T extends IMdconfMeta>
{
	raw: T;

	constructor(mdconf: T, options: INodeNovelInfoOptions = defaultOptions, ...argv)
	{
		options = NodeNovelInfo.fixOptions(options);

		let ret: T = cloneDeep(mdconf);

		if (options.chk || options.chk == null)
		{
			ret = chkInfo(ret, options) as T;
		}

		if (options.throw || options.throw == null)
		{
			ret = chkInfo(ret, options) as T;

			if (!ret)
			{
				throw new Error('not a valid NovelInfo data');
			}
		}

		this.raw = ret;
	}

	@bind
	static fixOptions(options?: INodeNovelInfoOptions)
	{
		return Object.assign({}, defaultOptions, options || {})
	}

	@bind
	static create<T extends IMdconfMeta>(mdconf: T, options: INodeNovelInfoOptions = defaultOptions, ...argv)
	{
		return new this(mdconf, options, ...argv)
	}

	@bind
	static createFromString(input: string | Buffer, options: INodeNovelInfoOptions, ...argv)
	{
		if (typeof input != 'string')
		{
			input = input.toString();
		}

		options = this.fixOptions(options);

		let json = parse(input, options);

		return this.create(json, options, ...argv);
	}

	/**
	 * 取得所有小說標題
	 */
	titles(): string[]
	{
		return getNovelTitleFromMeta(this.raw)
			.filter(cb_title_filter)
	}

	/**
	 * 取得系列名稱
	 */
	series_titles(): string[]
	{
		return arr_filter([
			this.raw.novel && this.raw.novel.series && this.raw.novel.series.name,
			this.raw.novel && this.raw.novel.series && this.raw.novel.series.name_short,
		].concat([]))
			.filter(cb_title_filter)
	}

	/**
	 * 取得作者列表
	 */
	authors(): string[]
	{
		return arr_filter([
			this.raw.novel && this.raw.novel.author,
		].concat(this.raw.novel.authors || []))
	}

	/**
	 * 取得繪師列表
	 */
	illusts(): string[]
	{
		return arr_filter([
			this.raw.novel && this.raw.novel.illust,
		].concat(this.raw.novel.illusts || []))
	}

	/**
	 * 取得標籤列表
	 */
	tags(): string[]
	{
		return arr_filter(this.raw.novel && this.raw.novel.tags || [])
	}

	/**
	 * 取得貢獻者/翻譯者列表
	 */
	contributes(): string[]
	{
		return arr_filter(this.raw.contribute || [])
	}

	/**
	 * 取得發布網站或者出版社列表
	 */
	publishers(): string[]
	{
		return arr_filter([
			this.raw.novel && this.raw.novel.publisher,
		].concat(this.raw.novel.publishers || []))
	}

	sites()
	{
		return arr_filter(Object.entries(this.raw.options || {})
			.reduce(function (ls, [site, data])
			{
				if (data && ('novel_id' in data))
				{
					ls.push({
						site,
						data,
					})
				}

				return ls;
			}, [] as {
				site: string,
				data: IMdconfMetaOptionsNovelSite,
			}[]));
	}

	status(): EnumNovelStatus | number
	{
		if (this.raw.novel && this.raw.novel.novel_status)
		{
			return this.raw.novel.novel_status
		}
	}

	toJSON<R>(clone?: boolean): R
	toJSON(clone?: boolean): T
	toJSON(clone?: boolean): T
	{
		if (clone)
		{
			return cloneDeep(this.raw);
		}

		// @ts-ignore
		return this.raw;
	}

	stringify()
	{
		return stringify(this.raw)
	}

	static parse = parse;
	static stringify = stringify;
}

export default NodeNovelInfo

function arr_filter<T>(arr: T[])
{
	return array_unique(arr).filter(v =>
	{
		return v && v != null
			// @ts-ignore
			&& v != 'null'
			// @ts-ignore
			&& v != 'undefined'
	});
}

function cb_title_filter(v: string)
{
	return v && ![
		'連載中',
		'長編 【連載】',
		'undefined',
		'null',
	].includes(v)
}
