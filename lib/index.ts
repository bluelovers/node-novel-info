/**
 * Created by user on 2018/1/28/028.
 */

export function array_unique(array: any[])
{
	return array.filter(function (el, index, arr)
	{
		return index == arr.indexOf(el);
	});
}

import * as self from './index';
export default self;
//export default exports;
