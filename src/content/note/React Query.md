---
title: 'React Query'
description: 'React Query数据获取和状态管理库'
pubDate: 'Jan 25 2024'
---

**React Query**（现在官方名称为 **TanStack Query**）是一个用于 **数据获取（data fetching）和状态管理** 的强大 React 库。它的核心目标是：**简化服务端状态（server state）的管理**，让你无需手动编写大量样板代码来处理加载、错误、缓存、同步等问题。

------

## 🔍 为什么需要 React Query？

在传统 React 应用中，如果你要从 API 获取数据，通常需要：

- 使用 `useState` 管理 `data`、`loading`、`error`
- 在 `useEffect` 中发起请求
- 手动处理重复请求、缓存、后台刷新、乐观更新等

而 **React Query 自动帮你处理这些**，让你专注于业务逻辑。

------

## ✅ 核心功能

1. **自动缓存**：相同查询不会重复请求（可配置）
2. **后台自动刷新**：组件重新聚焦时自动更新数据
3. **分页/无限滚动支持**
4. **突变（Mutation）**：安全地处理创建、更新、删除操作
5. **乐观更新 & 回滚**
6. **与 TypeScript 深度集成**
7. **开箱即用的加载/错误状态**

------

## 🧩 基本用法

### 第一步：安装

```bash
npm install @tanstack/react-query
# 或
yarn add @tanstack/react-query
```

### 第二步：设置 Provider

在应用根部包裹 `QueryClientProvider`：

```jsx
// main.jsx 或 App.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```

------

### 第三步：使用 `useQuery`（获取数据）

```jsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'], // 唯一标识该查询
    queryFn: () => axios.get('/api/todos').then(res => res.data),
  });

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>出错了：{error.message}</div>;

  return (
    <ul>
      {data.map(todo => <li key={todo.id}>{todo.title}</li>)}
    </ul>
  );
}
```

> 💡 `queryKey` 是 React Query 的核心：它决定了缓存是否命中。数组形式支持动态参数，如 `['todos', userId]`。

------

### 第四步：使用 `useMutation`（修改数据）

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

function AddTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo) => axios.post('/api/todos', newTodo),
    onSuccess: () => {
      // 成功后，让相关查询失效，触发重新获取
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.todo.value;
    mutation.mutate({ title });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="todo" />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? '提交中...' : '添加'}
      </button>
    </form>
  );
}
```

------

## 🎯 适用场景

- 从 REST API / GraphQL 获取数据
- 表单提交、点赞、删除等写操作
- 需要自动刷新、轮询、分页的场景
- 替代手动管理 `useState + useEffect` 的数据请求逻辑