import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/index.tsx',
  output: {
    file: './lib/index.js',
    format: 'esm'
  },
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: ['react', 'uuid', 'intersection-observer', 'fast-deep-equal']
}
