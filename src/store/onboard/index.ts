const SegregateStorage: any = require('segregate-local-storage');

export enum TCard {
	INFO = 'InfoCard',
	ENGINE = 'EngineCard',
	FUEL = 'FuelCard',
	DOORS = 'DoorsCard',
	MOVEMENT = 'MovementCard',
	CLIMATE = 'ClimateCard',
	VOLUME = 'VolumeCard',
	BOSE = 'BoseCard',
	MANUAL_CONTROL = 'ManualControlCard'
}

const CARDS_KEY = 'Cards';
const CAR_STYLE_KEY = 'CarStyle';

export class Onboard {
	/** Локальное хранилище */
	private _storageLocal: any = new SegregateStorage('Onboard');
	/** Список карточек */
	cards: string[] = [];

	constructor() {
		const res = this._storageLocal.get(CARDS_KEY);
		this.cards =
			res && Array.isArray(res) && res.length > 0
				? res
				: [
						TCard.MANUAL_CONTROL,
						TCard.INFO,
						TCard.ENGINE,
						TCard.FUEL,
						TCard.DOORS,
						TCard.MOVEMENT,
						TCard.CLIMATE,
						TCard.VOLUME,
						TCard.BOSE
				  ];
	}

	/** Рестайлинг/До рестайлинг */
	get restyle(): boolean {
		return this._storageLocal.get(CAR_STYLE_KEY);
	}
	set restyle(val: boolean) {
		this._storageLocal.set(CAR_STYLE_KEY, val);
	}

	/** Наличие карточки */
	isCard(type: TCard | string | undefined): boolean {
		return this.cards.findIndex((x) => x === type) >= 0;
	}

	/**
	 * Добавить карточку в список
	 * @param type Тип карточки
	 */
	addCard(type: TCard): boolean {
		if (this.isCard(type)) return false;

		this.cards.push(type);
		this._storageLocal.set(CARDS_KEY, this.cards);
		return true;
	}

	/**
	 * Удалить карточку из списка
	 * @param type Тип карточки
	 */
	removeCard(type: TCard): void {
		this.cards = this.cards.filter((x) => x !== type);
		this._storageLocal.set(CARDS_KEY, this.cards);
	}
}
