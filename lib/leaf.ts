import {LeafType} from "./enums";
import {Util} from "./util";
import _= require( "lodash");
import {LeafFactory} from "./leafFactory";

export interface Params {
    [index: string]: string
}


export abstract class Leaf {


    protected _leafs: Leaf[];
    protected _numLeafs: number;
    protected _handler: any;
    protected _part: string;

    public abstract readonly Type:LeafType;

    constructor( part: string) {
        this._leafs = [];
        this._numLeafs = 0;
        this._part = part;
    }


    public get part(): string {
        return this._part
    }

    public add(parts: string[], index: number = 0):Leaf {
        if (parts.length == index) {
            return this;
        }

        let part = parts[index];

        let leaf: Leaf = this.leafs.find(leaf => leaf.part == part);

        if (!leaf) {
            leaf = require("./leafFactory").LeafFactory.createLeaf(part,parts,index);
            this._leafs.push(leaf);
            this._leafs = _.orderBy(this._leafs, (item: Leaf) => item.Type);
            this._numLeafs = this._leafs.length;
        }

        return leaf.add(parts, index + 1)

    }

    public set handler(handler: any) {
        this._handler = handler;
    }

    public get handler(): any {
        return this._handler
    }

    public abstract check(parts: string[], index: number, params: Params):Leaf


    protected _checkLeafs(parts: string[], index: number, params: Params): Leaf {
        let len = this._numLeafs;

        for (let j = 0; j < len; j++) {

            let found = this._leafs[j].check(parts, index + 1, params);

            if (found) {
                return found;
            }
        }

        return null;
    }

    public get leafs(): Leaf[] {
        return this._leafs
    }
}