/**
 * Author: bear
 * Date: 7/10/13
 */

///<reference path='../../../../../definitions/easeljs.d.ts' />
///<reference path='../../basic_display.ts' />

module com.goldenratio.enemies.bullets
{

    export class EnemyBullet extends com.goldenratio.BasicDisplayObject
    {
        public isAlive:bool = true;
        public canRemove:bool = false;
        public damageFromAmmo:number = 5;

        private size:createjs.Rectangle = new createjs.Rectangle(0, 0, 3, 3);
        public colorValue:string;
        private directionInRad:number;

        public static EXPLOSION_PIXEL_SIZE:number = 4;
        public static EXPLOSION_DISTANCE:number = 30;
        public static EXPLOSION_COUNT:number = 6;

        public static SPEED:number = 12;

        constructor(public targetPos:createjs.Point, public selfPos:createjs.Point)
        {
            super();

            if(this.colorValue == null)
            {
                this.colorValue = createjs.Graphics.getRGB(103, 204, 255, 0.8);
            }
            //this.colorValue = createjs.Graphics.getRGB(255, 0, 0, 0.8);
            var gfx:createjs.Graphics = new createjs.Graphics();
            gfx.setStrokeStyle(1);
            gfx.beginStroke(this.colorValue);
            //gfx.beginFill(this.colorValue);
            gfx.drawCircle(0, 0, this.size.width);
            //gfx.endFill();
            gfx.endStroke();

            var shape:createjs.Shape = new createjs.Shape(gfx);
            shape.x = this.size.width;
            shape.y = this.size.height;
            shape.shadow = new createjs.Shadow(this.colorValue, 0, 0, 5);
            this.addChild(shape);

            this.regX = (this.size.width) >> 1;
            this.regY = (this.size.height) >> 1;

            this.cache(-this.size.width >> 1, -this.size.height >> 1, (this.size.width * 2) * 2, (this.size.height * 2) * 2);

            var deltaY:number = selfPos.y - targetPos.y;
            var deltaX:number = selfPos.x - targetPos.x;

            this.directionInRad = Math.atan2(deltaY, deltaX);
        }

        public dispose():void
        {
            super.dispose();
            this.targetPos = null;
            this.selfPos = null;
            this.size = null;
        }

        public getBounds():createjs.Rectangle
        {
            return new createjs.Rectangle(this.x, this.y, this.size.width * 2, this.size.width * 2);
        }

        public die():void
        {
            this.uncache();
            this.removeAllChildren();

            this.isAlive = false;

            var separation:number = (360 / EnemyBullet.EXPLOSION_COUNT) >> 0;
            var angle:number = 0;
            for(var i:number = 0; i < EnemyBullet.EXPLOSION_COUNT; i++)
            {
                var exp:createjs.Shape = new createjs.Shape();
                exp.graphics.setStrokeStyle(0);
                exp.graphics.beginFill(this.colorValue);
                exp.graphics.drawRect(0, 0, EnemyBullet.EXPLOSION_PIXEL_SIZE, EnemyBullet.EXPLOSION_PIXEL_SIZE);
                exp.graphics.endFill();
                exp.graphics.endStroke();
                exp.regX = EnemyBullet.EXPLOSION_PIXEL_SIZE >> 1;
                exp.regY = EnemyBullet.EXPLOSION_PIXEL_SIZE >> 1;

                exp.x = this.getBounds().width >> 1;
                exp.y = this.getBounds().width >> 1;



                exp.cache(0, 0, EnemyBullet.EXPLOSION_PIXEL_SIZE, EnemyBullet.EXPLOSION_PIXEL_SIZE);

                this.addChild(exp);

                var rad:number = angle * Math.PI / 180;
                var dx:number = exp.x + Math.cos(rad) * EnemyBullet.EXPLOSION_DISTANCE;
                var dy:number = exp.y + Math.sin(rad) * EnemyBullet.EXPLOSION_DISTANCE;
                createjs.Tween.get(exp).to({x: dx, y: dy}, 200, createjs.Ease.linear).call(this.onExplosionComplete.bind(this, i));
                angle += separation;
            }
        }

        private onExplosionComplete(explosionCount:number):void
        {
            if(explosionCount == EnemyBullet.EXPLOSION_COUNT - 1)
            {
                this.canRemove = true;
            }
        }

        public update():void
        {
            if(this.isAlive == false)
            {
                return;
            }

            this.x -= Math.cos(this.directionInRad) * EnemyBullet.SPEED;
            this.y -= Math.sin(this.directionInRad) * EnemyBullet.SPEED;
        }

    }

}
