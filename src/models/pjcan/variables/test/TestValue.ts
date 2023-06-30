import { BluetoothStruct } from "@/components/bluetooth";
import { BaseModel } from "../../base";
import { ViewConfig } from "../../view";
import { ITestValue } from "./ITestValue";

export const API_VARIABLE_TEST_EXEC = 190;

/** Модель значений тестирования */
export class TestValue extends BaseModel implements ITestValue
{
	static struct: any = {
		text: BluetoothStruct.char(32),
		view: BluetoothStruct.struct(ViewConfig.struct)
	};
	static size: number = 36;

	text = "";
	view = new ViewConfig();

	constructor(data?: DataView)
	{
		super();
		if (data) this.set(data);
	}

	/**
	 * Запись данных
	 * @param {DataView} buf Буфер данных
	 */
	set(buf: DataView): boolean
	{
		return this._set(this, API_VARIABLE_TEST_EXEC, TestValue.size + 1, new BluetoothStruct(TestValue.struct), buf);
	}

	/** Чтение данных */
	get(): DataView | undefined
	{
		return this._get(this, API_VARIABLE_TEST_EXEC, TestValue.size + 1, new BluetoothStruct(TestValue.struct));
	}
}
