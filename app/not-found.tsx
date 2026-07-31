import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader compact />
      <main className="not-found-page">
        <span>404 · 页面不存在</span>
        <h1>这条路走不通</h1>
        <p>地址可能改了，也可能写错了。回到学习地图，再选一站。</p>
        <Link className="button button--dark" href="/#beam-roadmap">
          回到学习地图
          <span aria-hidden="true">→</span>
        </Link>
      </main>
    </>
  );
}
