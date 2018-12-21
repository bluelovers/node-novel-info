"use strict";
/**
 * Created by user on 2018/1/28/028.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge = require("deepmerge-plus");
exports.deepmerge = deepmerge;
const moment = require("moment");
exports.moment = moment;
const mdconf = require("mdconf2");
exports.mdconf = mdconf;
const jsdom_url_1 = require("jsdom-url");
const array_hyper_unique_1 = require("array-hyper-unique");
exports.array_unique = array_hyper_unique_1.array_unique;
exports.deepmergeOptions = {
    isMergeableObject(value, isMergeableObject) {
        let bool;
        if (moment.isMoment(value) || mdconf.RawObject.isRawObject(value)) {
            return false;
        }
        if (value instanceof jsdom_url_1.URL || value && typeof value.href == 'string') {
            return false;
        }
    }
};
const self = require("./index");
exports.default = self;
//export default exports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsNENBQTZDO0FBT3BDLDhCQUFTO0FBTGxCLGlDQUFrQztBQUtkLHdCQUFNO0FBSjFCLGtDQUFtQztBQUlQLHdCQUFNO0FBSGxDLHlDQUFnQztBQUNoQywyREFBa0Q7QUFJekMsdUJBSkEsaUNBQVksQ0FJQTtBQUVSLFFBQUEsZ0JBQWdCLEdBQXdCO0lBQ3BELGlCQUFpQixDQUFDLEtBQUssRUFBRSxpQkFBaUI7UUFDekMsSUFBSSxJQUFJLENBQUM7UUFFVCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEUsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUVELElBQUksS0FBSyxZQUFZLGVBQUcsSUFBSSxLQUFLLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFDbEU7WUFDQyxPQUFPLEtBQUssQ0FBQztTQUNiO0lBQ0YsQ0FBQztDQUNELENBQUM7QUFFRixnQ0FBZ0M7QUFDaEMsa0JBQWUsSUFBSSxDQUFDO0FBQ3BCLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvMS8yOC8wMjguXG4gKi9cblxuaW1wb3J0IGRlZXBtZXJnZSA9IHJlcXVpcmUoJ2RlZXBtZXJnZS1wbHVzJyk7XG5pbXBvcnQgKiBhcyBkZWVwbWVyZ2VOUyBmcm9tICdkZWVwbWVyZ2UtcGx1cy9jb3JlJztcbmltcG9ydCBtb21lbnQgPSByZXF1aXJlKCdtb21lbnQnKTtcbmltcG9ydCBtZGNvbmYgPSByZXF1aXJlKCdtZGNvbmYyJyk7XG5pbXBvcnQgeyBVUkwgfSBmcm9tICdqc2RvbS11cmwnO1xuaW1wb3J0IHsgYXJyYXlfdW5pcXVlIH0gZnJvbSAnYXJyYXktaHlwZXItdW5pcXVlJztcblxuZXhwb3J0IHsgZGVlcG1lcmdlLCBtb21lbnQsIG1kY29uZiB9XG5cbmV4cG9ydCB7IGFycmF5X3VuaXF1ZSB9XG5cbmV4cG9ydCBjb25zdCBkZWVwbWVyZ2VPcHRpb25zOiBkZWVwbWVyZ2VOUy5PcHRpb25zID0ge1xuXHRpc01lcmdlYWJsZU9iamVjdCh2YWx1ZSwgaXNNZXJnZWFibGVPYmplY3QpIHtcblx0XHRsZXQgYm9vbDtcblxuXHRcdGlmIChtb21lbnQuaXNNb21lbnQodmFsdWUpIHx8IG1kY29uZi5SYXdPYmplY3QuaXNSYXdPYmplY3QodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHZhbHVlIGluc3RhbmNlb2YgVVJMIHx8IHZhbHVlICYmIHR5cGVvZiB2YWx1ZS5ocmVmID09ICdzdHJpbmcnKVxuXHRcdHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cbn07XG5cbmltcG9ydCAqIGFzIHNlbGYgZnJvbSAnLi9pbmRleCc7XG5leHBvcnQgZGVmYXVsdCBzZWxmO1xuLy9leHBvcnQgZGVmYXVsdCBleHBvcnRzO1xuIl19