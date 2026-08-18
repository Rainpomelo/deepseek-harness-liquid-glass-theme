/**
 * WebGL 6.0 Multi-Tier Physical Liquid Glass Optics Engine.
 * Layer 0: Full-screen Backdrop & Fluid Flow
 * Layer 1: Left Sidebar Base Frosted Glass (16-Tap Gaussian Blur + Opacity + Border)
 * Layer 2: Multi-Lens Physical Liquid Glass System (High-Performance Real-Time Motion Tracking & Fast Clean Exit)
 */

export interface ShaderOptions {
  // Layer 1
  l1Blur: number
  modalBlur?: number
  l1Opacity: number
  l1Border: number

  // Layer 2
  ior: number
  bulge: number
  dispersion: number
  bevel: number
  lensBlur: number
  darkening: number
  rimIntensity: number
  lightAngle: number
  vibrancy: number
  rippleAmp: number
  dropShadowOpacity: number
  dropShadowBlur: number
  dropShadowY: number

  // Layer 0
  background: 'gradient' | 'wallpaper'
  wallpaper: string
  bgBlur: number
  bgLiquidEnabled: boolean
  bgLiquidAmp: number
  bgLiquidScale: number
  bgLiquidSpeed: number
  bgLiquidDispersion: number
}

export interface GlassShaderHandle {
  update: (opts: Partial<ShaderOptions>) => void
  dispose: () => void
}

const VS_SRC = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

