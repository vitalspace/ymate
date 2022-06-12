// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			out: 'app/build',
		}),
	},
};

export default config;
