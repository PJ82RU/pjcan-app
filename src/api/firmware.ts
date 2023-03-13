import request from "@/utils/request";

export const getFirmwareVersion = () =>
{
	return request({
		url: "/firmware/version.json",
		method: "GET"
	});
};

export const getFirmware = (url: string | undefined) =>
{
	return request({
		url: url ?? "/firmware/firmware.bin.enc",
		method: "GET",
		responseType: "arraybuffer",
		headers: { "Content-Type": "application/gzip" }
	});
};
