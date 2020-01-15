/**
 * Created by user on 2018/1/27/027.
 */

import novelInfo from '..';
import fs from 'fs-extra';

fs.readFile('./res/README2.md')
	.then(function (buf)
	{
		return novelInfo.parse(buf, {
			//chk: false
		});
	})
	.then(function (conf)
	{
		console.log(conf);

		return conf;
	})
	.then(function (conf)
	{
		console.log(novelInfo.stringify(conf));
	})
;
