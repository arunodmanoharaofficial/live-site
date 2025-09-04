// Utilities: year, reveal-on-scroll, hover tilt

// Footer year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Footer already uses &copy; in HTML

  // Measure and set typing width in pixels for accuracy across devices
  const setTypingWidth = (el) => {
    if (!el) return;
    const text = (el.textContent || '').trim();
    if (!text) return;

    const prev = {
      width: el.style.width,
      whiteSpace: el.style.whiteSpace,
      position: el.style.position,
      visibility: el.style.visibility
    };

    // Temporarily let it size naturally to measure full single-line width
    el.style.visibility = 'hidden';
    el.style.position = 'absolute';
    el.style.whiteSpace = 'nowrap';
    el.style.width = 'auto';

    const px = Math.ceil(el.scrollWidth);
    el.style.setProperty('--typing-w', `${px}px`);

    // Restore previous inline styles
    el.style.width = prev.width;
    el.style.whiteSpace = prev.whiteSpace;
    el.style.position = prev.position;
    el.style.visibility = prev.visibility;
  };

  const hashtagEl = document.querySelector('.hero .hashtag');
  const subtitleEl = document.querySelector('.hero .subtitle');
  setTypingWidth(hashtagEl);
  setTypingWidth(subtitleEl);

  // Recalculate width after fonts load and on resize (mobile accuracy)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      setTypingWidth(hashtagEl);
      setTypingWidth(subtitleEl);
    });
  } else {
    // Fallback after window load
    window.addEventListener('load', () => {
      setTypingWidth(hashtagEl);
      setTypingWidth(subtitleEl);
    }, { once: true });
  }

  let resizeRaf = null;
  window.addEventListener('resize', () => {
    if (!resizeRaf) resizeRaf = requestAnimationFrame(() => {
      resizeRaf = null;
      setTypingWidth(hashtagEl);
      setTypingWidth(subtitleEl);
    });
  });

  // After typing finishes, allow wrapping so long bios are fully visible on mobile
  const allowWrapAfterTyping = (el) => {
    if (!el) return;
    el.addEventListener('animationend', (e) => {
      if (e.animationName === 'typing') {
        el.style.whiteSpace = 'normal';
        el.style.width = 'auto';
        // Remove caret; keep text visible
        el.style.borderRight = '0';
      }
    });
  };
  allowWrapAfterTyping(hashtagEl);
  allowWrapAfterTyping(subtitleEl);

  // Decode (scramble -> name) effect on page load
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nameEl = document.querySelector('.title .name');
  if (nameEl) {
    const final = nameEl.dataset.text || nameEl.textContent || '';
    if (!prefersReduced && final.length) {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*';
      let progress = 0;
      const revealStep = 1; // slower reveal step (1 char per tick)
      const timer = setInterval(() => {
        progress += revealStep;
        if (progress > final.length) progress = final.length;
        const out = Array.from(final).map((ch, i) => {
          if (i < progress) return ch;
          if (ch === ' ') return ' ';
          return letters[Math.floor(Math.random() * letters.length)];
        }).join('');
        nameEl.textContent = out;
        if (progress >= final.length) {
          clearInterval(timer);
          nameEl.textContent = final;
        }
      }, 80); // slower interval (ms)
    } else {
      nameEl.textContent = final;
    }
  }

  // Prefer logo image if present
  const brand = document.querySelector('.brand');
  const logo = document.querySelector('.brand-logo');
  if (brand && logo) {
    const markLoaded = () => brand.classList.add('logo-loaded');
    if (logo.complete && logo.naturalWidth > 0) markLoaded();
    logo.addEventListener('load', markLoaded, { once: true });
  }
});

// IntersectionObserver for reveal animations
const revealEls = Array.from(document.querySelectorAll('.reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  revealEls.forEach(el => io.observe(el));
} else {
  // Fallback: show all
  revealEls.forEach(el => el.classList.add('visible'));
}

// Hover tilt effect for elements with .tilt
const tiltEls = Array.from(document.querySelectorAll('.tilt'));
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

tiltEls.forEach((card) => {
  let raf = null;
  let current = { rx: 0, ry: 0 };
  const maxTilt = 10; // degrees

  const onMove = (ev) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const px = (ev.clientX - cx) / (rect.width / 2);
    const py = (ev.clientY - cy) / (rect.height / 2);

    const ry = clamp(px * maxTilt, -maxTilt, maxTilt);
    const rx = clamp(-py * maxTilt, -maxTilt, maxTilt);

    current = { rx, ry };
    if (!raf) raf = requestAnimationFrame(apply);
  };

  const apply = () => {
    raf = null;
    card.style.transform = `rotateX(${current.rx}deg) rotateY(${current.ry}deg) translateZ(0)`;
  };

  const reset = () => {
    card.style.transform = '';
  };

  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', reset);
});

// Parallax for aurora background (subtle)
(function () {
  const aurora = document.querySelector('.bg-aurora');
  if (!aurora) return;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  let raf = null;
  let target = { x: 0, y: 0 };

  const onMove = (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const px = clamp((e.clientX - cx) / cx, -1, 1);
    const py = clamp((e.clientY - cy) / cy, -1, 1);
    target.x = px * 16; // px translate
    target.y = py * 10;
    if (!raf) raf = requestAnimationFrame(apply);
  };

  const apply = () => {
    raf = null;
    aurora.style.setProperty('--tx', target.x.toFixed(2) + 'px');
    aurora.style.setProperty('--ty', target.y.toFixed(2) + 'px');
  };

  window.addEventListener('mousemove', onMove, { passive: true });
})();
