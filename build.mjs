import { build, context } from 'esbuild'
import { transform } from 'lightningcss'
import { readFile } from 'node:fs/promises'
import { dirname, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const clientEntry = resolve(root, 'src/client/index.ts')
const nodeEntry = resolve(root, 'src/index.ts')
const clientOut = resolve(root, 'lib/client.js')
const nodeOut = resolve(root, 'lib/index.js')
const pluginId = '@deepseek-ai/dsh-client-ui-liquid-glass'

/** Repository-relative, POSIX-separated path — identical on every machine. */
const repoPath = (absolute) => relative(root, absolute).split(sep).join('/')

function cssModulesPlugin() {
  return {
    name: 'dsh-css-modules-inline',
    setup(buildApi) {
      // Hand esbuild a repository-relative module path. It is only used as the
      // module identity and as this module's `sources` entry in the source map,
      // so an absolute path would bake the builder's local directory into both
      // the published bundle's CSS tag id and the committed map — making the
      // build machine-dependent and unverifiable in CI.
      buildApi.onResolve({ filter: /\.module\.css$/ }, (args) => {
        const absolute = resolve(args.resolveDir, args.path)
        return { path: repoPath(absolute), namespace: 'dsh-css', pluginData: { absolute } }
      })
      buildApi.onLoad({ filter: /.*/, namespace: 'dsh-css' }, async (args) => {
        const file = args.pluginData?.absolute ?? args.path
        const result = transform({
          filename: file,
          code: await readFile(file),
          cssModules: { pattern: '[hash]_[local]' },
          minify: true,
        })
        // lightningcss hands back `exports` in a process-varying order, so the
        // generated class map used to differ between identical builds. Sort the
        // keys: the map is only ever read by name, and a stable bundle is what
        // lets CI assert that `lib/` matches `src/`.
        const classes = Object.fromEntries(
          Object.entries(result.exports ?? {})
            .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
            .map(([key, value]) => [key, value.name]),
        )
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
        return { contents, loader: 'js', resolveDir: dirname(file) }
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
