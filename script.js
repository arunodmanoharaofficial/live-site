// Utilities: year, reveal-on-scroll, hover tilt, decode, parallax, nav aria-current
(() => {
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const mqlReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const mqlHover = window.matchMedia?.('(hover: hover) and (pointer: fine)');
  const prefersReduced = () => !!mqlReduced?.matches;
  const hasHoverPointer = () => !!mqlHover?.matches;

  // ---- DOM READY ----
  document.addEventListener('DOMContentLoaded', () => {
    // Footer year
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // --- Typing width measurement (off-DOM clone; no style mutation on target) ---
    const measureAndSetTypingWidth = (el) => {
      if (!el) return;
      const text = (el.textContent || '').trim();
      if (!text) return;

      const cs = getComputedStyle(el);
      const clone = document.createElement(el.tagName);
      clone.textContent = text;
      Object.assign(clone.style, {
        position: 'absolute',
        left: '-9999px',
        top: '0',
        visibility: 'hidden',
        whiteSpace: 'nowrap',
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing,
        padding: cs.padding,
        border: '0',
      });
      document.body.appendChild(clone);
      const px = Math.ceil(clone.getBoundingClientRect().width);
      document.body.removeChild(clone);
      el.style.setProperty('--typing-w', `${px}px`);
    };

    const hashtagEl = document.querySelector('.hero .hashtag');
    const subtitleEl = document.querySelector('.hero .subtitle');

    const setAllTyping = () => {
      measureAndSetTypingWidth(hashtagEl);
      measureAndSetTypingWidth(subtitleEl);
    };

    setAllTyping();
    if (document.fonts?.ready) {
      document.fonts.ready.then(setAllTyping);
    } else {
      window.addEventListener('load', setAllTyping, { once: true });
    }

    let resizeRaf = null;
    window.addEventListener('resize', () => {
      if (!resizeRaf) resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        setAllTyping();
      });
    });

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(setAllTyping);
      hashtagEl && ro.observe(hashtagEl);
      subtitleEl && ro.observe(subtitleEl);
    }

    // After typing finishes, allow wrapping
    const allowWrapAfterTyping = (el) => {
      if (!el) return;
      el.addEventListener('animationend', (e) => {
        if (e.animationName === 'typing') {
          el.style.whiteSpace = 'normal';
          el.style.width = 'auto';
          el.style.borderRight = '0';
        }
      });
    };
    allowWrapAfterTyping(hashtagEl);
    allowWrapAfterTyping(subtitleEl);

    // --- Decode (scramble -> name) with RAF ---
    const nameEl = document.querySelector('.title .name');
    if (nameEl) {
      const final = nameEl.dataset.text || nameEl.textContent || '';
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*';
      const duration = 1600; // ms

      const runDecode = () => {
        if (prefersReduced() || !final.length) {
          nameEl.textContent = final;
          return;
        }
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const t = Math.min((ts - start) / duration, 1);
          const progress = Math.floor(t * final.length);
          const out = Array.from(final).map((ch, i) => {
            if (i < progress) return ch;
            if (ch === ' ') return ' ';
            return letters[(Math.random() * letters.length) | 0];
          }).join('');
          nameEl.textContent = out;
          if (t < 1 && !document.hidden) requestAnimationFrame(step);
          else nameEl.textContent = final;
        };
        requestAnimationFrame(step);
      };

      runDecode();
      mqlReduced?.addEventListener?.('change', runDecode);
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) runDecode();
      });
    }

    // Prefer logo image if present
    const brand = document.querySelector('.brand');
    const logo = document.querySelector('.brand-logo');
    if (brand && logo) {
      const markLoaded = () => brand.classList.add('logo-loaded');
      if (logo.complete && logo.naturalWidth > 0) markLoaded();
      logo.addEventListener('load', markLoaded, { once: true });
    }

    // --- IntersectionObserver for reveal animations ---
    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if (prefersReduced()) {
      revealEls.forEach(el => el.classList.add('visible'));
    } else if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('visible'));
    }

    // --- Nav aria-current updater (on scroll) ---
    const sections = [...document.querySelectorAll('main section[id]')];
    const links = [...document.querySelectorAll('.menu a[href^="#"]')];
    const byId = id => links.find(a => a.getAttribute('href') === `#${id}`);
    const setActive = () => {
      let active = sections[0]?.id;
      const y = window.scrollY + 120;
      for (const s of sections) if (s.offsetTop <= y) active = s.id;
      links.forEach(a => a.removeAttribute('aria-current'));
      const cur = byId(active);
      if (cur) cur.setAttribute('aria-current','page');
    };
    setActive();
    window.addEventListener('scroll', setActive, { passive: true });

    // --- Hover tilt (only for real pointers & not reduced motion) ---
    const enableTilt = () => hasHoverPointer() && !prefersReduced();
    const tiltEls = Array.from(document.querySelectorAll('.tilt'));
    const attachTilt = () => {
      if (!enableTilt()) return;
      for (const card of tiltEls) {
        let raf = null;
        let rx = 0, ry = 0;
        const maxTilt = 10; // deg

        const onMove = (ev) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const px = (ev.clientX - cx) / (rect.width / 2);
          const py = (ev.clientY - cy) / (rect.height / 2);
          ry = clamp(px * maxTilt, -maxTilt, maxTilt);
          rx = clamp(-py * maxTilt, -maxTilt, maxTilt);
          if (!raf) raf = requestAnimationFrame(() => {
            raf = null;
            card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
          });
        };
        const reset = () => { card.style.transform = ''; };

        card.addEventListener('pointermove', onMove);
        card.addEventListener('pointerleave', reset);
        card.addEventListener('pointercancel', reset);

        card._tiltHandlers = { onMove, reset };
      }
    };

    const detachTilt = () => {
      for (const card of tiltEls) {
        if (!card._tiltHandlers) continue;
        card.removeEventListener('pointermove', card._tiltHandlers.onMove);
        card.removeEventListener('pointerleave', card._tiltHandlers.reset);
        card.removeEventListener('pointercancel', card._tiltHandlers.reset);
        card.style.transform = '';
        delete card._tiltHandlers;
      }
    };

    attachTilt();
    mqlHover?.addEventListener?.('change', () => { detachTilt(); attachTilt(); });
    mqlReduced?.addEventListener?.('change', () => { detachTilt(); attachTilt(); });

    // --- Parallax for aurora background (subtle; gated by pointer & motion) ---
    (function () {
      const aurora = document.querySelector('.bg-aurora');
      if (!aurora) return;

      const active = () => hasHoverPointer() && !prefersReduced();
      let raf = null, targetX = 0, targetY = 0;

      const apply = () => {
        raf = null;
        aurora.style.setProperty('--tx', `${targetX.toFixed(2)}px`);
        aurora.style.setProperty('--ty', `${targetY.toFixed(2)}px`);
      };

      const onMove = (e) => {
        if (!active()) return;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const px = clamp((e.clientX - cx) / cx, -1, 1);
        const py = clamp((e.clientY - cy) / cy, -1, 1);
        targetX = px * 16;
        targetY = py * 10;
        if (!raf) raf = requestAnimationFrame(apply);
      };

      const enable = () => window.addEventListener('pointermove', onMove, { passive: true });
      const disable = () => window.removeEventListener('pointermove', onMove);

      enable();
      mqlHover?.addEventListener?.('change', () => { disable(); enable(); });
      mqlReduced?.addEventListener?.('change', () => { disable(); enable(); });
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) { disable(); }
        else { disable(); enable(); }
      });
    })();
  });
})();
