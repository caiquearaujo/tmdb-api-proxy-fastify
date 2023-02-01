import { IApiServer, IHttpServer } from '@/types';

export default class HttpServer implements IHttpServer {
	api: IApiServer;

	running = false;

	constructor(api: IApiServer) {
		this.api = api;
	}

	public async start() {
		this.running = await this.listen();
		return this.running;
	}

	public async restart() {
		await this.stop();
		await this.start();
		return this.running;
	}

	public async stop() {
		this.api.app.log.info('⚠️ [server]: Stopping server');

		const response = await new Promise<boolean>((res, rej) => {
			if (!this.isRunning()) res(true);

			this.api.app
				.close()
				.then(
					() => {
						this.api.app.log.info(
							'⚡️ [server]: Server was closed with success'
						);
						res(true);
					},
					(err: Error) => {
						this.api.app.log.error(
							'⛔ [server]: An unexpected error happened while closing server',
							err
						);
						rej(err);
					}
				)
				.catch((err: Error) => {
					this.api.app.log.error(
						'⛔ [server]: An unexpected error happened while closing server',
						err
					);
					rej(err);
				});
		});

		this.running = !response;
		return this.running;
	}

	public isRunning(): boolean {
		return this.running;
	}

	protected listen(): Promise<boolean> {
		if (this.isRunning()) {
			this.api.app.log.warn('⚠️ [server]: Server is already running');

			return new Promise(res => {
				res(false);
			});
		}

		return new Promise((res, rej) => {
			this.api.app.listen(
				{ port: this.api.env.port, host: this.api.env.host },
				(err, address) => {
					if (err) {
						// Should notify administrators
						this.api.app.log.error(err);
						rej(err);
					}

					this.api.app.log.info(
						`⚡️ [server]: Server is running at ${address}`
					);
					res(true);
				}
			);
		});
	}
}
