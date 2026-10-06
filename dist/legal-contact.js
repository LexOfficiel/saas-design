/* Opens a voluntary email draft. Nothing is submitted by this website. */
(() => {
  'use strict';
  const form = document.querySelector('[data-email-draft]');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const name = String(fields.get('name') || '').trim();
    const cabinet = String(fields.get('cabinet') || '').trim();
    const message = String(fields.get('message') || '').trim();
    const body = ['Bonjour,', '', 'Je souhaite échanger sur le projet pilote Swarme.', name ? 'Nom : ' + name : '', cabinet ? 'Cabinet : ' + cabinet : '', '', message, '', 'Merci.'].filter((line, index, lines) => line || lines[index - 1] !== '').join('\n');
    const draft = 'mailto:contact.ocremousse@gmail.com?subject=' + encodeURIComponent('Swarme — démo et projet pilote') + '&body=' + encodeURIComponent(body);
    document.getElementById('contact-status').textContent = 'Un brouillon va s’ouvrir dans votre messagerie. Vous choisissez de l’envoyer ; aucune demande n’a été envoyée par le site.';
    location.href = draft;
  });
  form.hidden = false;
})();
