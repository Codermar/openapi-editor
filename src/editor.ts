#!/usr/bin/env node
/**
 * index.ts
 *
 * OpenAPI Editor
 */
import path from 'path';
import fs from 'fs';
import util from 'util';
import colors from 'colors';
import express from 'express';
import serveStatic from 'serve-static';
import config from './util/config';
import browser from './util/browser';

export interface Options {
  file: string;
  host?: string;
  port?: string;
  silent?: boolean; // invoque browser or run silently
}

// swagger-editor must be served from root
const SWAGGER_EDITOR_SERVE_PATH = '/';
// swagger-editor expects to GET the file here
const SWAGGER_EDITOR_LOAD_PATH = '/oas/spec';
// swagger-editor PUTs the file back here
const SWAGGER_EDITOR_SAVE_PATH = '/oas/spec';
// map dir for UI
const SWAGGER_EDITOR_UI_PATH = '/swagger-editor';
// swagger-editor GETs the configuration files
const SWAGGER_EDITOR_CONFIG_PATH = '/config/defaults.json';

export const edit = (options: Options): void => {
  if (!fs.existsSync(options.file)) {
    console.error(colors.red(`The OpenAPI file provided ${options.file} does not exist.`));
    return;
  }
  const app = require('connect')();
  // save the file from swagger-editor
  app.use(SWAGGER_EDITOR_SAVE_PATH, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.method !== 'PUT') { return next(); }

    const stream = fs.createWriteStream(options.file);
    req.pipe(stream);

    stream.on('finish', () => {
      res.end('ok');
    });
  });

  // retrieve the project swagger file for the swagger-editor
  app.use(SWAGGER_EDITOR_LOAD_PATH, serveStatic(options.file));

  app.use(SWAGGER_EDITOR_CONFIG_PATH, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.method !== 'GET') { return next(); }
    res.end(JSON.stringify(config.editorConfig));
  });

  // load swagger-editor with use custom index
  app.use(SWAGGER_EDITOR_SERVE_PATH, serveStatic(path.resolve(__dirname, '..', 'src/')));
  app.use(SWAGGER_EDITOR_UI_PATH, serveStatic(config.editorPath));

  // start editor in browser //
  const http = require('http');
  const server = http.createServer(app);
  const hostname = options.host || '127.0.0.1';
  let port = options.port || 0;
  let editorUrl;

  server.listen(port, hostname, () => {
    port = server.address().port;
    editorUrl = util.format('http://%s:%d/?url=/oas/spec', hostname, port);
    const editApiUrl = util.format('http://%s:%d/oas/spec', hostname, port);
    const dontKillMessage = '- Do not terminate this process or close this window until finished editing -';

    console.log(colors.green(`*** ${config.name} ***`));

    if (!options.silent) {
      browser.open(editorUrl, (err: any) => {
        if (err) {
          console.error(err);
        }
        console.log(colors.gray(dontKillMessage));
      });
    } else {
      console.log(`Running ${config.name} server. You can make GET and PUT calls to ${editApiUrl}`);
      console.log(colors.gray(dontKillMessage));
    }
  });
};

export default edit;
