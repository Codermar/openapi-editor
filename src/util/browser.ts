
import Child from 'child_process';
import config from './config';

const platformOpeners: any = {
  darwin(url: string, cb: (err: any) => void) {
    const browser = escape(config.browser);
    if (browser) {
      openBrowser(`Open -a ${browser}`, url, cb);
    } else {
      openBrowser('Open', url, cb);
    }
  },

  win32(url: string, cb: (err: any) => void) {
    const browser = escape(config.browser);
    if (browser) {
      openBrowser(`Start ${browser}`, url, cb);
    } else {
      openBrowser('Start ""', url, cb);
    }
  },

  linux(url: string, cb: (err: any) => void) {
    const browser = escape(config.browser);
    if (browser) {
      openBrowser(browser, url, cb);
    } else {
      openBrowser('xdg-open', url, cb);
    }
  },

  other(url: string, cb: (err: any) => void) {
    const browser = escape(config.browser);
    if (browser) {
      openBrowser(browser, url, cb);
    } else {
      cb(new Error('must specify browser in config'));
    }
  },
};

// note: platform parameter is just for testing...
function open(url: string, cb: (err: any) => void, platform?: string) {
  platform = platform || process.platform;
  if (!platformOpeners[platform]) { platform = 'other'; }
  platformOpeners[platform](url, cb);
}

function openBrowser(command: any, url: string, cb: (err: any) => void) {
  if (config.debug) { console.log(`command: ${command}`); }
  console.log(`Opening browser to: ${url}`);
  Child.exec(`${command} "${escape(url)}"`, cb);
}

const escape = (s: string) => !s ? s : s.replace(/"/g, '\\\"');

export default {
  open,
};
