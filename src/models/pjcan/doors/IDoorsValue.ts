import { IBaseModel } from "../base";

/** Интерфейс значений дверей */
export interface IDoorsValue extends IBaseModel {
	frontLeft: boolean; // Передняя левая дверь
	frontRight: boolean; // Передняя правая дверь
	backLeft: boolean; // Задняя левая дверь
	backRight: boolean; // Задняя правая дверь
	trunk: boolean; // Багажник
	bonnet: boolean; // Капот
}
