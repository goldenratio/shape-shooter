/**
 * Author: bear
 * Date: 7/7/13
 */
///<reference path='../../../../definitions/easeljs.d.ts' />
///<reference path='../basic_display.ts' />

module com.goldenratio.utils
{
    export class CollisionDetection
    {

        public static isColliding(target1:com.goldenratio.BasicDisplayObject, target2:com.goldenratio.BasicDisplayObject):bool
        {
            return (Math.abs(target1.getBounds().x - target2.getBounds().x) * 2 < (target1.getBounds().width + target2.getBounds().width)) &&
                (Math.abs(target1.getBounds().y - target2.getBounds().y) * 2 < (target1.getBounds().height + target2.getBounds().height));

        }

    }
}