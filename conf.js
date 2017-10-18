'use strict';

const Conf = function () {
	this.user = null;
	this.workProcesses = null;
	this.errorLog = null;
	this.pid = null;
	this.workerRlimitNofile = null;

	this.events = null;
	this.server = null;
};

// Set given key to accoridence property.
Conf.prototype.parseKey = function (key, val) {
	if (key === 'user') {
		this.user = val;
	} else if (key === 'worker_processes') {
		this.workProcesses = val;
	} else if (key === 'error_log') {
		this.errorLog = val;
	} else if (key === 'pid') {
		this.pid = val;
	} else if (key === 'worker_rlimit_nofile') {
		this.workerRlimitNofile = val;
	}
};

Conf.prototype.parseContainer = function (containerList, key, val) {
	if (containerList.length === 1 && containerList[0] === 'events') {
		if (this.events === null) {
			this.events = {};
		}
		this.events[key] = val;
	}
};

module.exports = Conf;
