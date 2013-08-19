/**
 * Author: bear
 * Date: 7/4/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />
///<reference path='base_enemy.ts' />
///<reference path='enums/enemy_spawn_type.ts' />

module com.goldenratio.enemies
{
    export class SquareEnemy extends com.goldenratio.enemies.BaseEnemy
    {
        public static SIZE:number = 20;

        constructor(animationType:string = enums.EnemyAnimationType.LINEAR)
        {
            super(animationType);

            /*var r:number = (Math.random() * 155 >> 0);
            var g:number = (Math.random() * 155 >> 0);
            var b:number = (Math.random() * 155 >> 0);
            */

            this.scoreValue = 50;
            this.hitsToKill = 1;
            this.currentHits = 0;
            this.damage = 20;

            this.bulletType = bullets.EnemyBulletType.SQUARE;
            this.colorValue = createjs.Graphics.getRGB(0, 255, 0, 0.8);

            var gfx:createjs.Graphics = new createjs.Graphics();
            gfx.setStrokeStyle(2);
            gfx.beginStroke(this.colorValue);
            //gfx.beginStroke(createjs.Graphics.getRGB(r, g, b, 1));
            gfx.moveTo(0, 0);
            gfx.lineTo(0, SquareEnemy.SIZE);
            gfx.lineTo(SquareEnemy.SIZE, SquareEnemy.SIZE);
            gfx.lineTo(SquareEnemy.SIZE, 0);
            gfx.lineTo(0, 0);
            gfx.endStroke();

            var shape:createjs.Shape = new createjs.Shape(gfx);
            //var glowSize:number = 5;
            //shape.shadow = new createjs.Shadow(createjs.Graphics.getRGB(0, 255, 0, 0.6), 0, 0, glowSize);

            this.addChild(shape);
            this.regX = SquareEnemy.SIZE >> 1;
            this.regY = SquareEnemy.SIZE >> 1;

            //this.cache(-(glowSize + 1), -(glowSize + 1), SquareEnemy.SIZE + (glowSize * 2) + 2, SquareEnemy.SIZE + (glowSize * 2) + 2);
            this.cache(-1, -1, SquareEnemy.SIZE + 2, SquareEnemy.SIZE + 2);

            this.ROTATION_SPEED = 10;
            if(this.animationType == enums.EnemyAnimationType.L_DOWN ||
                this.animationType == enums.EnemyAnimationType.L_UP ||
                this.animationType == enums.EnemyAnimationType.CIRCLE)
            {
                this.ROTATION_SPEED = 20;
            }

        }

        public getBounds():createjs.Rectangle
        {
            return new createjs.Rectangle(this.x, this.y, SquareEnemy.SIZE, SquareEnemy.SIZE);
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
