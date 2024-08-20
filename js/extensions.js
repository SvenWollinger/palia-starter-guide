"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Number.prototype.isBetween = function (a, b, inclusive = false) {
    const max = Math.max(a, b);
    const min = Math.min(a, b);
    return inclusive ? this >= min && this <= max : this > min && this < max;
};
HTMLElement.prototype.appendCreate = function (type, setup) {
    appendElement(type, this, setup);
};
HTMLElement.prototype.addClass = function (type) {
    this.classList.add(type);
};
HTMLElement.prototype.removeClass = function (type) {
    this.classList.remove(type);
};
//# sourceMappingURL=extensions.js.map