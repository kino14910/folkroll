---
title: 'React Learning'
description: 'Notes for React'
pubDate: 'Jan 08 2026'
---

## 面试

### 对React的理解及其核心特性有哪些？

React是由Meta（前Facebook）开发的用于构建用户界面的JavaScript库，它采用组件化设计将UI拆分为独立可复用的块以提升开发效率，利用虚拟DOM和Diff算法最小化真实DOM操作从而优化性能，并遵循单向数据流确保数据从父到子流动的可预测性；同时它支持JSX语法让开发者能在JavaScript中直观描述UI结构，结合声明式编程与函数式概念，通过类组件的render方法或函数组件的return语句高效渲染界面，并在底层通过合成事件机制统一处理交互以平衡性能与内存消耗。

### 什么是虚拟DOM？为什么它能提高性能？

虚拟DOM是React维护的轻量级JavaScript对象，代表真实DOM结构，当状态变化时，React先更新虚拟DOM并计算差异，再批量应用到真实DOM，从而避免频繁操作真实DOM，显著提升渲染性能。

### React类组件和函数组件的区别？Hooks的作用是什么？

React类组件使用ES6类定义并依赖render方法，而函数组件通过return直接返回UI，Hooks（如useState和useEffect）则让函数组件具备状态管理和副作用处理能力，使代码更简洁且支持逻辑复用。

### 解释useEffect的依赖数组的作用，不同依赖数组的写法会有什么区别？

useEffect的依赖数组控制副作用执行时机：空数组[]仅在组件挂载和卸载时触发，无依赖数组则每次渲染后都执行，包含变量的数组[variable]则当变量变化时才执行，确保副作用与状态变化精准同步。

### 为什么在列表渲染时需要使用key？如果不使用key会有什么问题？

在列表渲染中必须使用key属性，它帮助React高效识别元素身份并优化Diff算法，避免key会导致性能下降、状态错乱或组件重新挂载，影响用户体验。

### React Hooks的使用规则有哪些？为什么必须遵循这些规则？

React Hooks必须遵循两条规则：仅在函数组件顶层调用且不能在循环或条件中使用，以及仅在函数组件内使用，这确保了Hooks调用顺序一致，防止状态与组件错位。

### React常见的性能优化方法有哪些？

React性能优化常见方法包括：使用React.memo缓存组件避免重复渲染、useMemo缓存计算结果、useCallback缓存函数引用、通过React.lazy实现代码分割，以及避免在渲染中执行高开销操作。

### React Router v6中如何实现嵌套路由和路由鉴权（登录守卫）？

React Router v6实现嵌套路由时，父路由通过Outlet渲染子路由内容，例如在Dashboard路由下配置settings和profile子路由；路由鉴权通过PrivateRoute组件实现，检查认证状态后重定向未登录用户，例如使用Navigate跳转至登录页。

### useEffect中的异步

在useEffect中使用AbortController添加防竞态（避免组件卸载后 setState）

```javascript
useEffect(() => {
  const abortController = new AbortController()

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data', {
        signal: abortController.signal, // 关联信号
      })
      const result = await response.json()
      setData(result)
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Fetch error:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  fetchData()

  // cleanup：取消请求
  return () => {
    abortController.abort()
  }
}, [])
```

### 使用memo缓存组件

memo是一个缓存函数子组件的高阶组件，useMemo是缓存对象或数组等引用会改变的变量，useCallback是缓存函数。
当使用memo来缓存组件时，如果而父组件传递的 props 中包含对象、数组或函数，就必须在父组件中对改变的props使用useMemo或useCallback来稳定引用。

### react更新机制

当组件的state或props发生变化时，进入render阶段，该组件及其子组件都会重新执行，生成新的react element tree。随后进入reconciliation（协调）阶段，将react element tree与current fiber进行深度优先对比，构建一棵 work-in-progress（WIP） Fiber 树，核心是通过 type 和 key 决定 Fiber 节点能否复用：若匹配，则复用旧 Fiber、更新 props 并继续协调子组件；若不同，则标记旧Fiber节点为Deletion并创建新节点。此阶段是可中断的，React 会收集所有 DOM 变更（增、删、改）并打上对应的 effectTag（Update/Deletion/Placement），最终生成带有副作用标记的 WIP 树，供 commit 阶段统一批量更新真实 DOM。

