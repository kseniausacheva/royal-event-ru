(() => {
  document.querySelector('#print-agreement')?.addEventListener('click', () => window.print());
  const form = document.querySelector('#partner-form');
  if (!form) return;
  // Validate the visible step: hidden required fields must not block Enter.
  form.noValidate = true;
  let step = 0, pending = false, intakeVerified = false, settings = null;
  let submittedProfile = null, submittedReference = '';
  const panels = [...form.querySelectorAll('[data-step]')];
  const next = document.querySelector('#next-step'), back = document.querySelector('#previous-step');
  const message = document.querySelector('#form-message'), submit = document.querySelector('#submit-profile');
  const download = document.querySelector('#download-profile'), notice = document.querySelector('.form-card > .notice');
  const labels = {companyName:'Business name',legalName:'Legal name',registrationNumber:'Registration number',country:'Country',city:'Base / city',website:'Website',contactName:'Contact name',role:'Job title',email:'Email',phone:'Phone',partnerType:'Partner type',services:'Services',destinations:'Destinations',languages:'Languages',yearsExperience:'Experience (years)',capacity:'Capacity',portfolio:'Portfolio',licenses:'Licences / permits',insurance:'Insurance & safety',notes:'Additional notes'};
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const API_ORIGIN = 'https://api.talkarabicnow.online';
  const APPLICATION_CONSENT_TEXT = 'I consent to LA ROYAL EVENT for Commercial Chains LLC processing the business contact details and professional information I provide to review my partner application and contact me about possible cooperation, as explained in the Privacy Notice.';
  submit.hidden = true;
  submit.disabled = true;

  function profile() {
    const fd = new FormData(form), p = {};
    for (const key of Object.keys(labels)) p[key] = ['services','destinations','languages'].includes(key) ? fd.getAll(key) : String(fd.get(key) || '').trim();
    p.yearsExperience = p.yearsExperience === '' ? null : Number(p.yearsExperience);
    p.privacyAcknowledged = fd.has('privacyAcknowledged');
    // The first public release has no marketing subscription or opt-in.
    p.marketingOptIn = false;
    return p;
  }
  function show() {
    panels.forEach((panel, index) => {panel.hidden = index !== step;});
    back.hidden = step === 0;
    next.hidden = step === panels.length - 1;
    document.querySelector('#step-counter').textContent = 'Step ' + (step + 1) + ' of ' + panels.length;
    document.querySelectorAll('[data-progress]').forEach((element, index) => {
      element.classList.toggle('current', index === step);
      element.classList.toggle('done', index < step);
      if (index === step) element.setAttribute('aria-current', 'step'); else element.removeAttribute('aria-current');
    });
    message.textContent = '';
    if (step === panels.length - 1) {
      const p = submittedProfile || profile();
      document.querySelector('#profile-review').innerHTML = '<dl class="review-list">' + Object.entries(labels).filter(([key]) => p[key] !== null && p[key] !== '' && (!Array.isArray(p[key]) || p[key].length)).map(([key,label]) => '<div><dt>' + esc(label) + '</dt><dd>' + esc(Array.isArray(p[key]) ? p[key].join(', ') : p[key]) + '</dd></div>').join('') + '</dl>';
    }
  }
  function valid(index = step) {
    for (const field of panels[index].querySelectorAll('input,select,textarea')) {
      if (!field.checkValidity()) {
        if (step !== index) {step = index; show();}
        field.reportValidity();
        return false;
      }
    }
    if (index === 1) for (const name of ['services','destinations']) {
      if (!form.querySelector('input[name="' + name + '"]:checked')) {
        if (step !== index) {step = index; show();}
        message.textContent = 'Please select at least one ' + (name === 'services' ? 'service' : 'destination') + '.';
        form.querySelector('input[name="' + name + '"]').focus();
        return false;
      }
    }
    return true;
  }
  function move(delta) {
    if (pending || submittedProfile || (delta > 0 && !valid())) return;
    step = Math.max(0, Math.min(panels.length - 1, step + delta));
    show();
    const heading = panels[step].querySelector('h2');
    heading.setAttribute('tabindex', '-1');
    heading.focus();
  }
  function setPending(value) {
    pending = value;
    form.setAttribute('aria-busy', String(value));
    form.querySelectorAll('input,select,textarea,button').forEach(control => {control.disabled = value || !!submittedProfile;});
    download.disabled = value;
    download.hidden = intakeVerified && !submittedProfile;
    if (submittedProfile) {
      download.textContent = 'Download a copy';
      download.classList.add('secondary');
    }
    submit.disabled = value || !intakeVerified || !!submittedProfile;
    submit.textContent = value ? 'Submitting profile…' : submittedProfile ? 'Profile submitted' : 'Submit partner profile';
  }
  function setNotice(title, text) {
    if (!notice) return;
    notice.querySelector('strong').textContent = title;
    notice.querySelector('p').textContent = text;
  }
  function approvedSettings(value) {
    if (!value || value.intakeReady !== true || typeof value.apiBase !== 'string' || typeof value.privacyNoticeVersion !== 'string') return false;
    const version = value.privacyNoticeVersion.trim();
    if (!version || version.length > 80 || /draft|preview|not[\s_-]*final|pending|tbc/i.test(version)) return false;
    try {
      const url = new URL(value.apiBase);
      return url.origin === API_ORIGIN && url.pathname === '/' && !url.username && !url.password && !url.search && !url.hash;
    } catch {return false;}
  }
  async function fetchWithTimeout(url, options) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try {return await fetch(url, {...options, signal: controller.signal});}
    finally {clearTimeout(timer);}
  }
  async function verifyServer() {
    // No backend request is made unless the local release gate is open.
    if (!approvedSettings(settings)) throw new Error('Applications are not open yet. You can download your profile for later.');
    const response = await fetchWithTimeout(API_ORIGIN + '/api/partners/config', {method:'GET',mode:'cors',credentials:'omit',cache:'no-store'});
    if (!response.ok) throw new Error('Applications are temporarily unavailable. Please try again later.');
    const config = await response.json();
    if (config.intakeEnabled !== true || config.privacyNoticeVersion !== settings.privacyNoticeVersion.trim() || config.applicationConsentText !== APPLICATION_CONSENT_TEXT) throw new Error('Applications are temporarily unavailable. Please try again later.');
    return config;
  }
  async function prepareIntake() {
    try {
      const response = await fetchWithTimeout('/partners/settings.json', {credentials:'same-origin',cache:'no-store'});
      if (!response.ok) return;
      settings = await response.json();
      if (!approvedSettings(settings)) return;
      await verifyServer();
      const privacyInput = form.querySelector('input[name="privacyAcknowledged"]');
      const privacyLabel = privacyInput?.closest('label')?.querySelector('span');
      if (!privacyInput || !privacyLabel) throw new Error('The application consent control is unavailable.');
      privacyInput.checked = false;
      privacyLabel.textContent = APPLICATION_CONSENT_TEXT + ' ';
      const privacyLink = document.createElement('a');
      privacyLink.href = '/partners/privacy/#english';
      privacyLink.target = '_blank';
      privacyLink.rel = 'noopener';
      privacyLink.textContent = 'Read the Privacy Notice';
      privacyLabel.appendChild(privacyLink);
      privacyLabel.appendChild(document.createTextNode(' *'));
      intakeVerified = true;
      submit.hidden = false;
      submit.disabled = false;
      download.hidden = true;
      setNotice('Introduce your business', 'Share your expertise with La Royal Event. Our team reviews each profile against the needs of future projects.');
      const banner = document.querySelector('.preview');
      if (banner) banner.textContent = 'La Royal Event partner network · Egypt';
      for (const paragraph of panels[panels.length - 1].querySelectorAll('.notice.quiet p')) {
        paragraph.textContent = 'Submitting this application does not accept the cooperation agreement or guarantee work. Project terms are agreed separately.';
      }
    } catch {
      setNotice('Please try again later', 'Applications are temporarily unavailable. You can keep a local copy of your profile and return later. Nothing has been submitted.');
    }
  }
  async function serverError(response) {
    if (response.status === 503) return 'Applications are temporarily unavailable. Please try again later.';
    if (response.status === 409) return 'An application with these business details is already on file. Please contact our team if you need to update it.';
    try {
      const data = await response.json();
      if (typeof data.detail === 'string') return data.detail.slice(0,1000);
      if (Array.isArray(data.detail)) return data.detail.map(item => typeof item.msg === 'string' ? item.msg : 'Check the required fields.').join(' ').slice(0,1000);
    } catch {/* Gateways do not always return JSON. */}
    return 'Your application could not be confirmed. Please try again later or contact our team.';
  }
  next.addEventListener('click', () => move(1));
  back.addEventListener('click', () => move(-1));
  form.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || event.isComposing || event.ctrlKey || event.metaKey || event.target.tagName !== 'INPUT' || ['checkbox','radio'].includes(event.target.type)) return;
    event.preventDefault();
    if (step < panels.length - 1) move(1); else form.requestSubmit();
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || submittedProfile) return;
    if (step < panels.length - 1) {move(1); return;}
    for (let index = 0; index < panels.length; index++) if (!valid(index)) return;
    if (!intakeVerified) {message.textContent = 'Applications are not open yet. You can download your profile for later.'; return;}
    const payload = profile();
    setPending(true);
    message.textContent = 'Checking availability…';
    let postStarted = false;
    try {
      await verifyServer();
      message.textContent = 'Submitting your partner profile…';
      postStarted = true;
      const response = await fetchWithTimeout(API_ORIGIN + '/api/partners', {method:'POST',mode:'cors',credentials:'omit',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      if (!response.ok) throw new Error(await serverError(response));
      const result = await response.json();
      if (typeof result.reference !== 'string' || !result.reference.trim()) throw new Error('The server received the request, but its reference could not be verified. Please check with our team before submitting again.');
      submittedProfile = payload;
      submittedReference = result.reference.trim();
      message.textContent = 'Thank you. Your partner profile has been received. Reference: ' + submittedReference + '. Our team will review your details and contact you if there is a suitable opportunity. Submitting an application does not accept the cooperation agreement.';
      setNotice('Thank you for your application', 'Your reference is ' + submittedReference + '. Keep it for any follow-up. You can download a copy of your profile below.');
      message.setAttribute('tabindex', '-1');
      message.focus();
    } catch (error) {
      message.textContent = postStarted && (error instanceof TypeError || error instanceof SyntaxError || error?.name === 'AbortError')
        ? 'We could not confirm the result. Your profile may have reached our team. Please contact us before submitting again.'
        : error instanceof SyntaxError || error?.name === 'AbortError' ? 'Applications are temporarily unavailable. Please try again later.'
        : error instanceof Error ? error.message : 'The connection failed. Please try again later.';
    } finally {setPending(false);}
  });
  download.addEventListener('click', () => {
    if (pending || (!submittedProfile && !valid())) return;
    const payload = {kind:submittedProfile?'partner-profile-copy':'partner-profile-draft',schemaVersion:1,downloadedAt:new Date().toISOString(),submitted:!!submittedProfile,agreementAccepted:false,...(submittedReference?{reference:submittedReference}:{}),profile:submittedProfile||profile()};
    const blob = new Blob([JSON.stringify(payload,null,2)], {type:'application/json'});
    const url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url;
    link.download = 'La_Royal_Event_Partner_Profile.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url),1000);
    message.textContent = submittedProfile ? 'Profile copy downloaded. Application reference: ' + submittedReference + '. No agreement has been accepted.' : 'Profile downloaded. Nothing has been submitted and no agreement has been accepted.';
  });
  show();
  prepareIntake();
})();

