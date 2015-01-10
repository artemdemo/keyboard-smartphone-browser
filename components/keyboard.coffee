

class Keyboard

  OPEN_KEYBOARD_CLASS = 'keyboard-open'

  initWindowSize =
    height: 0
    width: 0

  hasFocusedInput = false

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
    this.windowResizeListener()
    this.focusListeners();

  ##
  ## Bind listener to window resizing
  ##
  windowResizeListener: () ->
    window.addEventListener 'resize', () ->
      bodyTag = document.getElementsByTagName('body')[0]
      if ( initWindowSize.height > window.innerHeight )
        if bodyTag.className.indexOf( OPEN_KEYBOARD_CLASS ) == -1
          bodyTag.className += bodyTag.className + ' ' + OPEN_KEYBOARD_CLASS
      else
        bodyTag.className = bodyTag.className.replace( OPEN_KEYBOARD_CLASS, '' )

  ##
  ## Binding focus and blur listeners to input and textarea elements
  ##
  focusListeners: () ->
    inputs = document.getElementsByTagName 'input'
    textareas = document.getElementsByTagName 'textarea'

    for input in inputs
      setUniqueId( input );
      input.addEventListener 'focus', () -> focusAction.apply( this )
      input.addEventListener 'blur', () -> blurAction.apply( this )

    for textarea in textareas
      setUniqueId( textarea );
      textarea.addEventListener 'focus', () -> focusAction.apply( this )
      textarea.addEventListener 'blur', () -> blurAction.apply( this )

    return true

  ##
  ## This function will fired when input or textarea will get focus
  ##
  focusAction = () ->
    console.log( this )
    bodyTag = document.getElementsByTagName('body')[0]
    if bodyTag.className.indexOf( OPEN_KEYBOARD_CLASS ) == -1
      if this.type != 'checkbox' && this.type != 'radio' && this.type != 'submit'
        bodyTag.className += bodyTag.className + ' ' + OPEN_KEYBOARD_CLASS
    ## I'm using unique id because blur has timeout and will fired with delay
    ## and if user only moved focus from one input to another I don't want to change class to 'closed keyboard'
    hasFocusedInput = getUnigueId( this );

  ##
  ## This function will fired when input or textarea will lose it focus
  ##
  blurAction = () ->
    thisInput = this
    setTimeout(
      () ->
        if hasFocusedInput == getUnigueId( thisInput )
          bodyTag = document.getElementsByTagName('body')[0]
          bodyTag.className = bodyTag.className.replace( OPEN_KEYBOARD_CLASS, '' )
          hasFocusedInput = false
      500)

  ##
  ## Adding unique id to the given element
  ##
  setUniqueId = ( elm ) ->
    elm.setAttribute( 'data-inque-id', getRandomId() )

  ##
  ## Return unique id of the given element
  ##
  getUnigueId = ( elm ) ->
    elm.getAttribute( 'data-inque-id' )

  ##
  ## Creating random ID
  ## I need this ID in order to allow delay in blur function
  ## (delay I need, case keyvboard is opening and closing with animation)
  ##
  getRandomId = () ->
    return Math.floor((Math.random() * 9999999) + 1);




window.onload = () ->
  kb = new Keyboard