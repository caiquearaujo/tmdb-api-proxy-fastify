import 'module-alias/register';
import ApiServer from './www/ApiServer';
import FastifyApplierGroup from './www/FastifyApplierGroup';
import plugins from './www/plugins';
import auth from './www/routes/auth';

const options = {
	routes: new FastifyApplierGroup(auth),
	plugins: new FastifyApplierGroup(...plugins),
};

new ApiServer(options)
	.bootstrap()
	.then(server => {
		server
			.start()
			.then(() => console.log(`⚡️ Server is ready and running.`))
			.catch(err => {
				console.error('❌ Server has failed while starting');
				console.error(err);
				process.exit(1);
			});
	})
	.catch(err => {
		console.error('❌ Server has failed while starting');
		console.error(err);
		process.exit(1);
	});
