abstract class TimeUtils {
    public static getPaliaTime() {
        const unixSeconds = Date.now() / 1000;
        const secondsInHourIRL = 60 * 60;
        const paliaDayDonePercent = (unixSeconds % secondsInHourIRL) / secondsInHourIRL
        const hourSteps = (100 / 24) / 100;

        const hour = Math.trunc(paliaDayDonePercent / hourSteps);
        const percentMinute = (paliaDayDonePercent / hourSteps) % 1;
        const minutes = Math.trunc(percentMinute * 60);
        return {
            hour: hour,
            minute: minutes
        };
    }

    public static zeroNumberFix(n: number) {
        if(n > 9)
            return n.toString();
        else
            return "0" + n;
    }

    public static prettifyTime(time, use12h: Boolean) {
        const znf = TimeUtils.zeroNumberFix;
        var result = "";
        if(use12h) {
            if(time.hour >= 13) {
                result = znf(Number(time.hour) - 12) + ":" + znf(time.minute) + " PM";
            } else {
                result = znf(time.hour) + ":" + znf(time.minute) + " AM";
            }
        } else {
            result = znf(time.hour) + ":" + znf(time.minute);
        }
        return result;
    }
}

abstract class Utils {

    private static titleElement = Utils.getById("title");
    private static originalTitle = this.titleElement.innerHTML;

    public static setTitle(text: string) {
        Utils.titleElement.innerHTML = text;
    }
    
    public static resetTitle() {
        Utils.titleElement.innerHTML = Utils.originalTitle;
    }

    public static showNotification(notification) {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        } else {
            const alert = new Notification(notification.title, { icon: notification.icon, body: notification.body });
            alert.onclick = function() {
                window.parent.focus();
            };
        }
    }

    public static isMobileAgent() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }

    public static getById(id: string) {
        return document.getElementById(id);
    }
}

function createElement(type: string, setup: (el: HTMLElement) => void): HTMLElement {
    const newElement = document.createElement(type);
    setup(newElement);
    return newElement;
}

function appendElement(type: string, parent: HTMLElement, setup: (el: HTMLElement) => void) {
    parent.append(createElement(type, setup));
}

const $ = function(id: string): HTMLElement {
    return Utils.getById(id);
    
}
const $c = function(className: string) {
    return document.getElementsByClassName(className);
}