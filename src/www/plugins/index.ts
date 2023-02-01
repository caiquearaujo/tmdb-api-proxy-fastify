import helmetPlugin from './helmet.plugin';
import corsPlugin from './cors.plugin';
import cookiePlugin from './cookie.plugin';
import proxyPlugin from './proxy.plugin';
import rateLimitPlugin from './ratelimit.plugin';

export default [
	helmetPlugin,
	corsPlugin,
	rateLimitPlugin,
	cookiePlugin,
	proxyPlugin,
];
