/**
 * Created by user on 2018/1/27/027.
 */

import * as mdconf from 'mdconf';
import { crlf, LF } from 'crlf-normalize';

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

		publisher?: string,
	},

	contribute: string[],

	options?: {
		textlayout?: {
			allow_lf2?: boolean,
		},
	},
}

export { mdconf }

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

	const old = ret;

	try
	{
		ret.novel.preface = (ret.novel.preface
			&& ret.novel.preface.length
			&& Array.isArray(ret.novel.preface)) ?
			ret.novel.preface.join(LF) : ret.novel.preface
		;
	}
	catch (e)
	{

	}

	ret.options = ret.options || {};
	ret.options.textlayout = Object.assign({}, ret.options.textlayout);

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
	if (!ret || !ret.novel || ret.novel.title)
	{
		return null;
	}

	return ret;
}

import * as self from './index';
export default self;
