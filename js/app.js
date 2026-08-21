/* JOBXP - prototipo académico en JavaScript puro + Bootstrap.
   Los datos se guardan en localStorage para poder probar la aplicación sin backend. */
const DB_KEY = 'jobxp_db_v4';

const seed = {
  users: [
    {id:1,role:'joven',name:'Camila Rojas',email:'camila@jobxp.cl',password:'123456',birth:'2005-05-14',zone:'Santiago Centro',cv:'Camila_Rojas_CV.pdf',disability:true,needs:['bajo_ruido','instrucciones_escritas','estacion_sentada'],skills:['Organización','Herramientas digitales','Atención al detalle','Responsabilidad'],availability:'Mañana',rating:4.8,experiences:3,rut:'12.345.678-5',passportExperiences:[{title:'Digitalización de documentos',company:'Café Santiago',hours:4,date:'Agosto 2026',skills:['Organización','Herramientas digitales','Responsabilidad']},{title:'Gestión de redes sociales',company:'Mercado Local',hours:4,date:'Julio 2026',skills:['Comunicación escrita','Herramientas digitales','Creatividad']},{title:'Control de inventario',company:'Tienda Urbana',hours:4,date:'Junio 2026',skills:['Organización','Atención al detalle','Responsabilidad']}]},
    {id:2,role:'empresa',name:'JOBXP',email:'empresa@jobxp.cl',password:'123456',zone:'Santiago Centro',companySize:'pequena',totalWorkers:25,activeYouth:0,rating:4.7,inclusive:true,companyDescription:'Plataforma de microexperiencias laborales que conecta jóvenes con empresas de forma segura, transparente e inclusiva.',companySeeking:'Buscamos jóvenes responsables, con ganas de aprender y desarrollar habilidades mediante experiencias reales.'}
  ],
  jobs: [
    {id:101,title:'Digitalización de documentos',company:'Café Santiago',companyId:11,zone:'Santiago Centro',mode:'Presencial',hours:4,pay:25000,negotiable:false,schedule:'09:00 - 13:00',experience:'Administración y gestión documental',skills:['Organización','Herramientas digitales','Atención al detalle','Responsabilidad'],tags:['bajo_ruido','instrucciones_escritas','estacion_sentada'],description:'Apoyo en la digitalización y organización de documentos administrativos. Ideal para tareas ordenadas y detallistas.',inclusive:true,rating:4.8,applications:6,image:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80'},
    {id:102,title:'Gestión de redes sociales',company:'Mercado Local',companyId:12,zone:'Providencia',mode:'Remoto',hours:4,pay:28000,negotiable:true,schedule:'Horario flexible',experience:'Marketing digital y comunicación',skills:['Herramientas digitales','Comunicación escrita'],tags:['instrucciones_escritas','teletrabajo'],description:'Programación de publicaciones, revisión de mensajes y apoyo en contenidos para redes sociales.',inclusive:true,rating:4.9,applications:9,image:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80'},
    {id:103,title:'Control de inventario',company:'Tienda Urbana',companyId:13,zone:'Santiago Norte',mode:'Presencial',hours:4,pay:24000,negotiable:false,schedule:'14:00 - 18:00',experience:'Logística y control de stock',skills:['Organización','Atención al detalle'],tags:['estacion_sentada','movilidad_reducida'],description:'Registro de productos, conteo y actualización de inventario siguiendo instrucciones visuales.',inclusive:true,rating:4.5,applications:4,image:'images/almacen.jpg'},
    {id:104,title:'Apoyo en diseño de piezas gráficas',company:'Estudio Creativo',companyId:14,zone:'Ñuñoa',mode:'Remoto',hours:3,pay:22000,negotiable:true,schedule:'Flexible',experience:'Diseño gráfico básico',skills:['Herramientas digitales','Creatividad'],tags:['teletrabajo','instrucciones_escritas'],description:'Creación de piezas simples para redes y catálogos con acompañamiento del equipo.',inclusive:true,rating:4.6,applications:3,image:'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80'},
    {id:105,title:'Soporte de chat para clientes',company:'Servicios Digitales',companyId:15,zone:'Las Condes',mode:'Remoto',hours:4,pay:30000,negotiable:true,schedule:'10:00 - 14:00',experience:'Atención al cliente digital',skills:['Comunicación escrita','Responsabilidad'],tags:['teletrabajo','instrucciones_escritas'],description:'Responder consultas por chat y registrar solicitudes en una plataforma digital.',inclusive:true,rating:4.9,applications:8,image:'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80'}
  ],
  companies:[
    {id:11,name:'Café Santiago',zone:'Santiago Centro',size:'micro',workers:8,rating:4.8,inclusive:true,description:'Cafetería local con experiencias administrativas.'},
    {id:12,name:'Mercado Local',zone:'Providencia',size:'pequena',workers:25,rating:4.9,inclusive:true,description:'Comercio local y proyectos digitales.'},
    {id:13,name:'Tienda Urbana',zone:'Santiago Norte',size:'pequena',workers:35,rating:4.5,inclusive:true,description:'Tienda y operaciones de inventario.'},
    {id:14,name:'Estudio Creativo',zone:'Ñuñoa',size:'micro',workers:6,rating:4.6,inclusive:true,description:'Diseño y comunicación digital.'},
    {id:15,name:'Servicios Digitales',zone:'Las Condes',size:'mediana',workers:90,rating:4.9,inclusive:true,description:'Servicios de atención y soporte remoto.'}
  ],
  applications:[], ratings:[], reports:[], attendance:[], messages:[], cvFiles:{}
};

function db(){
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(DB_KEY) || 'null');
  } catch (error) {
    console.warn('JOBXP: datos locales dañados; se reconstruirá la base demo.', error);
    localStorage.removeItem(DB_KEY);
  }

  if(!data || !Array.isArray(data.users) || !Array.isArray(data.jobs)){
    data = structuredClone(seed);
  }

  data.applications ||= [];
  data.messages ||= [];
  data.ratings ||= [];
  data.reports ||= [];
  data.attendance ||= [];
  data.cvFiles ||= [];
  data.users ||= [];

  data.users.forEach(u=>{
    u.needs ||= [];
    u.conditions ||= [];
    u.otherCondition ||= '';
    u.rut ||= '';
    if(u.role==='empresa'){
      u.companyDescription ||= '';
      u.companySeeking ||= '';
    }
  });

  const camila=data.users.find(u=>u.id===1||u.email==='camila@jobxp.cl');
  if(camila){
    camila.experiences=3;
    camila.rut ||= '12.345.678-5';
    camila.passportExperiences=[
      {title:'Digitalización de documentos',company:'Café Santiago',hours:4,date:'Agosto 2026',skills:['Organización','Herramientas digitales','Responsabilidad']},
      {title:'Gestión de redes sociales',company:'Mercado Local',hours:4,date:'Julio 2026',skills:['Comunicación escrita','Herramientas digitales','Creatividad']},
      {title:'Control de inventario',company:'Tienda Urbana',hours:4,date:'Junio 2026',skills:['Organización','Atención al detalle','Responsabilidad']}
    ];
  }

  const inventario=data.jobs.find(j=>j.id===103);
  if(inventario) inventario.image='images/almacen.jpg';

  if(!Array.isArray(data.companies)) data.companies=[];
  if(!data.companies.some(c=>c.id===2)){
    data.companies.push({
      id:2,name:'JOBXP',zone:'Santiago Centro',size:'pequena',workers:25,rating:4.7,
      inclusive:true,
      description:'Plataforma de microexperiencias laborales que conecta jóvenes con empresas de forma segura, transparente e inclusiva.',
      seeking:'Buscamos jóvenes responsables, con ganas de aprender y desarrollar habilidades mediante experiencias reales.'
    });
  }

  saveDB(data);
  return data;
}

function saveDB(data){
  try {
    localStorage.setItem(DB_KEY,JSON.stringify(data));
    return true;
  } catch(error) {
    console.error('JOBXP: no se pudo guardar la base local.',error);
    toast('No se pudieron guardar los cambios en este navegador.','danger');
    return false;
  }
}

