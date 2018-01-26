import {Util} from "./util";
import {RegexLeaf} from "./regexLeaf";
import {ParamLeaf} from "./paramLeaf";
import {StaticLeaf} from "./staticLeaf";

export class LeafFactory{
    public static createLeaf(part: string, parts: string[], index: number){
        if (Util.isRegex(part)) {
            return new RegexLeaf(part,parts,index);
        }
        else if(Util.isParam(part)){
            return new ParamLeaf(part);
        } else {
            return new StaticLeaf(part);
        }

    }
}