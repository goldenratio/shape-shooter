/**
 * Author: bear
 * Date: 7/4/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />
///<reference path='../../../../definitions/tweenjs.d.ts' />
///<reference path='../../../../definitions/soundjs.d.ts' />
///<reference path='../basic_display.ts' />
///<reference path='enums/enemy_spawn_type.ts' />
///<reference path='../utils/timer.ts' />
///<reference path='bullets/enemy_bullet_event.ts' />
///<reference path='../enums.ts' />

module com.goldenratio.enemies
{


    export class BaseEnemy extends com.goldenratio.BasicDisplayObject
    {
        public scoreValue:number = 50;
        public canFire:bool = false;
        public isAlive:bool = true;
        public canRemove:bool = false;
        public colorValue:string;
        public autoRotate:bool = false;

        public hitsToKill:number = 1;
        public currentHits:number = 0;
        public damage:number = 10;

        public bulletType:string;

        public flashHitShape:createjs.Shape;

        public static EXPLOSION_PIXEL_SIZE:number = 5;
        public static EXPLOSION_DISTANCE:number = 60;
        public static EXPLOSION_COUNT:number = 8;

        public ROTATION_SPEED:number = 10;

        private secondDirection:bool = false;
        private flashHitTimer:com.goldenratio.utils.Timer;

        private degree:number = 0;
        private tempPosition:createjs.Point;
        public circleRadius:number = 150;


        public static FIRE_RELOAD_TIME:number = 25;
        private fireTimeCount:number = 0;

        private onTimerCompleteBind:any;

        constructor(public animationType:string = enums.EnemyAnimationType.LINEAR)
        {
            super();
            this.colorValue = createjs.Graphics.getRGB(255, 255, 255, 0.8);
        }

        public dispose():void
        {
            super.dispose();
            if(this.tempPosition)
            {
                this.tempPosition = null;
            }
            if(this.flashHitShape)
            {
                this.flashHitShape = null;
            }
            if(this.flashHitTimer)
            {
                if(this.onTimerCompleteBind)
                {
                    this.flashHitTimer.removeEventListener(utils.TimerEvent.TIMER, this.onTimerCompleteBind);
                }
                this.flashHitTimer.dispose();
                this.flashHitTimer = null;
            }

            this.onTimerCompleteBind = null;

        }

        public update():void
        {
            if(this.isAlive == false)
            {
                return;
            }

            this.fireTimeCount ++;
            if(this.canFire == true && this.fireTimeCount == BaseEnemy.FIRE_RELOAD_TIME)
            {
                //console.log("fire");
                this.fireTimeCount = 0;
                var fireEvent:bullets.EnemyBulletEvent = new bullets.EnemyBulletEvent();
                fireEvent.type = bullets.EnemyBulletEvent.FIRE;
                fireEvent.bulletType = this.bulletType;
                fireEvent.position = new createjs.Point(this.x, this.y);

                this.dispatchEvent(fireEvent, null);
            }

            var tx:number = this.x;
            var ty:number = this.y;

            switch(this.animationType)
            {
                case enums.EnemyAnimationType.LINEAR:
                    tx -= 8;
                    break;

                case enums.EnemyAnimationType.L_DOWN:

                    if(this.x < 500 && this.secondDirection == false)
                    {
                        tx += 8;
                        ty += 4;
                    }
                    else
                    {
                        this.secondDirection = true;
                        tx -= 8;
                        ty += 4;
                    }

                    break;

                case enums.EnemyAnimationType.L_UP:
                    if(this.x < 500 && this.secondDirection == false)
                    {
                        tx += 8;
                        ty -= 4;
                    }
                    else
                    {
                        this.secondDirection = true;
                        tx -= 8;
                        ty -= 4;
                    }
                    break;

                case enums.EnemyAnimationType.CIRCLE:
                    if(this.x > 480 && this.secondDirection == false)
                    {
                        tx -= 8;
                        ty += 4;
                    }
                    else if(this.degree <= 500)
                    {
                        if(this.secondDirection == false)
                        {
                            this.tempPosition = new createjs.Point(this.x, this.y);
                        }
                        this.secondDirection = true;
                        var rad:number = this.degree * Math.PI / 180;
                        tx = (this.tempPosition.x - this.circleRadius) + Math.cos(rad) * this.circleRadius;
                        ty = this.tempPosition.y + Math.sin(rad) * this.circleRadius;
                        //this.y -= 5;
                        this.degree += 4;

                    }
                    else
                    {
                        tx -= 8;
                        ty -= 8;
                    }

                    break;
            }

            if(this.autoRotate == true)
            {
                var deltaY:number = this.y - ty;
                var deltaX:number = this.x - tx;

                this.rotation = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
            }
            else
            {
                if(this.rotation <= 0)
                    this.rotation = 360;
                else
                    this.rotation -= this.ROTATION_SPEED;


            }


            this.x = tx;
            this.y = ty;


        }

        private onTimerComplete(event:utils.TimerEvent):void
        {
            //console.log("brrrr");
            //this.filters = [];
            //this.alpha = 1;
            this.removeChild(this.flashHitShape);
            this.updateCache(null);

            this.flashHitTimer.dispose();
            this.flashHitTimer.removeEventListener(utils.TimerEvent.TIMER, this.onTimerCompleteBind);
            this.onTimerCompleteBind = null;
            this.flashHitTimer = null;
        }

        private flashHit():void
        {

            if(this.flashHitTimer || this.flashHitShape == null)
            {
                return;
            }

            this.flashHitTimer =  new com.goldenratio.utils.Timer(100, 1);
            this.onTimerCompleteBind = this.onTimerComplete.bind(this);
            this.flashHitTimer.addEventListener(utils.TimerEvent.TIMER_COMPLETE, this.onTimerCompleteBind);


            //this.shadow = new createjs.Shadow("#ff0000", 5, 5, 10);
            //this.filters = [new createjs.ColorFilter(0,0,0,1,255,255,255,0)];
            //this.updateCache(null);

            //this.alpha = 0.3;
            this.addChild(this.flashHitShape);
            this.updateCache(null);

            this.flashHitTimer.start();

            createjs.Sound.play(SoundType.ENEMY_SINGLE_HIT);

        }

        public die(immediately:bool = false):void
        {
            this.currentHits ++;
            if((this.currentHits < this.hitsToKill) && immediately == false)
            {
                this.flashHit();
                return;
            }
            this.uncache();
            this.removeAllChildren();
            this.rotation = 0;

            this.isAlive = false;

            var separation:number = (360 / BaseEnemy.EXPLOSION_COUNT) >> 0;
            var angle:number = 0;
            for(var i:number = 0; i < BaseEnemy.EXPLOSION_COUNT; i++)
            {
                var exp:createjs.Shape = new createjs.Shape();
                exp.graphics.setStrokeStyle(0);
                exp.graphics.beginFill(this.colorValue);
                exp.graphics.drawRect(0, 0, BaseEnemy.EXPLOSION_PIXEL_SIZE, BaseEnemy.EXPLOSION_PIXEL_SIZE);
                exp.graphics.endFill();
                exp.graphics.endStroke();
                exp.regX = BaseEnemy.EXPLOSION_PIXEL_SIZE >> 1;
                exp.regY = BaseEnemy.EXPLOSION_PIXEL_SIZE >> 1;

                exp.x = this.getBounds().width >> 1;
                exp.y = this.getBounds().width >> 1;



                exp.cache(0, 0, BaseEnemy.EXPLOSION_PIXEL_SIZE, BaseEnemy.EXPLOSION_PIXEL_SIZE);

                this.addChild(exp);

                var rad:number = angle * Math.PI / 180;
                var dx:number = exp.x + Math.cos(rad) * BaseEnemy.EXPLOSION_DISTANCE;
                var dy:number = exp.y + Math.sin(rad) * BaseEnemy.EXPLOSION_DISTANCE;
                createjs.Sound.play(SoundType.ENEMY_HIT);
                createjs.Tween.get(exp).to({x: dx, y: dy}, 300, createjs.Ease.linear).call(this.onExplosionComplete.bind(this, i));
                angle += separation;
            }
        }

        private onExplosionComplete(explosionCount:number):void
        {
            if(explosionCount == BaseEnemy.EXPLOSION_COUNT - 1)
            {
                this.canRemove = true;
            }
        }

    }
}