### useEffect 回调函数的生命周期

useEffect 回调在每次渲染时都会重新创建并通过闭包捕获当前变量，React 通过浅比较依赖数组决定是否复用旧 effect 或激活新 effect；在浏览器绘制完成后，React 会异步先执行旧 cleanup 再运行新回调并保存新的 cleanup，组件卸载时则执行最后一次清理，因此必须将回调中引用的变量加入依赖数组以避免闭包陷阱，确保 effect 始终使用最新的状态值。

### 对Next.js的理解及其核心特性有哪些？

Next.js是由Vercel开发的基于React的全栈框架，它通过App Router文件系统路由机制将URL结构与目录结构直接映射，默认采用服务器组件（Server Components）在服务端渲染以减少客户端JavaScript体积并提升首屏性能，同时支持流式渲染和局部更新；它利用布局（Layout）系统实现嵌套UI的持久化与状态保留，通过加载（Loading）和错误（Error）边界文件提供细粒度的异步状态管理，并内置图像优化、字体优化及中间件（Middleware）等功能，实现了从数据获取到最终渲染的全链路性能优化与开发体验统一。

### Next.js中App Router与Pages Router的主要区别是什么？

App Router是Next.js 13+引入的新一代路由系统，它基于React服务器组件构建，采用`app`目录并通过`page.js`、`layout.js`等约定文件定义路由，支持嵌套布局、并行路由和拦截路由，且数据获取直接在组件内异步执行；而Pages Router是传统方案，基于`pages`目录，每个文件即路由，主要依赖`getServerSideProps`等数据获取方法，缺乏原生的嵌套布局支持和服务器组件的细粒度控制，目前新项目默认推荐使用App Router以获得更好的性能与架构灵活性。

### 什么是React服务器组件（RSC）？它在Next.js中有什么优势？

React服务器组件是允许组件仅在服务器端渲染而不发送JavaScript代码到客户端的特性，在Next.js中默认启用，其优势在于能直接访问后端数据库或文件系统无需额外API层，显著减少客户端Bundle大小从而加快加载速度，并能自动保持数据新鲜度，同时通过与客户端组件（使用'use client'指令）的无缝混用，既保留了服务端性能又兼顾了浏览器的交互能力。

### Next.js如何实现数据获取？有哪些推荐模式？

在Next.js App Router中，推荐直接在服务器组件内使用原生async/await进行数据获取，框架会自动处理请求去重和缓存，支持静态生成（默认）和动态渲染（通过export dynamic或cookies等动态API）；对于客户端数据需求，可使用React Server Actions在表单提交或服务端操作中直接调用服务器函数，或利用SWR、TanStack Query等库在客户端组件中处理实时数据，这种模式消除了传统`getServerSideProps`的样板代码，使数据逻辑更贴近组件本身。

### Next.js中的布局（Layout）和模板（Template）有什么区别？

布局（Layout）是在导航过程中保持状态且不会重新渲染的共享UI容器，适用于侧边栏、导航栏等需要保留用户输入或播放器状态的场景，它通过`layout.js`定义并包裹子路由；而模板（Template）则是每次导航时都会重新挂载和销毁的特殊布局，适用于需要为每个页面执行独立初始化动画或重置状态的场景，通过`template.js`定义，两者均支持嵌套但生命周期行为不同，需根据是否需要跨页面状态保持来选择。

### 如何在Next.js中实现中间件（Middleware）及其应用场景？

Next.js中间件是基于Edge Runtime运行的代码，在请求到达页面之前执行，主要用于身份验证、地理定位重定向、A/B测试、机器人防护及Header修改等场景；它通过`middleware.ts`文件定义，利用`NextResponse`进行重写、重定向或修改响应头，由于运行在边缘节点而非源服务器，能以极低延迟处理全局逻辑，是构建安全且高性能全栈应用的关键防线。

### Next.js如何进行性能优化？

Next.js通过多种机制优化性能：利用服务器组件减少客户端JS体积，通过图像组件（next/image）自动实现懒加载、格式转换（WebP/AVIF）和尺寸适配，使用字体组件（next/font）消除布局偏移并托管字体，借助脚本组件（next/script）策略性加载第三方脚本，以及通过静态生成（SSG）和增量静态再生（ISR）预渲染页面内容，结合边缘缓存和流式渲染技术，确保应用在首屏速度、交互响应及SEO表现上达到最优。

