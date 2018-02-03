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

export module Mdconf
{
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
		},

		contribute?: string[],

		options?: {
			textlayout?: {
				allow_lf2?: boolean,
			},
			[key: string]: any,
		},
	}

	export interface IOptions
	{
		chk?: boolean,
		throw?: boolean,
	}

	export function stringify(data, level: number = 1, skip = []): string
	{
		let rs1: string[] = [];
		let rs2: string[] = [];

		if (Array.isArray(data))
		{
			data.forEach(function (value, index, array)
			{
				rs1.push(`- ${value}`);
			})
		}
		else if (typeof data == 'object')
		{
			for (let k in data)
			{
				if (skip.includes(k))
				{
					continue;
				}

				if (Array.isArray(data[k]))
				{
					rs2.push('#'.repeat(level) + '' + k);
					rs2.push(stringify(data[k], level + 1));
				}
				else if (isPlainObject(data[k]))
				{
					rs2.push('#'.repeat(level) + '' + k);
					rs2.push(stringify(data[k], level + 1));
				}
				else if (moment.isMoment(data[k]))
				{
					rs1.push(`- ${k}: ${data[k].format()}`);
				}
				else
				{
					rs1.push(`- ${k}: ${data[k]}`);
				}
			}
		}
		else
		{
			rs1.push(`- ${data}`);
		}

		return LF + (rs1.concat([''].concat(rs2)).join(LF)).replace(/^\n+|\s+$/g, '') + LF;
	}

	export function parse(data: {
		toString(): string,
	}, options?: IOptions): IMdconfMeta
	export function parse(data: string, options?: IOptions): IMdconfMeta
	export function parse(data, options: IOptions = {}): IMdconfMeta
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

			ret.options = deepmerge(ret.options || {}, {

				textlayout: {

				},

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
}

export interface IMdconfMeta extends Mdconf.IMdconfMeta
{}

export const mdconf_parse = Mdconf.parse;

import * as self from './index';
export default self;
