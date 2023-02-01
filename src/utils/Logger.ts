import { FastifyBaseLogger } from 'fastify';

export default class Logger {
	private static instance: Logger;

	public logger: FastifyBaseLogger;

	private constructor(logger: FastifyBaseLogger) {
		this.logger = logger;
	}

	public static prepareInstance(logger: FastifyBaseLogger) {
		Logger.instance = new Logger(logger);
	}

	public static getInstance() {
		return Logger.instance;
	}
}
