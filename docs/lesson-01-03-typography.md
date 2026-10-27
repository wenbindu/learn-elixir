# 第 01–03 课布局与字体

## 范围

只整理中文 Elixir 前三课的展示。保留每课的问题、代码、结果、练习、提示、答案、元数据和进度逻辑；第 02、03 课继续使用已确认的画布结构。其他课程、深入页和全站导航不套用本次字体。

## 布局

- 页头统一为课号、课名、一个具体问题；第 01、02 课页头不再额外显示预计用时，源数据保留。
- 画布内操作区统一 24px 内边距，手机为上下 20px、左右 18px；批注画布保留各自的空间排列。
- 第 01 课保留「进入 / 退出 / 自己试试」，第 02、03 课保留「读代码 / 结果 / 只改一处」。内容不同，不强行改成同一种画布。
- 第 02 课取消固定行高，按批注内容撑开留白；箭头根据关键词的真实位置绘制，字体加载、窗口调整和切回读代码后重新定位。
- 窄画布按代码、批注顺序排版，用彩色边线与行号对应内容，取消跨区箭头。字号不靠缩小来容纳内容。
- 课末保留总结、项目贡献和学习状态，深入入口留在画布外。

## 字体与层级

英文说明使用 Excalifont，中文使用小赖字体 Xiaolai；代码使用手写等宽 Comic Shanns，保持缩进、数字和标点可辨。字体在本站自托管，使用 `font-display: swap`，加载失败时保留可读的系统字体。禁用伪粗体，以字号、颜色和划线区分层级。

| 层级 | 桌面 | 手机 | 用途 |
| --- | --- | --- | --- |
| 课名 | 34px | 28px | 每页唯一大标题 |
| 画布任务 | 24px | 22px | 预测或修改任务 |
| 批注标题 | 20px | 20px | 关键词、结果结论 |
| 代码 | 20px | 16–18px | 等宽代码与结果 |
| 正文 | 18px | 18px | 问题、批注解释、答案 |
| 操作文字 | 16px | 16px | 标签页、按钮、折叠入口 |
| 辅助文字 | 14px | 14px | 课号、行号、环境说明 |

## 来源与授权

固定采用 Excalidraw 仓库提交 `b7de45e88111f5680ae4bb3c3f3541c7d3b279fe`：

- [Excalifont 的字体分片与授权](https://github.com/excalidraw/excalidraw/blob/b7de45e88111f5680ae4bb3c3f3541c7d3b279fe/packages/excalidraw/fonts/Excalifont/index.ts)：拉丁字形分片原样保留，OFL 1.1。
- [Xiaolai 的字体说明](https://github.com/excalidraw/excalidraw/blob/b7de45e88111f5680ae4bb3c3f3541c7d3b279fe/packages/excalidraw/fonts/Xiaolai/index.ts)：从同一提交的 `scripts/woff2/assets/Xiaolai-Regular.ttf` 提取站内课程所用汉字，转为 WOFF2；子集内部名称改为 `BEAM Lesson Hand`，保留版权与 OFL 1.1 授权。
- [Comic Shanns 的字体分片与授权](https://github.com/excalidraw/excalidraw/blob/b7de45e88111f5680ae4bb3c3f3541c7d3b279fe/packages/excalidraw/fonts/ComicShanns/index.ts)：拉丁字形分片原样保留，MIT。

三个字体文件合计 211,752 字节，约 207 KiB；中文子集包含 880 个字符。资源及完整授权在 `public/fonts/lesson-sketch/`，不依赖运行时外部字体 CDN。资源路径绕过语言重定向。

## 更新中文子集

只在课件新增未覆盖汉字时重新生成，无需在部署时安装 Python 或下载字体。下载上述固定提交的 TTF 到临时目录，再执行：

```sh
uv run --with 'fonttools[woff]==4.67.0' python scripts/subset-lesson-font.py /private/tmp/beam-xiaolai-original.ttf
node --test tests/lesson-fonts.test.mjs
```

脚本核对源文件 SHA-256，扫描课程数据与组件，生成压缩字体及字符清单。字体预算与汉字覆盖由测试检查；原始 21MB TTF 不放入仓库。

## 验证

- `npm test`：生产构建和 45 项测试通过；`npm run lint`、`git diff --check` 通过。
- 浏览器检查三课各三个视图，在 1280、1024、760、390、320px 共 45 个组合中没有整页横向溢出或批注与代码重叠。
- 浅色桌面、浅色手机、深色手机截图保存在 `output/playwright/*-hand-final-*.png`。
- 三种字体均实际加载；测量 `iiii` 和 `WWWW` 宽度一致，确认代码使用等宽字体。
- Windows 启动命令、两次 Ctrl+C 演示、返回值显示、批注联动、预测必选和答案对照正常。第 02 课箭头在页面交互初始化及视图切回后正常绘制。
- 仅完成本地修改，未发布线上；待确认字体观感后再考虑扩展到其他课程。
