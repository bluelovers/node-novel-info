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
    publishers() {
        return arr_filter([
            this.raw.novel && this.raw.novel.publisher,
        ].concat(this.raw.novel.publishers || []));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsbUNBUWlCO0FBQ2pCLG1EQUFrQztBQUNsQywrQkFBa0U7QUFHbEUsOENBQStDO0FBTy9DLE1BQU0sY0FBYyxHQUFvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBRXJFLENBQUMsQ0FBQztBQUVILE1BQWEsYUFBYTtJQUl6QixZQUFZLE1BQVMsRUFBRSxVQUFpQyxjQUFjLEVBQUUsR0FBRyxJQUFJO1FBRTlFLE9BQU8sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLElBQUksR0FBRyxHQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQixJQUFJLE9BQU8sQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQ3RDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7U0FDakM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQzFDO1lBQ0MsR0FBRyxHQUFHLGVBQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFNLENBQUM7WUFFakMsSUFBSSxDQUFDLEdBQUcsRUFDUjtnQkFDQyxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDOUM7U0FDRDtRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLENBQUM7SUFHRCxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQStCO1FBRWhELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBR0QsTUFBTSxDQUFDLE1BQU0sQ0FBd0IsTUFBUyxFQUFFLFVBQWlDLGNBQWMs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LEtBQUssRUFDVDtZQUNDLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQjtRQUVELGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDakIsQ0FBQztJQUVELFNBQVM7UUFFUixPQUFPLGlCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzNCLENBQUM7O0FBRU0sbUJBQUssR0FBRyxhQUFLLENBQUM7QUFDZCx1QkFBUyxHQUFHLGlCQUFTLENBQUM7QUE3RzdCO0lBREMsd0JBQUk7cUNBSUo7QUFHRDtJQURDLHdCQUFJO2lDQUlKO0FBR0Q7SUFEQyx3QkFBSTsyQ0FhSjtBQXJERixzQ0EySUM7QUFFRCxrQkFBZSxhQUFhLENBQUE7QUFFNUIsU0FBUyxVQUFVLENBQUksR0FBUTtJQUU5QixPQUFPLGtCQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ25DLE9BQU8sQ0FBQyxJQUFJLElBQUk7WUFDZixhQUFhO2VBQ1YsQ0FBQyxJQUFJLE1BQU07WUFDZCxhQUFhO2VBQ1YsQ0FBQyxJQUFJLFdBQVcsQ0FBQTtJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE5LzEvMjEvMDIxLlxuICovXG5pbXBvcnQge1xuXHRjaGtJbmZvLFxuXHRnZXROb3ZlbFRpdGxlRnJvbU1ldGEsXG5cdElNZGNvbmZNZXRhLFxuXHRJTWRjb25mTWV0YU9wdGlvbnNOb3ZlbFNpdGUsXG5cdElPcHRpb25zUGFyc2UsXG5cdHBhcnNlLFxuXHRzdHJpbmdpZnksXG59IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IGJpbmQgZnJvbSAnYmluZC1kZWNvcmF0b3InO1xuaW1wb3J0IHsgYXJyYXlfdW5pcXVlLCBkZWVwbWVyZ2UsIGRlZXBtZXJnZU9wdGlvbnMgfSBmcm9tICcuL2xpYic7XG5pbXBvcnQgeyBFbnVtTm92ZWxTdGF0dXMgfSBmcm9tICcuL2xpYi9jb25zdCc7XG5pbXBvcnQgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5pbXBvcnQgY2xvbmVEZWVwID0gcmVxdWlyZSgnbG9kYXNoL2Nsb25lRGVlcCcpO1xuaW1wb3J0IHsgdG9IZXggfSBmcm9tICdoZXgtbGliJztcblxuZXhwb3J0IHR5cGUgSU5vZGVOb3ZlbEluZm9PcHRpb25zID0gSU9wdGlvbnNQYXJzZSAmIHtcblxufTtcblxuY29uc3QgZGVmYXVsdE9wdGlvbnM6IFJlYWRvbmx5PElOb2RlTm92ZWxJbmZvT3B0aW9ucz4gPSBPYmplY3QuZnJlZXplKHtcblxufSk7XG5cbmV4cG9ydCBjbGFzcyBOb2RlTm92ZWxJbmZvPFQgZXh0ZW5kcyBJTWRjb25mTWV0YT5cbntcblx0cmF3OiBUO1xuXG5cdGNvbnN0cnVjdG9yKG1kY29uZjogVCwgb3B0aW9uczogSU5vZGVOb3ZlbEluZm9PcHRpb25zID0gZGVmYXVsdE9wdGlvbnMsIC4uLmFyZ3YpXG5cdHtcblx0XHRvcHRpb25zID0gTm9kZU5vdmVsSW5mby5maXhPcHRpb25zKG9wdGlvbnMpO1xuXG5cdFx0bGV0IHJldDogVCA9IGNsb25lRGVlcChtZGNvbmYpO1xuXG5cdFx0aWYgKG9wdGlvbnMuY2hrIHx8IG9wdGlvbnMuY2hrID09IG51bGwpXG5cdFx0e1xuXHRcdFx0cmV0ID0gY2hrSW5mbyhyZXQsIG9wdGlvbnMpIGFzIFQ7XG5cdFx0fVxuXG5cdFx0aWYgKG9wdGlvbnMudGhyb3cgfHwgb3B0aW9ucy50aHJvdyA9PSBudWxsKVxuXHRcdHtcblx0XHRcdHJldCA9IGNoa0luZm8ocmV0LCBvcHRpb25zKSBhcyBUO1xuXG5cdFx0XHRpZiAoIXJldClcblx0XHRcdHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3QgYSB2YWxpZCBOb3ZlbEluZm8gZGF0YScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMucmF3ID0gcmV0O1xuXHR9XG5cblx0QGJpbmRcblx0c3RhdGljIGZpeE9wdGlvbnMob3B0aW9ucz86IElOb2RlTm92ZWxJbmZvT3B0aW9ucylcblx0e1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyB8fCB7fSlcblx0fVxuXG5cdEBiaW5kXG5cdHN0YXRpYyBjcmVhdGU8VCBleHRlbmRzIElNZGNvbmZNZXRhPihtZGNvbmY6IFQsIG9wdGlvbnM6IElOb2RlTm92ZWxJbmZvT3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zLCAuLi5hcmd2KVxuXHR7XG5cdFx0cmV0dXJuIG5ldyB0aGlzKG1kY29uZiwgb3B0aW9ucywgLi4uYXJndilcblx0fVxuXG5cdEBiaW5kXG5cdHN0YXRpYyBjcmVhdGVGcm9tU3RyaW5nKGlucHV0OiBzdHJpbmcgfCBCdWZmZXIsIG9wdGlvbnM6IElOb2RlTm92ZWxJbmZvT3B0aW9ucywgLi4uYXJndilcblx0e1xuXHRcdGlmICh0eXBlb2YgaW5wdXQgIT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0aW5wdXQgPSBpbnB1dC50b1N0cmluZygpO1xuXHRcdH1cblxuXHRcdG9wdGlvbnMgPSB0aGlzLmZpeE9wdGlvbnMob3B0aW9ucyk7XG5cblx0XHRsZXQganNvbiA9IHBhcnNlKGlucHV0LCBvcHRpb25zKTtcblxuXHRcdHJldHVybiB0aGlzLmNyZWF0ZShqc29uLCBvcHRpb25zLCAuLi5hcmd2KTtcblx0fVxuXG5cdHRpdGxlcygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGdldE5vdmVsVGl0bGVGcm9tTWV0YSh0aGlzLnJhdylcblx0fVxuXG5cdGF1dGhvcnMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKFtcblx0XHRcdHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLmF1dGhvcixcblx0XHRdLmNvbmNhdCh0aGlzLnJhdy5ub3ZlbC5hdXRob3JzIHx8IFtdKSlcblx0fVxuXG5cdGlsbHVzdHMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKFtcblx0XHRcdHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLmlsbHVzdCxcblx0XHRdLmNvbmNhdCh0aGlzLnJhdy5ub3ZlbC5pbGx1c3RzIHx8IFtdKSlcblx0fVxuXG5cdHRhZ3MoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLnRhZ3MgfHwgW10pXG5cdH1cblxuXHRjb250cmlidXRlcygpOiBzdHJpbmdbXVxuXHR7XG5cdFx0cmV0dXJuIGFycl9maWx0ZXIodGhpcy5yYXcuY29udHJpYnV0ZSB8fCBbXSlcblx0fVxuXG5cdHB1Ymxpc2hlcnMoKTogc3RyaW5nW11cblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKFtcblx0XHRcdHRoaXMucmF3Lm5vdmVsICYmIHRoaXMucmF3Lm5vdmVsLnB1Ymxpc2hlcixcblx0XHRdLmNvbmNhdCh0aGlzLnJhdy5ub3ZlbC5wdWJsaXNoZXJzIHx8IFtdKSlcblx0fVxuXG5cdHNpdGVzKClcblx0e1xuXHRcdHJldHVybiBhcnJfZmlsdGVyKE9iamVjdC5lbnRyaWVzKHRoaXMucmF3Lm9wdGlvbnMgfHwge30pXG5cdFx0XHQucmVkdWNlKGZ1bmN0aW9uIChscywgW3NpdGUsIGRhdGFdKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoZGF0YSAmJiAoJ25vdmVsX2lkJyBpbiBkYXRhKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxzLnB1c2goe1xuXHRcdFx0XHRcdFx0c2l0ZSxcblx0XHRcdFx0XHRcdGRhdGEsXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBscztcblx0XHRcdH0sIFtdIGFzIHtcblx0XHRcdFx0c2l0ZTogc3RyaW5nLFxuXHRcdFx0XHRkYXRhOiBJTWRjb25mTWV0YU9wdGlvbnNOb3ZlbFNpdGUsXG5cdFx0XHR9W10pKTtcblx0fVxuXG5cdHN0YXR1cygpOiBFbnVtTm92ZWxTdGF0dXMgfCBudW1iZXJcblx0e1xuXHRcdGlmICh0aGlzLnJhdy5ub3ZlbCAmJiB0aGlzLnJhdy5ub3ZlbC5ub3ZlbF9zdGF0dXMpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMucmF3Lm5vdmVsLm5vdmVsX3N0YXR1c1xuXHRcdH1cblx0fVxuXG5cdHRvSlNPTjxSPihjbG9uZT86IGJvb2xlYW4pOiBSXG5cdHRvSlNPTihjbG9uZT86IGJvb2xlYW4pOiBUXG5cdHRvSlNPTihjbG9uZT86IGJvb2xlYW4pOiBUXG5cdHtcblx0XHRpZiAoY2xvbmUpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGNsb25lRGVlcCh0aGlzLnJhdyk7XG5cdFx0fVxuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiB0aGlzLnJhdztcblx0fVxuXG5cdHN0cmluZ2lmeSgpXG5cdHtcblx0XHRyZXR1cm4gc3RyaW5naWZ5KHRoaXMucmF3KVxuXHR9XG5cblx0c3RhdGljIHBhcnNlID0gcGFyc2U7XG5cdHN0YXRpYyBzdHJpbmdpZnkgPSBzdHJpbmdpZnk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vZGVOb3ZlbEluZm9cblxuZnVuY3Rpb24gYXJyX2ZpbHRlcjxUPihhcnI6IFRbXSlcbntcblx0cmV0dXJuIGFycmF5X3VuaXF1ZShhcnIpLmZpbHRlcih2ID0+IHtcblx0XHRyZXR1cm4gdiAhPSBudWxsXG5cdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHQmJiB2ICE9ICdudWxsJ1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0JiYgdiAhPSAndW5kZWZpbmVkJ1xuXHR9KTtcbn1cbiJdfQ==