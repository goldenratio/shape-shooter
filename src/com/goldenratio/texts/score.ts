/**
 * Author: bear
 * Date: 7/12/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />
///<reference path='../utils/browser_type.ts' />

module com.goldenratio.texts
{
    export class Score
    {
        private value:number = 0;
        private scoreText:createjs.Text;

        constructor(public stage:createjs.Stage)
        {

        }

        public dispose():void
        {
            if(this.scoreText)
            {
                this.stage.removeChild(this.scoreText);
                this.scoreText = null;
            }

            this.stage = null;
        }

        public init():void
        {
            this.scoreText = new createjs.Text("00000", "18px slickscreen", createjs.Graphics.getRGB(255, 255, 255, 1));
            /*if(utils.BrowserType.isFirefox())
            {
                this.scoreText.x = 10;
                this.scoreText.y = 0;
            }
            else
            {
                this.scoreText.x = 10;
                this.scoreText.y = 10;
            } */

            this.scoreText.x = 10;
            this.scoreText.y = 10;

            this.stage.addChild(this.scoreText);

            this.updateScore();
        }

        public add(data:number):void
        {
            this.value += data;
            this.updateScore();
        }

        private updateScore():void
        {
            var prefix:string = "";
            if(this.value < 10)
            {
                prefix = "0000";
            }
            else if(this.value < 100)
            {
                prefix = "000";
            }
            else if(this.value < 1000)
            {
                prefix = "00";
            }
            else if(this.value < 10000)
            {
                prefix = "0";
            }
            this.scoreText.text = prefix + this.value.toString();

        }
    }
}