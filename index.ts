/**
 * Created by user on 2018/1/27/027.
 */

// @ts-ignore
import * as mdconf from 'mdconf2';
import { crlf, LF } from 'crlf-normalize';
import { array_unique, deepmergeOptions } from './lib';
import * as deepmerge from 'deepmerge-plus';
import * as moment from 'moment';
import * as isPlainObject from 'is-plain-object';
import * as sortObjectKeys from 'sort-object-keys2';

export { mdconf, array_unique, crlf, LF }

export interface IMdconfMeta
{
	novel?: {
		title?: string,
		author?: string,
		cover?: string,
		preface?: string,
		tags?: string[],
		date?: string,
		status?: string,

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

export function stringify(data, ...argv): string
{
	data = sortKeys(data);

	return mdconf.stringify(data, ...argv);
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
		'author',
		'source',
		'cover',
		'publisher',
		'date',
		'status',
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
			for (let value of key)
			{
				if (!(value in parent))
				{
					return;
				}

				parent = obj;
				obj = parent[value];
			}
		}
		else if ((key in parent))
		{
			obj = parent[key];
		}
		else
		{
			return;
		}

		//console.log(obj, sortList);

		if (Array.isArray(obj))
		{
			parent[key] = obj.sort();
			if (unique)
			{
				parent[key] = array_unique(obj);

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

	if (ret.novel.tags)
	{
		if (typeof ret.novel.tags == 'string')
		{
			ret.novel.tags = [ret.novel.tags];
		}

		ret.novel.tags = array_unique(ret.novel.tags);
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
