/**
 * Created by user on 2020/1/16.
 */

import { filterByPrefixReturnKeys, anyToArray } from './index';
import { array_unique } from 'array-hyper-unique';
import { IOptionsParse, IMdconfMeta } from './types';
import { envVal } from 'env-bool';
import sortObjectKeys from 'sort-object-keys2';
import { isPlainObject } from 'is-plain-object';

export function getNovelTitleFromMeta(meta: IMdconfMeta): string[]
{
	if (meta?.novel)
	{
		let arr = [
				'title',
				'title_source',
				'title_jp',
				'title_ja',
				'title_zh',
				'title_tw',
				'title_cn',
			].concat(filterByPrefixReturnKeys('title_', meta.novel))
			.reduce(function (a, key: string)
			{
				if (key in meta.novel)
				{
					a.push(meta.novel[key])
				}

				return a
			}, [])
		;

		if (meta.novel.series)
		{
			arr.push(meta.novel.series.name);
			arr.push(meta.novel.series.name_short);
		}

		arr = array_unique(arr.filter(v => v && ![
			'undefined',
			'長編 【連載】',
			'連載中',
		].includes(v)));

		return arr;
	}

	return [];
}

export function sortKeys<T extends IMdconfMeta>(ret: T)
{
	// @ts-ignore
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
		'title_source',
		'author',
		'authors',
		'illust',
		'illusts',
		'source',
		'sources',
		'cover',
		'publisher',
		'publishers',
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

	// @ts-ignore
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
		if (options?.throw)
		{
			throw new TypeError(`novel${(ret.novel ? '.title' : '')} not exists.`);
		}

		return null;
	}

	if (ret.novel)
	{
		[
			'authors',
			'illusts',
			'tags',
			'sources',
			'publishers',
		].forEach(k =>
		{
			if (k in ret.novel)
			{
				ret.novel[k] = anyToArray(ret.novel[k], true);
			}
		});

		if ('novel_status' in ret.novel)
		{
			ret.novel.novel_status = envVal(ret.novel.novel_status);

			if (isHexValue(ret.novel.novel_status))
			{
				ret.novel.novel_status = Number(ret.novel.novel_status);
			}
		}
	}

	if ('contribute' in ret)
	{
		ret.contribute = anyToArray(ret.contribute, true);
	}

	if (!options.lowCheckLevel)
	{
		ret.options = ret.options || {};
	}

	if (ret.options)
	{
		if (typeof ret.options.textlayout === 'object')
		{
			Object.entries(ret.options.textlayout)
				.forEach(([k, v]) => ret.options.textlayout[k] = envVal(v))
			;
		}

		if (typeof ret.options.downloadOptions === 'object')
		{
			Object.entries(ret.options.downloadOptions)
				.forEach(([k, v]) => ret.options.downloadOptions[k] = envVal(v))
			;
		}
	}

	return ret;
}

export function isHexValue(value: string | number)
{
	return typeof value === 'string' && /^0x[\da-f]+$/i.test(value)
}
