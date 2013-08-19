/**
 * Author: bear
 * Date: 7/24/13
 */


///<reference path='../../../definitions/easeljs.d.ts' />
///<reference path='../../../definitions/tweenjs.d.ts' />
///<reference path='../../../definitions/soundjs.d.ts' />
///<reference path='basic_display.ts' />
///<reference path='enums.ts' />

module com.goldenratio
{
    export class HexagonPattern extends BasicDisplayObject
    {

        private list:createjs.Shape[] = [];
        private stageProp:createjs.Rectangle = new createjs.Rectangle(0, 0, 640, 480);
        private direction:createjs.Point = new createjs.Point(-1, 1);
        private loopCount:number = 0;

        constructor()
        {
            super();

            var rand:number = (Math.random() * 2) >> 0;
            if(rand == 1)
            {
                this.direction.x *= -1;
            }

            rand = (Math.random() * 2) >> 0;
            if(rand == 0)
            {
                this.direction.y *= -1;
            }

            for(var i:number = 0; i < 40; i++)
            {
                var size:number = 20 + ((Math.random() * 5) >> 0);

                var shape:createjs.Shape = new createjs.Shape(this.createHexagon(size));
                shape.x = ((Math.random() * this.stageProp.width) >> 0);
                shape.y = ((Math.random() * this.stageProp.height) >> 0);
                shape.alpha = 0.1 + ((Math.random() * 3) >> 0) / 10;

                //shape.regX = (size * 2) >> 1;
                //shape.regY = (size * 2) >> 1;

                shape.cache(-size, -size, (size * 2), size * 2);

                this.addChild(shape);

                this.list.push(shape);
            }

        }

        public dispose():void
        {
            this.stageProp = null;
            if(this.list)
            {
                this.list.length = 0;
                this.list = null;
            }
            this.direction = null;
        }

        private createHexagon(size:number):createjs.Graphics
        {
            //console.log("draw");
            //Random colors
            var r:number = Math.random()*255>>0;
            var g:number = Math.random()*255>>0;
            var b:number = Math.random()*255>>0;


            var colorValue:string = createjs.Graphics.getRGB(r, g, b, 1);
            var gfx:createjs.Graphics = new createjs.Graphics();
            gfx.setStrokeStyle(2);
            gfx.beginStroke(colorValue);
            //gfx.beginStroke(createjs.Graphics.getRGB(r, g, b, 1));
            gfx.moveTo(size, 0);

            var degree:number = 0;
            for(var i:number = 0; i < 7; i++)
            {
                var radians:number = degree * Math.PI / 180;
                var hx:number = Math.cos (radians) * size;
                var hy:number = Math.sin (radians) * size;

                degree += 60;
                gfx.lineTo(hx, hy);
            }

            gfx.endStroke();


            return gfx;
        }

        public update():void
        {
            for(var i:number = 0; i < this.list.length; i++)
            {
                if(this.list[i].rotation >= 360)
                {
                    this.list[i].rotation = 0;
                }
                else
                {
                    this.list[i].rotation += 2;
                }


                this.list[i].x += 1 * this.direction.x;
                this.list[i].y += 1 * this.direction.y;

                if(this.list[i].x < -50)
                {
                    this.list[i].x = this.stageProp.width + 50;
                    this.list[i].alpha = 0.1 + ((Math.random() * 3) >> 0) / 10;
                }


                if(this.list[i].y < -50)
                {
                    this.list[i].y = this.stageProp.height + 50;
                    this.list[i].alpha = 0.1 + ((Math.random() * 3) >> 0) / 10;
                }


                if(this.list[i].x > this.stageProp.width + 50)
                {
                    this.list[i].x = -50;
                    this.list[i].alpha = 0.1 + ((Math.random() * 3) >> 0) / 10;
                }


                if(this.list[i].y > this.stageProp.height + 50)
                {
                    this.list[i].y = -50;
                    this.list[i].alpha = 0.1 + ((Math.random() * 3) >> 0) / 10;
                }


            }
        }


    }

    export class TitleScreen extends createjs.EventDispatcher
    {
        private stage:createjs.Stage;
        private gameNameText:createjs.Text;
        private creditsText:createjs.Text;
        private startGameText:createjs.Text;
        private instructionText:createjs.Text;
        private instructionInfoText:createjs.Text;
        private blocker:createjs.Shape;

        private hexagonPattern:HexagonPattern;

