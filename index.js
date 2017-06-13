const express = require('express');
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');
const fs = require('fs');

const app = express();
const argv = process.argv.splice(2);
const port = process.env.port || argv['1'] || 9090;
const pubFolder = process.env.dir || argv['0'] || __dirname;
const folderRWE = (7 * 8 * 8) + (0 * 8) + 0;
console.log(`INFO: publish dir ${pubFolder}`);


if (!fs.existsSync(pubFolder)) {
  console.log(`DEBUG: make dir ${pubFolder}, with rwx as ${folderRWE}`);
  fs.mkdirSync(pubFolder, folderRWE);
}

app.use('/', serveIndex(pubFolder, { view: 'details', icons: true }));
app.use('/', serveStatic(pubFolder));

app.listen(port, () => {
  console.log(`INFO: webserver is running on port ${port}`);
});
