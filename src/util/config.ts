
import path from 'path';
import fs from 'fs';
import colors from 'colors';

interface Config {
  rootDir: string;
  editorDir: string;
  userHome?: string;
  debug: boolean;
  nodeModules: string;
  editorConfig: object;
  browser: string;
}

const config: Config = {
  rootDir: path.resolve(__dirname, '../../'),
  editorDir: '',
  userHome: process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
  debug: !!process.env.DEBUG,
  nodeModules: '',
  editorConfig: {}, // placeholder for now. Not much is configurable in swagger-editor 3.x
  browser: '',
};

config.nodeModules = path.resolve(config.rootDir, 'node_modules');
config.editorDir = path.resolve(config.nodeModules, 'swagger-editor-dist');

if (!fs.existsSync(config.nodeModules)) {
  console.error(colors.red(`Node modules path ${config.nodeModules} does not exist.`));
}
if (!fs.existsSync(config.editorDir)) {
  console.error(colors.red(`Editor dist path ${config.editorDir} does not exist.`));
}

export default config;
