
import path from 'path';
import fs from 'fs';
import colors from 'colors';

interface Config {
  name: string;
  rootDir: string;
  editorPath: string;
  userHome?: string;
  debug: boolean;
  nodeModules: string;
  editorConfig: object;
  browser: string;
}

const config: Config = {
  name: 'OpenAPI Swagger Editor',
  rootDir: path.resolve(__dirname, '../../'),
  editorPath: require.resolve('swagger-editor-dist'),
  userHome: process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
  debug: !!process.env.DEBUG,
  nodeModules: '',
  editorConfig: {}, // placeholder for now. Not much is configurable in swagger-editor 3.x
  browser: '',
};

config.nodeModules = path.resolve(config.rootDir, 'node_modules');
config.editorPath = path.dirname(config.editorPath);

if (!fs.existsSync(config.nodeModules)) {
  console.error(colors.red(`Node modules path ${config.nodeModules} does not exist.`));
}
if (!fs.existsSync(config.editorPath)) {
  console.error(colors.red(`Editor dist path ${config.editorPath} does not exist.`));
}

export default config;