function currentUser(){
  const data=db();
  const id=Number(localStorage.getItem('jobxp_current'));
  return data.users.find(u=>u.id===id) || null;
}
function setCurrent(id){localStorage.setItem('jobxp_current',id);}
function logout(){
  localStorage.removeItem('jobxp_current');
  // Si ya estamos en #/inicio, cambiar el hash no dispara hashchange; renderizamos manualmente.
  if(location.hash === '#/inicio' || location.hash === '') render();
  else { location.hash='#/inicio'; setTimeout(render,0); }
  toast('Sesión cerrada correctamente','success');
}
function money(n){return '$'+Number(n).toLocaleString('es-CL')}
function esc(s){return String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}
function initials(name){return esc((name||'JOBXP').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase())}
function toast(msg,type='success'){const id='t'+Date.now();document.querySelector('#toastContainer').insertAdjacentHTML('beforeend',`<div id="${id}" class="toast align-items-center text-bg-${type} border-0" role="alert"><div class="d-flex"><div class="toast-body">${msg}</div><button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div></div>`);new bootstrap.Toast(document.getElementById(id),{delay:3200}).show()}
function requireLogin(){if(!currentUser()){location.hash='#/login';return false}return true}
function goEmpresa(){
  const u=currentUser();
  if(!u){ location.hash='#/login'; return; }
  if(u.role!=='empresa'){ location.hash='#/inicio'; return; }
  if(location.hash==='#/empresa'){ empresa(); }
  else { location.hash='#/empresa'; }
}
function closeMobileNav(){const nav=document.getElementById('mainNav');if(nav?.classList.contains('show'))bootstrap.Collapse.getOrCreateInstance(nav).hide()}

const TAGS={bajo_ruido:'Bajo nivel de ruido',instrucciones_escritas:'Instrucciones escritas',estacion_sentada:'Estación sentada',movilidad_reducida:'Movilidad reducida',teletrabajo:'Teletrabajo',accesibilidad_motriz:'Accesibilidad motriz',luz_tenue:'Luz tenue'};
function tag(t){return `<span class="tag ${t==='teletrabajo'?'green':''}"><i class="bi bi-check2"></i>${TAGS[t]||esc(t)}</span>`}
function matchJob(user,job){
  if(!user || user.role!=='joven') return 80;
  const needs=user.needs||[]; const tags=job.tags||[];
  if(!needs.length)return 78;
  const hits=needs.filter(n=>tags.includes(n)).length;
  return Math.min(99,78+Math.round((hits/needs.length)*21));
}
function recommendedJobs(user,jobs){return [...jobs].sort((a,b)=>matchJob(user,b)-matchJob(user,a))}
function jobCard(job,user){const m=matchJob(user,job);return `<div class="cardx job-card p-3">
  <img class="job-img w-100 mb-3" src="${job.image}" alt="Imagen de ${esc(job.title)}">
  <div class="d-flex justify-content-between gap-2"><span class="match">${m}% Match</span><button class="btn btn-sm btn-light rounded-circle" onclick="saveJob(${job.id})" aria-label="Guardar"><i class="bi bi-heart"></i></button></div>
  <h5 class="fw-bold mt-3 mb-1">${esc(job.title)}</h5><div class="text-muted small mb-2">${esc(job.company)} ${job.inclusive?'<span class="badge badge-inclusive ms-1">✓ Inclusiva</span>':''}</div>
  <div class="small text-muted d-flex flex-wrap gap-2 mb-2"><span><i class="bi bi-clock"></i> ${job.hours} h</span><span><i class="bi bi-geo-alt"></i> ${esc(job.zone)}</span><span><i class="bi bi-house"></i> ${esc(job.mode)}</span></div>
  <div class="fw-bold text-success fs-5">${money(job.pay)}</div><div class="small ${job.negotiable?'text-primary':'text-danger'} mb-2">${job.negotiable?'Sueldo negociable':'Sueldo no negociable'}</div>
  <div class="d-flex flex-wrap gap-1 mb-3">${job.tags.slice(0,3).map(tag).join('')}</div>
  <a class="btn btn-primary w-100" href="#/experiencia/${job.id}">Ver experiencia</a>
</div>`}

function renderNav(){
  const u=currentUser(); const box=document.getElementById('navAccount');
  box.innerHTML=u?`<div class="d-flex align-items-center gap-2"><div class="dropdown"><button class="btn btn-light border dropdown-toggle" type="button" data-bs-toggle="dropdown"><span class="avatar d-inline-grid me-2" style="width:32px;height:32px;font-size:.7rem">${initials(u.name)}</span>${esc(u.name.split(' ')[0])}</button><ul class="dropdown-menu dropdown-menu-end"><li><a class="dropdown-item" href="#/perfil"><i class="bi bi-person me-2"></i>Mi perfil</a></li>${u.role==='joven'?'<li><a class="dropdown-item" href="#/postulaciones"><i class="bi bi-send me-2"></i>Mis postulaciones</a></li><li><a class="dropdown-item" href="#/mensajes"><i class="bi bi-chat-dots me-2"></i>Mensajes</a></li><li><a class="dropdown-item" href="#/pasaporte"><i class="bi bi-award me-2"></i>Pasaporte laboral</a></li><li><a class="dropdown-item" href="#/evaluaciones"><i class="bi bi-star me-2"></i>Evaluar empresas</a></li>':'<li><a class="dropdown-item" href="#/postulaciones"><i class="bi bi-people me-2"></i>Postulaciones recibidas</a></li><li><a class="dropdown-item" href="#/mensajes"><i class="bi bi-chat-dots me-2"></i>Mensajes</a></li><li><a class="dropdown-item" href="#/evaluaciones"><i class="bi bi-star me-2"></i>Evaluar jóvenes</a></li>'}<li><hr class="dropdown-divider"></li><li><button type="button" class="dropdown-item text-danger" id="logoutBtn"><i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión</button></li></ul></div></div>`:`<a href="#/login" class="btn btn-outline-primary">Iniciar sesión</a><a href="#/registro" class="btn btn-primary">Registrarme</a>`;
  const logoutBtn=document.getElementById('logoutBtn');
  if(logoutBtn) logoutBtn.addEventListener('click',logout);
}

function render(){
  try {
    renderNav();
    closeMobileNav();

    const hash=location.hash||'#/inicio';
    const parts=hash.split('/');
    const route=parts[1]||'inicio';
    const id=parts[2] ? decodeURIComponent(parts[2]) : null;

    const routes={
      inicio: home,
      login: login,
      registro: registro,
      explorar: explorar,
      experiencia: ()=>detalle(Number(id)),
      perfil: openProfile,
      pasaporte: pasaporte,
      empresa: ()=> id ? empresaDetalle(Number(id)) : empresa(),
      publicar: publicar,
      'como-funciona': comoFunciona,
      inclusion: inclusion,
      empresas: empresas,
      evaluaciones: evaluaciones,
      asistencia: asistencia,
      postulaciones: postulaciones,
      mensajes: mensajes
    };

    if(route==='empresa' && !id && !currentUser()){
      location.hash='#/login';
      return;
    }
    if(route==='empresa' && !id && currentUser()?.role!=='empresa'){
      location.hash='#/inicio';
      return;
    }

    const handler=routes[route];
    if(typeof handler!=='function'){
      notFound();
    } else {
      handler();
    }

    document.querySelectorAll('.nav-link').forEach(a=>{
      a.classList.toggle(
        'active',
        a.getAttribute('href')===hash ||
        (route==='experiencia' && a.getAttribute('href')==='#/explorar')
      );
    });
  } catch(error) {
    console.error('JOBXP: error de navegación',error);
    const app=document.querySelector('#app');
    if(app){
      app.innerHTML=`<div class="cardx p-5 text-center my-5">
        <i class="bi bi-exclamation-triangle fs-1 text-warning"></i>
        <h2 class="fw-bold mt-3">No pudimos cargar esta sección</h2>
        <p class="text-muted">La aplicación recuperó la navegación para que puedas continuar sin perder tus datos.</p>
        <button class="btn btn-primary" onclick="location.hash='#/inicio'">Volver al inicio</button>
      </div>`;
    }
  }
}

