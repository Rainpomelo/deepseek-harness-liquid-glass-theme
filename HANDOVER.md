# DeepSeek Harness Liquid Glass & Live Wallpaper 插件技术交接文档

## 1. 项目概况与基础信息

- **项目名称**：`deepseek-harness-liquid-glass-theme`
- **NPM 包名**：`@deepseek-ai/dsh-client-ui-liquid-glass` (v2.0.0)
- **本地源码路径**：`C:\Agent code\deepseek-harness-插件\deepseek-harness-Liquid glass-Live Wallpaper`
- **GitHub 远程仓库**：`https://github.com/Rainpomelo/deepseek-harness-liquid-glass-theme.git` (主分支: `main`)
- **适用宿主**：DeepSeek Harness Desktop (Electron 43.4.0 / Cordis 4.0.1 / React 18) 及 Web 运行态

---

## 2. 推荐壁纸库全量内嵌清单

所有 9 款原版内置壁纸已完成全量离线 Base64 数据内嵌（零网络依赖，零本地文件路径丢失风险）：

### 2.1 动态视频壁纸（3 款）
1. **`DeepSeek`**
   - 标识：`builtin-video-1`
   - 资产路径：`assets/deepseek_opt.mp4`
   - 格式：720p H.264 60fps 循环流，离线 Base64 Data URL 内嵌（~412 KB）
2. **`ELDEN RING™`**
   - 标识：`builtin-video-2`
   - 资产路径：`assets/elden_ring_opt.mp4`
   - 格式：720p H.264 60fps 循环流，离线 Base64 Data URL 内嵌（~377 KB）
3. **`雷暴预感 1080p`**
   - 标识：`builtin-video-3`
   - 资产路径：`assets/thunderstorm_opt.mp4`
   - 格式：720p H.264 30fps 循环流，离线 Base64 Data URL 内嵌（~213 KB）

### 2.2 静态原画壁纸（6 款）
4. **`绫波丽`**（系统默认底板）
   - 标识：`builtin-1`
   - 资产路径：`src/client/assets/wallpaper_1_ayanami.png`（3.2 MB 原图 Base64）
5. **`猫羽雫 1`**
   - 标识：`builtin-2`
   - 资产路径：`src/client/assets/wallpaper_2_nekoha1.png`（320 KB 原图 Base64）
6. **`猫羽雫 2`**
   - 标识：`builtin-3`
   - 资产路径：`src/client/assets/wallpaper_3_nekoha2.png`（2.4 MB 原图 Base64）
7. **`太空星轨`**
   - 标识：`builtin-4`
   - 资产路径：`src/client/assets/wallpaper_4_space.png`（1.0 MB 原图 Base64）
8. **`夏日`**
   - 标识：`builtin-5`
   - 资产路径：`src/client/assets/wallpaper_5_summer.jpg`（1.4 MB 原图 Base64）
9. **`水洼倒影`**
   - 标识：`builtin-6`
   - 资产路径：`src/client/assets/wallpaper_6_puddle.jpg`（1.5 MB 原图 Base64）

---

## 3. 核心源码架构与模块分工

```
deepseek-harness-Liquid glass-Live Wallpaper/
├── assets/                          # 原始与优化后视频资产
├── src/
│   ├── index.ts                     # 后端 Node 插件入口与 WebServer 路由
│   └── client/
│       ├── index.ts                 # 客户端主入口与 Cordis 插件装配
│       ├── theme-layer.ts           # 核心主题图层、DOM 挂载与 Token 注入
│       ├── glass-shader.ts          # WebGL 物理折射着色器与离屏绘制管线
│       ├── glass-ambient.ts         # 底层固定画布与活动视频 DOM 挂载槽
│       ├── builtin-wallpapers.ts    # 9 款内置壁纸数据流清单
│       ├── wallpaper-storage.ts     # 自定义壁纸状态同步与持久化
│       ├── settings-store.ts        # 主题与壁纸参数状态定义
│       ├── settings-panel.tsx       # 设置抽屉 UI 与壁纸选择卡片流
│       ├── seam-stamper.ts          # 动态 DOM 框架穿透补丁
│       └── liquid-glass.module.css  # 界面层级透光与毛玻璃样式规则
├── lib/
│   ├── index.js                     # 生产环境 Node 后端产物
│   └── client.js                    # 生产环境前端全量 Bundle (含全部壁纸)
├── cordis.patch.yml                 # 插件级 Cordis 加载补丁
└── package.json                     # 插件清单与 dshClient 声明
```

