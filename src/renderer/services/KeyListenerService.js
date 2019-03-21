
export default class KeyListenerService {
  startHook () {
    const ioHook = require('iohook');
    debugger;
    ioHook.on('keypress', (event) => {
      console.log(event);
    });
    ioHook.start();
  }
}
