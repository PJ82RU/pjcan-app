import request from "@/utils/request";
import { IScanCan } from "@/models/interfaces/IScanCan";

export const setScanCan = (data: IScanCan) =>
{
	const id = process.env.VUE_APP_GOOGLE_APPS_SCRIPT_ID;
	return request({
		url: `https://script.google.com/macros/s/${id}/exec`,
		method: "POST",
		params: {
			data: JSON.stringify(data)
		}
	});
};
