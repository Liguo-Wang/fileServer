#!/usr/bin/env node

const express = require('express');
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');
const fs = require('fs');
const program = require('commander');

const pkg = require('./package.json');

//
const version = pkg.version;

// helper
program
  .version(version)
  .usage('[options] [dir]')
  .option('-p, --port <n>', 'set port=? (defaults 9090)', parseInt)
  .option('-d, --dir [value]', 'the file directory of server started, default root directory: /')
  .parse(process.argv);

const app = express();
const port = program.port || 9090;
const pubFolder = program.dir || '/';

if (!fs.statSync(pubFolder).isDirectory()) {
  console.error('ERROR: the folder is not a directory');
  process.exit(1);
}

app.use('/', serveIndex(pubFolder, { view: 'details', icons: true }));
app.use('/', serveStatic(pubFolder));

app.listen(port, () => {
  console.log(`INFO: webserver is running on port ${port}`);
});
