(function (WinJS) {
    WinJS.Namespace.define("WinJS.UI.Custom", {
        NumberStepper: WinJS.Class.define(function (element, options) {
            if (!element || element.tagName.toLowerCase() !== "div")
                throw "div type must be provided";
            options = options || {};
            this._options = options;

            this._setElement(element);

            if (!options.value)
//                this._currentInput = options.value;
//            else
                options.value = 0;

            if (!options.step)
//                this._step = options.step;
//            else
                options.step = 1;
            
            if (!options.min)
//                options.min = options.min;
//            else
                options.min = 0;
            
//            if (options.max)
//                options.max = options.max;
            

            element.winControl = this;
            WinJS.UI.setOptions(this, options);
            element.setAttribute("style", "display:flex;align-items: center;");
            
            //create the input
            var ni = document.createElement('input');
            this._setNI(ni);
            ni.setAttribute("type", "number");
            ni.setAttribute("style", "vertical-align:middle; flex:1;");
            ni.valueAsNumber = options.value;
            
            //create the minus Button
            var minusButton = document.createElement('button');
            this._setMinusButton(minusButton);
            minusButton.setAttribute("style", "min-width:35px; vertical-align:middle; margin-left: 5px;");
            minusButton.innerText = "-";
            if (ni.valueAsNumber == options.min)
                minusButton.disabled = true;

            //create the plus button
            var plusButton = document.createElement('button');
            this._setPlusButton(plusButton);
            plusButton.setAttribute("style", "min-width:35px; vertical-align:middle; margin-left: 5px;");
            plusButton.innerText = "+";
            if (ni.valueAsNumber == options.max)
                plusButton.disabled = true;

            //listen for a click events
            plusButton.addEventListener("click", function (ev) {
                ni.valueAsNumber = ni.valueAsNumber + options.step;
                if (ni.valueAsNumber > options.max)
                    ni.valueAsNumber = options.max;
                element.winControl._updateButtons();
                //if (ni.valueAsNumber == options.max)
                //    plusButton.disabled = true;
                //else
                //    plusButton.disabled = false;
                //if (ni.valueAsNumber == options.min)
                //    minusButton.disabled = true;
                //else
                //    minusButton.disabled = false;
                element.winControl.dispatchEvent("inputChanged", {
                    detail: ni.valueAsNumber
                });
            });
            minusButton.addEventListener("click", function (ev) {
                ni.valueAsNumber = ni.valueAsNumber - options.step;
                if (ni.valueAsNumber < options.min)
                    ni.valueAsNumber = options.min;
                element.winControl._updateButtons();
                //if (ni.valueAsNumber == options.max)
                //    plusButton.disabled = true;
                //else
                //    plusButton.disabled = false;
                //if (ni.valueAsNumber == options.min)
                //    minusButton.disabled = true;
                //else
                //    minusButton.disabled = false;
                element.winControl.dispatchEvent("inputChanged", {
                    detail: ni.valueAsNumber
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

                //_min: 0,
                //_max: null,
                //_step: 1,
                //_value: 0,

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
                currentInput: {
                    get: function () {
                        return this._ni.valueAsNumber;
                    },
                    set: function (value) {
                        this._ni.valueAsNumber = value;
                        this._updateButtons();
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
       WinJS.Utilities.createEventProperties("inputChanged"),
       WinJS.UI.DOMEventMixin);

}(WinJS));

