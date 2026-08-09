# 职业头像 Midjourney Prompt 合集

> 目标：15 个职业头像，风格统一，适合儿童职业启蒙产品
> 工具：Midjourney v6.1

---

## 🚀 快速开始（3 步走）

```
Step 1: 从下方"先锋组"中选 1 个 prompt 跑 4 张，挑最满意的那张
Step 2: 右键复制图片链接 → 作为 --sref，锁定 --seed
Step 3: 用带 sref+seed 的模板批量跑剩余 14 个
```

---

## 一、先锋组（先跑这 3 个，选出风格锚点）

### 航天员

```
Cute anime-style character portrait of a young Chinese astronaut, wearing a white spacesuit with blue trim stripes and Chinese flag patch, helmet tucked under one arm, warm friendly smile, confident bright eyes, front-facing half-body shot --ar 1:1 --style raw --s 200 --v 6.1
```

### 医生

```
Cute anime-style character portrait of a young Chinese doctor, wearing a white medical coat with stethoscope around neck, a small red cross badge, warm reassuring smile, gentle eyes, front-facing half-body shot --ar 1:1 --style raw --s 200 --v 6.1
```

### 教师

```
Cute anime-style character portrait of a young Chinese teacher, wearing a warm beige blazer over white shirt, round glasses, holding a book gently, kind motherly smile, front-facing half-body shot --ar 1:1 --style raw --s 200 --v 6.1
```

> ⚠️ **跑完先锋组后**：选出最满意的一张 → 获取 Job ID 或图片 URL → 进入第二步

---

## 二、锁定风格后 — 批量模板

选出锚点图后，所有后续 prompt 统一加后缀：

```
--ar 1:1 --style raw --s 200 --v 6.1 --sref <锚点图URL> --seed <锚点seed> --sw 80
```

| 参数 | 作用 |
|------|------|
| `--sref <URL>` | 锁定画风、配色、光影，后续图全部模仿这张 |
| `--seed <数字>` | 锁定随机种子，确保构图一致性 |
| `--sw 80` | style weight，80 是平衡值（0-1000），兼顾参考风格和当前服装差异 |

### 完整 15 个 prompt（主体部分，使用前拼接统一后缀）

| # | 职业 | 主体 Prompt |
|---|------|------------|
| 1 | 航天员 | `Cute anime-style character portrait of a young Chinese astronaut, wearing a white spacesuit with blue trim stripes and Chinese flag patch, helmet tucked under one arm, warm friendly smile, confident bright eyes, front-facing half-body shot` |
| 2 | 医生 | `Cute anime-style character portrait of a young Chinese doctor, wearing a white medical coat with stethoscope around neck, a small red cross badge, warm reassuring smile, gentle eyes, front-facing half-body shot` |
| 3 | 教师 | `Cute anime-style character portrait of a young Chinese teacher, wearing a warm beige blazer over white shirt, round glasses, holding a book gently, kind motherly smile, front-facing half-body shot` |
| 4 | 心理咨询师 | `Cute anime-style character portrait of a young Chinese therapist, wearing a soft cream cardigan over pastel inner layer, minimal accessories, calm understanding smile, warm empathetic eyes, front-facing half-body shot` |
| 5 | 艺术家 | `Cute anime-style character portrait of a young Chinese artist, wearing a paint-splattered denim apron over colorful top, a black beret, holding a paintbrush, creative free-spirited grin, sparkling eyes, front-facing half-body shot` |
| 6 | 手艺人 | `Cute anime-style character portrait of a young Chinese artisan, wearing a brown leather apron over linen shirt, holding a handcrafted ceramic teacup, earthy warm tones, humble proud smile, front-facing half-body shot` |
| 7 | 律师 | `Cute anime-style character portrait of a young Chinese lawyer, wearing a sharp dark navy suit with subtle pinstripes, white shirt, red silk tie, professional trustworthy expression, intelligent eyes, front-facing half-body shot` |
| 8 | 军人 | `Cute anime-style character portrait of a young Chinese soldier, wearing a crisp military dress uniform in dark green with gold buttons and beret, honor guard upright posture, resolute but warm smile, front-facing half-body shot` |
| 9 | 建筑师 | `Cute anime-style character portrait of a young Chinese architect, wearing a dark turtleneck under a casual blazer, holding a rolled blueprint, black frame glasses, visionary inspired smile, front-facing half-body shot` |
| 10 | 记者 | `Cute anime-style character portrait of a young Chinese journalist, wearing a practical multi-pocket vest over shirt, holding a compact microphone, alert curious expression, sharp bright eyes, front-facing half-body shot` |
| 11 | 工程师 | `Cute anime-style character portrait of a young Chinese engineer, wearing a bright orange safety vest and white hard hat with safety goggles pushed up, capable friendly grin, front-facing half-body shot` |
| 12 | 产品经理 | `Cute anime-style character portrait of a young Chinese product manager, wearing a modern tech-blue hoodie over collared shirt, holding a smartphone showing app mockups, user-empathy smile, thoughtful eyes, front-facing half-body shot` |
| 13 | 修理工 | `Cute anime-style character portrait of a young Chinese mechanic, wearing dark blue work overalls and a red cap, holding a wrench, capable dependable smile, warm eyes, front-facing half-body shot` |
| 14 | 游戏策划 | `Cute anime-style character portrait of a young Chinese game designer, wearing a graphic T-shirt with retro pixel art, gaming headset around neck, playful creative smile, imaginative sparkle in eyes, front-facing half-body shot` |
| 15 | 主持人 | `Cute anime-style character portrait of a young Chinese TV host, wearing a polished burgundy blazer over black top, holding cue cards, camera-ready warm charismatic smile, front-facing half-body shot` |

