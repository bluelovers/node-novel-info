/**
 * Created by user on 2018/1/27/027.
 */

import self from '..';
// @ts-ignore
import * as fs from 'fs-extra';

fs.readFile('./res/README_BAD.md')
	.then(function (buf)
	{
		return self.mdconf_parse(buf, {
			//chk: false
		});
	})
	.then(function (conf)
	{
		console.log(conf);
	})
;
