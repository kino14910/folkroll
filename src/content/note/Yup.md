---
title: 'Yup'
description: 'Yup对象schema验证库'
pubDate: 'Feb 01 2024'
---

**Yup** 是一个用于 **JavaScript 和 TypeScript 的轻量级、可扩展的对象 schema 验证库**，主要用于**表单验证**（如用户注册、登录、设置等场景）。它由 **Jason Quense**（React Final Form 的作者）开发，因其简洁的链式 API 和与 React 生态的良好集成而广受欢迎。

------

## 🧩 核心特点

| 特性                   | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| ✅ **声明式验证**       | 用链式方法定义字段规则（如 `.required()`, `.email()`, `.min(6)`） |
| ✅ **异步验证支持**     | 支持 `validate()` 返回 Promise，适合检查用户名是否已存在等场景 |
| ✅ **类型安全（TS）**   | 完整的 TypeScript 支持，自动推导验证后数据的类型             |
| ✅ **轻量**             | 仅 ~10KB（gzip），无依赖                                     |
| ✅ **与主流表单库集成** | 官方支持 **Formik**，社区广泛用于 **React Hook Form**, **Zod**（对比见下文） |

------

## 🚀 基本用法示例

### 1. 安装

```bash
npm install yup
# 或
yarn add yup
```

### 2. 定义 Schema（验证规则）

```js
import * as yup from 'yup';

// 定义用户注册表单的验证规则
const userSchema = yup.object({
  name: yup.string().required('姓名必填'),
  email: yup.string().email('邮箱格式无效').required('邮箱必填'),
  password: yup
    .string()
    .min(8, '密码至少8位')
    .matches(/[a-zA-Z]/, '密码需包含字母')
    .matches(/\d/, '密码需包含数字')
    .required('密码必填'),
  age: yup.number().positive().integer().min(13, '需年满13岁'),
});
```

### 3. 手动验证数据

```js
const userData = {
  name: '张三',
  email: 'invalid-email',
  password: '123',
  age: 10,
};

userSchema
  .validate(userData, { abortEarly: false }) // abortEarly: false → 返回所有错误
  .then(validData => {
    console.log('验证通过:', validData);
  })
  .catch(err => {
    console.log('验证失败:', err.errors); 
    // 输出: ['邮箱格式无效', '密码至少8位', '密码需包含字母', '需年满13岁']
  });
```

------

## 🤝 与 React 表单库集成（以 Formik 为例）

Yup 是 **Formik 的官方推荐验证方案**：

```jsx
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

function LoginForm() {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema, // ← 直接传入 Yup schema
    onSubmit: (values) => {
      console.log(values); // 验证通过后的数据
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email && <div>{formik.errors.email}</div>}

      <input
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password && <div>{formik.errors.password}</div>}

      <button type="submit">登录</button>
    </form>
  );
}
```

> 💡 **React Hook Form 用户**：虽然 RHF 默认推荐 [Zod](https://zod.dev/)，但也可通过 [`@hookform/resolvers`](https://github.com/react-hook-form/resolvers) 使用 Yup：
>
> ```js
> import { yupResolver } from '@hookform/resolvers/yup';
> const { register, handleSubmit, formState: { errors } } = useForm({
>   resolver: yupResolver(validationSchema)
> });
> ```

------

## 🔍 Yup vs Zod（当前热门对比）

| 特性         | **Yup**                         | **Zod**                                |
| ------------ | ------------------------------- | -------------------------------------- |
| **定位**     | 专注**运行时验证**              | 运行时验证 + **类型推导**（更强调 TS） |
| **性能**     | 快                              | 极快（内部优化更好）                   |
| **API 风格** | 链式方法（`.string().email()`） | 函数式（`z.string().email()`）         |
| **异步验证** | 原生支持                        | 原生支持                               |
| **社区生态** | Formik 深度集成                 | React Hook Form 官方推荐               |
| **学习曲线** | 简单直观                        | 略陡峭（概念更多）                     |

> ✅ **选型建议**：
>
> - 用 **Formik** → 选 **Yup**
> - 用 **React Hook Form** → 优先 **Zod**，但 Yup 也可用
> - 纯 TS 项目追求极致类型安全 → **Zod**

------

## ⚠️ 注意事项

1. **默认只返回第一个错误**
   设置 `{ abortEarly: false }` 获取所有字段错误：

   ```js
   schema.validate(data, { abortEarly: false });
   ```

2. **转换数据类型**
   Yup 会尝试转换类型（如字符串 `"123"` → 数字 `123`），可通过 `.strict()` 禁用：

   ```js
   yup.number().strict(); // "123" 将验证失败
   ```

3. **自定义验证规则**
   使用 `.test()` 添加自定义逻辑：

   ```js
   yup.string().test('is-adult', '需年满18岁', value => {
     return new Date().getFullYear() - parseInt(value) >= 18;
   });
   ```

------

## ✅ 总结

- **Yup 是什么？** → 一个用于 **对象 schema 验证** 的 JS/TS 库。
- **主要用途？** → **表单验证**（前端/后端均可）。
- **核心优势？** → 简洁 API、异步支持、与 Formik 无缝集成。
- **需要替代品吗？** → 如果你用 React Hook Form，可考虑 Zod；否则 Yup 仍是可靠选择。

> 📦 官网：https://github.com/jquense/yup
> 📚 中文文档（社区）：https://www.npmjs.com/package/yup