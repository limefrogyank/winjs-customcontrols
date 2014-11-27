// the valueAsNumber property is inconsistent across all browsers, so this uses value (a string property) only
// and converts on the fly to a number.  This does not use any stepper methods internal to the input, either.  

(function (WinJS) {
    WinJS.Namespace.define("WinJS.UI.Custom", {
        NumberStepper: WinJS.Class.define(function (element, options) {
            if (!element || element.tagName.toLowerCase() !== "div")
                throw "div type must be provided";
            options = options || {};
            this._options = options;

            this._setElement(element);

            if (!options.value)
                options.value = 0;

            if (!options.step)
                options.step = 1;
            
            if (!options.min)
                options.min = 0;
            
            element.winControl = this;
            WinJS.UI.setOptions(this, options);

            element.setAttribute("style", "display:flex;align-items: center;");
            
            //create the input
            
            var ni = document.createElement('input');
            this._setNI(ni);
            ni.setAttribute("type", "number");
            
            ni.setAttribute("style", "vertical-align:middle; flex:1;");
            ni.value = options.value;
            
            //listen for blur (lost focus) so we can signal number change to control and alter buttons if necessary
            ni.addEventListener("blur", function (ev) {
                element.winControl._updateButtons();

                element.winControl.dispatchEvent("valueChanged", {
                    detail: +ni.value
                });
            });

            //create the minus Button
            var minusButton = document.createElement('button');
            this._setMinusButton(minusButton);
            minusButton.setAttribute("style", "min-width:35px; vertical-align:middle; margin-left: 5px;");
            minusButton.innerText = "-";
            if (+ni.value == options.min)
                minusButton.disabled = true;

            //create the plus button
            var plusButton = document.createElement('button');
            this._setPlusButton(plusButton);
            plusButton.setAttribute("style", "min-width:35px; vertical-align:middle; margin-left: 5px;");
            plusButton.innerText = "+";
            if (+ni.value == options.max)
                plusButton.disabled = true;

            //listen for a click events
            plusButton.addEventListener("click", function (ev) {
                ni.value = +ni.value + options.step;
                if (+(ni.value) > options.max)
                    ni.value = options.max;
                element.winControl._updateButtons();

                element.winControl.dispatchEvent("valueChanged", {
                    detail: +ni.value
                });
            });
            minusButton.addEventListener("click", function (ev) {
                ni.value = +ni.value - options.step;
                if (+ni.value < options.min)
                    ni.value = options.min;
                element.winControl._updateButtons();

                element.winControl.dispatchEvent("valueChanged", {
                    detail: +ni.value
                });
            });


            //add the elements to the div
            element.appendChild(ni);
            element.appendChild(minusButton);
            element.appendChild(plusButton);

        },
            {

                //Private members
                _element: null,
                _options: null,
                _control: null,

                _ni:null,
                _minusButton:null,
                _plusButton:null,

                _setElement: function (element) {
                    this._element = element;
                },
                _setNI: function(ni) {
                    this._ni=ni;
                },
                _setPlusButton: function(plusButton) {
                    this._plusButton = plusButton;
                },
                _setMinusButton: function(minusButton) {
                    this._minusButton = minusButton;
                },
                _updateButtons: function() {
                    if (this._ni.valueAsNumber == this._options.max)
                        this._plusButton.disabled = true;
                    else
                        this._plusButton.disabled = false;
                    if (this._ni.valueAsNumber == this._options.min)
                        this._minusButton.disabled = true;
                    else
                        this._minusButton.disabled = false;
                },

                //Public members
                element: {
                    get: function () {
                        return this._element;
                    }
                },
                ni: {
                    get: function () {
                        return this._ni;
                    }
                },
                value: {
                    get: function () {
                        if (this._ni != null)
                            return this._ni.value;
                        else
                            return this._element.value;
                    },
                    set: function (value) {
                        if (this._ni != null) {
                            this._ni.value = value;
                            this._updateButtons();
                        }
                    }

                },
                current: {
                    get: function () {
                        return this._value;
                    }
                }
            })
    });

    //this is required to be able to fire events that can be seen from the control itself
    WinJS.Class.mix(WinJS.UI.Custom.NumberStepper,
       WinJS.Utilities.createEventProperties("valueChanged"),
       WinJS.UI.DOMEventMixin);

}(WinJS));

