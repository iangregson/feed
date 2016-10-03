"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = every;
function every(xSeconds, doThis) {
    for (var _len = arguments.length, using = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        using[_key - 2] = arguments[_key];
    }

    var time = xSeconds * 1000;
    doThis.apply(undefined, using);
    setTimeout(function () {
        return every.apply(undefined, [xSeconds, doThis].concat(using));
    }, time);
}