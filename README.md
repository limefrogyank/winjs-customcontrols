winjs-customcontrols
====================

Useful custom controls to use with the open-source WinJS library.

InputDateTime.js
----------------
This is intended to be used on the latest Android and iOS only.  Android and iOS will now show their native Date and Time pickers when using `<input type="date">` or `<input type="time">`.  WinJS does not currently style these particular input elements.  InputDateTime.js uses a visible `<input type="text">` as a placeholder for the hidden date input.  The styling now fits the rest of WinJS since it uses the styling of a text input.

To use:

```
<div data-win-options="{type: 'date'}"
     data-win-control="WinJS.UI.Custom.InputDateTime"
     data-win-bind="winControl.currentInput: dataContext.date;
                    winControl.oninputChanged: dateChangedCommandBind"></div>
                                  
<div data-win-options="{type: 'time'}"
     data-win-control="WinJS.UI.Custom.InputDateTime"
     data-win-bind="winControl.currentInput: dataContext.time;
                    winControl.oninputChanged: timeChangedCommandBind"></div>
```
                    
The data-win-options' type value lets you set whether to get a datepicker or timepicker.  Datepicker is the default.

DateTimePicker.js
----------------
Same as InputDateTime.js except it works for Windows/WP8/Android/iOS.  In Android or iOS, the native pickers are shown.  In Windows 8 and Windows Phone, the WinJS picker controls are shown.  This control is intended to be used in a Cordova app (Multi-Device Hybrid App template) and requires the Cordova Device plugin for device detection.  A workaround could be accomplished using the browser agent string.  The use is exactly the same as InputDateTime.js.

```
<div data-win-options="{type: 'date'}"
     data-win-control="WinJS.UI.Custom.DateTimePicker"
     data-win-bind="winControl.currentInput: dataContext.date;
                    winControl.oninputChanged: dateChangedCommandBind"></div>
                                  
<div data-win-options="{type: 'time'}"
     data-win-control="WinJS.UI.Custom.DateTimePicker"
     data-win-bind="winControl.currentInput: dataContext.time;
                    winControl.oninputChanged: timeChangedCommandBind"></div>
```
