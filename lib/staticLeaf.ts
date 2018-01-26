import {LeafType, Methods} from "./enums";
import {Leaf, Params} from "./leaf";

export class StaticLeaf extends Leaf {

    public readonly Type:LeafType = LeafType.Static;


    constructor(part: string) {
        super(part);
    }


    public check(parts: string[], index: number, params: Params): Leaf {

        if (index == parts.length) {
            return this._handler ? this:null;
        }

        let part = parts[index];

        if (part != this._part) {

            return null;
        }

        if (this._handler && index == parts.length - 1) {
            return this;
        }

        return this._checkLeafs(parts, index , params)
    }

}