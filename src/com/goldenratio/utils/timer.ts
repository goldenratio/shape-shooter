/**
 * Author: bear
 * Date: 7/6/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />

module com.goldenratio.utils
{
    export class TimerEvent
    {
        static TIMER:string = "com.goldenratio.utils.TimerEvent.TIMER";
        static TIMER_COMPLETE:string = "com.goldenratio.utils.TimerEvent.Timer_Complete";

        public type:string;
        public currentCount = 0;
    }

    export class Timer extends createjs.EventDispatcher
    {
        private timerInterval:number;
        public currentCount:number = 0;
        public running:bool = false;

        private isPaused:bool = false;

        constructor(public delay:number, public repeatCount:number = 0)
        {
            super();
            this.currentCount = 0;
        }

        public dispose():void
        {
            this.stop();
        }

        public reset():void
        {
            this.stop();
            this.start();
        }

        public start():void
        {
            if(this.running == true)
            {
                console.log("timer already running!");
                return;
            }

            console.log("start timer");
            if(this.isPaused == false)
            {
                this.currentCount = 0;
            }
            this.running = true;
            this.isPaused = false;

            this.timerInterval = setInterval(this.onTimer.bind(this), this.delay);
        }

        public stop():void
        {
            clearInterval(this.timerInterval);
            this.timerInterval =  null;
            this.currentCount = 0;
            this.running = false;
        }

        public pause():void
        {
            console.log("pause timer");
            this.isPaused = true;

            clearInterval(this.timerInterval);
            this.running = false;
        }

        private onTimer():void
        {
            this.currentCount++;

            var event:TimerEvent = new TimerEvent();
            if(this.currentCount >= this.repeatCount && this.repeatCount != 0)
            {
                event.type = TimerEvent.TIMER_COMPLETE;
                event.currentCount = this.currentCount;

                this.running = false;
                this.dispatchEvent(event, null);
                return;
            }

            event.type = TimerEvent.TIMER;
            event.currentCount = this.currentCount;

            this.dispatchEvent(event, null);
        }

    }
}