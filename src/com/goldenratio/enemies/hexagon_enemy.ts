/**
 * Author: bear
 * Date: 7/9/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />
///<reference path='base_enemy.ts' />
///<reference path='enums/enemy_spawn_type.ts' />
///<reference path='bullets/enemy_bullet_event.ts' />

module com.goldenratio.enemies
{
    export class HexagonEnemy extends com.goldenratio.enemies.BaseEnemy
    {
        public static SIZE:number = 14;


        constructor(animationType:string = enums.EnemyAnimationType.LINEAR)
        {
            super(animationType);

            this.scoreValue = 100;
            this.hitsToKill = 1;
            this.currentHits = 0;
            this.damage = 20;

            this.bulletType = bullets.EnemyBulletType.HEXAGON;
            this.colorValue = createjs.Graphics.getRGB(103, 204, 255, 0.8);

            var gfx:createjs.Graphics = new createjs.Graphics();
            gfx.setStrokeStyle(2);
            gfx.beginStroke(this.colorValue);
            //gfx.beginStroke(createjs.Graphics.getRGB(r, g, b, 1));
            gfx.moveTo(HexagonEnemy.SIZE, 0);

            var degree:number = 0;
            for(var i:number = 0; i < 7; i++)
            {
                var radians:number = degree * Math.PI / 180;
                var hx:number = Math.cos (radians) * HexagonEnemy.SIZE;
                var hy:number = Math.sin (radians) * HexagonEnemy.SIZE;

                degree += 60;
                gfx.lineTo(hx, hy);
            }

            gfx.endStroke();

            var shape:createjs.Shape = new createjs.Shape(gfx);
            //shape.graphics.beginFill("#ff0000").drawRect(0, 0, 5, 5);
            //var glowSize:number = 5;
            //shape.shadow = new createjs.Shadow(createjs.Graphics.getRGB(0, 0, 255, 0.6), 0, 0, glowSize);
            shape.x = HexagonEnemy.SIZE;
            shape.y = HexagonEnemy.SIZE;
            this.addChild(shape);

            this.flashHitShape = shape.clone(false);
            this.flashHitShape.filters = [new createjs.ColorFilter(0,0,0,1,255,255,255,0.8)];
            this.flashHitShape.cache(-HexagonEnemy.SIZE, -HexagonEnemy.SIZE, (HexagonEnemy.SIZE * 2) + 2, HexagonEnemy.SIZE * 2);

            this.regX = (HexagonEnemy.SIZE * 2) >> 1;
            this.regY = (HexagonEnemy.SIZE * 2) >> 1;

            this.cache(-1, -1, (HexagonEnemy.SIZE * 2) + 2, HexagonEnemy.SIZE * 2);

            this.ROTATION_SPEED = 12;
            if(this.animationType == enums.EnemyAnimationType.L_DOWN ||
                this.animationType == enums.EnemyAnimationType.L_UP)
            {
                this.ROTATION_SPEED = 20;
            }

        }

        public dispose():void
        {
            super.dispose();
        }

        public getBounds():createjs.Rectangle
        {
            return new createjs.Rectangle(this.x, this.y, HexagonEnemy.SIZE * 2, HexagonEnemy.SIZE * 2);
        }


        public update():void
        {

            super.update();

        }
    }

}