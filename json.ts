/**
 * Created by user on 2018/2/3/003.
 */

import { crlf, LF } from 'crlf-normalize';
import { array_unique, deepmergeOptions } from './lib';
import * as deepmerge from 'deepmerge-plus';
import * as moment from 'moment';
import Mdconf, { IMdconfMeta, stringify } from './index';

module JsonMd
{
	export interface IOptions
	{
		tags?: string[],
		contribute?: string[],
	}

	export interface IJsonmdData_v1 extends IOptions
	{
		data?: {
			cover_pic?: string,
			desc?: string,
			author?: string,
			g_lnovel_name?: string
			type?: string[],
			lastupdate?: string,
		},

		novel_date?,
		novel_title?: string,
		novel_author?: string,
		url?: string,
		novel_publisher?: string,
		novel_cover?: string,
		novel_status?: string,

		novel_desc?: string,

		[key: string]: any,
	}

	export function stringify(json_data: IJsonmdData_v1, options?: IMdconfMeta & IOptions): string
	export function stringify(json_data: IMdconfMeta, options?: IMdconfMeta & IOptions): string
	export function stringify(json_data: Partial<IJsonmdData_v1 & IMdconfMeta & IOptions>,
		options?: IMdconfMeta & IOptions
	): string
	export function stringify(json_data, options: IMdconfMeta & IOptions = {}): string
	{
		let data = {
			tags: [],
			contribute: [],
		} as Partial<IMdconfMeta & IJsonmdData_v1 & IOptions>;

		{
			data = deepmerge.all([data, json_data, data, options], deepmergeOptions);
			data.data = data.data || {};

			if (json_data.novel_date)
			{
				data.novel_date = json_data.novel_date;
			}
		}

		if (options.tags)
		{
			data.tags = data.tags.concat(options.tags);
		}
		if (data.data.type)
		{
			data.tags = data.tags.concat(data.data.type);
		}

		data.tags.push('node-novel');

		if (options.contribute)
		{
			data.contribute = data.contribute.concat(options.contribute);
		}

		data.tags = array_unique(data.tags);
		data.contribute = array_unique(data.contribute);

		data.tags.sort();

		if (data.novel_date && typeof data.novel_date !== 'string')
		{
			if (moment.isMoment(data.novel_date) || data.novel_date.format)
			{
				data.novel_date = data.novel_date.format();
			}
			else if (data.novel_date.toJSON)
			{
				data.novel_date = data.novel_date.toJSON();
			}
			else if (data.novel_date._a)
			{
				data.novel_date = moment(data.novel_date._a).local().format();
			}
			else
			{
				data.novel_date = data.novel_date.toString();
			}
		}

		data = Mdconf.sortKeys(data);

		let md = `\n# novel

- title: ${data.novel_title || data.data.g_lnovel_name}
- author: ${data.novel_author || data.data.author}
- source: ${data.url || ''}
- publisher: ${data.novel_publisher || ''}
- cover: ${data.novel_cover || data.data.cover_pic || ''}
- date: ${data.novel_date || ''}
- status: ${data.novel_status || ''}
`;

		md += Mdconf.stringify(data.novel, 2, [
			'title',
			'author',
			'source',
			'publisher',
			'cover',
			'date',
			'status',
			'preface',
			'tags'
		]);

		md += `\n## preface

\`\`\`
${(data.novel_desc || data.data.desc || '').replace(/\`/g, '\\`')}
\`\`\`

## tags

- ${data.tags.join("\n- ")}
`;

		md += `\n# contribute

- ${data.contribute.join("\n- ")}
`;

		if (data.options)
		{
			md += `\n# options\n`;

			md += Mdconf.stringify(data.options, 2);
		}

		return LF + md.replace(/^\n+|\s+$/g, '') + LF;
	}

	export function toNovelInfo(initData: Partial<IMdconfMeta>, inputData: Partial<IJsonmdData_v1 & IMdconfMeta & IOptions>, ...argv: Partial<IJsonmdData_v1 & IMdconfMeta & IOptions>[]): IMdconfMeta
	{
		let ret: IMdconfMeta;

		let data = deepmerge.all([
			{},
			inputData || {},
			...argv,
		], deepmergeOptions);

		let ls: Partial<IJsonmdData_v1 & IMdconfMeta & IOptions>[] = [
			{
				novel: {
					tags: [],
				},
				contribute: [],
				options: {},
			},
			initData || {},
			{
				novel: data.novel,
				contribute: data.contribute,
				options: data.options,
			},
			{
				novel: {
					title: data.novel_title,
					author: data.novel_author,
					date: data.novel_date,
					preface: data.novel_desc,
					status: data.novel_status,
					publisher: data.novel_publisher,
					cover: data.novel_cover,
					// @ts-ignore
					source: data.url && data.url.href ? data.url.href : data.url,

					tags: data.tags,

					series: {
						name: data.novel_series_title,
					},
				},
			},
			{
				novel: {
					source: data.url && (typeof data.url == 'string' ?
						data.url
						// @ts-ignore
						: data.url.href
					),
				},
			},
			{
				novel: {
					source: data.url_data && (typeof data.url_data.url == 'string' ? data.url_data.url : data.url_data.url.href),
				},
			},
		];

		//console.log(data);

		if (data.data)
		{
			ls.push({
				novel: {
					title: data.data.g_lnovel_name,
					author: data.data.author,
					cover: data.data.cover_pic,

					tags: data.data.type,

					preface: data.data.desc,

					date: data.data.lastupdate,
				},
			});
		}

		ret = deepmerge.all([
			...ls,
			{
				novel: {
					title: '',
					author: '',
					date: '',
					preface: '',
					status: '',
					publisher: '',
					cover: '',
					source: '',

					//tags: [],
				},
				//contribute: [],
				//options: {},
			},
		], Object.assign({
			keyValueOrMode: true,
		}, deepmergeOptions) as deepmerge.Options);

		Mdconf.chkInfo(ret);

		if (ret.novel.source)
		{
			[
				/(wenku8)/,
				/(dmzj)/,
				/(dmzj)/,
				/(novel18)?\.(syosetu)/,
				/(alphapolis)/,
			].forEach(function (r)
			{
				let m;
				if (m = r.exec(ret.novel.source))
				{
					ret.novel.tags = ret.novel.tags.concat(m.slice(1));
				}
			});
		}

		ret = Mdconf.sortKeys(ret);
		ret.novel.tags.unshift('node-novel');
		ret.novel.tags = array_unique(ret.novel.tags);

		return ret;
	}

}

export { JsonMd };
export default JsonMd;
