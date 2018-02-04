/**
 * Created by user on 2018/1/27/027.
 */

import novelInfo from '..';
// @ts-ignore
import * as fs from 'fs-extra';

fs.readFile('./res/README.md')
	.then(function (buf)
	{
		return novelInfo.parse(buf, {
			//chk: false
		});
	})
	.then(function (conf)
	{
		console.log(conf);

		console.log(novelInfo.stringify(conf));
	})
;
