// All client-side behaviour for the site. Bundled once by Astro.

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/* ---------- Header: scroll state, mobile toggle, dropdowns ---------- */
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
toggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  toggle.setAttribute('aria-expanded', String(open));
});

const desktop = window.matchMedia('(min-width: 1024px)');
const dropdowns = $$('[data-dropdown]');
const closeAll = (except?: HTMLElement) =>
  dropdowns.forEach((d) => {
    if (d === except) return;
    d.classList.remove('is-open');
    d.querySelector('button')?.setAttribute('aria-expanded', 'false');
  });

dropdowns.forEach((dd) => {
  const btn = dd.querySelector('button')!;
  let timer: number | undefined;
  const open = () => { closeAll(dd); dd.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); };
  const close = () => { dd.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', () => (dd.classList.contains('is-open') ? close() : open()));
  dd.addEventListener('mouseenter', () => { if (desktop.matches) { clearTimeout(timer); open(); } });
  dd.addEventListener('mouseleave', () => { if (desktop.matches) timer = window.setTimeout(close, 120); });
});
document.addEventListener('click', (e) => {
  if (!(e.target as Element).closest('[data-dropdown]')) closeAll();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

/* ---------- Reveal on scroll ---------- */
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  $$('[data-reveal]').forEach((el, i) => {
    const delay = el.dataset.revealDelay ?? String((i % 4) * 60);
    el.style.transitionDelay = `${delay}ms`;
    io.observe(el);
  });
} else {
  $$('[data-reveal]').forEach((el) => el.classList.add('is-in'));
}

/* ---------- Framework stepper (tabs) ---------- */
$$('[data-stepper]').forEach((stepper) => {
  const tabs = $$<HTMLButtonElement>('[role="tab"]', stepper);
  const panels = $$('[role="tabpanel"]', stepper);
  const bars = $$('[data-progress] span', stepper);
  const select = (i: number, focus = false) => {
    tabs.forEach((t, j) => {
      t.setAttribute('aria-selected', String(i === j));
      t.tabIndex = i === j ? 0 : -1;
    });
    panels.forEach((p, j) => (p.hidden = i !== j));
    bars.forEach((b, j) => b.classList.toggle('is-done', j <= i));
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      if (['ArrowDown', 'ArrowRight'].includes(k)) { e.preventDefault(); select((i + 1) % tabs.length, true); }
      if (['ArrowUp', 'ArrowLeft'].includes(k)) { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
      if (k === 'Home') { e.preventDefault(); select(0, true); }
      if (k === 'End') { e.preventDefault(); select(tabs.length - 1, true); }
    });
  });
  $$('[data-step-next]', stepper).forEach((b) =>
    b.addEventListener('click', () => {
      const cur = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
      select((cur + 1) % tabs.length, true);
    }),
  );
});

/* ---------- Resource filters ---------- */
$$('[data-filters]').forEach((bar) => {
  const buttons = $$<HTMLButtonElement>('[data-filter]', bar);
  const cards = $$('[data-category]');
  const empty = document.querySelector<HTMLElement>('[data-filter-empty]');
  const apply = (cat: string) => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === cat)));
    let shown = 0;
    cards.forEach((c) => {
      const show = cat === 'all' || c.dataset.category === cat;
      c.hidden = !show;
      if (show) shown++;
    });
    if (empty) {
      empty.hidden = shown > 0;
      const note = buttons.find((b) => b.dataset.filter === cat)?.dataset.empty;
      if (note) empty.querySelector('p')!.textContent = note;
    }
  };
  buttons.forEach((b) => b.addEventListener('click', () => {
    apply(b.dataset.filter!);
    history.replaceState(null, '', b.dataset.filter === 'all' ? location.pathname : `#${b.dataset.filter}`);
  }));
  const initial = location.hash.slice(1);
  if (initial && buttons.some((b) => b.dataset.filter === initial)) apply(initial);
});

