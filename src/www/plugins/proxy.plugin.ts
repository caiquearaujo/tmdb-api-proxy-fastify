import fastifyProxy from '@fastify/http-proxy';
import { TFnApplyToFastify } from '@/types';

const callable: TFnApplyToFastify = async (app, env) => {
	await app.register(fastifyProxy, {
		upstream: 'https://api.themoviedb.org/3',
		prefix: '/api',
		preHandler(request, reply, next) {
			if (request.headers.cookie) {
				const { session_id } = app.parseCookie(request.headers.cookie);
				const unsignedSessionId = app.unsignCookie(session_id);

				if (unsignedSessionId.value) {
					request.params = { session_id: unsignedSessionId.value };
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
