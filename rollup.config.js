export default {
	input: 'src/index.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'kxzd',
		file: 'kxzd.js',
		globals:{'hanziyin':'hanziyin'}
	}
}