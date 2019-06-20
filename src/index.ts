#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import colors from 'colors';
import cmd from 'commander';
import { edit } from './editor';

cmd
  .version('0.5.3', '-v, --version')
  .option('-f, --file [file]', 'File')
  .option('-h, --host [host]', 'Host')
  .option('-p, --port [port]', 'Port')
  .option('-s --silent', 'Run without launching the browser')
  .parse(process.argv);

const file = path.resolve(cmd.file || 'src/api/v1/api.yaml');

if (!fs.existsSync(file)) {
  console.error(colors.red(`The OpenAPI file provided ${file} does not exist.`));
}

const options = {
  file,
  ...cmd.port && { port: cmd.port },
  ...cmd.host && { host: cmd.host },
  silent: cmd.silent,
};

edit(options);
