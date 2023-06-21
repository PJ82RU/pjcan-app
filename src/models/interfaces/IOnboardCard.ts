export interface IOnboardCard {
    name: string;
    enabled: boolean;
    car: number[];
    disabled?: boolean;
    visible?:boolean;
}