function openProfile(){
  const u=currentUser();
  if(!u){ location.hash='#/login'; return; }
  if(u.role==='empresa') empresaPerfil();
  else perfil();
}
function home(){
  const u=currentUser(); const data=db(); const jobs= data.jobs;
  if(u?.role==='empresa'){empresa();return}
  const list=recommendedJobs(u,jobs).slice(0,3);
  document.querySelector('#app').innerHTML=`<section class="hero mb-5"><div class="row align-items-center g-4"><div class="col-lg-7"><span class="badge rounded-pill text-primary bg-white border px-3 py-2 mb-3">PLATAFORMA INCLUSIVA</span><h1>Tu primera <span>experiencia laboral</span> comienza aquí.</h1><p class="mt-3">Conecta con microexperiencias reales, desarrolla habilidades y construye un historial laboral certificado, incluso si aún no tienes experiencia.</p><div class="d-flex flex-wrap gap-2 mt-4"><a href="#/explorar" class="btn btn-primary btn-lg px-4">Explorar experiencias</a>${u?'<a href="#/perfil" class="btn btn-light btn-lg px-4 border">Editar mi perfil</a>':'<a href="#/registro" class="btn btn-light btn-lg px-4 border">Crear cuenta</a>'}</div><div class="d-flex flex-wrap gap-4 mt-4 small fw-semibold"><span><i class="bi bi-briefcase text-success"></i> Sin experiencia previa</span><span><i class="bi bi-heart text-success"></i> Match personalizado</span><span><i class="bi bi-person-check text-success"></i> Inclusión asistida</span><span><i class="bi bi-patch-check text-success"></i> Experiencia certificada</span></div></div><div class="col-lg-5"><div class="hero-art"><div class="mini-phone"><div class="mini-screen"><div class="d-flex justify-content-between mb-3"><strong>JOBXP</strong><span class="badge bg-success-subtle text-success">96% Match</span></div><div class="cardx p-3"><div class="small text-muted">Recomendado para ti</div><h6 class="fw-bold mt-2">Digitalización de documentos</h6><div class="small text-muted">Santiago Centro · 4 horas</div><div class="fw-bold text-success mt-2">$25.000</div><div class="d-flex flex-wrap gap-1 mt-2">${tag('bajo_ruido')}${tag('instrucciones_escritas')}</div></div></div></div></div></div></div></section><section class="mb-5"><div class="d-flex justify-content-between align-items-end mb-3"><div><h2 class="section-title mb-1">Experiencias recomendadas para ti</h2><div class="text-muted">Priorizamos las opciones que coinciden con tu zona y preferencias de accesibilidad.</div></div><a href="#/explorar" class="fw-bold text-decoration-none">Ver todas →</a></div><div class="row g-3">${list.map(j=>`<div class="col-md-6 col-lg-4">${jobCard(j,u)}</div>`).join('')}</div></section><section class="row g-4 mb-4"><div class="col-lg-7"><div class="cardx p-4 h-100"><h3 class="section-title">¿Cómo funciona?</h3><div class="row g-3 mt-2"><div class="col-md-3"><strong class="text-primary">01</strong><h6 class="fw-bold mt-2">Crea tu perfil</h6><small class="text-muted">Indica habilidades, zona, disponibilidad y preferencias.</small></div><div class="col-md-3"><strong class="text-primary">02</strong><h6 class="fw-bold mt-2">Encuentra tu match</h6><small class="text-muted">El algoritmo prioriza experiencias aptas para ti.</small></div><div class="col-md-3"><strong class="text-primary">03</strong><h6 class="fw-bold mt-2">Realiza la experiencia</h6><small class="text-muted">Cumple tareas reales con acompañamiento.</small></div><div class="col-md-3"><strong class="text-primary">04</strong><h6 class="fw-bold mt-2">Certifica</h6><small class="text-muted">Recibe evaluación y suma experiencia.</small></div></div></div></div><div class="col-lg-5"><div class="cardx p-4 h-100"><h3 class="section-title">Inclusión asistida</h3><p class="text-muted">Las empresas pueden indicar adaptaciones concretas y recibir una etiqueta de Empresa Inclusiva.</p><div class="d-flex flex-wrap gap-2">${tag('accesibilidad_motriz')}${tag('teletrabajo')}${tag('bajo_ruido')}${tag('instrucciones_escritas')}</div><a href="#/inclusion" class="btn btn-soft mt-3">Conocer las adaptaciones</a></div></div></section>`;
}

function login(){document.querySelector('#app').innerHTML=`<div class="row justify-content-center py-5"><div class="col-md-7 col-lg-5"><div class="cardx p-4 p-md-5"><div class="text-center mb-4"><div class="brand mb-2">JOB<span>XP</span></div><h2 class="fw-bold">Iniciar sesión</h2><p class="text-muted">Solo necesitas tu correo y contraseña.</p></div><form onsubmit="handleLogin(event)"><div class="mb-3"><label class="form-label fw-semibold">Correo electrónico</label><input id="loginEmail" type="email" class="form-control" required placeholder="tu@correo.cl"></div><div class="mb-3"><label class="form-label fw-semibold">Contraseña</label><input id="loginPass" type="password" class="form-control" required minlength="6" placeholder="••••••"></div><button type="submit" class="btn btn-primary w-100 py-2">Entrar</button></form><div class="alert alert-light border mt-4 small"><strong>Cuenta demo:</strong><br>Joven: camila@jobxp.cl / 123456<br>Empresa: empresa@jobxp.cl / 123456</div><p class="text-center mt-3 mb-0 text-muted">¿No tienes cuenta? <a href="#/registro">Registrarme</a></p></div></div></div>`}
function handleLogin(e){e.preventDefault();const d=db();const u=d.users.find(x=>x.email.toLowerCase()===document.getElementById('loginEmail').value.toLowerCase()&&x.password===document.getElementById('loginPass').value);if(!u){toast('Correo o contraseña incorrectos','danger');return}setCurrent(u.id);toast('Sesión iniciada correctamente');location.hash=u.role==='joven'?'#/inicio':'#/empresa'}

