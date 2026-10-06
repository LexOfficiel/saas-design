/* Keep the reproduced landing page local; service and editorial routes belong to Swarme. */
(()=>{
  const nativeFetch=window.fetch.bind(window);
  window.fetch=(input,init)=>{
    const raw=typeof input==='string'?input:input instanceof URL?input.href:input.url;
    const url=new URL(raw,location.href);
    if(/\/api\/(scroll|client-error|sdk\/)/.test(url.pathname))return Promise.resolve(new Response(null,{status:204}));
    return nativeFetch(input,init);
  };
  const beacon=navigator.sendBeacon?.bind(navigator);
  if(beacon)navigator.sendBeacon=(url,data)=>/\/api\/(scroll|client-error|sdk\/)/.test(String(url))?true:beacon(url,data);
  document.addEventListener('click',event=>{
    const a=event.target.closest('a[href]');if(!a)return;
    const url=new URL(a.href,location.href);
    if(url.hostname==='app.sauror.com'){
      event.preventDefault();event.stopImmediatePropagation();
      location.href=/signup|register/.test(url.pathname)?'/signup/':'/login/?next=%2Fdashboard';return;
    }
    if(url.origin!==location.origin)return;
    if(/^\/(login|signup|reset-password)(\/|$)/.test(url.pathname)){event.preventDefault();event.stopImmediatePropagation();location.href=url.href;return;}
    event.preventDefault();event.stopImmediatePropagation();
    if((url.pathname==='/'||/^\/fr\/?$/.test(url.pathname))&&url.hash){
      document.querySelector(url.hash)?.scrollIntoView({behavior:'smooth'});history.replaceState(null,'',url.hash);return;
    }
    if(url.pathname==='/'||/^\/fr\/?$/.test(url.pathname)){window.scrollTo({top:0,behavior:'smooth'});return;}
    window.location.href='https://sauror.com'+url.pathname+url.search+url.hash;
  },true);
  document.addEventListener('submit',event=>{
    const form=event.target;if(!form.matches('.hero-composer,.url-bar'))return;
    const field=form.querySelector('input');if(!field?.value.trim())return;
    event.preventDefault();event.stopImmediatePropagation();
    location.href='https://sauror.com/fr/ai-visibility-check?domain='+encodeURIComponent(field.value.trim());
  },true);
  const localizeAccountLinks=()=>document.querySelectorAll('a[href]').forEach(a=>{
    const url=new URL(a.href,location.href);if(url.hostname!=='app.sauror.com')return;
    a.href=/signup|register/.test(url.pathname)?'/signup/':'/login/?next=%2Fdashboard';a.removeAttribute('target');
  });
  document.addEventListener('DOMContentLoaded',()=>{localizeAccountLinks();new MutationObserver(localizeAccountLinks).observe(document.body,{childList:true,subtree:true});});
})();
