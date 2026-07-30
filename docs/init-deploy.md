# BEAM Path 初始化部署指南

本文说明如何将 BEAM Path 从本地仓库推送到 GitHub、导入 Vercel、完成首次部署，
以及配置自定义域名。推荐的顺序是：

1. 本地检查
2. 推送 GitHub
3. 从 GitHub 导入 Vercel Project
4. 验证 Vercel 默认地址
5. 添加自定义域名并配置 DNS
6. 设置正式网站地址并重新部署
7. 后续通过 Git 推送自动发布

## 1. 部署前检查

项目要求 Node.js `22.x`。先在项目目录确认本地版本和 Git 状态：

```bash
cd ~/dean/learn-elixir

node --version
git status
git remote -v
```

当前仓库约定：

```text
Git remote: origin
GitHub repository: git@github.com:wenbindu/learn-elixir.git
Production branch: main
```

本地启动并检查页面：

```bash
./scripts/start-local.sh start
./scripts/start-local.sh status
```

访问 <http://127.0.0.1:3000>，检查首页、课程页面、左上角品牌图标和 favicon。
检查完成后停止开发服务器，再执行完整校验：

```bash
./scripts/start-local.sh stop
npm test
npm run lint
```

## 2. 推送到 GitHub

第一次推送 `main`：

```bash
git push -u origin main
```

`-u` 会建立本地 `main` 与远端 `origin/main` 的跟踪关系。以后在 `main` 上更新时，
只需运行：

```bash
git push
```

推送完成后，打开 GitHub 仓库并确认最新提交、项目文件和 `main` 分支都存在：

<https://github.com/wenbindu/learn-elixir>

如果出现 `Permission denied (publickey)`，先检查 GitHub SSH 登录：

```bash
ssh -T git@github.com
```

如果出现 `non-fast-forward`，不要直接使用 `--force`。先检查远端是否已有不属于
本地历史的提交，再决定合并或变基方式。

参考：[GitHub — Pushing commits to a remote repository](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository)

## 3. 创建 Vercel Project

打开 <https://vercel.com/new>，使用 GitHub 登录并执行以下操作：

1. 授权 Vercel 访问 `wenbindu/learn-elixir`。
2. 找到该仓库并点击 **Import**。
3. 创建一个 Vercel Project，例如命名为 `beam-path`。
4. 保持原生 Next.js 配置，不要添加自定义输出目录。

推荐配置：

| 配置项 | 值 |
| --- | --- |
| Project Name | `beam-path`，也可以使用 `learn-elixir` |
| Framework Preset | `Next.js` |
| Root Directory | `./` |
| Production Branch | `main` |
| Node.js Version | `22.x` |
| Install Command | 默认，不覆盖 |
| Build Command | 默认，不覆盖 |
| Output Directory | 默认，不覆盖 |

### Vercel 部署入口

这个项目没有需要手动指定的单一入口文件。Vercel 从仓库根目录的
[`package.json`](../package.json) 识别 Next.js，并调用其中的生产构建命令：

```json
{
  "scripts": {
    "build": "next build"
  }
}
```

Next.js App Router 再根据 `app/` 目录生成页面：

| 文件 | 作用 |
| --- | --- |
| [`app/layout.tsx`](../app/layout.tsx) | 全站根布局和 metadata |
| [`app/page.tsx`](../app/page.tsx) | 网站首页 `/` |
| [`app/learn/[slug]/page.tsx`](../app/learn/[slug]/page.tsx) | 课程页面 `/learn/:slug` |
| [`app/manifest.ts`](../app/manifest.ts) | PWA manifest |

因此 Vercel 中只需将 **Root Directory** 设为 `./`，并让 Framework Preset、Build
Command 和 Output Directory 保持默认。`.next/` 是构建过程中生成的内部目录，
不需要提交，也不要把它配置成 Output Directory。

[`scripts/start-local.sh`](../scripts/start-local.sh) 只负责本地开发，不是 Vercel
部署入口，Vercel 不会调用它。

项目当前不需要必填环境变量，也不需要 `vercel.json`。点击 **Deploy** 完成第一次部署。

GitHub 与 Vercel 连接后：

- 推送到 `main` 会创建 Production Deployment。
- 推送到其他分支或创建 Pull Request 会创建 Preview Deployment。
- 自定义域名默认指向最新的 Production Deployment。