function registro(){document.querySelector('#app').innerHTML=`<div class="row justify-content-center py-3"><div class="col-lg-8"><div class="cardx p-4 p-md-5"><div class="text-center mb-4"><h2 class="fw-bold">Crea tu cuenta en JOBXP</h2><p class="text-muted">Completa tus datos para encontrar microexperiencias seguras e inclusivas.</p></div><div class="btn-group w-100 mb-4" role="group"><input type="radio" class="btn-check" name="role" id="roleJ" value="joven" checked onchange="toggleRegRole()"><label class="btn btn-outline-primary" for="roleJ">👤 Soy joven</label><input type="radio" class="btn-check" name="role" id="roleE" value="empresa" onchange="toggleRegRole()"><label class="btn btn-outline-primary" for="roleE">🏢 Soy empresa</label></div><form onsubmit="handleRegistro(event)"><div id="youngFields"><div class="row g-3"><div class="col-md-6"><label class="form-label fw-semibold">Nombre completo</label><input id="regName" class="form-control" required></div><div class="col-md-6"><label class="form-label fw-semibold">Fecha de nacimiento</label><input id="regBirth" type="date" class="form-control" required></div><div class="col-md-6"><label class="form-label fw-semibold">RUT (ficticio para el prototipo)</label><input id="regRut" class="form-control" placeholder="Ej. 12.345.678-5" required></div><div class="col-md-6"><label class="form-label fw-semibold">Correo electrónico</label><input id="regEmail" type="email" class="form-control" required></div><div class="col-md-6"><label class="form-label fw-semibold">Contraseña</label><input id="regPass" type="password" minlength="6" class="form-control" required></div><div class="col-md-6"><label class="form-label fw-semibold">Zona / comuna</label><input id="regZone" class="form-control" placeholder="Ej. Santiago Centro" required></div><div class="col-md-6"><label class="form-label fw-semibold">Currículum</label><input id="regCV" type="file" class="form-control" accept=".pdf,.doc,.docx"></div></div><hr class="my-4"><label class="form-label fw-semibold">¿Tienes alguna discapacidad, neurodivergencia o necesitas adaptaciones?</label><select id="regDisability" class="form-select" onchange="document.getElementById('needsBox').classList.toggle('d-none',this.value!=='si')"><option value="no">No / Prefiero no indicarlo</option><option value="si">Sí, quiero configurar mis preferencias</option></select><div id="needsBox" class="mt-3 d-none"><div class="privacy-note mb-3"><i class="bi bi-lock me-1"></i> Estas preferencias son privadas y se usan para mejorar tus recomendaciones.</div><h6 class="fw-bold">Condición o espectro (opcional)</h6><div class="row g-2 mb-3">${Object.entries({tdah:'TDAH',tea:'TEA / espectro autista',tourette:'Síndrome de Tourette',ansiedad_social:'Ansiedad social',movilidad_reducida:'Movilidad reducida',discapacidad_fisica:'Discapacidad física',sordera_hipoacusia:'Sordera / hipoacusia',baja_vision_ceguera:'Baja visión / ceguera'}).map(([v,l])=>`<div class="col-md-6"><label class="form-check border rounded-3 p-3"><input class="form-check-input me-2 condition" type="checkbox" value="${v}"> ${l}</label></div>`).join('')}</div><label class="form-label fw-semibold">Otra condición, enfermedad o necesidad (opcional)</label><input id="regOtherCondition" class="form-control mb-3" placeholder="Escribe aquí algo que no aparezca en la lista"><h6 class="fw-bold">Preferencias de accesibilidad</h6><div class="row g-2">${Object.entries({movilidad_reducida:'Movilidad reducida',accesibilidad_motriz:'Accesibilidad motriz',bajo_ruido:'Bajo nivel de ruido',luz_tenue:'Luz tenue',instrucciones_escritas:'Instrucciones escritas',teletrabajo:'Prefiero teletrabajo'}).map(([v,l])=>`<div class="col-md-6"><label class="form-check border rounded-3 p-3"><input class="form-check-input me-2 need" type="checkbox" value="${v}"> ${l}</label></div>`).join('')}</div></div></div><div id="companyFields" class="d-none"><div class="row g-3"><div class="col-md-6"><label class="form-label fw-semibold">Nombre de la empresa</label><input id="regCompanyName" class="form-control"></div><div class="col-md-6"><label class="form-label fw-semibold">Correo empresarial</label><input id="regCompanyEmail" type="email" class="form-control"></div><div class="col-md-6"><label class="form-label fw-semibold">RUT empresa (ficticio para el prototipo)</label><input id="regCompanyRut" class="form-control" placeholder="Ej. 76.123.456-7"></div><div class="col-md-6"><label class="form-label fw-semibold">Contraseña</label><input id="regCompanyPass" type="password" minlength="6" class="form-control"></div><div class="col-md-6"><label class="form-label fw-semibold">Zona / comuna</label><input id="regCompanyZone" class="form-control"></div><div class="col-md-6"><label class="form-label fw-semibold">Tamaño</label><select id="regCompanySize" class="form-select"><option value="micro">Microempresa (1–9)</option><option value="pequena">Pequeña (10–49)</option><option value="mediana">Mediana (50–199)</option><option value="grande">Grande (200+)</option></select></div><div class="col-md-6"><label class="form-label fw-semibold">Dotación total</label><input id="regWorkers" type="number" min="1" class="form-control" value="5"></div></div></div><button type="submit" class="btn btn-primary w-100 mt-4 py-2">Crear cuenta y entrar</button></form><p class="text-center mt-3 mb-0 text-muted">¿Ya tienes cuenta? <a href="#/login">Iniciar sesión</a></p></div></div></div>`}
function toggleRegRole(){const joven=document.getElementById('roleJ').checked;document.getElementById('youngFields').classList.toggle('d-none',!joven);document.getElementById('companyFields').classList.toggle('d-none',joven);document.querySelectorAll('#youngFields input,#youngFields select').forEach(x=>x.required=joven);document.querySelectorAll('#companyFields input,#companyFields select').forEach(x=>x.required=!joven)}
function handleRegistro(e){e.preventDefault();const d=db();const role=document.querySelector('input[name=role]:checked').value;if(role==='joven'){const name=document.getElementById('regName').value.trim(),email=document.getElementById('regEmail').value.trim();if(d.users.some(u=>u.email===email)){toast('Ese correo ya está registrado','danger');return}const file=document.getElementById('regCV').files[0];const u={id:Date.now(),role:'joven',name,email,password:document.getElementById('regPass').value,birth:document.getElementById('regBirth').value,rut:document.getElementById('regRut').value.trim(),zone:document.getElementById('regZone').value,cv:file?file.name:'Sin CV subido',disability:document.getElementById('regDisability').value==='si',needs:[...document.querySelectorAll('.need:checked')].map(x=>x.value),conditions:[...document.querySelectorAll('.condition:checked')].map(x=>x.value),otherCondition:document.getElementById('regOtherCondition')?.value.trim()||'',skills:[],availability:'Flexible',rating:0,experiences:0};d.users.push(u);d.cvFiles[u.id]=file?file.name:'';saveDB(d);setCurrent(u.id);toast('Cuenta creada. ¡Bienvenido/a a JOBXP!');location.hash='#/inicio'}else{const name=document.getElementById('regCompanyName').value.trim(),email=document.getElementById('regCompanyEmail').value.trim();if(d.users.some(u=>u.email===email)){toast('Ese correo ya está registrado','danger');return}const u={id:Date.now(),role:'empresa',name,email,password:document.getElementById('regCompanyPass').value,rut:document.getElementById('regCompanyRut').value.trim(),zone:document.getElementById('regCompanyZone').value,companySize:document.getElementById('regCompanySize').value,totalWorkers:Number(document.getElementById('regWorkers').value),activeYouth:0,rating:0,inclusive:false};d.users.push(u);d.companies.push({id:Date.now()+1,name,zone:u.zone,size:u.companySize,workers:u.totalWorkers,rating:0,inclusive:false,description:'Empresa registrada en JOBXP.'});saveDB(d);setCurrent(u.id);toast('Cuenta empresarial creada');location.hash='#/empresa'}}

function explorar(){const d=db(),u=currentUser();const publicJobs=d.jobs.filter(j=>j.active!==false);const zones=[...new Set(publicJobs.map(j=>j.zone))];document.querySelector('#app').innerHTML=`<div class="mb-4"><h1 class="section-title">Explorar experiencias</h1><p class="text-muted">Filtra por zona, sueldo, modalidad, accesibilidad y habilidades.</p></div><div class="cardx p-3 mb-4"><div class="row g-2"><div class="col-md-3"><input id="fText" class="form-control" placeholder="¿Qué te gustaría hacer?" oninput="filterJobs()"></div><div class="col-md-2"><select id="fZone" class="form-select" onchange="filterJobs()"><option value="">Todas las zonas</option>${zones.map(z=>`<option>${esc(z)}</option>`).join('')}</select></div><div class="col-md-2"><select id="fMode" class="form-select" onchange="filterJobs()"><option value="">Modalidad</option><option>Presencial</option><option>Remoto</option></select></div><div class="col-md-2"><select id="fNegotiable" class="form-select" onchange="filterJobs()"><option value="">Sueldo</option><option value="si">Negociable</option><option value="no">No negociable</option></select></div><div class="col-md-3"><select id="fAccess" class="form-select" onchange="filterJobs()"><option value="">Accesibilidad</option>${Object.entries(TAGS).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></div></div></div><div id="jobsGrid" class="row g-3"></div>`;filterJobs()}
function filterJobs(){const d=db(),u=currentUser();let jobs=d.jobs.filter(j=>j.active!==false).filter(j=>{const t=(document.getElementById('fText')?.value||'').toLowerCase(),z=document.getElementById('fZone')?.value||'',m=document.getElementById('fMode')?.value||'',n=document.getElementById('fNegotiable')?.value||'',a=document.getElementById('fAccess')?.value||'';return (!t||`${j.title} ${j.company} ${j.skills.join(' ')}`.toLowerCase().includes(t))&&(!z||j.zone===z)&&(!m||j.mode===m)&&(!n||(n==='si'?j.negotiable:!j.negotiable))&&(!a||j.tags.includes(a))});jobs=recommendedJobs(u,jobs);document.getElementById('jobsGrid').innerHTML=jobs.length?jobs.map(j=>`<div class="col-md-6 col-lg-4">${jobCard(j,u)}</div>`).join(''):`<div class="col-12"><div class="cardx empty"><i class="bi bi-search fs-1"></i><h4 class="fw-bold mt-3">No encontramos experiencias</h4><p>Prueba cambiando la zona o los filtros.</p></div></div>`}
function saveJob(id){const saved=JSON.parse(localStorage.getItem('jobxp_saved')||'[]');if(!saved.includes(id))saved.push(id);localStorage.setItem('jobxp_saved',JSON.stringify(saved));toast('Experiencia guardada para después')}

