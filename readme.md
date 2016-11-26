# Smartphone keyboard in the browser

Detecting opening and closing keyboard in smartphone browser

## Problem description

The main issue is that it is not enough to add listener to focus and blur on input elements.
For example android has a button that close keyboard and input field wouldn't lose its focus, therefore the solution must be smarter.


Yeah, and in addition we can't use "showkeyboard" and "hidekeyboard", case it wouldn't work in regural browser


