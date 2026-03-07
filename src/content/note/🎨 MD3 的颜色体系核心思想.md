---
title: 'MD3颜色体系'
description: 'Material Design 3颜色体系核心思想'
pubDate: 'Feb 02 2024'
---

### 🎨 MD3 的颜色体系核心思想

Material 3 把颜色分成几大类，每类都有明确的“职责”，不只是为了好看，更是为了：

- **传达信息层级**（比如主按钮 vs 次要按钮）
- **表达状态**（比如错误、选中、禁用）
- **体现品牌个性**
- **保证无障碍可访问性**（对比度达标）

所有颜色都基于 **三个“强调色” + 中性色 + 辅助色** 构建。

------

## 🔑 一、三大强调色（Accent Colors）

这些是你品牌的“主角色”，用于突出重点交互元素。

| 角色                    | CSS Token                            | 用途说明                                                     | 对应内容色（文字/图标）                 |
| ----------------------- | ------------------------------------ | ------------------------------------------------------------ | --------------------------------------- |
| **Primary（主色）**     | `--md-sys-color-primary`             | 品牌主色，用于 FAB（悬浮按钮）、主要按钮、选中状态、导航栏等 | `--md-sys-color-on-primary`             |
| **Primary Container**   | `--md-sys-color-primary-container`   | 主色的弱化容器，比如卡片背景、次要按钮                       | `--md-sys-color-on-primary-container`   |
| **Secondary（次色）**   | `--md-sys-color-secondary`           | 辅助主色，用于开关、复选框、次要操作                         | `--md-sys-color-on-secondary`           |
| **Secondary Container** | `--md-sys-color-secondary-container` | 次色的容器背景                                               | `--md-sys-color-on-secondary-container` |
| **Tertiary（三色）**    | `--md-sys-color-tertiary`            | 平衡主次色，常用于输入框聚焦边框、特色元素                   | `--md-sys-color-on-tertiary`            |
| **Tertiary Container**  | `--md-sys-color-tertiary-container`  | 三色的容器                                                   | `--md-sys-color-on-tertiary-container`  |

> 💡 小知识：MD3 推荐主色用 **40 亮度（如 primary40）**，容器用 **90 亮度**，文字用 **10 或 100 亮度**，确保对比度。

------

## ⚪ 二、中性色（Neutral Colors）——界面“骨架”

用于背景、文字、分割线等，营造干净、一致的视觉基底。

| Token                               | 用途                                             |
| ----------------------------------- | ------------------------------------------------ |
| `--md-sys-color-background`         | 页面最底层背景（通常和 `surface` 相同）          |
| `--md-sys-color-surface`            | 卡片、菜单、对话框等“浮层”背景                   |
| `--md-sys-color-on-surface`         | 在 `surface` 上的文字/图标颜色（通常是深灰或黑） |
| `--md-sys-color-surface-variant`    | 变体表面（如输入框背景、列表项）                 |
| `--md-sys-color-on-surface-variant` | 在变体表面上的内容色（通常是浅灰）               |
| `--md-sys-color-outline`            | 分割线、边框（如输入框未聚焦时的边框）           |
| `--md-sys-color-outline-variant`    | 弱化边框（更浅的线）                             |

> 🌙 **暗色模式**下，`surface` 会变深，`on-surface` 会变浅，系统自动适配。

------

## ❗ 三、辅助色（Additional Color）——只有一种但超重要

| Token                               | 用途                                   |
| ----------------------------------- | -------------------------------------- |
| `--md-sys-color-error`              | 错误状态：红色提示、删除按钮、表单报错 |
| `--md-sys-color-on-error`           | 错误色上的文字（通常是白色）           |
| `--md-sys-color-error-container`    | 错误信息的背景容器                     |
| `--md-sys-color-on-error-container` | 容器上的文字                           |

------

## 🌐 四、Surface 变体（高级用法）

Material 3 引入了 **5 种 Surface 容器层级**，用于表现“高度”或“重要性”：

```css
--md-sys-color-surface-container-lowest  /* 最底层，接近 background */
--md-sys-color-surface-container-low
--md-sys-color-surface-container        /* 默认卡片层级 */
--md-sys-color-surface-container-high
--md-sys-color-surface-container-highest /* 最高层，如 Bottom Sheet */
```

它们的透明度依次增加（参考你提供的资料：Surface1~~5 对应 5%~~14% 透明度叠加在基础 surface 上）。

------

## ✅ 总结一句话：

> **Primary 是你的品牌脸面，Secondary/Tertiary 是帮手，Neutral 是舞台，Error 是警报灯。**

------

如果你正在用 Figma，强烈推荐装 **Material Theme Builder 插件**，输入一个主色，它能自动生成整套合规配色（包括深色模式）！
或者用代码库 [`material-color-utilities`](https://github.com/material-foundation/material-color-utilities) 动态生成。