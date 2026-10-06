/* Static navigation and demonstration requests; the original layout is unchanged. */
(() => {
  'use strict';
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const raw = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    if (/\/api\/(scroll|client-error|sdk\/)/.test(new URL(raw, location.href).pathname)) return Promise.resolve(new Response(null, {status: 204}));
    return nativeFetch(input, init);
  };
  const beacon = navigator.sendBeacon?.bind(navigator);
  if (beacon) navigator.sendBeacon = (url, data) => /\/api\/(scroll|client-error|sdk\/)/.test(String(url)) ? true : beacon(url, data);
  const appPath = /^\/(?:login|signup|reset-password|dashboard|onboarding|app)(?:\/|$)/;
  document.addEventListener('click', event => {
    const a = event.target.closest('a[href]');
    if (!a || a.hasAttribute('download') || event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (appPath.test(url.pathname)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      location.href = '/fr/contact/';
      return;
    }
    if (url.hash && url.pathname.replace(/\/$/,'') === location.pathname.replace(/\/$/,'')) {
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (target) {
        event.preventDefault();
        event.stopImmediatePropagation();
        target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
        history.replaceState(null,'',url.pathname+url.search+url.hash);
      }
      return;
    }
    event.stopImmediatePropagation();
  }, true);
  document.addEventListener('submit', event => {
    const form = event.target;
    if (!form.matches('.hero-composer, .url-bar')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const field = form.querySelector('input:not([type=hidden])');
    const cabinet = (field?.value || '').trim();
    if (!cabinet) { field?.focus(); return; }
    const body = 'Bonjour,\n\nJe souhaite découvrir le projet pilote Swarme.\nCabinet : '+cabinet+'\n\nMerci.';
    location.href = 'mailto:contact.ocremousse@gmail.com?subject='+encodeURIComponent('Démonstration Swarme')+'&body='+encodeURIComponent(body);
  }, true);
  function prepare() {
    document.querySelectorAll('.hero-composer, .url-bar').forEach(form => {
      form.noValidate = true;
      const field = form.querySelector('input:not([type=hidden])');
      if (field) {
        if (field.type !== 'text') field.type = 'text';
        field.setCustomValidity('');
        const button = form.querySelector('button[type=submit]');
        const disabled = !field.value.trim();
        if (button && button.disabled !== disabled) button.disabled = disabled;
      }
    });
    document.querySelectorAll('a[href]').forEach(a => {
      const u = new URL(a.href,location.href);
      if (u.origin === location.origin && appPath.test(u.pathname)) a.href = '/fr/contact/';
      const question = 'Quel est le projet Swarme pour organiser les diligences LCB-FT des petits cabinets comptables ?';
      if (u.hostname === 'chatgpt.com' && u.searchParams.has('prompt')) {
        const href = 'https://chatgpt.com/?prompt='+encodeURIComponent(question);
        if (a.href !== href) a.href = href;
      }
      if (u.hostname === 'claude.ai' && u.searchParams.has('q')) {
        const href = 'https://claude.ai/new?q='+encodeURIComponent(question);
        if (a.href !== href) a.href = href;
      }
    });
  }
  document.addEventListener('input',prepare);
  document.addEventListener('DOMContentLoaded',()=>{
    prepare();
    new MutationObserver(prepare).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['disabled','href']});
  });
})();
