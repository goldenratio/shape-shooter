/**
 * Author: bear
 * Date: 7/13/13
 */

///<reference path='../../../../../definitions/easeljs.d.ts' />
module com.goldenratio.enemies.bullets
{
    export class EnemyBulletType
    {
        public static HEXAGON:string = "com.goldenratio.enemies.bullets.EnemyBulletType.HEXAGON";
        public static TRIANGLE:string = "com.goldenratio.enemies.bullets.EnemyBulletType.TRIANGLE";
        public static SQUARE:string = "com.goldenratio.enemies.bullets.EnemyBulletType.SQUARE";
    }
    export class EnemyBulletEvent
    {

        public static FIRE:string = "com.goldenratio.enemies.bullets.EnemyBulletType.FIRE";

        public type:string;
        public position:createjs.Point;
        public bulletType:string;
    }
}