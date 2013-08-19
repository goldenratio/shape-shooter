/**
 * Author: bear
 * Date: 7/12/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />
///<reference path='base_enemy.ts' />
///<reference path='enums/enemy_spawn_type.ts' />
///<reference path='bullets/enemy_bullet_event.ts' />

module com.goldenratio.enemies
{
    export class TriangleEnemy extends com.goldenratio.enemies.BaseEnemy
    {
        public static SIZE:number = 20;

        constructor(animationType:string = enums.EnemyAnimationType.LINEAR)
        {
            super(animationType);

            this.scoreValue = 150;
            this.hitsToKill = 2;
            this.currentHits = 0;
            this.damage = 20;
            this.autoRotate = true;

            this.bulletType = bullets.EnemyBulletType.TRIANGLE;
            this.colorValue = createjs.Graphics.getRGB(255, 255, 0, 0.8);

            var gfx:createjs.Graphics = new createjs.Graphics();
            gfx.setStrokeStyle(2);
            gfx.beginStroke(this.colorValue);
            //gfx.beginStroke(createjs.Graphics.getRGB(r, g, b, 1));
            gfx.moveTo(0, 0);
            gfx.lineTo(TriangleEnemy.SIZE, -(TriangleEnemy.SIZE >> 1));
            gfx.lineTo(TriangleEnemy.SIZE, TriangleEnemy.SIZE >> 1);
            gfx.lineTo(0, 0);
            //gfx.lineTo(TriangleEnemy.SIZE, 0);
            //gfx.lineTo(0, 0);
            gfx.endStroke();

            var shape:createjs.Shape = new createjs.Shape(gfx);
            shape.x = 0;
            shape.y = TriangleEnemy.SIZE >> 1;
            this.addChild(shape);

            this.flashHitShape = shape.clone(false);
            this.flashHitShape.filters = [new createjs.ColorFilter(0,0,0,1,255,255,255,0.8)];
            this.flashHitShape.cache(-TriangleEnemy.SIZE, -TriangleEnemy.SIZE, (TriangleEnemy.SIZE * 2) + 2, TriangleEnemy.SIZE * 2);
            //this.addChild(this.flashHitShape);

            this.regX = TriangleEnemy.SIZE >> 1;
            this.regY = TriangleEnemy.SIZE >> 1;

            this.cache(-1, -1, TriangleEnemy.SIZE + 2, TriangleEnemy.SIZE + 2);

        }

        public getBounds():createjs.Rectangle
        {
            return new createjs.Rectangle(this.x, this.y, TriangleEnemy.SIZE, TriangleEnemy.SIZE);
        }

        public dispose():void
        {
            super.dispose();
        }


        public update():void
        {

            super.update();


        }
    }
}