/**
 * Author: bear
 * Date: 7/14/13
 */

///<reference path='../../../../../definitions/easeljs.d.ts' />
///<reference path='enemy_bullet.ts' />

module com.goldenratio.enemies.bullets
{

    export class TriangleBullet extends EnemyBullet
    {
        constructor(targetPos:createjs.Point, selfPos:createjs.Point)
        {
            this.colorValue = createjs.Graphics.getRGB(255, 255, 0, 0.8);
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