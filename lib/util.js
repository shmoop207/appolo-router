"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Util {
    static isRegex(path) {
        return _.some(this.RegexChars, char => path.includes(char)) || path.indexOf(":") != path.lastIndexOf(":");
    }
    static isStaticRoute(path) {
        return !Util.isRegex(path) && !_.some([":"], char => path.includes(char));
    }
    static isParam(path) {
        return path.charCodeAt(0) == 58;
    }
    static removeTailSlash(path) {
        return path.charCodeAt(path.length - 1) === 47 ? path.slice(0, -1) : path;
    }
    static removeHeadSlash(path) {
        return path.charCodeAt(0) === 47 ? path.slice(1) : path;
    }
    static convertWildCard(part) {
        if (part == "*") {
            return "(.*)";
        }
        if (part.endsWith("*")) {
            return part.slice(0, -1) + "(.*)";
        }
        return part;
    }
    static joinByIndex(index, parts) {
        let part = "";
        for (let i = index, len = parts.length; i < len; i++) {
            part += parts[i];
            if (i < len - 1) {
                part += "/";
            }
        }
        return part;
    }
    static joinByIndexWithWildCard(index, parts) {
        let part = "";
        for (let i = index, len = parts.length; i < len; i++) {
            part += Util.convertWildCard(parts[i]);
            if (i < len - 1) {
                part += "/";
            }
        }
        return part;
    }
}
Util.RegexChars = ["?", "(", "+", "*", "-"];
exports.Util = Util;
//# sourceMappingURL=util.js.map