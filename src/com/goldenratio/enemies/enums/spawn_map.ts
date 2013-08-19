/**
 * Author: bear
 * Date: 7/7/13
 */
///<reference path='../../../../../definitions/easeljs.d.ts' />
///<reference path='enemy_type.ts' />
///<reference path='enemy_spawn_type.ts' />

module com.goldenratio.enemies.enums
{
    export class MapData
    {

        constructor(public enemyType:string,
                    public time:number,
                    public position:createjs.Point,
                    public animationType:string,
                    public canFire:bool = false)
        {

        }
    }

    export class SpawnMap
    {
        public static map:MapData[] = [

                new MapData(EnemyType.SQUARE, 5, new createjs.Point(700, 100),  EnemyAnimationType.LINEAR),

                new MapData(EnemyType.SQUARE, 12, new createjs.Point(700, 200),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.SQUARE, 14, new createjs.Point(700, 200),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.SQUARE, 16, new createjs.Point(700, 400),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.SQUARE, 18, new createjs.Point(700, 400),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.SQUARE, 28, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.SQUARE, 30, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.SQUARE, 38, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.SQUARE, 40, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.SQUARE, 56, new createjs.Point(700, 250),  EnemyAnimationType.LINEAR, true),
                new MapData(EnemyType.SQUARE, 58, new createjs.Point(700, 250),  EnemyAnimationType.LINEAR, true),
                new MapData(EnemyType.SQUARE, 66, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.SQUARE, 68, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN, true),
                new MapData(EnemyType.SQUARE, 78, new createjs.Point(100, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.SQUARE, 80, new createjs.Point(100, 500),  EnemyAnimationType.L_UP, true),

                new MapData(EnemyType.SQUARE, 90, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.SQUARE, 92, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.SQUARE, 94, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN, true),
                new MapData(EnemyType.SQUARE, 96, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.SQUARE, 98, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),

                new MapData(EnemyType.SQUARE, 102, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.SQUARE, 104, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.SQUARE, 106, new createjs.Point(200, 500),  EnemyAnimationType.L_UP, true),
                new MapData(EnemyType.SQUARE, 108, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.SQUARE, 110, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),

                new MapData(EnemyType.HEXAGON, 126, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.HEXAGON, 128, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.HEXAGON, 130, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.HEXAGON, 132, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),

                new MapData(EnemyType.HEXAGON, 166, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.HEXAGON, 168, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.HEXAGON, 170, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN, true),
                new MapData(EnemyType.HEXAGON, 172, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),

                new MapData(EnemyType.HEXAGON, 174, new createjs.Point(100, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.HEXAGON, 176, new createjs.Point(100, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.HEXAGON, 178, new createjs.Point(100, 500),  EnemyAnimationType.L_UP, true),
                new MapData(EnemyType.HEXAGON, 180, new createjs.Point(100, 500),  EnemyAnimationType.L_UP),

                new MapData(EnemyType.HEXAGON, 200, new createjs.Point(700, 100),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.HEXAGON, 204, new createjs.Point(700, 150),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.HEXAGON, 208, new createjs.Point(700, 200),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.HEXAGON, 212, new createjs.Point(700, 250),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.HEXAGON, 216, new createjs.Point(700, 300),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.HEXAGON, 220, new createjs.Point(700, 350),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.HEXAGON, 224, new createjs.Point(700, 400),  EnemyAnimationType.LINEAR),

                new MapData(EnemyType.HEXAGON, 236, new createjs.Point(700, 400),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.HEXAGON, 240, new createjs.Point(700, 350),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.HEXAGON, 244, new createjs.Point(700, 300),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.HEXAGON, 248, new createjs.Point(700, 250),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.HEXAGON, 252, new createjs.Point(700, 200),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.HEXAGON, 256, new createjs.Point(700, 150),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.HEXAGON, 260, new createjs.Point(700, 100),  EnemyAnimationType.LINEAR),

                new MapData(EnemyType.HEXAGON, 272, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.HEXAGON, 274, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE, true),

                new MapData(EnemyType.SQUARE, 292, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.SQUARE, 294, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE, true),

                new MapData(EnemyType.HEXAGON, 332, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.SQUARE, 334, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),

                new MapData(EnemyType.SQUARE, 336, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.HEXAGON, 338, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),

                new MapData(EnemyType.HEXAGON, 340, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.SQUARE, 342, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),

                new MapData(EnemyType.SQUARE, 344, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.HEXAGON, 346, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),

                new MapData(EnemyType.HEXAGON, 348, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.SQUARE, 350, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),

                new MapData(EnemyType.SQUARE, 352, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.HEXAGON, 354, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),

                new MapData(EnemyType.HEXAGON, 374, new createjs.Point(700, 150),  EnemyAnimationType.LINEAR, true),
                new MapData(EnemyType.HEXAGON, 376, new createjs.Point(700, 150),  EnemyAnimationType.LINEAR, true),

                new MapData(EnemyType.HEXAGON, 380, new createjs.Point(700, 250),  EnemyAnimationType.LINEAR, true),
                new MapData(EnemyType.HEXAGON, 382, new createjs.Point(700, 250),  EnemyAnimationType.LINEAR, true),

                new MapData(EnemyType.HEXAGON, 384, new createjs.Point(700, 350),  EnemyAnimationType.LINEAR, true),
                new MapData(EnemyType.HEXAGON, 386, new createjs.Point(700, 350),  EnemyAnimationType.LINEAR, true),

                new MapData(EnemyType.TRIANGLE, 400, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.TRIANGLE, 402, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN, true),
                new MapData(EnemyType.TRIANGLE, 404, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),

                new MapData(EnemyType.TRIANGLE, 410, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.TRIANGLE, 412, new createjs.Point(200, 500),  EnemyAnimationType.L_UP, true),
                new MapData(EnemyType.TRIANGLE, 414, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),

                new MapData(EnemyType.TRIANGLE, 430, new createjs.Point(700, 100),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.TRIANGLE, 432, new createjs.Point(700, 100),  EnemyAnimationType.LINEAR),

                new MapData(EnemyType.TRIANGLE, 436, new createjs.Point(700, 250),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.TRIANGLE, 438, new createjs.Point(700, 250),  EnemyAnimationType.LINEAR, true),

                new MapData(EnemyType.TRIANGLE, 442, new createjs.Point(700, 400),  EnemyAnimationType.LINEAR),
                new MapData(EnemyType.TRIANGLE, 444, new createjs.Point(700, 400),  EnemyAnimationType.LINEAR),

                new MapData(EnemyType.TRIANGLE, 460, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.TRIANGLE, 462, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.TRIANGLE, 464, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE, true),
                new MapData(EnemyType.TRIANGLE, 466, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.TRIANGLE, 468, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.TRIANGLE, 470, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.TRIANGLE, 472, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE, true),
                new MapData(EnemyType.TRIANGLE, 474, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.TRIANGLE, 476, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.TRIANGLE, 478, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE, true),
                new MapData(EnemyType.TRIANGLE, 480, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.TRIANGLE, 482, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.TRIANGLE, 484, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),
                new MapData(EnemyType.TRIANGLE, 486, new createjs.Point(700, 100),  EnemyAnimationType.CIRCLE),

                new MapData(EnemyType.TRIANGLE, 550, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.TRIANGLE, 552, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.TRIANGLE, 554, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.TRIANGLE, 556, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN, true),
                new MapData(EnemyType.TRIANGLE, 558, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.TRIANGLE, 560, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.TRIANGLE, 562, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.TRIANGLE, 564, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN, true),
                new MapData(EnemyType.TRIANGLE, 566, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),
                new MapData(EnemyType.TRIANGLE, 568, new createjs.Point(100, -60),  EnemyAnimationType.L_DOWN),

                new MapData(EnemyType.TRIANGLE, 576, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.TRIANGLE, 578, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.TRIANGLE, 580, new createjs.Point(200, 500),  EnemyAnimationType.L_UP, true),
                new MapData(EnemyType.TRIANGLE, 582, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.TRIANGLE, 584, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.TRIANGLE, 586, new createjs.Point(200, 500),  EnemyAnimationType.L_UP, true),
                new MapData(EnemyType.TRIANGLE, 588, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.TRIANGLE, 590, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
                new MapData(EnemyType.TRIANGLE, 592, new createjs.Point(200, 500),  EnemyAnimationType.L_UP, true),
                new MapData(EnemyType.TRIANGLE, 594, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),

                new MapData(EnemyType.MISSION_COMPLETE, 660, null,  null)

            /*new MapData(EnemyType.SQUARE, 3, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
            new MapData(EnemyType.SQUARE, 5, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
            new MapData(EnemyType.SQUARE, 7, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
            new MapData(EnemyType.SQUARE, 9, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
            new MapData(EnemyType.SQUARE, 11, new createjs.Point(200, -60),  EnemyAnimationType.L_DOWN),
            new MapData(EnemyType.SQUARE, 13, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
            new MapData(EnemyType.SQUARE, 15, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
            new MapData(EnemyType.SQUARE, 17, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
            new MapData(EnemyType.SQUARE, 19, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
            new MapData(EnemyType.SQUARE, 21, new createjs.Point(200, 500),  EnemyAnimationType.L_UP),
            new MapData(EnemyType.SQUARE, 21, new createjs.Point(700, 150),  EnemyAnimationType.LINEAR),
            new MapData(EnemyType.SQUARE, 30, new createjs.Point(700, 250),  EnemyAnimationType.LINEAR),
            new MapData(EnemyType.SQUARE, 40, new createjs.Point(700, 400),  EnemyAnimationType.LINEAR),
            new MapData(EnemyType.SQUARE, 50, new createjs.Point(700, 300),  EnemyAnimationType.LINEAR),
            new MapData(EnemyType.SQUARE, 60, new createjs.Point(700, 50),  EnemyAnimationType.LINEAR),
            new MapData(EnemyType.SQUARE, 70, new createjs.Point(700, 300),  EnemyAnimationType.LINEAR),
            new MapData(EnemyType.SQUARE, 80, new createjs.Point(700, 200),  EnemyAnimationType.LINEAR)*/
        ];
    }
}