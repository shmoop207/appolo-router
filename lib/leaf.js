"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class Leaf {
    constructor(part) {
        this._leafs = [];
        this._numLeafs = 0;
        this._part = part;
    }
    get part() {
        return this._part;
    }
    add(parts, index = 0) {
        if (parts.length == index) {
            return this;
        }
        let part = parts[index];
        let leaf = this.leafs.find(leaf => leaf.part == part);
        if (!leaf) {
            leaf = require("./leafFactory").LeafFactory.createLeaf(part, parts, index);
            this._leafs.push(leaf);
            this._leafs = _.orderBy(this._leafs, (item) => item.Type);
            this._numLeafs = this._leafs.length;
        }
        return leaf.add(parts, index + 1);
    }
    set handler(handler) {
        this._handler = handler;
    }
    get handler() {
        return this._handler;
    }
    _checkLeafs(parts, index, params) {
        let len = this._numLeafs;
        for (let j = 0; j < len; j++) {
            let found = this._leafs[j].check(parts, index + 1, params);
            if (found) {
                return found;
            }
        }
        return null;
    }
    get leafs() {
        return this._leafs;
    }
}
exports.Leaf = Leaf;
//# sourceMappingURL=leaf.js.map