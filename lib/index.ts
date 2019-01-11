/**
 * Created by user on 2018/1/28/028.
 */

import deepmerge = require('deepmerge-plus');
import deepmergeNS from 'deepmerge-plus/core';
import moment = require('moment');
import mdconf = require('mdconf2');
import { URL } from 'jsdom-url';
import { array_unique } from 'array-hyper-unique';

export { deepmerge, moment, mdconf }

export { array_unique }

export const deepmergeOptions: deepmergeNS.Options = {
	isMergeableObject(value, isMergeableObject) {
		let bool;

		if (moment.isMoment(value) || mdconf.RawObject.isRawObject(value)) {
			return false;
		}

		if (value instanceof URL || value && typeof value.href == 'string')
		{
			return false;
		}
	}
};

export default exports as typeof import('./index');
