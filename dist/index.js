#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const colors_1 = __importDefault(require("colors"));
const commander_1 = __importDefault(require("commander"));
const editor_1 = require("./editor");
commander_1.default
    .version('0.5.3', '-v, --version')
    .option('-f, --file [file]', 'File')
    .option('-h, --host [host]', 'Host')
    .option('-p, --port [port]', 'Port')
    .option('-s --silent', 'Run without launching the browser')
    .parse(process.argv);
const file = path_1.default.resolve(commander_1.default.file || 'src/api/v1/api.yaml');
if (!fs_1.default.existsSync(file)) {
    console.error(colors_1.default.red(`The OpenAPI file provided ${file} does not exist.`));
}
const options = Object.assign({ file }, commander_1.default.port && { port: commander_1.default.port }, commander_1.default.host && { host: commander_1.default.host }, { silent: commander_1.default.silent });
editor_1.edit(options);
