"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const config_1 = __importDefault(require("./config"));
const platformOpeners = {
    darwin(url, cb) {
        const browser = escape(config_1.default.browser);
        if (browser) {
            openBrowser(`Open -a ${browser}`, url, cb);
        }
        else {
            openBrowser('Open', url, cb);
        }
    },
    win32(url, cb) {
        const browser = escape(config_1.default.browser);
        if (browser) {
            openBrowser(`Start ${browser}`, url, cb);
        }
        else {
            openBrowser('Start ""', url, cb);
        }
    },
    linux(url, cb) {
        const browser = escape(config_1.default.browser);
        if (browser) {
            openBrowser(browser, url, cb);
        }
        else {
            openBrowser('xdg-open', url, cb);
        }
    },
    other(url, cb) {
        const browser = escape(config_1.default.browser);
        if (browser) {
            openBrowser(browser, url, cb);
        }
        else {
            cb(new Error('must specify browser in config'));
        }
    },
};
// note: platform parameter is just for testing...
function open(url, cb, platform) {
    platform = platform || process.platform;
    if (!platformOpeners[platform]) {
        platform = 'other';
    }
    platformOpeners[platform](url, cb);
}
function openBrowser(command, url, cb) {
    if (config_1.default.debug) {
        console.log(`command: ${command}`);
    }
    console.log(`Opening browser to: ${url}`);
    child_process_1.default.exec(`${command} "${escape(url)}"`, cb);
}
const escape = (s) => !s ? s : s.replace(/"/g, '\\\"');
exports.default = {
    open,
};
