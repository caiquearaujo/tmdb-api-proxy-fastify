import fastifyCors from '@fastify/cors';
import { TFnApplyToFastify } from '@/types';

const callable: TFnApplyToFastify = async (app, env) => {
	const config = env.environment !== 'production' ? { origin: true } : {};
	await app.register(fastifyCors, config);
};

export default callable;
