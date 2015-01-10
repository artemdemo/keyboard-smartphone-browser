var Keyboard;

Keyboard = (function() {
  var OPEN_KEYBOARD_CLASS, blurAction, focusAction, getRandomId, getUnigueId, hasFocusedInput, initWindowSize, setUniqueId;

  OPEN_KEYBOARD_CLASS = 'keyboard-open';

  initWindowSize = {
    height: 0,
    width: 0
  };

  hasFocusedInput = false;

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
    return window.addEventListener('resize', function() {
      var bodyTag;
      bodyTag = document.getElementsByTagName('body')[0];
      if (initWindowSize.height > window.innerHeight) {
        if (bodyTag.className.indexOf(OPEN_KEYBOARD_CLASS) === -1) {
          return bodyTag.className += bodyTag.className + ' ' + OPEN_KEYBOARD_CLASS;
        }
      } else {
        return bodyTag.className = bodyTag.className.replace(OPEN_KEYBOARD_CLASS, '');
      }
    });
  };

  Keyboard.prototype.focusListeners = function() {
    var input, inputs, textarea, textareas, _i, _j, _len, _len1;
    inputs = document.getElementsByTagName('input');
    textareas = document.getElementsByTagName('textarea');
    for (_i = 0, _len = inputs.length; _i < _len; _i++) {
      input = inputs[_i];
      setUniqueId(input);
      input.addEventListener('focus', function() {
        return focusAction.apply(this);
      });
      input.addEventListener('blur', function() {
        return blurAction.apply(this);
      });
    }
    for (_j = 0, _len1 = textareas.length; _j < _len1; _j++) {
      textarea = textareas[_j];
      setUniqueId(textarea);
      textarea.addEventListener('focus', function() {
        return focusAction.apply(this);
      });
      textarea.addEventListener('blur', function() {
        return blurAction.apply(this);
      });
    }
    return true;
  };

  focusAction = function() {
    var bodyTag;
    console.log(this);
    bodyTag = document.getElementsByTagName('body')[0];
    if (bodyTag.className.indexOf(OPEN_KEYBOARD_CLASS) === -1) {
      if (this.type !== 'checkbox' && this.type !== 'radio' && this.type !== 'submit') {
        bodyTag.className += bodyTag.className + ' ' + OPEN_KEYBOARD_CLASS;
      }
    }
    return hasFocusedInput = getUnigueId(this);
  };

  blurAction = function() {
    var thisInput;
    thisInput = this;
    return setTimeout(function() {
      var bodyTag;
      if (hasFocusedInput === getUnigueId(thisInput)) {
        bodyTag = document.getElementsByTagName('body')[0];
        bodyTag.className = bodyTag.className.replace(OPEN_KEYBOARD_CLASS, '');
        return hasFocusedInput = false;
      }
    }, 500);
  };

  setUniqueId = function(elm) {
    return elm.setAttribute('data-inque-id', getRandomId());
  };

  getUnigueId = function(elm) {
    return elm.getAttribute('data-inque-id');
  };

  getRandomId = function() {
    return Math.floor((Math.random() * 9999999) + 1);
  };

  return Keyboard;

})();

window.onload = function() {
  var kb;
  return kb = new Keyboard;
};
