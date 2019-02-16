/**
 * index.ts
 *
 * OpenAPI Editor
 */
import path from 'path';
import fs from 'fs';
import colors from 'colors';
import express from 'express';
import serveStatic from 'serve-static';
import config from './config';

interface Options {
  oasFilePath: string;
  port?: number;
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
  console.log('*** OpenAPI Editor Options:', options);
  console.log('config: ', config);

  if (!fs.existsSync(options.oasFilePath)) {
    console.error(colors.red(`The OAS file provided ${options.oasFilePath} does not exist.`));
    return;
  }
  const app = require('connect')();
  // save the file from swagger-editor
  app.use(SWAGGER_EDITOR_SAVE_PATH, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.method !== 'PUT') { return next(); }

    const stream = fs.createWriteStream(options.oasFilePath);
    req.pipe(stream);

    stream.on('finish', () => {
      res.end('ok');
    });
  });

  // retrieve the project swagger file for the swagger-editor
  app.use(SWAGGER_EDITOR_LOAD_PATH, serveStatic(options.oasFilePath));

  app.use(SWAGGER_EDITOR_CONFIG_PATH, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.method !== 'GET') { return next(); }
    res.end(JSON.stringify(config.editorConfig));
  });

  // load swagger-editor with use custom index
  app.use(SWAGGER_EDITOR_SERVE_PATH, serveStatic(path.resolve(__dirname, '..', 'src/')));
  app.use(SWAGGER_EDITOR_UI_PATH, serveStatic(config.editorDir));

  const editorIndexFile = `${config.editorDir}/index.html`;

};
