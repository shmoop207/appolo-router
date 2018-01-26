"use strict";
// import {LeafType} from "./enums";
// import {Util} from "./util";
// import _= require( "lodash");
// import pathToRegexp = require('path-to-regexp')
//
// export interface Params {
//     [index: string]: string
// }
//
// export interface Output {
//     params: Params
//     handler: any;
// }
//
// export class Leaf {
//
//     private _type: LeafType;
//
//     private _leafs: Leaf[];
//     private _numLeafs: number;
//     private _paramNames: string[];
//     private _paramNamesFull: string[];
//     private _handler: any;
//     private _regex: RegExp;
//     private _regexFull: RegExp;
//
//     constructor(private _part: string, parts: string[], index: number) {
//         this._leafs = [];
//         this._numLeafs = 0;
//
//         if (Util.isRegex(this._part)) {
//             let keys = [], keyFull = [];
//
//             this._regex = pathToRegexp(Util.convertWildCard(this._part), keys);
//
//             let fullPath = Util.joinByIndexWithWildCard(index, parts);
//             this._regexFull = pathToRegexp(fullPath, keyFull);
//
//             this._paramNames = keys.map(item => item.name);
//             this._paramNamesFull = keyFull.map(item => item.name);
//             this._type = LeafType.Regex;
//
//
//         } else if (Util.isParam(this._part)) {
//             this._type = LeafType.Param;
//             this._paramNames = [this._part.substr(1)];
//         } else {
//             this._type = LeafType.Static;
//         }
//     }
//
//     public get type(): LeafType {
//         return this._type
//     }
//
//     public get part(): string {
//         return this._part
//     }
//
//     public add(parts: string[], index: number = 0) {
//         if (parts.length == index) {
//             return this;
//         }
//
//         let part = parts[index];
//
//         let leaf: Leaf = this.leafs.find(leaf => leaf.part == part);
//
//         if (!leaf) {
//             leaf = new Leaf(part, parts, index);
//             this._leafs.push(leaf);
//             this._leafs = _.orderBy(this._leafs, (item: Leaf) => item.type);
//             this._numLeafs = this._leafs.length;
//         }
//
//         return leaf.add(parts, index + 1)
//
//     }
//
//     public set handler(handler: any) {
//         this._handler = handler;
//     }
//
//     public get handler(): any {
//         return this._handler
//     }
//
//
//     public check(parts: string[], index: number, params: Params): Leaf {
//
//         let regexMatch;
//
//         if (index == parts.length) {
//             return null;
//         }
//
//         let part = parts[index];
//
//         if (this._type == LeafType.Static && part != this._part) {
//
//             return null;
//
//         } else if (this._type == LeafType.Regex) {
//
//             if(this._leafs.length == 0 && this._handler){
//                 return this._checkFullPath(index,parts,params)
//             }
//
//             regexMatch = this._regex.exec(part);
//
//             if (!regexMatch) {
//                 return null;
//             }
//         }
//
//         if (this._handler && index == parts.length - 1) {
//             this._addParams(params, this._paramNames, regexMatch, part);
//             return this;
//         }
//
//         let found = this._checkLeafs(parts, index, params);
//
//         if (found) {
//             this._addParams(params, this._paramNames, regexMatch, part);
//             return found;
//         }
//
//         if (regexMatch && this._handler) {
//             return this._checkFullPath(index,parts,params)
//
//         }
//     }
//
//     private _checkFullPath(index:number,parts:string[],params:Params):Leaf{
//         let regexMatch = this._regexFull.exec(Util.joinByIndex(index, parts));
//
//         if (regexMatch) {
//             this._addParams(params, this._paramNamesFull, regexMatch);
//             return this;
//         }
//
//         return null;
//     }
//
//
//     private _addParams(params: Params, keys: string[], values: string[], part?: string) {
//
//         if (this._type == LeafType.Static) {
//             return;
//         }
//
//         if (this._type == LeafType.Param) {
//             values = [part]
//         }
//
//         for (let i = 0, len = keys.length; i < len; i++) {
//             params[keys[i]] = values[i]
//         }
//     }
//
//     private _checkLeafs(parts: string[], index: number, params: Params): Leaf {
//         let len = this._numLeafs;
//
//         for (let j = 0; j < len; j++) {
//
//             let found = this._leafs[j].check(parts, index + 1, params);
//
//             if (found) {
//                 return found;
//             }
//         }
//
//         return null;
//     }
//
//     public get leafs(): Leaf[] {
//         return this._leafs
//     }
// } 
//# sourceMappingURL=~leaf.js.map