function detalle(id){const d=db(),u=currentUser(),j=d.jobs.find(x=>x.id===id);if(!j){notFound();return}const c=d.companies.find(x=>x.id===j.companyId);const m=matchJob(u,j);document.querySelector('#app').innerHTML=`<div class="mb-3"><a href="#/explorar" class="text-decoration-none"><i class="bi bi-arrow-left"></i> Volver a explorar</a></div><div class="row g-4"><div class="col-lg-8"><div class="cardx p-3 p-md-4"><img class="detail-img mb-4" src="${j.image}" alt="${esc(j.title)}"><div class="d-flex justify-content-between align-items-start gap-3"><div><div class="d-flex flex-wrap gap-2 mb-2"><span class="badge bg-success-subtle text-success">${j.mode}</span>${j.inclusive?'<span class="badge badge-inclusive">✓ Empresa inclusiva</span>':''}</div><h1 class="fw-bold">${esc(j.title)}</h1><p class="text-muted">${esc(j.company)} · ${esc(j.zone)}</p></div><span class="match">${m}% MATCH</span></div><hr><h4 class="fw-bold">Sobre la experiencia</h4><p class="text-muted">${esc(j.description)}</p><div class="row g-3 my-3"><div class="col-md-6"><div class="cardx p-3"><small class="text-muted">Tipo de experiencia</small><div class="fw-bold mt-1">${esc(j.experience)}</div></div></div><div class="col-md-6"><div class="cardx p-3"><small class="text-muted">Horario</small><div class="fw-bold mt-1">${esc(j.schedule)}</div></div></div></div><h5 class="fw-bold mt-4">Habilidades que desarrollarás</h5><div class="d-flex flex-wrap gap-2">${j.skills.map(s=>`<span class="tag">${esc(s)}</span>`).join('')}</div><h5 class="fw-bold mt-4">Accesibilidad del entorno</h5><div class="d-flex flex-wrap gap-2">${j.tags.map(tag).join('')}</div><div class="alert alert-soft mt-4 mb-0"><strong>${j.negotiable?'Sueldo negociable':'Sueldo no negociable'}</strong>${j.negotiable?' · Puedes conversar el monto con la empresa antes de aceptar.':' · El monto publicado es fijo y no puede modificarse.'}</div></div></div><div class="col-lg-4"><div class="cardx p-4 sidebar-card"><div class="text-success fw-bold fs-2">${money(j.pay)}</div><div class="text-muted small mb-3">Pago por experiencia</div><ul class="list-unstyled text-muted"><li class="mb-2"><i class="bi bi-clock me-2"></i>${j.hours} horas</li><li class="mb-2"><i class="bi bi-calendar3 me-2"></i>${esc(j.schedule)}</li><li class="mb-2"><i class="bi bi-geo-alt me-2"></i>${esc(j.zone)}</li><li><i class="bi bi-star me-2"></i>${j.rating.toFixed(1)} / 5</li></ul>${u?.role==='joven'?`<button class="btn btn-primary w-100 py-2" onclick="applyJob(${j.id})">Postular a esta experiencia</button>`:'<a href="#/login" class="btn btn-primary w-100">Inicia sesión para postular</a>'}<a href="#/empresa/${j.companyId}" class="btn btn-outline-secondary w-100 mt-2">Ver empresa y trabajos relacionados</a></div></div></div>`}
function applyJob(id){if(!requireLogin())return;const d=db(),u=currentUser();if(u.role!=='joven'){toast('Solo las cuentas jóvenes pueden postular','danger');return}const job=d.jobs.find(j=>j.id===id);if(!job){toast('Experiencia no encontrada','danger');return}if(!d.applications.some(a=>a.jobId===id&&a.userId===u.id)){d.applications.push({id:Date.now(),jobId:id,userId:u.id,companyId:job.companyId,jobTitle:job.title,company:job.company,status:'Enviada',createdAt:new Date().toISOString()});job.applications=(job.applications||0)+1;d.messages.push({id:Date.now()+1,jobId:id,from:job.companyId,to:u.id,senderRole:'empresa',text:`Hola ${u.name.split(' ')[0]}, recibimos tu postulación a “${job.title}”. Puedes revisar el estado desde Mis postulaciones.`,createdAt:new Date().toISOString()});saveDB(d);toast('¡Postulación enviada correctamente!')}else toast('Ya postulaste a esta experiencia','warning')}

function perfil(){if(!requireLogin())return;const d=db(),u=currentUser();if(u.role==='empresa'){empresaPerfil();return}document.querySelector('#app').innerHTML=`<div class="profile-cover mb-4"><div class="d-flex align-items-center gap-3"><div class="avatar">${initials(u.name)}</div><div><h2 class="fw-bold mb-0">${esc(u.name)}</h2><div class="opacity-75">${esc(u.email)} · ${esc(u.zone)}</div><div class="opacity-75 small">RUT prototipo: ${esc(u.rut||'No informado')}</div></div></div></div><div class="row g-4"><div class="col-lg-8"><div class="cardx p-4"><h4 class="fw-bold mb-3">Editar perfil</h4><form onsubmit="saveProfile(event)"><div class="row g-3"><div class="col-md-6"><label class="form-label fw-semibold">Nombre completo</label><input id="pName" class="form-control" value="${esc(u.name)}" required></div><div class="col-md-6"><label class="form-label fw-semibold">Fecha de nacimiento</label><input id="pBirth" type="date" class="form-control" value="${esc(u.birth||'')}" required></div><div class="col-md-6"><label class="form-label fw-semibold">Zona</label><input id="pZone" class="form-control" value="${esc(u.zone)}" required></div><div class="col-md-6"><label class="form-label fw-semibold">Disponibilidad</label><select id="pAvailability" class="form-select"><option ${u.availability==='Mañana'?'selected':''}>Mañana</option><option ${u.availability==='Tarde'?'selected':''}>Tarde</option><option ${u.availability==='Flexible'?'selected':''}>Flexible</option></select></div><div class="col-12"><label class="form-label fw-semibold">Habilidades</label><input id="pSkills" class="form-control" value="${esc((u.skills||[]).join(', '))}" placeholder="Organización, Excel, comunicación escrita"></div><div class="col-12"><label class="form-label fw-semibold">Currículum</label><input id="pCV" type="file" class="form-control" accept=".pdf,.doc,.docx"><small class="text-muted">Actual: ${esc(u.cv||'Sin CV')}</small></div></div><hr class="my-4"><h5 class="fw-bold">Discapacidad, neurodivergencia y accesibilidad</h5><div class="privacy-note mb-3"><i class="bi bi-lock"></i> Esta información es privada y se usa para recomendarte experiencias compatibles.</div><div class="row g-2 mb-3">${Object.entries({tdah:'TDAH',tea:'TEA / espectro autista',tourette:'Síndrome de Tourette',ansiedad_social:'Ansiedad social',movilidad_reducida:'Movilidad reducida',discapacidad_fisica:'Discapacidad física',sordera_hipoacusia:'Sordera / hipoacusia',baja_vision_ceguera:'Baja visión / ceguera'}).map(([k,v])=>`<div class="col-md-6"><label class="form-check border rounded-3 p-3"><input class="form-check-input profileCondition" type="checkbox" value="${k}" ${u.conditions?.includes(k)?'checked':''}> ${v}</label></div>`).join('')}</div><label class="form-label fw-semibold">Otra condición, enfermedad o necesidad (opcional)</label><input id="pOtherCondition" class="form-control mb-3" value="${esc(u.otherCondition||'')}" placeholder="Escribe aquí algo que no aparezca en la lista"><h6 class="fw-bold">Preferencias de accesibilidad</h6><div class="row g-2">${Object.entries(TAGS).map(([k,v])=>`<div class="col-md-6"><label class="form-check border rounded-3 p-3"><input class="form-check-input profileNeed" type="checkbox" value="${k}" ${u.needs?.includes(k)?'checked':''}> ${v}</label></div>`).join('')}</div><button type="submit" class="btn btn-primary mt-4">Guardar cambios</button></form></div></div><div class="col-lg-4"><div class="cardx p-4"><h5 class="fw-bold">Tu resumen</h5><div class="row g-3 mt-1"><div class="col-6"><div class="metric">${u.experiences||0}</div><small class="text-muted">Experiencias</small></div><div class="col-6"><div class="metric">${u.rating?u.rating.toFixed(1):'—'}</div><small class="text-muted">Promedio</small></div></div><hr><div><strong>Currículum</strong><div class="small text-muted mt-1"><i class="bi bi-file-earmark-pdf"></i> ${esc(u.cv||'No subido')}</div></div><a href="#/pasaporte" class="btn btn-soft w-100 mt-3">Ver pasaporte laboral</a></div></div></div>`}
function saveProfile(e){
  e.preventDefault();

  const d=db();
  const id=Number(localStorage.getItem('jobxp_current'));
  const u=d.users.find(x=>x.id===id);

  if(!u){
    location.hash='#/login';
    return;
  }

  u.name=document.getElementById('pName').value.trim();
  u.birth=document.getElementById('pBirth').value;
  u.zone=document.getElementById('pZone').value.trim();
  u.availability=document.getElementById('pAvailability').value;
  u.skills=document.getElementById('pSkills').value
    .split(',')
    .map(s=>s.trim())
    .filter(Boolean);
  u.needs=[...document.querySelectorAll('.profileNeed:checked')].map(x=>x.value);
  u.conditions=[...document.querySelectorAll('.profileCondition:checked')].map(x=>x.value);
  u.otherCondition=document.getElementById('pOtherCondition')?.value.trim()||'';
  u.disability=u.conditions.length>0||!!u.otherCondition||u.needs.length>0;

  const file=document.getElementById('pCV')?.files?.[0];
  if(file) u.cv=file.name;

  saveDB(d);
  toast('Perfil actualizado correctamente');
  render();
}

