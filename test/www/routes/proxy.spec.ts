import { IFastifyInstance } from '@/types';
import ApiServer from '@/www/ApiServer';
import authRoutes from '@/www/routes/auth';
import cookiePlugin from '@/www/plugins/cookie.plugin';
import proxyPlugin from '@/www/plugins/proxy.plugin';
import FastifyApplierGroup from '@/www/FastifyApplierGroup';

let app: IFastifyInstance;

beforeAll(async () => {
	const api = new ApiServer({
		routes: new FastifyApplierGroup(authRoutes),
		plugins: new FastifyApplierGroup(cookiePlugin, proxyPlugin),
	});

	await api.bootstrap();
	app = api.app;
});

describe('routes > proxy', () => {
	it('GET /api/movie/{movie_id}', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/api/movie/76600',
		});

		const payload = JSON.parse(response.payload);

		expect(payload.id).toBe(76600);
		expect(payload.original_title).toBe('Avatar: The Way of Water');
		expect(response.statusCode).toBe(200);
	});

	it('GET /api/movie/{movie_id} with cookie', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/api/movie/76600',
			cookies: {
				sessionid: 'f5c7eeb5a8870efe3cd7fc5c282cffd26800ecd',
			},
		});

		expect(response.raw.req.url).toBe(
			'/api/movie/76600?session_id=f5c7eeb5a8870efe3cd7fc5c282cffd26800ecd'
		);
	});
});