const FS_SRC = `
  precision mediump float;

  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  
  // Layer 1: 侧边栏、模态弹窗与气泡弹出菜单几何材质
  uniform float u_sidebar_width_px;
  uniform vec4 u_modal_rect; // xy: centerPx, zw: halfPx
  uniform float u_modal_radius;
  uniform float u_modal_progress;
  uniform int u_has_modal;
  #define MAX_POPOVERS 16
  uniform vec4 u_popovers[MAX_POPOVERS]; // xy: centerPx, zw: halfPx
  uniform float u_popover_radii[MAX_POPOVERS];
  uniform int u_popover_count;
  uniform float u_l1_blur;
  uniform float u_modal_blur;
  uniform float u_l1_opacity;
  uniform float u_l1_border;

  // Layer 2: 多透镜物理液态阵列 (所有 L2 层级元素: 0=背景透镜, 1=弹窗前台透镜)
  #define MAX_LENSES 64
  uniform vec4 u_lenses[MAX_LENSES]; // xy: centerPx, zw: halfPx
  uniform float u_lens_radii[MAX_LENSES];
  uniform float u_lens_layers[MAX_LENSES];
  uniform int u_lens_count;

  uniform float u_time;
  uniform float u_ior;
  uniform float u_bulge;
  uniform float u_dispersion;
  uniform float u_bevel_width;
  uniform float u_lens_blur;
  uniform float u_darkening;
  uniform float u_rim_intensity;
  uniform float u_light_angle;
  uniform float u_vibrancy;
  uniform float u_ripple_amp;

  uniform float u_shadow_opacity;
  uniform float u_shadow_blur;
  uniform float u_shadow_offset_y;

  // Layer 0: 背景流体
  uniform int u_bg_liquid_enabled;
  uniform float u_bg_amp;
  uniform float u_bg_scale;
  uniform float u_bg_speed;
  uniform float u_bg_dispersion;

  uniform vec4 u_ripple0;
  uniform vec4 u_ripple1;

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  vec2 hash22(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float snoise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = step(a.yx, a.xy);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash22(i)), dot(b, hash22(i + o)), dot(c, hash22(i + 1.0)));
    return dot(n, vec3(70.0));
  }

  // 大尺度低频稀疏流水域翘曲
  vec2 waterStreamTurbulence(vec2 uv, float t) {
    if (u_bg_amp <= 0.0001) return vec2(0.0);
    vec2 p = uv * max(u_bg_scale, 0.1) * 1.6;
    vec2 q = vec2(
      snoise(p * 0.85 + vec2(t * 0.35, t * 0.20)),
      snoise(p * 0.85 + vec2(-t * 0.25, t * 0.30))
    );
    vec2 r = vec2(
      snoise((p + q * 0.85) * 1.5 + vec2(t * 0.45, -t * 0.40)),
      snoise((p + q * 0.85) * 1.5 + vec2(-t * 0.35, t * 0.50))
    );
    vec2 s = vec2(
      snoise((p + r * 0.60) * 2.6 + vec2(-t * 0.65, t * 0.70)),
      snoise((p + r * 0.60) * 2.6 + vec2(t * 0.70, -t * 0.60))
    );
    return (q * 0.55 + r * 0.35 + s * 0.10) * 0.055 * u_bg_amp;
  }

  // 16-Tap 真实高斯雾面毛玻璃模糊函数 (Gaussian Frosted Matte Blur)
  vec3 sampleGaussianFrosted(vec2 baseUv, float blurPx, vec2 fragCoord) {
    if (blurPx <= 0.2) {
      return texture2D(u_texture, vec2(baseUv.x, 1.0 - baseUv.y)).rgb;
    }
    vec2 step = vec2((blurPx * 3.5) / u_resolution.x, (blurPx * 3.5) / u_resolution.y);
    
    // 微表面毛玻璃微观漫散射微扰 (Micro-Roughness Diffusion)
    vec2 noise = hash22(fragCoord * 0.8) * step * 0.50;
    vec2 centerUv = baseUv + noise;

    vec3 acc = vec3(0.0);
    float totalW = 0.0;

    // 中心权重
    acc += texture2D(u_texture, vec2(centerUv.x, 1.0 - centerUv.y)).rgb * 0.2270;
    totalW += 0.2270;

    // 第 1 环 (0.38 * radius, 4 采样)
    vec2 s1 = step * 0.38;
    acc += texture2D(u_texture, vec2(centerUv.x + s1.x, 1.0 - (centerUv.y))).rgb * 0.0790;
    acc += texture2D(u_texture, vec2(centerUv.x - s1.x, 1.0 - (centerUv.y))).rgb * 0.0790;
    acc += texture2D(u_texture, vec2(centerUv.x, 1.0 - (centerUv.y + s1.y))).rgb * 0.0790;
    acc += texture2D(u_texture, vec2(centerUv.x, 1.0 - (centerUv.y - s1.y))).rgb * 0.0790;
    totalW += 0.3160;

    // 第 2 环对角 (0.75 * radius, 4 采样)
    vec2 s2 = step * 0.53;
    acc += texture2D(u_texture, vec2(centerUv.x + s2.x, 1.0 - (centerUv.y + s2.y))).rgb * 0.0700;
    acc += texture2D(u_texture, vec2(centerUv.x - s2.x, 1.0 - (centerUv.y + s2.y))).rgb * 0.0700;
    acc += texture2D(u_texture, vec2(centerUv.x - s2.x, 1.0 - (centerUv.y - s2.y))).rgb * 0.0700;
    acc += texture2D(u_texture, vec2(centerUv.x + s2.x, 1.0 - (centerUv.y - s2.y))).rgb * 0.0700;
    totalW += 0.2800;

    // 第 3 环外沿 (1.00 * radius, 4 采样)
    vec2 s3 = step * 0.92;
    acc += texture2D(u_texture, vec2(centerUv.x + s3.x * 0.924, 1.0 - (centerUv.y + s3.y * 0.383))).rgb * 0.0442;
    acc += texture2D(u_texture, vec2(centerUv.x - s3.x * 0.924, 1.0 - (centerUv.y + s3.y * 0.383))).rgb * 0.0442;
    acc += texture2D(u_texture, vec2(centerUv.x - s3.x * 0.383, 1.0 - (centerUv.y - s3.y * 0.924))).rgb * 0.0442;
    acc += texture2D(u_texture, vec2(centerUv.x + s3.x * 0.383, 1.0 - (centerUv.y - s3.y * 0.924))).rgb * 0.0442;
    totalW += 0.1770;

    return acc / totalW;
  }

  vec3 getBaseColor(vec2 uvSample, vec2 fragPxSample, int isOverModal) {
    if (isOverModal == 1) {
      vec3 modalFrosted = sampleGaussianFrosted(uvSample, u_l1_blur, fragPxSample);
      if (u_l1_opacity > 0.001) {
        modalFrosted = mix(modalFrosted, vec3(0.04, 0.07, 0.12), clamp(u_l1_opacity, 0.0, 0.95));
      }
      return modalFrosted;
    } else if (u_sidebar_width_px > 10.0 && fragPxSample.x <= u_sidebar_width_px) {
      vec3 sidebarFrosted = sampleGaussianFrosted(uvSample, u_l1_blur, fragPxSample);
      if (u_l1_opacity > 0.001) {
        sidebarFrosted = mix(sidebarFrosted, vec3(0.04, 0.07, 0.12), clamp(u_l1_opacity, 0.0, 0.95));
      }
      return sidebarFrosted;
    } else {
      return texture2D(u_texture, vec2(uvSample.x, 1.0 - uvSample.y)).rgb;
    }
  }

  vec3 calculateLensColor(vec2 center, vec2 halfSize, float radius, float d, vec2 fragPx, vec2 uv, vec2 bgFlowOffset, float progress, int isOverModal) {
    vec2 p = fragPx - center;

    // 1. 边缘法线梯度向量
    float eps = 2.0;
    vec2 grad = vec2(
      sdRoundedBox(p + vec2(eps, 0.0), halfSize, radius) - sdRoundedBox(p - vec2(eps, 0.0), halfSize, radius),
      sdRoundedBox(p + vec2(0.0, eps), halfSize, radius) - sdRoundedBox(p - vec2(0.0, eps), halfSize, radius)
    );
    float gradLen = length(grad);
    vec2 edgeDir = gradLen > 1e-4 ? grad / gradLen : vec2(0.0);

    // 2. 全域连续体积深度与透镜曲率场 (随 progress 动态物理生长与溶解折射)
    vec2 normPos = clamp(p / max(halfSize, vec2(1.0)), -1.0, 1.0);
    vec2 internalBulge = normPos * (1.0 - length(normPos) * 0.35) * 0.35 * u_bulge * progress;

    // 边缘倒角曲率折射与棱镜折射
    vec2 edgeRefract = vec2(0.0);
    float edgeSlope = 0.0;
    float bevelPx = max(u_bevel_width * u_resolution.y, 8.0);
    float tBevel = clamp(-d / bevelPx, 0.0, 1.0);
    edgeSlope = sin(tBevel * 3.14159265);
    edgeRefract = edgeDir * (edgeSlope * 0.35 + exp(-(-d) * 0.08) * 0.18) * progress;

    // 斯涅尔折射合成向量
    vec2 totalOffset = (internalBulge + edgeRefract) * max(u_ior - 1.0, 0.08) * 1.6 + bgFlowOffset;

    // 3. 手势水波动态叠加
    if (u_ripple_amp > 0.001) {
      vec2 normP = p / u_resolution.y;
      float t0 = u_time - u_ripple0.z;
      if (t0 > 0.0 && t0 < 2.5 && u_ripple0.w > 0.0) {
        float r0 = length(normP - u_ripple0.xy);
        float w0 = sin(r0 * 36.0 - t0 * 15.0) * exp(-r0 * 4.5 - t0 * 2.0);
        totalOffset += normalize(normP - u_ripple0.xy + 1e-4) * w0 * 0.035 * u_ripple0.w * u_ripple_amp * progress;
      }

      float t1 = u_time - u_ripple1.z;
      if (t1 > 0.0 && t1 < 2.5 && u_ripple1.w > 0.0) {
        float r1 = length(normP - u_ripple1.xy);
        float w1 = sin(r1 * 36.0 - t1 * 15.0) * exp(-r1 * 4.5 - t1 * 2.0);
        totalOffset += normalize(normP - u_ripple1.xy + 1e-4) * w1 * 0.035 * u_ripple1.w * u_ripple_amp * progress;
      }
    }

    // 4. RGB 色散分离采样 (折射采样源：若在弹窗上方，则折射底层的毛玻璃背景)
    float disp = u_dispersion * 3.0 * mix(0.5, 2.5, edgeSlope) * progress;
    vec2 uvR = clamp(uv + totalOffset * (1.0 - disp), 0.001, 0.999);
    vec2 uvG = clamp(uv + totalOffset, 0.001, 0.999);
    vec2 uvB = clamp(uv + totalOffset * (1.0 + disp), 0.001, 0.999);

    float cR = getBaseColor(uvR, fragPx, isOverModal).r;
    float cG = getBaseColor(uvG, fragPx, isOverModal).g;
    float cB = getBaseColor(uvB, fragPx, isOverModal).b;
    vec3 color = vec3(cR, cG, cB);

    // 5. 真实 16-Tap 高斯雾面毛玻璃模糊 (透镜内部二次雾化)
    if (u_lens_blur > 0.5) {
      vec3 frostedColor = sampleGaussianFrosted(uvG, u_lens_blur * progress, fragPx);
      float frostMix = clamp(u_lens_blur / 4.0, 0.0, 1.0) * progress;
      color = mix(color, frostedColor, frostMix);
    }

    // 6. Vibrancy 鲜艳度
    if (abs(u_vibrancy - 1.0) > 0.001) {
      float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
      color = mix(vec3(lum), color, mix(1.0, u_vibrancy, progress));
    }

    // 7. 透镜暗化遮光度
    if (u_darkening > 0.001) {
      color = mix(color, vec3(0.04, 0.07, 0.12), clamp(u_darkening * progress, 0.0, 0.85));
    }

    // 8. 3D 表面高光倒角亮边
    if (u_rim_intensity > 0.001) {
      float rad = radians(u_light_angle);
      vec2 lightDir = vec2(cos(rad), sin(rad));
      float spec = max(dot(edgeDir, lightDir), 0.0);
      float dynamicRim = pow(spec, 16.0) * 0.70 + 0.30;
      float edgeRim = smoothstep(-14.0, -1.0, d) * 0.45;
      color += vec3(0.92, 0.96, 1.0) * edgeRim * dynamicRim * u_rim_intensity * progress;
    }

    return color;
  }

  void main() {
    vec2 fragPx = gl_FragCoord.xy;
    vec2 uv = fragPx / u_resolution;

    // 计算背景流水湍流偏移
    vec2 bgFlowOffset = vec2(0.0);
    if (u_bg_liquid_enabled == 1 && u_bg_amp > 0.0001) {
      float t = u_time * u_bg_speed;
      bgFlowOffset = waterStreamTurbulence(uv, t);
    }
    vec2 finalBgUv = uv + bgFlowOffset;

    // =========================================================================
    // 0. Layer 1 气泡胶囊与弹出视窗 (具有顶层绝对优先级，直接执行 16-Tap 物理高斯雾化与基底暗化)
    // =========================================================================
    if (u_popover_count > 0) {
      for (int pIdx = 0; pIdx < MAX_POPOVERS; pIdx++) {
        if (pIdx >= u_popover_count) break;
        vec2 pCenter = u_popovers[pIdx].xy;
        vec2 pHalf = u_popovers[pIdx].zw;
        float pRadius = u_popover_radii[pIdx];
        float pDist = sdRoundedBox(fragPx - pCenter, pHalf, pRadius);
        if (pDist <= 0.0) {
          // 如果当前像素在模态弹窗内部，且这个 popover 位于底层背景，则不在此处提前 return，交给模态弹窗着色
          if (u_has_modal == 1 && u_modal_progress > 0.001) {
            float mDist = sdRoundedBox(fragPx - u_modal_rect.xy, u_modal_rect.zw, u_modal_radius);
            if (mDist <= 0.0) {
              continue;
            }
          }
          vec3 popBg = sampleGaussianFrosted(finalBgUv, max(u_l1_blur, u_modal_blur), fragPx);
          if (u_l1_opacity > 0.001) {
            popBg = mix(popBg, vec3(0.04, 0.07, 0.12), clamp(max(u_l1_opacity, 0.45), 0.0, 0.95));
          }
          if (u_l1_border > 0.001 && abs(pDist) <= 1.0) {
            float glint = smoothstep(1.0, 0.0, abs(pDist)) * u_l1_border;
            popBg = mix(popBg, vec3(0.92, 0.96, 1.0), glint);
          }
          gl_FragColor = vec4(popBg, 1.0);
          return;
        }
      }
    }

    // =========================================================================
    // 1. 分离前台透镜 (设置弹窗内部) 与 背景透镜 (底层对话框/输入框)
    // =========================================================================
    float minFgD = 10000.0;
    vec2 bestFgCenter = vec2(0.0);
    vec2 bestFgHalf = vec2(0.0);
    float bestFgRadius = 0.0;
    int hitFgLens = 0;

    float minBgD = 10000.0;
    vec2 bestBgCenter = vec2(0.0);
    vec2 bestBgHalf = vec2(0.0);
    float bestBgRadius = 0.0;
    int hitBgLens = 0;

    for (int i = 0; i < MAX_LENSES; i++) {
      if (i >= u_lens_count) break;
      vec2 c = u_lenses[i].xy;
      vec2 h = u_lenses[i].zw;
      float r = u_lens_radii[i];
      float isFg = u_lens_layers[i];
      float dist = sdRoundedBox(fragPx - c, h, r);

      if (isFg > 0.5) {
        if (dist < minFgD) {
          minFgD = dist;
          bestFgCenter = c;
          bestFgHalf = h;
          bestFgRadius = r;
        }
      } else {
        if (dist < minBgD) {
          minBgD = dist;
          bestBgCenter = c;
          bestBgHalf = h;
          bestBgRadius = r;
        }
      }
    }

    if (minFgD <= 0.0) hitFgLens = 1;
    if (minBgD <= 0.0) hitBgLens = 1;

    // 如果当前像素位于上层弹窗内部，平滑抑制底层输入框透镜的倒角亮边与多层玻璃重叠
    float inModal = 0.0;
    if (u_has_modal == 1 && u_modal_progress > 0.001) {
      float mDist = sdRoundedBox(fragPx - u_modal_rect.xy, u_modal_rect.zw, u_modal_radius);
      if (mDist <= 0.0) {
        inModal = u_modal_progress;
      }
    }

    // 计算底层背景画面 (包含底层对话框液态折射、侧边栏或全景壁纸)
    vec3 underlyingColor;
    if (hitBgLens == 1 && inModal < 0.99) {
      float lensProgress = 1.0 - inModal;
      underlyingColor = calculateLensColor(bestBgCenter, bestBgHalf, bestBgRadius, minBgD, fragPx, uv, bgFlowOffset, lensProgress, 0);
    } else {
      float shadow = 0.0;
      if (u_lens_count > 0 && u_shadow_opacity > 0.001) {
        float minShadowDist = 10000.0;
        for (int i = 0; i < MAX_LENSES; i++) {
          if (i >= u_lens_count) break;
          vec2 sCenter = u_lenses[i].xy - vec2(0.0, u_shadow_offset_y);
          vec2 sHalf = u_lenses[i].zw;
          float sRadius = u_lens_radii[i];
          float sDist = sdRoundedBox(fragPx - sCenter, sHalf, sRadius);
          minShadowDist = min(minShadowDist, sDist);
        }
        shadow = smoothstep(max(u_shadow_blur, 1.0), 0.0, minShadowDist) * u_shadow_opacity;
      }

      if (u_sidebar_width_px > 10.0 && fragPx.x <= u_sidebar_width_px) {
        vec3 sidebarBg = sampleGaussianFrosted(finalBgUv, u_l1_blur, fragPx);
        if (u_l1_opacity > 0.001) {
          sidebarBg = mix(sidebarBg, vec3(0.04, 0.07, 0.12), clamp(u_l1_opacity, 0.0, 0.95));
        }
        if (u_l1_border > 0.001) {
          float distToEdge = abs(fragPx.x - u_sidebar_width_px);
          if (distToEdge <= 2.0) {
            float glint = smoothstep(2.0, 0.0, distToEdge) * u_l1_border;
            sidebarBg = mix(sidebarBg, vec3(0.92, 0.96, 1.0), glint);
          }
        }
        underlyingColor = sidebarBg * (1.0 - shadow);
      } else {
        vec3 bg;
        if (u_bg_liquid_enabled == 1 && u_bg_dispersion > 0.0001 && u_bg_amp > 0.0001) {
          vec2 uvR = clamp(finalBgUv - bgFlowOffset * u_bg_dispersion * 10.0, 0.001, 0.999);
          vec2 uvG = clamp(finalBgUv, 0.001, 0.999);
          vec2 uvB = clamp(finalBgUv + bgFlowOffset * u_bg_dispersion * 10.0, 0.001, 0.999);
          bg = vec3(
            texture2D(u_texture, vec2(uvR.x, 1.0 - uvR.y)).r,
            texture2D(u_texture, vec2(uvG.x, 1.0 - uvG.y)).g,
            texture2D(u_texture, vec2(uvB.x, 1.0 - uvB.y)).b
          );
        } else {
          bg = texture2D(u_texture, vec2(finalBgUv.x, 1.0 - finalBgUv.y)).rgb;
        }
        underlyingColor = bg * (1.0 - shadow);
      }
    }

    // =========================================================================
    // 2. 模态对话框 (Layer 3): 纯正 DOM 物理高斯模糊已由 CSS 在 DOM 层级执行
    // Shader 仅保持底层纯净自然渲染，彻底消除着色器伪模糊噪点与色斑
    // =========================================================================

    // 3. 输出最终合成画面
    gl_FragColor = vec4(underlyingColor, 1.0);
  }
`

