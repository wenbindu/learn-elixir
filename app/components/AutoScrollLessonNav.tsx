"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

type AutoScrollLessonNavProps = {
  activeLesson: string;
  children: ReactNode;
};

export function AutoScrollLessonNav({
  activeLesson,
  children,
}: AutoScrollLessonNavProps) {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav || nav.clientHeight === 0) return;

    const keepActiveLessonVisible = () => {
      const activeLink = nav.querySelector<HTMLElement>(
        '[aria-current="page"]',
      );
      if (!activeLink) return;

      const navRect = nav.getBoundingClientRect();
      const activeRect = activeLink.getBoundingClientRect();
      const centeredTop =
        nav.scrollTop +
        activeRect.top -
        navRect.top -
        (nav.clientHeight - activeRect.height) / 2;
      const maximumTop = Math.max(0, nav.scrollHeight - nav.clientHeight);

      nav.scrollTop = Math.max(0, Math.min(Math.round(centeredTop), maximumTop));
    };

    keepActiveLessonVisible();
    const frame = window.requestAnimationFrame(keepActiveLessonVisible);

    return () => window.cancelAnimationFrame(frame);
  }, [activeLesson]);

  return (
    <nav ref={navRef} data-auto-scroll-active={activeLesson}>
      {children}
    </nav>
  );
}