## React Router v6 中的 `action` 详解

在 React Router v6 中，`action` 是一个**处理表单提交的核心机制**，它允许你在不刷新页面的情况下处理表单数据（如登录、注册、更新等）。这是 React Router v6 **相比 v5 最重要的改进之一**。

---

### 📌 核心概念

| 概念                  | 说明                                               |
| --------------------- | -------------------------------------------------- |
| **`action`**          | 一个**函数**，用于处理表单提交（`<Form>` 组件）    |
| **`useActionData()`** | 一个 **Hook**，用于从 `action` 中获取返回的数据    |
| **`redirect`**        | 用于重定向的工具函数（从 `react-router-dom` 导入） |

---

### ✅ 为什么需要 `action`？

在传统 React 应用中，表单提交需要：

1. 用 `fetch` 或 `axios` 发送请求
2. 处理响应
3. 手动重定向

React Router v6 的 `action` **自动处理了这些步骤**，让你专注于业务逻辑。

---

### 🔧 基本使用流程

#### 1. 定义路由（包含 `action`）

```jsx
// routes.js
import { createBrowserRouter, redirect } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    action: async ({ request }) => {
      // 处理表单提交
      const formData = await request.formData()
      const email = formData.get('email')
      const password = formData.get('password')

      // 模拟 API 调用
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        return { error: 'Invalid credentials' }
      }

      // 成功时重定向
      return redirect('/dashboard')
    },
  },
])
```

#### 2. 创建表单组件（使用 `<Form>`）

```jsx
// components/LoginPage.jsx
import { Form } from 'react-router-dom'

export default function LoginPage() {
  return (
    <Form method='post' action='/login'>
      <input type='email' name='email' placeholder='Email' required />
      <input type='password' name='password' placeholder='Password' required />
      <button type='submit'>Login</button>
    </Form>
  )
}
```

#### 3. 获取 `action` 返回的数据（使用 `useActionData`）

```jsx
// components/LoginPage.jsx
import { useActionData } from 'react-router-dom'

export default function LoginPage() {
  const actionData = useActionData()

  return (
    <div>
      {actionData?.error && (
        <div style={{ color: 'red' }}>{actionData.error}</div>
      )}

      <Form method='post' action='/login'>
        {/* 表单内容 */}
      </Form>
    </div>
  )
}
```

---

### 📝 `action` 函数详解

#### 📌 参数：`{ request, params, context }`

| 参数      | 说明                                                       |
| --------- | ---------------------------------------------------------- |
| `request` | `Request` 对象，包含表单数据（通过 `formData()` 获取）     |
| `params`  | 路由参数（如 `:userId`）                                   |
| `context` | 由 `createBrowserRouter` 的 `context` 选项提供（高级用法） |

#### 📌 返回值

| 类型           | 说明                          | 示例                                      |
| -------------- | ----------------------------- | ----------------------------------------- |
| **`Response`** | 任何响应对象（如 `redirect`） | `return redirect("/dashboard")`           |
| **`Object`**   | 用于显示错误或状态            | `return { error: "Invalid credentials" }` |

---

### 💡 关键注意事项

#### ✅ 1. `action` **必须是异步函数**

```js
// 正确
action: async ({ request }) => { ... }

// 错误（会报错）
action: ({ request }) => { ... }
```

#### ✅ 2. 表单必须指定 `action` 属性

```jsx
<Form method="post" action="/login"> {/* 必须指定 */}
```

#### ✅ 3. `action` 返回的错误会通过 `useActionData` 传递

```jsx
// 在 action 中返回错误
return { error: 'Email is required' }

// 在组件中获取
const actionData = useActionData()
// actionData.error === "Email is required"
```

#### ✅ 4. 使用 `redirect` 重定向

```js
import { redirect } from 'react-router-dom'

return redirect('/dashboard')
```

---

### 🌐 完整示例：用户注册

#### 1. 路由配置

