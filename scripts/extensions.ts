export { }
declare global {
    export interface Number {
        isBetween(a, b, inclusive): boolean;
    }
    export interface HTMLElement {
        appendCreate(type: string, setup: (el: HTMLElement) => void): void;
        addClass(type: string);
        removeClass(type: string);
    }
}

Number.prototype.isBetween = function(a, b, inclusive = false): boolean {
    const max = Math.max(a, b);
    const min = Math.min(a, b);
    return inclusive ? this >= min && this <= max : this > min && this < max;
}

HTMLElement.prototype.appendCreate = function(type: string, setup: (el: HTMLElement) => void) {
    appendElement(type, this, setup);
}

HTMLElement.prototype.addClass = function(type: string) {
    this.classList.add(type);
}

HTMLElement.prototype.removeClass = function(type: string) {
    this.classList.remove(type);
}