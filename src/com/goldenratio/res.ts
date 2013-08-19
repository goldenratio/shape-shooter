/**
 * Author: bear
 * Date: 7/22/13
 */

///<reference path='../../../definitions/preloadjs.d.ts' />

module com.goldenratio
{
    export class RES
    {
        private static queue:createjs.LoadQueue;

        public static init(queueData:createjs.LoadQueue):void
        {
            RES.queue = queueData;
        }

        public static get(id:string):any
        {
            return RES.queue.getResult(id);
        }
    }
}