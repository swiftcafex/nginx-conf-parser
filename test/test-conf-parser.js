import test from 'ava';
import confParser from '../conf-parser';

const fs = require('fs');

test('test', t => {
	t.pass();
});

test('extract lines', async t => {
	const exmaplePath = './test/support/example.conf';
	const inStream = fs.createReadStream(exmaplePath);

	await (function () {
		return new Promise(resolve => {
			confParser.extractLines(inStream, lines => {
				t.is(lines.length, 70);	// The number of lines must be 70, same as the oroginal file /test/support/example.conf

				// Comments must be stripped after extract.
				for (const line of lines) {
					t.is(line.indexOf('#'), -1);
				}

				resolve();
			});
		});
	})();
	t.pass();
});
