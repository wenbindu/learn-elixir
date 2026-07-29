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

## 部署到自己的域名

推荐链路：

```text
浏览器 → Nginx（80 / 443）→ BEAM Path（127.0.0.1:3000）
```

生产环境使用 `npm run build` 和 `npm run start`，不要使用带热更新的
`npm run dev`。项目是服务端渲染应用，不是把 `out/` 目录交给 Nginx 的纯静态站点。

### 1. 提交到 GitHub

先在 GitHub 创建一个空仓库，再在本项目目录执行：

```bash
git add .
git commit -m "Prepare BEAM Path for production"
git remote add origin git@github.com:YOUR_ACCOUNT/beam-path.git
git push -u origin main
```

把 `YOUR_ACCOUNT` 替换为你的 GitHub 用户名或组织名。当前仓库没有配置
`origin`，因此不会自动推送到任何 GitHub 仓库。

### 2. 在 Linux 服务器构建并启动

服务器需要 Node.js `>=22.13.0`、Git 和 npm：

```bash
git clone git@github.com:YOUR_ACCOUNT/beam-path.git /opt/beam-path
cd /opt/beam-path
./scripts/start-prod.sh --build
```

脚本会在首次运行或指定 `--build` 时安装依赖并构建，然后以前台进程启动
生产服务。默认只监听 `127.0.0.1:3000`，避免绕过 Nginx 直接暴露应用。

可通过环境变量修改监听地址和端口：

```bash
BEAM_PATH_HOST=127.0.0.1 BEAM_PATH_PORT=3000 ./scripts/start-prod.sh
```

### 3. 使用 systemd 常驻

仓库提供了
[`deploy/systemd/beam-path.service.example`](deploy/systemd/beam-path.service.example)。
先按服务器实际情况修改其中的用户和 `/opt/beam-path` 路径，然后安装：

```bash
sudo cp deploy/systemd/beam-path.service.example /etc/systemd/system/beam-path.service
sudo systemctl daemon-reload
sudo systemctl enable --now beam-path
sudo systemctl status beam-path
```

以后更新版本：

```bash
git pull --ff-only
npm ci
npm run build
sudo systemctl restart beam-path
```

### 4. 配置 Nginx

仓库提供了
[`deploy/nginx/beam-path.conf.example`](deploy/nginx/beam-path.conf.example)。
将其中的 `example.com` 替换为真实域名，再启用配置：

```bash
sudo cp deploy/nginx/beam-path.conf.example /etc/nginx/sites-available/beam-path
sudo ln -s /etc/nginx/sites-available/beam-path /etc/nginx/sites-enabled/beam-path
sudo nginx -t
sudo systemctl reload nginx
```

域名的 DNS A / AAAA 记录需要先指向服务器。确认 HTTP 可访问后，再使用服务器上的
证书工具配置 HTTPS。

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
