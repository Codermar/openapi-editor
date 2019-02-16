
import path from 'path';

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
  rootDir: path.resolve(__dirname, '..'),
  editorDir: '',
  userHome: process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
  debug: !!process.env.DEBUG,
  nodeModules: '',
  editorConfig: {}, // placeholder for now. Not much is configurable in swagger-editor 3.x
  browser: '',
};

config.nodeModules = path.resolve(config.rootDir, 'node_modules');
config.editorDir = path.resolve(config.nodeModules, 'swagger-editor-dist');

export default config;
