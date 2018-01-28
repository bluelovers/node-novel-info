/**
 * Created by user on 2018/1/27/027.
 */

// @ts-ignore
import * as mdconf from 'mdconf2';
import { crlf, LF } from 'crlf-normalize';
import { array_unique } from './lib';

export interface IMdconfMeta
{
	novel: {
		title: string,
		author: string,
		cover: string,
		preface: string,
		tags: string[],
		date: string,
		status: string,

		source: string,

		publisher?: string,
	},

	contribute: string[],

	options?: {
		textlayout?: {
			allow_lf2?: boolean,
		},
		[key: string]: any,
	},
}

export { mdconf, array_unique, crlf }

export interface IOptions
{
	chk?: boolean,
	throw?: boolean,
}

export function mdconf_parse(data: {
	toString(): string,
}, options?: IOptions): IMdconfMeta
export function mdconf_parse(data: string, options?: IOptions): IMdconfMeta
export function mdconf_parse(data, options: IOptions = {}): IMdconfMeta
{
	let ret = mdconf(crlf(data.toString())) as IMdconfMeta;

	try
	{
		if (ret.novel.preface)
		{
			ret.novel.preface = (ret.novel.preface
				&& ret.novel.preface.length
				&& Array.isArray(ret.novel.preface)) ?
				ret.novel.preface.join(LF) : ret.novel.preface
			;
		}

		ret.options = ret.options || {};
		ret.options.textlayout = Object.assign({}, ret.options.textlayout);
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

	if (ret.contribute)
	{
		if (typeof ret.contribute == 'string')
		{
			ret.contribute = [ret.contribute];
		}

		ret.contribute = array_unique(ret.contribute);
	}

	ret.options = ret.options || {};

	return ret;
}

import * as self from './index';
export default self;
