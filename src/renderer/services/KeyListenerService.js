const ioHook = require('iohook');

export default class KeyListenerService {
  constructor () {
    ioHook.on('keypress', (event) => {
      console.log(event);
      // {keychar: 'f', keycode: 19, rawcode: 15, type: 'keypress'}
    });
    ioHook.start();
  }
}
