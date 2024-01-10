export interface IQuery {
	exec: number;
	highPriority: boolean;
	data: DataView;
	fn?: (success: boolean) => void;
}
