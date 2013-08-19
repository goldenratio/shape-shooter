/**
 * Author: bear
 * Date: 7/22/13
 */

///<reference path='../../../../definitions/easeljs.d.ts' />

///<reference path='../basic_display.ts' />
///<reference path='../enums.ts' />
///<reference path='../res.ts' />

module com.goldenratio.elements
{
    export class MuteIcon extends com.goldenratio.BasicDisplayObject
    {
        private gfx:createjs.Bitmap;

        constructor()
        {
            super();
            this.gfx = new createjs.Bitmap(RES.get(GraphicsType.MUTE));
            this.addChild(this.gfx);
            this.show(false);
        }

        public dispose():void
        {
            super.dispose();
            this.gfx = null;
        }

        public show(flag:bool = true):void
        {
            if(this.gfx)
            {
                this.gfx.visible = flag;
            }

        }

    }
}