参考：[Vercel — Deploying Git Repositories](https://vercel.com/docs/git)

## 4. 验证第一次部署

第一次部署完成后，Vercel 会分配一个 `*.vercel.app` 地址，例如：

```text
https://beam-path.vercel.app
```

绑定正式域名前，先检查：

- 首页能够打开。
- `/learn/install-toolchain`、`/learn/start-line` 等课程深链接能够直接访问。
- 左上角品牌图标和 Chrome favicon 正常。
- Elixir Install 与 Erlang/OTP Downloads 等外部资源链接正确。
- 手机和桌面尺寸下没有明显布局问题。

如果检查失败，先在 Vercel Deployment 页面查看 **Build Logs**，不要急着配置域名。

## 5. 添加自定义域名

确认 `vercel.app` 地址正常后，进入：

```text
Vercel Project
→ Settings
→ Domains
→ Add Domain
```

可以使用：

- 主域名，例如 `example.com`
- 子域名，例如 `elixir.example.com`

如果该域名上已经运行其他网站，推荐先使用独立子域名。

添加域名后，Vercel 会显示当前项目需要的准确 DNS 记录：

| 域名类型 | 常见 DNS 类型 | 主机名示例 |
| --- | --- | --- |
| 主域名 `example.com` | `A` | `@` |
| 子域名 `elixir.example.com` | `CNAME` | `elixir` |
| `www.example.com` | `CNAME` | `www` |

在域名注册商或当前 DNS 服务商后台添加 Vercel 显示的记录。不要复制其他项目的
IP 或 CNAME；应以 Vercel Domains 页面或 `domains inspect` 的实际结果为准。

配置 DNS 时注意：

- 删除同一主机名下冲突的旧 `A`、`AAAA` 或 `CNAME` 记录。
- 不要删除邮件使用的 `MX`、SPF、DKIM 或其他无关 TXT 记录。
- TTL 使用默认值或 Auto 即可。
- 如果域名被另一个 Vercel 账号使用，按提示添加 TXT 记录验证所有权。
- DNS 验证成功后，Vercel 会自动申请并维护 HTTPS 证书。

如果同时添加 `example.com` 和 `www.example.com`，选择一个作为主域名，并在
Vercel Domains 设置中将另一个重定向到主域名。

参考：

- [Vercel — Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain)
- [Vercel — Working with SSL certificates](https://vercel.com/docs/domains/working-with-ssl)

## 6. 设置正式网站地址

域名验证成功后，进入：

```text
Vercel Project
→ Settings
→ Environment Variables
```

添加以下生产环境变量：

```text
Name: NEXT_PUBLIC_SITE_URL
Value: https://你的正式域名
Environment: Production
```

例如：

```text
NEXT_PUBLIC_SITE_URL=https://elixir.example.com
```

这个变量不是站点启动的必需项，但建议在正式环境配置，使 Open Graph 等元数据使用
最终域名。环境变量只会应用到新部署；添加或修改后，需要在 **Deployments** 页面
重新部署最新版本，或产生一次新的 `main` 部署。

参考：[Vercel — Environment Variables](https://vercel.com/docs/environment-variables)

## 7. 后续日常发布

### 直接更新 `main`

适合个人维护和低风险修改：

```bash
cd ~/dean/learn-elixir

./scripts/start-local.sh start

# 修改并在浏览器中检查

./scripts/start-local.sh stop
npm test
npm run lint

git add -A
git commit -m "描述本次修改"
git push
```

推送完成后，Vercel 会自动构建 Production Deployment，并将正式域名切换到新版本。

### 使用分支和 Preview Deployment

正式站点上线后，更推荐先用分支：

```bash
git switch -c feature/course-update

# 修改并测试

git add -A
git commit -m "Update course content"
git push -u origin feature/course-update
```

Vercel 会为该分支生成独立的 Preview 地址。确认无误后，在 GitHub 创建 Pull Request
并合并到 `main`，Vercel 再自动发布到生产环境。

## 8. 可选：使用 Vercel CLI

不需要全局安装 Vercel CLI，可以使用 `npx`：

```bash
npx vercel@latest login
npx vercel@latest link
```

如果已经通过网页导入 GitHub 仓库，执行 `link` 时应选择现有的 Vercel Project，
不要重复创建项目。`.vercel/` 只保存本机项目关联信息，已经被 `.gitignore` 忽略。

手动创建 Preview Deployment：

```bash
npx vercel@latest deploy
```

手动创建 Production Deployment：

```bash
npx vercel@latest deploy --prod
```

检查域名需要的 DNS 配置：

```bash
npx vercel@latest domains inspect example.com
```

添加域名到项目：

```bash
npx vercel@latest domains add example.com beam-path
```

如果域名使用外部 DNS 服务商，应在该服务商后台添加记录；只有域名使用 Vercel
Nameservers 时，才通过 `vercel dns` 管理记录。

参考：[Vercel CLI](https://vercel.com/docs/cli)

## 9. 最终检查清单

- [ ] 本地 `npm test` 和 `npm run lint` 通过
- [ ] `main` 已推送到 GitHub
- [ ] Vercel Project 已从正确的 GitHub 仓库导入
- [ ] Framework Preset 是 Next.js
- [ ] Root Directory 是 `./`
- [ ] Production Branch 是 `main`
- [ ] `vercel.app` 地址验证通过
- [ ] 自定义域名已经添加到正确的 Project
- [ ] DNS 记录与 Vercel 显示的值完全一致
- [ ] 域名状态有效且 HTTPS 证书已签发
- [ ] `NEXT_PUBLIC_SITE_URL` 指向正式域名
- [ ] 设置环境变量后已完成新的 Production Deployment