### 拼装示例（以航天员为例）

```
Cute anime-style character portrait of a young Chinese astronaut, wearing a white spacesuit with blue trim stripes and Chinese flag patch, helmet tucked under one arm, warm friendly smile, confident bright eyes, front-facing half-body shot --ar 1:1 --style raw --s 200 --v 6.1 --sref https://cdn.midjourney.com/xxxx/0_0.png --seed 123456789 --sw 80
```

---

## 三、风格一致性的 4 个保险

| 技巧 | 做法 | 效果 |
|------|------|------|
| **同 Session** | 15 个 prompt 在同一个 Discord 私信窗口里连续发 | MJ 会自动延续画风（隐性上下文） |
| **--sref 锁画风** | 锚点图 URL 贴到每个 prompt 尾部 | 配色、光影、笔触统一 |
| **--seed 锁构图** | 锚点图的 seed 值复用 | 人像大小、位置、半身裁切一致 |
| **--sw 控制参考强度** | `--sw 80` | 够像锚点，但服装特征不会被"洗掉" |

---

## 四、MJ 调参速查

| 参数 | 推荐值 | 说明 |
|------|--------|------|
| `--ar` | `1:1` | 正方形，适合头像 |
| `--style` | `raw` | 减少 MJ 自动美化，更贴近 prompt |
| `--s` | `200` | 中等风格化（默认 100），保留插画感不过度 |
| `--v` | `6.1` | 最新模型 |
| `--sw` | `80` | style reference 权重，80≈"像但有自己的特色" |
| `--cw` | `100` | character reference 权重（如使用 --cref） |

---

## 五、如果某些职业跑出来不满意

### 常见问题与修复

| 问题 | 原因 | 修复 |
|------|------|------|
| 人物不像中国人 | AI 默认偏向日系/西方面孔 | 主体前加 `young Chinese`（已在 prompt 中） |
| 服装细节丢失（如没画听诊器） | MJ 对细粒度道具识别弱 | 把道具描述移到 prompt 最前面，如 `holding a stethoscope, a young Chinese doctor...` |
| 背景太花哨，金色边框没出现 | 没描述背景所以 MJ 自由发挥 | 在主体后加 `against plain dark blue gradient background, subtle golden ring light around the portrait edge` |
| 不同职业画风不统一 | 没加 --sref | 严格按批量模板来 |
| 表情太严肃 | 措辞偏中性 | 加 `playful warm expression, eyes slightly curved like crescent moons` |

---

## 六、输出规格

| 参数 | 值 |
|------|-----|
| MJ 生成尺寸 | 1024×1024（默认） |
| 最终输出尺寸 | 512×512（Retina 够用） |
| 裁切 | 圆形，保留人像居中 |
| 格式 | WebP（quality 80%） |
| 目标大小 | 15-30 KB/张 |
| 命名规范 | `astronaut.webp` `doctor.webp` `teacher.webp` … |
| 存放路径 | `career-agent/images/` |

---

## 七、生成后批量处理

```bash
# 1. 安装工具
brew install imagemagick

# 2. 将所有 MJ 导出的 PNG 放入 images/ 目录

# 3. 批量转 WebP + 缩放到 512px
cd career-agent/images/
for f in *.png; do
  convert "$f" -resize 512x512 -quality 80 "${f%.png}.webp"
done

# 4. 如需圆形裁切（保留金色边框的前提下）
for f in *.png; do
  convert "$f" -resize 512x512 \
    \( -size 512x512 xc:none -fill white -draw "circle 256,256 256,0" \) \
    -compose copyopacity -composite -quality 80 "${f%.png}.webp"
done

# 5. 查看大小
ls -lh *.webp
```
