(function (WinJS) {
    WinJS.Namespace.define("WinJS.UI.Custom", {
        InputPopup: WinJS.Class.define(function (element, options) {
            if (!element || element.tagName.toLowerCase() !== "div")
                throw "div type must be provided";
            options = options || {};
            this._options = options;

            this._setElement(element);

            if (!options.content)
                options.content = "";

            if (!options.primaryButton)
                options.primaryButton = "Submit";

            //if (!options.secondaryButton)
            //    options.secondaryButton = "b";

            if (!options.type) {
                options.type = 'text';
            }

            element.winControl = this;
            WinJS.UI.setOptions(this, options);

            //create the flyout
            var flyoutDiv = document.createElement('div');
            var flyout = new WinJS.UI.Flyout(flyoutDiv);
            this._flyout = flyout;
            flyout.addEventListener("afterhide", function (ev) {
                element.winControl.dispatchEvent("dismissed", {});
            });
            element.appendChild(flyoutDiv);

            //create contentDiv
            var contentDiv = document.createElement('div');
            this._contentDiv = contentDiv;
            contentDiv.innerHTML = options.content;
            flyoutDiv.appendChild(contentDiv);

            //create input
            var input = document.createElement('input');
            this._input = input;
            input.setAttribute('type', options.type);
            input.style.maxWidth = '240px'; // margins and padding in flyout make standard width too wide on an iOS screen.... probably others too
            input.addEventListener('change', function () {
                element.winControl.dispatchEvent("inputChanged", { detail: input.value });
            });
            
            flyoutDiv.appendChild(input);

            //create buttonBar
            var buttonDiv = document.createElement('div');
            buttonDiv.style.marginTop = '10px';
            if (options.secondaryButton) {
                var secondaryButton = document.createElement('button');
                secondaryButton.innerHTML = options.secondaryButton;
                secondaryButton.style.cssFloat = 'right';
                secondaryButton.style.marginLeft = '10px';
                secondaryButton.addEventListener("click", function (ev) {
                    input.value = '';
                    element.winControl.dispatchEvent("buttonInvoked", { detail: "secondary" });
                    flyout.hide();
                });
                element.winControl._secondaryButton = secondaryButton;
                buttonDiv.appendChild(secondaryButton);
            }
            
                var primaryButton = document.createElement('button');
                primaryButton.innerHTML = options.primaryButton;
                if (options.secondaryButton) {
                    primaryButton.style.cssFloat = 'left';
                    primaryButton.style.marginRight = '10px';
                } else {
                    primaryButton.style.cssFloat = 'right';
                    primaryButton.style.marginLeft = '10px';
                }
                primaryButton.addEventListener("click", function (ev) {
                    var copy = input.value;
                    element.winControl.dispatchEvent("buttonInvoked", { detail: "primary", value: copy });
                    flyout.hide();
                    input.value = '';
                });
                element.winControl._primaryButton = primaryButton;
                buttonDiv.appendChild(primaryButton);
            
            flyoutDiv.appendChild(buttonDiv);

            input.addEventListener('keyup', function (ev) {
                if (ev.keyCode == 13) {
                    //invoke button click
                    if (typeof primaryButton.click == "function") {
                        primaryButton.click.apply(primaryButton);
                    }
                }
            });


        },
            {

                //Private members
                _element: null,
                _options: null,
                _flyout: null,
                _contentDiv: null,
                _primaryButton: null,
                _secondaryButton: null,
                _input:null,

                _setElement: function (element) {
                    this._element = element;
                },

                //Public members
                show: function (elem) {
                    var flyout = this._flyout;
                    var input = this._input;
                    var onAfterShow = function () {
                        flyout.removeEventListener("aftershow", onAfterShow);
                        input.focus();
                    };
                    this._flyout.addEventListener("aftershow", onAfterShow);
                    this._flyout.show(elem);
                    
                },

                element: {
                    get: function () {
                        return this._element;
                    }
                },
                secondaryButtonText: {
                    set: function (value) {
                        this._secondaryButton.innerHTML = value;
                    }
                },
                primaryButtonText: {
                    set: function (value) {
                        this._primaryButton.innerHTML = value;
                    }
                },
                contentText: {
                    set: function (value) {
                        this._contentDiv.innerHTML = value;
                    }
                },
                value: {
                    get: function () {
                        return this._input.value;
                    },
                    set: function (value) {
                        this._input.value = value;
                    }
                }

            })
    });

    //this is required to be able to fire events that can be seen from the control itself
    WinJS.Class.mix(WinJS.UI.Custom.InputPopup,
       WinJS.Utilities.createEventProperties("buttonInvoked"),
       WinJS.UI.DOMEventMixin);

    WinJS.Class.mix(WinJS.UI.Custom.InputPopup,
       WinJS.Utilities.createEventProperties("dismissed"),
       WinJS.UI.DOMEventMixin);

    WinJS.Class.mix(WinJS.UI.Custom.InputPopup,
      WinJS.Utilities.createEventProperties("inputChanged"),
      WinJS.UI.DOMEventMixin);

}(WinJS));
