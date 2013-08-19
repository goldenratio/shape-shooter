/**
 * Author: bear
 * Date: 8/17/13
 */

///<reference path='timer.ts' />

module com.goldenratio.utils
{
    export class HarlemShake
    {
        private static VALUE:Object[] = [{left: "-10px"},
                                         {left: "10px", top: "-10px"},
                                         {left: "0px", top: "10px"},
                                         {left: "-10px", top: "0px"},
                                         {left: "0px", top: "0px"}
                                         ];
        private timer:Timer;
        private currentCount:number = 0;
        private container:HTMLDivElement;

        // bind
        private onTimerBindHL:any;
        private onTimerCompleteBindHL:any;

        constructor()
        {
            this.onTimerBindHL = this.onTimerHL.bind(this);
            this.onTimerCompleteBindHL = this.onTimerCompleteHL.bind(this);
        }

        public shake(container:HTMLDivElement):void
        {
            if(this.timer || container == null)
            {
                return;
            }
            this.container = container;
            this.currentCount = 0;
            this.timer = new Timer(30, HarlemShake.VALUE.length + 1);
            this.timer.addEventListener(utils.TimerEvent.TIMER, this.onTimerBindHL);
            this.timer.addEventListener(utils.TimerEvent.TIMER_COMPLETE, this.onTimerCompleteBindHL);
            this.timer.start();
        }

        private onTimerHL(event:utils.TimerEvent):void
        {
            var obj:Object = HarlemShake.VALUE[this.currentCount];

            if(obj["top"])
            {
                this.container.style.top = obj["top"];
            }
            if(obj["left"])
            {
                this.container.style.left = obj["left"];
            }

            this.currentCount += 1;
        }

        private onTimerCompleteHL(event:utils.TimerEvent):void
        {
            this.clear();
        }

        private clear():void
        {
            if(this.timer)
            {
                this.timer.removeEventListener(utils.TimerEvent.TIMER, this.onTimerBindHL);
                this.timer.removeEventListener(utils.TimerEvent.TIMER_COMPLETE, this.onTimerCompleteBindHL);
                this.timer.dispose();
            }

            this.timer = null;

        }

        public dispose():void
        {
            this.clear();
            this.onTimerBindHL = null;
            this.onTimerCompleteBindHL = null;
        }
    }
}