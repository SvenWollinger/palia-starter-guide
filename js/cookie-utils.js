class CookieUtils {
    static setCookie(name, value, expires = CookieUtils.defaultExpiration) {
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax;`;
    }
    static getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    }
    static deleteCookie(name) {
        const date = new Date();
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=; expires=${date.toUTCString()}; path=/; SameSite=Lax;`;
    }
}
CookieUtils.defaultExpiration = new Date();
//This gets called automatically
CookieUtils.init = function () {
    const oneYearFromNow = CookieUtils.defaultExpiration.getTime() + (365 * 24 * 60 * 60 * 1000);
    CookieUtils.defaultExpiration.setTime(oneYearFromNow);
}();
//# sourceMappingURL=cookie-utils.js.map