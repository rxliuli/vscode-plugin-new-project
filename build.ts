import { build } from 'esbuild'
import { mkdirp, remove } from 'fs-extra'

async function main() {
  await remove('./dist')
  await mkdirp('./dist')
  const watch = process.argv[2] === '-w'
  await build({
    entryPoints: ['./src/extension.ts'],
    outdir: './dist',
    bundle: true,
    sourcemap: true,
    external: ['vscode'],
    platform: 'node',
    watch,
    plugins: [
      {
        name: 'esbuild-plugin-log',
        setup(bundle) {
          let start: number
          bundle.onStart(() => {
            start = Date.now()
          })
          bundle.onEnd(() => {
            console.log(`构建完成，用时: ${Date.now() - start}ms`)
          })
        },
      },
    ],
  })
}

main()
