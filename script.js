// Utilities: year, reveal-on-scroll, hover tilt, decode, animated backgrounds, nav aria-current
(() => {
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const mqlReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const mqlHover = window.matchMedia?.('(hover: hover) and (pointer: fine)');
  const prefersReduced = () => !!mqlReduced?.matches;
  const hasHoverPointer = () => !!mqlHover?.matches;

  document.addEventListener('DOMContentLoaded', () => {
    // Footer year
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // Typing width measurement (off-DOM clone)
    const measureAndSetTypingWidth = (el) => {
      if (!el) return;
      const text = (el.textContent || '').trim();
      if (!text) return;
      const cs = getComputedStyle(el);
      const clone = document.createElement(el.tagName);
      clone.textContent = text;
      Object.assign(clone.style, {
        position: 'absolute', left: '-9999px', top: '0', visibility: 'hidden',
        whiteSpace: 'nowrap', fontFamily: cs.fontFamily, fontSize: cs.fontSize,
        fontWeight: cs.fontWeight, letterSpacing: cs.letterSpacing, padding: cs.padding, border: '0'
      });
      document.body.appendChild(clone);
      const px = Math.ceil(clone.getBoundingClientRect().width);
      document.body.removeChild(clone);
      el.style.setProperty('--typing-w', `${px}px`);
    };

    const hashtagEl = document.querySelector('.hero .hashtag');
    const setHashtagTyping = () => { measureAndSetTypingWidth(hashtagEl); };
    setHashtagTyping();
    document.fonts?.ready?.then(setHashtagTyping);
    window.addEventListener('load', setHashtagTyping, { once: true });

    let resizeRaf = null;
    window.addEventListener('resize', () => {
      if (!resizeRaf) resizeRaf = requestAnimationFrame(() => { resizeRaf = null; setHashtagTyping(); });
    });
    if ('ResizeObserver' in window && hashtagEl) {
      const ro = new ResizeObserver(setHashtagTyping);
      ro.observe(hashtagEl);
    }

    // After typing, allow wrapping
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

    // Decode (scramble -> name) with RAF
    const nameEl = document.querySelector('.title .name');
    if (nameEl) {
      const final = nameEl.dataset.text || nameEl.textContent || '';
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*';
      const duration = 1600; // ms
      const runDecode = () => {
        if (prefersReduced() || !final.length) { nameEl.textContent = final; return; }
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const t = Math.min((ts - start) / duration, 1);
          const progress = Math.floor(t * final.length);
          const out = Array.from(final).map((ch, i) => (i < progress ? ch : (ch === ' ' ? ' ' : letters[(Math.random() * letters.length) | 0]))).join('');
          nameEl.textContent = out;
          if (t < 1 && !document.hidden) requestAnimationFrame(step);
          else nameEl.textContent = final;
        };
        requestAnimationFrame(step);
      };
      runDecode();
      mqlReduced?.addEventListener?.('change', runDecode);
      document.addEventListener('visibilitychange', () => { if (!document.hidden) runDecode(); });
    }

    // Prefer logo when image loads
    const brand = document.querySelector('.brand');
    const logo = document.querySelector('.brand-logo');
    if (brand && logo) {
      const markLoaded = () => brand.classList.add('logo-loaded');
      if (logo.complete && logo.naturalWidth > 0) markLoaded();
      logo.addEventListener('load', markLoaded, { once: true });
    }

    // Reveal-on-scroll
    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if (prefersReduced()) {
      revealEls.forEach(el => el.classList.add('visible'));
    } else if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('visible'));
    }

    // Tech stack meters: animate from 0 when visible
    const meters = Array.from(document.querySelectorAll('.stack-meter'));
    const getMeterLevel = (el) => {
      const inline = el.style.getPropertyValue('--level');
      if (inline) return inline.trim();
      const computed = getComputedStyle(el).getPropertyValue('--level');
      return (computed && computed.trim()) || '70%';
    };
    if (meters.length) {
      if (prefersReduced()) {
        meters.forEach(meter => meter.style.setProperty('--meter', getMeterLevel(meter)));
      } else if ('IntersectionObserver' in window) {
        meters.forEach(meter => meter.style.setProperty('--meter', '0%'));
        const meterObserver = new IntersectionObserver((entries, observer) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const meter = entry.target;
            meter.style.setProperty('--meter', getMeterLevel(meter));
            observer.unobserve(meter);
          }
        }, { threshold: 0.35, rootMargin: '0px 0px -10% 0px' });
        meters.forEach(meter => meterObserver.observe(meter));
      } else {
        meters.forEach(meter => meter.style.setProperty('--meter', getMeterLevel(meter)));
      }
    }

    // Nav aria-current updater
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

    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('primary-menu');
    if (menu && menuToggle) {
      const openMenu = () => {
        menu.classList.add('is-open');
        menuToggle.classList.add('is-active');
        menuToggle.setAttribute('aria-expanded', 'true');
      };
      const closeMenu = () => {
        menu.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
      };
      const toggleMenu = () => {
        if (menu.classList.contains('is-open')) closeMenu();
        else openMenu();
      };
      menuToggle.addEventListener('click', toggleMenu);
      menu.addEventListener('click', (ev) => {
        const link = ev.target?.closest?.('a');
        if (link) closeMenu();
      });
      window.addEventListener('resize', () => {
        if (window.innerWidth > 720 && menu.classList.contains('is-open')) closeMenu();
      });
      document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
      });
    }

    // Hover tilt (desktop + motion-respecting)
    const enableTilt = () => hasHoverPointer() && !prefersReduced();
    const tiltEls = Array.from(document.querySelectorAll('.tilt'));
    const shouldTilt = (el) => el.dataset.tilt !== 'off';
    const attachTilt = () => {
      if (!enableTilt()) return;
      for (const card of tiltEls) {
        if (!shouldTilt(card)) continue;
        let raf = null, rx = 0, ry = 0;
        const maxTilt = 10; // deg
        const onMove = (ev) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const px = (ev.clientX - cx) / (rect.width / 2);
          const py = (ev.clientY - cy) / (rect.height / 2);
          ry = Math.max(-maxTilt, Math.min(maxTilt, px * maxTilt));
          rx = Math.max(-maxTilt, Math.min(maxTilt, -py * maxTilt));
          if (!raf) raf = requestAnimationFrame(() => { raf = null; card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`; });
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
        if (!shouldTilt(card)) continue;
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

    // === Animated Backgrounds ===
    const bgMode = document.body.dataset.bg || 'mesh'; // set to "aurora" in HTML
    const reduced = prefersReduced();

    // Hi-DPI canvas fitter (returns context scaled to CSS px)
    const fitCanvas = (canvas) => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return ctx;
    };

    // WAVES THEME
    if (bgMode === 'waves' && !reduced) {
      const canvas = document.querySelector('.bg-waves');
      if (canvas) {
        let ctx = fitCanvas(canvas);
        const params = { lines: 4, amp: 24, speed: 0.6, hue: 186 };
        let t = 0, raf = null;

        const draw = () => {
          const rect = canvas.getBoundingClientRect();
          const W = rect.width, H = rect.height;
          ctx.clearRect(0, 0, W, H);
          ctx.lineWidth = 2;
          for (let i = 0; i < params.lines; i++) {
            const p = i / (params.lines - 1 || 1);
            const yBase = (H / (params.lines + 1)) * (i + 1);
            const hue = params.hue + p * 30;
            ctx.strokeStyle = `hsla(${hue}, 100%, 65%, 0.45)`;
            ctx.beginPath();
            const k = 0.008 + p * 0.004;
            for (let x = 0; x <= W; x += 8) {
              const y = yBase + Math.sin(x * k + t * params.speed + i * 1.2) * (params.amp * (0.7 + 0.6 * Math.sin(t * 0.2 + i)));
              if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
          }
          t += 0.016;
          raf = requestAnimationFrame(draw);
        };

        const onResize = () => { ctx = fitCanvas(canvas); };
        window.addEventListener('resize', () => requestAnimationFrame(onResize));
        draw();
        document.addEventListener('visibilitychange', () => {
          if (document.hidden && raf) cancelAnimationFrame(raf);
          else if (!document.hidden) draw();
        }, { passive: true });
      }
    }

    // PARTICLES THEME
    if (bgMode === 'particles' && !reduced) {
      const canvas = document.querySelector('.bg-particles');
      if (canvas) {
        let ctx = fitCanvas(canvas);
        let rect = canvas.getBoundingClientRect();
        let W = rect.width, H = rect.height;
        const COUNT = Math.floor(Math.min(W, H) / 6);
        const MAX_D = 120;
        const SPEED = 0.25;

        const rand = (a,b)=>a+Math.random()*(b-a);
        const pts = Array.from({length: COUNT}, () => ({
          x: rand(0, W), y: rand(0, H), vx: rand(-SPEED, SPEED), vy: rand(-SPEED, SPEED)
        }));

        let raf = null;
        const draw = () => {
          rect = canvas.getBoundingClientRect();
          W = rect.width; H = rect.height;
          ctx.clearRect(0,0,W,H);

          ctx.fillStyle = 'rgba(255,255,255,0.55)';
          for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI*2); ctx.fill(); }

          ctx.lineWidth = 1;
          for (let i=0;i<pts.length;i++){
            for (let j=i+1;j<pts.length;j++){
              const a=pts[i], b=pts[j];
              const dx=a.x-b.x, dy=a.y-b.y; const d=Math.hypot(dx,dy);
              if (d<MAX_D){
                const alpha = 1 - d/MAX_D;
                ctx.strokeStyle = `rgba(0,229,255,${0.18*alpha})`;
                ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
              }
            }
          }

          for (const p of pts){
            p.x+=p.vx; p.y+=p.vy;
            if (p.x<0||p.x>W) p.vx*=-1;
            if (p.y<0||p.y>H) p.vy*=-1;
          }
          raf = requestAnimationFrame(draw);
        };

        const onResize = () => { ctx = fitCanvas(canvas); };
        window.addEventListener('resize', () => requestAnimationFrame(onResize));
        draw();
        document.addEventListener('visibilitychange', () => {
          if (document.hidden && raf) cancelAnimationFrame(raf);
          else if (!document.hidden) draw();
        }, { passive: true });
      }
    }

    // Parallax for active background
    (() => {
      if (reduced) return;
      const activeLayer =
        (bgMode === 'mesh' && document.querySelector('.bg-mesh')) ||
        (bgMode === 'waves' && document.querySelector('.bg-waves')) ||
        (bgMode === 'particles' && document.querySelector('.bg-particles')) ||
        (bgMode === 'aurora' && document.querySelector('.bg-aurora'));
      if (!activeLayer) return;

      let raf=null, tx=0, ty=0;
      const onMove = (e) => {
        const cx = window.innerWidth/2, cy = window.innerHeight/2;
        const px = clamp((e.clientX - cx) / cx, -1, 1);
        const py = clamp((e.clientY - cy) / cy, -1, 1);
        tx = px * 12; ty = py * 8;
        if (!raf) raf = requestAnimationFrame(() => { raf=null; activeLayer.style.transform = `translate3d(${tx}px, ${ty}px, 0)`; });
      };
      window.addEventListener('pointermove', onMove, { passive:true });
      document.addEventListener('visibilitychange', () => { if (document.hidden) activeLayer.style.transform = ''; });
    })();

    // === Hero featured column ===
    const heroRight = document.querySelector('.hero-right');
    if (heroRight) {
      const heroEls = {
        title: document.getElementById('proj-title'),
        tagline: document.getElementById('proj-tagline'),
        live: document.getElementById('proj-live'),
        code: document.getElementById('proj-code'),
        stack: document.getElementById('proj-stack'),
        media: document.getElementById('proj-media'),
        repoLink: document.getElementById('gh-repo'),
        repoUpdated: document.getElementById('gh-updated'),
        availDot: document.getElementById('avail-dot'),
        availText: document.getElementById('avail-text')
      };

      const projects = [
        {
          title: 'Secure VPN Orchestrator',
          tagline: 'Automated VPN provisioning with Docker + WireGuard',
          stack: ['Python', 'Docker', 'WireGuard', 'Linux'],
          live: 'https://arunod.us/',
          code: 'https://github.com/arunodmanoharaofficial',
          mediaText: 'VPN Dashboard'
        },
        {
          title: 'Threat Intel Swarm',
          tagline: 'Distributed recon + alerting pipeline',
          stack: ['Python', 'Celery', 'Redis', 'Grafana'],
          live: 'https://github.com/arunodmanoharaofficial',
          code: 'https://github.com/arunodmanoharaofficial',
          mediaText: 'Recon Pipeline'
        }
      ];

      let projectIndex = 0;
      const renderProject = (project) => {
        if (!project || !heroEls.title || !heroEls.stack || !heroEls.media) return;
        heroEls.title.textContent = project.title;
        heroEls.tagline.textContent = project.tagline;
        if (heroEls.live) heroEls.live.href = project.live || '#';
        if (heroEls.code) heroEls.code.href = project.code || '#';

        heroEls.stack.innerHTML = '';
        for (const tech of project.stack || []) {
          const li = document.createElement('li');
          li.textContent = tech;
          heroEls.stack.appendChild(li);
        }

        heroEls.media.innerHTML = '';
        const fallback = document.createElement('div');
        fallback.className = 'media-fallback';
        fallback.textContent = project.mediaText || 'Preview';
        heroEls.media.appendChild(fallback);
      };

      if (projects.length) {
        renderProject(projects[projectIndex]);
        if (projects.length > 1 && !prefersReduced()) {
          setInterval(() => {
            projectIndex = (projectIndex + 1) % projects.length;
            renderProject(projects[projectIndex]);
          }, 6000);
        }
      }

      const availability = {
        open: true,
        textOpen: 'Open for freelance',
        textClosed: 'Booked until Nov 2025'
      };
      const setAvailability = (isOpen) => {
        if (!heroEls.availDot || !heroEls.availText) return;
        heroEls.availText.textContent = isOpen ? availability.textOpen : availability.textClosed;
        heroEls.availDot.style.background = isOpen ? '#17ffb2' : '#ff6b6b';
        heroEls.availDot.style.boxShadow = isOpen ? '0 0 10px #17ffb2' : '0 0 10px #ff6b6b';
      };
      setAvailability(availability.open);

      const githubUser = 'arunodmanoharaofficial';
      const timeAgo = (date) => {
        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
        const units = [
          { label: 'yr', secs: 31536000 },
          { label: 'mo', secs: 2592000 },
          { label: 'd', secs: 86400 },
          { label: 'h', secs: 3600 },
          { label: 'm', secs: 60 },
          { label: 's', secs: 1 }
        ];
        for (const unit of units) {
          const value = Math.floor(seconds / unit.secs);
          if (value >= 1) return `${value}${unit.label} ago`;
        }
        return 'just now';
      };

      const loadGitHubLatest = async () => {
        if (!window.fetch || !heroEls.repoLink || !githubUser) return;
        try {
          const res = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=1`);
          if (!res.ok) throw new Error(res.statusText);
          const [repo] = await res.json();
          if (!repo) return;
          heroEls.repoLink.textContent = repo.full_name;
          heroEls.repoLink.href = repo.html_url;
          if (heroEls.repoUpdated) {
            heroEls.repoUpdated.textContent = `Updated ${timeAgo(new Date(repo.pushed_at))}`;
          }
        } catch (err) {
          heroEls.repoLink.textContent = 'Could not load GitHub activity';
          heroEls.repoLink.removeAttribute('href');
          if (heroEls.repoUpdated) heroEls.repoUpdated.textContent = '';
          console.warn('GitHub activity fetch failed:', err);
        }
      };
      loadGitHubLatest();
    }

    // If we landed on a bad hash, normalize to the top once
    if (location.hash && !document.querySelector(location.hash)) {
      history.replaceState(null, '', location.pathname);
    }

    // Register service worker for offline caching
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
          console.warn('Service worker registration failed:', err);
        });
      }, { once: true });
    }
  });
})();
