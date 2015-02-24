winjs-customcontrols
====================

Useful custom controls to use with the open-source WinJS library.  From January 2015, I will be writing everything using Typescript since it is so much easier to use. :)

CustomFlyout.ts
---------------
![alt-tag](https://raw.githubusercontent.com/limefrogyank/winjs-customcontrols/master/images/CustomFlyout.png)

This is modeled on the SettingsFlyout control that comes with WinJS2.0.  However, in the original WinJS control, the LightDismiss feature is permanently on and you have to open and close the panel using methods on the control.  I wrote this CustomFlyout in order to control the opening and closing by switching a single property 'isOpen'.  This means you can now open and close the flyout using binding.  In addition, you can turn off LightDismiss and keep the panel open.  The panel will resize itself when the screen width changes to a width that is close to or smaller than the panel's width.  An opened and closed event are provided so that you can adjust your viewmodel when the panel opens or closes by other means.

Here's an example of how to use it:
```
<div id="selectionFlyout" aria-label="Selection Flyout"
     data-win-control="WinJS.UI.Custom.CustomFlyout"
     data-win-options="{isLightDismiss: true, width: 636}"
     data-win-bind="winControl.isOpen: dataContext.isFlyoutOpen;
                    winControl.onclosed: customFlyoutBind;
                    winControl.onopened: customFlyoutBind">
 <!-- Put your controls for the panel here. -->
</div>
```
Note: If you are using a UI click behavior to open and close this flyout (i.e. a button) AND you have isLightDismiss set to true, you'll need to stopPropagation of the event on your button for closing the flyout.  This control sets a document-level event handler for clicks when open and, for now, setting the internal isOpen property to false *twice* causes some problems.

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

NumberStepper.ts
----------------
![alt-tag](https://raw.githubusercontent.com/limefrogyank/winjs-customcontrols/master/images/NumberStepper.png)

This is an `<input type="number">` with attached touch-sized buttons to let you step the count up or down.  All values are optional.  The defaults are: value=0, min=0, max=undefined, step=1.

To use:
```
<div data-win-options="{value: 0, min: 0, max: 10, step: 1}"
     data-win-control="WinJS.UI.Custom.NumberStepper"></div>
```
This is a Typescript version of the control.  The old JS version is in the oldJS folder.


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
