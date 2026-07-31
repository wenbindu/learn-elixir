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
          <Link href="/from-scratch">从零学</Link>
          <Link href="/#beam-roadmap">BEAM 主线</Link>
          <Link href="/#lab">消息实验</Link>
          <Link href="/playground">在线练习</Link>
          <Link href="/keywords">关键字字典</Link>
          <Link href="/resources">学习工具箱</Link>
        </nav>

        <Link className="header-cta" href="/from-scratch">
          开始学习
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
