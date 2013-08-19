/**
 * Author: bear
 * Date: 7/12/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />
///<reference path='../utils/browser_type.ts' />

module com.goldenratio.texts
{
    export class PausedText
    {

        private text:createjs.Text;
        private shape:createjs.Shape;

        constructor(public stage:createjs.Stage)
        {

        }

        public dispose():void
        {
            this.clear();
            this.stage = null;
        }

        public show():void
        {
            this.shape = new createjs.Shape();
            this.shape.graphics.beginFill(createjs.Graphics.getRGB(0, 255, 0, 0.5));
            this.shape.graphics.drawRect(0, 0, 640, 60);
            this.shape.graphics.endFill();

            this.stage.addChild(this.shape);

            this.text = new createjs.Text("- PAUSED -", "42px slickscreen", createjs.Graphics.getRGB(0, 0, 0, 1));
            this.text.shadow = new createjs.Shadow(createjs.Graphics.getRGB(255, 255, 255, 0.8), 0, 0, 6);

            this.stage.addChild(this.text);

            this.shape.x = 0;
            this.shape.y = 190;

            /*if(utils.BrowserType.isFirefox())
            {
                this.text.x = 180;
                this.text.y = 170;
            }
            else
            {
                this.text.x = 180;
                this.text.y = 200;
            } */
            this.text.x = 180;
            this.text.y = 200;
        }

        public clear():void
        {
            if(this.text)
            {
                this.stage.removeChild(this.text);
                this.text = null;
            }

            if(this.shape)
            {
                this.stage.removeChild(this.shape);
                this.shape = null;
            }

        }



    }
}