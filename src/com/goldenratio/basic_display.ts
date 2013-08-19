/**
 * Author: bear
 * Date: 7/7/13
 */

///<reference path='../../../definitions/easeljs.d.ts' />

module com.goldenratio
{
    export class BasicDisplayObject extends createjs.Container
    {
        constructor()
        {
            super();
        }

        /**
         * Get Bounds
         * must be over ridden
         * @returns {null}
         */
        public getBounds():createjs.Rectangle
        {
            return null;
        }

        public dispose():void
        {
            this.uncache();
            this.removeAllChildren();

        }
    }
}