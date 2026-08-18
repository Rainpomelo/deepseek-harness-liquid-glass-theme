/**
 * Liquid Glass theme plugin, host half.
 * Provides persistent local filesystem storage for settings and wallpapers
 * to survive Electron dynamic port switches and restarts.
 */
import type { Context } from '@deepseek-ai/cordis'
import type { IncomingMessage, ServerResponse } from 'node:http'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as os from 'node:os'

export const name = 'ui-liquid-glass'
export const inject = ['webServer']

function getStorageDir(): string {
  const dshDir = path.join(os.homedir(), '.dsh')
  if (!fs.existsSync(dshDir)) {
    try { fs.mkdirSync(dshDir, { recursive: true }) } catch {}
  }
  return dshDir
}

function getSettingsFilePath(): string {
  return path.join(getStorageDir(), 'liquid-glass-settings.json')
}

function getWallpapersFilePath(): string {
  return path.join(getStorageDir(), 'liquid-glass-wallpapers.json')
}

export function apply(ctx: Context): void {
  const settingsFile = getSettingsFilePath()
  const wallpapersFile = getWallpapersFilePath()

  ctx.effect(() => {
    return ctx.webServer.register({
      kind: 'prefix',
      path: '/api/liquid-glass',
      handler: async (req: IncomingMessage, res: ServerResponse) => {
        const url = req.url || ''
        const method = req.method || 'GET'

        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (url.startsWith('/api/liquid-glass/settings')) {
          if (method === 'GET') {
            try {
              if (fs.existsSync(settingsFile)) {
                const data = fs.readFileSync(settingsFile, 'utf8')
                res.statusCode = 200
                res.end(data)
                return
              }
            } catch {}
            res.statusCode = 200
            res.end(JSON.stringify({}))
            return
          } else if (method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', () => {
              try {
                fs.writeFileSync(settingsFile, body, 'utf8')
                res.statusCode = 200
                res.end(JSON.stringify({ ok: true }))
              } catch (err: any) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: err.message }))
              }
            })
            return
          }
        }

        if (url.startsWith('/api/liquid-glass/wallpapers')) {
          if (method === 'GET') {
            try {
              if (fs.existsSync(wallpapersFile)) {
                const data = fs.readFileSync(wallpapersFile, 'utf8')
                res.statusCode = 200
                res.end(data)
                return
              }
            } catch {}
            res.statusCode = 200
            res.end(JSON.stringify({ customWallpapers: [], activeBuiltinId: 'builtin-1', activeCustomId: '' }))
            return
          } else if (method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', () => {
              try {
                fs.writeFileSync(wallpapersFile, body, 'utf8')
                res.statusCode = 200
                res.end(JSON.stringify({ ok: true }))
              } catch (err: any) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: err.message }))
              }
            })
            return
          }
        }

        res.statusCode = 404
        res.end(JSON.stringify({ error: 'not found' }))
      }
    })
  }, 'ui-liquid-glass: persistence API routes')
}
