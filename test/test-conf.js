'use strict';

import test from 'ava';
import Conf from '../conf';

test('parse simple property', t => {
	const conf = new Conf();

	// Test Properties Parse
	t.is(conf.user, null);
	conf.parseKey('user', 'root');
	t.is(conf.user, 'root');

	t.is(conf.workProcesses, null);
	conf.parseKey('worker_processes', '5');
	t.is(conf.workProcesses, '5');

	t.is(conf.errorLog, null);
	conf.parseKey('error_log', 'logs/error.log');
	t.is(conf.errorLog, 'logs/error.log');

	t.is(conf.pid, null);
	conf.parseKey('pid', 'logs/nginx.pid');
	t.is(conf.pid, 'logs/nginx.pid');

	t.is(conf.workerRlimitNofile, null);
	conf.parseKey('worker_rlimit_nofile', '8192');
	t.is(conf.workerRlimitNofile, '8192');

	t.pass();
});

test('parse containers', t => {
	const conf = new Conf();

	t.is(conf.events, null);
	conf.parseContainer(['events'], 'worker_connections', '4096');
	t.is(conf.events.worker_connections, '4096');
});
