/**
 * Author: bear
 * Date: 7/2/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />

module com.goldenratio.utils
{

    export class KeyboardEnum
    {
        public static UP:number = 38;
        public static DOWN:number = 40;
        public static LEFT:number = 37;
        public static RIGHT:number = 39;
        public static Z:number = 90;
        public static P:number = 80;
        public static M:number = 77;

        public static W:number = 87;
        public static A:number = 65;
        public static S:number = 83;
        public static D:number = 68;
        public static L:number = 76;

    }

    export class KeyEvent
    {
        static PAUSE_TOGGLED:string = "com.goldenratio.utils.KeyEvent.PAUSE_TOGGLED";
        static MUTE_TOGGLED:string = "com.goldenratio.utils.KeyEvent.MUTE_TOGGLED";

        public type:string;
        public pauseState:bool;
        public muteState:bool;

    }

    export class Keyboard extends createjs.EventDispatcher
    {

        private isUp:bool = false;
        private isDown:bool = false;
        private isRight:bool = false;
        private isLeft:bool = false;
        private isFire:bool = false;
        private isPause:bool = false;
        private isMute:bool = false;

        // bind
        private onWindowBlurHL:any;
        private onKeyDownHL:any;
        private onKeyUpHL:any;

        constructor()
        {
            super();
        }

        public init():void
        {
            this.onWindowBlurHL = this.onWindowBlur.bind(this);
            this.onKeyDownHL = this.onKeyDown.bind(this);
            this.onKeyUpHL = this.onKeyUp.bind(this);

            document.addEventListener("keydown", this.onKeyDownHL, false);
            document.addEventListener("keyup", this.onKeyUpHL, false);
            window.addEventListener("blur", this.onWindowBlurHL, false);

        }

        public setMute(value:bool):void
        {
            this.isMute = value;
        }

        private onWindowBlur():void
        {
            console.log("blur");
            // pause
            if(this.isPause == true)
            {
                return;
            }

            this.isPause = true;
            var e:KeyEvent = new KeyEvent();
            e.pauseState = this.isPause;
            e.type = KeyEvent.PAUSE_TOGGLED;

            this.dispatchEvent(e, null);
        }



        public isKeyPress(keyCode:number):bool
        {
            if(keyCode == KeyboardEnum.UP)
                return this.isUp;

            else if(keyCode == KeyboardEnum.DOWN)
                return this.isDown;

            else if(keyCode == KeyboardEnum.LEFT)
                return this.isLeft;

            else if(keyCode == KeyboardEnum.RIGHT)
                return this.isRight;

            else if(keyCode == KeyboardEnum.Z)
                return this.isFire;

            else if(keyCode == KeyboardEnum.P)
                return this.isPause;

            return false;
        }

        private onKeyDown(event:KeyboardEvent):void
        {
            //console.log("key down, " + event.keyCode);
            var validKey:bool= false;
            if(event.keyCode == KeyboardEnum.UP || event.keyCode == KeyboardEnum.W)
            {
                this.isUp = true;
                this.isDown = false;
                validKey = true;

            }
            else if(event.keyCode == KeyboardEnum.DOWN || event.keyCode == KeyboardEnum.S)
            {
                this.isUp = false;
                this.isDown = true;
                validKey = true;
            }

            if(event.keyCode == KeyboardEnum.LEFT || event.keyCode == KeyboardEnum.A)
            {
                this.isLeft = true;
                this.isRight = false;
                validKey = true;

            }
            else if(event.keyCode == KeyboardEnum.RIGHT || event.keyCode == KeyboardEnum.D)
            {
                this.isLeft = false;
                this.isRight = true;
                validKey = true;
            }

            if(event.keyCode == KeyboardEnum.Z || event.keyCode == KeyboardEnum.L)
            {
                this.isFire = true;
                validKey = true;
            }


            if(validKey == true)
                event.preventDefault();
        }

        private onKeyUp(event:KeyboardEvent):void
        {
            //console.log("key up, " + event.keyCode);
            var validKey:bool= false;
            if(event.keyCode == KeyboardEnum.UP || event.keyCode == KeyboardEnum.W)
            {
                this.isUp = false;
                validKey = true;
            }

            if(event.keyCode == KeyboardEnum.DOWN || event.keyCode == KeyboardEnum.S)
            {
                this.isDown = false;
                validKey = true;
            }

            if(event.keyCode == KeyboardEnum.LEFT || event.keyCode == KeyboardEnum.A)
            {
                this.isLeft = false;
                validKey = true;
            }

            if(event.keyCode == KeyboardEnum.RIGHT || event.keyCode == KeyboardEnum.D)
            {
                this.isRight = false;
                validKey = true;
            }

            if(event.keyCode == KeyboardEnum.Z || event.keyCode == KeyboardEnum.L)
            {
                this.isFire = false;
                validKey = true;
            }

            if(event.keyCode == KeyboardEnum.P)
            {
                this.isPause = !this.isPause;
                validKey = true;

                var e:KeyEvent = new KeyEvent();
                e.pauseState = this.isPause;
                e.type = KeyEvent.PAUSE_TOGGLED;

                this.dispatchEvent(e, null);
            }

            if(event.keyCode == KeyboardEnum.M)
            {
                this.isMute = !this.isMute;
                validKey = true;

                var e:KeyEvent = new KeyEvent();
                e.muteState = this.isMute;
                e.type = KeyEvent.MUTE_TOGGLED;

                this.dispatchEvent(e, null);
            }

            if(validKey == true)
                event.preventDefault();
        }

        public dispose():void
        {
            //console.log("dispose key board");

            document.removeEventListener("keydown", this.onKeyDownHL, false);
            document.removeEventListener("keyup", this.onKeyUpHL, false);
            window.removeEventListener("blur", this.onWindowBlurHL, false);

            this.onWindowBlurHL = null;
            this.onKeyDownHL = null;
            this.onKeyUpHL = null;

        }

    }
}