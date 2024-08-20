var _a;
const pages = ["general", "crops", "coop", "time"];
var activePage = "general";
const languages = ["en", "de"];
var needMorningAlarm = false;
function checkAlarmLogic(time) {
    if (!needMorningAlarm && time.hour == 5 && time.minute.isBetween(50, 59, true)) {
        //Prepare morning alarm, this means theres only a small window where we will decide to trigger the alarm.
        //This means that if you open the page at 6:00AM you wont be sent a notification, only if it has been open between 5:50 - 5:59
        needMorningAlarm = true;
    }
    if (needMorningAlarm && time.hour == 6 && time.minute.isBetween(0, 10, true)) {
        needMorningAlarm = false;
        Utils.showNotification({
            title: "Rise and shine!",
            body: "6AM! Oh boy, time for cropping!",
            icon: "img/gear.png"
        });
    }
}
//setInterval(() => {
//    const time = TimeUtils.getPaliaTime();
//    checkAlarmLogic(time);
//    const timePretty = TimeUtils.prettifyTime(time, false);
//    if(isInFocus) phoneClockText.innerHTML = timePretty;
//    Utils.setTitle(timePretty);
//}, 250);
function refreshTime() {
    const clockStyle = CookieUtils.getCookie("clockStyle") == "12h" ? true : false;
    Utils.getById("time").innerHTML = TimeUtils.prettifyTime(TimeUtils.getPaliaTime(), clockStyle);
}
refreshTime();
setInterval(refreshTime, 750);
//Function to switch active pages
function navItem(type) {
    activePage = type;
    for (let page of pages) {
        $(`nav-${page}`).removeClass("active");
        $(`page-${page}`).style.display = "none";
    }
    $(`nav-${type}`).addClass("active");
    $(`page-${type}`).style.display = "";
}
//Setup navigation buttons
for (let page of pages) {
    $("navcontainer").appendCreate("div", (newNav) => {
        newNav.id = `nav-${page}`;
        newNav.addClass("navitem");
        newNav.onclick = () => { navItem(page); };
        newNav.appendCreate("tl", (tl) => {
            tl.setAttribute("id", `nav.${page}`);
        });
    });
}
//Set the default active tab to "general"
navItem("general");
//Focus stuff, if we wanna use that at some point
var isInFocus = true;
window.onblur = () => {
    if (Utils.isMobileAgent())
        return;
    isInFocus = false;
};
window.onfocus = () => {
    if (Utils.isMobileAgent())
        return;
    isInFocus = true;
};
//Set up language buttons
for (let lang of languages) {
    $("langNav").appendCreate("div", (langButton) => {
        langButton.classList.add("langNavItem");
        langButton.onclick = () => {
            setLanguage(lang);
            CookieUtils.setCookie("lang", lang);
        };
        langButton.appendCreate("tl", (tl) => {
            tl.setAttribute("id", `flag.${lang}`);
        });
    });
}
//Function to translate site, has to be called after nav buttons and lang nav buttons are set up
function setLanguage(lang) {
    fetch(`lang/${lang}.json`)
        .then((response) => response.text())
        .then((text) => JSON.parse(text))
        .then((json) => {
        var _a;
        let tlElements = document.getElementsByTagName("tl");
        for (let item of tlElements) {
            let tlKey = item.getAttribute("id");
            item.innerHTML = (_a = json[tlKey]) !== null && _a !== void 0 ? _a : `tl(${tlKey})`;
        }
    });
}
//Load default language
setLanguage((_a = CookieUtils.getCookie("lang")) !== null && _a !== void 0 ? _a : "en");
//Allow switching of clock style
Utils.getById("time").onclick = () => {
    if (CookieUtils.getCookie("clockStyle") == "12h")
        CookieUtils.deleteCookie("clockStyle");
    else
        CookieUtils.setCookie("clockStyle", "12h");
    refreshTime();
};
//# sourceMappingURL=main.js.map