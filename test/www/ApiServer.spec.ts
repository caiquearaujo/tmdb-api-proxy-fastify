import mounted from '@/env/config';
import ApiServer from '@/www/ApiServer';
import Logger from '@/utils/Logger';
import FastifyApplierGroup from '@/www/FastifyApplierGroup';
import HttpServer from '@/www/HttpServer';

describe('ApiServer', () => {
	it('should create an instance', () => {
		const plugins = new FastifyApplierGroup(jest.fn());
		const router = new FastifyApplierGroup(jest.fn());

		const apiServer = new ApiServer({
			routes: router,
			plugins: plugins,
		});

		expect(typeof apiServer.app).toBe('object');
		expect(apiServer.env).toStrictEqual(mounted);
		expect(apiServer.plugins).toStrictEqual(plugins);
		expect(apiServer.routes).toStrictEqual(router);
	});

	it('should bootstrap', async () => {
		const plugins = new FastifyApplierGroup(jest.fn());
		const router = new FastifyApplierGroup(jest.fn());

		plugins.apply = jest.fn();
		router.apply = jest.fn();

		const apiServer = new ApiServer({
			routes: router,
			plugins: plugins,
		});

		expect(Logger.getInstance()).toBeUndefined();

		const httpServer = await apiServer.bootstrap();

		expect(httpServer).toBeInstanceOf(HttpServer);
		expect(plugins.apply).toBeCalledTimes(1);
		expect(router.apply).toBeCalledTimes(1);
		expect(Logger.getInstance()).toBeInstanceOf(Logger);
	});
});
