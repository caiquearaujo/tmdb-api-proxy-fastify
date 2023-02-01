import ApiServer from '@/www/ApiServer';
import FastifyApplierGroup from '@/www/FastifyApplierGroup';
import authRoutes from '@/www/routes/auth';
import cookiePlugin from '@/www/plugins/cookie.plugin';
import { IFastifyInstance } from '@/types';
import mounted from '@/env/config';
import api from '@/api';

let app: IFastifyInstance;

jest.mock('@/api');
const mockedAxios = api as jest.Mocked<typeof api>;

beforeAll(async () => {
	const api = new ApiServer({
		routes: new FastifyApplierGroup(authRoutes),
		plugins: new FastifyApplierGroup(cookiePlugin),
	});

	await api.bootstrap();
	app = api.app;
});

describe('routes > auth', () => {
	afterEach(jest.clearAllMocks);

	it('GET /auth', async () => {
		mockedAxios.get.mockResolvedValue({
			data: {
				success: true,
				expires_at: '2023-01-31 17:04:39 UTC',
				request_token: 'ff5c7eeb5a8870efe3cd7fc5c282cffd26800ecd',
			},
		});

		const response = await app.inject({
			method: 'GET',
			url: '/auth',
			headers: {
				'x-forwarded-host': 'http://localhost:3000',
			},
		});

		expect(mockedAxios.get).toHaveBeenCalledWith(
			'/authentication/token/new',
			{
				params: { api_key: mounted.api_key },
			}
		);

		expect(response.statusCode).toBe(302);
		expect(response.headers.location).toBe(
			'https://www.themoviedb.org/authenticate/ff5c7eeb5a8870efe3cd7fc5c282cffd26800ecd?redirect_to=http://localhost:3000'
		);
		expect(response.cookies[0]).toStrictEqual({
			name: 'request_token',
			value: 'ff5c7eeb5a8870efe3cd7fc5c282cffd26800ecd',
			path: '/',
			httpOnly: true,
			sameSite: 'Strict',
		});
	});

	it('GET /auth/approved', async () => {
		const request_token = 'ff5c7eeb5a8870efe3cd7fc5c282cffd26800ecd';

		mockedAxios.post.mockResolvedValue({
			data: {
				success: true,
				session_id: '79191836ddaa0da3df76a5ffef6f07ad6ab0c641',
			},
		});

		const response = await app.inject({
			method: 'GET',
			url: '/auth/approved',
			headers: {
				'x-forwarded-host': 'http://localhost:3000',
			},
			cookies: {
				request_token,
			},
		});

		expect(mockedAxios.post).toHaveBeenCalledWith(
			'/authentication/session/new',
			{
				request_token,
			},
			{
				params: { api_key: mounted.api_key },
			}
		);

		expect(response.statusCode).toBe(302);
		expect(response.headers.location).toBe('http://localhost:3000');
		expect(response.cookies[0]).toStrictEqual({
			name: 'request_token',
			value: '',
			path: '/',
			expires: new Date(0),
		});
		expect(response.cookies[1]).toStrictEqual({
			name: 'sessionid',
			value: '79191836ddaa0da3df76a5ffef6f07ad6ab0c641',
			path: '/',
			httpOnly: true,
			sameSite: 'Strict',
		});
	});
});
