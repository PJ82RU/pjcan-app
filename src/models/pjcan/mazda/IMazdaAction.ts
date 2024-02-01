import { IBaseModel } from "../base";
import { TMazdaButton } from "./TMazdaButton";

export interface IMazdaAction extends IBaseModel {
	btnPress: boolean; // Нажата кнопка
	btnSimulation: boolean; // Имитация нажатия реальной кнопки
	btnType: TMazdaButton; // Тип кнопки
	timePress: number; // Время удержания кнопки, мс
}
