import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Image
            src="/brand-icon.png"
            alt=""
            width={48}
            height={48}
            className="footer-icon"
            unoptimized
          />
          <div>
            <strong>BEAM Path</strong>
            <p>两门语言，一套并发与容错的思维。</p>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <span>继续学习</span>
            <Link href="/learn/start-line">从零开始</Link>
            <Link href="/learn/processes-and-mailboxes">直接学并发</Link>
            <Link href="/playground">在线 Playground</Link>
          </div>
          <div>
            <span>官方入口</span>
            <a href="https://elixir-lang.org/" target="_blank" rel="noreferrer">
              Elixir
            </a>
            <a href="https://www.erlang.org/" target="_blank" rel="noreferrer">
              Erlang/OTP
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>为真正理解 BEAM 而设计，而不只是记住语法。</p>
        <a
          href="https://github.com/ViffyGwaanl/kimi-k3-learn"
          target="_blank"
          rel="noreferrer"
        >
          教学方法参考 kimi-k3-learn
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </footer>
  );
}
