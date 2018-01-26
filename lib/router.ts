import {IOptions} from "./IOptions";
import {Methods} from "./enums";
import {Tree} from "./tree";
import {Util} from "./util";
import {Params} from "./leaf";


export class Router {

    private _forest: { [index: string]: Tree } = {};

    private _staticRoutes: { [index: string]: { [index: string]: any } } = {};

    public constructor(options?: IOptions) {

        Object.keys(Methods)
            .forEach(method => this._forest[method] = new Tree(method as Methods));

        Object.keys(Methods)
            .forEach(method => this._staticRoutes[method] = {});
    }

    public get(path: string, handler: any): this {
        return this.add(Methods.GET, path, handler);
    }

    public post(path: string, handler: any): this {
        return this.add(Methods.POST, path, handler);
    }

    public put(path: string, handler: any): this {
        return this.add(Methods.PUT, path, handler);
    }

    public patch(path: string, handler: any): this {
        return this.add(Methods.PATCH, path, handler);
    }

    public delete(path: string, handler: any): this {
        return this.add(Methods.DELETE, path, handler);
    }

    public head(path: string, handler: any): this {
        return this.add(Methods.HEAD, path, handler);
    }

    public add(method: keyof typeof Methods, path: string, handler: any): this {

        path = Util.removeHeadSlash(path);

        path = Util.removeTailSlash(path);

        let parts = path.split("/");

        let tree = this._forest[method];

        let leaf = tree.add(parts);

        leaf.handler = handler;

        if (Util.isStaticRoute(path)) {
            this._staticRoutes[method]["/" + path] = handler;
        }

        return this
    }

    public find(method: keyof typeof Methods, path: string): { params: Params, handler: any } {

        path = Util.removeTailSlash(path);

        let staticRote = this._staticRoutes[method][path];

        if (staticRote) {
            return {handler: staticRote, params: {}}
        }

        let parts = path.split("/");


        let tree = this._forest[method];

        let params = {};

        let found = tree.check(parts, 0, params);

        if (!found) {
            return null;
        }

        return {params, handler: found.handler};
    }

}