### 关键模块技术实现点

1. **`src/client/builtin-wallpapers.ts`**
   - 包含全部 9 款壁纸的 `BUILTIN_WALLPAPERS` 数组；
   - 静态图采用 `data:image/png;base64,...` / `data:image/jpeg;base64,...`；
   - 动态视频采用 `video:data:video/mp4;base64,...` 协议前缀。

2. **`src/client/glass-shader.ts`**
   - **离屏场景画布 (`sceneCanvas`)**：负责按比例 `drawCover` 绘制当前活动的图片或视频帧；
   - **WebGL 着色器管线**：实现 Snell 物理折射算法、柯西色散分光、凸透镜隆起 (Bulge)、16-Tap 高斯雾面毛玻璃及波纹扩散；
   - **绘制防崩沙箱**：在 `drawCover` 中捕获了 `drawImage` 的任何潜在异常，保证渲染主循环（`requestAnimationFrame`）永不中断。

3. **`src/client/glass-ambient.ts`**
   - 在 `document.body` 最前端挂载 `[data-dsh-glass-ambient]`；
   - 内部包含活动视频专用挂载槽 `[data-dsh-glass-video-holder]`，确保 Chromium 内核激活 GPU 硬件解码并触发帧流。

4. **`src/index.ts` (Host 端 Node WebServer 服务)**
   - 监听 `/api/liquid-glass/*` 路由；
   - `/api/liquid-glass/wallpaper-file` 支持 HTTP 206 Partial Content 分片视频点播，已注入 `Access-Control-Allow-Origin: *` 与 `Range` 支持。

---

## 4. 运行时部署与路径映射

DSH Desktop 启动时会自以下路径加载该插件：

1. **客户端解包主目录**：
   `C:\Users\36283\AppData\Local\Programs\DSH Desktop\resources\app.asar.unpacked\node_modules\@deepseek-ai\dsh-client-ui-liquid-glass\`
2. **当前活动 Profile (`desktop`)**：
   `C:\Users\36283\.dsh\profiles\desktop\node_modules\@deepseek-ai\dsh-client-ui-liquid-glass\`
3. **Web Profile (`web`)**：
   `C:\Users\36283\.dsh\profiles\web\node_modules\@deepseek-ai\dsh-client-ui-liquid-glass\`

> [!IMPORTANT]
> **Cordis 加载机制规范**：
> 当前活动的 `~/.dsh/profiles/desktop/package.json` 中的 `dsh.profile.bundles` 已声明 `@deepseek-ai/dsh-client-ui-liquid-glass`。
> 切勿在 `~/.dsh/profiles/desktop/cordis.patch.yml` 或 `app.asar.unpacked/cordis.patch.yml` 中重复手动写入 `- id: ui-liquid-glass`，否则会触发 `duplicate loader entry id` 启动崩溃。

---

## 5. 待排查方向与后续优化建议

如在部分特定 DSH Desktop 界面状态下底板未完全通透透出壁纸，建议后续接手排查以下层级：

1. **DOM 节点透明度穿透（CSS Stacking Context）**：
   - 检查 DSH Desktop 主界面顶层容器（`#root`、`div[class*="frame"]`、`div[class*="centerCol"]`）是否带有 `--dsw-alias-bg-base` 深色实色背景；
   - 可通过浏览器开发工具（DevTools）检查是否有某一层父容器未继承 `background: transparent !important;`。
2. **WebGL Context 丢失恢复**：
   - 监控 `webglcontextlost` 与 `webglcontextrestored` 事件，确认 GPU 驱动重启或睡眠唤醒时着色器程序能够自动自愈重编译。
3. **视频解码跨域与协议**：
   - 推荐优先使用 `BUILTIN_WALLPAPERS` 中的 Base64 模式或 Blob URL 模式，具备最高的跨域兼容性与秒开速度。
