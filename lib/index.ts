/**
 * Created by user on 2018/1/28/028.
 */

import * as deepmerge from 'deepmerge-plus';
import * as moment from 'moment';

export function array_unique(array: any[])
{
	return array.filter(function (el, index, arr)
	{
		return index == arr.indexOf(el);
	});
}

export const deepmergeOptions: deepmerge.Options = {
	isMergeableObject(value, isMergeableObject) {
		let bool;

		if (bool = moment.isMoment(value)) {
			return false;
		}
	}
};

import * as self from './index';
export default self;
//export default exports;
