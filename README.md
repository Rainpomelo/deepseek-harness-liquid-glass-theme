# DeepSeek Harness - 液态玻璃与动态壁纸主题 (Liquid Glass Theme)

> **当前分支**：`v1.0.0 (Web Edition)`  
> **适用环境**：Web 浏览器端、远程 Web 访问

DeepSeek Harness 的液态玻璃与动态壁纸插件，支持动态壁纸、本地视频壁纸（MP4/WebM）、鼠标水波交互以及界面分层毛玻璃效果。

---

## 版本说明

根据运行环境分为 Web 版和桌面端适配版：

| 项目 | v1.0 (Web 版) | v2.0 (Desktop 版) |
| :--- | :--- | :--- |
| **分支 / Tag** | `v1.0-web` / `v1.0.0` | `main` / `v2.0.0` |
| **运行环境** | 纯 Web 浏览器、远程 Web 页面 | `deepseek-harness-desktop` 桌面端 |
| **壁纸存储** | 浏览器 IndexedDB | 本地目录 `~/.dsh/wallpapers/` |
| **视频加载** | 浏览器 Blob URL | 本地 HTTP 206 分片流（大视频内存占用更低） |
| **本地文件选择** | 读取文件后存入 IndexedDB | 直接拷贝本地文件路径到壁纸目录 |
| **窗口适配** | 普通网页容器 | 适配桌面端无边框窗口和标题栏拖拽区 |
| **休眠控制** | 切后台标签页自动暂停 WebGL | 窗口最小化/失焦时降低渲染帧率 |

### 1. v1.0 (Web 版)
适合在普通浏览器或远程 Web 端使用。不需要本地 Node.js 文件操作权限，自定义壁纸存在浏览器的 IndexedDB 中。

```json
"@deepseek-ai/dsh-client-ui-liquid-glass": "github:Rainpomelo/deepseek-harness-liquid-glass-theme#v1.0.0"
```

### 2. v2.0 (Desktop 版)
适合配合桌面客户端 `deepseek-harness-desktop` 使用。主要改动包括：
- 选择本地壁纸时直接复制到本地配置目录（`~/.dsh/wallpapers/`），避免 Electron 每次启动换端口导致 IndexedDB 找不到旧壁纸。
- 视频壁纸走本地分片流传输，播放 4K 或大体积视频时不会一次性把整个文件读入内存。
- 样式适配了桌面端无边框窗口和标题栏拖拽区域。

```json
"@deepseek-ai/dsh-client-ui-liquid-glass": "github:Rainpomelo/deepseek-harness-liquid-glass-theme#v2.0.0"
```

---

## 插件特性

### 1. 分层渲染
- **Layer 0（背景层）**：底层 WebGL Canvas 渲染动态壁纸、流体流动与鼠标点击产生的水波。
- **Layer 1（侧边栏与面板）**：侧边栏、详情抽屉等基础容器，提供高斯模糊与暗色底板。
- **Layer 2（输入框与卡片）**：对话输入框、会话卡片与操作按钮，在 WebGL Shader 中计算折射、色散、曲率与边缘高光。
- **Layer 3（弹窗与下拉菜单）**：设置面板或弹窗打开时，底层画面虚化，弹窗本身使用半透明毛玻璃样式。

### 2. 壁纸支持
- **内置壁纸**：自带 6 款预设壁纸。
- **自定义壁纸**：支持上传图片（PNG / JPG / WebP）与视频（MP4 / WebM / MOV）。
- **本地存储**：自定义壁纸保存在本地，不需要重复通过网络下载。

### 3. 参数调节
在设置面板中可直接调节参数：
- 折射率（IOR）、透镜曲率、色散、倒角厚度、透镜模糊度；
- 弹窗虚化半径（`modalBlur` 0 ~ 60px）、遮罩暗度（`l3MaskOpacity` 0.00 ~ 0.90）；
- 鼠标水波振幅、背景流体流动速度与波纹强度。

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