function pasaporte(){
  if(!requireLogin())return;
  const u=currentUser();
  const records=Array.isArray(u.passportExperiences)&&u.passportExperiences.length?u.passportExperiences:[];
  const count=Math.max(Number(u.experiences)||0,records.length);
  const hours=records.reduce((total,x)=>total+(Number(x.hours)||0),0);
  document.querySelector('#app').innerHTML=`<div class="profile-cover mb-4"><h2 class="fw-bold">Tu Pasaporte Laboral</h2><p class="mb-0 opacity-75">Historial digital de experiencias y habilidades certificadas.</p></div>
  <div class="row g-3"><div class="col-md-4"><div class="cardx p-4"><div class="metric">${count}</div><div class="text-muted">Experiencias</div></div></div><div class="col-md-4"><div class="cardx p-4"><div class="metric">${hours}</div><div class="text-muted">Horas acumuladas</div></div></div><div class="col-md-4"><div class="cardx p-4"><div class="metric">${u.rating?u.rating.toFixed(1):'—'}</div><div class="text-muted">Evaluación promedio</div></div></div></div>
  <div class="mt-4">${records.length?records.map(x=>`<div class="cardx p-4 mb-3"><span class="badge bg-success mb-2">✓ EXPERIENCIA CERTIFICADA</span><h4 class="fw-bold">${esc(x.title)}</h4><p class="text-muted">${esc(x.company)} · ${Number(x.hours)||0} horas · ${esc(x.date||'Sin fecha')}</p><div class="d-flex flex-wrap gap-2">${(x.skills||[]).map(skill=>`<span class="tag green">✓ ${esc(skill)}</span>`).join('')}</div><hr><div class="small text-muted">Experiencia registrada en tu historial laboral.</div></div>`).join(''):`<div class="cardx p-4 text-center"><i class="bi bi-award fs-2"></i><h4 class="fw-bold mt-2">Aún no tienes experiencias certificadas</h4><p class="text-muted mb-0">Cuando completes una microexperiencia aparecerá aquí.</p></div>`}</div>`;
}
function asistencia(){if(!requireLogin())return;const d=db(),u=currentUser();document.querySelector('#app').innerHTML=`<div class="row justify-content-center"><div class="col-md-7"><div class="cardx p-4 text-center"><h2 class="fw-bold">Asistencia</h2><p class="text-muted">Simulación del QR único de la empresa. En una implementación real, este QR registra entrada y salida.</p><div class="border rounded-4 p-4 my-4"><div class="display-1">▦</div><strong>Código JOBXP-DEMO-001</strong></div><button class="btn btn-primary" onclick="scanQR()">Simular escaneo</button><div id="attendanceResult" class="mt-3"></div></div></div></div>`}
function scanQR(){const d=db(),u=currentUser();const now=new Date().toLocaleString('es-CL');d.attendance.push({userId:u.id,date:new Date().toISOString(),type:'entrada',display:now,company:'JOBXP'});saveDB(d);document.getElementById('attendanceResult').innerHTML=`<div class="alert alert-success">✓ Entrada registrada: ${now}<br><small>La ubicación se registraría solo con autorización del usuario.</small></div>`}

function empresa(){
  if(!requireLogin()) return;
  const u=currentUser();
  if(u.role!=='empresa'){ location.hash='#/inicio'; return; }
  const d=db();
  const jobs=d.jobs.filter(j=>j.companyId===2 || j.company==='JOBXP');
  const applications=d.applications.filter(a=>a.companyId===2 || a.company==='JOBXP');
  document.querySelector('#app').innerHTML=`
    <section class="profile-cover mb-4">
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div>
          <span class="badge bg-white text-primary mb-2">PANEL DE EMPRESA</span>
          <h1 class="fw-bold mb-1">${esc(u.name)}</h1>
          <p class="mb-0 opacity-75">${esc(u.zone||'Santiago Centro')} · Empresa inclusiva</p>
        </div>
        <a href="#/publicar" class="btn btn-light text-primary fw-bold"><i class="bi bi-plus-lg me-1"></i> Publicar experiencia</a>
      </div>
    </section>
    <div class="row g-3 mb-4">
      <div class="col-md-4"><div class="cardx p-4 h-100"><div class="metric">${jobs.length}</div><div class="text-muted">Experiencias activas</div></div></div>
      <div class="col-md-4"><div class="cardx p-4 h-100"><div class="metric">${applications.length}</div><div class="text-muted">Postulaciones</div></div></div>
      <div class="col-md-4"><div class="cardx p-4 h-100"><div class="metric">${Number(u.rating||0).toFixed(1)}</div><div class="text-muted">Calificación promedio</div></div></div>
    </div>
    <div class="cardx p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div><h3 class="section-title mb-1">Tus experiencias</h3><p class="text-muted mb-0">Administra las oportunidades publicadas.</p></div>
        <a href="#/perfil" class="btn btn-soft">Editar perfil</a>
      </div>
      ${jobs.length ? `<div class="row g-3">${jobs.map(j=>`
        <div class="col-md-6"><article class="cardx p-3 h-100">
          <div class="d-flex justify-content-between gap-2"><span class="match">${Number(j.rating||0).toFixed(1)} ★</span><span class="tag green">${j.inclusive?'Inclusiva':'Publicada'}</span></div>
          <h5 class="fw-bold mt-3 mb-1">${esc(j.title)}</h5>
          <p class="text-muted small mb-2">${esc(j.zone)} · ${esc(j.mode)} · ${j.hours} horas</p>
          <strong>${money(j.pay)}</strong>
          <div class="mt-3"><a class="btn btn-primary btn-sm" href="#/experiencia/${j.id}">Ver experiencia</a></div>
        </article></div>`).join('')}</div>` : `<div class="empty"><i class="bi bi-briefcase fs-1"></i><h4 class="fw-bold mt-2">Aún no hay experiencias</h4><a href="#/publicar" class="btn btn-primary mt-2">Publicar la primera</a></div>`}
    </div>`;
}

function empresaPerfil(){
  if(!requireLogin()) return;
  const d=db();
  const u=d.users.find(x=>x.id===Number(localStorage.getItem('jobxp_current')));
  if(!u || u.role!=='empresa'){ location.hash='#/inicio'; return; }

  document.querySelector('#app').innerHTML=`
    <div class="profile-cover mb-4">
      <div class="d-flex align-items-center gap-3">
        <div class="avatar"><i class="bi bi-building"></i></div>
        <div><h2 class="fw-bold mb-0">${esc(u.name)}</h2><div class="opacity-75">${esc(u.email)} · ${esc(u.zone)}</div></div>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-lg-8"><div class="cardx p-4">
        <h4 class="fw-bold mb-3">Perfil de empresa</h4>
        <form onsubmit="saveCompanyProfile(event)">
          <div class="row g-3">
            <div class="col-md-6"><label class="form-label fw-semibold">Nombre de empresa</label><input id="cName" class="form-control" value="${esc(u.name)}" required></div>
            <div class="col-md-6"><label class="form-label fw-semibold">Zona</label><input id="cZone" class="form-control" value="${esc(u.zone||'')}" required></div>
            <div class="col-12"><label class="form-label fw-semibold">Descripción</label><textarea id="cDescription" class="form-control" rows="4">${esc(u.companyDescription||'')}</textarea></div>
            <div class="col-12"><label class="form-label fw-semibold">Qué buscas en jóvenes</label><textarea id="cSeeking" class="form-control" rows="4">${esc(u.companySeeking||'')}</textarea></div>
          </div>
          <button class="btn btn-primary mt-4" type="submit">Guardar cambios</button>
        </form>
      </div></div>
      <div class="col-lg-4"><div class="cardx p-4"><h5 class="fw-bold">Resumen</h5><div class="metric mt-3">${Number(u.rating||0).toFixed(1)}</div><div class="text-muted">Evaluación promedio</div><hr><a href="#/empresa" class="btn btn-soft w-100">Volver al panel</a></div></div>
    </div>`;
}

