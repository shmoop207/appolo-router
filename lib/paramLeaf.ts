import {LeafType, Methods} from "./enums";
import {Leaf, Params} from "./leaf";

export class ParamLeaf extends Leaf {

    private _paramName: string;

    constructor(part: string) {
        super(part);

        this._paramName = this._part.substr(1);
    }

    public readonly Type = LeafType.Param;

    public check(parts: string[], index: number, params: Params): Leaf {

        if (index == parts.length) {
            return null;
        }

        let part = parts[index];


        if (this._handler && index == parts.length - 1) {
            params[this._paramName] = part;
            return this;
        }

        let found = this._checkLeafs(parts, index, params);

        if (found) {
            params[this._paramName] = part;
            return found;
        }
    }

}