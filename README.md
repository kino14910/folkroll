# Folkroll

<div align="center">

  **Kino's Blog**

  A personal blog built with Astro, Svelte and TypeScript

  [![Astro](https://img.shields.io/badge/Astro-5.17.1-FF5D01?style=flat&logo=astro)](https://astro.build/) [![Svelte](https://img.shields.io/badge/Svelte-5.53.7-FF3E00?style=flat&logo=svelte)](https://svelte.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

</div>

## 📝 简介

Folkroll 是一个现代化的个人博客网站，使用 Astro、Svelte 和 TypeScript 构建。它提供了优雅的界面和流畅的用户体验，用于分享技术笔记、游戏心得和个人见解。

## ✨ 特性

- 🚀 基于 Astro 框架构建，提供出色的性能
- 🎨 使用 Svelte 组件实现丰富的交互效果
- 📝 支持 Markdown 和 MDX 格式的博客文章
- 🌙 内置深色/浅色主题切换
- 📱 完全响应式设计，适配各种设备
- 🎭 精美的动画效果和过渡
- 🏷️ 支持文章标签分类
- 📅 自动生成 RSS 订阅源
- 🔍 SEO 优化，包含站点地图

## 🛠️ 技术栈

- **框架**: Astro 5.17.1
- **UI 组件**: Svelte 5.53.7
- **语言**: TypeScript 5.9.3
- **内容管理**: Astro Content Collections
- **样式**: CSS + 自定义主题系统
- **动画**: Lenis (平滑滚动)
- **图片处理**: Sharp

## 📁 项目结构

```
folkroll/
├── public/              # 静态资源
│   ├── assets/         # 公共资源
│   ├── favicon.ico     # 网站图标
│   └── fonts/          # 字体文件
├── src/
│   ├── assets/         # 项目资源
│   ├── components/     # Svelte 和 Astro 组件
│   ├── content/        # Markdown/MDX 内容
│   │   ├── blog/       # 博客文章
│   │   └── note/       # 笔记
│   ├── layouts/        # 页面布局
│   ├── pages/          # 页面路由
│   └── styles/         # 全局样式
├── astro.config.mjs    # Astro 配置
├── svelte.config.js    # Svelte 配置
└── tsconfig.json       # TypeScript 配置
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:4321](http://localhost:4321) 查看网站

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📝 内容管理

### 博客文章

在 `src/content/blog/` 目录下创建 Markdown 或 MDX 文件：

```markdown
---
title: "文章标题"
description: "文章描述"
pubDate: 2024-01-01
updatedDate: 2024-01-02
heroImage: ./cover.jpg
---

文章内容...
```

### 笔记

在 `src/content/note/` 目录下创建 Markdown 或 MDX 文件：

```markdown
---
title: "笔记标题"
description: "笔记描述"
pubDate: 2024-01-01
tags: ["标签1", "标签2"]
---

笔记内容...
```

## 🎨 自定义主题

可以通过修改 `src/styles/global.css` 来自定义网站的主题颜色和样式。

## 📄 许可证

MIT License

## 👤 作者

Kino - [GitHub](https://github.com/yourusername)

---

<div align="center">
  Made with ❤️ by Kino
</div>
