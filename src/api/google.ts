import request from "@/utils/request";
import { IScanCan } from "@/models/interfaces/IScanCan";

export const setScanCan = (
	data: IScanCan,
	deflationId: string = "AKfycbwwyYUAfw0ku3nx9C__GLF4FByf3UF70jNL5oFgNnHaRqkj5vqzxWDcrhQiX6w463yPSw"
) =>
{
	return request({
		url: `https://script.google.com/macros/s/${deflationId}/exec`,
		data: JSON.stringify(data),
		method: "POST"
	});
};
