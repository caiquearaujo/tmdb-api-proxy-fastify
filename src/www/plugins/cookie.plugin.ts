import fastifyCookie from '@fastify/cookie';
import { TFnApplyToFastify } from '@/types';

const callable: TFnApplyToFastify = async (app, env) => {
	await app.register(fastifyCookie, { secret: env.cookie_secret });
};

export default callable;
