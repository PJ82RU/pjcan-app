import { ILooseObject } from "@/models/interfaces/ILooseObject";

export interface IBluetoothStruct {
    littleEndian: boolean;
    readonly structData: ILooseObject;
    free: () => void;
    getBit: () => boolean;
    setBit: (val: boolean) => void;
    getInt8: (u: boolean, length: number) => number[];
    setInt8: (u: boolean, val: number[], length: number) => void;
    getInt16: (u: boolean, length: number) => number[];
    setInt16: (u: boolean, val: number[], length: number) => void;
    getInt32: (u: boolean, length: number) => number[];
    setInt32: (u: boolean, val: number[], length: number) => void;
    getFloat32: (length: number) => number[];
    setFloat32: (val: number[], length: number) => void;
    getInt64: (u: boolean, length: number) => bigint[];
    setInt64: (u: boolean, val: bigint[], length: number) => void;
    getFloat64: (length: number) => number[];
    setFloat64: (val: number[], length: number) => void;
    getChars: (length: number) => string;
    setChars: (str: string, length: number) => void;
    decode: (buffer: DataView, data: ILooseObject, offset: number) => number;
    encode: (buffer: DataView, data: ILooseObject, offset: number) => number;
}
