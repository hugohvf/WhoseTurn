import axios, { AxiosInstance } from 'axios'

type Api = AxiosInstance

export const api = axios.create({
	baseURL: process.env.API_URL,
}) as Api
