/**
 * Author: bear
 * Date: 7/2/13
 */

///<reference path='../../../definitions/easeljs.d.ts' />

module com.goldenratio
{
    export class BackgroundGrid extends createjs.Container
    {
        private horizontalLines:createjs.Shape[] = [];
        private verticalLines:createjs.Shape[] = [];
        private lineSpeed:number = 2;

        constructor()
        {
            super();
            var i:number;
            var hy:number = 80;
            for(i = 0; i < 6; i++)
            {
                var gfx:createjs.Graphics = new createjs.Graphics();
                gfx.setStrokeStyle(1);
                gfx.beginStroke(createjs.Graphics.getRGB(0, 0, 255, 0.2));
                gfx.moveTo(0, 0);
                gfx.lineTo(640, 0);
                gfx.endStroke();

                var shape:createjs.Shape = new createjs.Shape(gfx);
                shape.x = 0;
                shape.y = hy;
                shape.cache(0, 0, 640, 2);
                //shape.snapToPixel = true;

                hy += 80;
                this.addChild(shape);
                this.horizontalLines.push(shape);
            }

            var vx:number = 80;
            for(i = 0; i < 8; i++)
            {
                var gfx:createjs.Graphics = new createjs.Graphics();
                gfx.setStrokeStyle(1);
                gfx.beginStroke(createjs.Graphics.getRGB(0, 0, 255, 0.3));
                gfx.moveTo(0, 0);
                gfx.lineTo(0, 480);
                gfx.endStroke();

                var shape:createjs.Shape = new createjs.Shape(gfx);
                shape.x = vx;
                shape.y = 0;
                shape.cache(0, 0, 2, 480);
                //shape.snapToPixel = true;
                vx += 80;
                this.addChild(shape);
                this.verticalLines.push(shape);
            }

        }

        public update():void
        {
            for(var i:number = 0; i < this.verticalLines.length; i++)
            {
                var line:createjs.Shape = <createjs.Shape> this.verticalLines[i];
                line.x -= this.lineSpeed;

                if(line.x < 0)
                {
                    line.x = 640;
                }
            }
        }

        public dispose():void
        {
            this.uncache();
            this.removeAllChildren();
            this.horizontalLines = null;
            this.verticalLines = null;
        }
    }

}