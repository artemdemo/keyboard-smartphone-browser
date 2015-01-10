var Keyboard;

Keyboard = (function() {
  var OPEN_KEYBOARD_CLASS, initWindowSize;

  OPEN_KEYBOARD_CLASS = 'keyboard-open';

  initWindowSize = {
    height: 0,
    width: 0
  };

  function Keyboard() {
    setTimeout(function() {
      initWindowSize.height = window.innerHeight;
      initWindowSize.width = window.innerWidth;
      console.log(initWindowSize);
      return true;
    }, 600);
    this.bindListeners();
  }

  Keyboard.prototype.bindListeners = function() {
    this.windowResizeListener();
    return this.focusListeners();
  };

  Keyboard.prototype.windowResizeListener = function() {
    var body;
    body = document.getElementsByTagName('body')[0];
    return window.addEventListener('resize', function() {
      if (initWindowSize.height > window.innerHeight) {
        if (body.className.indexOf(OPEN_KEYBOARD_CLASS) === -1) {
          return body.className += body.className + ' ' + OPEN_KEYBOARD_CLASS;
        }
      } else {
        return body.className = body.className.replace(OPEN_KEYBOARD_CLASS, '');
      }
    });
  };

  Keyboard.prototype.focusListeners = function() {
    var body, input, inputs, textarea, textareas, _i, _j, _len, _len1;
    inputs = document.getElementsByTagName('input');
    textareas = document.getElementsByTagName('textarea');
    body = document.getElementsByTagName('body')[0];
    for (_i = 0, _len = inputs.length; _i < _len; _i++) {
      input = inputs[_i];
      input.addEventListener('focus', function() {
        if (body.className.indexOf(OPEN_KEYBOARD_CLASS) === -1) {
          if (input.type !== 'checkbox' && input.type !== 'radio' && input.type !== 'submit') {
            return body.className += body.className + ' ' + OPEN_KEYBOARD_CLASS;
          }
        }
      });
      input.addEventListener('blur', function() {
        return body.className = body.className.replace(OPEN_KEYBOARD_CLASS, '');
      });
    }
    for (_j = 0, _len1 = textareas.length; _j < _len1; _j++) {
      textarea = textareas[_j];
      textarea.addEventListener('focus', function() {
        if (body.className.indexOf(OPEN_KEYBOARD_CLASS) === -1) {
          return body.className += body.className + ' ' + OPEN_KEYBOARD_CLASS;
        }
      });
      textarea.addEventListener('blur', function() {
        return body.className = body.className.replace(OPEN_KEYBOARD_CLASS, '');
      });
    }
    return true;
  };

  return Keyboard;

})();

window.onload = function() {
  var kb;
  return kb = new Keyboard;
};
