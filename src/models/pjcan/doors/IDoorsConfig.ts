import { IBaseModel } from "../base";

export interface IDoorsConfig extends IBaseModel {
    frontReverse: boolean; // Поменять местами передние двери
    backReverse: boolean; // Поменять местами задние двери
    frontBackReverse: boolean; // Поменять местами передние с задними дверьми
}
