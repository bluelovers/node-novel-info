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
    toJSON() {
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
    return lib_1.array_unique(arr).filter(v => v != null);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsbUNBUWlCO0FBQ2pCLG1EQUFrQztBQUNsQywrQkFBa0U7QUFHbEUsOENBQStDO0FBTy9DLE1BQU0sY0FBYyxHQUFvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBRXJFLENBQUMsQ0FBQztBQUVILE1BQWEsYUFBYTtJQUl6QixZQUFZLE1BQVMsRUFBRSxVQUFpQyxjQUFjLEVBQUUsR0FBRyxJQUFJO1FBRTlFLE9BQU8sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLElBQUksR0FBRyxHQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQixJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQ3RDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7U0FDakM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQzFDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7WUFFakMsSUFBSSxDQUFDLEdBQUcsRUFDUjtnQkFDQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDOUM7U0FDRDtRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLENBQUM7SUFHRCxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQStCO1FBRWhELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBR0QsTUFBTSxDQUFDLE1BQU0sQ0FBd0IsTUFBUyxFQUFFLFVBQWlDLGNBQWMs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Q0FJSjtBQUdEO0lBREMsd0JBQUk7MkNBYUo7QUFyREYsc0NBNkhDO0FBRUQsa0JBQWUsYUFBYSxDQUFBO0FBRTVCLFNBQVMsVUFBVSxDQUFJLEdBQVE7SUFFOUIsT0FBTyxrQkFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztBQUNqRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS8xLzIxLzAyMS5cbiAqL1xuaW1wb3J0IHtcblx0Y2hrSW5mbyxcblx0Z2V0Tm92ZWxUaXRsZUZyb21NZXRhLFxuXHRJTWRjb25mTWV0YSxcblx0SU1kY29uZk1ldGFPcHRpb25zTm92ZWxTaXRlLFxuXHRJT3B0aW9uc1BhcnNlLFxuXHRwYXJzZSxcblx0c3RyaW5naWZ5LFxufSBmcm9tICcuL2luZGV4JztcbmltcG9ydCBiaW5kIGZyb20gJ2JpbmQtZGVjb3JhdG9yJztcbmltcG9ydCB7IGFycmF5X3VuaXF1ZSwgZGVlcG1lcmdlLCBkZWVwbWVyZ2VPcHRpb25zIH0gZnJvbSAnLi9saWInO1xuaW1wb3J0IHsgRW51bU5vdmVsU3RhdHVzIH0gZnJvbSAnLi9saWIvY29uc3QnO1xuaW1wb3J0IG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xuaW1wb3J0IGNsb25lRGVlcCA9IHJlcXVpcmUoJ2xvZGFzaC9jbG9uZURlZXAnKTtcbmltcG9ydCB7IHRvSGV4IH0gZnJvbSAnaGV4LWxpYic7XG5cbmV4cG9ydCB0eXBlIElOb2RlTm92ZWxJbmZvT3B0aW9ucyA9IElPcHRpb25zUGFyc2UgJiB7XG5cbn07XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBSZWFkb25seTxJTm9kZU5vdmVsSW5mb09wdGlvbnM+ID0gT2JqZWN0LmZyZWV6ZSh7XG5cbn0pO1xuXG5leHBvcnQgY2xhc3MgTm9kZU5vdmVsSW5mbzxUIGV4dGVuZHMgSU1kY29uZk1ldGE+XG57XG5cdHJhdzogVDtcblxuXHRjb25zdHJ1Y3RvcihtZGNvbmY6IFQsIG9wdGlvbnM6IElOb2RlTm92ZWxJbmZvT3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zLCAuLi5hcmd2KVxuXHR7XG5cdFx0b3B0aW9ucyA9IE5vZGVOb3ZlbEluZm8uZml4T3B0aW9ucyhvcHRpb25zKTtcblxuXHRcdGxldCByZXQ6IFQgPSBjbG9uZURlZXAobWRjb25mKTtcblxuXHRcdGlmIChvcHRpb25zLmNoayB8fCBvcHRpb25zLmNoayA9PSBudWxsKVxuXHRcdHtcblx0XHRcdHJldCA9IGNoa0luZm8ocmV0LCBvcHRpb25zKSBhcyBUO1xuXHRcdH1cblxuXHRcdGlmIChvcHRpb25zLnRocm93IHx8IG9wdGlvbnMudGhyb3cgPT0gbnVsbClcblx0XHR7XG5cdFx0XHRyZXQgPSBjaGtJbmZvKHJldCwgb3B0aW9ucykgYXMgVDtcblxuXHRcdFx0aWYgKCFyZXQpXG5cdFx0XHR7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignbm90IGEgdmFsaWQgTm92ZWxJbmZvIGRhdGEnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnJhdyA9IHJldDtcblx0fVxuXG5cdEBiaW5kXG5cdHN0YXRpYyBmaXhPcHRpb25zKG9wdGlvbnM/OiBJTm9kZU5vdmVsSW5mb09wdGlvbnMpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMgfHwge30pXG5cdH1cblxuXHRAYmluZFxuXHRzdGF0aWMgY3JlYXRlPFQgZXh0ZW5kcyBJTWRjb25mTWV0YT4obWRjb25mOiBULCBvcHRpb25zOiBJTm9kZU5vdmVsSW5mb09wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucywgLi4uYXJndilcblx0e1xuXHRcdHJldHVybiBuZXcgdGhpcyhtZGNvbmYsIG9wdGlvbnMsIC4uLmFyZ3YpXG5cdH1cblxuXHRAYmluZFxuXHRzdGF0aWMgY3JlYXRlRnJvbVN0cmluZyhpbnB1dDogc3RyaW5nIHwgQnVmZmVyLCBvcHRpb25zOiBJTm9kZU5vdmVsSW5mb09wdGlvbnMsIC4uLmFyZ3YpXG5cdHtcblx0XHRpZiAodHlwZW9mIGlucHV0ICE9ICdzdHJpbmcnKVxuXHRcdHtcblx0XHRcdGlucHV0ID0gaW5wdXQudG9TdHJpbmcoKTtcblx0XHR9XG5cblx0XHRvcHRpb25zID0gdGhpcy5maXhPcHRpb25zKG9wdGlvbnMpO1xuXG5cdFx0bGV0IGpzb24gPSBwYXJzZShpbnB1dCwgb3B0aW9ucyk7XG5cblx0XHRyZXR1cm4gdGhpcy5jcmVhdGUoanNvbiwgb3B0aW9ucywgLi4uYXJndik7XG5cdH1cblxuXHR0aXRsZXMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBnZXROb3ZlbFRpdGxlRnJvbU1ldGEodGhpcy5yYXcpXG5cdH1cblxuXHRhdXRob3JzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcihbXG5cdFx0XHR0aGlzLnJhdy5ub3ZlbCAmJiB0aGlzLnJhdy5ub3ZlbC5hdXRob3IsXG5cdFx0XS5jb25jYXQodGhpcy5yYXcubm92ZWwuYXV0aG9ycyB8fCBbXSkpXG5cdH1cblxuXHRpbGx1c3RzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcihbXG5cdFx0XHR0aGlzLnJhdy5ub3ZlbCAmJiB0aGlzLnJhdy5ub3ZlbC5pbGx1c3QsXG5cdFx0XS5jb25jYXQodGhpcy5yYXcubm92ZWwuaWxsdXN0cyB8fCBbXSkpXG5cdH1cblxuXHR0YWdzKCk6IHN0cmluZ1tdXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcih0aGlzLnJhdy5ub3ZlbCAmJiB0aGlzLnJhdy5ub3ZlbC50YWdzIHx8IFtdKVxuXHR9XG5cblx0Y29udHJpYnV0ZXMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKHRoaXMucmF3LmNvbnRyaWJ1dGUgfHwgW10pXG5cdH1cblxuXHRzaXRlcygpXG5cdHtcblx0XHRyZXR1cm4gYXJyX2ZpbHRlcihPYmplY3QuZW50cmllcyh0aGlzLnJhdy5vcHRpb25zIHx8IHt9KVxuXHRcdFx0LnJlZHVjZShmdW5jdGlvbiAobHMsIFtzaXRlLCBkYXRhXSlcblx0XHRcdHtcblx0XHRcdFx0aWYgKGRhdGEgJiYgKCdub3ZlbF9pZCcgaW4gZGF0YSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRscy5wdXNoKHtcblx0XHRcdFx0XHRcdHNpdGUsXG5cdFx0XHRcdFx0XHRkYXRhLFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbHM7XG5cdFx0XHR9LCBbXSBhcyB7XG5cdFx0XHRcdHNpdGU6IHN0cmluZyxcblx0XHRcdFx0ZGF0YTogSU1kY29uZk1ldGFPcHRpb25zTm92ZWxTaXRlLFxuXHRcdFx0fVtdKSk7XG5cdH1cblxuXHRzdGF0dXMoKTogRW51bU5vdmVsU3RhdHVzIHwgbnVtYmVyXG5cdHtcblx0XHRpZiAodGhpcy5yYXcubm92ZWwgJiYgdGhpcy5yYXcubm92ZWwubm92ZWxfc3RhdHVzKVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLnJhdy5ub3ZlbC5ub3ZlbF9zdGF0dXNcblx0XHR9XG5cdH1cblxuXHR0b0pTT04oKTogVFxuXHR7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiB0aGlzLnJhdztcblx0fVxuXG5cdHN0cmluZ2lmeSgpXG5cdHtcblx0XHRyZXR1cm4gc3RyaW5naWZ5KHRoaXMucmF3KVxuXHR9XG5cblx0c3RhdGljIHBhcnNlID0gcGFyc2U7XG5cdHN0YXRpYyBzdHJpbmdpZnkgPSBzdHJpbmdpZnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vZGVOb3ZlbEluZm9cblxuZnVuY3Rpb24gYXJyX2ZpbHRlcjxUPihhcnI6IFRbXSlcbntcblx0cmV0dXJuIGFycmF5X3VuaXF1ZShhcnIpLmZpbHRlcih2ID0+IHYgIT0gbnVsbCk7XG59XG4iXX0=