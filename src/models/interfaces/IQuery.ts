export interface IQuery {
	exec: number;
	highPriority: boolean;
	id: number;
	data: DataView;
	fn?: (success: boolean) => void;
}
