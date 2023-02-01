import mounted from '@/env/config';
import FastifyApplierGroup from '@/www/FastifyApplierGroup';
import fastify from 'fastify';

describe('FastifyApplierGroup', () => {
	it('should apply all the callables', async () => {
		const server = fastify();

		const callable1 = jest.fn();
		const callable2 = jest.fn();
		const callable3 = jest.fn();

		const group = new FastifyApplierGroup(
			callable1,
			callable2,
			callable3
		);

		await group.apply(server, mounted);

		expect(callable1).toHaveBeenCalledWith(server, mounted);
		expect(callable2).toHaveBeenCalledWith(server, mounted);
		expect(callable3).toHaveBeenCalledWith(server, mounted);
	});
});
