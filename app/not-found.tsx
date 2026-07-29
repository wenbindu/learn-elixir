import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader compact />
      <main className="not-found-page">
        <span>404 · PROCESS NOT FOUND</span>
        <h1>这个进程没有注册</h1>
        <p>课程地址可能已经改变。回到学习路径，选择一个仍在监督树里的模块。</p>
        <Link className="button button--dark" href="/#roadmap">
          返回学习路径
          <span aria-hidden="true">→</span>
        </Link>
      </main>
    </>
  );
}
