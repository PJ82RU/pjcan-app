import request from "@/utils/request";

export const getSerial = (sha: string): Promise<any> =>
{
	return request({
		url: `/hash/${sha}.json`,
		method: "GET"
	});
};
