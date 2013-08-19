/**
 * Author: bear
 * Date: 7/2/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />
///<reference path='../enemies/enemy_manager.ts' />
///<reference path='../basic_display.ts' />

module com.goldenratio
{
    export class Bullet extends com.goldenratio.BasicDisplayObject
    {
        private speed:number = 20;
        public canRemove:bool = false;
        public isAlive:bool = true;
        private size:createjs.Rectangle = new createjs.Rectangle(0, 0, 15, 5);
        private colorValue:string;

        public static EXPLOSION_PIXEL_SIZE:number = 4;
        public static EXPLOSION_DISTANCE:number = 30;
        public static EXPLOSION_COUNT:number = 6;

        constructor()
        {
            super();
            this.colorValue = createjs.Graphics.getRGB(255, 0, 0, 1);
            var gfx:createjs.Graphics = new createjs.Graphics();
            gfx.setStrokeStyle(this.size.height);
            gfx.beginStroke(this.colorValue);
            gfx.moveTo(0, 0);
            gfx.lineTo(this.size.width, 0);
            gfx.endStroke();

            var shape:createjs.Shape = new createjs.Shape(gfx);
            shape.shadow = new createjs.Shadow(createjs.Graphics.getRGB(255, 0, 0, 0.6), 0, 0, 6);
            this.addChild(shape);

            this.cache(0, -this.size.height, this.size.width, this.size.height * 2);
            //this.cache(0, 0, 15, 3);
            //this.snapToPixel = true;
        }

        public dispose():void
        {
            this.size = null;
            super.dispose();
        }

        public update()
        {
            if(this.isAlive == false)
            {
                return;
            }
            this.x += this.speed;

        }

        public getBounds():createjs.Rectangle
        {
            return new createjs.Rectangle(this.x, this.y, this.size.width, this.size.height);
        }

        public die():void
        {
            this.isAlive = false;

            this.uncache();
            this.removeAllChildren();

            var separation:number = (360 / Bullet.EXPLOSION_COUNT) >> 0;
            var angle:number = 0;
            for(var i:number = 0; i < Bullet.EXPLOSION_COUNT; i++)
            {
                var exp:createjs.Shape = new createjs.Shape();
                exp.graphics.setStrokeStyle(0);
                exp.graphics.beginFill(this.colorValue);
                exp.graphics.drawRect(0, 0, Bullet.EXPLOSION_PIXEL_SIZE, Bullet.EXPLOSION_PIXEL_SIZE);
                exp.graphics.endFill();
                exp.graphics.endStroke();
                exp.regX = Bullet.EXPLOSION_PIXEL_SIZE >> 1;
                exp.regY = Bullet.EXPLOSION_PIXEL_SIZE >> 1;

                exp.x = this.getBounds().width >> 1;
                exp.y = this.getBounds().width >> 1;



                exp.cache(0, 0, Bullet.EXPLOSION_PIXEL_SIZE, Bullet.EXPLOSION_PIXEL_SIZE);

                this.addChild(exp);

                var rad:number = angle * Math.PI / 180;
                var dx:number = exp.x + Math.cos(rad) * Bullet.EXPLOSION_DISTANCE;
                var dy:number = exp.y + Math.sin(rad) * Bullet.EXPLOSION_DISTANCE;
                createjs.Tween.get(exp).to({x: dx, y: dy}, 200, createjs.Ease.linear).call(this.onExplosionComplete.bind(this, i));
                angle += separation;
            }
        }

        private onExplosionComplete(explosionCount:number):void
        {
            if(explosionCount == Bullet.EXPLOSION_COUNT - 1)
            {
                this.canRemove = true;
            }
        }


    }
}