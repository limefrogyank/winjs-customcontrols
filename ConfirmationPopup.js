// This is a dialog with two buttons similar to the ContentDialog in the latest version of WinJS.  This is intended
// for build v3.0.1 available on NuGet (as of 2014-Nov-11).  Also, this uses a flyout so has a light dismiss behavior.

(function (WinJS) {
    WinJS.Namespace.define("WinJS.UI.Custom", {
        ConfirmationPopup: WinJS.Class.define(function (element, options) {
            if (!element || element.tagName.toLowerCase() !== "div")
                throw "div type must be provided";
            options = options || {};
            this._options = options;

            this._setElement(element);

            if (!options.content)
                options.content = "";

//            if (!options.primaryButton)
//                options.primaryButton = "a";

//            if (!options.secondaryButton)
//                options.secondaryButton = "b";
            
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

            //create buttonBar
            var buttonDiv = document.createElement('div');
            buttonDiv.style.marginTop = '10px';
            if (options.secondaryButton) {
                var secondaryButton = document.createElement('button');
                secondaryButton.innerHTML = options.secondaryButton;
                secondaryButton.style.cssFloat = 'right';
                secondaryButton.style.marginLeft = '10px';
                secondaryButton.addEventListener("click", function (ev) {
                    element.winControl.dispatchEvent("buttonInvoked", { detail: "secondary" });
                    flyout.hide();
                });
                element.winControl._secondaryButton = secondaryButton;
                buttonDiv.appendChild(secondaryButton);
            }
            if (options.primaryButton) {
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
                    element.winControl.dispatchEvent("buttonInvoked", { detail: "primary" });
                    flyout.hide();
                });
                element.winControl._primaryButton = primaryButton;
                buttonDiv.appendChild(primaryButton);
            }
            flyoutDiv.appendChild(buttonDiv);
            

        },
            {

                //Private members
                _element: null,
                _options: null,
                _flyout: null,
                _contentDiv: null,
                _primaryButton: null,
                _secondaryButton: null,


                _setElement: function (element) {
                    this._element = element;
                },
                                
                //Public members
                show: function(elem){
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
                }


            })
    });

    //this is required to be able to fire events that can be seen from the control itself
    WinJS.Class.mix(WinJS.UI.Custom.ConfirmationPopup,
       WinJS.Utilities.createEventProperties("buttonInvoked"),
       WinJS.UI.DOMEventMixin);

    WinJS.Class.mix(WinJS.UI.Custom.ConfirmationPopup,
       WinJS.Utilities.createEventProperties("dismissed"),
       WinJS.UI.DOMEventMixin);

}(WinJS));
