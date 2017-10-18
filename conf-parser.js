'use strict';

const readline = require('readline');
const fs = require('fs');
const trim = require('string.prototype.trim');
const Conf = require('./conf');

const ConfParser = function () {

};

// Parse nginx conf from file content
ConfParser.prototype.parseContent = function () {

};

// Parse nginx conf from file path.
ConfParser.prototype.parseFile = function (filePath, callback) {
	const inStream = fs.createReadStream(filePath);
	this.extractLines(inStream, lines => {
		const conf = new Conf();
		const containerList = [];
		for (const line of lines) {
			// Simple item, not in container
			if (line.indexOf('{') === -1 && containerList.length === 0) {
				let separatorIndex = line.indexOf(' ');
				if (separatorIndex === -1) {
					separatorIndex = line.indexOf('\t');
				}
				// Separator founded
				if (separatorIndex !== -1) {
					let key = line.substr(0, separatorIndex);
					key = key.replace(' ', '');
					if (key.length > 0) {
						// Key Founded
						let val = trim(line.substr(separatorIndex));
						val = val.replace(';', '');
						conf.parseKey(key, val);
					}
				}
			} else if (line.indexOf('{') > 0) {
				// Start container
				const container = trim(line.replace('{', ''));
				containerList.push(container);
			} else if (containerList.length > 0) {
				// In Container
				let separatorIndex = line.indexOf(' ');
				if (separatorIndex === -1) {
					separatorIndex = line.indexOf('\t');
				}
				// Separator founded
				if (separatorIndex !== -1) {
					let key = line.substr(0, separatorIndex);
					key = key.replace(' ', '');
					if (key.length > 0) {
						// Key Founded
						let val = trim(line.substr(separatorIndex));
						val = val.replace(';', '');
						conf.parseContainer(containerList, key, val);
					}
				}
			}
		}
		if (callback) {
			callback(conf);
		}
	});
};

// Extract lines in array from config file.
ConfParser.prototype.extractLines = function (stream, callback) {
	const lines = [];
	const rl = readline.createInterface({
		input: stream
	});

	rl.on('line', line => {
		const commentIndex = line.indexOf('#');
		if (commentIndex !== -1) {
			line = line.substr(0, commentIndex);
		}
		lines.push(trim(line));
	});

	rl.on('close', () => {
		callback(lines);
	});
};

module.exports = new ConfParser();
