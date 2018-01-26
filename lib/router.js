"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const tree_1 = require("./tree");
const util_1 = require("./util");
class Router {
    constructor(options) {
        this._forest = {};
        this._staticRoutes = {};
        Object.keys(enums_1.Methods)
            .forEach(method => this._forest[method] = new tree_1.Tree(method));
        Object.keys(enums_1.Methods)
            .forEach(method => this._staticRoutes[method] = {});
    }
    get(path, handler) {
        return this.add(enums_1.Methods.GET, path, handler);
    }
    post(path, handler) {
        return this.add(enums_1.Methods.POST, path, handler);
    }
    put(path, handler) {
        return this.add(enums_1.Methods.PUT, path, handler);
    }
    patch(path, handler) {
        return this.add(enums_1.Methods.PATCH, path, handler);
    }
    delete(path, handler) {
        return this.add(enums_1.Methods.DELETE, path, handler);
    }
    head(path, handler) {
        return this.add(enums_1.Methods.HEAD, path, handler);
    }
    add(method, path, handler) {
        path = util_1.Util.removeHeadSlash(path);
        path = util_1.Util.removeTailSlash(path);
        let parts = path.split("/");
        let tree = this._forest[method];
        let leaf = tree.add(parts);
        leaf.handler = handler;
        if (util_1.Util.isStaticRoute(path)) {
            this._staticRoutes[method]["/" + path] = handler;
        }
        return this;
    }
    find(method, path) {
        path = util_1.Util.removeTailSlash(path);
        let staticRote = this._staticRoutes[method][path];
        if (staticRote) {
            return { handler: staticRote, params: {} };
        }
        let parts = path.split("/");
        let tree = this._forest[method];
        let params = {};
        let found = tree.check(parts, 0, params);
        if (!found) {
            return null;
        }
        return { params, handler: found.handler };
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map