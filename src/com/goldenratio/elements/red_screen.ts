/**
 * Author: bear
 * Date: 7/10/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />
///<reference path='../../../../definitions/tweenjs.d.ts' />
///<reference path='../basic_display.ts' />

module com.goldenratio.elements
{
    export class RedScreen extends com.goldenratio.BasicDisplayObject
    {

        private gfx:createjs.Shape;
        private speed:number = 200;
        private centerHoleSize:number = 800;
        private centerHolePosition:createjs.Point = new createjs.Point(310, 230);

        constructor()
        {
            super();
        }


        public dispose()
        {
            super.dispose();

            this.centerHolePosition = null;
            this.gfx = null;
        }

        public show():void
        {
            if(this.gfx)
            {
                return;
            }
            this.gfx = new createjs.Shape();
            //this.gfx.graphics.beginFill(createjs.Graphics.getRGB(255, 0, 0, 1));
            this.gfx.graphics.beginRadialGradientFill([
                createjs.Graphics.getRGB(0, 0, 0, 0),
                createjs.Graphics.getRGB(255, 0, 0, 0.6)
                ],
                [0.1, 0.9], this.centerHolePosition.x, this.centerHolePosition.y, 0, this.centerHolePosition.x, this.centerHolePosition.y, this.centerHoleSize);

            this.gfx.graphics.drawRect(0, 0, 640, 480);
            this.gfx.graphics.endFill();

            //this.gfx.alpha = 0;
            this.addChild(this.gfx);

            //this.cache(0, 0, 640, 480);

            createjs.Tween.get(this.gfx).to({alpha: 1}, this.speed, createjs.Ease.linear).call(this.hide.bind(this));
        }

        private hide():void
        {
            createjs.Tween.get(this.gfx).to({alpha: 0}, this.speed, createjs.Ease.linear).call(this.remove.bind(this));
        }

        private remove():void
        {
            if(this.gfx)
            {
                this.gfx.graphics.clear();
                this.removeChild(this.gfx);
                this.gfx = null;
            }
        }

        public update()
        {

        }
    }
}