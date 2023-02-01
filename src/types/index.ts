import { FastifyInstance } from 'fastify';

export type TAvailableEnvs = 'test' | 'development' | 'production';

export type TEnvVariables = {
	name: string;
	port: number;
	host: string;
	api_key: string;
	cookie_secret: string;
	environment: TAvailableEnvs;
};

export type TFnApplyToFastify = (
	app: IFastifyInstance,
	env: TEnvVariables
) => Promise<void>;

export interface IApplyToFastify {
	apply(app: IFastifyInstance, env: TEnvVariables): Promise<void>;
}

export type IFastifyInstance = FastifyInstance;

export interface IApiServer {
	app: IFastifyInstance;
	routes: IApplyToFastify;
	plugins: IApplyToFastify;
	env: TEnvVariables;

	bootstrap(): Promise<IHttpServer>;
}

export interface IHttpServer {
	api: IApiServer;
	start(): Promise<boolean>;
	restart(): Promise<boolean>;
	stop(): Promise<boolean>;
	isRunning(): boolean;
}
