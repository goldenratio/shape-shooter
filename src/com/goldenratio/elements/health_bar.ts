/**
 * Author: bear
 * Date: 7/10/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />

///<reference path='../basic_display.ts' />

module com.goldenratio.elements
{
    export class HealthBar extends com.goldenratio.BasicDisplayObject
    {

        private size:createjs.Rectangle = new createjs.Rectangle(0, 0, 200, 15);
        private bar:createjs.Shape;

        constructor()
        {
            super();
            //console.log("health bar");

            var shape:createjs.Shape = new createjs.Shape();
            shape.graphics.setStrokeStyle(1);
            shape.graphics.beginStroke(createjs.Graphics.getRGB(255, 255, 255, 0.8));
            shape.graphics.drawRect(0, 0, this.size.width, this.size.height);
            shape.graphics.endStroke();

            this.addChild(shape);

            this.bar = new createjs.Shape();
            this.addChild(this.bar);

            this.cache(-1, -1, this.size.width + 2, this.size.height + 2);
        }

        public getBounds():createjs.Rectangle
        {
            return new createjs.Rectangle(this.x, this.y, this.size.width, this.size.height);
        }


        public dispose():void
        {
            super.dispose();
            this.bar = null;
            this.size = null;

        }

        public setValue(value:number):void
        {
            this.bar.graphics.clear();

            if(value < 0)
            {
                value = 0;
            }
            var pct:number = ((value / 100) * this.size.width) >> 0;
            if(pct > 0)
            {
                this.bar.graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255, 0.8));
                this.bar.graphics.drawRect(3, 3, pct - 6, this.size.height - 6);
                this.bar.graphics.endFill();


            }

            this.updateCache(null);

        }

        public update():void
        {

        }
    }

}
