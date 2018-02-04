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

export const mdconf_parse = parse;

import * as self from './index';

export default self;
