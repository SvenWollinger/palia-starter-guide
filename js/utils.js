var _a;
class TimeUtils {
    static getPaliaTime() {
        const unixSeconds = Date.now() / 1000;
        const secondsInHourIRL = 60 * 60;
        const paliaDayDonePercent = (unixSeconds % secondsInHourIRL) / secondsInHourIRL;
        const hourSteps = (100 / 24) / 100;
        const hour = Math.trunc(paliaDayDonePercent / hourSteps);
        const percentMinute = (paliaDayDonePercent / hourSteps) % 1;
        const minutes = Math.trunc(percentMinute * 60);
        return {
            hour: hour,
            minute: minutes
        };
    }
    static zeroNumberFix(n) {
        if (n > 9)
            return n.toString();
        else
            return "0" + n;
    }
    static prettifyTime(time, use12h) {
        const znf = TimeUtils.zeroNumberFix;
        var result = "";
        if (use12h) {
            if (time.hour >= 13) {
                result = znf(Number(time.hour) - 12) + ":" + znf(time.minute) + " PM";
            }
            else {
                result = znf(time.hour) + ":" + znf(time.minute) + " AM";
            }
        }
        else {
            result = znf(time.hour) + ":" + znf(time.minute);
        }
        return result;
    }
}
class Utils {
    static setTitle(text) {
        _a.titleElement.innerHTML = text;
    }
    static resetTitle() {
        _a.titleElement.innerHTML = _a.originalTitle;
    }
    static showNotification(notification) {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
        else {
            const alert = new Notification(notification.title, { icon: notification.icon, body: notification.body });
            alert.onclick = function () {
                window.parent.focus();
            };
        }
    }
    static isMobileAgent() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }
    static getById(id) {
        return document.getElementById(id);
    }
}
_a = Utils;
Utils.titleElement = _a.getById("title");
Utils.originalTitle = _a.titleElement.innerHTML;
function createElement(type, setup) {
    const newElement = document.createElement(type);
    setup(newElement);
    return newElement;
}
function appendElement(type, parent, setup) {
    parent.append(createElement(type, setup));
}
const $ = function (id) {
    return Utils.getById(id);
};
const $c = function (className) {
    return document.getElementsByClassName(className);
};
//# sourceMappingURL=utils.js.map