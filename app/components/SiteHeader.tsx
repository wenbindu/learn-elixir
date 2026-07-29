import Image from "next/image";
import Link from "next/link";

type SiteHeaderProps = {
  compact?: boolean;
};

export function SiteHeader({ compact = false }: SiteHeaderProps) {
  return (
    <header className={`site-header${compact ? " site-header--compact" : ""}`}>
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="BEAM Path 首页">
          <Image
            className="brand-icon"
            src="/brand-icon.png"
            alt=""
            width={42}
            height={42}
            priority
            unoptimized
          />
          <span className="brand-copy">
            <strong>BEAM Path</strong>
            <small>Erlang + Elixir</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="主导航">
          <Link href="/#roadmap">学习路径</Link>
          <Link href="/#lab">并发实验</Link>
          <Link href="/playground">在线练习</Link>
          <Link href="/keywords">关键字字典</Link>
          <Link href="/#resources">常用资源</Link>
        </nav>

        <Link className="header-cta" href="/learn/start-line">
          开始学习
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
