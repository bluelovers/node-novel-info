"use strict";
/**
 * Created by user on 2018/1/28/028.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const array_hyper_unique_1 = require("array-hyper-unique");
function _prefix_to_fn(prefix) {
    if (typeof prefix === 'string') {
        prefix = new RegExp(`^${prefix}`);
    }
    if (typeof prefix === 'function') {
        return prefix;
    }
    else if (prefix instanceof RegExp) {
        //prefix.test('');
        return (key, value) => prefix.test(key);
    }
    throw new TypeError(`not a function , string, RegExp: ${prefix}`);
}
exports._prefix_to_fn = _prefix_to_fn;
function filterByPrefix(prefix, obj, options = {}) {
    let fn = _prefix_to_fn(prefix);
    let ignore;
    if (options && options.ignore) {
        ignore = _prefix_to_fn(options.ignore);
    }
    return (Object.entries(obj))
        .filter(([key, value]) => {
        if (ignore && ignore(key, value)) {
            return false;
        }
        return fn(key, value);
    });
}
exports.filterByPrefix = filterByPrefix;
function filterByPrefixReturnKeys(prefix, obj, options) {
    return filterByPrefix(prefix, obj, options)
        .map(item => item[0]);
}
exports.filterByPrefixReturnKeys = filterByPrefixReturnKeys;
function filterByPrefixReturnValues(prefix, obj, options) {
    return filterByPrefix(prefix, obj, options)
        .map(item => item[1]);
}
exports.filterByPrefixReturnValues = filterByPrefixReturnValues;
function arr_filter(arr) {
    return array_hyper_unique_1.array_unique(arr).filter(v => {
        return v && v != null
            // @ts-ignore
            && v != 'null'
            // @ts-ignore
            && v != 'undefined';
    });
}
exports.arr_filter = arr_filter;
function cb_title_filter(v) {
    return typeof v === 'string' && v && ![
        '連載中',
        '長編 【連載】',
        'undefined',
        'null',
        '',
    ].includes(v.trim());
}
exports.cb_title_filter = cb_title_filter;
function anyToArray(input, unique) {
    if (typeof input != 'object') {
        input = [input];
    }
    if (unique) {
        input = array_hyper_unique_1.array_unique(input || []);
    }
    // @ts-ignore
    return input;
}
exports.anyToArray = anyToArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsMkRBQWtEO0FBUWxELFNBQWdCLGFBQWEsQ0FBb0IsTUFBeUI7SUFFekUsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQzlCO1FBQ0MsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksTUFBTSxFQUFFLENBQUMsQ0FBQztLQUNsQztJQUVELElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxFQUNoQztRQUNDLE9BQU8sTUFBTSxDQUFBO0tBQ2I7U0FDSSxJQUFJLE1BQU0sWUFBWSxNQUFNLEVBQ2pDO1FBQ0Msa0JBQWtCO1FBRWxCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBRSxNQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNuRDtJQUVELE1BQU0sSUFBSSxTQUFTLENBQUMsb0NBQW9DLE1BQU0sRUFBRSxDQUFDLENBQUE7QUFDbEUsQ0FBQztBQW5CRCxzQ0FtQkM7QUFFRCxTQUFnQixjQUFjLENBQW9CLE1BQXlCLEVBQUUsR0FFNUUsRUFBRSxVQUVDLEVBQUU7SUFFTCxJQUFJLEVBQUUsR0FBRyxhQUFhLENBQUksTUFBTSxDQUFDLENBQUM7SUFFbEMsSUFBSSxNQUEyQixDQUFDO0lBRWhDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQzdCO1FBQ0MsTUFBTSxHQUFHLGFBQWEsQ0FBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUM7SUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBSSxHQUFVLENBQUMsQ0FBQztTQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1FBRXhCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQ2hDO1lBQ0MsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUVELE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FDRjtBQUNGLENBQUM7QUExQkQsd0NBMEJDO0FBRUQsU0FBZ0Isd0JBQXdCLENBQW9CLE1BQXlCLEVBQUUsR0FFdEYsRUFBRSxPQUVGO0lBRUEsT0FBTyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUM7U0FDekMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdkIsQ0FBQztBQVJELDREQVFDO0FBRUQsU0FBZ0IsMEJBQTBCLENBQW9CLE1BQXlCLEVBQUUsR0FFeEYsRUFBRSxPQUVGO0lBRUEsT0FBTyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUM7U0FDekMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdkIsQ0FBQztBQVJELGdFQVFDO0FBRUQsU0FBZ0IsVUFBVSxDQUFJLEdBQVE7SUFFckMsT0FBTyxpQ0FBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUVuQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSTtZQUNwQixhQUFhO2VBQ1YsQ0FBQyxJQUFJLE1BQU07WUFDZCxhQUFhO2VBQ1YsQ0FBQyxJQUFJLFdBQVcsQ0FBQTtJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFWRCxnQ0FVQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxDQUFTO0lBRXhDLE9BQU8sT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JDLEtBQUs7UUFDTCxTQUFTO1FBQ1QsV0FBVztRQUNYLE1BQU07UUFDTixFQUFFO0tBQ0YsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFDckIsQ0FBQztBQVRELDBDQVNDO0FBRUQsU0FBZ0IsVUFBVSxDQUFhLEtBQWMsRUFBRSxNQUFnQjtJQUV0RSxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFDNUI7UUFDQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNoQjtJQUVELElBQUksTUFBTSxFQUNWO1FBQ0MsS0FBSyxHQUFHLGlDQUFZLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2xDO0lBRUQsYUFBYTtJQUNiLE9BQU8sS0FBSyxDQUFDO0FBQ2QsQ0FBQztBQWRELGdDQWNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC8xLzI4LzAyOC5cbiAqL1xuXG5pbXBvcnQgeyBhcnJheV91bmlxdWUgfSBmcm9tICdhcnJheS1oeXBlci11bmlxdWUnO1xuXG50eXBlIElGaWx0ZXJQYXR0ZXJuRm48VCBleHRlbmRzIHVua25vd24+ID0gKChrZXk6IHN0cmluZywgdmFsdWU6IFQgfCB1bmtub3duKSA9PiBib29sZWFuKTtcblxudHlwZSBJRmlsdGVyUGF0dGVybjxUIGV4dGVuZHMgdW5rbm93bj4gPSBJRmlsdGVyUGF0dGVybkZuPFQ+IHwgc3RyaW5nIHwgUmVnRXhwO1xuXG50eXBlIElFbnRyaWVzPFQgZXh0ZW5kcyB1bmtub3duPiA9IFtzdHJpbmcsIFRdW11cblxuZXhwb3J0IGZ1bmN0aW9uIF9wcmVmaXhfdG9fZm48VCBleHRlbmRzIHVua25vd24+KHByZWZpeDogSUZpbHRlclBhdHRlcm48VD4pOiBJRmlsdGVyUGF0dGVybkZuPFQ+XG57XG5cdGlmICh0eXBlb2YgcHJlZml4ID09PSAnc3RyaW5nJylcblx0e1xuXHRcdHByZWZpeCA9IG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgcHJlZml4ID09PSAnZnVuY3Rpb24nKVxuXHR7XG5cdFx0cmV0dXJuIHByZWZpeFxuXHR9XG5cdGVsc2UgaWYgKHByZWZpeCBpbnN0YW5jZW9mIFJlZ0V4cClcblx0e1xuXHRcdC8vcHJlZml4LnRlc3QoJycpO1xuXG5cdFx0cmV0dXJuIChrZXksIHZhbHVlKSA9PiAocHJlZml4IGFzIFJlZ0V4cCkudGVzdChrZXkpXG5cdH1cblxuXHR0aHJvdyBuZXcgVHlwZUVycm9yKGBub3QgYSBmdW5jdGlvbiAsIHN0cmluZywgUmVnRXhwOiAke3ByZWZpeH1gKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyQnlQcmVmaXg8VCBleHRlbmRzIHVua25vd24+KHByZWZpeDogSUZpbHRlclBhdHRlcm48VD4sIG9iajoge1xuXHRbazogc3RyaW5nXTogVCB8IHVua25vd25cbn0sIG9wdGlvbnM6IHtcblx0aWdub3JlPzogSUZpbHRlclBhdHRlcm48VD4sXG59ID0ge30pOiBJRW50cmllczxUPlxue1xuXHRsZXQgZm4gPSBfcHJlZml4X3RvX2ZuPFQ+KHByZWZpeCk7XG5cblx0bGV0IGlnbm9yZTogSUZpbHRlclBhdHRlcm5GbjxUPjtcblxuXHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLmlnbm9yZSlcblx0e1xuXHRcdGlnbm9yZSA9IF9wcmVmaXhfdG9fZm48VD4ob3B0aW9ucy5pZ25vcmUpO1xuXHR9XG5cblx0cmV0dXJuIChPYmplY3QuZW50cmllczxUPihvYmogYXMgYW55KSlcblx0XHQuZmlsdGVyKChba2V5LCB2YWx1ZV0pID0+XG5cdFx0e1xuXHRcdFx0aWYgKGlnbm9yZSAmJiBpZ25vcmUoa2V5LCB2YWx1ZSkpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuKGtleSwgdmFsdWUpO1xuXHRcdH0pXG5cdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckJ5UHJlZml4UmV0dXJuS2V5czxUIGV4dGVuZHMgdW5rbm93bj4ocHJlZml4OiBJRmlsdGVyUGF0dGVybjxUPiwgb2JqOiB7XG5cdFtrOiBzdHJpbmddOiBUIHwgdW5rbm93blxufSwgb3B0aW9ucz86IHtcblx0aWdub3JlPzogSUZpbHRlclBhdHRlcm48VD4sXG59KVxue1xuXHRyZXR1cm4gZmlsdGVyQnlQcmVmaXgocHJlZml4LCBvYmosIG9wdGlvbnMpXG5cdFx0Lm1hcChpdGVtID0+IGl0ZW1bMF0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJCeVByZWZpeFJldHVyblZhbHVlczxUIGV4dGVuZHMgdW5rbm93bj4ocHJlZml4OiBJRmlsdGVyUGF0dGVybjxUPiwgb2JqOiB7XG5cdFtrOiBzdHJpbmddOiBUIHwgdW5rbm93blxufSwgb3B0aW9ucz86IHtcblx0aWdub3JlPzogSUZpbHRlclBhdHRlcm48VD4sXG59KVxue1xuXHRyZXR1cm4gZmlsdGVyQnlQcmVmaXgocHJlZml4LCBvYmosIG9wdGlvbnMpXG5cdFx0Lm1hcChpdGVtID0+IGl0ZW1bMV0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJfZmlsdGVyPFQ+KGFycjogVFtdKVxue1xuXHRyZXR1cm4gYXJyYXlfdW5pcXVlKGFycikuZmlsdGVyKHYgPT5cblx0e1xuXHRcdHJldHVybiB2ICYmIHYgIT0gbnVsbFxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0JiYgdiAhPSAnbnVsbCdcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdCYmIHYgIT0gJ3VuZGVmaW5lZCdcblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYl90aXRsZV9maWx0ZXIodjogc3RyaW5nKVxue1xuXHRyZXR1cm4gdHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIHYgJiYgIVtcblx0XHQn6YCj6LyJ5LitJyxcblx0XHQn6ZW357eoIOOAkOmAo+i8ieOAkScsXG5cdFx0J3VuZGVmaW5lZCcsXG5cdFx0J251bGwnLFxuXHRcdCcnLFxuXHRdLmluY2x1ZGVzKHYudHJpbSgpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYW55VG9BcnJheTxUID0gc3RyaW5nPihpbnB1dDogVCB8IFRbXSwgdW5pcXVlPzogYm9vbGVhbik6IFRbXVxue1xuXHRpZiAodHlwZW9mIGlucHV0ICE9ICdvYmplY3QnKVxuXHR7XG5cdFx0aW5wdXQgPSBbaW5wdXRdO1xuXHR9XG5cblx0aWYgKHVuaXF1ZSlcblx0e1xuXHRcdGlucHV0ID0gYXJyYXlfdW5pcXVlKGlucHV0IHx8IFtdKTtcblx0fVxuXG5cdC8vIEB0cy1pZ25vcmVcblx0cmV0dXJuIGlucHV0O1xufVxuIl19