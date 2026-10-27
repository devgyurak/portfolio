import { useEffect } from 'react';

// 함께 화면에 들어온 요소들은 이 간격으로 차례로 나타납니다.
const STAGGER_MS = 90;

// `data-reveal`을 단 요소가 화면에 들어오면 `data-revealed`를 붙입니다. 모션은 layout.ts의 `reveal`이 맡습니다.
// 리스트 key가 언어와 무관해 언어를 바꿔도 요소가 다시 마운트되지 않으므로, 마운트 때 한 번만 찾습니다.
export const useScrollReveal = () => {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const show = (el: HTMLElement) => {
      el.dataset.revealed = 'true';
    };

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach(show);
      return;
    }

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((entry, order) => {
            observer.unobserve(entry.target);
            timers.push(window.setTimeout(() => show(entry.target as HTMLElement), order * STAGGER_MS));
          });
      },
      // 화면 아래 10%를 지나야 나타나게 해, 들어오는 순간이 눈에 보이게 합니다.
      { rootMargin: '0px 0px -10% 0px' }
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, []);
};
