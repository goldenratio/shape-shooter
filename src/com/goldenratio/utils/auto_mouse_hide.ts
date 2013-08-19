/**
 * Author: bear
 * Date: 8/4/13
 */

module com.goldenratio.utils
{
    export class AutoMouseHide
    {

        public static TIMEOUT_VALUE: number = 3000;
        private timer:any;

        private timeOutBind:any;
        private onMouseMoveBind:any;

        constructor()
        {

        }

        public init():void
        {
            this.timeOutBind = this.onTimeout.bind(this);
            this.onMouseMoveBind = this.onMouseMoveHL.bind(this);

            //alert("hi");
            document.addEventListener("mousemove", this.onMouseMoveBind, false);
            this.resetTimeout();

        }

        private resetTimeout():void
        {
            if(this.timer)
            {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(this.timeOutBind, AutoMouseHide.TIMEOUT_VALUE);
        }


        private onTimeout():void
        {
            document.body.style.cursor = "none";
        }

        private onMouseMoveHL(event:MouseEvent):void
        {
            if(event["webkitMovementX"] == 0 || event["webkitMovementY"] == 0)
            {
                return;
            }

            this.resetTimeout();
            document.body.style.cursor = "auto";

        }

        public dispose():void
        {

            document.removeEventListener("mousemove", this.onMouseMoveBind, false);

            if(this.timer)
            {
                clearTimeout(this.timer);
            }

            this.timer = null;
            this.timeOutBind = null;
            this.onMouseMoveBind = null;

            document.body.style.cursor = "auto";
        }
    }

}