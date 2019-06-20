#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const colors_1 = __importDefault(require("colors"));
const serve_static_1 = __importDefault(require("serve-static"));
const config_1 = __importDefault(require("./util/config"));
const browser_1 = __importDefault(require("./util/browser"));
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
exports.edit = (options) => {
    if (!fs_1.default.existsSync(options.file)) {
        console.error(colors_1.default.red(`The OpenAPI file provided ${options.file} does not exist.`));
        return;
    }
    const app = require('connect')();
    // save the file from swagger-editor
    app.use(SWAGGER_EDITOR_SAVE_PATH, (req, res, next) => {
        if (req.method !== 'PUT') {
            return next();
        }
        const stream = fs_1.default.createWriteStream(options.file);
        req.pipe(stream);
        stream.on('finish', () => {
            res.end('ok');
        });
    });
    // retrieve the project swagger file for the swagger-editor
    app.use(SWAGGER_EDITOR_LOAD_PATH, serve_static_1.default(options.file));
    app.use(SWAGGER_EDITOR_CONFIG_PATH, (req, res, next) => {
        if (req.method !== 'GET') {
            return next();
        }
        res.end(JSON.stringify(config_1.default.editorConfig));
    });
    // load swagger-editor with use custom index
    app.use(SWAGGER_EDITOR_SERVE_PATH, serve_static_1.default(path_1.default.resolve(__dirname, '..', 'src/')));
    app.use(SWAGGER_EDITOR_UI_PATH, serve_static_1.default(config_1.default.editorPath));
    // start editor in browser //
    const http = require('http');
    const server = http.createServer(app);
    const hostname = options.host || '127.0.0.1';
    let port = options.port || 0;
    let editorUrl;
    server.listen(port, hostname, () => {
        port = server.address().port;
        editorUrl = util_1.default.format('http://%s:%d/?url=/oas/spec', hostname, port);
        const editApiUrl = util_1.default.format('http://%s:%d/oas/spec', hostname, port);
        const dontKillMessage = '- Do not terminate this process or close this window until finished editing -';
        console.log(colors_1.default.green(`*** ${config_1.default.name} ***`));
        if (!options.silent) {
            browser_1.default.open(editorUrl, (err) => {
                if (err) {
                    console.error(err);
                }
                console.log(colors_1.default.gray(dontKillMessage));
            });
        }
        else {
            console.log(`Running ${config_1.default.name} server. You can make GET and PUT calls to ${editApiUrl}`);
            console.log(colors_1.default.gray(dontKillMessage));
        }
    });
};
exports.default = exports.edit;
