(function (WinJS) {
    WinJS.Namespace.define("WinJS.UI", {
        InputDateTime: WinJS.Class.define(function (element, options) {
            if (!element || element.tagName.toLowerCase() !== "div")
                throw "div type must be provided";
            options = options || {};
            this._setElement(element);
            
            element.winControl = this;
            WinJS.UI.setOptions(this, options);

            //create basic text input to click on
            var ti = document.createElement('input');
            this._ti = ti;
            ti.setAttribute("type", "text");
            ti.setAttribute("readonly");

            //if the initialValue is set for some reason already (databinding?), put it into the input's value property... is this necessary?
            if (this._initialValue != null) {
                ti.value = this._initialValue;
            }

            //create the input that will use native date or time pickers
            var di = document.createElement('input');
            this._di = di;

            //check to see which input to use: date or time, use date by default
            if (options.type) {
                this._type = options.type;
                switch (options.type) {
                    case "date":
                        di.setAttribute("type", "date");
                        break;
                    case "time":
                        di.setAttribute("type", "time");
                        break;
                    default:
                        di.setAttribute("type", "date");
                        break;
                }
            } else {
                di.setAttribute("type", "date");
            }
            //this input should be hidden and have very little footprint
            di.setAttribute("style", "width: 1px; height:1px; position:absolute;opacity: 0;");
            ti.setAttribute("style", "position:absolute; z-index:10;margin-bottom: 5px;");

            //listen for a click event on the text input
            ti.addEventListener("focus", function (ev) {
                // the read-only attribute should stop the iOS keyboard from showing, works for android also
                //kill event so keyboard doesn't show, defocus (blur) input
                //ev.preventDefault();
                //ev.stopPropagation();
                //ti.blur();

                //listen for the change event that signals when the native pickers are completed successfully
                di.addEventListener("change", function () {
                    //set the text input value to equal the date/time input value... we can only see the text input value
                    ti.value = di.value;
                    //fire an event that indicates the date/time has changed.  You can win-data-bind to this using "oninputChanged".  The event value uses just the detail parameter to hold a text date/time.
                    element.winControl.dispatchEvent("inputChanged", {
                        detail: ti.value
                    });

                });

                //android doesn't respond to focus() 
                //invoke the native picker by clicking the date or time input
                di.click();
            });

            //ti.addEventListener("click", function (ev) {
            //    //kill event so keyboard doesn't show, defocus (blur) input
            //    ev.preventDefault();
            //    ev.stopPropagation();
            //    ti.blur();

            //    //listen for the change event that signals when the native pickers are completed successfully
            //    di.addEventListener("change", function () {
            //        //set the text input value to equal the date/time input value... we can only see the text input value
            //        ti.value = di.value;
            //        //fire an event that indicates the date/time has changed.  You can win-data-bind to this using "oninputChanged".  The event value uses just the detail parameter to hold a text date/time.
            //        element.winControl.dispatchEvent("inputChanged", {
            //            detail: ti.value
            //        });

            //    });

            //    //invoke the native picker by clicking the date or time input
            //    di.click();
            //});

            //add the two inputs to the div
            
            element.appendChild(di);
            element.appendChild(ti);
        },
            {

                //Private members
                _element: null,
                _ti: null,
                _di: null,
                _initialValue: null,
                _type: null,
                _setElement: function (element) {
                    this._element = element;
                },
                
                //Public members
                element: {
                    get: function () {
                        return this._element;
                    }
                },
                ti: {
                    get: function () {
                        return this._ti;
                    }
                },
                di: {
                    get: function () {
                        return this._di;
                    }
                },
                currentInput: {
                    get: function () {
                        return this._ti.value;
                    },
                    set: function (value) {
                        //convert the value to a date or time only value based on the _type
                        var convertedValue = null;
                        if (this._type == "time")
                            convertedValue = value.toTimeString();
                        else
                            convertedValue = value.toDateString();
                        if (this._ti == null) {
                            this._initialValue = convertedValue;
                        } else {
                            this._ti.value = convertedValue;
                        }
                    }

                }
            })
    });

    //this is required to be able to fire events that can be seen from the control itself
    WinJS.Class.mix(WinJS.UI.InputDateTime,
       WinJS.Utilities.createEventProperties("inputChanged"),
       WinJS.UI.DOMEventMixin);

}(WinJS));
