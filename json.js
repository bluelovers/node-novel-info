"use strict";
/**
 * Created by user on 2018/2/3/003.
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILG1EQUEwQztBQUMxQywrQkFBdUQ7QUFDdkQsNENBQTZDO0FBQzdDLGlDQUFrQztBQUNsQyxtQ0FBeUQ7QUFFekQsSUFBTyxNQUFNLENBdVJaO0FBdlJELFdBQU8sTUFBTTtJQXVDWixTQUFnQixTQUFTLENBQUMsU0FBUyxFQUFFLFVBQWtDLEVBQUU7UUFFeEUsSUFBSSxJQUFJLEdBQUc7WUFDVixJQUFJLEVBQUUsRUFBRTtZQUNSLFVBQVUsRUFBRSxFQUFFO1NBQ3NDLENBQUM7UUFFdEQ7WUFDQyxJQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLHNCQUFnQixDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUU1QixJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQ3hCO2dCQUNDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQzthQUN2QztTQUNEO1FBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUNoQjtZQUNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFDbEI7WUFDQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0M7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU3QixJQUFJLE9BQU8sQ0FBQyxV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SSxHQUFHLGtCQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5QyxPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFqSWUsa0JBQVcsY0FpSTFCLENBQUE7QUFFRixDQUFDLEVBdlJNLE1BQU0sS0FBTixNQUFNLFFBdVJaO0FBRVEsd0JBQU07QUFDZixrQkFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE4LzIvMy8wMDMuXG4gKi9cblxuaW1wb3J0IHsgY3JsZiwgTEYgfSBmcm9tICdjcmxmLW5vcm1hbGl6ZSc7XG5pbXBvcnQgeyBhcnJheV91bmlxdWUsIGRlZXBtZXJnZU9wdGlvbnMgfSBmcm9tICcuL2xpYic7XG5pbXBvcnQgZGVlcG1lcmdlID0gcmVxdWlyZSgnZGVlcG1lcmdlLXBsdXMnKTtcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbmltcG9ydCBNZGNvbmYsIHsgSU1kY29uZk1ldGEsIHN0cmluZ2lmeSB9IGZyb20gJy4vaW5kZXgnO1xuXG5tb2R1bGUgSnNvbk1kXG57XG5cdGV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbnNcblx0e1xuXHRcdHRhZ3M/OiBzdHJpbmdbXSxcblx0XHRjb250cmlidXRlPzogc3RyaW5nW10sXG5cdH1cblxuXHRleHBvcnQgaW50ZXJmYWNlIElKc29ubWREYXRhX3YxIGV4dGVuZHMgSU9wdGlvbnNcblx0e1xuXHRcdGRhdGE/OiB7XG5cdFx0XHRjb3Zlcl9waWM/OiBzdHJpbmcsXG5cdFx0XHRkZXNjPzogc3RyaW5nLFxuXHRcdFx0YXV0aG9yPzogc3RyaW5nLFxuXHRcdFx0Z19sbm92ZWxfbmFtZT86IHN0cmluZ1xuXHRcdFx0dHlwZT86IHN0cmluZ1tdLFxuXHRcdFx0bGFzdHVwZGF0ZT86IHN0cmluZyxcblx0XHR9LFxuXG5cdFx0bm92ZWxfZGF0ZT8sXG5cdFx0bm92ZWxfdGl0bGU/OiBzdHJpbmcsXG5cdFx0bm92ZWxfYXV0aG9yPzogc3RyaW5nLFxuXHRcdHVybD86IHN0cmluZyxcblx0XHRub3ZlbF9wdWJsaXNoZXI/OiBzdHJpbmcsXG5cdFx0bm92ZWxfY292ZXI/OiBzdHJpbmcsXG5cdFx0bm92ZWxfc3RhdHVzPzogc3RyaW5nLFxuXG5cdFx0bm92ZWxfc2VyaWVzX3RpdGxlPzogc3RyaW5nLFxuXG5cdFx0bm92ZWxfZGVzYz86IHN0cmluZyxcblxuXHRcdFtrZXk6IHN0cmluZ106IGFueSxcblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkoanNvbl9kYXRhOiBJSnNvbm1kRGF0YV92MSwgb3B0aW9ucz86IElNZGNvbmZNZXRhICYgSU9wdGlvbnMpOiBzdHJpbmdcblx0ZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeShqc29uX2RhdGE6IElNZGNvbmZNZXRhLCBvcHRpb25zPzogSU1kY29uZk1ldGEgJiBJT3B0aW9ucyk6IHN0cmluZ1xuXHRleHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KGpzb25fZGF0YTogUGFydGlhbDxJSnNvbm1kRGF0YV92MSAmIElNZGNvbmZNZXRhICYgSU9wdGlvbnM+LFxuXHRcdG9wdGlvbnM/OiBJTWRjb25mTWV0YSAmIElPcHRpb25zXG5cdCk6IHN0cmluZ1xuXHRleHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KGpzb25fZGF0YSwgb3B0aW9uczogSU1kY29uZk1ldGEgJiBJT3B0aW9ucyA9IHt9KTogc3RyaW5nXG5cdHtcblx0XHRsZXQgZGF0YSA9IHtcblx0XHRcdHRhZ3M6IFtdLFxuXHRcdFx0Y29udHJpYnV0ZTogW10sXG5cdFx0fSBhcyBQYXJ0aWFsPElNZGNvbmZNZXRhICYgSUpzb25tZERhdGFfdjEgJiBJT3B0aW9ucz47XG5cblx0XHR7XG5cdFx0XHRkYXRhID0gZGVlcG1lcmdlLmFsbChbZGF0YSwganNvbl9kYXRhLCBkYXRhLCBvcHRpb25zXSwgZGVlcG1lcmdlT3B0aW9ucyk7XG5cdFx0XHRkYXRhLmRhdGEgPSBkYXRhLmRhdGEgfHwge307XG5cblx0XHRcdGlmIChqc29uX2RhdGEubm92ZWxfZGF0ZSlcblx0XHRcdHtcblx0XHRcdFx0ZGF0YS5ub3ZlbF9kYXRlID0ganNvbl9kYXRhLm5vdmVsX2RhdGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKG9wdGlvbnMudGFncylcblx0XHR7XG5cdFx0XHRkYXRhLnRhZ3MgPSBkYXRhLnRhZ3MuY29uY2F0KG9wdGlvbnMudGFncyk7XG5cdFx0fVxuXHRcdGlmIChkYXRhLmRhdGEudHlwZSlcblx0XHR7XG5cdFx0XHRkYXRhLnRhZ3MgPSBkYXRhLnRhZ3MuY29uY2F0KGRhdGEuZGF0YS50eXBlKTtcblx0XHR9XG5cblx0XHRkYXRhLnRhZ3MucHVzaCgnbm9kZS1ub3ZlbCcpO1xuXG5cdFx0aWYgKG9wdGlvbnMuY29udHJpYnV0ZSlcblx0XHR7XG5cdFx0XHRkYXRhLmNvbnRyaWJ1dGUgPSBkYXRhLmNvbnRyaWJ1dGUuY29uY2F0KG9wdGlvbnMuY29udHJpYnV0ZSk7XG5cdFx0fVxuXG5cdFx0ZGF0YS50YWdzID0gYXJyYXlfdW5pcXVlKGRhdGEudGFncyk7XG5cdFx0ZGF0YS5jb250cmlidXRlID0gYXJyYXlfdW5pcXVlKGRhdGEuY29udHJpYnV0ZSk7XG5cblx0XHRkYXRhLnRhZ3Muc29ydCgpO1xuXG5cdFx0aWYgKGRhdGEubm92ZWxfZGF0ZSAmJiB0eXBlb2YgZGF0YS5ub3ZlbF9kYXRlICE9PSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHRpZiAobW9tZW50LmlzTW9tZW50KGRhdGEubm92ZWxfZGF0ZSkgfHwgZGF0YS5ub3ZlbF9kYXRlLmZvcm1hdClcblx0XHRcdHtcblx0XHRcdFx0ZGF0YS5ub3ZlbF9kYXRlID0gZGF0YS5ub3ZlbF9kYXRlLmZvcm1hdCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoZGF0YS5ub3ZlbF9kYXRlLnRvSlNPTilcblx0XHRcdHtcblx0XHRcdFx0ZGF0YS5ub3ZlbF9kYXRlID0gZGF0YS5ub3ZlbF9kYXRlLnRvSlNPTigpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoZGF0YS5ub3ZlbF9kYXRlLl9hKVxuXHRcdFx0e1xuXHRcdFx0XHRkYXRhLm5vdmVsX2RhdGUgPSBtb21lbnQoZGF0YS5ub3ZlbF9kYXRlLl9hKS5sb2NhbCgpLmZvcm1hdCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRkYXRhLm5vdmVsX2RhdGUgPSBkYXRhLm5vdmVsX2RhdGUudG9TdHJpbmcoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRkYXRhID0gTWRjb25mLnNvcnRLZXlzKGRhdGEpO1xuXG5cdFx0bGV0IG1kID0gYFxcbiMgbm92ZWxcblxuLSB0aXRsZTogJHtkYXRhLm5vdmVsX3RpdGxlIHx8IGRhdGEuZGF0YS5nX2xub3ZlbF9uYW1lfVxuLSBhdXRob3I6ICR7ZGF0YS5ub3ZlbF9hdXRob3IgfHwgZGF0YS5kYXRhLmF1dGhvcn1cbi0gc291cmNlOiAke2RhdGEudXJsIHx8ICcnfVxuLSBwdWJsaXNoZXI6ICR7ZGF0YS5ub3ZlbF9wdWJsaXNoZXIgfHwgJyd9XG4tIGNvdmVyOiAke2RhdGEubm92ZWxfY292ZXIgfHwgZGF0YS5kYXRhLmNvdmVyX3BpYyB8fCAnJ31cbi0gZGF0ZTogJHtkYXRhLm5vdmVsX2RhdGUgfHwgJyd9XG4tIHN0YXR1czogJHtkYXRhLm5vdmVsX3N0YXR1cyB8fCAnJ31cbmA7XG5cblx0XHRtZCArPSBNZGNvbmYuc3RyaW5naWZ5KGRhdGEubm92ZWwsIDIsIFtcblx0XHRcdCd0aXRsZScsXG5cdFx0XHQnYXV0aG9yJyxcblx0XHRcdCdzb3VyY2UnLFxuXHRcdFx0J3B1Ymxpc2hlcicsXG5cdFx0XHQnY292ZXInLFxuXHRcdFx0J2RhdGUnLFxuXHRcdFx0J3N0YXR1cycsXG5cdFx0XHQncHJlZmFjZScsXG5cdFx0XHQndGFncydcblx0XHRdKTtcblxuXHRcdG1kICs9IGBcXG4jIyBwcmVmYWNlXG5cblxcYFxcYFxcYFxuJHsoZGF0YS5ub3ZlbF9kZXNjIHx8IGRhdGEuZGF0YS5kZXNjIHx8ICcnKS5yZXBsYWNlKC9cXGAvZywgJ1xcXFxgJyl9XG5cXGBcXGBcXGBcblxuIyMgdGFnc1xuXG4tICR7ZGF0YS50YWdzLmpvaW4oXCJcXG4tIFwiKX1cbmA7XG5cblx0XHRtZCArPSBgXFxuIyBjb250cmlidXRlXG5cbi0gJHtkYXRhLmNvbnRyaWJ1dGUuam9pbihcIlxcbi0gXCIpfVxuYDtcblxuXHRcdGlmIChkYXRhLm9wdGlvbnMpXG5cdFx0e1xuXHRcdFx0bWQgKz0gYFxcbiMgb3B0aW9uc1xcbmA7XG5cblx0XHRcdG1kICs9IE1kY29uZi5zdHJpbmdpZnkoZGF0YS5vcHRpb25zLCAyKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTEYgKyBtZC5yZXBsYWNlKC9eXFxuK3xcXHMrJC9nLCAnJykgKyBMRjtcblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiB0b05vdmVsSW5mbyhpbml0RGF0YTogUGFydGlhbDxJTWRjb25mTWV0YT4sIGlucHV0RGF0YTogUGFydGlhbDxJSnNvbm1kRGF0YV92MSAmIElNZGNvbmZNZXRhICYgSU9wdGlvbnM+LCAuLi5hcmd2OiBQYXJ0aWFsPElKc29ubWREYXRhX3YxICYgSU1kY29uZk1ldGEgJiBJT3B0aW9ucz5bXSk6IElNZGNvbmZNZXRhXG5cdHtcblx0XHRsZXQgcmV0OiBJTWRjb25mTWV0YTtcblxuXHRcdGxldCBkYXRhID0gZGVlcG1lcmdlLmFsbChbXG5cdFx0XHR7fSxcblx0XHRcdGlucHV0RGF0YSB8fCB7fSxcblx0XHRcdC4uLmFyZ3YsXG5cdFx0XSwgZGVlcG1lcmdlT3B0aW9ucyk7XG5cblx0XHRsZXQgbHM6IFBhcnRpYWw8SUpzb25tZERhdGFfdjEgJiBJTWRjb25mTWV0YSAmIElPcHRpb25zPltdID0gW1xuXHRcdFx0e1xuXHRcdFx0XHRub3ZlbDoge1xuXHRcdFx0XHRcdHRhZ3M6IFtdLFxuXHRcdFx0XHRcdHNlcmllczoge1xuXHRcdFx0XHRcdFx0bmFtZTogJycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0Y29udHJpYnV0ZTogW10sXG5cdFx0XHRcdG9wdGlvbnM6IHt9LFxuXHRcdFx0fSxcblx0XHRcdGluaXREYXRhIHx8IHt9LFxuXHRcdFx0e1xuXHRcdFx0XHRub3ZlbDogZGF0YS5ub3ZlbCxcblx0XHRcdFx0Y29udHJpYnV0ZTogZGF0YS5jb250cmlidXRlLFxuXHRcdFx0XHRvcHRpb25zOiBkYXRhLm9wdGlvbnMsXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRub3ZlbDoge1xuXHRcdFx0XHRcdHRpdGxlOiBkYXRhLm5vdmVsX3RpdGxlLFxuXHRcdFx0XHRcdGF1dGhvcjogZGF0YS5ub3ZlbF9hdXRob3IsXG5cdFx0XHRcdFx0ZGF0ZTogZGF0YS5ub3ZlbF9kYXRlLFxuXHRcdFx0XHRcdHByZWZhY2U6IGRhdGEubm92ZWxfZGVzYyxcblx0XHRcdFx0XHRzdGF0dXM6IGRhdGEubm92ZWxfc3RhdHVzLFxuXHRcdFx0XHRcdHB1Ymxpc2hlcjogZGF0YS5ub3ZlbF9wdWJsaXNoZXIsXG5cdFx0XHRcdFx0Y292ZXI6IGRhdGEubm92ZWxfY292ZXIsXG5cdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdHNvdXJjZTogZGF0YS51cmwgJiYgZGF0YS51cmwuaHJlZiA/IGRhdGEudXJsLmhyZWYgOiBkYXRhLnVybCxcblxuXHRcdFx0XHRcdHRhZ3M6IGRhdGEudGFncyxcblxuXHRcdFx0XHRcdHNlcmllczoge1xuXHRcdFx0XHRcdFx0bmFtZTogZGF0YS5ub3ZlbF9zZXJpZXNfdGl0bGUgfHwgJycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdG5vdmVsOiB7XG5cdFx0XHRcdFx0c291cmNlOiBkYXRhLnVybCAmJiAodHlwZW9mIGRhdGEudXJsID09ICdzdHJpbmcnID9cblx0XHRcdFx0XHRcdGRhdGEudXJsXG5cdFx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0XHQ6IGRhdGEudXJsLmhyZWZcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0bm92ZWw6IHtcblx0XHRcdFx0XHRzb3VyY2U6IGRhdGEudXJsX2RhdGEgJiYgKHR5cGVvZiBkYXRhLnVybF9kYXRhLnVybCA9PSAnc3RyaW5nJyA/IGRhdGEudXJsX2RhdGEudXJsIDogZGF0YS51cmxfZGF0YS51cmwuaHJlZiksXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdF07XG5cblx0XHQvL2NvbnNvbGUubG9nKGRhdGEpO1xuXG5cdFx0aWYgKGRhdGEuZGF0YSlcblx0XHR7XG5cdFx0XHRscy5wdXNoKHtcblx0XHRcdFx0bm92ZWw6IHtcblx0XHRcdFx0XHR0aXRsZTogZGF0YS5kYXRhLmdfbG5vdmVsX25hbWUsXG5cdFx0XHRcdFx0YXV0aG9yOiBkYXRhLmRhdGEuYXV0aG9yLFxuXHRcdFx0XHRcdGNvdmVyOiBkYXRhLmRhdGEuY292ZXJfcGljLFxuXG5cdFx0XHRcdFx0dGFnczogZGF0YS5kYXRhLnR5cGUsXG5cblx0XHRcdFx0XHRwcmVmYWNlOiBkYXRhLmRhdGEuZGVzYyxcblxuXHRcdFx0XHRcdGRhdGU6IGRhdGEuZGF0YS5sYXN0dXBkYXRlLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0ID0gZGVlcG1lcmdlLmFsbChbXG5cdFx0XHQuLi5scyxcblx0XHRcdHtcblx0XHRcdFx0bm92ZWw6IHtcblx0XHRcdFx0XHR0aXRsZTogJycsXG5cdFx0XHRcdFx0YXV0aG9yOiAnJyxcblx0XHRcdFx0XHRkYXRlOiAnJyxcblx0XHRcdFx0XHRwcmVmYWNlOiAnJyxcblx0XHRcdFx0XHRzdGF0dXM6ICcnLFxuXHRcdFx0XHRcdHB1Ymxpc2hlcjogJycsXG5cdFx0XHRcdFx0Y292ZXI6ICcnLFxuXHRcdFx0XHRcdHNvdXJjZTogJycsXG5cblx0XHRcdFx0XHQvL3RhZ3M6IFtdLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHQvL2NvbnRyaWJ1dGU6IFtdLFxuXHRcdFx0XHQvL29wdGlvbnM6IHt9LFxuXHRcdFx0fSxcblx0XHRdLCBPYmplY3QuYXNzaWduKHtcblx0XHRcdGtleVZhbHVlT3JNb2RlOiB0cnVlLFxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdH0sIGRlZXBtZXJnZU9wdGlvbnMpIGFzIGRlZXBtZXJnZS5PcHRpb25zKTtcblxuXHRcdE1kY29uZi5jaGtJbmZvKHJldCk7XG5cblx0XHRpZiAocmV0Lm5vdmVsLnNvdXJjZSlcblx0XHR7XG5cdFx0XHRbXG5cdFx0XHRcdC8od2Vua3U4KS8sXG5cdFx0XHRcdC8oZG16aikvLFxuXHRcdFx0XHQvKGRtemopLyxcblx0XHRcdFx0Lyhub3ZlbDE4KT9cXC4oc3lvc2V0dSkvLFxuXHRcdFx0XHQvKGFscGhhcG9saXMpLyxcblx0XHRcdF0uZm9yRWFjaChmdW5jdGlvbiAocilcblx0XHRcdHtcblx0XHRcdFx0bGV0IG07XG5cdFx0XHRcdGlmIChtID0gci5leGVjKHJldC5ub3ZlbC5zb3VyY2UpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0Lm5vdmVsLnRhZ3MgPSByZXQubm92ZWwudGFncy5jb25jYXQobS5zbGljZSgxKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldCA9IE1kY29uZi5zb3J0S2V5cyhyZXQpO1xuXHRcdHJldC5ub3ZlbC50YWdzLnVuc2hpZnQoJ25vZGUtbm92ZWwnKTtcblx0XHRyZXQubm92ZWwudGFncyA9IGFycmF5X3VuaXF1ZShyZXQubm92ZWwudGFncyk7XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cbn1cblxuZXhwb3J0IHsgSnNvbk1kIH07XG5leHBvcnQgZGVmYXVsdCBKc29uTWQ7XG4iXX0=