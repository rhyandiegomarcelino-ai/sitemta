(() => {
const form=document.getElementById('quoteForm'); if(!form)return;
const msg=document.getElementById('formMessage'),btn=document.getElementById('submitBtn'),cfg=window.MTA_CONFIG||{};
const ready=cfg.SUPABASE_URL&&cfg.SUPABASE_ANON_KEY&&!cfg.SUPABASE_URL.includes('SEU-PROJETO')&&!cfg.SUPABASE_ANON_KEY.includes('SUA_CHAVE');
if(!ready)msg.textContent='Formulário em configuração. Tente novamente mais tarde.';
form.addEventListener('submit',async e=>{
e.preventDefault();if(!ready)return;
const files=[...document.getElementById('documentos').files],allowed=['application/pdf','image/jpeg','image/png','image/webp'];
if(files.length>5||files.some(f=>f.size>10*1024*1024||!allowed.includes(f.type))){msg.textContent='Anexe até 5 arquivos PDF/JPG/PNG/WEBP, com no máximo 10 MB cada.';return;}
btn.disabled=true;btn.textContent='Enviando...';
try{
const db=supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY),d=Object.fromEntries(new FormData(form).entries());
delete d.documentos;
const requestId=crypto.randomUUID(),docs=[];
for(const f of files){const safe=f.name.replace(/[^a-zA-Z0-9._-]/g,'_'),path=requestId+'/'+crypto.randomUUID()+'-'+safe;const {error:up}=await db.storage.from('documentos-orcamento').upload(path,f,{contentType:f.type});if(up)throw up;docs.push({path,name:f.name});}
const {error}=await db.from('solicitacoes').insert({id:requestId,nome:d.nome.trim(),whatsapp:d.whatsapp.trim(),email:d.email||null,servico:d.servico,municipio:d.municipio.trim(),localizacao:d.localizacao||null,tipo_imovel:d.tipo_imovel||null,area:d.area||null,descricao:d.descricao.trim(),status:'Recebida',documentos:docs});
if(error)throw error;
location.href='contato-recebido.html';
}catch(err){console.error(err);msg.textContent='Não foi possível enviar. Tente novamente ou entre em contato pelo WhatsApp.';btn.disabled=false;btn.textContent='Enviar solicitação →';}
});
})();
