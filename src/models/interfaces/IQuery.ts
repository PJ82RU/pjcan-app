export interface IQuery {
	data: DataView;
	requestPriority: boolean;
	fn?: (success: boolean) => void;
}
