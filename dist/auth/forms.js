(()=>{
 const mode=document.body.dataset.mode,form=document.querySelector('.signin-form');
 const show=(message)=>{let p=document.querySelector('.auth-status');if(!p){p=document.createElement('p');p.className='signin-note auth-status';p.setAttribute('role','status');document.querySelector('.signin-card').append(p)}p.textContent=message};
 const tabs=[...document.querySelectorAll('[role="tab"]')];
 tabs.forEach((tab,i)=>tab.addEventListener('click',()=>{const query=new URLSearchParams(location.search);if(!i&&!query.has('next'))query.set('next','/dashboard/');location.href=(i?'/signup/':'/login/')+(query.size?'?'+query:'')}));
 document.querySelectorAll('.field-eye').forEach(b=>b.addEventListener('click',()=>{const p=b.closest('.field').querySelector('input');const on=p.type==='password';p.type=on?'text':'password';b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label',on?'Hide password':'Show password')}));
 const slide=document.querySelector('.slide');let start=0;
 const toggle=()=>{const on=slide.getAttribute('aria-checked')!=='true';slide.setAttribute('aria-checked',String(on));slide.classList.toggle('is-on',on);slide.querySelector('.slide-fill').style.width=on?'100%':'0%';slide.querySelector('.slide-knob').style.transform=on?'translateX('+(slide.clientWidth-36)+'px)':'translateX(0)';slide.querySelector('.slide-label').textContent=on?'You’ll stay signed in':'Slide to stay signed in';document.querySelector('[name="remember"]').checked=on};
 if(slide){slide.addEventListener('click',toggle);slide.addEventListener('keydown',e=>{if([' ','Enter','ArrowRight','ArrowLeft'].includes(e.key)){e.preventDefault();toggle()}});slide.addEventListener('pointerdown',e=>{start=e.clientX;slide.setPointerCapture(e.pointerId)});slide.addEventListener('pointerup',e=>{if(e.clientX-start>30){toggle();const cancel=x=>{x.stopImmediatePropagation();slide.removeEventListener('click',cancel,true)};slide.addEventListener('click',cancel,true)}})}
 const pw=document.querySelector('[name="password"]'),again=document.querySelector('[name="password-again"]');
 const rules=()=>{const v=pw?.value||'';return[v.length>=12,/[a-z]/.test(v),/[A-Z]/.test(v),/\d/.test(v),/[^a-zA-Z0-9]/.test(v),!!v&&v===again?.value]};
 if(mode==='signup'){
  const update=()=>{const checks=rules();document.querySelectorAll('.pw-rules li').forEach((li,i)=>li.classList.toggle('is-met',checks[i]));document.querySelectorAll('.is-meter').forEach((f,i)=>f.style.setProperty('--fill',(i?(checks[5]?100:0):checks.slice(0,5).filter(Boolean).length*20)+'%'));again.setCustomValidity(again.value&&again.value!==pw.value?'Both passwords must match.':'')};
  pw.addEventListener('input',update);again.addEventListener('input',update);
 }
 if(form&&mode!=='reset'){const note=document.createElement('p');note.className='signin-note';note.textContent='Mode démo : aucun compte réel ni mot de passe enregistré.';form.append(note)}
 form?.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  if(mode==='signup'&&!rules().every(Boolean)){show('Please meet all six password requirements.');return}
  if(mode==='reset'){show('Mode démo : aucun code n’a été envoyé. Le service d’envoi des e-mails reste à connecter.');return}
  const email=form.querySelector('[name="email"]').value.trim();
  const name=form.querySelector('[name="name"]')?.value.trim()||email.split('@')[0];
  let project=null;try{localStorage.setItem('swarme.user',JSON.stringify({email,name,demo:true}));project=JSON.parse(localStorage.getItem('swarme.project')||'null')}catch{}
  form.querySelectorAll('input[type="password"],input[name="password"],input[name="password-again"]').forEach(field=>field.value='');
  const query=new URLSearchParams(location.search);let destination=mode==='signup'||!project?.complete?'/onboarding/':'/dashboard/';
  const next=query.get('next');if(mode==='login'&&project?.complete&&next){try{const url=new URL(next,location.origin);if(url.origin===location.origin&&url.pathname.startsWith('/')&&!url.pathname.startsWith('//'))destination=url.pathname+url.search+url.hash}catch{}}
  const plan=query.get('plan'),interval=query.get('interval');if(destination==='/onboarding/'&&(plan||interval)){const offer=new URLSearchParams();if(plan)offer.set('plan',plan);if(interval)offer.set('interval',interval);destination+='?'+offer}
  location.href=destination;
 });
 document.querySelectorAll('.signin-sso form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();show('La connexion Google sera disponible après la configuration du service d’authentification Swarme.')}));
})();
