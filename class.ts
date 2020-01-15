/**
 * Created by user on 2019/1/21/021.
 */
import { parse, stringify } from './index';
import bind from 'lodash-decorators/bind';
import { filterByPrefixReturnValues } from './lib';
import { EnumNovelStatus } from './lib/const';
import cloneDeep from 'lodash/cloneDeep';
import { getNovelTitleFromMeta, chkInfo } from './lib/util';
import { cb_title_filter, arr_filter } from './lib/index';
import { IOptionsParse, IMdconfMeta, IMdconfMetaOptionsNovelSite } from './lib/types';

export type INodeNovelInfoOptions = IOptionsParse & {};

const defaultOptions: Readonly<INodeNovelInfoOptions> = Object.freeze({});

export class NodeNovelInfo<T extends IMdconfMeta>
{
	raw: T;

	pathMain?: string;
	novelID?: string;

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
	static createFromString(input: string | Buffer, options?: INodeNovelInfoOptions, ...argv)
	{
		if (typeof input != 'string')
		{
			input = input.toString();
		}

		options = this.fixOptions(options);

		let json = parse(input, options);

		return this.create(json, options, ...argv);
	}

	protected _pathMain_base()
	{
		let is_out: boolean = null;
		let pathMain_base: string = undefined;

		if (this.pathMain != null)
		{
			let _m = this.pathMain.match(/^(.+?)(_out)?$/);

			is_out = !!_m[2];
			pathMain_base = _m[1];
		}

		return {
			is_out,
			pathMain_base,
		}
	}

	get is_out()
	{
		return this._pathMain_base().is_out;
	}

	get pathMain_base()
	{
		return this._pathMain_base().pathMain_base;
	}

	/**
	 * 取得小說標題
	 */
	title(...titles: string[]): string
	{
		let novel = this.raw.novel;

		let arr = [
			novel.title_output,
			novel.title_zh,
			novel.title_short,
			novel.title_tw,

			...titles,
			novel.title,

			novel.title_source,

			novel.title_jp,
			// @ts-ignore
			novel.title_ja,
			novel.title_cn,
		];

		for (let v of arr)
		{
			if (cb_title_filter(v))
			{
				return v;
			}
		}

		return this.titles()[0]
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
		let novel = this.raw.novel;

		let arr = arr_filter([
			'illust',
			'illusts',
		]
			.concat(Object.keys(novel))
			.reduce(function (a, key: string)
			{
				if (key.indexOf('illust') === 0)
				{
					a.push(key)
				}

				return a
			}, [] as string[]))
			.reduce(function (a: string[], key: string)
			{
				let v = novel[key];

				if (Array.isArray(v))
				{
					a.push(...v)
				}
				else
				{
					a.push(v)
				}

				return a
			}, []) as string[]
		;

		return arr_filter(arr).filter(cb_title_filter)
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
	 * 取得發布網站名稱或者出版社名稱列表
	 */
	publishers(): string[]
	{
		return arr_filter([
			this.raw.novel && this.raw.novel.publisher,
		].concat(this.raw.novel.publishers || []))
	}

	/**
	 * 取得發布或者來源網址
	 */
	sources()
	{
		return arr_filter(filterByPrefixReturnValues<string>(/^source(?:_.+)?$/, this.raw.novel)
			.concat(this.raw.novel.sources || []))
	}

	/**
	 * 小說來源的網站資料(請查閱 novel-downloader)
	 */
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

	/**
	 * 取得小說狀態
	 */
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
