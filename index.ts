/**
 * Created by user on 2018/1/27/027.
 */

import { EnumNovelStatus } from './lib/const';
import * as mdconf from 'mdconf2';
import { crlf, LF } from 'crlf-normalize';
import { array_unique, deepmerge, deepmergeOptions } from './lib';
import * as moment from 'moment';
import * as isPlainObject from 'is-plain-object';
import * as sortObjectKeys from 'sort-object-keys2';
import JsonMd from './json';
import { envVal, envBool } from 'env-bool';
import { toHex } from 'hex-lib';
import { expect } from 'chai';

export { mdconf, array_unique, crlf, LF }
export { deepmerge, deepmergeOptions }
export { envVal, envBool }

export type INumber = number | string;

export interface IMdconfMetaOptionsBase<T = any>
{
	[key: string]: T,
}

export interface IMdconfMetaOptionsNovelSite extends IMdconfMetaOptionsBase
{
	novel_id?: INumber,
	url?: string,
}

export interface IMdconfMeta
{
	novel?: {
		title?: string,
		title_source?: string,

		title_short?: string,
		title_output?: string,
		title_other?: string,

		title_zh1?: string,
		title_zh2?: string,

		title_zh?: string,
		title_cn?: string,
		title_tw?: string,
		title_en?: string,
		title_jp?: string,

		author?: string,
		authors?: string[],

		cover?: string,
		illust?: string[],

		preface?: string,
		tags?: string[],
		date?: string,
		status?: string,
		r18?: string,

		series?: {
			name?: string,
			name_short?: string,
			position?: number,
		},

		source?: string,
		sources?: string[],

		publisher?: string,

		novel_status?: EnumNovelStatus,
	}

	contribute?: string[],

	options?: IMdconfMetaOptionsBase & {

		dmzj?: IMdconfMetaOptionsNovelSite,
		kakuyomu?: IMdconfMetaOptionsNovelSite,
		wenku8?: IMdconfMetaOptionsNovelSite,
		webqxs?: IMdconfMetaOptionsNovelSite,
		syosetu?: IMdconfMetaOptionsNovelSite & {
			txtdownload_id: INumber,
		},

		novel?: IMdconfMetaOptionsBase & {
			pattern?: string,
		},

		textlayout?: IMdconfMetaOptionsBase & {
			allow_lf2?: boolean,
			allow_lf3?: boolean,
		},

	},

	link?: string[],
}

export interface IOptionsParse extends mdconf.IOptionsParse
{
	chk?: boolean,
	throw?: boolean,

	removeRawData?: boolean,

	/**
	 * 允許殘缺不合法的 meta info
	 */
	lowCheckLevel?: boolean,
}

export const defaultOptionsParse: IOptionsParse = {
	removeRawData: true,
};

export function stringify(data, d2?, ...argv): string
{
	data = JsonMd.toNovelInfo(data, d2 || {}, {
		novel: {
			tags: [],
		},
	}, ...argv);

	data = sortKeys(data);
	data.novel.tags.unshift('node-novel');
	data.novel.tags = array_unique(data.novel.tags);

	if (data.novel.preface && typeof data.novel.preface == 'string')
	{
		data.novel.preface = new mdconf.RawObject(data.novel.preface, {});
	}

	if ('novel_status' in data.novel)
	{
		expect(data.novel.novel_status).a('number');

		data.novel.novel_status = toHex(data.novel.novel_status, 4);
	}

	return mdconf.stringify(data) + LF.repeat(2);
}

export function parse(data: {
	toString(): string,
}, options?: IOptionsParse): IMdconfMeta
export function parse(data: string, options?: IOptionsParse): IMdconfMeta
export function parse(data, options: IOptionsParse = {}): IMdconfMeta
{
	if (options.removeRawData)
	{
		options.oldParseApi = options.removeRawData;
	}

	let ret = mdconf.parse(crlf(data.toString()), options) as IMdconfMeta;

	try
	{
		if (ret.novel.preface)
		{
			ret.novel.preface = (ret.novel.preface
				&& ret.novel.preface.length
				&& Array.isArray(ret.novel.preface)) ? ret.novel.preface.join(LF) : ret.novel.preface
			;
		}

		ret.options = deepmerge(ret.options || {}, {

			textlayout: {},

		}, deepmergeOptions);
	}
	catch (e)
	{
		console.error(e.toString());
	}

	if (options.chk || options.chk == null)
	{
		ret = chkInfo(ret, options);
	}

	if (options.throw || options.throw == null)
	{
		ret = chkInfo(ret, options);

		if (!ret)
		{
			throw new Error('mdconf_parse');
		}
	}

	if (ret)
	{
		ret = sortKeys(ret);

		//console.log(777);
	}

	return ret;
}

