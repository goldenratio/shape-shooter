/**
 * Author: bear
 * Date: 7/19/13
 */
///<reference path='../../../definitions/easeljs.d.ts' />
///<reference path='../../../definitions/tweenjs.d.ts' />
///<reference path='../../../definitions/preloadjs.d.ts' />
///<reference path='../../../definitions/soundjs.d.ts' />
///<reference path='enums.ts' />
///<reference path='main.ts' />
///<reference path='res.ts' />
///<reference path='title_screen.ts' />

module com.goldenratio
{
    export class ManifestData
    {
        constructor(public id:string,
                    public src:string)
        {

        }
    }

    export class Loader
    {
        private manifest:ManifestData[] = [];
        private queue:createjs.LoadQueue;
        private loaderText:createjs.Text;
        private stage:createjs.Stage;

        private game:Main;
        private titleScreen:TitleScreen;

        // bind
        private showTitleHL:any;
        private onStartGameHL:any;

        private onTickerBind:any;
        private onFileLoadBind:any;
        private onLoaderCompleteBind:any;
        private onFileLoadErrorBind:any;
        private onFileProgressBind:any;

        constructor()
        {
            this.manifest = [
                new ManifestData(SoundType.LASER, "assets/sfx/laser.mp3|assets/sfx/laser.ogg"),
                new ManifestData(SoundType.ENEMY_HIT, "assets/sfx/enemy_hit.mp3|assets/sfx/enemy_hit.ogg"),
                new ManifestData(SoundType.PLAYER_HIT, "assets/sfx/player_hit.mp3|assets/sfx/player_hit.ogg"),
                new ManifestData(SoundType.CLICK, "assets/sfx/click.mp3|assets/sfx/click.ogg"),
                new ManifestData(SoundType.ENEMY_SINGLE_HIT, "assets/sfx/enemy_single_hit.mp3|assets/sfx/enemy_single_hit.ogg"),
                new ManifestData(SoundType.PLAYER_DIE, "assets/sfx/hero_die.mp3|assets/sfx/hero_die.ogg"),
                new ManifestData(GraphicsType.MUTE, "assets/gfx/mute.png")
            ];


            createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
            if(createjs.WebAudioPlugin.isSupported())
            {
                console.log("ya! can play sound!");
            }

            this.init();

            this.queue = new createjs.LoadQueue(true);
            this.queue.installPlugin(createjs.Sound);

            this.onFileLoadBind = this.onFileLoad.bind(this);
            this.onLoaderCompleteBind = this.onLoaderComplete.bind(this);
            this.onFileLoadErrorBind = this.onFileLoadError.bind(this);
            this.onFileProgressBind = this.onFileProgress.bind(this);
            this.queue.addEventListener("fileload", this.onFileLoadBind);
            this.queue.addEventListener("complete", this.onLoaderCompleteBind);
            this.queue.addEventListener("error", this.onFileLoadErrorBind);
            this.queue.addEventListener("progress", this.onFileProgressBind);
            this.queue.loadManifest(this.manifest);

        }

        private init():void
        {

            var canvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("slate");
            this.stage = new createjs.Stage(canvas);

            createjs.Ticker.useRAF = true;
            createjs.Ticker.setFPS(30);
            this.onTickerBind = this.onTicker.bind(this);
            createjs.Ticker.addEventListener("tick", this.onTickerBind);

            this.loaderText = new createjs.Text("Loading 0%", "18px slickscreen", createjs.Graphics.getRGB(255, 255, 255, 1));
            this.loaderText.x = 10;
            this.loaderText.y = 10;
            this.stage.addChild(this.loaderText);
        }

        private onFileLoadError(event:createjs.ErrorEvent):void
        {
            var data:ManifestData = <ManifestData> event.item;
            console.log("error.. " + data.src);
        }

        /**
         * Invoked when each file is loaded
         * @param event
         */
        private onFileLoad(event:createjs.FileLoadEvent):void
        {
            var data:ManifestData = <ManifestData> event.item;
            console.log("load complete.. " + data.src);
        }

        private onFileProgress(event:createjs.ProgressEvent):void
        {
            if(this.loaderText)
            {
                this.loaderText.text = "Loading " + (((event.progress * 100) + 0.5) >> 0) + "%";
            }
        }

        /**
         * Invoked when pre loader is done
         * @param event
         */
        private onLoaderComplete(event:createjs.CompleteEvent):void
        {
            console.log("loader done!");
            this.disposeQueue();
            RES.init(this.queue);

            this.showTitleHL = this.showTitleScreen.bind(this);
            this.onStartGameHL = this.showGameScreen.bind(this);
            this.showTitleScreen();

        }

        private disposeQueue():void
        {
            if(this.stage)
            {
                this.stage.removeAllChildren();
                this.stage.clear();
            }
            createjs.Ticker.removeEventListener("tick", this.onTickerBind);

            this.queue.removeEventListener("fileload", this.onFileLoadBind);
            this.queue.removeEventListener("complete", this.onLoaderCompleteBind);
            this.queue.removeEventListener("error", this.onFileLoadErrorBind);
            this.queue.removeEventListener("progress", this.onFileProgressBind);

            this.manifest = null;
            this.loaderText = null;
            this.stage = null;

            this.onTickerBind = null;
            this.onFileLoadBind = null;
            this.onFileLoadBind = null;
            this.onFileLoadErrorBind = null;
            this.onFileProgressBind = null;
            //this.queue = null;
        }

        private onTicker(event:createjs.TickerEvent):void
        {
            if(this.stage)
            {
                this.stage.update();
            }
        }

        private showGameScreen():void
        {
            this.disposeTitleScreen();
            this.disposeMainGame();

            // show game screen
            this.game = new Main();
            this.game.addEventListener("show_title", this.showTitleHL);
        }


        private disposeMainGame():void
        {
            if(this.game)
            {
                this.game.removeEventListener("show_title", this.showTitleHL);
                this.game.dispose();
                this.game = null;
            }
        }

        private showTitleScreen():void
        {
            this.disposeMainGame();
            this.disposeTitleScreen();

            // show title screen
            this.titleScreen = new TitleScreen();
            this.titleScreen.addEventListener("start_game", this.onStartGameHL);
        }


        private disposeTitleScreen():void
        {
            if(this.titleScreen)
            {
                this.titleScreen.removeEventListener("start_game", this.onStartGameHL);
                this.titleScreen.dispose();
                this.titleScreen = null;
            }
        }


    }



}


/////////////////////////


window.addEventListener("load", onLoad, false);
function onLoad(event)
{

    var loader:com.goldenratio.Loader = new com.goldenratio.Loader();
}