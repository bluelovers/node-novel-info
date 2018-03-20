/**
 * Created by user on 2018/1/27/027.
 */

import * as mdconf from 'mdconf2';
import { crlf, LF } from 'crlf-normalize';
import { array_unique, deepmerge, deepmergeOptions } from './lib';
import * as moment from 'moment';
import * as isPlainObject from 'is-plain-object';
import * as sortObjectKeys from 'sort-object-keys2';
import JsonMd from './json';

export { mdconf, array_unique, crlf, LF }
export { deepmerge, deepmergeOptions }

export interface IMdconfMeta
{
	novel?: {
		title?: string,
		title_short?: string,

		title_zh?: string,
		title_en?: string,
		title_jp?: string,

		author?: string,
		cover?: string,
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

		publisher?: string,
	}

	contribute?: string[],

	options?: {
		textlayout?: {
			allow_lf2?: boolean,
		},
		[key: string]: any,
	},

	link?: string[],
}

export interface IOptionsParse extends mdconf.IOptionsParse
{
	chk?: boolean,
	throw?: boolean,

	removeRawData?: boolean,
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
		ret = chkInfo(ret);
	}

	if (options.throw || options.throw == null)
	{
		ret = chkInfo(ret);

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
		'title_en',
		'title_jp',
		'author',
		'source',
		'cover',
		'publisher',
		'date',
		'status',
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

export function chkInfo(ret: IMdconfMeta): IMdconfMeta
{
	if (!ret || !ret.novel || !ret.novel.title)
	{
		return null;
	}

	if ('tags' in ret.novel)
	{
		if (typeof ret.novel.tags == 'string')
		{
			ret.novel.tags = [ret.novel.tags];
		}

		ret.novel.tags = array_unique(ret.novel.tags || []);
	}

	if ('contribute' in ret)
	{
		if (typeof ret.contribute == 'string')
		{
			ret.contribute = [ret.contribute];
		}

		ret.contribute = array_unique(ret.contribute || []);
	}

	ret.options = ret.options || {};

	return ret;
}

export const mdconf_parse = parse;

import * as self from './index';

export default self;
