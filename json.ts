/**
 * Created by user on 2018/2/3/003.
 */

import { crlf, LF } from 'crlf-normalize';
import { array_unique, deepmergeOptions } from './lib';
import * as deepmerge from 'deepmerge-plus';
import * as moment from 'moment';
import Mdconf, { IMdconfMeta } from './index';

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
	export function stringify(json_data: IJsonmdData_v1 & IMdconfMeta & IOptions, options?: IMdconfMeta & IOptions): string
	export function stringify(json_data, options: IMdconfMeta & IOptions = {}): string
	{
		let data = {
			tags: [],
			contribute: [],
		} as IMdconfMeta & IJsonmdData_v1 & IOptions;

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

		let md = `\n# novel

- title: ${data.novel_title || data.data.g_lnovel_name}
- author: ${data.novel_author || data.data.author}
- source: ${data.url || ''}
- publisher: ${data.novel_publisher || ''}
- cover: ${data.novel_cover || data.data.cover_pic || ''}
- date: ${data.novel_date || ''}
- status: ${data.novel_status || ''}
`;

		md += Mdconf.stringify(data.novel, 2, ['title', 'author', 'source', 'publisher', 'cover', 'date', 'status', 'preface', 'tags']);

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
}

export { JsonMd };
export default JsonMd;
