# DeepSeek Harness - 液态玻璃与动态壁纸主题 (Liquid Glass Theme - Web Edition v1.0)

> **版本**：`v1.0.0 (Web Edition)`  
> **适用环境**：Web 浏览器端、远程 Web 访问及纯前端沙箱环境。

基于 WebGL 物理斯涅尔折射与三层光学架构的 DeepSeek Harness 界面主题插件（Web 优化版）。深度集成浏览器标准 IndexedDB 离线存储、Blob 流式播放、WebGL 上下文丢失自愈与低功耗休眠调度，支持 4K 动态壁纸、视频壁纸（MP4/WebM）、手势水波交互以及全界面分层毛玻璃效果。

---

## 版本介绍与选型指南 (Version Editions)

本项目提供 **Web 优化版 (v1.0)** 与 **Desktop 深度优化版 (v2.0)** 两个版本，针对不同运行宿主环境进行了专属优化：

| 维度 / 特性 | 🌐 v1.0 (Web Edition) | 🖥️ v2.0 (Desktop Edition) |
| :--- | :--- | :--- |
| **对应分支 / Tag** | `v1.0-web` / `v1.0.0` | `main` / `v2.0.0` |
| **主要目标环境** | 纯 Web 浏览器、远程 Web 部署、移动端 | [`deepseek-harness-desktop`](https://github.com/anywhere-labs/deepseek-harness-desktop) (Electron / Tauri) |
| **存储与持久化** | 浏览器标准 `IndexedDB` + `localStorage` | **物理磁盘落盘优先**：直存宿主 `~/.dsh/wallpapers/` |
| **动态端口自愈** | 仅限当前浏览器 Origin 作用域 | **全自动自愈**：跨动态随机端口重启不丢壁纸 |
| **视频壁纸传输** | 内存 Blob / ObjectURL 播放 | **HTTP 206 Partial Content** 分片流式传输，零内存暴涨 |
| **本地文件导入** | 需经由前端完整读取后存入 IndexedDB | **本地物理路径瞬时直拷** (`/api/copy-local-file`) |
| **窗口与视觉穿透** | 标准 DOM 容器边界 | 适配桌面端无边框窗口、自定义标题栏与拖拽区 (`-webkit-app-region: drag`) |
| **功耗与生命周期** | `document.hidden` 监听 + RAF 自动休眠 | 窗口最小化/失焦 GPU 节流 + WebGL 上下文自愈 |

### 1. 🌐 v1.0 版本 (Web Edition)
- **定位**：轻量化、纯标准 Web API 驱动。
- **核心特点**：完全在浏览器安全沙箱内运行，无需任何桌面端私有 Node.js API 支持。使用 IndexedDB 缓存视频与壁纸，具备 WebGL 上下文丢失自动恢复与后台标签页低功耗节流。
- **引用方式**：
  ```json
  "@deepseek-ai/dsh-client-ui-liquid-glass": "github:Rainpomelo/deepseek-harness-liquid-glass-theme#v1.0.0"
  ```

### 2. 🖥️ v2.0 版本 (Desktop Edition)
- **定位**：面向桌面端客户端（Electron / Tauri）极致体验深度定制。
- **核心特点**：
  - **物理磁盘落盘优先**：当在桌面端选择本地 4K 壁纸/视频时，直接获取文件物理路径并复制到 `~/.dsh/wallpapers`，解决 Electron 每次启动分配随机动态端口导致 IndexedDB 跨域丢失壁纸的问题。
  - **流式大文件传输**：支持 HTTP 206 分片视频流，播放几百兆的 4K 动态视频壁纸时不会撑爆渲染进程内存。
  - **桌面无边框融合**：针对桌面端的无边框窗口（Frameless Window）、右上角系统控制按钮以及拖拽区域进行光学折射对齐，让背景壁纸与流体真正穿透到窗口最外沿。
- **引用方式**：
  ```json
  "@deepseek-ai/dsh-client-ui-liquid-glass": "github:Rainpomelo/deepseek-harness-liquid-glass-theme#v2.0.0"
  ```

---

## 效果预览

### 1. 动态壁纸与水波交互演示 (Live Demo)
![动态壁纸与水波交互演示](docs/images/live_wallpaper_demo.gif)

### 2. 桌面主体效果 (Layer 2 液态透镜折射与动态底板)
![桌面主体展示](docs/images/desktop_main_preview.png)

### 3. 桌面弹窗效果 (Layer 3 全景虚化与毛玻璃)
![桌面弹窗展示](docs/images/desktop_modal_preview.png)

### 4. 设置面板与光学参数控制
![设置内展示](docs/images/settings_preview.png)

---

## 插件特性

### 1. 三层光学分层架构
- **Layer 0（环境底板与流体层）**：底层 WebGL Canvas 实时渲染动态壁纸、低频流体湍流与鼠标点击产生的水波涟漪。
- **Layer 1（基底雾面玻璃）**：用于侧边栏、详情抽屉与表单控件，提供 16-Tap 物理高斯模糊与暗化对比度。
- **Layer 2（悬浮液态透镜）**：用于主对话输入框、新建会话按钮与操作卡片，在 WebGL Shader 内部实时计算凸透镜曲率（Bulge）、斯涅尔折射（Snell Refraction）、RGB 色散边缘分离（Dispersion）与 3D 顶光倒角反射。
- **Layer 3（模态弹窗与全景虚化）**：设置面板、下拉菜单或二级弹窗弹出时，底层主界面与壁纸自动进入硬件级全景景深高斯模糊，前台面板浮层呈现深色毛玻璃质感。

### 2. 动态壁纸与媒体支持
- **内置推荐壁纸库**：出厂自带 6 款高清质感壁纸，支持横向拖拽平滑切换。
- **自定义壁纸上传**：支持上传本地图片（PNG / JPG / WebP）与动态视频（MP4 / WebM / MOV）。
- **IndexedDB 持久化存储**：用户上传的大体积视频/图片壁纸自动保存在浏览器本地 IndexedDB 中，启动即刻秒开，不占用额外服务器带宽。

### 3. 全局参数实时调节
在设置面板中可直接滑块调节光学参数，实时生效并持久化：
- 折射率（IOR）、透镜曲率、色散分离、倒角厚度、透镜模糊度；
- 弹窗虚化半径（`modalBlur` 0 ~ 60px）、遮罩暗化度（`l3MaskOpacity` 0.00 ~ 0.90）；
- 手势水波振幅、背景流体流动速度与波纹强度。

---

## 安装与使用

### 方式一：在本地 profiles 中引入（推荐）

1. 将本仓库 clone 到本地，例如 `C:/plugins/deepseek-harness-liquid-glass`。
2. 打开你使用的 profile 配置文件（如 `~/.dsh/profiles/web/package.json`）。
3. 在 `dependencies` 中添加本地文件引用：

```json
{
  "dependencies": {
    "@deepseek-ai/dsh-client-ui-liquid-glass": "file:/path/to/deepseek-harness-liquid-glass"
  },
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-client-ui-liquid-glass"
      ]
    }
  }
}
```

4. 启动 DeepSeek Harness 即可生效：
```bash
dsh --profile web
```

---

### 方式二：直接从 GitHub 引用

在 profile 的 `package.json` 中配置：

```json
{
  "dependencies": {
    "@deepseek-ai/dsh-client-ui-liquid-glass": "github:Rainpomelo/deepseek-harness-liquid-glass-theme"
  }
}
```

---

## 配置与控制

启动 DeepSeek Harness 后：
1. 点击左下角 **「设置」** -> 进入 **「通用设置」**；
2. 找到 **「分级液态玻璃与动态壁纸」** 控制行：
   - **壁纸选择**：可直接在「内置推荐」中滑动挑选，或点击「+ 添加壁纸」上传自定义视频/图片；
   - **Layer 2 (二层悬浮液态透镜)**：调节输入框透镜的折射率、曲率及倒角高光；
   - **Layer 3 (三层弹窗玻璃)**：调节弹窗开启时的背景虚化模糊度与暗化遮罩深度；
   - **保存与读取预设**：可将当前的光学参数组合一键保存至本地。

---

## 核心参数对照表

| 参数名称 | 默认值 | 调节范围 | 说明 |
| :--- | :--- | :--- | :--- |
| **折射率 (IOR)** | `1.30` | `0.80 ~ 2.40` | 斯涅尔光学折射强度 |
| **透镜曲率 (Bulge)** | `1.80` | `-1.50 ~ 2.50` | 凸透镜/凹透镜视差位移倍数 |
| **色散分离 (Dispersion)** | `0.035` | `0.00 ~ 0.10` | 边缘 RGB 彩虹分离度 |
| **倒角宽度 (Bevel)** | `0.015` | `0.005 ~ 0.10` | 透镜边缘切角反光宽度 |
| **高光强度 (Rim Intensity)** | `0.45` | `0.00 ~ 1.00` | 135° 顶光边缘高光反射亮度 |
| **手势水波 (Ripple Amp)** | `0.30` | `0.00 ~ 1.00` | 鼠标点击时的水面涟漪幅度 |
| **弹窗虚化 (Modal Blur)** | `24px` | `0 ~ 60px` | 弹窗打开时底层画面的高斯模糊半径 |
| **遮罩暗化 (Mask Opacity)** | `0.75` | `0.00 ~ 0.90` | 弹窗遮罩层的深色对比度 |

---

## 目录结构

```text
├── src/
│   ├── client/
│   │   ├── glass-shader.ts        # WebGL 物理透镜 Fragment/Vertex Shader 核心引擎
│   │   ├── glass-ambient.ts       # 底层 Canvas 动态环境渲染器
│   │   ├── theme-layer.ts         # 主题 Token 覆盖与 DOM 运行时图层管理
│   │   ├── wallpaper-storage.ts   # IndexedDB 壁纸与视频离线存储
│   │   ├── LiquidGlassControls.tsx# 设置面板阻尼滑动与调节控件
│   │   └── liquid-glass.module.css# 多层光学穿透样式与动画
├── lib/                           # tsdown 构建后的浏览器端 ESM/CJS 产物
├── package.json
└── README.md
```

---

## 开源协议

[MIT License](LICENSE)
