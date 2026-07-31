# BEAM Path

一个中文 Erlang + Elixir 学习站。Elixir、Erlang 各有一条独立的零基础语法路线，
学完任意一条，再汇入 BEAM / OTP 主线。每章包含简短讲解、可运行代码和小练习。

## 已包含

- 2 条 From Scratch 路线、18 节单语基础课，从类型、集合和模式匹配讲到函数、模块与项目
- 11 站 BEAM 主线、2 站可选语言复习，共 49 个检查点；覆盖安装、并发、OTP、监督树、容量、分布式与互操作
- macOS、Linux、Windows 三套安装准备，说明 Erlang/OTP、Elixir 的顺序以及 Mix 随 Elixir 提供
- 首页按 From Scratch、进阶、高级分层，并保留可搜索、可筛选的 BEAM 课程地图
- 右上角用紧凑开关切换浅色与深色主题，并在本机保存选择
- 专门拆解 `String.trim/1`、`string:trim/1`、arity、`&1`、capture 与管道，不把缩写当作前置知识
- Elixir / Erlang 双栏代码，以及可复制到 IEx / erl 的章节实验
- 独立的 Elixir 在线 Playground，内置管道、模式匹配与进程消息练习
- 可搜索的 Elixir + Erlang 关键字字典，区分严格保留字、特殊形式、宏与声明
- 独立的关联资源目录，资源从一份易维护的 Markdown 配置自动生成
- 13 个故事桥，用历史、文学和生活场景引出抽象概念，并说明比喻边界
- 统一的字号层级，以及 Vercel Analytics 与 Speed Insights
- 故障实验、结论边界、小测、分级提示和完成自查
- 浏览器端进度记录，以及带 schema 版本的 JSON 导入 / 导出
- Hex、HexDocs、Elixir Forum、Erlang Forums、官方安装 / 下载页等资源导航
- 深蓝背景的原创 Elixir 相关品牌图标、Chrome favicon 与 PWA manifest

