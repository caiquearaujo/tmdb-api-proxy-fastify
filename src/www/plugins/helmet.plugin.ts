import fastifyHelmet from '@fastify/helmet';
import { TFnApplyToFastify } from '@/types';

const callable: TFnApplyToFastify = async (app, env) => {
	const config =
		env.environment !== 'production'
			? {
					contentSecurityPolicy: false,
					crossOriginOpenerPolicy: false,
					originAgentCluster: false,
			  }
			: {};

	await app.register(fastifyHelmet, config);
};

export default callable;
