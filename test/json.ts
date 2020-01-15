/**
 * Created by user on 2018/2/5/005.
 */

import JsonMd from '../json';
import novelInfo from '..';
import fs from 'fs-extra';
import path from 'path';

[
	'./res/四度目は嫌な死属性魔術師.n1745ct.json',
	'./res/薇尔莉特·伊芙加登(紫罗兰永恒花园).2353.json',
	'./res/轮环的魔导师.1091.json',
].forEach(function (file)
{
	fs.readJSON(file)
		.then(function (data)
		{
			let r = JsonMd.toNovelInfo({}, data);

			console.log(r);

			let m = novelInfo.stringify(r);

			//console.log(m);

			return fs.outputFile(path.join('./temp', path.basename(file, path.extname(file)) + '.md'), m)
		})
	;
});

/*
fs.readJSON('D:/Users/Documents/The Project/nodejs-test/node-novel2/dist_novel/syosetu/四度目は嫌な死属性魔術師_(n1745ct)/四度目は嫌な死属性魔術師.n1745ct.json')
	.then(function (data)
	{

		let r = JsonMd.toNovelInfo({}, data,{
			novel_author: '111',
			tags: [
				'777',
			],
			novel: {
				author: '222',
			},
			data: {
				type: [
					'666',
				],
			},
		}, {
			novel: {
				title: '666',
			}
		});

		console.log(r);

		let m = novelInfo.stringify(r);

		console.log(m);
	})
;
*/


