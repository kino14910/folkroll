---
title: 'GraphQL'
description: 'GraphQL核心概念和使用方法'
pubDate: 'Jan 11 2024'
---

## 🧩 **1. 核心概念**
| 术语                     | 说明                                   |
| ------------------------ | -------------------------------------- |
| **Schema（模式）**       | 定义类型、查询、变更和订阅的结构       |
| **Query（查询）**        | 获取数据（只读操作）                   |
| **Mutation（变更）**     | 修改数据（创建/更新/删除）             |
| **Subscription（订阅）** | 实时接收数据更新（通常通过 WebSocket） |
| **Resolver（解析器）**   | 服务端函数，用于返回某个字段的数据     |

---

## ✍️ **2. 基本语法**

### **查询（Query）**
```graphql
# 简单查询
query {
  user(id: "1") {
    name
    email
  }
}

# 使用别名（Alias）
query {
  admin: user(id: "1") {
    name
  }
  guest: user(id: "2") {
    name
  }
}

# 使用变量（Variables）
query GetUser($id: ID!) {
  user(id: $id) {
    name
  }
}
# 对应变量 JSON：{ "id": "1" }
```

### **变更（Mutation）**
```graphql
mutation CreatePost($title: String!) {
  createPost(title: $title) {
    id
    title
  }
}
```

### **订阅（Subscription）**
```graphql
subscription OnNewComment {
  newComment {
    id
    text
  }
}
```

---

## 🔍 **3. 参数与过滤**
```graphql
# 分页（游标式）
query {
  posts(first: 10, after: "cursor123") {
    edges {
      node { id title }
      cursor
    }
    pageInfo { hasNextPage }
  }
}

# 条件过滤
query {
  users(status: ACTIVE, role: ADMIN) {
    name
  }
}
```

---

## 🧠 **4. 片段（Fragments）——复用字段**
```graphql
fragment UserFields on User {
  id
  name
  email
}

query {
  me {
    ...UserFields
  }
  user(id: "2") {
    ...UserFields
  }
}
```

---

## ⚙️ **5. 指令（Directives）**
动态控制字段是否包含：

| 指令                          | 用途                       |
| ----------------------------- | -------------------------- |
| `@include(if: Boolean)`       | 当条件为 true 时包含该字段 |
| `@skip(if: Boolean)`          | 当条件为 true 时跳过该字段 |
| `@deprecated(reason: "说明")` | 标记字段已弃用             |

**示例：**
```graphql
query GetUser($withEmail: Boolean!) {
  user(id: "1") {
    name
    email @include(if: $withEmail)
  }
}
```

---

## 📦 **6. 模式定义语言（SDL）**
定义你的 GraphQL API 结构：

```graphql
# 类型定义
type User {
  id: ID!
  name: String!
  email: String
  posts: [Post!]!   # 非空 Post 数组
}

type Post {
  id: ID!
  title: String!
  author: User!
}

# 查询与变更入口
type Query {
  user(id: ID!): User
  posts: [Post!]!
}

type Mutation {
  createPost(title: String!): Post!
}

# 输入类型（用于 Mutation）
input CreatePostInput {
  title: String!
  authorId: ID!
}

# 枚举
enum Status {
  DRAFT
  PUBLISHED
}

# 接口（Interface）
interface Node {
  id: ID!
}

type User implements Node { ... }
type Post implements Node { ... }
```

---

## 🛠 **7. 常见模式**

### **错误处理**
- 错误信息始终在 `errors` 数组中返回（不会返回 HTTP 5xx）：
```json
{
  "errors": [
    {
      "message": "用户不存在",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["user"]
    }
  ],
  "data": { "user": null }
}
```

### **分页策略**
- **偏移分页**：`limit`, `offset`（简单但有性能问题）
- **游标分页（推荐）**：
  ```graphql
  posts(first: 10, after: "opaqueCursor") { ... }
  ```

### **文件上传**
使用 `Upload` 标量（需客户端和服务端支持）：
```graphql
mutation UploadFile($file: Upload!) {
  uploadFile(file: $file) {
    url
  }
}
```

---

## 🔒 **8. 安全最佳实践**
- **生产环境禁用内省（Introspection）**
- **限制查询深度和复杂度**，防止 DoS 攻击
- **严格校验变量输入**
- **使用持久化查询（Persisted Queries）**，避免任意请求

---

## 🧪 **9. 常用工具**
| 工具                      | 用途                              |
| ------------------------- | --------------------------------- |
| **GraphiQL / Playground** | 内置图形化 IDE（访问 `/graphql`） |
| **Apollo Studio**         | 模式管理、测试、监控              |
| **Postman**               | 支持 GraphQL 请求                 |
| **curl 示例**             |                                   |
  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    --data '{ "query": "{ user(id: \"1\") { name } }" }' \
    http://localhost:4000/graphql
  ```

---

## 💡 **高手技巧**
1. **始终使用变量**（而非内联参数），提升安全性与缓存效率。
2. **优先使用游标分页**处理大数据集。
3. **通过演进（evolution）而非版本号管理 Schema**：弃用旧字段，不删除。
4. **服务端使用 DataLoader** 批量加载数据，避免 N+1 问题。

---

> 📌 **注意**：GraphQL 是**传输协议无关**的（可运行在 HTTP、WebSocket 等之上），但**标准做法是通过 HTTP POST 发送查询**。

