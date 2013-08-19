/**
 * @author: Karthik VJ
 **/

///<reference path='../../../definitions/easeljs.d.ts' />
///<reference path='../../../definitions/tweenjs.d.ts' />
///<reference path='../../../definitions/preloadjs.d.ts' />
///<reference path='../../../definitions/soundjs.d.ts' />
///<reference path='hero/hero.ts' />
///<reference path='utils/keyboard.ts' />
///<reference path='background_grid.ts' />
///<reference path='hero/bullet.ts' />
///<reference path='hero/hero_event_type.ts' />
///<reference path='elements/health_bar.ts' />
///<reference path='elements/red_screen.ts' />
///<reference path='elements/mute_icon.ts' />
///<reference path='texts/score.ts' />
///<reference path='screens/game_over.ts' />
///<reference path='texts/paused_text.ts' />
///<reference path='enemies/enemy_manager.ts' />
///<reference path='enemies/bullets/enemy_bullet.ts' />
///<reference path='enums.ts' />
///<reference path='utils/auto_mouse_hide.ts' />
///<reference path='utils/harlem_shake.ts' />

module com.goldenratio
{
    export class Main extends createjs.EventDispatcher
    {
        private stage:createjs.Stage;
        private backgroundGrid:BackgroundGrid;
        private keyboard:utils.Keyboard;
        private hero:hero.Hero;
        private bulletList:Bullet[] = [];
        private enemyManager:enemies.EnemyManager;
        private healthBar:elements.HealthBar;
        private redScreen:elements.RedScreen;
        private pausedText:texts.PausedText;
        private score:texts.Score;
        private muteIcon:elements.MuteIcon;
        private gameOverScreen:screens.GameOverScreen;
        private autoMouseHide:utils.AutoMouseHide;
        private harlemShake:utils.HarlemShake;

        private bulletBoundaries:createjs.Rectangle = new createjs.Rectangle(-50, -50, 700, 530);
        private stageProp:createjs.Rectangle = new createjs.Rectangle(0, 0, 640, 480);

        // bind
        private onTogglePauseBind:any;
        private onToggleMuteBind:any;

        private onFireBulletHandlerBind:any;
        private onHealthChangeHandlerBind:any;
        private onDieHandlerBind:any;
        private onMissionComplteBind:any;
        private onStageMouseDownBind:any;
        private onTickerBind:any;

        constructor()
        {
            super();
            console.log("main");


            var canvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("slate");
            this.stage = new createjs.Stage(canvas);

            var shape:createjs.Shape = new createjs.Shape();
            shape.set({alpha: 0.6});
            shape.graphics.beginFill("#000").drawRect(0, 0, this.stageProp.width, this.stageProp.height);
            this.stage.addChild(shape);

            this.stage.autoClear = false;

            //var context:CanvasRenderingContext2D = <CanvasRenderingContext2D> this.stage.canvas.getContext("2d");
            //context["imageSmoothingEnabled"] = false;
            this.init();

            createjs.Ticker.useRAF = true;
            createjs.Ticker.setFPS(30);
            this.onTickerBind = this.onTicker.bind(this);
            createjs.Ticker.addEventListener("tick", this.onTickerBind);

        }

