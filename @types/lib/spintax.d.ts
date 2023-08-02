/*
 * Copyright (c) 2023 Jude Max <judemaxgthb@gmail.com>
 */

export type SpintaxTypes='text'|'or'|'and';

export interface SpintaxData
{
    readonly type:SpintaxTypes;
    readonly value?:string;
    readonly values?:ReadonlyArray<ReadonlyArray<SpintaxData>|SpintaxData>;
    readonly separator?:ReadonlyArray<ReadonlyArray<SpintaxData>|SpintaxData>|string;
}

export type ParsingResult=ReadonlyArray<SpintaxData>|SpintaxData;

export declare class Spintax
{
    readonly rawtext:string;
    readonly data:ParsingResult;

    constructor(text:string);

    static unspin(text:string):string;
    static countVariations(text:string):number;
    static unspinByIndex(text:string,index:number):string;
    static fullUnspinList(text:string):string[];
    static randomUnspinList(text:string,size:number,unique:boolean):string[];
    static isCorrect(text:string):boolean;

    public unspin():string;
    public countVariations():number;
    public unspinByIndex(index:number):string;
    public fullUnspinList():string[];
    public randomUnspinList(size:number,unique:boolean):string[];
    public isCorrect():boolean;

}
