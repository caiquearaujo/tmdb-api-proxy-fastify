import fastifyRateLimit from '@fastify/rate-limit';
import { TFnApplyToFastify } from '@/types';

const callable: TFnApplyToFastify = async app => {
	await app.register(fastifyRateLimit, {
		max: 100,
		timeWindow: '1 minute',
	});
};

export default callable;