        private init():void
        {

            this.onToggleMuteBind = this.onToggleMute.bind(this);
            this.onTogglePauseBind = this.onTogglePause.bind(this);
            this.onMissionComplteBind = this.onMissionComplete.bind(this);
            this.keyboard = new utils.Keyboard();
            this.keyboard.addEventListener(utils.KeyEvent.PAUSE_TOGGLED, this.onTogglePauseBind);
            this.keyboard.addEventListener(utils.KeyEvent.MUTE_TOGGLED, this.onToggleMuteBind);
            this.keyboard.init();

            this.backgroundGrid = new BackgroundGrid();
            this.stage.addChild(this.backgroundGrid);

            this.healthBar = new elements.HealthBar();
            this.healthBar.x = 430;
            this.healthBar.y = 10;
            this.stage.addChild(this.healthBar);

            this.score = new texts.Score(this.stage);
            this.score.init();

            this.onFireBulletHandlerBind = this.onFireBulletHandler.bind(this);
            this.onHealthChangeHandlerBind = this.onHealthChangeHandler.bind(this);
            this.onDieHandlerBind = this.onDieHandler.bind(this);
            this.hero = new hero.Hero(this.keyboard);
            this.hero.addEventListener(hero.HeroEvent.FIRE_BULLET, this.onFireBulletHandlerBind);
            this.hero.addEventListener(hero.HeroEvent.PLAYER_HIT, this.onHealthChangeHandlerBind);
            this.hero.addEventListener(hero.HeroEvent.DIE, this.onDieHandlerBind);
            this.hero.addEventListener(hero.HeroEvent.MISSION_COMPLETE, this.onMissionComplteBind);
            this.hero.x = 100;
            this.hero.y = 200;
            this.stage.addChild(this.hero);

            this.healthBar.setValue(this.hero.getHealth());

            this.enemyManager =  new enemies.EnemyManager(this.stage, this.hero, this.bulletList, this.score);
            //this.stage.addChild(this.enemyManager);
            this.enemyManager.init();

            this.muteIcon = new elements.MuteIcon();
            this.muteIcon.x = 615;
            this.muteIcon.y = 10;
            this.stage.addChild(this.muteIcon);

            this.redScreen = new elements.RedScreen();
            this.stage.addChild(this.redScreen);

            this.gameOverScreen = new screens.GameOverScreen(this.stage);
            this.pausedText = new texts.PausedText(this.stage);

            this.keyboard.setMute(createjs.Sound.getMute());
            this.showMuteIcon(createjs.Sound.getMute());

            this.autoMouseHide = new utils.AutoMouseHide();
            this.autoMouseHide.init();

            this.harlemShake = new utils.HarlemShake();

            //var mainHolder:HTMLDivElement = <HTMLDivElement> document.getElementById("main");
            //this.harlemShake.shake(mainHolder);
        }

        private onHealthChangeHandler(event:hero.HeroEvent):void
        {
            if(this.hero)
            {
                this.healthBar.setValue(this.hero.getHealth());
            }

            if(this.redScreen)
            {
                this.redScreen.show();
            }
        }

        private onDieHandler(event:hero.HeroEvent):void
        {
            this.healthBar.setValue(0);

            var mainHolder:HTMLDivElement = <HTMLDivElement> document.getElementById("main");
            if(mainHolder)
            {
                this.harlemShake.shake(mainHolder);
            }

        }

        private onToggleMute(event:utils.KeyEvent):void
        {
            if(event.muteState == createjs.Sound.getMute())
            {
                return;
            }
            createjs.Sound.setMute(event.muteState);

            // show some text
            this.showMuteIcon(event.muteState);
            //console.log(createjs.Sound.getMute());
        }

        private showMuteIcon(state:bool):void
        {
            if(state == true)
            {
                this.muteIcon.show(true);
                createjs.Tween.get(this.healthBar).to({x: 400}, 100);
            }
            else
            {
                this.muteIcon.show(false);
                createjs.Tween.get(this.healthBar).to({x: 430}, 100);
            }
        }


        private onTogglePause(event:utils.KeyEvent):void
        {
            if(createjs.Ticker.getPaused() == event.pauseState)
            {
                return;
            }

            if(!this.pausedText)
            {
                return;
            }

            if(event.pauseState == true)
            {
                //this.pausedText = new texts.PausedText();
                this.pausedText.show();
            }
            else
            {
                this.pausedText.clear();
                //this.pausedText = null;
            }


            this.stage.update();

            createjs.Ticker.setPaused(event.pauseState);
            if(this.enemyManager && this.gameOverScreen.isGameOver == false)
            {
                this.enemyManager.togglePause();
            }
        }

        private onFireBulletHandler():void
        {
            var bullet:Bullet = new Bullet();
            bullet.x = this.hero.x;
            bullet.y = this.hero.y;

            this.stage.addChild(bullet);

            this.bulletList.push(bullet);
        }

        private onGameOver():void
        {
            this.gameOverScreen.show();
            this.enemyManager.stopSpawn();
            this.onStageMouseDownBind = this.onStageMouseDown.bind(this);
            this.stage.addEventListener("stagemousedown", this.onStageMouseDownBind);
        }

        private onMissionComplete():void
        {
            this.gameOverScreen.showMissionComplete();
            this.enemyManager.stopSpawn();
            this.onStageMouseDownBind = this.onStageMouseDown.bind(this);
            this.stage.addEventListener("stagemousedown", this.onStageMouseDownBind);
        }

        private onStageMouseDown():void
        {
            if(createjs.Ticker.getPaused() == true)
            {
                return;
            }
            this.stage.removeEventListener("stagemousedown", this.onStageMouseDownBind);
            createjs.Sound.play(SoundType.CLICK);
            this.dispatchEvent("show_title", null);
        }


