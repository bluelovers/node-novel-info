/**
 * Created by user on 2019/3/8.
 */
import NodeNovelInfo from '../class';
import fs = require('fs');

let md = fs.readFileSync('C:/Home/link/dist_novel/syosetu/望まぬ不死の冒険者/README.md');

let o = NodeNovelInfo.createFromString(md);

console.dir(o.title());
console.dir(o.titles());
console.dir(o.illusts());
console.dir(o.authors());
console.dir(o.sources());
console.dir(o.sites());
