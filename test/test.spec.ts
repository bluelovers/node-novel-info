import { readFile } from 'fs-extra';
import { mdconf_parse } from '../index';
import { join } from 'path';

test(`should throw error when novel.title not exists`, async () =>
{
	let md = await readFile(join(__dirname, 'res', 'README_BAD.md'));

	expect(() => mdconf_parse(md)).toThrowError();

	expect(() => mdconf_parse(md, {
		throw: false,
	})).not.toThrowError();

});

