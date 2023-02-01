import fastifyCors from '@fastify/cors';
import { TFnApplyToFastify } from '@/types';

const callable: TFnApplyToFastify = async app => {
	await app.register(fastifyCors, {
		origin: true,
	});
};

export default callable;
