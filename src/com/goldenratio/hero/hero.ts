/**
 * User: Karthik VJ
 * Date: 7/2/13
 * Time: 1:05 PM
 */

///<reference path='../../../../definitions/easeljs.d.ts' />
///<reference path='../../../../definitions/tweenjs.d.ts' />
///<reference path='../../../../definitions/soundjs.d.ts' />
///<reference path='../utils/keyboard.ts' />
///<reference path='hero_event_type.ts' />
///<reference path='../basic_display.ts' />
///<reference path='../enums.ts' />

module com.goldenratio.hero
{
    export class Hero extends com.goldenratio.BasicDisplayObject
    {
        public static EXPLOSION_PIXEL_SIZE:number = 8;
        public static EXPLOSION_DISTANCE:number = 80;
        public static EXPLOSION_COUNT:number = 10;

        private shape:createjs.Shape;
        private size:number = 10;
        private shootAnimatePending:bool = false;
        private keyboard:com.goldenratio.utils.Keyboard;

        private speed:number = 0.8;
        private velocity:createjs.Point = new createjs.Point();
        private friction:number = 0.93;
        private maxSpeed:number = 8;

        private reloadSpeed:number = 150; // millisecond

        public isAlive:bool = true;
        public canRemove:bool = false;
        private healthValue:number = 100;

        private colorValue:string;;


        constructor(keyboardRef:com.goldenratio.utils.Keyboard)
        {
            super();
            this.keyboard = keyboardRef;
            this.isAlive = true;
            this.healthValue = 100;
            this.canRemove = false;

            this.colorValue = createjs.Graphics.getRGB(255, 255, 255, 0.6);

            var gfx = new createjs.Graphics();
            gfx.setStrokeStyle(2);

            gfx.beginStroke(this.colorValue);
            gfx.drawCircle(0, 0, this.size);
            gfx.endStroke();

            this.shape = new createjs.Shape(gfx);
            this.shape.shadow = new createjs.Shadow(createjs.Graphics.getRGB(255, 255, 255, 0.7), 0, 0, 6);
            this.addChild(this.shape);


        }

        public dispose():void
        {
            super.dispose();

            this.keyboard = null;
            this.velocity = null;
            this.shape = null;

        }

        public onFire():void
        {

            // show animation
            if(this.animateFireMotion() == true)
            {
                // fire bullets
                this.dispatchEvent(HeroEvent.FIRE_BULLET, null);

            }
        }

        private animateFireMotion():bool
        {
            if(this.shootAnimatePending == true)
                return false;

            //console.log("fire");

            this.shootAnimatePending = true;
            var gfx = new createjs.Graphics();
            gfx.setStrokeStyle(2);

            gfx.beginStroke(createjs.Graphics.getRGB(255, 0, 0, 1));
            gfx.drawCircle(0, 0, this.size);
            gfx.endStroke();

            var animateShape = new createjs.Shape(gfx);
            animateShape.scaleX = 0.2;
            animateShape.scaleY = 0.2;

            this.addChild(animateShape);
            createjs.Sound.play(SoundType.LASER, createjs.Sound.INTERRUPT_NONE, 0, 0, 0, 0.3, 0);
            createjs.Tween.get(animateShape).to({scaleX: 1, scaleY: 1}, this.reloadSpeed).call(this.clearAnimationShape.bind(this, animateShape));

            return true;

        }

