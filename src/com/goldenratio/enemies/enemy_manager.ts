/**
 * Author: bear
 * Date: 7/4/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />
///<reference path='square_enemy.ts' />
///<reference path='hexagon_enemy.ts' />
///<reference path='triangle_enemy.ts' />
///<reference path='bullets/enemy_bullet_event.ts' />
///<reference path='bullets/hexagon_bullet.ts' />
///<reference path='bullets/triangle_bullet.ts' />
///<reference path='bullets/square_bullet.ts' />
///<reference path='../hero/hero.ts' />
///<reference path='../hero/bullet.ts' />
///<reference path='../texts/score.ts' />
///<reference path='enums/spawn_map.ts' />
///<reference path='../utils/timer.ts' />
///<reference path='../utils/collision_detection.ts' />

module com.goldenratio.enemies
{
    export class EnemyManager
    {
        private enemyList:BaseEnemy[] = [];
        private enemyBulletList:bullets.EnemyBullet[] = [];

        private spawnTimer:com.goldenratio.utils.Timer;
        private currentMapCount:number = 0;
        private bulletBoundaries:createjs.Rectangle = new createjs.Rectangle(-50, -50, 700, 530);

        private onTimerHandlerBind:any;
        private onEnemyFireBind:any;

        constructor(public stage:createjs.Stage, public hero:com.goldenratio.hero.Hero,
                    public bulletList:com.goldenratio.Bullet[], public score:com.goldenratio.texts.Score)
        {
            //super();
        }

        public dispose():void
        {
            if(this.spawnTimer)
            {
                this.spawnTimer.stop();
                this.spawnTimer.removeEventListener(utils.TimerEvent.TIMER, this.onTimerHandlerBind);
                this.spawnTimer = null;
            }

            if(this.enemyList)
            {
                for(var i:number = this.enemyList.length - 1; i >=0; i--)
                {
                    this.enemyList[i].dispose();
                    this.enemyList[i].removeEventListener(bullets.EnemyBulletEvent.FIRE, this.onEnemyFireBind);
                    this.enemyList[i] = null;
                    this.enemyList.splice(i, 1);
                }

                this.enemyList = null;
            }

            if(this.enemyBulletList)
            {
                for(var j:number = this.enemyBulletList.length - 1; j >= 0; j--)
                {
                    this.enemyBulletList[j].dispose();
                    this.enemyBulletList[j] = null;
                    this.enemyBulletList.splice(j, 1);
                }
            }

            if(this.hero)
            {
                this.hero = null;
            }
            if(this.bulletList)
            {
                for(var k:number = 0; k < this.bulletList.length; k++)
                {
                    this.bulletList[k].dispose();
                    this.bulletList[k] = null;
                }

                this.bulletList.length = 0;
                this.bulletList = null;
            }

            this.onEnemyFireBind = null;
            this.onTimerHandlerBind = null;
            this.score = null;
            this.stage = null;

        }

        public init():void
        {
            this.onTimerHandlerBind = this.onTimerHandler.bind(this);
            this.onEnemyFireBind = this.onEnemyFire.bind(this);

            this.spawnTimer = new com.goldenratio.utils.Timer(100);
            this.spawnTimer.addEventListener(utils.TimerEvent.TIMER, this.onTimerHandlerBind);
            this.spawnTimer.start();


        }

        private onTimerHandler(event:com.goldenratio.utils.TimerEvent):void
        //private onTimer(time:number):void
        {
            //console.log("timer.. " + event.currentCount + ", " + this.enemyList.length);
            for(var i:number = this.currentMapCount; i < enums.SpawnMap.map.length; i++)
            {
                //console.log(this.currentMapCount);

                if(event.currentCount == enums.SpawnMap.map[i].time)
                {
                    this.spawnEnemy(enums.SpawnMap.map[i]);
                    this.currentMapCount ++;
                }
                else
                {
                    break;
                }

            }
        }

        private spawnEnemy(data:enums.MapData)
        {
            switch(data.enemyType)
            {
                case enums.EnemyType.SQUARE:
                    var square:SquareEnemy = new SquareEnemy(data.animationType);
                    square.addEventListener(bullets.EnemyBulletEvent.FIRE, this.onEnemyFireBind);
                    square.x = data.position.x;
                    square.y = data.position.y;
                    square.canFire = data.canFire;
                    this.stage.addChild(square);

                    this.enemyList.push(square);
                    break;

                case enums.EnemyType.HEXAGON:
                    var hexagon:HexagonEnemy = new HexagonEnemy(data.animationType);
                    hexagon.addEventListener(bullets.EnemyBulletEvent.FIRE, this.onEnemyFireBind);
                    hexagon.x = data.position.x;
                    hexagon.y = data.position.y;
                    hexagon.canFire = data.canFire;
                    this.stage.addChild(hexagon);

                    this.enemyList.push(hexagon);
                    break;

                case enums.EnemyType.TRIANGLE:
                    var triangle:TriangleEnemy = new TriangleEnemy(data.animationType);
                    triangle.addEventListener(bullets.EnemyBulletEvent.FIRE, this.onEnemyFireBind);
                    triangle.x = data.position.x;
                    triangle.y = data.position.y;
                    triangle.canFire = data.canFire;
                    this.stage.addChild(triangle);

                    this.enemyList.push(triangle);
                    break;

                case enums.EnemyType.MISSION_COMPLETE:
                    this.hero.onMissionComplete();
                    break;
            }
        }

        private onEnemyFire(event:bullets.EnemyBulletEvent):void
        {
            //console.log(event.bulletType);
            var tempBullet:bullets.EnemyBullet;
            switch(event.bulletType)
            {
                case bullets.EnemyBulletType.HEXAGON:
                    tempBullet = new bullets.HexagonBullet(new createjs.Point(this.hero.x, this.hero.y), event.position);
                    tempBullet.x = event.position.x;
                    tempBullet.y = event.position.y;
                    this.stage.addChild(tempBullet);

                    this.enemyBulletList.push(tempBullet);
                    break;

                case bullets.EnemyBulletType.TRIANGLE:
                    tempBullet = new bullets.TriangleBullet(new createjs.Point(this.hero.x, this.hero.y), event.position);
                    tempBullet.x = event.position.x;
                    tempBullet.y = event.position.y;
                    this.stage.addChild(tempBullet);

                    this.enemyBulletList.push(tempBullet);
                    break;

                case bullets.EnemyBulletType.SQUARE:
                    tempBullet = new bullets.SquareBullet(new createjs.Point(this.hero.x, this.hero.y), event.position);
                    tempBullet.x = event.position.x;
                    tempBullet.y = event.position.y;
                    this.stage.addChild(tempBullet);

                    this.enemyBulletList.push(tempBullet);
                    break;
            }
        }


        public togglePause()
        {
            if(createjs.Ticker.getPaused() == true)
            {
                this.spawnTimer.pause();
            }
            else
            {
                this.spawnTimer.start();
            }

        }

        public stopSpawn():void
        {
            if(this.spawnTimer)
            {
                this.spawnTimer.stop();
            }

        }


        public update():void
        {
            var j:number;
            var i:number;
            for(i = this.enemyList.length - 1; i >= 0; i--)
            {
                if(this.enemyList[i].isAlive == true)
                {
                    this.enemyList[i].update();
                }


                if(this.hero)
                {
                    if(this.enemyList[i].isAlive == true && this.hero.isAlive == true)
                    {
                        if(com.goldenratio.utils.CollisionDetection.isColliding(this.hero, this.enemyList[i]))
                        {
                            console.log("player dies");
                            this.enemyList[i].die(true);
                            this.hero.reduceHealth(this.enemyList[i].damage);
                        }

                        for(j = this.bulletList.length - 1; j >= 0; j--)
                        {

                            if(com.goldenratio.utils.CollisionDetection.isColliding(this.bulletList[j], this.enemyList[i])
                                && this.bulletList[j].isAlive == true)
                            {
                                console.log("hit");

                                this.bulletList[j].die();
                                this.enemyList[i].die();

                                this.score.add(this.enemyList[i].scoreValue);
                            }
                        }

                    }


                }

                if(this.enemyList[i].x < -this.enemyList[i].getBounds().width || this.enemyList[i].canRemove == true)
                {
                    if(this.enemyList[i])
                    {
                        this.enemyList[i].dispose();
                        this.enemyList[i].removeEventListener(bullets.EnemyBulletEvent.FIRE, this.onEnemyFireBind);
                        this.stage.removeChild(this.enemyList[i]);
                        this.enemyList[i] = null;
                        this.enemyList.splice(i, 1);
                    }

                }

            }

            for(i = this.bulletList.length - 1; i >= 0; i--)
            {
                if(this.bulletList[i].canRemove == true)
                {
                    this.bulletList[i].dispose();
                    this.stage.removeChild(this.bulletList[i]);
                    this.bulletList[i] = null;
                    this.bulletList.splice(i, 1);

                }
            }


            for(i = this.enemyBulletList.length - 1; i >= 0; i--)
            {
                if(this.enemyBulletList[i].isAlive == true)
                {
                    this.enemyBulletList[i].update();
                }

                if(this.hero)
                {
                    if(this.hero.isAlive == true && this.enemyBulletList[i].isAlive == true)
                    {
                        if(com.goldenratio.utils.CollisionDetection.isColliding(this.enemyBulletList[i], this.hero))
                        {
                            //console.log("enemy hit");

                            this.enemyBulletList[i].die();
                            this.hero.reduceHealth(this.enemyBulletList[i].damageFromAmmo);

                        }
                    }
                }


                if(this.enemyBulletList[i].x > this.bulletBoundaries.width ||
                    this.enemyBulletList[i].x < this.bulletBoundaries.x ||
                    this.enemyBulletList[i].y > this.bulletBoundaries.height ||
                    this.enemyBulletList[i].y < this.bulletBoundaries.y ||
                    this.enemyBulletList[i].canRemove)
                {
                    this.enemyBulletList[i].dispose();
                    this.stage.removeChild(this.enemyBulletList[i]);
                    this.enemyBulletList[i] = null;
                    this.enemyBulletList.splice(i, 1);
                }
            }


        }
    }
}
