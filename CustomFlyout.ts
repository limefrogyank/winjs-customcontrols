
module WinJS.UI.Custom {

    export class CustomFlyout  {

        //Private members
        private _element: HTMLElement;
        private _options: any;

        private _isOpen: boolean = false;
        private _width: number;

        private _animationPromise: WinJS.Promise<any>;
        private _isLightDismiss: boolean;

        private setElement(element: HTMLElement) {
            this._element = element;
        }

        private transformOpen(isOpen: boolean) {
            if (this._animationPromise != null)
                this._animationPromise.cancel();
            if (isOpen) {
                this._element.style.opacity = "1";
                this._element.style.display = "block";
                this._animationPromise = WinJS.UI.Animation.showPanel(this._element, { top: "0px", left: this.width + "px", rtlflip: false });
               
            }
            else{

                this._animationPromise = WinJS.UI.Animation.hidePanel(this._element, { top: "0px", left: this.width + "px", rtlflip: false });
                this._animationPromise.done(() => {
                    this._element.style.opacity = "0";
                    this._element.style.display = "none";
                });
            }
        }

        private onResize(args: any) {
            if (args.view.innerWidth < this._options.width) {
                this.width = 400;
                this._element.style.width = this.width + "px";
            }
            else if (this._options.width > this.width) {
                this.width = this._options.width;
                this._element.style.width = this.width + "px";
            }
            this._element.style.left = args.view.innerWidth - this.width + "px";
            this._element.style.height = args.view.innerHeight + "px";
                        
        }

        private onDocClick(args: any) {
            if (this.isOpen) {
                var selfFound = false;
                if (args.target != this._element) {
                    var parent = args.target.parentElement;

                    while (parent != null) {
                        //console.log(parent.id);
                        if (parent != this._element) {
                            parent = parent.parentElement;
                        }
                        else {
                            selfFound = true;
                            break;
                        }
                    }
                }
                else
                    selfFound = true;
                if (!selfFound) {
                    this.isOpen = false;
                    console.log('lightdismiss go');
                }
                else {
                    console.log('do not dismiss');

                }
            }
            else {  
                //probably closed from button dismiss rather than light-dismiss.  Ignore document event.
            }
        }

        constructor(element: HTMLElement, options: any) {
            if (!element || element.tagName.toLowerCase() !== "div")
                throw "div type must be provided";
            options = options || {};
            this._options = options;

            if (options.width)
                this.width = options.width;
            else {
                options.width = 636;
                this.width = 636;
            }
            if (options.isLightDismiss!=null)
                this._isLightDismiss = options.isLightDismiss;
            else {
                options.isLightDismiss = true;
                this._isLightDismiss = true;
            }

            this.element = element;

            element.style.opacity = "0";
            element.style.display = "none";
            element.style.position = "absolute";
            element.style.left = document.documentElement.clientWidth - this.width + "px";
            element.style.top = "0px";
            element.style.height = document.documentElement.clientHeight + "px";
            element.style.width = this.width + "px";
            element.style.backgroundColor = "#ff00ff";

            WinJS.Binding.processAll(element, this, false);

            this.onResize = this.onResize.bind(this);
            window.addEventListener("resize", this.onResize);

            this.onDocClick = this.onDocClick.bind(this);
            

        }

        public get element(): HTMLElement { return this._element; }
        public set element(value: HTMLElement) {
            this._element = value;
        }      


        public get isOpen(): boolean { return this._isOpen; }
        public set isOpen(value: boolean) {
            if (this._isOpen != value && value != undefined) {
                this._isOpen = value;
                this.transformOpen(value);
                if (this._isOpen) {
                    if (this.isLightDismiss)
                        document.addEventListener("click", this.onDocClick);
                    this.dispatchEvent('opened', this._isOpen);
                    console.log('dispatch opened event: ' + this._isOpen);
                }
                else {
                    if (this.isLightDismiss)
                        document.removeEventListener("click", this.onDocClick);
                    this.dispatchEvent('closed', this._isOpen);
                    console.log('dispatch closed event: ' + this._isOpen);
                }
            }
        }  
        
        public get width(): number { return this._width; }
        public set width(value: number) {
            this._width = value;
        }        

        public get isLightDismiss(): boolean { return this._isLightDismiss; }
        public set isLightDismiss(value: boolean) {
            if (this.isOpen)
                document.removeEventListener("click", this.onDocClick);
            this._isLightDismiss = value;
        }    
    }

    WinJS.Class.mix(WinJS.UI.Custom.CustomFlyout, WinJS.Utilities.createEventProperties("opened","closed"), WinJS.UI.DOMEventMixin);
    WinJS.Utilities.markSupportedForProcessing(WinJS.UI.Custom.CustomFlyout);

}
