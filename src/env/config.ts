import { TAvailableEnvs, TEnvVariables } from '@/types';

export const {
	NODE_ENV = 'development',
	NAME = 'tmdb-api-proxy',
	PORT = '8080',
	HOST = '0.0.0.0',
	API_KEY = '',
	COOKIE_SECRET = 'cookie_secret',
} = process.env;

const monted: TEnvVariables = {
	environment: NODE_ENV as TAvailableEnvs,
	name: NAME,
	port: parseInt(PORT, 10),
	host: HOST,
	api_key: API_KEY,
	cookie_secret: COOKIE_SECRET,
};

export default monted;
