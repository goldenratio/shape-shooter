/**
 * Author: bear
 * Date: 7/15/13
 */

///<reference path='../../../../../definitions/easeljs.d.ts' />
///<reference path='enemy_bullet.ts' />

module com.goldenratio.enemies.bullets
{

    export class SquareBullet extends EnemyBullet
    {
        constructor(targetPos:createjs.Point, selfPos:createjs.Point)
        {
            this.colorValue = createjs.Graphics.getRGB(0, 255, 0, 0.8);
            super(targetPos, selfPos);
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