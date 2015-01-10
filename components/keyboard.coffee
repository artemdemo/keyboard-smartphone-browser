

class Keyboard

  OPEN_KEYBOARD_CLASS = 'keyboard-open'

  initWindowSize =
    height: 0
    width: 0

  constructor: () ->
    ## I'm using timeout case if page is loaded and keyboard is still open it will capture the size of small window
    setTimeout(
      () ->
        initWindowSize.height = window.innerHeight
        initWindowSize.width = window.innerWidth
        console.log( initWindowSize )
        return true
      600
    )
    this.bindListeners()

  bindListeners: () ->
    ## I need both window and focus listeners, case only one of them isn't providing enough data
    this.windowResizeListener();
    this.focusListeners();

  ##
  ## Bind listener to window resizing
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
          if input.type != 'checkbox' && input.type != 'radio' && input.type != 'submit'
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