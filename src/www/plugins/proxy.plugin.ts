import fastifyProxy from '@fastify/http-proxy';
import { TFnApplyToFastify } from '@/types';

const callable: TFnApplyToFastify = async (app, env) => {
	await app.register(fastifyProxy, {
		upstream: 'https://api.themoviedb.org/3',
		prefix: '/api',
		preHandler(request, reply, next) {
			if (request.cookies.sessionid) {
				const { sessionid } = request.cookies;

				if (sessionid) {
					const url = new URL(request.url, 'http://localhost');
					url.searchParams.set('session_id', sessionid);

					request.query = {
						...(request.query || {}),
						session_id: sessionid,
					};

					request.raw.url = url
						.toString()
						.replace('http://localhost', '');
				}
			}

			next();
		},
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
