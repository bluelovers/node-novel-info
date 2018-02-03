# node-novel-info

> mdconf module for node-novel

`npm install node-novel-info`

## demo

[README.md](test/res/README.md)

### mdconf_parse

<!-- js
var novelInfo = require('.');
var fs = require('fs-extra');
var Mdconf = novelInfo.Mdconf;
-->

```js
fs.readFile('./test/res/README.md')
	.then(function (buf)
	{
		return novelInfo.mdconf_parse(buf, {
			//chk: false
		});
	})
	.then(function (conf)
	{
		console.log(conf);
		
		return conf;
	})
;
```

#### output

```
{ novel: 
   { title: '自卫队三部曲',
     author: '有川浩',
     source: 'http://www.wenku8.com/modules/article/reader.php?aid=350',
     publisher: '富士见文库',
     cover: 'http://img.wenku8.com/image/0/350/350s.jpg',
     date: '2011-06-22T00:00:00+08:00',
     status: '已完成',
     preface: '故事背景架构在近未来（或可称为平行世界）的曰本。\n某天，直径五百公尺的白色陨石状物体以迅雷不及掩耳之势坠落在地球上。\n同一时间，发生了人类变化成盐柱的诡异现象（一般称之为“盐害”），光是曰本地区的死亡人数便估计多达八千万人。文明社会在一瞬间崩溃，劫后余生的人们逃到农村，过着自给自足的贫乏生活……',
     tags: [ 'node-novel', 'wenku8' ] },
  options: { textlayout: { allow_lf2: 'true' } } }
```

### Mdconf.stringify

```js
var moment = require("moment");
console.log(Mdconf.stringify({
	novel: {
		test: true,
	},

	options: {

		textlayout: {
			lf: true,
		},

		data: moment(),

	}
}));
```

#### output

```markdown
#novel

- test: true

#options

- data: 2018-02-04T02:48:24+08:00

##textlayout

- lf: true
```

## links

- [node-novel-info](https://www.npmjs.com/package/node-novel-info)
- [mdconf2](https://www.npmjs.com/package/mdconf2)
- [mdconf-stringify](https://www.npmjs.com/package/mdconf-stringify)

