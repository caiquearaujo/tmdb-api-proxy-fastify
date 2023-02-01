import fastify from 'fastify';
import helmetPlugin from '@/www/plugins/helmet.plugin';
import corsPlugin from '@/www/plugins/cors.plugin';
import cookiePlugin from '@/www/plugins/cookie.plugin';
import proxyPlugin from '@/www/plugins/proxy.plugin';
import rateLimitPlugin from '@/www/plugins/ratelimit.plugin';
import env from '@/env/config';

describe('plugins > register', () => {
	it('should register the helmet plugin', async () => {
		const server = fastify();
		server.register = jest.fn();
		await helmetPlugin(server, env);

		expect(server.register).toHaveBeenCalledWith(
			expect.any(Function),
			env.environment !== 'production'
				? {
						contentSecurityPolicy: false,
						crossOriginOpenerPolicy: false,
						originAgentCluster: false,
				  }
				: {}
		);
	});

	it('should register the cors plugin', async () => {
		const server = fastify();
		server.register = jest.fn();
		await corsPlugin(server, env);

		expect(server.register).toHaveBeenCalledWith(
			expect.any(Function),
			env.environment !== 'production' ? { origin: true } : {}
		);
	});

	it('should register the cookie plugin', async () => {
		const server = fastify();
		server.register = jest.fn();
		await cookiePlugin(server, env);

		expect(server.register).toHaveBeenCalledWith(expect.any(Function), {
			secret: env.cookie_secret,
		});
	});

	it('should register the proxy plugin', async () => {
		const server = fastify();
		server.register = jest.fn();
		await proxyPlugin(server, env);

		expect(server.register).toHaveBeenCalledWith(
			expect.any(Function),
			expect.any(Object)
		);
	});

	it('should register the rateLimit plugin', async () => {
		const server = fastify();
		server.register = jest.fn();
		await rateLimitPlugin(server, env);

		expect(server.register).toHaveBeenCalledWith(expect.any(Function), {
			max: 100,
			timeWindow: '1 minute',
		});
	});
});