        public dispose():void
        {
            createjs.Ticker.removeEventListener("tick", this.onTickerBind);
            if(this.stage)
            {
                this.stage.removeEventListener("stagemousedown", this.onStageMouseDownBind);
                this.stage.removeAllChildren();
                this.stage.removeAllEventListeners("stagemousedown");
                this.stage.clear();
                this.stage = null;
            }


            if(this.hero)
            {
                this.hero.removeEventListener(hero.HeroEvent.FIRE_BULLET, this.onFireBulletHandlerBind);
                this.hero.removeEventListener(hero.HeroEvent.PLAYER_HIT, this.onHealthChangeHandlerBind);
                this.hero.removeEventListener(hero.HeroEvent.DIE, this.onDieHandlerBind);
                this.hero.dispose();
                this.hero = null;
            }

            if(this.backgroundGrid)
            {
                this.backgroundGrid.dispose();
                this.backgroundGrid = null;
            }

            if(this.keyboard)
            {
                this.keyboard.removeEventListener(utils.KeyEvent.PAUSE_TOGGLED, this.onTogglePauseBind);
                this.keyboard.removeEventListener(utils.KeyEvent.MUTE_TOGGLED, this.onToggleMuteBind);
                this.keyboard.dispose();
                this.keyboard = null;
            }

            if(this.bulletList)
            {
                for(var i:number = 0; i < this.bulletList.length; i++)
                {
                    this.bulletList[i].dispose();
                    this.bulletList[i] = null;
                }

                this.bulletList.length = 0;
                this.bulletList = null;
            }

            if(this.enemyManager)
            {
                this.enemyManager.dispose();
                this.enemyManager = null;
            }

            if(this.healthBar)
            {
                this.healthBar.dispose();
                this.healthBar = null;
            }

            if(this.redScreen)
            {
                this.redScreen.dispose();
                this.redScreen = null;
            }

            if(this.pausedText)
            {
                this.pausedText.dispose();
                this.pausedText = null;
            }

            if(this.score)
            {
                this.score.dispose();
                this.score = null;
            }

            if(this.gameOverScreen)
            {
                this.gameOverScreen.dispose();
                this.gameOverScreen = null;
            }

            if(this.autoMouseHide)
            {
                this.autoMouseHide.dispose();
                this.autoMouseHide = null;
            }

            if(this.harlemShake)
            {
                this.harlemShake.dispose();
                this.harlemShake = null;
            }

            this.bulletBoundaries = null;
            this.stageProp = null;
            this.stage = null;

            this.onTogglePauseBind = null;
            this.onToggleMuteBind = null;

            this.onFireBulletHandlerBind = null;
            this.onHealthChangeHandlerBind = null;
            this.onDieHandlerBind = null;

            this.onMissionComplteBind = null;
            this.onStageMouseDownBind = null;
            this.onTickerBind = null;
        }

        private onTicker(event:createjs.TickerEvent):void
        {

            if(createjs.Ticker.getPaused())
            {
                //console.log("pause ticker");
                //this.stage.autoClear = false;
                //this.stage.update();
                return;
            }

            //console.log((createjs.Ticker.getTime(false) / 100) >> 0);
            var i:number;

            if(this.backgroundGrid)
            {
                this.backgroundGrid.update();
            }

            if(this.hero)
            {
                this.hero.update();

                if(this.hero.canRemove == true)
                {
                    this.hero.removeEventListener(hero.HeroEvent.FIRE_BULLET, this.onFireBulletHandlerBind);
                    this.hero.removeEventListener(hero.HeroEvent.PLAYER_HIT, this.onHealthChangeHandlerBind);
                    this.hero.removeEventListener(hero.HeroEvent.DIE, this.onDieHandlerBind);

                    this.hero.dispose();
                    this.stage.removeChild(this.hero);
                    this.hero = null;

                    this.onGameOver();
                }
            }


            if(this.bulletList)
            {
                for(i = this.bulletList.length - 1; i >= 0; i--)
                {
                    this.bulletList[i].update();
                    if(this.bulletList[i].x > this.bulletBoundaries.width)
                    {
                        this.bulletList[i].dispose();
                        this.stage.removeChild(this.bulletList[i]);
                        this.bulletList[i] = null;
                        this.bulletList.splice(i, 1);
                    }
                }
            }


            if(this.enemyManager)
            {
                this.enemyManager.update();

            }

            //console.log(this.bulletList.length);

            if(this.stage)
            {

                this.stage.update();
            }

        }

    }
}