        public die():void
        {
            this.isAlive = false;
            this.uncache();
            this.removeAllChildren();

            this.dispatchEvent(HeroEvent.DIE, null);
            createjs.Sound.play(SoundType.PLAYER_DIE);
            this.rotation = 0;                                 //gfx.setStrokeStyle(this.size.height);
            //gfx.beginStroke(this.colorValue);
            //gfx.moveTo(0, 0);
            //gfx.lineTo(this.size.width, 0);
            //gfx.endStroke();

            var separation:number = (360 / Hero.EXPLOSION_COUNT) >> 0;
            var angle:number = 0;
            for(var i:number = 0; i < Hero.EXPLOSION_COUNT; i++)
            {
                var exp:createjs.Shape = new createjs.Shape();
                exp.graphics.setStrokeStyle(0);
                exp.graphics.beginFill(this.colorValue);
                exp.graphics.drawRect(0, 0, Hero.EXPLOSION_PIXEL_SIZE, Hero.EXPLOSION_PIXEL_SIZE);
                exp.graphics.endFill();
                exp.graphics.endStroke();
                exp.regX = Hero.EXPLOSION_PIXEL_SIZE >> 1;
                exp.regY = Hero.EXPLOSION_PIXEL_SIZE >> 1;

                //exp.x = this.getBounds().width >> 1;
                //exp.y = this.getBounds().width >> 1;

                exp.cache(0, 0, Hero.EXPLOSION_PIXEL_SIZE, Hero.EXPLOSION_PIXEL_SIZE);

                this.addChild(exp);

                var rad:number = angle * Math.PI / 180;
                var dx:number = exp.x + Math.cos(rad) * Hero.EXPLOSION_DISTANCE;
                var dy:number = exp.y + Math.sin(rad) * Hero.EXPLOSION_DISTANCE;
                createjs.Tween.get(exp).to({x: dx, y: dy}, 300, createjs.Ease.linear).call(this.onExplosionComplete.bind(this, i));
                angle += separation;
            }
        }

        private onExplosionComplete(explosionCount:number):void
        {
            if(explosionCount == Hero.EXPLOSION_COUNT - 1)
            {
                console.log("Game Over");
                this.canRemove = true;
            }
        }

        public onMissionComplete():void
        {
            this.dispatchEvent(HeroEvent.MISSION_COMPLETE, null);
        }

        public getBounds():createjs.Rectangle
        {
            return new createjs.Rectangle(this.x, this.y, this.size * 2, this.size * 2);
        }

        private clearAnimationShape(animateShape:createjs.Shape):void
        {
            this.removeChild(animateShape);
            this.shootAnimatePending = false;
        }

        public reduceHealth(value:number):void
        {
            this.healthValue -= value;
            this.dispatchEvent(HeroEvent.PLAYER_HIT, null);
            createjs.Sound.play(SoundType.PLAYER_HIT);
            if(this.healthValue <= 0)
            {
                this.healthValue = 0;
                this.die();
            }
        }


        public getHealth():number
        {
            return this.healthValue;
        }


        public update():void
        {
            //console.log(this.keyboard.isDown);
            if(this.isAlive == false)
            {
                return;
            }

            if(this.y < this.size)
            {
                this.velocity.y = 0;
                this.y = this.size;
                return;
            }

            if(this.y > 470)
            {
                this.velocity.y = 0;
                this.y = 470;
                return;
            }

            if(this.x < 10)
            {
                this.velocity.x = 0;
                this.x = 10;
                return;
            }

            if(this.x > 630)
            {
                this.velocity.x = 0;
                this.x = 630;
                return;
            }


            if(this.keyboard.isKeyPress(com.goldenratio.utils.KeyboardEnum.DOWN))
            {
                this.velocity.y += this.speed;
            }
            else if(this.keyboard.isKeyPress(com.goldenratio.utils.KeyboardEnum.UP))
            {
                this.velocity.y -= this.speed;
            }
            else
            {
                this.velocity.y *= this.friction;
            }

            if(this.keyboard.isKeyPress(com.goldenratio.utils.KeyboardEnum.LEFT))
            {
                this.velocity.x -= this.speed;
            }
            else if(this.keyboard.isKeyPress(com.goldenratio.utils.KeyboardEnum.RIGHT))
            {
                this.velocity.x += this.speed;
            }
            else
            {
                this.velocity.x *= this.friction;
            }

            if(this.keyboard.isKeyPress(com.goldenratio.utils.KeyboardEnum.Z))
            {
                this.onFire();
            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;

            if(this.velocity.x > this.maxSpeed)
                this.velocity.x = this.maxSpeed;
            else if(this.velocity.x < -this.maxSpeed)
                this.velocity.x = -this.maxSpeed;

            if(this.velocity.y > this.maxSpeed)
                this.velocity.y = this.maxSpeed;
            else if(this.velocity.y < -this.maxSpeed)
                this.velocity.y = -this.maxSpeed;
        }

    }
}