```jsx
// routes.js
import { createBrowserRouter, redirect } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/register',
    element: <RegisterPage />,
    action: async ({ request }) => {
      const formData = await request.formData()
      const name = formData.get('name')
      const email = formData.get('email')
      const password = formData.get('password')

      // 验证
      if (!name || !email || !password) {
        return { error: 'All fields are required' }
      }

      // 模拟 API
      await new Promise(resolve => setTimeout(resolve, 500))

      // 成功注册
      return redirect('/login')
    },
  },
])
```

#### 2. 注册表单

```jsx
// components/RegisterPage.jsx
import { Form, useActionData } from 'react-router-dom'

export default function RegisterPage() {
  const actionData = useActionData()

  return (
    <div>
      {actionData?.error && (
        <div style={{ color: 'red' }}>{actionData.error}</div>
      )}

      <Form method='post' action='/register'>
        <input type='text' name='name' placeholder='Full Name' required />
        <input type='email' name='email' placeholder='Email' required />
        <input
          type='password'
          name='password'
          placeholder='Password'
          required
        />
        <button type='submit'>Register</button>
      </Form>
    </div>
  )
}
```

---

### 🚫 常见错误与解决方案

| 错误                                                       | 原因                     | 解决方案                                          |
| ---------------------------------------------------------- | ------------------------ | ------------------------------------------------- |
| `Action must be a function`                                | 没有使用 `async`         | 在 `action` 前加 `async`                          |
| `Cannot read properties of undefined (reading 'formData')` | 没有使用 `method="post"` | 确保表单有 `method="post"`                        |
| 重定向不生效                                               | 没有使用 `redirect`      | 用 `return redirect("/success")`                  |
| 错误不显示                                                 | 没有使用 `useActionData` | 在组件中添加 `const actionData = useActionData()` |

---

### 📚 与 `loader` 的对比

| 特性         | `loader`           | `action`          |
| ------------ | ------------------ | ----------------- |
| **用途**     | 页面加载时获取数据 | 表单提交处理      |
| **触发时机** | 页面加载时         | 表单提交时        |
| **返回值**   | 数据对象           | 重定向或错误对象  |
| **Hook**     | `useLoaderData()`  | `useActionData()` |

---

### 💡 最佳实践

1. **始终使用 `async`**：`action` 必须是异步函数
2. **验证在 `action` 中**：不要在表单组件中做复杂验证
3. **使用 `redirect`**：成功时重定向，避免页面刷新
4. **处理错误**：返回 `error` 对象，用 `useActionData` 显示
5. **避免直接操作 DOM**：通过 `action` 返回数据，组件通过 `useActionData` 更新状态

---

### ✅ 为什么 React Router v6 用 `action` 而不是 `onSubmit`？

在 React Router v5 中，你必须手动处理表单提交：

```jsx
// React Router v5 方式（复杂）
const handleSubmit = async e => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const response = await fetch('/login', { method: 'POST', body: formData })
  if (response.ok) {
    navigate('/dashboard')
  } else {
    setError('Invalid credentials')
  }
}

return <form onSubmit={handleSubmit}>...</form>
```

**React Router v6 的 `action` 简化了这个流程**，让你的代码更清晰、更符合 React 的数据流理念。

---

### 🌟 总结

| 项目                       | 说明                                     |
| -------------------------- | ---------------------------------------- |
| **`action` 是什么**        | 处理表单提交的函数                       |
| **`useActionData` 是什么** | 获取 `action` 返回数据的 Hook            |
| **关键点**                 | 必须是 `async`，返回 `redirect` 或对象   |
| **最佳实践**               | 在 `action` 中验证，用 `redirect` 重定向 |

## `useFetcher` 详解 —— React Router v6 的“隐形表单处理器”

`useFetcher` 是 **React Router v6 中最强大但常被忽视的 Hook**。它让你能在**不导航、不刷新页面**的情况下，触发路由的 `loader` 或 `action`，特别适合处理**局部交互**（如点赞、购物车更新、搜索建议等）。

---

### 🎯 核心价值：为什么需要 `useFetcher`？

| 场景           | 传统做法                | `useFetcher` 做法                |
| -------------- | ----------------------- | -------------------------------- |
| **点赞按钮**   | 手动 `fetch` + 更新状态 | 直接调用 `fetcher.submit()`      |
| **搜索建议**   | 手动监听输入 + `fetch`  | 自动关联到路由的 `loader`        |
| **购物车更新** | 手动同步状态            | 触发 `action` 后自动刷新相关数据 |

