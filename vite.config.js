import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const versionServiceWorker = {
  name: 'version-service-worker-from-build',
  apply: 'build',
  async closeBundle() {
    const manifest = await readFile(resolve('dist/build-manifest.json'))
    const version = createHash('sha256').update(manifest).digest('hex').slice(0, 12)
    const serviceWorkerPath = resolve('dist/sw.js')
    const serviceWorker = await readFile(serviceWorkerPath, 'utf8')
    await writeFile(serviceWorkerPath, serviceWorker.replace('__BUILD_VERSION__', version))
  },
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    versionServiceWorker,
  ],
  build: {
    manifest: 'build-manifest.json',
  },
})
