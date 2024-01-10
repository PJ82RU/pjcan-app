import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../base";
import { ITestValue } from "./ITestValue";

export const API_TEST_VALUE_EXEC = 0xf0;
export const API_TEST_VALUE_EVENT = "TestValue";

export const API_TEST_VIEW_EXEC = 0xf3;
export const API_TEST_VIEW_EVENT = "TestView";

/** Модель значений тестирования */
export class TestValue extends BaseModel implements ITestValue
{
	static struct: any = {
		text: BluetoothStruct.char(32)
	};
	static size: number = 32;

	text = "";

	constructor(data?: DataView)
	{
		super(API_TEST_VALUE_EXEC);
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, this.exec, TestValue.size, new BluetoothStruct(TestValue.struct), buf);
	}

	/** Чтение данных */
	get(): DataView
	{
		return this._get(this, this.exec, TestValue.size, new BluetoothStruct(TestValue.struct));
	}
}