教学方法参考
[kimi-k3-learn](https://github.com/ViffyGwaanl/kimi-k3-learn)，实现采用章节路由，
没有复制其单 HTML 架构或 Kimi 主题内容。

## 本地运行

需要 Node.js `22.x`。开发服务器默认在后台运行：

```bash
# 启动
./scripts/start-local.sh start

# 查看状态
./scripts/start-local.sh status

# 重启
./scripts/start-local.sh restart

# 停止
./scripts/start-local.sh stop
```

不带参数运行等同于 `start`。查看实时日志：

```bash
./scripts/start-local.sh logs
```

如果希望在当前终端运行并通过 `Ctrl+C` 停止：

```bash
./scripts/start-local.sh foreground
```

脚本会在依赖缺失时自动执行 `npm ci`，随后启动带热更新的 Next.js 开发服务器。
默认地址是 <http://127.0.0.1:3000>。监听地址和端口保存在
[`config/local.env`](config/local.env)，修改后执行 `restart` 即可。

## 添加关联资源

资源只在 [`content/resources.md`](content/resources.md) 中维护。
[`/resources`](http://127.0.0.1:3000/resources) 页面和首页常用入口都读取该文件，
无需修改 React 代码。

在对应的 `## 分类` 下增加一行：

```md
- [资源名称](https://example.com/) — 一句简短的中文用途说明。
```

例如：

```md
- [Elixir School 中文](https://elixirschool.com/zh-hans/) — 用中文再听一遍 Elixir 语法、工具和常见主题。
```

如需设置短名称、色彩或首页入口，在资源下一行添加可选元数据：

```md
- [资源名称](https://example.com/) — 一句简短的中文用途说明。
  - short: 卡片短名称
  - accent: elixir
  - featured: true
```

- `short`：首页卡片的短名称；省略时使用完整资源名。
- `accent`：可选 `elixir`、`erlang`、`beam`、`tool`；省略时自动推断。
- `featured`：设为 `true` 才显示在首页“常用入口”；普通资源无需填写。

分类顺序就是页面顺序。构建会检查 URL、重复链接、空描述和未知元数据，并报告行号。
保存后刷新本地页面即可查看。提交到 GitHub 后，Vercel 会在下次部署时读取新配置。

## 部署到 Vercel

项目已经适配为 Vercel 原生 Next.js，无需 `vercel.json` 或自定义构建输出。

1. 将最新提交推送到 GitHub：

   ```bash
   git push -u origin main
   ```

2. 在 Vercel 控制台选择 **Add New → Project**，导入 GitHub 仓库。
3. 保持以下设置：

   ```text
   Framework Preset: Next.js
   Root Directory: ./
   Node.js Version: 22.x
   Build Command: 默认
   Output Directory: 默认
   ```

4. 当前站点没有必需的环境变量，直接点击 **Deploy** 即可。
5. 先使用 Vercel 自动分配的 `*.vercel.app` 地址验收；确认正常后，再到
   **Project → Settings → Domains** 添加正式域名。

Vercel 会为分支和 Pull Request 创建 Preview Deployment，`main` 分支用于生产部署。
根布局已经挂载 `@vercel/analytics` 和 `@vercel/speed-insights`；部署完成后可在
Vercel Project 的 Analytics 与 Speed Insights 页面查看数据。
如果希望 Open Graph 链接始终使用指定域名，可选地配置：

```text
NEXT_PUBLIC_SITE_URL=https://你的域名
```

### 使用 Vercel CLI

不必通过网页控制台完成所有操作。当前机器未全局安装 Vercel CLI，可以直接使用
`npx` 调用最新版：

```bash
# 登录 Vercel
npx vercel@latest login

# 创建或关联当前目录与一个 Vercel Project
npx vercel@latest link

# 创建 Preview Deployment
npx vercel@latest deploy

# 确认 Preview 正常后再发布 Production
npx vercel@latest deploy --prod
```

常用管理命令：

```bash
# 查看并同步环境变量
npx vercel@latest env ls
npx vercel@latest env pull .env.local

# 添加环境变量
npx vercel@latest env add NEXT_PUBLIC_SITE_URL production

# 添加或检查域名
npx vercel@latest domains add example.com YOUR_PROJECT_NAME
npx vercel@latest domains inspect example.com
```

`vercel link` 创建的 `.vercel/` 目录仅保存本机与 Project 的关联信息，已经加入
`.gitignore`，不会提交到 GitHub。

## 校验

```bash
npm run build
npm test
npm run lint
```

测试会验证首页服务端渲染、18 节 From Scratch 深链接、三平台安装准备、独立资源目录、
关键字完整清单、11 站主线与 2 站可选复习的故事桥、完整章节模板与品牌图标资产。

## 主要目录

```text
app/
  components/              课程地图、进度、自测、代码复制、并发模拟器
  from-scratch/            两条零基础路线的总览、单语目录与课程模板
  learn/[slug]/page.tsx    课程模块路由
  keywords/page.tsx        Elixir + Erlang 可搜索关键字字典
  playground/page.tsx      第三方沙箱驱动的 Elixir 在线练习
  resources/page.tsx       Markdown 驱动的关联资源目录
  basic-path-data.ts       Elixir / Erlang 共 18 节基础课数据
  course-data.ts           11 站主线、2 站可选复习与三平台安装数据
  resource-data.ts         资源配置解析与构建时校验
  page.tsx                 首页
  globals.css              响应式设计系统
content/
  resources.md             关联资源的唯一维护入口
public/
  brand-icon.png           原始品牌图标
  favicon.ico              Chrome favicon
config/
  local.env                本地监听地址与端口
scripts/
  start-local.sh           本地开发启动脚本
tests/
  rendered-html.test.mjs   SSR 与需求回归测试
docs/
  content-style-guide.md   面向中小学生的文案与故事桥准则
```

## 关于浏览器实验

首页 mailbox 组件是语义模拟器，不在浏览器中运行 Erlang VM。在线 Playground
通过 Codapi 第三方隔离沙箱执行 Elixir 小片段，不能替代完整 Mix 项目。请勿提交密码、
API Key 或未公开代码。课程页也提供可复制到 IEx / erl 的命令、预期结果、故障步骤和
结论边界。
