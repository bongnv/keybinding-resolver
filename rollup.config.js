const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel');

const pkg = require('./package.json');

module.exports = {
  input: 'lib/main.js',
  external: ['atom', 'electron', 'path', ...Object.keys(pkg.dependencies)],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    commonjs({
      exclude: [/\-view\.js/],
      requireReturnsDefault: "auto",
    }),
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              electron: process.versions.electron || process.env.ELECTRON_VERSION || "12",
            },
          },
        ],
        '@babel/preset-react',
      ],
      sourceType: "unambiguous",
    }),
  ],
};
