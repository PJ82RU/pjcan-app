import request from "@/utils/request";

export const getSerial = (sha: string) =>
{
	return request({
		url: `/hash/${sha}.json`,
		method: "GET"
	});
};
