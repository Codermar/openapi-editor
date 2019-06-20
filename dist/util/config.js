"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const colors_1 = __importDefault(require("colors"));
const config = {
    name: 'OpenAPI Swagger Editor',
    rootDir: path_1.default.resolve(__dirname, '../../'),
    editorPath: require.resolve('swagger-editor-dist'),
    userHome: process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
    debug: !!process.env.DEBUG,
    nodeModules: '',
    editorConfig: {},
    browser: '',
};
config.nodeModules = path_1.default.resolve(config.rootDir, 'node_modules');
config.editorPath = path_1.default.dirname(config.editorPath);
if (!fs_1.default.existsSync(config.nodeModules)) {
    console.error(colors_1.default.red(`Node modules path ${config.nodeModules} does not exist.`));
}
if (!fs_1.default.existsSync(config.editorPath)) {
    console.error(colors_1.default.red(`Editor dist path ${config.editorPath} does not exist.`));
}
exports.default = config;
