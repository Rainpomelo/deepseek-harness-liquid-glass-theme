# DeepSeek Harness - 液态玻璃与动态壁纸主题 安装配置指南

---

## 环境要求

- Node.js `>= 18.0.0`
- pnpm `>= 8.0.0`
- DeepSeek Harness CLI 或 Web 运行环境

---

## 本地安装步骤

### 1. 配置 Profile 依赖

打开你的 Web profile 配置文件（例如 `~/.dsh/profiles/web/package.json` 或 `C:\Users\<用户名>\.dsh\profiles\web\package.json`），在 `dependencies` 与 `dsh.profile.bundles` 中引入本插件路径：

```json
{
  "name": "dsh-profile-web",
  "private": true,
  "dependencies": {
    "@deepseek-ai/dsh-client-ui-liquid-glass": "file:C:/path/to/dsh-liquid-glass-theme"
  },
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "@deepseek-ai/dsh-client-ui-liquid-glass"
      ]
    }
  }
}
```

> 提示：在 Windows 环境下填写路径时，请使用正斜杠 `/`。

---

### 2. 安装并启动

在 profile 所在目录执行：

```bash
cd C:\Users\<用户名>\.dsh\profiles\web
pnpm install
```

启动 DeepSeek Harness：

```bash
dsh --profile web
```

---

## 界面与参数调节

1. 打开左下角 **「设置」** -> **「通用设置」**；
2. 在 **「分级液态玻璃与动态壁纸」** 面板中可直接调节：
   - **推荐壁纸与本地上传**：横向滑动选择 9 款内置壁纸，或点击添加本地图片/视频；
   - **Layer 2 (悬浮液态透镜)**：调节输入框透镜折射率（IOR）、曲率、倒角宽度；
   - **Layer 3 (模态弹窗玻璃)**：调节弹窗展开时底层高斯模糊半径与遮罩暗化深度；
   - **预设管理**：点击「保存当前预设」将当前光学参数存至本地。

---

## 常见问题

- **界面样式未更新**：按 `Ctrl + F5` 强制刷新浏览器缓存，并确认后台 node 进程已重启。
- **源码修改后重新编译**：若修改了 `src/` 下的代码，在插件根目录运行 `node build.mjs` 即可重新生成 `lib/` 产物（`lib/client.js` 与 `lib/index.js` 都是必需的）。
  - 本项目用 esbuild 构建。**不要用 `tsdown`**：它既不是本项目的依赖，早期文档里提到的 `npx tsdown` 会从网上拉一个无关的包，产出错误或不完整的 `lib/`。
  - 构建脚本不做类型检查；如需检查类型，另行安装 TypeScript 并运行 `tsc --noEmit`（本仓库目前未随包发布类型声明）。

