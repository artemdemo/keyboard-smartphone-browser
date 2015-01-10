var Keyboard;

Keyboard = (function() {
  var OPEN_KEYBOARD_CLASS, blurAction, blurTimeout, focusAction, getRandomId, getUniqueId, hasFocusedInput, initWindowSize, setUniqueId;

  OPEN_KEYBOARD_CLASS = 'keyboard-open';

  initWindowSize = {
    height: 0,
    width: 0
  };


  /*
   * If there is focused input element, this variable will contain it unique id
   * otherwise it will be 'false'
   */

  hasFocusedInput = false;


  /*
   * Blur will fire with timeout, in case user select again element that will be blured timeout should be canceled
   */

  blurTimeout = null;

  function Keyboard() {

    /*
     * I'm using timeout case if page is loaded and keyboard is still open it will capture the size of small window
     * Keyboard will be opened if page was reloaded while input element was focused
     */
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


  /*
   * Bind listener to window resizing
   */

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


  /*
   * Binding focus and blur listeners to input and textarea elements
   */

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


  /*
   * This function will fired when input or textarea will get focus
   */

  focusAction = function() {
    var bodyTag;
    bodyTag = document.getElementsByTagName('body')[0];
    if (bodyTag.className.indexOf(OPEN_KEYBOARD_CLASS) === -1) {
      if (this.type !== 'checkbox' && this.type !== 'radio' && this.type !== 'submit') {
        bodyTag.className += bodyTag.className + ' ' + OPEN_KEYBOARD_CLASS;
      }
    }

    /*
     * I'm using unique id because blur has timeout and will fired with delay
     * and if user only moved focus from one input to another I don't want to change class to 'closed keyboard'
     */
    hasFocusedInput = getUniqueId(this);
    if (hasFocusedInput === getUniqueId(this) && blurTimeout !== null) {
      return clearTimeout(blurTimeout);
    }
  };


  /*
   * This function will fired when input or textarea will lose it focus
   */

  blurAction = function() {
    var thisInput;
    thisInput = this;
    return blurTimeout = setTimeout(function() {
      var bodyTag;
      if (hasFocusedInput === getUniqueId(thisInput)) {
        bodyTag = document.getElementsByTagName('body')[0];
        bodyTag.className = bodyTag.className.replace(OPEN_KEYBOARD_CLASS, '');
        hasFocusedInput = false;
        return blurTimeout = null;
      }
    }, 500);
  };


  /*
   * Adding unique id to the given element
   */

  setUniqueId = function(elm) {
    return elm.setAttribute('data-unique-id', getRandomId());
  };


  /*
   * Return unique id of the given element
   */

  getUniqueId = function(elm) {
    return elm.getAttribute('data-unique-id');
  };


  /*
   * Creating random ID
   * I need this ID in order to allow delay in blur function
   * (delay I need, case keyboard is opening and closing with animation)
   */

  getRandomId = function() {
    return Math.floor((Math.random() * 9999999) + 1);
  };

  return Keyboard;

})();

window.onload = function() {
  return new Keyboard;
};
