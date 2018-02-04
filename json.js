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
        let md = `\n# novel

- title: ${data.novel_title || data.data.g_lnovel_name}
- author: ${data.novel_author || data.data.author}
- source: ${data.url || ''}
- publisher: ${data.novel_publisher || ''}
- cover: ${data.novel_cover || data.data.cover_pic || ''}
- date: ${data.novel_date || ''}
- status: ${data.novel_status || ''}
`;
        md += index_1.default.stringify(data.novel, 2, ['title', 'author', 'source', 'publisher', 'cover', 'date', 'status', 'preface', 'tags']);
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
})(JsonMd || (JsonMd = {}));
exports.JsonMd = JsonMd;
exports.default = JsonMd;
