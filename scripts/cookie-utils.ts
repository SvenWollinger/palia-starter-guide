abstract class CookieUtils {
    private static defaultExpiration = new Date();

    //This gets called automatically
    private static init = function() {
        const oneYearFromNow = CookieUtils.defaultExpiration.getTime() + (365 * 24 * 60 * 60 * 1000);
        CookieUtils.defaultExpiration.setTime(oneYearFromNow);
    }();        

    public static setCookie(name: string, value: string, expires: Date = CookieUtils.defaultExpiration) {
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax;`;
    }
    
    public static getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split("; " + name + "=");
        
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    }
    
    public static deleteCookie(name: string) {
        const date = new Date();
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));    
        document.cookie = `${name}=; expires=${date.toUTCString()}; path=/; SameSite=Lax;`;
    }
}