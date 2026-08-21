import { build, context } from 'esbuild'
import { transform } from 'lightningcss'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const clientEntry = resolve(root, 'src/client/index.ts')
const nodeEntry = resolve(root, 'src/index.ts')
const clientOut = resolve(root, 'lib/client.js')
const nodeOut = resolve(root, 'lib/index.js')
const pluginId = '@deepseek-ai/dsh-client-ui-liquid-glass'

function cssModulesPlugin() {
  return {
    name: 'dsh-css-modules-inline',
    setup(buildApi) {
      buildApi.onResolve({ filter: /\.module\.css$/ }, (args) => ({ path: resolve(args.resolveDir, args.path), namespace: 'dsh-css' }))
      buildApi.onLoad({ filter: /.*/, namespace: 'dsh-css' }, async (args) => {
        const result = transform({
          filename: args.path,
          code: await readFile(args.path),
          cssModules: { pattern: '[hash]_[local]' },
          minify: true,
        })
        const classes = Object.fromEntries(Object.entries(result.exports ?? {}).map(([key, value]) => [key, value.name]))
        const tagId = `${pluginId}/${args.path}`
        const contents = [
          `const css = ${JSON.stringify(result.code.toString())};`,
          `const classes = ${JSON.stringify(classes)};`,
          `const tagId = ${JSON.stringify(tagId)};`,
          "if (typeof document !== 'undefined' && !document.querySelector('[data-dsh-plugin-css=\\\"' + tagId + '\\\"]')) {",
          "  const tag = document.createElement('style');",
          `  tag.dataset.dshPluginCss = tagId; tag.dataset.plugin = ${JSON.stringify(pluginId)};`,
          '  tag.textContent = css; document.head.appendChild(tag);',
          '}',
          'export default classes;',
        ].join('\n')
        return { contents, loader: 'js', resolveDir: dirname(args.path) }
      })
    },
  }
}

const clientConfig = {
  entryPoints: [clientEntry], outfile: clientOut, bundle: true, format: 'cjs', platform: 'browser', target: ['es2020'], sourcemap: true,
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/client', '@deepseek-ai/*'],
  plugins: [cssModulesPlugin()],
  banner: { js: `var module = { exports: {} }; var exports = module.exports; window.__ModuleLoader__.load({ id: ${JSON.stringify(pluginId)}, factory: (require) => {` },
  footer: { js: 'return module.exports; } });' },
}

const nodeConfig = {
  entryPoints: [nodeEntry], outfile: nodeOut, bundle: true, format: 'esm', platform: 'node', target: ['node18'], sourcemap: true,
  external: ['node:*', '@deepseek-ai/*'],
}

await build(nodeConfig)
if (process.argv.includes('--watch')) {
  const watcher = await context(clientConfig)
  await watcher.watch()
  console.log('Watching client sources...')
} else {
  await build(clientConfig)
}
