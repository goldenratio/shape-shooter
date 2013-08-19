/**
 * Author: bear
 * Date: 7/10/13
 */

///<reference path='../../../../../definitions/easeljs.d.ts' />
///<reference path='enemy_bullet.ts' />

module com.goldenratio.enemies.bullets
{

    export class HexagonBullet extends EnemyBullet
    {
        constructor(targetPos:createjs.Point, selfPos:createjs.Point)
        {
            this.colorValue = createjs.Graphics.getRGB(103, 204, 255, 1);
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