function saveCompanyProfile(e){
  e.preventDefault();
  const d=db();
  const u=d.users.find(x=>x.id===Number(localStorage.getItem('jobxp_current')));
  if(!u || u.role!=='empresa') return;
  u.name=document.getElementById('cName').value.trim();
  u.zone=document.getElementById('cZone').value.trim();
  u.companyDescription=document.getElementById('cDescription').value.trim();
  u.companySeeking=document.getElementById('cSeeking').value.trim();
  saveDB(d);
  toast('Perfil de empresa actualizado');
  render();
}

function empresaDetalle(id){
  const job=db().jobs.find(j=>j.id===id);
  if(!job){ notFound(); return; }
  detalle(id);
}

function publicar(){
  if(!requireLogin()) return;
  const u=currentUser();
  if(u.role!=='empresa'){ location.hash='#/inicio'; return; }
  document.querySelector('#app').innerHTML=`
    <div class="row justify-content-center py-3"><div class="col-lg-9"><div class="cardx p-4 p-md-5">
      <div class="mb-4"><span class="badge rounded-pill text-primary bg-white border px-3 py-2">NUEVA OPORTUNIDAD</span><h2 class="fw-bold mt-2">Publicar microexperiencia</h2><p class="text-muted">Crea una experiencia clara, segura e inclusiva.</p></div>
      <form onsubmit="publishJob(event)"><div class="row g-3">
        <div class="col-md-8"><label class="form-label fw-semibold">Título</label><input id="jTitle" class="form-control" required></div>
        <div class="col-md-4"><label class="form-label fw-semibold">Pago</label><input id="jPay" type="number" min="0" class="form-control" required></div>
        <div class="col-md-6"><label class="form-label fw-semibold">Zona</label><input id="jZone" class="form-control" value="${esc(u.zone||'')}" required></div>
        <div class="col-md-3"><label class="form-label fw-semibold">Horas</label><input id="jHours" type="number" min="1" class="form-control" value="4" required></div>
        <div class="col-md-3"><label class="form-label fw-semibold">Modalidad</label><select id="jMode" class="form-select"><option>Presencial</option><option>Remoto</option><option>Híbrido</option></select></div>
        <div class="col-12"><label class="form-label fw-semibold">Descripción</label><textarea id="jDescription" class="form-control" rows="5" required></textarea></div>
        <div class="col-12"><label class="form-label fw-semibold">Habilidades</label><input id="jSkills" class="form-control" placeholder="Organización, herramientas digitales"></div>
        <div class="col-12"><label class="form-label fw-semibold">Preferencias de accesibilidad</label><div class="row g-2">${Object.entries(TAGS).map(([k,v])=>`<div class="col-md-6"><label class="form-check border rounded-3 p-3"><input class="form-check-input publishNeed" type="checkbox" value="${k}"> ${v}</label></div>`).join('')}</div></div>
      </div><div class="d-flex justify-content-end gap-2 mt-4"><a href="#/empresa" class="btn btn-light border">Cancelar</a><button class="btn btn-primary" type="submit">Publicar experiencia</button></div></form>
    </div></div></div>`;
}

function publishJob(e){
  e.preventDefault();
  const d=db(),u=currentUser();
  if(!u || u.role!=='empresa') return;
  const nextId=Math.max(...d.jobs.map(j=>Number(j.id)||0),100)+1;
  d.jobs.push({
    id:nextId,title:document.getElementById('jTitle').value.trim(),company:u.name,companyId:u.id,
    zone:document.getElementById('jZone').value.trim(),mode:document.getElementById('jMode').value,
    hours:Number(document.getElementById('jHours').value),pay:Number(document.getElementById('jPay').value),
    negotiable:false,schedule:'Por definir',experience:'No requiere experiencia previa',
    skills:document.getElementById('jSkills').value.split(',').map(x=>x.trim()).filter(Boolean),
    tags:[...document.querySelectorAll('.publishNeed:checked')].map(x=>x.value),
    description:document.getElementById('jDescription').value.trim(),inclusive:true,rating:5,applications:0,
    image:'images/almacen.jpg'
  });
  saveDB(d);
  toast('Experiencia publicada correctamente');
  location.hash='#/empresa';
}

function comoFunciona(){
  document.querySelector('#app').innerHTML=`<section class="py-3"><div class="hero mb-5"><div class="row align-items-center"><div class="col-lg-8"><span class="badge rounded-pill text-primary bg-white border px-3 py-2">CÓMO FUNCIONA</span><h1 class="mt-3">De tu perfil a una experiencia real.</h1><p class="mt-3">JOBXP conecta habilidades, disponibilidad y preferencias con microexperiencias concretas.</p></div></div></div><div class="row g-3">${[['01','Crea tu perfil','Indica habilidades, zona, disponibilidad y preferencias.'],['02','Encuentra tu match','Revisa experiencias compatibles contigo.'],['03','Realiza la experiencia','Cumple tareas reales con condiciones claras.'],['04','Certifica','Recibe evaluación y construye historial laboral.']].map(x=>`<div class="col-md-6 col-lg-3"><div class="cardx p-4 h-100"><strong class="text-primary">${x[0]}</strong><h5 class="fw-bold mt-2">${x[1]}</h5><p class="text-muted small">${x[2]}</p></div></div>`).join('')}</div></section>`;
}

function inclusion(){
  document.querySelector('#app').innerHTML=`<section class="py-3"><div class="profile-cover mb-4"><h1 class="fw-bold">Inclusión asistida</h1><p class="mb-0 opacity-75">Adaptaciones concretas para reducir barreras antes de comenzar.</p></div><div class="row g-3">${Object.entries(TAGS).map(([k,v])=>`<div class="col-md-6 col-lg-4"><div class="cardx p-4 h-100"><span class="tag green mb-3">${v}</span><h5 class="fw-bold">${v}</h5><p class="text-muted mb-0">Puede formar parte del Match para encontrar experiencias más compatibles.</p></div></div>`).join('')}</div></section>`;
}

function empresas(){
  const companies=db().companies||[];
  document.querySelector('#app').innerHTML=`<section class="py-3"><div class="d-flex justify-content-between align-items-end mb-4"><div><span class="text-primary fw-bold small">EMPRESAS</span><h1 class="section-title mb-1">Organizaciones que ofrecen experiencias</h1><p class="text-muted mb-0">Conoce las empresas disponibles en el prototipo.</p></div></div><div class="row g-3">${companies.map(c=>`<div class="col-md-6 col-lg-4"><div class="cardx p-4 h-100"><div class="company-logo mb-3">${esc((c.name||'E').slice(0,1))}</div><h4 class="fw-bold">${esc(c.name)}</h4><p class="text-muted">${esc(c.zone||'')}</p><p class="small">${esc(c.description||'')}</p><span class="match">${Number(c.rating||0).toFixed(1)} ★</span></div></div>`).join('')}</div></section>`;
}

function evaluaciones(){
  if(!requireLogin()) return;
  const u=currentUser();
  document.querySelector('#app').innerHTML=`<div class="row justify-content-center py-4"><div class="col-lg-9"><div class="cardx p-4 p-md-5"><span class="text-primary fw-bold small">CIERRE DE EXPERIENCIA</span><h1 class="section-title mt-2">Evaluaciones</h1><p class="text-muted">Registra una valoración simple y transparente de las experiencias realizadas.</p><div class="alert alert-light border"><i class="bi bi-shield-check text-success me-2"></i>Las evaluaciones se guardan localmente en este navegador.</div><form onsubmit="submitSimpleEvaluation(event)"><div class="mb-3"><label class="form-label fw-semibold">Calificación</label><select id="simpleRating" class="form-select" required><option value="">Selecciona</option><option value="5">★★★★★ · Excelente</option><option value="4">★★★★ · Muy buena</option><option value="3">★★★ · Buena</option><option value="2">★★ · Regular</option><option value="1">★ · Necesita mejorar</option></select></div><div class="mb-3"><label class="form-label fw-semibold">Comentario</label><textarea id="simpleComment" class="form-control" maxlength="500" rows="5" placeholder="Cuéntanos brevemente cómo fue."></textarea></div><button class="btn btn-primary" type="submit">Guardar evaluación</button></form></div></div></div>`;
}

