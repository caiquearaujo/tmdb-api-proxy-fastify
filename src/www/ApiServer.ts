import fastify from 'fastify';

import {
	IApiServer,
	IFastifyInstance,
	IHttpServer,
	IApplyToFastify,
	TEnvVariables,
} from '@/types';
import mountedEnv from '@/env/config';
import Logger from '@/utils/Logger';

import HttpServer from './HttpServer';

export default class ApiServer implements IApiServer {
	app: IFastifyInstance;

	routes: IApplyToFastify;

	plugins: IApplyToFastify;

	env: TEnvVariables;

	constructor(options: {
		routes: IApplyToFastify;
		plugins: IApplyToFastify;
	}) {
		this.env = mountedEnv;

		this.app = fastify({
			logger: {
				file: `${this.env.log_path}/server.log`,
			},
			trustProxy: true,
		});

		this.routes = options.routes;
		this.plugins = options.plugins;
	}

	public async bootstrap(): Promise<IHttpServer> {
		await this.init();
		return new HttpServer(this);
	}

	protected async init(): Promise<void> {
		// Prepare application logger
		Logger.prepareInstance(this.app.log);

		// Plugins
		await this.plugins.apply(this.app, this.env);

		// Routes
		await this.routes.apply(this.app, this.env);

		// Not found routes
		this.app.setNotFoundHandler((request, reply) => {
			reply.status(404).send({
				status: 404,
				name: 'NotFound',
				message: 'The resource you are looking for is not found.',
			});
		});

		// Any error
		this.app.setErrorHandler((error, request, reply) => {
			const { name = 'UnknownError', message = 'Error is unknown' } =
				error;

			this.app.log.error(error);

			reply.status(parseInt(error.code ?? '500', 10)).send({
				status: error.code ?? 500,
				name,
				message,
			});
		});
	}
}