> 💡 **关键优势**：
>
> - 自动复用已有的 `loader`/`action` 逻辑
> - 内置加载状态管理（`fetcher.state`）
> - 支持 optimistic UI（乐观更新）
> - 与 React Router 的缓存机制无缝集成

---

### 🔧 基本用法

#### 1. 创建 fetcher

```jsx
import { useFetcher } from 'react-router-dom'

function LikeButton({ postId }) {
  const fetcher = useFetcher()

  return (
    <button
      onClick={() =>
        fetcher.submit({ postId }, { method: 'post', action: '/like' })
      }
      disabled={fetcher.state !== 'idle'}
    >
      {fetcher.state === 'submitting' ? 'Liking...' : 'Like'}
    </button>
  )
}
```

#### 2. 定义对应的 action

```js
// 路由配置
{
  path: "/like",
  action: async ({ request }) => {
    const formData = await request.formData();
    const postId = formData.get("postId");

    // 处理点赞逻辑
    await likePost(postId);

    // 返回成功状态（可选）
    return { success: true };
  }
}
```

---

### 📊 `fetcher` 对象的属性

| 属性         | 类型                                  | 说明                          |
| ------------ | ------------------------------------- | ----------------------------- |
| `state`      | `'idle' \| 'submitting' \| 'loading'` | 当前状态                      |
| `data`       | `any`                                 | `action` 或 `load` 返回的数据 |
| `formData`   | `FormData \| null`                    | 提交的表单数据                |
| `json`       | `Object \| null`                      | 如果提交的是 JSON 数据        |
| `text`       | `string \| null`                      | 如果提交的是文本              |
| `formMethod` | `'get' \| 'post'`                     | 表单方法                      |
| `formAction` | `string`                              | 表单 action 路径              |

---

### 🌟 5 种典型使用场景

#### 场景 1️⃣：局部表单提交（不导航）

```jsx
// 搜索框（不跳转到搜索结果页）
function SearchBox() {
  const fetcher = useFetcher();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        name="q"
        onChange={(e) => {
          fetcher.submit(
            { q: e.target.value },
            { method: 'get', action: '/search-suggestions' }
          );
        }}
      />
      {fetcher.data?.suggestions && (
        <ul>
          {fetcher.data.suggestions.map(s => <li key={s}>{s}</li>)}
        </ul>
      )}
    </form>
  );
}

// 对应的 loader
{
  path: "/search-suggestions",
  loader: async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const suggestions = await getSearchSuggestions(q);
    return { suggestions };
  }
}
```

#### 场景 2️⃣：乐观更新（Optimistic UI）

```jsx
function TodoItem({ todo }) {
  const fetcher = useFetcher()
  const isOptimistic = fetcher.formData?.get('id') === todo.id
  const isChecked = isOptimistic
    ? fetcher.formData?.get('completed') === 'true'
    : todo.completed

  return (
    <div>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={e => {
          fetcher.submit(
            {
              id: todo.id,
              completed: e.target.checked.toString(),
            },
            {
              method: 'post',
              action: '/toggle-todo',
              encType: 'application/json', // 发送 JSON
            },
          )
        }}
      />
      <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
    </div>
  )
}
```

#### 场景 3️⃣：轮询数据（Polling）

```jsx
function StockPrice({ symbol }) {
  const fetcher = useFetcher();

  useEffect(() => {
    const interval = setInterval(() => {
      if (fetcher.state === 'idle') {
        fetcher.load(`/stock-price?symbol=${symbol}`);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div>
      Current price: {fetcher.data?.price || 'Loading...'}
    </div>
  );
}

// 对应的 loader
{
  path: "/stock-price",
  loader: async ({ request }) => {
    const url = new URL(request.url);
    const symbol = url.searchParams.get("symbol");
    const price = await getStockPrice(symbol);
    return { price };
  }
}
```

#### 场景 4️⃣：文件上传

```jsx
function AvatarUpload() {
  const fetcher = useFetcher()

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        fetcher.submit(formData, {
          method: 'post',
          action: '/upload-avatar',
        })
      }}
    >
      <input type='file' name='avatar' required />
      <button type='submit' disabled={fetcher.state !== 'idle'}>
        {fetcher.state === 'submitting' ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  )
}
```

