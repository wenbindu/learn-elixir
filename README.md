# BEAM Path

一套中文 Erlang + Elixir 交互式学习教程。它把两门语言放在同一条 BEAM / OTP
学习路径中，通过双语代码、可运行实验、故障注入、自测与综合项目，帮助学习者建立可用于真实系统的心智模型。

## 已包含

- 12 个模块、46 个学习检查点，覆盖零基础、语言基础、并发、OTP、监督树、容量、分布式与互操作
- 首页三条学习入口，以及可搜索、可筛选的完整课程地图
- Elixir / Erlang 双栏代码与每章一组可复制到 IEx / erl 的真实实验
- “故意弄坏”、实验能证明 / 不能证明什么、快速自测、四级提示和验收标准
- 浏览器端进度记录，以及带 schema 版本的 JSON 导入 / 导出
- Hex、HexDocs、Elixir Forum、Erlang Forums、官方安装 / 下载页等资源导航
- 深蓝背景的原创 Elixir 相关品牌图标、Chrome favicon 与 PWA manifest

教学方法参考
[kimi-k3-learn](https://github.com/ViffyGwaanl/kimi-k3-learn)，实现采用章节路由，
没有复制其单 HTML 架构或 Kimi 主题内容。

## 本地运行

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

打开终端输出的本地地址。

## 校验

```bash
npm run build
npm test
npm run lint
```

测试会验证首页服务端渲染、用户要求的资源链接、课程深链接、完整章节模板与品牌图标资产。

## 主要目录

```text
app/
  components/              课程地图、进度、自测、代码复制、并发模拟器
  learn/[slug]/page.tsx    课程模块路由
  course-data.ts           12 个模块与资源导航数据
  page.tsx                 首页
  globals.css              响应式设计系统
public/
  brand-icon.png           原始品牌图标
  favicon.ico              Chrome favicon
tests/
  rendered-html.test.mjs   SSR 与需求回归测试
```

## 关于浏览器实验

首页的 mailbox 组件明确是语义模拟器，并不声称在浏览器中运行 Erlang VM。课程页面同时提供可复制到
真实 IEx / erl 环境的命令、预期观察、故障开关与结论边界。
