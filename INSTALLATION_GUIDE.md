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
    "@deepseek-ai/dsh-client-ui-liquid-glass": "file:C:/Agent code/deepseek-harness-插件/deepseek-harness-Liquid glass-Live Wallpaper"
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
   - **推荐壁纸与本地上传**：滑动选择内置 4K 壁纸，或点击添加本地图片/视频；
   - **Layer 2 (悬浮液态透镜)**：调节输入框透镜折射率（IOR）、曲率、倒角宽度；
   - **Layer 3 (模态弹窗玻璃)**：调节弹窗展开时底层高斯模糊半径与遮罩暗化深度；
   - **预设管理**：点击「保存当前预设」将当前光学参数存至本地。

---

## 常见问题

- **界面样式未更新**：按 `Ctrl + F5` 强制刷新浏览器缓存，并确认后台 node 进程已重启。
- **源码修改后重新编译**：若修改了 `src/` 下的代码，在插件根目录运行 `npx tsdown` 即可重新生成 `lib/` 产物。

