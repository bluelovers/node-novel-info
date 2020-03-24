"use strict";
/**
 * Created by user on 2018/2/3/003.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonMd = void 0;
const crlf_normalize_1 = require("crlf-normalize");
const const_1 = require("./lib/const");
const deepmerge_plus_1 = __importDefault(require("deepmerge-plus"));
const moment_1 = __importDefault(require("moment"));
const index_1 = require("./index");
const array_hyper_unique_1 = require("array-hyper-unique");
const util_1 = require("./lib/util");
var JsonMd;
(function (JsonMd) {
    function stringify(json_data, options = {}) {
        let data = {
            tags: [],
            contribute: [],
        };
        {
            data = deepmerge_plus_1.default.all([data, json_data, data, options], const_1.deepmergeOptions);
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
        data.tags = array_hyper_unique_1.array_unique(data.tags);
        data.contribute = array_hyper_unique_1.array_unique(data.contribute);
        data.tags.sort();
        if (data.novel_date && typeof data.novel_date !== 'string') {
            if (moment_1.default.isMoment(data.novel_date) || data.novel_date.format) {
                data.novel_date = data.novel_date.format();
            }
            else if (data.novel_date.toJSON) {
                data.novel_date = data.novel_date.toJSON();
            }
            else if (data.novel_date._a) {
                data.novel_date = moment_1.default(data.novel_date._a).local().format();
            }
            else {
                data.novel_date = data.novel_date.toString();
            }
        }
        data = util_1.sortKeys(data);
        let md = `\n# novel

- title: ${data.novel_title || data.data.g_lnovel_name}
- author: ${data.novel_author || data.data.author}
- source: ${data.url || ''}
- publisher: ${data.novel_publisher || ''}
- cover: ${data.novel_cover || data.data.cover_pic || ''}
- date: ${data.novel_date || ''}
- status: ${data.novel_status || ''}
`;
        md += index_1.stringify(data.novel, 2, [
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
            md += index_1.stringify(data.options, 2);
        }
        return crlf_normalize_1.LF + md.replace(/^\n+|\s+$/g, '') + crlf_normalize_1.LF;
    }
    JsonMd.stringify = stringify;
    function toNovelInfo(initData, inputData, ...argv) {
        let ret;
        let data = deepmerge_plus_1.default.all([
            {},
            inputData || {},
            ...argv,
        ], const_1.deepmergeOptions);
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
                    // @ts-ignore
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
                        // @ts-ignore
                        : data.url.href),
                },
            },
            {
                novel: {
                    source: data.url_data && (typeof data.url_data.url == 'string' ? data.url_data.url : data.url_data.url.href),
                },
            },
        ];
        //console.log(data);
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
        ret = deepmerge_plus_1.default.all([
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
        }, const_1.deepmergeOptions));
        util_1.chkInfo(ret);
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
        ret = util_1.sortKeys(ret);
        ret.novel.tags.unshift('node-novel');
        ret.novel.tags = array_hyper_unique_1.array_unique(ret.novel.tags);
        return ret;
    }
    JsonMd.toNovelInfo = toNovelInfo;
})(JsonMd = exports.JsonMd || (exports.JsonMd = {}));
exports.default = JsonMd;
//# sourceMappingURL=json.js.map