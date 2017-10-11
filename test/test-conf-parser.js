import test from 'ava';
import confParser from '../conf-parser';

const fs = require('fs');

test('test', t => {
	t.pass();
});

test('extract lines', async t => {
	const exmaplePath = './test/support/example.conf';
	const inStream = fs.createReadStream(exmaplePath);
	await confParser.extractLines(inStream, lines => {
		console.log(lines.count);
		t.pass();
	});

	t.pass();
});
