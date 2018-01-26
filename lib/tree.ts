import {LeafType, Methods} from "./enums";
import {Leaf, Params} from "./leaf";

export class Tree extends Leaf{

    constructor(private _method:Methods){
        super("");
    }

    public readonly Type = LeafType.Tree;

    public check(parts: string[], index: number, params: Params):Leaf{



        return this._checkLeafs(parts,index,params)
    }

}