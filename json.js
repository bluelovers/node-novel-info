"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crlf_normalize_1 = require("crlf-normalize");
const lib_1 = require("./lib");
const deepmerge = require("deepmerge-plus");
const moment = require("moment");
const index_1 = require("./index");
var JsonMd;
(function (JsonMd) {
    function stringify(json_data, options = {}) {
        let data = {
            tags: [],
            contribute: [],
        };
        {
            data = deepmerge.all([data, json_data, data, options], lib_1.deepmergeOptions);
            data.data = data.data || {};
            if (json_data.novel_date) {
                data.novel_date = json_data.novel_date;
            }
        }
        if (options.tags) {
            data.tags = data.tags.concat(options.tags);
        }
        if (data.data.type) {
            data.tags = data.tags.concat(data.data.type);
        }
        data.tags.push('node-novel');
        if (options.contribute) {
            data.contribute = data.contribute.concat(options.contribute);
        }
        data.tags = lib_1.array_unique(data.tags);
        data.contribute = lib_1.array_unique(data.contribute);
        data.tags.sort();
        if (data.novel_date && typeof data.novel_date !== 'string') {
            if (moment.isMoment(data.novel_date) || data.novel_date.format) {
                data.novel_date = data.novel_date.format();
            }
            else if (data.novel_date.toJSON) {
                data.novel_date = data.novel_date.toJSON();
            }
            else if (data.novel_date._a) {
                data.novel_date = moment(data.novel_date._a).local().format();
            }
            else {
                data.novel_date = data.novel_date.toString();
            }
        }
        data = index_1.default.sortKeys(data);
        let md = `\n# novel

- title: ${data.novel_title || data.data.g_lnovel_name}
- author: ${data.novel_author || data.data.author}
- source: ${data.url || ''}
- publisher: ${data.novel_publisher || ''}
- cover: ${data.novel_cover || data.data.cover_pic || ''}
- date: ${data.novel_date || ''}
- status: ${data.novel_status || ''}
`;
        md += index_1.default.stringify(data.novel, 2, [
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
        if (data.options) {
            md += `\n# options\n`;
            md += index_1.default.stringify(data.options, 2);
        }
        return crlf_normalize_1.LF + md.replace(/^\n+|\s+$/g, '') + crlf_normalize_1.LF;
    }
    JsonMd.stringify = stringify;
    function toNovelInfo(initData, inputData, ...argv) {
        let ret;
        let data = deepmerge.all([
            {},
            inputData || {},
            ...argv,
        ], lib_1.deepmergeOptions);
        let ls = [
            {
                novel: {
                    tags: [],
                    series: {
                        name: '',
                    },
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
                    source: data.url && data.url.href ? data.url.href : data.url,
                    tags: data.tags,
                    series: {
                        name: data.novel_series_title || '',
                    },
                },
            },
            {
                novel: {
                    source: data.url && (typeof data.url == 'string' ?
                        data.url
                        : data.url.href),
                },
            },
            {
                novel: {
                    source: data.url_data && (typeof data.url_data.url == 'string' ? data.url_data.url : data.url_data.url.href),
                },
            },
        ];
        if (data.data) {
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
                },
            },
        ], Object.assign({
            keyValueOrMode: true,
        }, lib_1.deepmergeOptions));
        index_1.default.chkInfo(ret);
        if (ret.novel.source) {
            [
                /(wenku8)/,
                /(dmzj)/,
                /(dmzj)/,
                /(novel18)?\.(syosetu)/,
                /(alphapolis)/,
            ].forEach(function (r) {
                let m;
                if (m = r.exec(ret.novel.source)) {
                    ret.novel.tags = ret.novel.tags.concat(m.slice(1));
                }
            });
        }
        ret = index_1.default.sortKeys(ret);
        ret.novel.tags.unshift('node-novel');
        ret.novel.tags = lib_1.array_unique(ret.novel.tags);
        return ret;
    }
    JsonMd.toNovelInfo = toNovelInfo;
})(JsonMd || (JsonMd = {}));
exports.JsonMd = JsonMd;
exports.default = JsonMd;
