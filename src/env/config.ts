import { config } from 'dotenv';
import path from 'path';
import { TAvailableEnvs, TEnvVariables } from '@/types';

const { NODE_ENV = 'development' } = process.env;

const DIR = path.resolve(__dirname, '../..');
config({
	path: `${DIR}/.env.${NODE_ENV}`,
});

const {
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
