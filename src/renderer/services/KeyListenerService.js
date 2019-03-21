const ioHook = require('iohook');

export default class KeyListenerService {
  constructor () {
    ioHook.on('keypress', (event) => {
      console.log(event);
    });
  }

  startHook () {
    ioHook.start();
  }
}
