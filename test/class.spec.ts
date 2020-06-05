import fs from 'fs-extra';
import { join } from 'path';
import NodeNovelInfo from '../class';

describe(`README2.md`, () =>
{
	let md = fs.readFileSync(join(__dirname, 'res', 'README2.md'));

	let actual = NodeNovelInfo.createFromString(md);

	test(`createFromString`, () =>
	{
		expect(actual).toMatchSnapshot();

	});

	test(`title`, () =>
	{
		expect(actual.title()).toMatchSnapshot();

	});

	test(`titles`, () =>
	{
		expect(actual.titles()).toMatchSnapshot();

	});

	test(`illusts`, () =>
	{
		expect(actual.illusts()).toMatchSnapshot();

	});

	test(`authors`, () =>
	{
		expect(actual.authors()).toMatchSnapshot();

	});

	test(`sources`, () =>
	{
		expect(actual.sources()).toMatchSnapshot();

	});

	test(`sites`, () =>
	{
		expect(actual.sites()).toMatchSnapshot();
	});

})
