import api from '@/api';
import { TFnApplyToFastify } from '@/types';

const callable: TFnApplyToFastify = async (app, env) => {
	app.get('/auth', async (request, reply) => {
		const { data } = await api.get('/authentication/token/new', {
			params: { api_key: env.api_key },
		});

		if (data.request_token) {
			const { request_token } = data;
			const redirectTo = request.headers['x-forwarded-host'];

			return reply
				.cookie('request_token', request_token, {
					path: '/',
					secure: env.environment === 'production',
					httpOnly: true,
					sameSite: 'strict',
				})
				.redirect(
					`https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${redirectTo}`
				);
		}

		return reply.code(403).send({
			status_message:
				'Invalid request_token. Call admin to check the logs.',
			success: false,
			status_code: 1,
		});
	});

	app.get('/auth/approved', async (request, reply) => {
		const { request_token } = request.cookies;

		if (!request_token) {
			throw new Error('No request token found');
		}

		const { data } = await api.post(
			'/authentication/session/new',
			{
				request_token,
			},
			{
				params: { api_key: env.api_key },
			}
		);

		if (data.session_id) {
			const { session_id } = data;
			const redirectTo = request.headers['x-forwarded-host'];

			return reply
				.clearCookie('request_token')
				.cookie('sessionid', session_id, {
					path: '/',
					secure: env.environment === 'production',
					httpOnly: true,
					sameSite: 'strict',
				})
				.redirect(`${redirectTo}`);
		}

		return reply.code(403).send({
			status_message:
				'Invalid request_token. Call admin to check the logs.',
			success: false,
			status_code: 1,
		});
	});
};

export default callable;
