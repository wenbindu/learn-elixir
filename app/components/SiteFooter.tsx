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
            <p>两种写法，同一个会传消息、会从故障中重新站起来的世界。</p>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <span>继续学习</span>
            <Link href="/learn/start-line">从零开始</Link>
            <Link href="/learn/processes-and-mailboxes">先玩消息实验</Link>
            <Link href="/playground">在线写代码</Link>
            <Link href="/keywords">关键字字典</Link>
            <Link href="/resources">学习工具箱</Link>
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
        <p>愿你每次运行代码，都多发现一个“原来如此”。</p>
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