        // bind
        private onStageMouseDownBind:any;
        private onTickerBind:any;

        constructor()
        {
            super();
            this.init();
        }

        private init():void
        {

            var canvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("slate");
            this.stage = new createjs.Stage(canvas);

            /*var shape:createjs.Shape = new createjs.Shape();
            shape.set({alpha: 0.6});
            shape.graphics.beginFill("#000").drawRect(0, 0, this.stageProp.width, this.stageProp.height);
            this.stage.addChild(shape);

            this.stage.autoClear = false;
            */
            createjs.Ticker.useRAF = true;
            createjs.Ticker.setFPS(30);
            this.onTickerBind = this.onTicker.bind(this);
            createjs.Ticker.addEventListener("tick", this.onTickerBind);

            this.hexagonPattern = new HexagonPattern();
            this.hexagonPattern.alpha = 0;
            this.stage.addChild(this.hexagonPattern);

            this.gameNameText = new createjs.Text("SHAPE SHOOTER", "60px slickscreen", createjs.Graphics.getRGB(255, 255, 255, 1));
            this.gameNameText.x = 55;
            this.gameNameText.y = 120;
            this.gameNameText.alpha = 0;

            this.gameNameText.shadow = new createjs.Shadow(createjs.Graphics.getRGB(255, 255, 255, 1), 0, 0, 4);

            this.stage.addChild(this.gameNameText);
            createjs.Tween.get(this.gameNameText).to({alpha: 1}, 500).call(this.showStartGame.bind(this));

            this.creditsText = new createjs.Text("Programmed by Karthikeyan VJ \nusing CreateJS", "10px slickscreen", createjs.Graphics.getRGB(255, 255, 255, 1));
            this.creditsText.x = 10;
            this.creditsText.y = 450;
            this.stage.addChild(this.creditsText);



            createjs.Tween.get(this.hexagonPattern).to({alpha: 1}, 1000);



        }

        private showStartGame():void
        {
            this.showInstructions();
            this.startGameText = new createjs.Text("click to start game!", "18px slickscreen", createjs.Graphics.getRGB(255, 255, 255, 1));
            this.startGameText.x = 210;
            this.startGameText.y = 380;
            this.stage.addChild(this.startGameText);

            this.onStageMouseDownBind = this.onStageMouseDown.bind(this);
            this.stage.addEventListener("stagemousedown", this.onStageMouseDownBind);

        }

        private showInstructions():void
        {
            this.instructionText = new createjs.Text("- Controls -", "15px slickscreen", createjs.Graphics.getRGB(193, 196, 196, 0.7));
            this.instructionText.x = 250;
            this.instructionText.y = 240;
            this.stage.addChild(this.instructionText);

            this.instructionInfoText = new createjs.Text("use ARROW keys to move, Z - Fire, M - mute, P - Pause", "14px slickscreen", createjs.Graphics.getRGB(193, 196, 196, 1));
            this.instructionInfoText.x = 80;
            this.instructionInfoText.y = 260;
            this.stage.addChild(this.instructionInfoText);

        }

        private onStageMouseDown():void
        {
            console.log("start game!");
            this.stage.removeEventListener("stagemousedown", this.onStageMouseDownBind);
            createjs.Sound.play(SoundType.CLICK);
            this.blocker = new createjs.Shape();
            this.blocker.graphics.beginFill(createjs.Graphics.getRGB(0, 0, 0));
            this.blocker.graphics.drawRect(0, 0, 640, 480);
            this.blocker.graphics.endFill();
            this.blocker.alpha = 0;

            this.stage.addChild(this.blocker);

            createjs.Tween.get(this.blocker).to({alpha: 1}, 500).call(this.startGame.bind(this));
        }

        private startGame():void
        {
            this.dispatchEvent("start_game", null);
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
            }
            this.stage = null;

            this.creditsText = null;
            this.gameNameText = null;
            this.startGameText = null;
            this.instructionInfoText = null;
            this.instructionText = null;
            this.blocker = null;

            if(this.hexagonPattern)
            {
                this.hexagonPattern.dispose();
                this.hexagonPattern = null;
            }


            this.onStageMouseDownBind = null;
            this.onTickerBind = null;

        }

        private onTicker(event:createjs.TickerEvent):void
        {
            if(this.stage)
            {
                this.stage.update();
            }

            if(this.hexagonPattern)
            {
                this.hexagonPattern.update();
            }
        }
    }
}