#### 场景 5️⃣：批量操作

```jsx
function TodoList({ todos }) {
  const fetcher = useFetcher()

  const handleCompleteAll = () => {
    const completedIds = todos.filter(t => !t.completed).map(t => t.id)

    fetcher.submit(
      { ids: completedIds },
      {
        method: 'post',
        action: '/complete-all',
        encType: 'application/json',
      },
    )
  }

  return (
    <div>
      <button onClick={handleCompleteAll}>Complete All</button>
      {/* Todo items */}
    </div>
  )
}
```

---

### ⚙️ 高级技巧

#### 1. 发送 JSON 数据（而不是 FormData）

```js
fetcher.submit(
  { key: 'value' },
  {
    method: 'post',
    action: '/api',
    encType: 'application/json', // 关键！
  },
)
```

#### 2. 取消正在进行的请求

```js
useEffect(() => {
  return () => {
    if (fetcher.state !== 'idle') {
      // 注意：React Router 不直接提供取消方法
      // 但你可以通过 AbortController 实现
    }
  }
}, [])
```

#### 3. 与 `useLoaderData` 结合

```jsx
// 在同一个组件中同时使用
function Dashboard() {
  const initialData = useLoaderData() // 页面初始数据
  const fetcher = useFetcher() // 用于局部更新

  // fetcher.data 会覆盖 initialData 的部分字段
}
```

---

### 🆚 `useFetcher` vs `useSubmit`

| 特性         | `useFetcher`             | `useSubmit`              |
| ------------ | ------------------------ | ------------------------ |
| **用途**     | 局部交互（不导航）       | 全局表单提交（可能导航） |
| **状态管理** | 内置 `state`/`data`      | 无状态，只触发提交       |
| **返回数据** | 通过 `fetcher.data` 获取 | 需要配合 `useActionData` |
| **适用场景** | 按钮、搜索框、轮询       | 登录表单、注册表单       |

> ✅ **简单规则**：
>
> - 需要**局部更新** → 用 `useFetcher`
> - 需要**页面跳转** → 用 `<Form>` + `action` 或 `useSubmit`

---

### ⚠️ 常见陷阱

#### ❌ 陷阱 1：忘记检查 `fetcher.state`

```jsx
// 错误：用户可以快速点击多次
<button onClick={() => fetcher.submit(...)}>Like</button>

// 正确：禁用按钮
<button
  onClick={() => fetcher.submit(...)}
  disabled={fetcher.state !== 'idle'}
>
  Like
</button>
```

#### ❌ 陷阱 2：在 `useEffect` 中无限循环

```jsx
// 错误：每次 render 都会触发
useEffect(() => {
  fetcher.load('/data')
}, []) // 即使有依赖数组，也可能有问题

// 正确：只在特定条件下触发
useEffect(() => {
  if (shouldReload) {
    fetcher.load('/data')
  }
}, [shouldReload])
```

#### ❌ 陷阱 3：混淆 `fetcher.submit` 和 `fetcher.load`

- `fetcher.submit()` → 触发 `action`
- `fetcher.load()` → 触发 `loader`

---

### 📚 最佳实践

1. **命名清晰**：为不同的 fetcher 使用有意义的变量名

   ```js
   const likeFetcher = useFetcher()
   const searchFetcher = useFetcher()
   ```

2. **错误处理**：检查 `fetcher.data` 中的错误

   ```js
   {
     fetcher.data?.error && <div>Error: {fetcher.data.error}</div>
   }
   ```

3. **避免过度使用**：简单的本地状态不需要 `useFetcher`

4. **利用缓存**：React Router 会缓存 `loader` 结果，减少重复请求

---

### 💡 总结

| 问题                           | `useFetcher` 解决方案                |
| ------------------------------ | ------------------------------------ |
| 如何在不导航的情况下提交表单？ | `fetcher.submit()`                   |
| 如何实现搜索建议？             | `fetcher.submit()` + `loader`        |
| 如何做乐观更新？               | 利用 `fetcher.formData` 显示临时状态 |
| 如何轮询数据？                 | `fetcher.load()` + `setInterval`     |
| 如何处理文件上传？             | `fetcher.submit(formData)`           |
