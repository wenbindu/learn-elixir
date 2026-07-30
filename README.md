# BEAM Path

一套中文 Erlang + Elixir 交互式学习教程。它把两门语言放在同一条 BEAM / OTP
学习路径中，通过双语代码、可运行实验、故障注入、自测与综合项目，帮助学习者建立可用于真实系统的心智模型。

## 已包含

- 12 个模块、46 个学习检查点，覆盖零基础、语言基础、并发、OTP、监督树、容量、分布式与互操作
- 首页三条学习入口，以及可搜索、可筛选的完整课程地图
- Elixir / Erlang 双栏代码与每章一组可复制到 IEx / erl 的真实实验
- 独立的 Elixir 在线 Playground，内置管道、模式匹配与进程消息练习
- 可搜索的 Elixir + Erlang 关键字字典，区分严格保留字、特殊形式、宏与声明
- 独立的关联资源目录，资源从一份易维护的 Markdown 配置自动生成
- 全站统一可读字号层级，并接入 Vercel Analytics 与 Speed Insights
- “故意弄坏”、实验能证明 / 不能证明什么、快速自测、四级提示和验收标准
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

资源的唯一配置文件是 [`content/resources.md`](content/resources.md)。站点的
[`/resources`](http://127.0.0.1:3000/resources) 页面与首页常用入口都从这里读取，
不需要再修改 React 代码。

最常用的操作，是在对应的 `## 分类` 下增加一行：

```md
- [资源名称](https://example.com/) — 一句简短的中文用途说明。
```

例如本项目中的 Elixir School 中文站：

```md
- [Elixir School 中文](https://elixirschool.com/zh-hans/) — 适合补充中文语法解释与专题阅读。
```

需要调整卡片短名称、色彩或将资源放到首页时，可以紧跟在资源下增加可选元数据：

```md
- [资源名称](https://example.com/) — 一句简短的中文用途说明。
  - short: 卡片短名称
  - accent: elixir
  - featured: true
```

- `short`：首页卡片的短名称；省略时使用完整资源名。
- `accent`：可选 `elixir`、`erlang`、`beam`、`tool`；省略时自动推断。
- `featured`：设为 `true` 才显示在首页“常用入口”；普通资源无需填写。

分类顺序就是页面顺序。构建时会检查 URL、重复链接、空描述和未知元数据，并给出具体
行号；保存后刷新本地页面即可看到更新。提交到 GitHub 后，Vercel 会随下一次部署读取
新配置。

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

测试会验证首页服务端渲染、独立资源目录、关键字完整清单、课程深链接、
完整章节模板与品牌图标资产。

## 主要目录

```text
app/
  components/              课程地图、进度、自测、代码复制、并发模拟器
  learn/[slug]/page.tsx    课程模块路由
  keywords/page.tsx        Elixir + Erlang 可搜索关键字字典
  playground/page.tsx      第三方沙箱驱动的 Elixir 在线练习
  resources/page.tsx       Markdown 驱动的关联资源目录
  course-data.ts           12 个课程模块数据
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
```

## 关于浏览器实验

首页的 mailbox 组件明确是语义模拟器，并不声称在浏览器中运行 Erlang VM。在线
Playground 通过 Codapi 第三方隔离沙箱执行 Elixir 小片段，不能替代完整 Mix 项目，
也不应提交密码、API Key 或未公开代码。课程页面同时提供可复制到真实 IEx / erl
环境的命令、预期观察、故障开关与结论边界。
