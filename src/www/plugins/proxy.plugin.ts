import fastifyProxy from '@fastify/http-proxy';
import { TFnApplyToFastify } from '@/types';

const callable: TFnApplyToFastify = async (app, env) => {
	await app.register(fastifyProxy, {
		upstream: 'https://api.themoviedb.org/3',
		prefix: '/api',
		replyOptions: {
			rewriteRequestHeaders: (req, headers) => ({
				...headers,
				authorization: `Bearer ${env.api_key}`,
				'content-type': 'application/json;charset=utf-8',
			}),
		},
	});
};

export default callable;
