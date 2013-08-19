/**
 * Author: bear
 * Date: 7/12/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />
///<reference path='../../../../definitions/tweenjs.d.ts' />
///<reference path='../utils/browser_type.ts' />

module com.goldenratio.screens
{
    export class GameOverScreen
    {
        private text:createjs.Text;
        private continueGameText:createjs.Text;
        public isGameOver:bool = false;

        constructor(public stage:createjs.Stage)
        {

        }

        public dispose():void
        {
            if(this.text)
            {
                this.stage.removeChild(this.text);
                this.text = null;
            }
            if(this.text)
            {
                this.stage.removeChild(this.continueGameText);
                this.continueGameText = null;
            }
            this.stage = null;
        }

        public show():void
        {
            this.isGameOver = true;
            this.text = new createjs.Text("GAME OVER", "90px slickscreen", createjs.Graphics.getRGB(255, 0, 0, 1));
            //this.text.outline = true;
            this.text.shadow = new createjs.Shadow(createjs.Graphics.getRGB(247, 15, 15, 1), 0, 0, 6);

            this.text.alpha = 0;
            this.stage.addChild(this.text);

            /*if(utils.BrowserType.isFirefox())
            {
                this.text.x = 35;
                this.text.y = 117;
            }
            else
            {
                this.text.x = 35;
                this.text.y = 180;
            }*/
            this.text.x = 35;
            this.text.y = 180;

            createjs.Tween.get(this.text).to({alpha: 1}, 1000, createjs.Ease.linear).call(this.onComplete.bind(this));
        }

        public showMissionComplete():void
        {

            this.isGameOver = true;
            this.text = new createjs.Text("  MISSION  \nCOMPLETE", "90px slickscreen", createjs.Graphics.getRGB(0, 255, 0, 1));
            //this.text.outline = true;
            this.text.textAlign = "center";
            this.text.shadow = new createjs.Shadow(createjs.Graphics.getRGB(107, 247, 69, 1), 0, 0, 6);

            this.text.alpha = 0;
            this.stage.addChild(this.text);

            this.text.x = 320;
            this.text.y = 100;

            createjs.Tween.get(this.text).to({alpha: 1}, 1000, createjs.Ease.linear).call(this.onComplete.bind(this));
        }

        private onComplete():void
        {
            this.continueGameText = new createjs.Text("click to continue!", "16px slickscreen", createjs.Graphics.getRGB(255, 255, 255, 1));
            this.continueGameText.x = 220;
            this.continueGameText.y = 350;
            this.stage.addChild(this.continueGameText);
        }

        public update():void
        {

        }
    }
}