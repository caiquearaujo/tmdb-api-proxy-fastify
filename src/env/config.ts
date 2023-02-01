import { TAvailableEnvs, TEnvVariables } from '@/types';
import path from 'path';

export const {
	NODE_ENV = 'development',
	NAME = 'tmdb-api-proxy',
	PORT = '8080',
	HOST = '0.0.0.0',
	API_KEY = '',
	COOKIE_SECRET = 'cookie_secret',
	LOGPATH = path.resolve(__dirname, '..', '..', 'logs', 'server.log'),
} = process.env;

const mounted: TEnvVariables = {
	environment: NODE_ENV as TAvailableEnvs,
	name: NAME,
	port: parseInt(PORT, 10),
	host: HOST,
	api_key: API_KEY,
	log_path: LOGPATH,
	cookie_secret: COOKIE_SECRET,
};

export default mounted;