export function attachLiquidGlassShader(canvas: HTMLCanvasElement, currentOpts: ShaderOptions): GlassShaderHandle {
  let opts = { ...currentOpts }
  let disposed = false
  let animId = 0

  const sceneCanvas = document.createElement('canvas')
  sceneCanvas.width = 1920
  sceneCanvas.height = 1080
  const sceneCtx = sceneCanvas.getContext('2d')

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  if (!gl || !sceneCtx) {
    return {
      update: (n) => { opts = { ...opts, ...n } },
      dispose: () => {},
    }
  }

  function compileShader(type: number, src: string): WebGLShader | null {
    const s = gl!.createShader(type)
    if (!s) return null
    gl!.shaderSource(s, src)
    gl!.compileShader(s)
    return s
  }

  const vs = compileShader(gl.VERTEX_SHADER, VS_SRC)
  const fs = compileShader(gl.FRAGMENT_SHADER, FS_SRC)
  if (!vs || !fs) return { update: () => {}, dispose: () => {} }

  const prog = gl.createProgram()
  if (!prog) return { update: () => {}, dispose: () => {} }
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,  1, -1, -1,  1,
    -1,  1,  1, -1,  1,  1,
  ]), gl.STATIC_DRAW)

  const aPos = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

  const uRes = gl.getUniformLocation(prog, 'u_resolution')
  
  // Layer 1 Uniforms
  const uSidebarWidthPx = gl.getUniformLocation(prog, 'u_sidebar_width_px')
  const uModalRectLoc = gl.getUniformLocation(prog, 'u_modal_rect')
  const uModalRadiusLoc = gl.getUniformLocation(prog, 'u_modal_radius')
  const uModalProgressLoc = gl.getUniformLocation(prog, 'u_modal_progress')
  const uHasModalLoc = gl.getUniformLocation(prog, 'u_has_modal')
  const uPopoversLoc = gl.getUniformLocation(prog, 'u_popovers[0]') || gl.getUniformLocation(prog, 'u_popovers')
  const uPopoverRadiiLoc = gl.getUniformLocation(prog, 'u_popover_radii[0]') || gl.getUniformLocation(prog, 'u_popover_radii')
  const uPopoverCountLoc = gl.getUniformLocation(prog, 'u_popover_count')
  const uL1Blur = gl.getUniformLocation(prog, 'u_l1_blur')
  const uModalBlurLoc = gl.getUniformLocation(prog, 'u_modal_blur')
  const uL1Opacity = gl.getUniformLocation(prog, 'u_l1_opacity')
  const uL1Border = gl.getUniformLocation(prog, 'u_l1_border')

  // Layer 2 Multi-Lens Array Uniforms (兼容 Windows / ANGLE 驱动的 uniform array[0] 规范)
  const uLensesLoc = gl.getUniformLocation(prog, 'u_lenses[0]') || gl.getUniformLocation(prog, 'u_lenses')
  const uLensRadiiLoc = gl.getUniformLocation(prog, 'u_lens_radii[0]') || gl.getUniformLocation(prog, 'u_lens_radii')
  const uLensLayersLoc = gl.getUniformLocation(prog, 'u_lens_layers[0]') || gl.getUniformLocation(prog, 'u_lens_layers')
  const uLensCountLoc = gl.getUniformLocation(prog, 'u_lens_count')

  const uTime = gl.getUniformLocation(prog, 'u_time')
  const uIor = gl.getUniformLocation(prog, 'u_ior')
  const uBulge = gl.getUniformLocation(prog, 'u_bulge')
  const uDispersion = gl.getUniformLocation(prog, 'u_dispersion')
  const uBevel = gl.getUniformLocation(prog, 'u_bevel_width')
  const uLensBlur = gl.getUniformLocation(prog, 'u_lens_blur')
  const uDarkening = gl.getUniformLocation(prog, 'u_darkening')
  const uRimIntensity = gl.getUniformLocation(prog, 'u_rim_intensity')
  const uLightAngle = gl.getUniformLocation(prog, 'u_light_angle')
  const uVibrancy = gl.getUniformLocation(prog, 'u_vibrancy')
  const uRippleAmp = gl.getUniformLocation(prog, 'u_ripple_amp')

  const uShadowOpacity = gl.getUniformLocation(prog, 'u_shadow_opacity')
  const uShadowBlur = gl.getUniformLocation(prog, 'u_shadow_blur')
  const uShadowOffsetY = gl.getUniformLocation(prog, 'u_shadow_offset_y')

  // Layer 0 Uniforms
  const uBgLiquidEnabled = gl.getUniformLocation(prog, 'u_bg_liquid_enabled')
  const uBgAmp = gl.getUniformLocation(prog, 'u_bg_amp')
  const uBgScale = gl.getUniformLocation(prog, 'u_bg_scale')
  const uBgSpeed = gl.getUniformLocation(prog, 'u_bg_speed')
  const uBgDispersion = gl.getUniformLocation(prog, 'u_bg_dispersion')
  const uRip0 = gl.getUniformLocation(prog, 'u_ripple0')
  const uRip1 = gl.getUniformLocation(prog, 'u_ripple1')

  let customImg: HTMLImageElement | null = null
  let customVideo: HTMLVideoElement | null = null
  let currentWallpaperUrl = ''

  function loadWallpaper(url: string) {
    if (url === currentWallpaperUrl && (customImg || customVideo)) return
    currentWallpaperUrl = url

    if (!url) {
      if (customVideo) {
        customVideo.pause()
        customVideo.removeAttribute('src')
        customVideo.load()
        customVideo = null
      }
      customImg = null
      return
    }

    const isVideo = url.startsWith('video:') || url.startsWith('data:video/') || url.match(/\.(mp4|webm|mov|mkv|avi|m4v)(\?.*)?$/i) !== null
    let cleanUrl = url.startsWith('video:') ? url.slice(6) : url
    let posterUrl = ''
    if (isVideo && cleanUrl.includes('|')) {
      const parts = cleanUrl.split('|')
      cleanUrl = parts[0]
      posterUrl = parts[1] || ''
    }

    if (isVideo) {
      // 切换视频时，若当前视频源不同，立即卸载旧视频，避免短暂闪现上一条残留视频画面
      if (customVideo && (customVideo.src !== cleanUrl && !customVideo.src.endsWith(cleanUrl) && !cleanUrl.endsWith(customVideo.src))) {
        customVideo.pause()
        customVideo.removeAttribute('src')
        customVideo.load()
        customVideo = null
      }
      if (posterUrl) {
        const pImg = new Image()
        pImg.onload = () => {
          // 仅在当前仍是对应视频时应用首帧海报
          if (currentWallpaperUrl.includes(cleanUrl)) {
            customImg = pImg
          }
        }
        pImg.src = posterUrl
      } else {
        customImg = null
      }

      if (customVideo && (customVideo.src === cleanUrl || customVideo.src.endsWith(cleanUrl) || cleanUrl.endsWith(customVideo.src))) {
        if (customVideo.paused) {
          customVideo.play().catch(() => {})
        }
        return
      }
      const nextVideo = document.createElement('video')
      nextVideo.crossOrigin = 'anonymous'
      nextVideo.autoplay = true
      nextVideo.loop = true
      nextVideo.muted = true
      nextVideo.defaultMuted = true
      nextVideo.playsInline = true
      nextVideo.setAttribute('playsinline', '')
      nextVideo.setAttribute('webkit-playsinline', '')
      nextVideo.setAttribute('muted', '')
      nextVideo.setAttribute('autoplay', '')
      nextVideo.setAttribute('loop', '')
      nextVideo.src = cleanUrl
      const tryPlay = () => {
        if (nextVideo.paused) {
          nextVideo.play().catch(() => {})
        }
      }
      nextVideo.onloadeddata = () => {
        if (customVideo && customVideo !== nextVideo) {
          customVideo.pause()
          customVideo.removeAttribute('src')
          customVideo.load()
        }
        if (currentWallpaperUrl.includes(cleanUrl)) {
          customVideo = nextVideo
          tryPlay()
        }
      }
      nextVideo.oncanplay = () => {
        if (!customVideo && currentWallpaperUrl.includes(cleanUrl)) {
          customVideo = nextVideo
        }
        tryPlay()
      }
      nextVideo.load()
      tryPlay()
    } else {
      if (customVideo) {
        customVideo.pause()
        customVideo.removeAttribute('src')
        customVideo.load()
        customVideo = null
      }
      customImg = null // 立即清空旧图，杜绝旧图残影闪烁
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        if (currentWallpaperUrl === url || currentWallpaperUrl === cleanUrl) {
          customImg = img
        }
      }
      img.src = cleanUrl
    }
  }
  if (opts.wallpaper) loadWallpaper(opts.wallpaper)

  const ripples = [
    { x: 0, y: 0, time: -10, amp: 0 },
    { x: 0, y: 0, time: -10, amp: 0 },
  ]
  let ripIdx = 0

  const onPointerDown = (e: PointerEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * (window.innerWidth / window.innerHeight)
    const y = 0.5 - e.clientY / window.innerHeight
    ripples[ripIdx] = { x, y, time: performance.now() * 0.001, amp: 1.0 }
    ripIdx = (ripIdx + 1) % 2
  }
  window.addEventListener('pointerdown', onPointerDown, { passive: true })

  function resize() {
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    gl!.viewport(0, 0, canvas.width, canvas.height)
  }
  window.addEventListener('resize', resize)
  resize()

  function drawCover(media: HTMLImageElement | HTMLVideoElement, w: number, h: number) {
    const mw = media instanceof HTMLVideoElement ? media.videoWidth : media.naturalWidth
    const mh = media instanceof HTMLVideoElement ? media.videoHeight : media.naturalHeight
    if (mw <= 0 || mh <= 0) return
    const sRatio = w / h
    const mRatio = mw / mh
    let dw = w
    let dh = h
    let dx = 0
    let dy = 0
    if (sRatio > mRatio) {
      dh = w / mRatio
      dy = (h - dh) * 0.5
    } else {
      dw = h * mRatio
      dx = (w - dw) * 0.5
    }
    sceneCtx!.drawImage(media, dx, dy, dw, dh)
  }

  function drawScene() {
    const w = sceneCanvas.width
    const h = sceneCanvas.height

    sceneCtx!.filter = opts.bgBlur > 0 ? `blur(${opts.bgBlur}px)` : 'none'

    // 1. 优先绘制选定/推荐的视频壁纸
    if (customVideo && (customVideo.readyState >= 1 || customVideo.videoWidth > 0)) {
      sceneCtx!.clearRect(0, 0, w, h)
      drawCover(customVideo, w, h)
      return
    }

    // 2. 优先绘制选定/推荐的图片壁纸（无论是「默认推荐」还是「自定义壁纸」）
    if (customImg && customImg.complete && customImg.naturalWidth > 0) {
      sceneCtx!.clearRect(0, 0, w, h)
      drawCover(customImg, w, h)
      return
    }

    // 3. 回退保底底图（极简深邃暗色渐变）
    sceneCtx!.clearRect(0, 0, w, h)
    const bg = sceneCtx!.createLinearGradient(0, 0, w, h)
    bg.addColorStop(0, '#0b0f19')
    bg.addColorStop(1, '#030712')
    sceneCtx!.fillStyle = bg
    sceneCtx!.fillRect(0, 0, w, h)
  }

  const lensBuffer = new Float32Array(64 * 4)
  const radiiBuffer = new Float32Array(64)
  const layersBuffer = new Float32Array(64)
  const popoverBuffer = new Float32Array(16 * 4)
  const popoverRadiiBuffer = new Float32Array(16)

  let currentModalProgress = 0.0
  let modalOpenStartTime = 0
  let modalCloseStartTime = 0
  let lastFrameTime = 0
  let lensScanFrameCounter = 0
  let lastModalState = -1
  let cachedLensElements: HTMLElement[] = []
  let cachedPopoverElements: HTMLElement[] = []

  function frame(now: number) {
    if (disposed) return
    try {
      const time = now * 0.001
      lastFrameTime = now
      lensScanFrameCounter++
      drawScene()

      gl!.bindTexture(gl!.TEXTURE_2D, tex)
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, sceneCanvas)

      const dpr = window.devicePixelRatio || 1
      const screenH = window.innerHeight

      // 0. 禁用 popover 扫描与 WebGL 着色，避免在菜单和按钮下方渲染粗糙的矩形遮罩
      gl!.uniform1i(uPopoverCountLoc, 0)

      // 1. 探测 Layer 1 (侧边栏) 几何尺寸与折叠状态
      const sidebarEl = document.querySelector<HTMLElement>(
        '[class*="sidebarCol"], [data-dsh-sidebar-root], [class*="SidebarRoot_root"]'
      )
      let sidebarWidthPx = 0
      let sidebarRight = 0
      let isSidebarCollapsed = false
      let isSidebarFading = false

      if (sidebarEl) {
        const sRect = sidebarEl.getBoundingClientRect()
        if (sRect.width > 0) {
          sidebarWidthPx = (sRect.left + sRect.width) * dpr
          sidebarRight = sRect.right
          if (sRect.width < 140) isSidebarCollapsed = true
        }
        const rootEl = sidebarEl.querySelector<HTMLElement>('[class*="root"]') || sidebarEl
        const classStr = typeof rootEl.className === 'string' ? rootEl.className : (typeof (rootEl.className as any)?.baseVal === 'string' ? (rootEl.className as any).baseVal : '')
        if (classStr.includes('fading') || classStr.includes('collapsed')) {
          isSidebarFading = true
        }
      }
      gl!.uniform1f(uSidebarWidthPx, sidebarWidthPx)

      // 1.1 探测 Layer 3 (仅在真实模态弹窗/设置面板打开时激活)
      const candidates = document.querySelectorAll<HTMLElement>(
        '[data-dsh-settings-modal], [data-dsh-modal-panel], [class*="dshMarketOverlayPanel"], [class*="SettingsRoot_panel"], [class*="Modal_dialog"]'
      )
      let modalEl: HTMLElement | null = null
      let maxArea = 0
      for (let i = 0; i < candidates.length; i++) {
        const el = candidates[i]
        const rect = el.getBoundingClientRect()
        if (rect.width > 100 && rect.height > 100 && rect.bottom > 0 && rect.top < screenH) {
          const area = rect.width * rect.height
          if (el.hasAttribute('data-dsh-settings-modal') || el.hasAttribute('data-dsh-modal-panel') || area > maxArea) {
            maxArea = area
            modalEl = el
            if (el.hasAttribute('data-dsh-settings-modal') || el.hasAttribute('data-dsh-modal-panel')) break
          }
        }
      }

      const isModalOpenAttr = (document.documentElement.getAttribute('data-dsh-modal-open') === 'true' || document.documentElement.getAttribute('data-dsh-settings-open') === 'true') && modalEl !== null

      let hasModal = isModalOpenAttr ? 1 : 0
      let modalCenterX = 0
      let modalCenterY = 0
      let modalHalfW = 0
      let modalHalfH = 0
      let modalRadius = 24 * dpr

      if (modalEl && modalEl.offsetWidth > 0 && modalEl.offsetHeight > 0) {
        const mRect = modalEl.getBoundingClientRect()
        const classStr = typeof modalEl.className === 'string' ? modalEl.className : (typeof (modalEl.className as any)?.baseVal === 'string' ? (modalEl.className as any).baseVal : '')
        const isClosing = modalEl.getAttribute('data-closing') === 'true' ||
          classStr.includes('closing') ||
          classStr.includes('Closing') ||
          modalEl.parentElement?.getAttribute?.('data-closing') === 'true' ||
          modalEl.parentElement?.className?.includes?.('closing') ||
          modalEl.parentElement?.className?.includes?.('Closing')

        if (mRect.width > 20 && mRect.height > 20) {
          modalCenterX = (mRect.left + mRect.width * 0.5) * dpr
          modalCenterY = (screenH - (mRect.top + mRect.height * 0.5)) * dpr
          modalHalfW = (mRect.width * 0.5) * dpr
          modalHalfH = (mRect.height * 0.5) * dpr
          modalRadius = 20 * dpr

          if (isClosing) {
            if (modalCloseStartTime === 0) {
              modalCloseStartTime = now
            }
            modalOpenStartTime = 0
            const elapsed = (now - modalCloseStartTime) / 240.0
            const t = Math.min(Math.max(elapsed, 0.0), 1.0)
            currentModalProgress = Math.pow(1.0 - t, 2.0)
            hasModal = currentModalProgress > 0.01 ? 1 : 0
          } else {
            if (modalOpenStartTime === 0) {
              modalOpenStartTime = now
            }
            modalCloseStartTime = 0
            const elapsed = (now - modalOpenStartTime) / 320.0
            const t = Math.min(Math.max(elapsed, 0.0), 1.0)
            currentModalProgress = 1.0 - Math.pow(1.0 - t, 3.5)
            hasModal = 1
          }
        }
      } else if (isModalOpenAttr) {
        hasModal = 1
        currentModalProgress = 1.0
      } else {
        modalOpenStartTime = 0
        modalCloseStartTime = 0
        currentModalProgress = 0.0
        hasModal = 0
      }

      gl!.uniform1i(uHasModalLoc, hasModal)
      gl!.uniform4f(uModalRectLoc, modalCenterX, modalCenterY, modalHalfW, modalHalfH)
      gl!.uniform1f(uModalRadiusLoc, modalRadius)
      gl!.uniform1f(uModalProgressLoc, currentModalProgress)

      gl!.uniform1f(uL1Blur, opts.l1Blur * dpr)
      gl!.uniform1f(uModalBlurLoc, (opts.modalBlur ?? 24) * dpr)
      gl!.uniform1f(uL1Opacity, opts.l1Opacity)
      gl!.uniform1f(uL1Border, opts.l1Border)

      // 2. 探测所有 Layer 2 液态透镜 (主输入框、新会话胶囊、工作区底板等物理透镜)
      const isAnimatingModal = hasModal === 1 && (currentModalProgress < 0.999 || modalCloseStartTime > 0)
      if (hasModal !== lastModalState || (!isAnimatingModal && lensScanFrameCounter % 15 === 0)) {
        lastModalState = hasModal
        cachedLensElements = Array.from(document.querySelectorAll<HTMLElement>(
          '[data-composer-card], [class*="InputTrigger_box"], [class*="ChatInput_container"], [data-dsh-inputbar] > div, [data-conversation-composer], [class*="composerCard"], button[class*="newSession"], [class*="groupSection"], [data-dsh-surface]'
        ))
      }

      let count = 0
      lensBuffer.fill(0)
      radiiBuffer.fill(0)
      layersBuffer.fill(0)

      for (let i = 0; i < cachedLensElements.length && count < 64; i++) {
        const el = cachedLensElements[i]
        if (!el || (el.offsetWidth === 0 && el.offsetHeight === 0)) continue

        // 绝不将模态弹窗内部子项作为 WebGL 液态透镜渲染
        if (el.closest('[role="dialog"], [class*="SettingsRoot_panel"], [class*="Modal_panel"], [class*="dshMarketOverlay"], [class*="RemotePanel_panel"]') !== null) {
          continue
        }

        const rect = el.getBoundingClientRect()
        if (rect.width < 14 || rect.height < 14 || rect.bottom <= 0 || rect.top >= screenH) continue

        const classStr = typeof el.className === 'string' ? el.className : (typeof (el.className as any)?.baseVal === 'string' ? (el.className as any).baseVal : '')
        const isInsideModal = hasModal === 1 && modalEl !== null && (modalEl === el || modalEl.contains(el))
        const isInsideSidebar = sidebarEl !== null && sidebarEl.contains(el)
        const isNewSessionBtn = classStr.includes('newSession')

        // 绝不将浮动菜单、下拉弹窗或其内部子项作为 Layer 2 液态透镜渲染，避免透镜变形拉伸
        const isInsideMenu = el.getAttribute('role') === 'menu' ||
          classStr.includes('menu') ||
          classStr.includes('Menu') ||
          classStr.includes('popover') ||
          classStr.includes('Popover') ||
          el.closest('[role="menu"], [class*="Menu_list"], [class*="ModelSelect_menu"], [class*="modelSelect_menu"], [class*="PopupSelectView"], [class*="popover"], [class*="Popover"], [data-radix-popper-content-wrapper]') !== null
        if (isInsideMenu) continue

        if (isInsideSidebar && !isInsideModal) {
          if (isSidebarCollapsed || isSidebarFading) {
            continue
          }

          const maxRight = sidebarRight - 4
          if (rect.left >= maxRight) continue
          const effectiveW = Math.min(rect.right, maxRight) - rect.left
          if (isNewSessionBtn && effectiveW < 32) continue
        }

        let left = rect.left
        let right = rect.right
        const top = rect.top
        const bottom = rect.bottom

        if (isInsideSidebar && !isInsideModal) {
          right = Math.min(right, sidebarRight - 4)
        }

        const w = right - left
        const h = bottom - top

        if (w > 14 && h > 14) {
          const rPx = classStr.includes('trigger') || classStr.includes('selector') || classStr.includes('choice') || classStr.includes('newSession') ? 999 : 14

          const centerX = (left + w * 0.5) * dpr
          const centerY = (screenH - (top + h * 0.5)) * dpr
          const halfW = (w * 0.5) * dpr
          const halfH = (h * 0.5) * dpr
          const radius = Math.min(rPx * dpr, halfH, halfW)

          lensBuffer[count * 4 + 0] = centerX
          lensBuffer[count * 4 + 1] = centerY
          lensBuffer[count * 4 + 2] = halfW
          lensBuffer[count * 4 + 3] = halfH
          radiiBuffer[count] = radius
          layersBuffer[count] = isInsideModal ? 1.0 : 0.0
          count++
        }
      }

      gl!.uniform4fv(uLensesLoc, lensBuffer)
      gl!.uniform1fv(uLensRadiiLoc, radiiBuffer)
      gl!.uniform1fv(uLensLayersLoc, layersBuffer)
      gl!.uniform1i(uLensCountLoc, count)

      gl!.uniform2f(uRes, canvas.width, canvas.height)
      gl!.uniform1f(uTime, time)
      gl!.uniform1f(uIor, opts.ior)
      gl!.uniform1f(uBulge, opts.bulge)
      gl!.uniform1f(uDispersion, opts.dispersion)
      gl!.uniform1f(uBevel, opts.bevel)
      gl!.uniform1f(uLensBlur, opts.lensBlur * dpr)
      gl!.uniform1f(uDarkening, opts.darkening)
      gl!.uniform1f(uRimIntensity, opts.rimIntensity)
      gl!.uniform1f(uLightAngle, opts.lightAngle)
      gl!.uniform1f(uVibrancy, opts.vibrancy)
      gl!.uniform1f(uRippleAmp, opts.rippleAmp)

      gl!.uniform1f(uShadowOpacity, opts.dropShadowOpacity)
      gl!.uniform1f(uShadowBlur, opts.dropShadowBlur * dpr)
      gl!.uniform1f(uShadowOffsetY, opts.dropShadowY * dpr)

      gl!.uniform1i(uBgLiquidEnabled, opts.bgLiquidEnabled ? 1 : 0)
      gl!.uniform1f(uBgAmp, opts.bgLiquidAmp)
      gl!.uniform1f(uBgScale, opts.bgLiquidScale)
      gl!.uniform1f(uBgSpeed, opts.bgLiquidSpeed)
      gl!.uniform1f(uBgDispersion, opts.bgLiquidDispersion)

      gl!.uniform4f(uRip0, ripples[0].x, ripples[0].y, ripples[0].time, ripples[0].amp)
      gl!.uniform4f(uRip1, ripples[1].x, ripples[1].y, ripples[1].time, ripples[1].amp)

      gl!.drawArrays(gl!.TRIANGLES, 0, 6)
    } catch (err) {
      console.error('[LiquidGlass] frame render exception:', err)
    } finally {
      if (!disposed) {
        animId = requestAnimationFrame(frame)
      }
    }
  }
  animId = requestAnimationFrame(frame)

  return {
    update: (next) => {
      opts = { ...opts, ...next }
      if (next.wallpaper !== undefined) {
        loadWallpaper(next.wallpaper)
      }
    },
    dispose: () => {
      disposed = true
      cancelAnimationFrame(animId)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', resize)
    },
  }
}
