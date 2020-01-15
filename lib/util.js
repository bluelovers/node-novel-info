"use strict";
/**
 * Created by user on 2020/1/16.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const array_hyper_unique_1 = require("array-hyper-unique");
const env_bool_1 = require("env-bool");
const sort_object_keys2_1 = __importDefault(require("sort-object-keys2"));
const is_plain_object_1 = __importDefault(require("is-plain-object"));
function getNovelTitleFromMeta(meta) {
    if (meta && meta.novel) {
        let arr = [
            'title',
            'title_source',
            'title_jp',
            'title_ja',
            'title_zh',
            'title_tw',
            'title_cn',
        ].concat(index_1.filterByPrefixReturnKeys('title_', meta.novel))
            .reduce(function (a, key) {
            if (key in meta.novel) {
                a.push(meta.novel[key]);
            }
            return a;
        }, []);
        if (meta.novel.series) {
            arr.push(meta.novel.series.name);
            arr.push(meta.novel.series.name_short);
        }
        arr = array_hyper_unique_1.array_unique(arr.filter(v => v && ![
            'undefined',
            '長編 【連載】',
            '連載中',
        ].includes(v)));
        return arr;
    }
    return [];
}
exports.getNovelTitleFromMeta = getNovelTitleFromMeta;
function sortKeys(ret) {
    // @ts-ignore
    ret = sort_object_keys2_1.default(ret, [
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
    function sortSubKey(key, sortList, unique) {
        let obj = ret;
        let parent = obj;
        //console.log(obj, sortList);
        if (Array.isArray(key)) {
            //console.log(key);
            let _k;
            for (let value of key) {
                if (!(value in obj)) {
                    //console.log(value, parent);
                    return;
                }
                _k = value;
                parent = obj;
                obj = parent[value];
            }
            key = _k;
        }
        else if ((key in parent)) {
            obj = parent[key];
        }
        else {
            return;
        }
        if (Array.isArray(obj)) {
            obj.sort();
            parent[key] = obj;
            if (unique) {
                parent[key] = parent[key].filter(function (v) {
                    return v;
                });
                parent[key] = array_hyper_unique_1.array_unique(parent[key]);
                if (parent[key].length == 1 && (parent[key][0] === null || typeof parent[key][0] == 'undefined')) {
                    parent[key] = [];
                }
            }
            return;
        }
        if (is_plain_object_1.default(obj)) {
            parent[key] = sort_object_keys2_1.default(obj, sortList);
        }
    }
    // @ts-ignore
    return ret;
}
exports.sortKeys = sortKeys;
function chkInfo(ret, options = {}) {
    if (!ret
        || ((!options || !options.lowCheckLevel)
            && (!ret.novel || !ret.novel.title))) {
        if (options && options.throw) {
            throw new TypeError(`novel${(ret.novel ? '.title' : '')} not exists.`);
        }
        return null;
    }
    if (ret.novel) {
        [
            'authors',
            'illusts',
            'tags',
            'sources',
            'publishers',
        ].forEach(k => {
            if (k in ret.novel) {
                ret.novel[k] = index_1.anyToArray(ret.novel[k], true);
            }
        });
        if ('novel_status' in ret.novel) {
            ret.novel.novel_status = env_bool_1.envVal(ret.novel.novel_status);
            if (typeof ret.novel.novel_status === 'string' && /^0x[\da-f]+$/.test(ret.novel.novel_status)) {
                ret.novel.novel_status = Number(ret.novel.novel_status);
            }
        }
    }
    if ('contribute' in ret) {
        ret.contribute = index_1.anyToArray(ret.contribute, true);
    }
    if (!options.lowCheckLevel) {
        ret.options = ret.options || {};
    }
    if (ret.options) {
        if (typeof ret.options.textlayout === 'object') {
            Object.entries(ret.options.textlayout)
                .forEach(([k, v]) => ret.options.textlayout[k] = env_bool_1.envVal(v));
        }
        if (typeof ret.options.downloadOptions === 'object') {
            Object.entries(ret.options.downloadOptions)
                .forEach(([k, v]) => ret.options.downloadOptions[k] = env_bool_1.envVal(v));
        }
    }
    return ret;
}
exports.chkInfo = chkInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7OztBQUVILG1DQUErRDtBQUMvRCwyREFBa0Q7QUFFbEQsdUNBQWtDO0FBQ2xDLDBFQUErQztBQUMvQyxzRUFBNEM7QUFFNUMsU0FBZ0IscUJBQXFCLENBQUMsSUFBaUI7SUFFdEQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFDdEI7UUFDQyxJQUFJLEdBQUcsR0FBRztZQUNSLE9BQU87WUFDUCxjQUFjO1lBQ2QsVUFBVTtZQUNWLFVBQVU7WUFDVixVQUFVO1lBQ1YsVUFBVTtZQUNWLFVBQVU7U0FDVixDQUFDLE1BQU0sQ0FBQyxnQ0FBd0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZELE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFXO1lBRS9CLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQ3JCO2dCQUNDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2FBQ3ZCO1lBRUQsT0FBTyxDQUFDLENBQUE7UUFDVCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQ047UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUNyQjtZQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN2QztRQUVELEdBQUcsR0FBRyxpQ0FBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4QyxXQUFXO1lBQ1gsU0FBUztZQUNULEtBQUs7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LENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLGlCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDaEU7U0FDRDtLQUNEO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDWixDQUFDO0FBeEVELDBCQXdFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMjAvMS8xNi5cbiAqL1xuXG5pbXBvcnQgeyBmaWx0ZXJCeVByZWZpeFJldHVybktleXMsIGFueVRvQXJyYXkgfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7IGFycmF5X3VuaXF1ZSB9IGZyb20gJ2FycmF5LWh5cGVyLXVuaXF1ZSc7XG5pbXBvcnQgeyBJT3B0aW9uc1BhcnNlLCBJTWRjb25mTWV0YSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgZW52VmFsIH0gZnJvbSAnZW52LWJvb2wnO1xuaW1wb3J0IHNvcnRPYmplY3RLZXlzIGZyb20gJ3NvcnQtb2JqZWN0LWtleXMyJztcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2lzLXBsYWluLW9iamVjdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROb3ZlbFRpdGxlRnJvbU1ldGEobWV0YTogSU1kY29uZk1ldGEpOiBzdHJpbmdbXVxue1xuXHRpZiAobWV0YSAmJiBtZXRhLm5vdmVsKVxuXHR7XG5cdFx0bGV0IGFyciA9IFtcblx0XHRcdFx0J3RpdGxlJyxcblx0XHRcdFx0J3RpdGxlX3NvdXJjZScsXG5cdFx0XHRcdCd0aXRsZV9qcCcsXG5cdFx0XHRcdCd0aXRsZV9qYScsXG5cdFx0XHRcdCd0aXRsZV96aCcsXG5cdFx0XHRcdCd0aXRsZV90dycsXG5cdFx0XHRcdCd0aXRsZV9jbicsXG5cdFx0XHRdLmNvbmNhdChmaWx0ZXJCeVByZWZpeFJldHVybktleXMoJ3RpdGxlXycsIG1ldGEubm92ZWwpKVxuXHRcdFx0LnJlZHVjZShmdW5jdGlvbiAoYSwga2V5OiBzdHJpbmcpXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChrZXkgaW4gbWV0YS5ub3ZlbClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGEucHVzaChtZXRhLm5vdmVsW2tleV0pXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gYVxuXHRcdFx0fSwgW10pXG5cdFx0O1xuXG5cdFx0aWYgKG1ldGEubm92ZWwuc2VyaWVzKVxuXHRcdHtcblx0XHRcdGFyci5wdXNoKG1ldGEubm92ZWwuc2VyaWVzLm5hbWUpO1xuXHRcdFx0YXJyLnB1c2gobWV0YS5ub3ZlbC5zZXJpZXMubmFtZV9zaG9ydCk7XG5cdFx0fVxuXG5cdFx0YXJyID0gYXJyYXlfdW5pcXVlKGFyci5maWx0ZXIodiA9PiB2ICYmICFbXG5cdFx0XHQndW5kZWZpbmVkJyxcblx0XHRcdCfplbfnt6gg44CQ6YCj6LyJ44CRJyxcblx0XHRcdCfpgKPovInkuK0nLFxuXHRcdF0uaW5jbHVkZXModikpKTtcblxuXHRcdHJldHVybiBhcnI7XG5cdH1cblxuXHRyZXR1cm4gW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0S2V5czxUIGV4dGVuZHMgSU1kY29uZk1ldGE+KHJldDogVClcbntcblx0Ly8gQHRzLWlnbm9yZVxuXHRyZXQgPSBzb3J0T2JqZWN0S2V5cyhyZXQsIFtcblx0XHQnbm92ZWwnLFxuXHRcdCdjb250cmlidXRlJyxcblx0XHQnb3B0aW9ucycsXG5cdF0pO1xuXG5cdHNvcnRTdWJLZXkoJ25vdmVsJywgW1xuXHRcdCd0aXRsZScsXG5cdFx0J3RpdGxlX3Nob3J0Jyxcblx0XHQndGl0bGVfemgnLFxuXHRcdCd0aXRsZV96aDEnLFxuXHRcdCd0aXRsZV96aDInLFxuXHRcdCd0aXRsZV9lbicsXG5cdFx0J3RpdGxlX2pwJyxcblx0XHQndGl0bGVfb3V0cHV0Jyxcblx0XHQndGl0bGVfb3RoZXInLFxuXHRcdCd0aXRsZV9zb3VyY2UnLFxuXHRcdCdhdXRob3InLFxuXHRcdCdhdXRob3JzJyxcblx0XHQnaWxsdXN0Jyxcblx0XHQnaWxsdXN0cycsXG5cdFx0J3NvdXJjZScsXG5cdFx0J3NvdXJjZXMnLFxuXHRcdCdjb3ZlcicsXG5cdFx0J3B1Ymxpc2hlcicsXG5cdFx0J3B1Ymxpc2hlcnMnLFxuXHRcdCdkYXRlJyxcblx0XHQnc3RhdHVzJyxcblx0XHQnbm92ZWxfc3RhdHVzJyxcblx0XHQncjE4JyxcblxuXHRcdCdzZXJpZXMnLFxuXG5cdFx0J3ByZWZhY2UnLFxuXHRcdCd0YWdzJyxcblx0XSk7XG5cblx0c29ydFN1YktleShbJ25vdmVsJywgJ3RhZ3MnXSwgbnVsbCwgdHJ1ZSk7XG5cdHNvcnRTdWJLZXkoJ2NvbnRyaWJ1dGUnLCBudWxsLCB0cnVlKTtcblx0c29ydFN1YktleSgnb3B0aW9ucycpO1xuXG5cdGZ1bmN0aW9uIHNvcnRTdWJLZXkoa2V5LCBzb3J0TGlzdD86IHN0cmluZ1tdLCB1bmlxdWU/OiBib29sZWFuKVxuXHR7XG5cdFx0bGV0IG9iaiA9IHJldDtcblx0XHRsZXQgcGFyZW50ID0gb2JqO1xuXG5cdFx0Ly9jb25zb2xlLmxvZyhvYmosIHNvcnRMaXN0KTtcblxuXHRcdGlmIChBcnJheS5pc0FycmF5KGtleSkpXG5cdFx0e1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhrZXkpO1xuXG5cdFx0XHRsZXQgX2s7XG5cblx0XHRcdGZvciAobGV0IHZhbHVlIG9mIGtleSlcblx0XHRcdHtcblx0XHRcdFx0aWYgKCEodmFsdWUgaW4gb2JqKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2codmFsdWUsIHBhcmVudCk7XG5cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfayA9IHZhbHVlO1xuXG5cdFx0XHRcdHBhcmVudCA9IG9iajtcblx0XHRcdFx0b2JqID0gcGFyZW50W3ZhbHVlXTtcblx0XHRcdH1cblxuXHRcdFx0a2V5ID0gX2s7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKChrZXkgaW4gcGFyZW50KSlcblx0XHR7XG5cdFx0XHRvYmogPSBwYXJlbnRba2V5XTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuXHRcdHtcblx0XHRcdG9iai5zb3J0KCk7XG5cdFx0XHRwYXJlbnRba2V5XSA9IG9iajtcblx0XHRcdGlmICh1bmlxdWUpXG5cdFx0XHR7XG5cdFx0XHRcdHBhcmVudFtrZXldID0gcGFyZW50W2tleV0uZmlsdGVyKGZ1bmN0aW9uICh2KVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cmV0dXJuIHY7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHBhcmVudFtrZXldID0gYXJyYXlfdW5pcXVlKHBhcmVudFtrZXldKTtcblxuXHRcdFx0XHRpZiAocGFyZW50W2tleV0ubGVuZ3RoID09IDEgJiYgKHBhcmVudFtrZXldWzBdID09PSBudWxsIHx8IHR5cGVvZiBwYXJlbnRba2V5XVswXSA9PSAndW5kZWZpbmVkJykpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRwYXJlbnRba2V5XSA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGlzUGxhaW5PYmplY3Qob2JqKSlcblx0XHR7XG5cdFx0XHRwYXJlbnRba2V5XSA9IHNvcnRPYmplY3RLZXlzKG9iaiwgc29ydExpc3QpO1xuXHRcdH1cblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0cmV0dXJuIHJldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoa0luZm8ocmV0OiBJTWRjb25mTWV0YSwgb3B0aW9uczogSU9wdGlvbnNQYXJzZSA9IHt9KTogSU1kY29uZk1ldGFcbntcblx0aWYgKCFyZXRcblx0XHR8fCAoXG5cdFx0XHQoIW9wdGlvbnMgfHwgIW9wdGlvbnMubG93Q2hlY2tMZXZlbClcblx0XHRcdCYmICghcmV0Lm5vdmVsIHx8ICFyZXQubm92ZWwudGl0bGUpXG5cdFx0KVxuXHQpXG5cdHtcblx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLnRocm93KVxuXHRcdHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYG5vdmVsJHsocmV0Lm5vdmVsID8gJy50aXRsZScgOiAnJyl9IG5vdCBleGlzdHMuYCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRpZiAocmV0Lm5vdmVsKVxuXHR7XG5cdFx0W1xuXHRcdFx0J2F1dGhvcnMnLFxuXHRcdFx0J2lsbHVzdHMnLFxuXHRcdFx0J3RhZ3MnLFxuXHRcdFx0J3NvdXJjZXMnLFxuXHRcdFx0J3B1Ymxpc2hlcnMnLFxuXHRcdF0uZm9yRWFjaChrID0+XG5cdFx0e1xuXHRcdFx0aWYgKGsgaW4gcmV0Lm5vdmVsKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXQubm92ZWxba10gPSBhbnlUb0FycmF5KHJldC5ub3ZlbFtrXSwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAoJ25vdmVsX3N0YXR1cycgaW4gcmV0Lm5vdmVsKVxuXHRcdHtcblx0XHRcdHJldC5ub3ZlbC5ub3ZlbF9zdGF0dXMgPSBlbnZWYWwocmV0Lm5vdmVsLm5vdmVsX3N0YXR1cyk7XG5cblx0XHRcdGlmICh0eXBlb2YgcmV0Lm5vdmVsLm5vdmVsX3N0YXR1cyA9PT0gJ3N0cmluZycgJiYgL14weFtcXGRhLWZdKyQvLnRlc3QocmV0Lm5vdmVsLm5vdmVsX3N0YXR1cykpXG5cdFx0XHR7XG5cdFx0XHRcdHJldC5ub3ZlbC5ub3ZlbF9zdGF0dXMgPSBOdW1iZXIocmV0Lm5vdmVsLm5vdmVsX3N0YXR1cyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKCdjb250cmlidXRlJyBpbiByZXQpXG5cdHtcblx0XHRyZXQuY29udHJpYnV0ZSA9IGFueVRvQXJyYXkocmV0LmNvbnRyaWJ1dGUsIHRydWUpO1xuXHR9XG5cblx0aWYgKCFvcHRpb25zLmxvd0NoZWNrTGV2ZWwpXG5cdHtcblx0XHRyZXQub3B0aW9ucyA9IHJldC5vcHRpb25zIHx8IHt9O1xuXHR9XG5cblx0aWYgKHJldC5vcHRpb25zKVxuXHR7XG5cdFx0aWYgKHR5cGVvZiByZXQub3B0aW9ucy50ZXh0bGF5b3V0ID09PSAnb2JqZWN0Jylcblx0XHR7XG5cdFx0XHRPYmplY3QuZW50cmllcyhyZXQub3B0aW9ucy50ZXh0bGF5b3V0KVxuXHRcdFx0XHQuZm9yRWFjaCgoW2ssIHZdKSA9PiByZXQub3B0aW9ucy50ZXh0bGF5b3V0W2tdID0gZW52VmFsKHYpKVxuXHRcdFx0O1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgcmV0Lm9wdGlvbnMuZG93bmxvYWRPcHRpb25zID09PSAnb2JqZWN0Jylcblx0XHR7XG5cdFx0XHRPYmplY3QuZW50cmllcyhyZXQub3B0aW9ucy5kb3dubG9hZE9wdGlvbnMpXG5cdFx0XHRcdC5mb3JFYWNoKChbaywgdl0pID0+IHJldC5vcHRpb25zLmRvd25sb2FkT3B0aW9uc1trXSA9IGVudlZhbCh2KSlcblx0XHRcdDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufVxuIl19