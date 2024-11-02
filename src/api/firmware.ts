import request from "@/utils/request";

export const getFirmwareVersion = () =>
{
	return request({
		url: "/firmware/version.json",
		method: "GET",
		headers: { "Cache-Control": "no-cache", "Pragma": "no-cache", "Expires": "0" }
	});
};

export const getFirmware = (url: string | undefined) =>
{
	return request({
		url: url ?? "/firmware/firmware.bin.enc",
		method: "GET",
		responseType: "arraybuffer",
		headers: {
			"Content-Type": "application/gzip",
			"Cache-Control": "no-cache",
			"Pragma": "no-cache",
			"Expires": "0"
		}
	});
};
