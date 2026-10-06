/* Swarme: static navigation and local preview bridge. */
(() => {
  'use strict';
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const raw = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const url = new URL(raw, location.href);
    if (/\/api\/(scroll|client-error|sdk\/)/.test(url.pathname)) return Promise.resolve(new Response(null, {status: 204}));
    return nativeFetch(input, init);
  };
  const nativeBeacon = navigator.sendBeacon?.bind(navigator);
  if (nativeBeacon) navigator.sendBeacon = (url, data) => /\/api\/(scroll|client-error|sdk\/)/.test(String(url)) ? true : nativeBeacon(url, data);

  function domainOf(value) {
    try {
      const url = new URL(/^[a-z]+:\/\//i.test(value.trim()) ? value.trim() : 'https://' + value.trim());
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || !url.hostname.includes('.')) return null;
      return url.hostname.replace(/^www\./, '').toLowerCase();
    } catch { return null; }
  }
  function checkDomain(field) {
    const domain = domainOf(field?.value || '');
    if (field) field.setCustomValidity(domain ? '' : 'Saisissez une adresse de site valide, par exemple votreentreprise.com.');
    if (!domain) field?.reportValidity();
    return domain;
  }
  function message(form, text) {
    let note = form.querySelector('.swarme-service-status');
    if (!note) {
      note = document.createElement('p');
      note.className = 'swarme-service-status check-message';
      note.setAttribute('role', 'status');
      note.style.cssText = 'grid-column:1/-1;line-height:1.5;margin:16px 0 0';
      form.append(note);
    }
    note.textContent = text;
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    if (event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const samePage = url.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, '');
    if (url.hash && samePage) {
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (target) {
        event.preventDefault();
        event.stopImmediatePropagation();
        target.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
        history.replaceState(null, '', url.pathname + url.search + url.hash);
      }
      return;
    }
    // Keep the browser's normal navigation; compiled client routing needs a Next server.
    event.stopImmediatePropagation();
  }, true);

  document.addEventListener('submit', event => {
    const form = event.target;
    if (form.matches('.hero-composer, .url-bar')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const field = form.querySelector('input:not([type=hidden])');
      const domain = checkDomain(field);
      if (domain) location.href = '/fr/ai-visibility-check/?domain=' + encodeURIComponent(domain);
    } else if (form.matches('.check-flow')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const domain = checkDomain(form.querySelector('[name=domain]'));
      if (!domain || !form.reportValidity()) return;
      message(form, 'Le formulaire Swarme est prêt. Le service d’analyse IA doit être connecté pour produire un rapport réel ; aucun e-mail ni aucune demande n’a été envoyé.');
    }
  }, true);

  document.addEventListener('input', event => {
    if (event.target.matches('.hero-composer input, .url-bar input, .check-flow [name=domain]')) event.target.setCustomValidity('');
  }, true);

  function prepare() {
    const field = document.querySelector('.check-flow [name=domain]');
    const domain = new URLSearchParams(location.search).get('domain');
    if (field && domain && !field.value) {
      field.value = domain;
      field.dispatchEvent(new Event('input', {bubbles: true}));
    }
    document.querySelectorAll('input[name^="$ACTION"]').forEach(field => field.remove());
    document.querySelectorAll('form.check-flow').forEach(form => { form.removeAttribute('action'); form.removeAttribute('enctype'); });
  }
  document.addEventListener('DOMContentLoaded', () => {
    prepare();
    const observer = new MutationObserver(() => {
      const field = document.querySelector('.check-flow [name=domain]');
      if (field && !field.value) prepare();
    });
    observer.observe(document.body, {childList: true, subtree: true});
  });
})();
