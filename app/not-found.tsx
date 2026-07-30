import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader compact />
      <main className="not-found-page">
        <span>404 · 这封信没有送到</span>
        <h1>这条学习小路暂时找不到了</h1>
        <p>可能是地址变了，也可能是链接写错了。别担心，回到学习地图，我们换一条路继续。</p>
        <Link className="button button--dark" href="/#roadmap">
          回到学习地图
          <span aria-hidden="true">→</span>
        </Link>
      </main>
    </>
  );
}
