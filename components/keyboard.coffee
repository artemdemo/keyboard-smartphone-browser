

class Keyboard

  OPEN_KEYBOARD_CLASS = 'keyboard-open'

  initWindowSize =
    height: 0
    width: 0

  constructor: () ->
    initWindowSize.height = window.innerHeight
    initWindowSize.width = window.innerWidth
    this.bindListeners()

  bindListeners: () ->
    this.windowResizeListener();

  ##
  ## Bin listener to window resizing
  ##
  windowResizeListener: () ->
    body = document.getElementsByTagName('body')[0]

    window.addEventListener 'resize', () ->
      if ( initWindowSize.height > window.innerHeight )
        if body.className.indexOf( OPEN_KEYBOARD_CLASS ) == -1
          body.className += body.className + ' ' + OPEN_KEYBOARD_CLASS
      else
        body.className = body.className.replace( OPEN_KEYBOARD_CLASS, '' )

  ##
  ## Binding focus and blur listeners to input and textarea elements
  ##
  focusListeners: () ->
    inputs = document.getElementsByTagName 'input'
    textareas = document.getElementsByTagName 'textarea'
    body = document.getElementsByTagName('body')[0]

    for input in inputs
      input.addEventListener 'focus', () ->
        if body.className.indexOf( OPEN_KEYBOARD_CLASS ) == -1
          body.className += body.className + ' ' + OPEN_KEYBOARD_CLASS
      input.addEventListener 'blur', () ->
        body.className = body.className.replace( OPEN_KEYBOARD_CLASS, '' )

    for textarea in textareas
      textarea.addEventListener 'focus', () ->
        if body.className.indexOf( OPEN_KEYBOARD_CLASS ) == -1
          body.className += body.className + ' ' + OPEN_KEYBOARD_CLASS
      textarea.addEventListener 'blur', () ->
        body.className = body.className.replace( OPEN_KEYBOARD_CLASS, '' )

    return true



window.onload = () ->
  kb = new Keyboard