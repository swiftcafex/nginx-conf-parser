const readline = require('readline');
const fs = require('fs');

const ConfParser = function () {

};

// Parse nginx conf from file content
ConfParser.prototype.parseContent = function () {

};

// Parse nginx conf from file path.
ConfParser.prototype.parseFile = function (filePath) {
	const inStream = fs.createReadStream(filePath);
	this.extractLines(inStream, () => {

	});
};

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
		lines.push(line);
	});

	rl.on('close', () => {
		callback(lines);
	});
};

module.exports = new ConfParser();
