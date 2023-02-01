import fastifyCompress from '@fastify/compress';
import { TFnApplyToFastify } from '@/types';

const callable: TFnApplyToFastify = async app => {
	await app.register(fastifyCompress, { global: true });
};

export default callable;
