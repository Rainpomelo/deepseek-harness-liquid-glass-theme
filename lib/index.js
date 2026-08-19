import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
//#region src/index.ts
const name = "ui-liquid-glass";
const inject = ["webServer"];
function getStorageDir() {
	const dshDir = path.join(os.homedir(), ".dsh");
	if (!fs.existsSync(dshDir)) try {
		fs.mkdirSync(dshDir, { recursive: true });
	} catch {}
	return dshDir;
}
function getWallpapersDir() {
	const dir = path.join(getStorageDir(), "wallpapers");
	if (!fs.existsSync(dir)) try {
		fs.mkdirSync(dir, { recursive: true });
	} catch {}
	return dir;
}
function getSettingsFilePath() {
	return path.join(getStorageDir(), "liquid-glass-settings.json");
}
function getWallpapersFilePath() {
	return path.join(getStorageDir(), "liquid-glass-wallpapers.json");
}
function apply(ctx) {
	const settingsFile = getSettingsFilePath();
	const wallpapersFile = getWallpapersFilePath();
	const wallpapersDir = getWallpapersDir();
	ctx.effect(() => {
		return ctx.webServer.register({
			kind: "prefix",
			path: "/api/liquid-glass",
			handler: async (req, res) => {
				const rawUrl = req.url || "";
				const method = req.method || "GET";
				const urlObj = new URL(rawUrl, "http://localhost");
				const pathname = urlObj.pathname;
				res.setHeader("Access-Control-Allow-Origin", "*");
				res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
				res.setHeader("Access-Control-Allow-Headers", "Content-Type");
				if (method === "OPTIONS") {
					res.statusCode = 204;
					res.end();
					return;
				}
				if (pathname === "/api/liquid-glass/settings") {
					res.setHeader("Content-Type", "application/json; charset=utf-8");
					if (method === "GET") {
						try {
							if (fs.existsSync(settingsFile)) {
								const data = fs.readFileSync(settingsFile, "utf8");
								res.statusCode = 200;
								res.end(data);
								return;
							}
						} catch {}
						res.statusCode = 200;
						res.end(JSON.stringify({}));
						return;
					} else if (method === "POST") {
						let body = "";
						req.on("data", (chunk) => {
							body += chunk;
						});
						req.on("end", () => {
							try {
								fs.writeFileSync(settingsFile, body, "utf8");
								res.statusCode = 200;
								res.end(JSON.stringify({ ok: true }));
							} catch (err) {
								res.statusCode = 500;
								res.end(JSON.stringify({ error: err.message }));
							}
						});
						return;
					}
				}
				if (pathname === "/api/liquid-glass/wallpapers") {
					res.setHeader("Content-Type", "application/json; charset=utf-8");
					if (method === "GET") {
						try {
							if (fs.existsSync(wallpapersFile)) {
								const data = fs.readFileSync(wallpapersFile, "utf8");
								res.statusCode = 200;
								res.end(data);
								return;
							}
						} catch {}
						res.statusCode = 200;
						res.end(JSON.stringify({
							customWallpapers: [],
							activeBuiltinId: "builtin-1",
							activeCustomId: ""
						}));
						return;
					} else if (method === "POST") {
						let body = "";
						req.on("data", (chunk) => {
							body += chunk;
						});
						req.on("end", () => {
							try {
								fs.writeFileSync(wallpapersFile, body, "utf8");
								res.statusCode = 200;
								res.end(JSON.stringify({ ok: true }));
							} catch (err) {
								res.statusCode = 500;
								res.end(JSON.stringify({ error: err.message }));
							}
						});
						return;
					}
				}
				if (pathname === "/api/liquid-glass/copy-local-file" && method === "POST") {
					res.setHeader("Content-Type", "application/json; charset=utf-8");
					let body = "";
					req.on("data", (chunk) => {
						body += chunk;
					});
					req.on("end", () => {
						try {
							const { sourcePath, id, ext } = JSON.parse(body);
							if (sourcePath && fs.existsSync(sourcePath)) {
								const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, "");
								const safeExt = ext ? String(ext).replace(/[^a-zA-Z0-9]/g, "") : "mp4";
								const targetPath = path.join(wallpapersDir, `${safeId}.${safeExt}`);
								fs.copyFileSync(sourcePath, targetPath);
								res.statusCode = 200;
								res.end(JSON.stringify({
									ok: true,
									fileUrl: `/api/liquid-glass/wallpaper-file?id=${safeId}&ext=${safeExt}`
								}));
								return;
							}
						} catch {}
						res.statusCode = 400;
						res.end(JSON.stringify({ error: "failed to copy local file" }));
					});
					return;
				}
				if (pathname === "/api/liquid-glass/upload-raw" && method === "POST") {
					const id = urlObj.searchParams.get("id") || "";
					const ext = urlObj.searchParams.get("ext") || "mp4";
					const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "");
					const safeExt = ext.replace(/[^a-zA-Z0-9]/g, "");
					if (!safeId) {
						res.statusCode = 400;
						res.setHeader("Content-Type", "application/json");
						res.end(JSON.stringify({ error: "id required" }));
						return;
					}
					const filePath = path.join(wallpapersDir, `${safeId}.${safeExt}`);
					const out = fs.createWriteStream(filePath);
					req.pipe(out);
					out.on("finish", () => {
						res.statusCode = 200;
						res.setHeader("Content-Type", "application/json");
						res.end(JSON.stringify({
							ok: true,
							fileUrl: `/api/liquid-glass/wallpaper-file?id=${safeId}&ext=${safeExt}`
						}));
					});
					out.on("error", (err) => {
						res.statusCode = 500;
						res.setHeader("Content-Type", "application/json");
						res.end(JSON.stringify({ error: err.message }));
					});
					return;
				}
				if (pathname === "/api/liquid-glass/upload-wallpaper" && method === "POST") {
					res.setHeader("Content-Type", "application/json; charset=utf-8");
					let body = "";
					req.on("data", (chunk) => {
						body += chunk;
					});
					req.on("end", () => {
						try {
							const { id, ext, base64Data, posterBase64 } = JSON.parse(body);
							if (!id || !base64Data) {
								res.statusCode = 400;
								res.end(JSON.stringify({ error: "id and base64Data required" }));
								return;
							}
							const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, "");
							const fileExt = ext ? String(ext).replace(/[^a-zA-Z0-9]/g, "") : "dat";
							const filePath = path.join(wallpapersDir, `${safeId}.${fileExt}`);
							const buffer = Buffer.from(base64Data, "base64");
							fs.writeFileSync(filePath, buffer);
							if (posterBase64) {
								const posterPath = path.join(wallpapersDir, `${safeId}_poster.jpg`);
								fs.writeFileSync(posterPath, Buffer.from(posterBase64, "base64"));
							}
							res.statusCode = 200;
							res.end(JSON.stringify({
								ok: true,
								fileUrl: `/api/liquid-glass/wallpaper-file?id=${safeId}&ext=${fileExt}`,
								posterUrl: posterBase64 ? `/api/liquid-glass/wallpaper-file?id=${safeId}_poster&ext=jpg` : ""
							}));
						} catch (err) {
							res.statusCode = 500;
							res.end(JSON.stringify({ error: err.message }));
						}
					});
					return;
				}
				if (pathname === "/api/liquid-glass/wallpaper-file" && method === "GET") {
					const id = urlObj.searchParams.get("id") || "";
					const ext = urlObj.searchParams.get("ext") || "";
					const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "");
					const safeExt = ext.replace(/[^a-zA-Z0-9]/g, "");
					let targetFile = "";
					if (safeExt) {
						const candidate = path.join(wallpapersDir, `${safeId}.${safeExt}`);
						if (fs.existsSync(candidate)) targetFile = candidate;
					}
					if (!targetFile) {
						const match = fs.readdirSync(wallpapersDir).find((f) => f.startsWith(`${safeId}.`) || f === safeId);
						if (match) targetFile = path.join(wallpapersDir, match);
					}
					if (!targetFile || !fs.existsSync(targetFile)) {
						res.statusCode = 404;
						res.setHeader("Content-Type", "application/json");
						res.end(JSON.stringify({ error: "file not found" }));
						return;
					}
					const mimeType = {
						mp4: "video/mp4",
						webm: "video/webm",
						mov: "video/quicktime",
						jpg: "image/jpeg",
						jpeg: "image/jpeg",
						png: "image/png",
						webp: "image/webp",
						gif: "image/gif"
					}[path.extname(targetFile).slice(1).toLowerCase()] || "application/octet-stream";
					const fileSize = fs.statSync(targetFile).size;
					const range = req.headers.range;
					if (range) {
						const parts = range.replace(/bytes=/, "").split("-");
						const start = parseInt(parts[0], 10);
						const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
						const chunksize = end - start + 1;
						const stream = fs.createReadStream(targetFile, {
							start,
							end
						});
						res.writeHead(206, {
							"Content-Range": `bytes ${start}-${end}/${fileSize}`,
							"Accept-Ranges": "bytes",
							"Content-Length": chunksize,
							"Content-Type": mimeType
						});
						stream.pipe(res);
					} else {
						res.writeHead(200, {
							"Content-Length": fileSize,
							"Content-Type": mimeType,
							"Accept-Ranges": "bytes"
						});
						fs.createReadStream(targetFile).pipe(res);
					}
					return;
				}
				res.statusCode = 404;
				res.setHeader("Content-Type", "application/json; charset=utf-8");
				res.end(JSON.stringify({ error: "not found" }));
			}
		});
	}, "ui-liquid-glass: persistence API routes");
}
//#endregion
export { apply, inject, name };
