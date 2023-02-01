import {
	IApplyToFastify,
	IFastifyInstance,
	TEnvVariables,
	TFnApplyToFastify,
} from '@/types';

export default class FastifyApplierGroup implements IApplyToFastify {
	protected callables: Array<TFnApplyToFastify> = [];

	constructor(...args: Array<TFnApplyToFastify>) {
		this.callables = args;
	}

	async apply(app: IFastifyInstance, env: TEnvVariables): Promise<void> {
		await Promise.all(
			this.callables.map(async callable => {
				await callable(app, env);
			})
		);
	}
}
