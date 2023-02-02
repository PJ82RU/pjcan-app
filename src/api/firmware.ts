import request from "@/utils/request";

export const getFirmwareVersion = () =>
{
	return request({
		url: "/firmware/version.json",
		method: "GET"
	});
};

export const getFirmware = () =>
{
	return request({
		url: "/firmware/firmware.bin.gz",
		method: "GET",
		responseType: "arraybuffer",
		headers: { "Content-Type": "application/gzip" }
	});
};