function submitSimpleEvaluation(e){
  e.preventDefault();
  const d=db(),u=currentUser();
  d.ratings.push({id:Date.now(),userId:u.id,rating:Number(document.getElementById('simpleRating').value),comment:document.getElementById('simpleComment').value.trim(),date:new Date().toISOString()});
  saveDB(d); toast('Evaluación guardada correctamente');
  location.hash='#/inicio';
}

function postulaciones(){
  if(!requireLogin()) return;
  const d=db(),u=currentUser();
  let items=[];
  if(u.role==='empresa'){
    items=d.applications.filter(a=>{
      const job=d.jobs.find(j=>j.id===a.jobId);
      return job && (job.companyId===u.id || job.company===u.name);
    });
  }else{
    items=d.applications.filter(a=>a.userId===u.id);
  }
  document.querySelector('#app').innerHTML=`<div class="d-flex justify-content-between align-items-end mb-4"><div><span class="text-primary fw-bold small">SEGUIMIENTO</span><h1 class="section-title mb-1">${u.role==='empresa'?'Postulaciones recibidas':'Mis postulaciones'}</h1><p class="text-muted mb-0">Revisa el estado de tus oportunidades.</p></div></div>${items.length?items.map(a=>{
    const job=d.jobs.find(j=>j.id===a.jobId);
    const young=d.users.find(x=>x.id===a.userId);
    return `<div class="cardx p-4 mb-3"><div class="d-flex flex-wrap justify-content-between gap-2"><div><h5 class="fw-bold mb-1">${esc(job?.title||a.jobTitle||'Experiencia')}</h5><p class="text-muted mb-0">${esc(job?.company||a.company||'Empresa')}${u.role==='empresa'&&young?' · Postulante: '+esc(young.name):''}</p></div><span class="tag green">${esc(a.status||'Enviada')}</span></div>${u.role==='empresa'?`<div class="d-flex gap-2 mt-3"><button class="btn btn-sm btn-primary" onclick="updateApplication(${a.id},'Aceptada')">Aceptar</button><button class="btn btn-sm btn-outline-danger" onclick="updateApplication(${a.id},'Rechazada')">Rechazar</button></div>`:`<div class="small text-muted mt-3">${a.createdAt?new Date(a.createdAt).toLocaleDateString('es-CL'):''}</div>`}</div>`;
  }).join(''):`<div class="cardx empty"><i class="bi bi-send fs-1"></i><h4 class="fw-bold mt-2">${u.role==='empresa'?'Aún no recibes postulaciones':'Aún no tienes postulaciones'}</h4><a href="#/explorar" class="btn btn-primary mt-2">Explorar experiencias</a></div>`}`;
}
function mensajes(){
  if(!requireLogin()) return;
  document.querySelector('#app').innerHTML=`<div class="cardx p-4 p-md-5"><h1 class="section-title">Mensajes</h1><p class="text-muted">Espacio de comunicación del prototipo.</p><div class="chat-box"><div class="empty">No tienes mensajes nuevos.</div></div></div>`;
}

function notFound(){document.querySelector('#app').innerHTML=`<div class="empty"><h2 class="fw-bold">Página no encontrada</h2><a href="#/inicio" class="btn btn-primary mt-2">Volver al inicio</a></div>`}



/* Compatibilidad y acciones del prototipo.
   Estas funciones están definidas aquí para que ninguna ruta o botón pueda
   detener la ejecución completa de la aplicación si una sección no se usa. */
function updateApplication(id,status){
  const d=db(),u=currentUser();
  if(!u || u.role!=='empresa') return;
  const app=d.applications.find(a=>Number(a.id)===Number(id));
  if(!app){toast('Postulación no encontrada','danger');return;}
  const job=d.jobs.find(j=>j.id===app.jobId);
  const owned=job && (job.companyId===u.id || job.company===u.name);
  if(!owned){toast('No tienes permiso para actualizar esta postulación','danger');return;}
  app.status=status;
  app.updatedAt=new Date().toISOString();
  saveDB(d);
  toast('Estado de postulación actualizado');
  render();
}

function sendMessage(toUserId, text, jobId=null){
  if(!requireLogin()) return;
  const value=String(text||'').trim();
  if(!value){toast('Escribe un mensaje antes de enviar','warning');return;}
  const d=db(),u=currentUser();
  d.messages.push({id:Date.now(),jobId:jobId?Number(jobId):null,from:u.id,to:Number(toUserId),senderRole:u.role,text:value,createdAt:new Date().toISOString()});
  saveDB(d); toast('Mensaje enviado');
  render();
}

function toggleJobStatus(id){
  if(!requireLogin()) return;
  const d=db(),u=currentUser(),job=d.jobs.find(j=>Number(j.id)===Number(id));
  if(!job || u.role!=='empresa' || (job.companyId!==u.id && job.company!==u.name)){toast('No puedes modificar esta experiencia','danger');return;}
  job.active=job.active===false;
  saveDB(d); toast(job.active===false?'Experiencia pausada':'Experiencia activada'); render();
}

function deleteCompanyJob(id){
  if(!requireLogin()) return;
  const d=db(),u=currentUser(),idx=d.jobs.findIndex(j=>Number(j.id)===Number(id));
  if(idx<0){toast('Experiencia no encontrada','danger');return;}
  const job=d.jobs[idx];
  if(u.role!=='empresa' || (job.companyId!==u.id && job.company!==u.name)){toast('No puedes eliminar esta experiencia','danger');return;}
  if(!confirm('¿Eliminar esta experiencia?')) return;
  d.jobs.splice(idx,1); saveDB(d); toast('Experiencia eliminada'); render();
}

function setRating(value){
  const input=document.getElementById('ratingValue');
  if(input) input.value=Number(value);
  document.querySelectorAll('[data-rating]').forEach(el=>el.classList.toggle('text-warning',Number(el.dataset.rating)<=Number(value)));
}

function submitRating(e){
  e.preventDefault();
  if(!requireLogin()) return;
  const d=db(),u=currentUser();
  const rating=Number(document.getElementById('ratingValue')?.value||document.getElementById('simpleRating')?.value||0);
  if(!rating){toast('Selecciona una calificación','warning');return;}
  const comment=(document.getElementById('ratingComment')?.value||document.getElementById('simpleComment')?.value||'').trim();
  d.ratings.push({id:Date.now(),userId:u.id,rating,comment,date:new Date().toISOString()});
  saveDB(d); toast('Evaluación guardada correctamente'); location.hash='#/evaluaciones';
}

function reportIssue(e){
  if(e?.preventDefault) e.preventDefault();
  if(!requireLogin()) return;
  const d=db(),u=currentUser();
  const text=(document.getElementById('reportText')?.value||'').trim();
  if(!text){toast('Describe el problema','warning');return;}
  d.reports.push({id:Date.now(),userId:u.id,text,date:new Date().toISOString(),status:'Recibido'});
  saveDB(d); toast('Reporte recibido. Gracias por avisarnos.');
  if(location.hash==='#/asistencia') render();
}

// Evita envíos accidentales: los formularios solo se envían al pulsar su botón de envío.
document.addEventListener('keydown',function(e){if(e.key==='Enter' && e.target.closest('form') && e.target.tagName!=='TEXTAREA'){e.preventDefault();}});

window.applyJob=applyJob;window.updateApplication=updateApplication;window.sendMessage=sendMessage;window.saveJob=saveJob;window.filterJobs=filterJobs;window.handleLogin=handleLogin;window.handleRegistro=handleRegistro;window.toggleRegRole=toggleRegRole;window.saveProfile=saveProfile;window.saveCompanyProfile=saveCompanyProfile;window.goEmpresa=goEmpresa;window.toggleJobStatus=toggleJobStatus;window.deleteCompanyJob=deleteCompanyJob;window.publishJob=publishJob;window.setRating=setRating;window.submitRating=submitRating;window.reportIssue=reportIssue;window.scanQR=scanQR;window.logout=logout;
window.addEventListener('hashchange',render);window.addEventListener('DOMContentLoaded',()=>{db();render();});