/* ---------- Gated resource dialog ---------- */
const dialog = document.querySelector<HTMLDialogElement>('[data-resource-dialog]');
if (dialog) {
  const title = dialog.querySelector('[data-resource-title]')!;
  const field = dialog.querySelector<HTMLInputElement>('[data-resource-field]')!;
  const formWrap = dialog.querySelector<HTMLElement>('[data-dialog-form]')!;
  const success = dialog.querySelector<HTMLElement>('[data-form-success]')!;
  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element).closest<HTMLElement>('[data-resource-open]');
    if (!trigger) return;
    e.preventDefault();
    title.textContent = trigger.dataset.resourceTitle ?? 'Get this resource';
    field.value = trigger.dataset.resourceOpen ?? '';
    // Published PDFs download after the form; unpublished titles collect a "notify me".
    const file = trigger.dataset.resourceFile ?? '';
    const mode = file ? 'ready' : 'soon';
    dialog.dataset.file = file;
    $$('[data-mode]', dialog).forEach((el) => (el.hidden = el.dataset.mode !== mode));
    dialog.querySelector('[data-submit-label]')!.textContent = file ? 'Download the PDF' : 'Notify me when it is published';
    dialog.querySelector<HTMLAnchorElement>('[data-download-link]')!.href = file || '#';
    formWrap.hidden = false;
    success.hidden = true;
    dialog.showModal();
  });
  $$('[data-dialog-close]', dialog).forEach((b) => b.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
}

/* ---------- Lead forms ---------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|rediffmail|icloud)\./i;

function validate(form: HTMLFormElement) {
  let ok = true;
  $$<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea', form).forEach((el) => {
    if (el.type === 'hidden' || el.closest('.form__hp')) return;
    const wrap = el.closest('.field');
    const err = wrap?.querySelector('.field__error');
    let msg = '';
    const v = el.value.trim();
    if (el.required && !v) msg = 'Required';
    else if (el.type === 'email' && v && !EMAIL_RE.test(v)) msg = 'Enter a valid email address';
    else if (el.type === 'tel' && v && v.replace(/\D/g, '').length < 8) msg = 'Enter a valid phone number';
    wrap?.classList.toggle('is-invalid', !!msg);
    if (err) err.textContent = msg;
    if (msg && ok) { ok = false; el.focus(); }
  });
  return ok;
}

$$<HTMLFormElement>('[data-lead-form]').forEach((form) => {
  form.addEventListener('input', (e) => {
    const wrap = (e.target as Element).closest('.field.is-invalid');
    if (wrap) { wrap.classList.remove('is-invalid'); wrap.querySelector('.field__error')!.textContent = ''; }
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = form.querySelector<HTMLElement>('.form__status')!;
    status.hidden = true;
    if (!validate(form)) return;

    const email = form.querySelector<HTMLInputElement>('input[type=email]');
    if (email && FREE_MAIL.test(email.value) && !form.dataset.warned) {
      form.dataset.warned = '1';
      status.className = 'form__status is-err';
      status.textContent = 'A work email helps us prepare for the conversation. Submit again to use this address anyway.';
      status.hidden = false;
      return;
    }

    const btn = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
    const label = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    const data = Object.fromEntries(new FormData(form).entries());
    data.page = location.pathname;
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      const scope = form.closest('[data-dialog-form]')?.parentElement ?? form.parentElement!;
      const success = scope.querySelector<HTMLElement>('[data-form-success]');
      (form.closest<HTMLElement>('[data-dialog-form]') ?? form).hidden = true;
      if (success) success.hidden = false;
      const file = form.closest<HTMLElement>('[data-resource-dialog]')?.dataset.file;
      if (file) window.location.assign(file);
      form.reset();
      delete form.dataset.warned;
    } catch (err) {
      status.className = 'form__status is-err';
      status.textContent = `${(err as Error).message} Please try again, or email raghav@novaamind.com.`;
      status.hidden = false;
    } finally {
      btn.disabled = false;
      btn.innerHTML = label;
    }
  });
});

/* ---------- Count-up figures (About page) ---------- */
const counters = $$('[data-count]');
if (counters.length && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const run = (el: HTMLElement) => {
    const end = Number(el.dataset.count);
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1200);
      el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const co = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { run(en.target as HTMLElement); co.unobserve(en.target); }
  }), { threshold: 0.5 });
  counters.forEach((el) => co.observe(el));
}
