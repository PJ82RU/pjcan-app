import { ILCDValue } from '@/models/pjcan';
import api from '@/store/api';

export class ManualControlButtons {
	private readonly _lcdValue: ILCDValue;
	/** Таймауты кнопок */
	private _timeoutBtns: any = {
		info: undefined,
		clock: undefined,
		clockH: undefined,
		clockM: undefined,
		clockRM: undefined
	};

	constructor(lcdValue: ILCDValue) {
		this._lcdValue = lcdValue;
	}

	/** Событие нажатия на кнопку */
	private _clickDown(name?: string, cb?: () => void): void {
		api.send(this._lcdValue);
		if (name && cb) {
			this._timeoutBtns[name] = setTimeout(cb, 3000);
		}
		navigator.vibrate(30);
	}
	/** Событие отпуска кнопки */
	private _clickUp(name: string): void {
		api.send(this._lcdValue);
		if (this._timeoutBtns[name]) {
			clearTimeout(this._timeoutBtns[name]);
		}
		navigator.vibrate(20);
	}

	/** Событие нажатия на кнопку Info */
	onClickDownInfo(): void {
		// console.log('onClickDownInfo');

		this._lcdValue.btnInfo = true;
		this._clickDown('info', () => this.onClickUpInfo());
	}
	/** Событие отпуска кнопки Info */
	onClickUpInfo(): void {
		// console.log('onClickUpInfo');
		if (!this._lcdValue.btnInfo) return;

		this._lcdValue.btnInfo = false;
		this._clickUp('info');
	}

	/** Событие нажатия на кнопку Clock */
	onClickDownClock(): void {
		// console.log('onClickDownClock');

		this._lcdValue.btnClock = true;
		this._clickDown('clock', () => this.onClickUpClock());
	}
	/** Событие отпуска кнопки Clock */
	onClickUpClock(): void {
		// console.log('onClickUpClock');
		if (!this._lcdValue.btnClock) return;

		this._lcdValue.btnClock = false;
		this._clickUp('clock');
	}

	/** Событие нажатия на кнопку Clock H */
	onClickDownClockH(): void {
		// console.log('onClickDownClockH');

		this._lcdValue.btnClockH = true;
		this._clickDown('clockH', () => this.onClickUpClockH());
	}
	/** Событие отпуска кнопки Clock H */
	onClickUpClockH(): void {
		// console.log('onClickUpClockH');
		if (!this._lcdValue.btnClockH) return;

		this._lcdValue.btnClockH = false;
		this._clickUp('clockH');
	}

	/** Событие нажатия на кнопку Clock M */
	onClickDownClockM(): void {
		// console.log('onClickDownClockM');

		this._lcdValue.btnClockM = true;
		this._clickDown('clockM', () => this.onClickUpClockM());
	}
	/** Событие отпуска кнопки Clock M */
	onClickUpClockM(): void {
		// console.log('onClickUpClockM');
		if (!this._lcdValue.btnClockM) return;

		this._lcdValue.btnClockM = false;
		this._clickUp('clockM');
	}

	/** Событие нажатия на кнопку Clock RM */
	onClickDownClockRM(): void {
		// console.log('onClickDownClockRM');

		this._lcdValue.btnClockRM = true;
		this._clickDown('clockRM', () => this.onClickUpClockRM());
	}
	/** Событие отпуска кнопки Clock RM */
	onClickUpClockRM(): void {
		// console.log('onClickUpClockRM');
		if (!this._lcdValue.btnClockRM) return;

		this._lcdValue.btnClockRM = false;
		this._clickUp('clockRM');
	}

	/** Событие нажатия на кнопку Clock F12 */
	onClickClockF12(): void {
		// console.log('onClickDownClockF12');

		this._lcdValue.flgClock24 = false;
		this._clickDown();
	}

	/** Событие нажатия на кнопку Clock F24 */
	onClickClockF24(): void {
		// console.log('onClickDownClockF24');

		this._lcdValue.flgClock24 = true;
		this._clickDown();
	}
}
