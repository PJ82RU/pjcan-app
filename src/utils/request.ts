import axios from "axios";

// create an axios instance
const service = axios.create({
	baseURL: process.env.BASE_URL,
	timeout: 30000
});

// request interceptor
service.interceptors.request.use(
	(config) =>
	{
		config.params = config.params ?? {};
		return config;
	},
	(error) =>
	{
		console.log(error);
		return Promise.reject(error);
	}
);

// response interceptor
service.interceptors.response.use(
	(response) =>
	{
		const data = response.data;
		if (!data) return Promise.reject(new Error("No data"));
		return data;
	},
	(error) =>
	{
		console.log(error);
		return Promise.reject(error);
	}
);

export default service;
