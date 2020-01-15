/**
 * Created by user on 2018/1/28/028.
 */

import { array_unique } from 'array-hyper-unique';

type IFilterPatternFn<T extends unknown> = ((key: string, value: T | unknown) => boolean);

type IFilterPattern<T extends unknown> = IFilterPatternFn<T> | string | RegExp;

type IEntries<T extends unknown> = [string, T][]

export function _prefix_to_fn<T extends unknown>(prefix: IFilterPattern<T>): IFilterPatternFn<T>
{
	if (typeof prefix === 'string')
	{
		prefix = new RegExp(`^${prefix}`);
	}

	if (typeof prefix === 'function')
	{
		return prefix
	}
	else if (prefix instanceof RegExp)
	{
		//prefix.test('');

		return (key, value) => (prefix as RegExp).test(key)
	}

	throw new TypeError(`not a function , string, RegExp: ${prefix}`)
}

export function filterByPrefix<T extends unknown>(prefix: IFilterPattern<T>, obj: {
	[k: string]: T | unknown
}, options: {
	ignore?: IFilterPattern<T>,
} = {}): IEntries<T>
{
	let fn = _prefix_to_fn<T>(prefix);

	let ignore: IFilterPatternFn<T>;

	if (options && options.ignore)
	{
		ignore = _prefix_to_fn<T>(options.ignore);
	}

	return (Object.entries<T>(obj as any))
		.filter(([key, value]) =>
		{
			if (ignore && ignore(key, value))
			{
				return false;
			}

			return fn(key, value);
		})
	;
}

export function filterByPrefixReturnKeys<T extends unknown>(prefix: IFilterPattern<T>, obj: {
	[k: string]: T | unknown
}, options?: {
	ignore?: IFilterPattern<T>,
})
{
	return filterByPrefix(prefix, obj, options)
		.map(item => item[0])
}

export function filterByPrefixReturnValues<T extends unknown>(prefix: IFilterPattern<T>, obj: {
	[k: string]: T | unknown
}, options?: {
	ignore?: IFilterPattern<T>,
})
{
	return filterByPrefix(prefix, obj, options)
		.map(item => item[1])
}

export function arr_filter<T>(arr: T[])
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

export function cb_title_filter(v: string)
{
	return typeof v === 'string' && v && ![
		'連載中',
		'長編 【連載】',
		'undefined',
		'null',
		'',
	].includes(v.trim())
}

export function anyToArray<T = string>(input: T | T[], unique?: boolean): T[]
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
