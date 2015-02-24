module WinJS.UI.Custom {

    export class NumberStepper {

        //Private members
        private _element: HTMLElement;
        private _options: any;

        private _plusButton: HTMLButtonElement;
        private _minusButton: HTMLButtonElement;
        private _ni: HTMLInputElement;

        private setElement(element: HTMLElement) {
            this._element = element;
        }

        constructor(element: HTMLElement, options: any) {
            if (!element || element.tagName.toLowerCase() !== "div")
                throw "div type must be provided";
            options = options || {};
            this._options = options;


            if (!options.value)
                options.value = 0;

            if (!options.step)
                options.step = 1;

            if (!options.min)
                options.min = 0;

            if (!options.buttonWidth) {
                options.buttonWidth = "35";
            }

            this.element = element;

            element.winControl = this;

            WinJS.UI.setOptions(this, options);

            element.setAttribute("style", "display:flex;align-items: center;");
            
            //create the input

            this._ni = document.createElement('input');
            this._ni.setAttribute("type", "number");
            this._ni.setAttribute("style", "vertical-align:middle; flex:1;");
            this._ni.value = options.value;

            //listen for blur (lost focus) so we can signal number change to control and alter buttons if necessary
            this._ni.addEventListener("blur", (ev) => {
                this._validateNumber();

                this._updateButtons();

                element.winControl.dispatchEvent("valueChanged", {
                    detail: +this._ni.value
                });
            });



            //create the minus Button
            this._minusButton = document.createElement('button');
            this._minusButton.setAttribute("style", "min-width:" + this._options.buttonWidth + "px; vertical-align:middle; margin-left: 5px;");
            this._minusButton.innerText = "-";
            if (+this._ni.value == options.min)
                this._minusButton.disabled = true;

            //create the plus button
            this._plusButton = document.createElement('button');
            this._plusButton.setAttribute("style", "min-width:" + this._options.buttonWidth + "px; vertical-align:middle; margin-left: 5px;");
            this._plusButton.innerText = "+";
            if (+this._ni.value == options.max)
                this._plusButton.disabled = true;

            //listen for a click events
            this._plusButton.addEventListener("click", (ev) => {
                this._ni.value = +this._ni.value + options.step;
                if (+(this._ni.value) > options.max)
                    this._ni.value = options.max;
                element.winControl._updateButtons();

                element.winControl.dispatchEvent("valueChanged", {
                    detail: +this._ni.value
                });
            });
            this._minusButton.addEventListener("click", (ev) => {
                this._ni.value = (+this._ni.value - options.step).toString();
                if (+this._ni.value < options.min)
                    this._ni.value = options.min;
                element.winControl._updateButtons();

                element.winControl.dispatchEvent("valueChanged", {
                    detail: +this._ni.value
                });
            });

            //add the elements to the div
            element.appendChild(this._ni);
            element.appendChild(this._minusButton);
            element.appendChild(this._plusButton);
            

            WinJS.Binding.processAll(element, this, false);
                       
        }

        private _validateNumber() {
            var val = +this._ni.value;
            if (val > this._options.max)
                this._ni.value = this._options.max;
            else if (val < this._options.min)
                this._ni.value = this._options.min;
            else if (isNaN(val))
                this._ni.value = 15 + "";
            else
                this._ni.value = Math.floor(val) + "";
            
        }

        private _updateButtons() {
            if (+this._ni.value == this._options.max)
                this._plusButton.disabled = true;
            else
                this._plusButton.disabled = false;
            if (+this._ni.value == this._options.min)
                this._minusButton.disabled = true;
            else
                this._minusButton.disabled = false;
        }

        public get element(): HTMLElement { return this._element; }
        public set element(value: HTMLElement) {
            this._element = value;
        }

        public get value(): string {
            if (this._ni != null)
                return this._ni.value;
            else
                return this._options.value;
        }
        public set value(value: string) {
            if (this._ni != null) {
                this._ni.value = value;
                this._updateButtons();
            }
        }

     
    }

    WinJS.Class.mix(WinJS.UI.Custom.NumberStepper, WinJS.Utilities.createEventProperties("valueChanged"), WinJS.UI.DOMEventMixin);
    WinJS.Utilities.markSupportedForProcessing(WinJS.UI.Custom.NumberStepper);

}

