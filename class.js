"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by user on 2019/1/21/021.
 */
const index_1 = require("./index");
const bind_decorator_1 = require("bind-decorator");
const lib_1 = require("./lib");
const cloneDeep = require("lodash/cloneDeep");
const defaultOptions = Object.freeze({});
class NodeNovelInfo {
    constructor(mdconf, options = defaultOptions, ...argv) {
        options = NodeNovelInfo.fixOptions(options);
        let ret = cloneDeep(mdconf);
        if (options.chk || options.chk == null) {
            ret = index_1.chkInfo(ret, options);
        }
        if (options.throw || options.throw == null) {
            ret = index_1.chkInfo(ret, options);
            if (!ret) {
                throw new Error('not a valid NovelInfo data');
            }
        }
        this.raw = ret;
    }
    static fixOptions(options) {
        return Object.assign({}, defaultOptions, options || {});
    }
    static create(mdconf, options = defaultOptions, ...argv) {
        return new this(mdconf, options, ...argv);
    }
    static createFromString(input, options, ...argv) {
        if (typeof input != 'string') {
            input = input.toString();
        }
        options = this.fixOptions(options);
        let json = index_1.parse(input, options);
        return this.create(json, options, ...argv);
    }
    titles() {
        return index_1.getNovelTitleFromMeta(this.raw);
    }
    authors() {
        return arr_filter([
            this.raw.novel && this.raw.novel.author,
        ].concat(this.raw.novel.authors || []));
    }
    illusts() {
        return arr_filter([
            this.raw.novel && this.raw.novel.illust,
        ].concat(this.raw.novel.illusts || []));
    }
    tags() {
        return arr_filter(this.raw.novel && this.raw.novel.tags || []);
    }
    contributes() {
        return arr_filter(this.raw.contribute || []);
    }
    sites() {
        return arr_filter(Object.entries(this.raw.options || {})
            .reduce(function (ls, [site, data]) {
            if (data && ('novel_id' in data)) {
                ls.push({
                    site,
                    data,
                });
            }
            return ls;
        }, []));
    }
    status() {
        if (this.raw.novel && this.raw.novel.novel_status) {
            return this.raw.novel.novel_status;
        }
    }
    toJSON(clone) {
        if (clone) {
            return cloneDeep(this.raw);
        }
        // @ts-ignore
        return this.raw;
    }
    stringify() {
        return index_1.stringify(this.raw);
    }
}
NodeNovelInfo.parse = index_1.parse;
NodeNovelInfo.stringify = index_1.stringify;
__decorate([
    bind_decorator_1.default
], NodeNovelInfo, "fixOptions", null);
__decorate([
    bind_decorator_1.default
], NodeNovelInfo, "create", null);
__decorate([
    bind_decorator_1.default
], NodeNovelInfo, "createFromString", null);
exports.NodeNovelInfo = NodeNovelInfo;
exports.default = NodeNovelInfo;
function arr_filter(arr) {
    return lib_1.array_unique(arr).filter(v => {
        return v != null
            // @ts-ignore
            && v != 'null'
            // @ts-ignore
            && v != 'undefined';
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsbUNBUWlCO0FBQ2pCLG1EQUFrQztBQUNsQywrQkFBa0U7QUFHbEUsOENBQStDO0FBTy9DLE1BQU0sY0FBYyxHQUFvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBRXJFLENBQUMsQ0FBQztBQUVILE1BQWEsYUFBYTtJQUl6QixZQUFZLE1BQVMsRUFBRSxVQUFpQyxjQUFjLEVBQUUsR0FBRyxJQUFJO1FBRTlFLE9BQU8sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLElBQUksR0FBRyxHQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQixJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQ3RDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7U0FDakM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQzFDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7WUFFakMsSUFBSSxDQUFDLEdBQUcsRUFDUjtnQkFDQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDOUM7U0FDRDtRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLENBQUM7SUFHRCxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQStCO1FBRWhELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBR0QsTUFBTSxDQUFDLE1BQU0sQ0FBd0IsTUFBUyxFQUFFLFVBQWlDLGNBQWMs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QUFHLGFBQUssQ0FBQztBQUNkLHVCQUFTLEdBQUcsaUJBQVMsQ0FBQztBQXRHN0I7SUFEQyx3QkFBSTtxQ0FJSjtBQUdEO0lBREMsd0JBQUk7aUNBSUo7QUFHRDtJQURDLHdCQUFJOzJDQWFKO0FBckRGLHNDQW9JQztBQUVELGtCQUFlLGFBQWEsQ0FBQTtBQUU1QixTQUFTLFVBQVUsQ0FBSSxHQUFRO0lBRTlCLE9BQU8sa0JBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDbkMsT0FBTyxDQUFDLElBQUksSUFBSTtZQUNmLGFBQWE7ZUFDVixDQUFDLElBQUksTUFBTTtZQUNkLGFBQWE7ZUFDVixDQUFDLElBQUksV0FBVyxDQUFBO0lBQ3JCLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvMS8yMS8wMjEuXG4gKi9cbmltcG9ydCB7XG5cdGNoa0luZm8sXG5cdGdldE5vdmVsVGl0bGVGcm9tTWV0YSxcblx0SU1kY29uZk1ldGEsXG5cdElNZGNvbmZNZXRhT3B0aW9uc05vdmVsU2l0ZSxcblx0SU9wdGlvbnNQYXJzZSxcblx0cGFyc2UsXG5cdHN0cmluZ2lmeSxcbn0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgYmluZCBmcm9tICdiaW5kLWRlY29yYXRvcic7XG5pbXBvcnQgeyBhcnJheV91bmlxdWUsIGRlZXBtZXJnZSwgZGVlcG1lcmdlT3B0aW9ucyB9IGZyb20gJy4vbGliJztcbmltcG9ydCB7IEVudW1Ob3ZlbFN0YXR1cyB9IGZyb20gJy4vbGliL2NvbnN0JztcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbmltcG9ydCBjbG9uZURlZXAgPSByZXF1aXJlKCdsb2Rhc2gvY2xvbmVEZWVwJyk7XG5pbXBvcnQgeyB0b0hleCB9IGZyb20gJ2hleC1saWInO1xuXG5leHBvcnQgdHlwZSBJTm9kZU5vdmVsSW5mb09wdGlvbnMgPSBJT3B0aW9uc1BhcnNlICYge1xuXG59O1xuXG5jb25zdCBkZWZhdWx0T3B0aW9uczogUmVhZG9ubHk8SU5vZGVOb3ZlbEluZm9PcHRpb25zPiA9IE9iamVjdC5mcmVlemUoe1xuXG59KTtcblxuZXhwb3J0IGNsYXNzIE5vZGVOb3ZlbEluZm88VCBleHRlbmRzIElNZGNvbmZNZXRhPlxue1xuXHRyYXc6IFQ7XG5cblx0Y29uc3RydWN0b3IobWRjb25mOiBULCBvcHRpb25zOiBJTm9kZU5vdmVsSW5mb09wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucywgLi4uYXJndilcblx0e1xuXHRcdG9wdGlvbnMgPSBOb2RlTm92ZWxJbmZvLmZpeE9wdGlvbnMob3B0aW9ucyk7XG5cblx0XHRsZXQgcmV0OiBUID0gY2xvbmVEZWVwKG1kY29uZik7XG5cblx0XHRpZiAob3B0aW9ucy5jaGsgfHwgb3B0aW9ucy5jaGsgPT0gbnVsbClcblx0XHR7XG5cdFx0XHRyZXQgPSBjaGtJbmZvKHJldCwgb3B0aW9ucykgYXMgVDtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy50aHJvdyB8fCBvcHRpb25zLnRocm93ID09IG51bGwpXG5cdFx0e1xuXHRcdFx0cmV0ID0gY2hrSW5mbyhyZXQsIG9wdGlvbnMpIGFzIFQ7XG5cblx0XHRcdGlmICghcmV0KVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ25vdCBhIHZhbGlkIE5vdmVsSW5mbyBkYXRhJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5yYXcgPSByZXQ7XG5cdH1cblxuXHRAYmluZFxuXHRzdGF0aWMgZml4T3B0aW9ucyhvcHRpb25zPzogSU5vZGVOb3ZlbEluZm9PcHRpb25zKVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zIHx8IHt9KVxuXHR9XG5cblx0QGJpbmRcblx0c3RhdGljIGNyZWF0ZTxUIGV4dGVuZHMgSU1kY29uZk1ldGE+KG1kY29uZjogVCwgb3B0aW9uczogSU5vZGVOb3ZlbEluZm9PcHRpb25zID0gZGVmYXVsdE9wdGlvbnMsIC4uLmFyZ3YpXG5cdHtcblx0XHRyZXR1cm4gbmV3IHRoaXMobWRjb25mLCBvcHRpb25zLCAuLi5hcmd2KVxuXHR9XG5cblx0QGJpbmRcblx0c3RhdGljIGNyZWF0ZUZyb21TdHJpbmcoaW5wdXQ6IHN0cmluZyB8IEJ1ZmZlciwgb3B0aW9uczogSU5vZGVOb3ZlbEluZm9PcHRpb25zLCAuLi5hcmd2KVxuXHR7XG5cdFx0aWYgKHR5cGVvZiBpbnB1dCAhPSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnRvU3RyaW5nKCk7XG5cdFx0fVxuXG5cdFx0b3B0aW9ucyA9IHRoaXMuZml4T3B0aW9ucyhvcHRpb25zKTtcblxuXHRcdGxldCBqc29uID0gcGFyc2UoaW5wdXQsIG9wdGlvbnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuY3JlYXRlKGpzb24sIG9wdGlvbnMsIC4uLmFyZ3YpO1xuXHR9XG5cblx0dGl0bGVzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gZ2V0Tm92ZWxUaXRsZUZyb21NZXRhKHRoaXMucmF3KVxuXHR9XG5cblx0YXV0aG9ycygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoW1xuXHRcdFx0dGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwuYXV0aG9yLFxuXHRcdF0uY29uY2F0KHRoaXMucmF3Lm5vdmVsLmF1dGhvcnMgfHwgW10pKVxuXHR9XG5cblx0aWxsdXN0cygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoW1xuXHRcdFx0dGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwuaWxsdXN0LFxuXHRcdF0uY29uY2F0KHRoaXMucmF3Lm5vdmVsLmlsbHVzdHMgfHwgW10pKVxuXHR9XG5cblx0dGFncygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIodGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwudGFncyB8fCBbXSlcblx0fVxuXG5cdGNvbnRyaWJ1dGVzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcih0aGlzLnJhdy5jb250cmlidXRlIHx8IFtdKVxuXHR9XG5cblx0c2l0ZXMoKVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIoT2JqZWN0LmVudHJpZXModGhpcy5yYXcub3B0aW9ucyB8fCB7fSlcblx0XHRcdC5yZWR1Y2UoZnVuY3Rpb24gKGxzLCBbc2l0ZSwgZGF0YV0pXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChkYXRhICYmICgnbm92ZWxfaWQnIGluIGRhdGEpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bHMucHVzaCh7XG5cdFx0XHRcdFx0XHRzaXRlLFxuXHRcdFx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGxzO1xuXHRcdFx0fSwgW10gYXMge1xuXHRcdFx0XHRzaXRlOiBzdHJpbmcsXG5cdFx0XHRcdGRhdGE6IElNZGNvbmZNZXRhT3B0aW9uc05vdmVsU2l0ZSxcblx0XHRcdH1bXSkpO1xuXHR9XG5cblx0c3RhdHVzKCk6IEVudW1Ob3ZlbFN0YXR1cyB8IG51bWJlclxuXHR7XG5cdFx0aWYgKHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLm5vdmVsX3N0YXR1cylcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy5yYXcubm92ZWwubm92ZWxfc3RhdHVzXG5cdFx0fVxuXHR9XG5cblx0dG9KU09OPFI+KGNsb25lPzogYm9vbGVhbik6IFJcblx0dG9KU09OKGNsb25lPzogYm9vbGVhbik6IFRcblx0dG9KU09OKGNsb25lPzogYm9vbGVhbik6IFRcblx0e1xuXHRcdGlmIChjbG9uZSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gY2xvbmVEZWVwKHRoaXMucmF3KTtcblx0XHR9XG5cblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0cmV0dXJuIHRoaXMucmF3O1xuXHR9XG5cblx0c3RyaW5naWZ5KClcblx0e1xuXHRcdHJldHVybiBzdHJpbmdpZnkodGhpcy5yYXcpXG5cdH1cblxuXHRzdGF0aWMgcGFyc2UgPSBwYXJzZTtcblx0c3RhdGljIHN0cmluZ2lmeSA9IHN0cmluZ2lmeTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTm9kZU5vdmVsSW5mb1xuXG5mdW5jdGlvbiBhcnJfZmlsdGVyPFQ+KGFycjogVFtdKVxue1xuXHRyZXR1cm4gYXJyYXlfdW5pcXVlKGFycikuZmlsdGVyKHYgPT4ge1xuXHRcdHJldHVybiB2ICE9IG51bGxcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdCYmIHYgIT0gJ251bGwnXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHQmJiB2ICE9ICd1bmRlZmluZWQnXG5cdH0pO1xufVxuIl19