/* ==========================================================================
   拆解 voice_chat · 引擎
   - 主题切换（localStorage）
   - 侧边栏目录构建 / 章节进度 / 搜索
   - 滚动显现动画
   - 代码走读组件（逐行讲解、步进、自动播放）
   - SVG 过程图重播
   ========================================================================== */
"use strict";

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  /* ---------- 主题 ---------- */
  const root = document.documentElement;
  function applyTheme(t) { root.dataset.theme = t; $("#theme-btn").textContent = t === "dark" ? "☀️ 浅色" : "🌙 深色"; }
  applyTheme(store.get("vc-tutorial.theme", "light"));
  $("#theme-btn").addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    store.set("vc-tutorial.theme", next);
    applyTheme(next);
  });

  /* ---------- 目录 ---------- */
  const chapters = $$("section.chapter");
  const toc = $("#toc");
  const progress = store.get("vc-tutorial.progress", {}); // {chKey: percent}

  chapters.forEach((ch) => {
    const a = document.createElement("a");
    a.href = "#" + ch.id;
    a.className = "toc-ch";
    const n = ch.dataset.key.replace("ch", "");
    a.innerHTML = `<span class="toc-n">第${n}章</span><span class="toc-t">${ch.dataset.title}</span>`;
    a.dataset.key = ch.id;
    toc.appendChild(a);
  });
  const tocLinks = $$(".toc-ch");

  /* ---------- 章节进度与活跃态 ---------- */
  const scrollbar = $("#scrollbar");
  const isChapterVisible = (chapter) => chapter.style.display !== "none";

  function chProgress(key) {
    const ch = $("#" + key);
    if (!ch) return 0;
    const r = ch.getBoundingClientRect();
    const total = ch.offsetHeight;
    const seen = Math.min(Math.max(-r.top, 0), total);
    return Math.round((seen / total) * 100);
  }

  function updateProgressUI() {
    const h = document.documentElement;
    const sc = h.scrollTop || document.body.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    scrollbar.style.width = (max > 0 ? (sc / max) * 100 : 0) + "%";

    const visibleChapters = chapters.filter(isChapterVisible);
    visibleChapters.forEach((ch) => {
      const p = chProgress(ch.id);
      if (p > 5) progress[ch.id] = Math.max(progress[ch.id] || 0, p);
    });
    store.set("vc-tutorial.progress", progress);

    // 活跃章节
    let active = visibleChapters[0] || null;
    visibleChapters.forEach((ch) => {
      if (ch.getBoundingClientRect().top <= 140) active = ch;
    });
    tocLinks.forEach((a) => a.classList.toggle("active", a.dataset.key === active?.id));

    // 目录里的进度数字（先清掉旧的再插，避免滚动时重复累积）
    tocLinks.forEach((a) => {
      const old = a.querySelector(".toc-prog");
      if (old) old.remove();
      const p = progress[a.dataset.key] || 0;
      if (p >= 95) a.insertAdjacentHTML("beforeend", `<span class="toc-prog">✓</span>`);
      else if (p > 0) a.insertAdjacentHTML("beforeend", `<span class="toc-prog">${p}%</span>`);
    });
  }
  updateProgressUI();
  window.addEventListener("scroll", () => requestAnimationFrame(updateProgressUI), { passive: true });

  /* ---------- 顶栏信息 ---------- */
  const crumb = $("#crumb");
  const pager = $("#pager");
  const pagerPrev = document.createElement("a");
  const pagerNext = document.createElement("a");
  pagerNext.className = "next";
  pager.appendChild(pagerPrev);
  pager.appendChild(pagerNext);

  function updatePager() {
    const visibleLinks = tocLinks.filter((a) => a.style.display !== "none");
    const idx = visibleLinks.findIndex((a) => a.classList.contains("active"));
    if (idx <= 0) pagerPrev.style.visibility = "hidden";
    else {
      pagerPrev.style.visibility = "";
      pagerPrev.href = visibleLinks[idx - 1].getAttribute("href");
      pagerPrev.innerHTML = `<span class="dir">← 上一章</span>${visibleLinks[idx - 1].querySelector(".toc-t").textContent}`;
    }
    if (idx < 0 || idx >= visibleLinks.length - 1) pagerNext.style.visibility = "hidden";
    else {
      pagerNext.style.visibility = "";
      pagerNext.href = visibleLinks[idx + 1].getAttribute("href");
      pagerNext.innerHTML = `<span class="dir">下一章 →</span>${visibleLinks[idx + 1].querySelector(".toc-t").textContent}`;
    }
  }

  function updateCrumb() {
    const active = tocLinks.find((a) => a.classList.contains("active"));
    if (active) {
      const n = active.dataset.key.replace("ch", "");
      crumb.innerHTML = `拆解 voice_chat <span style="color:var(--muted)">/</span> <b>第${n}章 · ${active.querySelector(".toc-t").textContent}</b>`;
    } else crumb.innerHTML = `拆解 voice_chat <span style="color:var(--muted)">/</span> <b>无匹配章节</b>`;
    updatePager();
  }
  const _obs = new MutationObserver(updateCrumb);
  _obs.observe(toc, { attributes: true, subtree: true, attributeFilter: ["class"] });
  updateCrumb();

  /* ---------- 滚动显现 ---------- */
  const revealIO = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      // 图内的一次性动画（字节行军）在真正可见时才触发
      if (e.target.classList.contains("figwrap") && !e.target.dataset.marched) {
        e.target.dataset.marched = "1";
        requestAnimationFrame(() => {
          $$(".march", e.target).forEach((el) => el.classList.add("play"));
        });
      }
      revealIO.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => revealIO.observe(el));

  /* ---------- 代码走读组件 ---------- */
  $$(".wt").forEach(setupWT);

  function setupWT(wt) {
    const codeEl = $(".wt-code", wt);
    const panel = $(".wt-panel", wt);
    if (!codeEl) return;

    const lines = codeEl.textContent.replace(/\n$/, "").split("\n");
    const base = parseInt(codeEl.dataset.base || "1", 10);
    codeEl.innerHTML = "";
    lines.forEach((text, i) => {
      const ln = document.createElement("span");
      ln.className = "ln";
      ln.dataset.n = base + i;
      ln.innerHTML = `<span class="num">${base + i}</span>`;
      ln.appendChild(document.createTextNode(text || " "));
      codeEl.appendChild(ln);
    });

    const cards = $$(".wt-card", wt);
    const lineEls = $$(".ln", codeEl);
    const play = $(".wt-play", wt);
    let cur = -1;
    let timer = null;

    cards.forEach((card) => {
      const header = $(".wt-hd", card);
      header.setAttribute("role", "button");
      header.setAttribute("tabindex", "0");
      header.setAttribute("aria-expanded", "false");
    });

    function stopAutoplay() {
      if (timer) clearInterval(timer);
      timer = null;
      if (play) {
        play.textContent = "▶ 自动播放";
        play.setAttribute("aria-pressed", "false");
      }
    }

    function setActive(idx) {
      if (cur === idx) return;
      if (cur >= 0) {
        const c = cards[cur];
        c.classList.remove("open");
        $(".wt-hd", c).setAttribute("aria-expanded", "false");
        const rng = lineNumbers(c.dataset.lines);
        rng.forEach((n) => { const l = lineEls[n - base]; if (l) l.classList.remove("hl"); });
      }
      cur = idx;
      if (idx < 0) { updatePos(); return; }
      const c = cards[idx];
      c.classList.add("open");
      $(".wt-hd", c).setAttribute("aria-expanded", "true");
      const rng = lineNumbers(c.dataset.lines);
      rng.forEach((n) => { const l = lineEls[n - base]; if (l) { l.classList.add("hl"); l.classList.remove("flash"); void l.offsetWidth; l.classList.add("flash"); } });
      c.scrollIntoView({ block: "nearest", behavior: "smooth" });
      updatePos();
    }

    function updatePos() {
      $(".wt-pos", wt).textContent = cur < 0 ? `0/${cards.length}` : `${cur + 1}/${cards.length}`;
    }
    updatePos();

    // 点击代码行 → 定位到包含该行的卡片
    lineEls.forEach((lnEl) => {
      lnEl.addEventListener("click", () => {
        stopAutoplay();
        const n = parseInt(lnEl.dataset.n, 10);
        const idx = cards.findIndex((c) => inRange(c.dataset.lines, n));
        if (idx >= 0) setActive(idx);
      });
    });
    // 点击卡片头 → 展开/收起
    cards.forEach((c, i) => {
      const header = $(".wt-hd", c);
      header.addEventListener("click", () => {
        stopAutoplay();
        if (c.classList.contains("open")) setActive(-1);
        else setActive(i);
      });
      header.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        header.click();
      });
    });

    // 步进
    $$(".wt-step", wt).forEach((b) => {
      b.addEventListener("click", () => {
        stopAutoplay();
        const dir = parseInt(b.dataset.dir, 10);
        const next = cur < 0 ? (dir > 0 ? 0 : cards.length - 1) : Math.min(Math.max(cur + dir, 0), cards.length - 1);
        setActive(next);
      });
    });
    // 重置
    const reset = $(".wt-reset", wt);
    if (reset) reset.addEventListener("click", () => {
      stopAutoplay();
      setActive(-1);
    });
    // 自动播放
    if (play) {
      play.setAttribute("aria-pressed", "false");
      play.addEventListener("click", () => {
        if (timer) {
          stopAutoplay();
          return;
        }
        if (cards.length === 0) return;
        setActive(cur < 0 ? 0 : cur);
        timer = setInterval(() => {
          if (cur >= cards.length - 1) { stopAutoplay(); return; }
          setActive(cur + 1);
        }, 2600);
        play.textContent = "⏸ 暂停";
        play.setAttribute("aria-pressed", "true");
      });
    }
  }

  function inRange(spec, n) {
    if (!spec) return false;
    return spec.split(",").some((part) => {
      const [a, b] = part.split("-").map((x) => parseInt(x, 10));
      return b == null ? a === n : n >= a && n <= b;
    });
  }

  // 将 "12-15,18" 展开成实际行号；高亮范围与点击匹配使用同一语义。
  function lineNumbers(spec) {
    if (!spec) return [];
    return spec.split(",").flatMap((part) => {
      const [start, end = start] = part.split("-").map((x) => parseInt(x, 10));
      if (!Number.isInteger(start) || !Number.isInteger(end) || end < start) return [];
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });
  }

  /* ---------- 代码复制 ---------- */
  async function writeClipboardText(text) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch {}
    }

    const textarea = document.createElement("textarea");
    const focused = document.activeElement;
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.cssText = "position:fixed;inset:auto auto 0 -9999px;opacity:0";
    document.body.appendChild(textarea);
    textarea.select();
    let copied = false;
    try { copied = document.execCommand("copy"); } catch {}
    textarea.remove();
    if (focused instanceof HTMLElement) focused.focus();
    if (!copied) throw new Error("copy unavailable");
  }

  $$(".bs-code").forEach((b) => {
    const source = b.textContent.replace(/\s*$/, "");
    const btn = document.createElement("button");
    btn.className = "cp";
    btn.textContent = "复制";
    btn.setAttribute("aria-live", "polite");
    btn.addEventListener("click", async () => {
      try {
        await writeClipboardText(source);
        btn.textContent = "✓ 已复制";
      } catch {
        btn.textContent = "复制失败";
      }
      setTimeout(() => (btn.textContent = "复制"), 1200);
    });
    b.appendChild(btn);
  });

  /* ---------- SVG 图重播 / 暂停 ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const figureControllers = [];

  $$(".figwrap").forEach((fg) => {
    const svg = $("svg", fg);
    const animationSelector = "animate, animateMotion, animateTransform, set, .ring-spin, .pulse-dot, .blink, .march";
    if (!$(animationSelector, fg)) return;

    const replay = document.createElement("button");
    replay.type = "button";
    replay.className = "iconbtn fig-replay";
    replay.textContent = "↻ 重播动画";
    const pause = document.createElement("button");
    pause.type = "button";
    pause.className = "iconbtn fig-pause";
    const ctl = document.createElement("div");
    ctl.className = "fig-ctl";
    ctl.append(replay, pause);
    fg.appendChild(ctl);

    let paused = false;

    function setPaused(next, userInitiated = false) {
      paused = next;
      // reduced-motion remains the default; an explicit click on “继续” opts
      // this one figure back into motion without changing the OS preference.
      fg.classList.toggle("motion-opt-in", userInitiated && !paused && reduceMotion.matches);
      fg.classList.toggle("animations-paused", paused);
      fg.dataset.animationState = paused ? "paused" : "running";
      if (svg) {
        if (paused && typeof svg.pauseAnimations === "function") svg.pauseAnimations();
        if (!paused && typeof svg.unpauseAnimations === "function") svg.unpauseAnimations();
      }
      pause.textContent = paused ? "▶ 继续动画" : "⏸ 暂停动画";
      pause.setAttribute("aria-pressed", String(paused));
    }

    function restartSmil() {
      if (!svg) return;
      if (typeof svg.setCurrentTime === "function") {
        svg.setCurrentTime(0);
        return;
      }
      $$("animate, animateMotion, animateTransform, set", svg).forEach((el) => {
        el.replaceWith(el.cloneNode(true));
      });
    }

    function restartCssAnimations() {
      $$(".march", fg).forEach((el) => {
        el.classList.add("play");
      });
      const animated = $$(".ring-spin, .pulse-dot, .blink, .march", fg);
      animated.forEach((el) => el.classList.add("animation-restart"));
      void fg.offsetWidth;
      animated.forEach((el) => el.classList.remove("animation-restart"));
    }

    replay.addEventListener("click", () => {
      restartSmil();
      restartCssAnimations();
    });
    pause.addEventListener("click", () => setPaused(!paused, true));

    setPaused(reduceMotion.matches);
    figureControllers.push({ setPaused });
  });

  const onMotionPreference = (event) => {
    if (event.matches) figureControllers.forEach(({ setPaused }) => setPaused(true));
  };
  if (typeof reduceMotion.addEventListener === "function") reduceMotion.addEventListener("change", onMotionPreference);
  else if (typeof reduceMotion.addListener === "function") reduceMotion.addListener(onMotionPreference);

  /* ---------- 搜索 ---------- */
  const q = $("#q");
  const hint = $("#toc-hint");
  q.addEventListener("input", () => {
    const kw = q.value.trim().toLowerCase();
    let hits = 0;
    chapters.forEach((ch) => {
      const text = (ch.textContent || "").toLowerCase();
      const hit = !kw || text.includes(kw);
      ch.style.display = hit ? "" : "none";
      if (hit) hits++;
    });
    tocLinks.forEach((a) => {
      const ch = $("#" + a.dataset.key);
      a.style.display = ch.style.display === "none" ? "none" : "";
    });
    hint.classList.toggle("show", kw.length > 0);
    if (kw) hint.textContent = `搜索“${q.value}”命中 ${hits}/${chapters.length} 章`;
    updateProgressUI();
    updateCrumb();
  });

  /* ---------- 移动端菜单 ---------- */
  const menuBtn = $("#menu-btn");
  const menuClose = $("#menu-close");
  const sidebar = $("#sidebar");

  function setMenuOpen(open) {
    sidebar.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "关闭目录" : "打开目录");
    if (open) menuClose.focus();
  }

  menuBtn.addEventListener("click", () => setMenuOpen(!sidebar.classList.contains("open")));
  menuClose.addEventListener("click", () => {
    setMenuOpen(false);
    menuBtn.focus();
  });
  tocLinks.forEach((link) => link.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 860px)").matches) setMenuOpen(false);
  }));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebar.classList.contains("open")) {
      setMenuOpen(false);
      menuBtn.focus();
    }
  });
})();
