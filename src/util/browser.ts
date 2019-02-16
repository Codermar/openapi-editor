
import Child from 'child_process';
import config from './config';

const platformOpeners: any = {
  darwin(url: string, cb: (err: any) => void) {
    const browser = escape(config.browser);
    if (browser) {
      open('open -a ' + browser, url, cb);
    } else {
      open('open', url, cb);
    }
  },

  win32(url: string, cb: (err: any) => void) {
    const browser = escape(config.browser);
    if (browser) {
      open('start "" "' + browser + '"', url, cb);
    } else {
      open('start ""', url, cb);
    }
  },

  linux(url: string, cb: (err: any) => void) {
    const browser = escape(config.browser);
    if (browser) {
      open(browser, url, cb);
    } else {
      open('xdg-open', url, cb);
    }
  },

  other(url: string, cb: (err: any) => void) {
    const browser = escape(config.browser);
    if (browser) {
      open(browser, url, cb);
    } else {
      cb(new Error('must specify browser in config'));
    }
  },
};

// note: platform parameter is just for testing...
function platformOpen(url: string, cb: (err: any) => void, platform?: string) {
  platform = platform || process.platform;
  if (!platformOpeners[platform]) { platform = 'other'; }
  platformOpeners[platform](url, cb);
}

function open(command: any, url: string, cb: (err: any) => void) {
  if (config.debug) { console.log('command: ' + command); }
  console.log('Opening browser to: ' + url);
  Child.exec(command + ' "' + escape(url) + '"', cb);
}

function escape(s: string) {
  if (!s) { return s; }
  return s.replace(/"/g, '\\\"');
}
// const escape = (s: string) => !s ? s : s.replace(/"/g, '\\\"');

export default {
  open: platformOpen,
};
