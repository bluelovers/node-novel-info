/**
 * Created by user on 2018/1/27/027.
 */

import { deepmergeOptions } from './lib/const';
import { parse as _parse, stringify as _stringify, RawObject, mdconf } from 'mdconf2';
import { crlf, LF } from 'crlf-normalize';
import deepmerge from 'deepmerge-plus';
import { array_unique } from 'array-hyper-unique';
import JsonMd from './json';
import { envVal, envBool } from 'env-bool';
import { toHex } from 'hex-lib';
import { expect } from 'chai';
import { chkInfo, sortKeys, isHexValue } from './lib/util';
import { IOptionsParse, IMdconfMeta } from './lib/types';

export * from './lib/util';
export * from './lib/types';
export { IMdconfMeta, IOptionsParse } from './lib/types';

export { mdconf }
export { deepmergeOptions }
export { envVal, envBool }

export const defaultOptionsParse: IOptionsParse = {
	removeRawData: true,
	disableKeyToLowerCase: true,
};

export function stringify(data, d2?, ...argv): string
{
	data = _handleDataForStringify(data, d2, ...argv);

	return _stringify(data) + LF.repeat(2);
}

export function parse<T = IMdconfMeta>(data: {
	toString(): string,
}, options?: IOptionsParse): T
export function parse<T = IMdconfMeta>(data: string, options?: IOptionsParse): T
export function parse<T extends IMdconfMeta>(data, options: IOptionsParse = {}): T
{
	if (options.removeRawData)
	{
		options.oldParseApi = options.removeRawData;
	}

	if (options.disableKeyToLowerCase == null)
	{
		options.disableKeyToLowerCase = true;
	}

	let ret = _parse(crlf(data.toString()), options) as IMdconfMeta;

	try
	{
		if (ret.novel?.preface)
		{
			ret.novel.preface = (Array.isArray(ret.novel.preface)) ? ret.novel.preface.join(LF) : ret.novel.preface
			;
		}

		if (!options.lowCheckLevel || ret.options)
		{
			ret.options = deepmerge(ret.options || {}, {

				textlayout: {},

			}, deepmergeOptions);
		}
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
		ret = chkInfo(ret, {
			...options,
			throw: true,
		});

		if (!ret)
		{
			throw new Error('not a valid node-novel-info mdconf');
		}
	}

	if (ret)
	{
		ret = sortKeys(ret);

		//console.log(777);
	}

	// @ts-ignore
	return ret;
}

export function _handleData<T extends IMdconfMeta>(data, d2?, ...argv): T
{
	// @ts-ignore
	data = JsonMd.toNovelInfo(data, d2 || {}, {
		novel: {
			tags: [],
		},
	}, ...argv);

	data = sortKeys(data);
	data.novel.tags.unshift('node-novel');
	data.novel.tags = array_unique(data.novel.tags);

	// @ts-ignore
	return data;
}

export function _handleDataForStringify<T extends IMdconfMeta>(data, d2?, ...argv): T
{
	data = _handleData(data, d2, ...argv);

	if (typeof data.novel?.preface == 'string')
	{
		data.novel.preface = new RawObject(data.novel.preface, {} as any);
	}

	if ('novel_status' in data.novel && !isHexValue(data.novel.novel_status))
	{
		expect(data.novel.novel_status).a('number');

		data.novel.novel_status = toHex(data.novel.novel_status, 4);
	}

	// @ts-ignore
	return data;
}

export const version: string = require("./package.json").version;

export const mdconf_parse = parse;

export default exports as typeof import('./index');
