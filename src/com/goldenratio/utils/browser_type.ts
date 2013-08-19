/**
 * Author: bear
 * Date: 7/13/13
 */

module com.goldenratio.utils
{
    export class BrowserType
    {

        public static isFirefox():bool
        {
            if(window["InstallTrigger"])
            {
                return typeof window["InstallTrigger"] !== 'undefined';
            }

            return false;
        }

        public static isOpera():bool
        {
            return !!window["opera"] || navigator.userAgent.indexOf(' OPR/') >= 0;
        }

        public static isChrome():bool
        {
            return !!window["chrome"] && !BrowserType.isOpera();
        }

        public static isIE():bool
        {
            return false || document.documentMode;
        }

        public static isSafari():bool
        {
            return Object.prototype.toString.call(window["HTMLElement"]).indexOf('Constructor') > 0;

        }
    }
}