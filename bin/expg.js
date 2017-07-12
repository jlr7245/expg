#!/usr/bin/env node

/**
 * Dependencies
 */

 const program = require('commander');

/**
 * Program
 */

 function list(val) {
  return val.split(',');
}

 program
  .version('0.0.0');

program.command('new <name>', {})
  .description('creates a new app')
  .option('-A, --api', 'leaves out the views directory')
  .option('-P, --pattern <pattern>', 'sets up an app with the specified pattern. Options are mvc (default) or modular.', /^(mvc|modular|mod)$/i, 'mvc')
  .option('-e, --endpoints <list>', 'a list of available endpoints', list);

program.command('generate <options>', {
  '-R': 'generates routes',
  '-M': 'generates migration',
})
  .alias('g')
  .description('generate routes, controllers, migrations')
  .option('-R, routes <list>', 'a list of comma-separated routes', list)
  .option('-M, -migration <options>', 'coming soon',);

program.parse(process.argv);

console.log(program);

/*
- creates a new directory with 

*/