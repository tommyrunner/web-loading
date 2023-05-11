import { defineConfig } from 'rollup'
import { join } from 'path'

import { terser as rollupTerser } from 'rollup-plugin-terser'
import rollupJSON from '@rollup/plugin-json'
import rollupCommonJS from '@rollup/plugin-commonjs'
import rollupReplace from '@rollup/plugin-replace'
import rollupNodeResolve from '@rollup/plugin-node-resolve'

/**
 * @typedef {'umd' | 'cjs' | 'esm-bundler'} OutputFormat
 */

/**
 * @param {OutputFormat} format
 * @param {boolean} minify
 * @returns {string}
 */
function replaceProcessNodeEnv(format, minify) {
  switch (format) {
    case 'umd':
    case 'cjs':
      return minify ? '"production"' : '"development"'
    case 'esm-bundler':
      return 'process.env.NODE_ENV'
    default:
      throw new TypeError(`Unsupport format: ${format}`)
  }
}

/**
 * @param {OutputFormat} format
 * @param {boolean} minify
 * @returns {string}
 */
function replaceDev(format, minify) {
  switch (format) {
    case 'umd':
    case 'cjs':
      return minify ? 'false' : 'true'
    case 'esm-bundler':
      return 'process.env.NODE_ENV !== "production"'
    default:
      throw new TypeError(`Unsupport format: ${format}`)
  }
}

/**
 * @param {OutputFormat} format
 * @param {boolean} minify
 * @returns {import('rollup').RollupOptions}
 */
function createOption(format, minify) {
  const name = `web-loading${format === 'umd' ? '' : `.${format}`}${minify ? '.min' : ''}.js`
  return {
    input: join(__dirname, 'lib/main.js'),
    plugins: [
      rollupNodeResolve({
        mainFields: ['browser', 'module', 'main']
      }),
      rollupJSON(),

      rollupReplace({
        preventAssignment: true,
        'process.env.NODE_ENV': replaceProcessNodeEnv(format, minify),
        __DEV__: replaceDev(format, minify),
        __VERSION__: JSON.stringify(require('./package.json').version)
      }),
      rollupCommonJS({
        transformMixedEsModules: true,
        extensions: ['.js', 'jsx', '.ts', '.tsx']
      }),
      {
        name: 'typescript-class-pure',
        transform(code) {
          return code.replace(/\/\*\* @class \*\/ \(function/g, '/*#__PURE__*/ (function')
        }
      },
      ...(minify
        ? [
            rollupTerser({
              output: {
                comments: false
              },
              module: format === 'esm-bundler'
            })
          ]
        : [])
    ],
    output: {
      file: join(__dirname, 'dist', name),
      format: format === 'esm-bundler' ? 'esm' : format,
      name: 'rustOption',
      exports: 'named'
    }
  }
}

export default defineConfig([
  createOption('umd', false),
  createOption('umd', true),
  createOption('cjs', false),
  createOption('cjs', true),
  createOption('esm-bundler', false)
])