export function sortKeys(ret: IMdconfMeta)
{
	ret = sortObjectKeys(ret, [
		'novel',
		'contribute',
		'options',
	]);

	sortSubKey('novel', [
		'title',
		'title_short',
		'title_zh',
		'title_zh1',
		'title_zh2',
		'title_en',
		'title_jp',
		'title_output',
		'title_other',
		'author',
		'source',
		'cover',
		'publisher',
		'date',
		'status',
		'novel_status',
		'r18',

		'series',

		'preface',
		'tags',
	]);

	sortSubKey(['novel', 'tags'], null, true);
	sortSubKey('contribute', null, true);
	sortSubKey('options');

	function sortSubKey(key, sortList?: string[], unique?: boolean)
	{
		let obj = ret;
		let parent = obj;

		//console.log(obj, sortList);

		if (Array.isArray(key))
		{
			//console.log(key);

			let _k;

			for (let value of key)
			{
				if (!(value in obj))
				{
					//console.log(value, parent);

					return;
				}

				_k = value;

				parent = obj;
				obj = parent[value];
			}

			key = _k;
		}
		else if ((key in parent))
		{
			obj = parent[key];
		}
		else
		{
			return;
		}

		if (Array.isArray(obj))
		{
			obj.sort();
			parent[key] = obj;
			if (unique)
			{
				parent[key] = parent[key].filter(function (v)
				{
					return v;
				});

				parent[key] = array_unique(parent[key]);

				if (parent[key].length == 1 && (parent[key][0] === null || typeof parent[key][0] == 'undefined'))
				{
					parent[key] = [];
				}
			}

			return;
		}
		if (isPlainObject(obj))
		{
			parent[key] = sortObjectKeys(obj, sortList);
		}
	}

	return ret;
}

export function chkInfo(ret: IMdconfMeta, options: IOptionsParse = {}): IMdconfMeta
{
	if (!ret
		|| (
			(!options || !options.lowCheckLevel)
			&& (!ret.novel || !ret.novel.title)
		)
	)
	{
		return null;
	}

	if (ret.novel)
	{
		[
			'authors',
			'illust',
			'tags',
			'sources',
		].forEach(k => {
			if (k in ret.novel)
			{
				ret.novel[k] = anyToArray(ret.novel[k], true);
			}
		});

		if ('novel_status' in ret.novel)
		{
			ret.novel.novel_status = envVal(ret.novel.novel_status);

			if (typeof ret.novel.novel_status === 'string' && /^0x[\da-f]+$/.test(ret.novel.novel_status))
			{
				ret.novel.novel_status = Number(ret.novel.novel_status);
			}
		}
	}

	if ('contribute' in ret)
	{
		ret.contribute = anyToArray(ret.contribute, true);
	}

	ret.options = ret.options || {};

	if (typeof ret.options.textlayout === 'object')
	{
		Object.entries(ret.options.textlayout)
			.forEach(([k, v]) => ret.options.textlayout[k] = envVal(v))
		;
	}

	if (typeof ret.options.downloadoptions === 'object')
	{
		Object.entries(ret.options.downloadoptions)
			.forEach(([k, v]) => ret.options.downloadoptions[k] = envVal(v))
		;
	}

	return ret;
}

function anyToArray<T = string>(input: T | T[], unique?: boolean): T[]
{
	if (typeof input != 'object')
	{
		input = [input];
	}

	if (unique)
	{
		input = array_unique(input || []);
	}

	// @ts-ignore
	return input;
}

export const version: string = require("./package.json").version;

import * as self from './index';

export import mdconf_parse = self.parse;

export default self;
