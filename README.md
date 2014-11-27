winjs-customcontrols
====================

Useful custom controls to use with the open-source WinJS library.

InputPopup.js
-------------
![alt-tag](https://raw.githubusercontent.com/limefrogyank/winjs-customcontrols/master/images/InputPopup.png)

This is an alternative to using ContentDialog (it does not exist in v3.0.1).  Creates a popup dialog with input and light-dismiss behavior.

To use, place this somewhere in your html:
```
<div data-win-control="WinJS.UI.Custom.InputPopup"
     data-win-options="{content: 'Enter name', primaryButton: 'OK', 
                        secondaryButton: 'Cancel', type: 'text' }"
     id="inputPopup"></div>
```
Set the type using the options.  Default is 'text'.  Use 'password' for a password style input box.

You can attach event handlers to three exposed events:  `dismissed`, `buttonInvoked`, and `inputChanged`

Use the dismissed event to unhook the buttonInvoked and inputChanged handlers.  The buttonInvoked event sends two parameters:
(1) `detail` - 'primary' for the primary button invoked, 'secondary' for the secondary button invoked 
& (2) `value` - if 'primary', this contains the input box's value

Call `inputPopup.winControl.show()` to display it.

NumberStepper.js
----------------
![alt-tag](https://raw.githubusercontent.com/limefrogyank/winjs-customcontrols/master/images/NumberStepper.png)

This is an `<input type="number">` with attached touch-sized buttons to let you step the count up or down.  All values are optional.  The defaults are: value=0, min=0, max=undefined, step=1.

To use:
```
<div data-win-options="{value: 0, min: 0, max: 10, step: 1}"
     data-win-control="WinJS.UI.Custom.NumberStepper"></div>
```



DateTimePicker.js
----------------
![alt-tag](https://raw.githubusercontent.com/limefrogyank/winjs-customcontrols/master/images/DateTimePicker-Time.png)
Same as InputDateTime.js except it works for Windows/WP8/Android/iOS.  In Android or iOS, the native pickers are shown.  In Windows 8 and Windows Phone, the WinJS picker controls are shown.  This control is intended to be used in a Cordova app (Multi-Device Hybrid App template) and requires the Cordova Device plugin for device detection.  A workaround could be accomplished using the browser agent string.  The use is exactly the same as InputDateTime.js.

```
<div data-win-options="{type: 'date', format: 'F j, Y"}"
     data-win-control="WinJS.UI.Custom.DateTimePicker"
     data-win-bind="winControl.currentInput: dataContext.date;
                    winControl.oninputChanged: dateChangedCommandBind"></div>
                                  
<div data-win-options="{type: 'time', format: 'g:i a'}"
     data-win-control="WinJS.UI.Custom.DateTimePicker"
     data-win-bind="winControl.currentInput: dataContext.time;
                    winControl.oninputChanged: timeChangedCommandBind"></div>
```


InputDateTime.js
----------------
This is intended to be used on the latest Android and iOS only.  Android and iOS will now show their native Date and Time pickers when using `<input type="date">` or `<input type="time">`.  WinJS does not currently style these particular input elements.  InputDateTime.js uses a visible `<input type="text">` as a placeholder for the hidden date input.  The styling now fits the rest of WinJS since it uses the styling of a text input.

To use:

```
<div data-win-options="{type: 'date', format: 'F j, Y"}"
     data-win-control="WinJS.UI.Custom.InputDateTime"
     data-win-bind="winControl.currentInput: dataContext.date;
                    winControl.oninputChanged: dateChangedCommandBind"></div>
                                  
<div data-win-options="{type: 'time', format: 'g:i a'}"
     data-win-control="WinJS.UI.Custom.InputDateTime"
     data-win-bind="winControl.currentInput: dataContext.time;
                    winControl.oninputChanged: timeChangedCommandBind"></div>
```
                    
The data-win-options' type value lets you set whether to get a datepicker or timepicker.  Datepicker is the default.  The format value lets you specify how the date or time is displayed.  See the format extension function for details on how the format string can be created.
