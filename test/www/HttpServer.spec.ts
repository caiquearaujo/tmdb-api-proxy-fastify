import ApiServer from '@/www/ApiServer';
import FastifyApplierGroup from '@/www/FastifyApplierGroup';
import HttpServer from '@/www/HttpServer';

describe('HttpServer', () => {
	it('should create an instance', () => {
		const apiServer = new ApiServer({
			routes: new FastifyApplierGroup(jest.fn()),
			plugins: new FastifyApplierGroup(jest.fn()),
		});

		const httpServer = new HttpServer(apiServer);

		expect(httpServer.api).toStrictEqual(apiServer);
		expect(httpServer.running).toBe(false);
	});
});
