# node-novel-info

> mdconf module for node-novel

`npm install node-novel-info`

## demo

[README.md](test/res/README.md)

```ts
import novelInfo from 'node-novel-info';
import * as fs from 'fs-extra';

fs.readFile('./res/README.md')
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
