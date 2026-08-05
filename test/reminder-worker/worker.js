const DEFAULT_ORIGIN = "https://latelierfleursetsens-create.github.io";

function cors(request, extra = {}) {
  const origin = request.headers.get("Origin") || "";
  const allowed = origin === DEFAULT_ORIGIN || origin.startsWith(DEFAULT_ORIGIN + "/") ? origin : DEFAULT_ORIGIN;
  return {"Access-Control-Allow-Origin": allowed,"Vary":"Origin","Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Authorization",...extra};
}
function json(request, value, status=200){return new Response(JSON.stringify(value),{status,headers:cors(request,{"Content-Type":"application/json; charset=utf-8"})});}
async function verifyAdmin(request, env){
  const h=request.headers.get("Authorization")||""; if(!h.startsWith("Bearer ")) return null;
  const idToken=h.slice(7).trim(); if(!idToken||!env.FIREBASE_API_KEY||!env.ADMIN_UID) return null;
  const r=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key="+encodeURIComponent(env.FIREBASE_API_KEY),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({idToken})});
  if(!r.ok) return null; const d=await r.json(); const u=Array.isArray(d.users)?d.users[0]:null; return u&&u.localId===env.ADMIN_UID?u:null;
}
function parisDateParts(date=new Date()){
  const parts=new Intl.DateTimeFormat("fr-CA",{timeZone:"Europe/Paris",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",hourCycle:"h23"}).formatToParts(date);
  const o={}; parts.forEach(p=>o[p.type]=p.value); return {ymd:`${o.year}-${o.month}-${o.day}`,hour:Number(o.hour)};
}
function daysBetween(todayYmd,dueYmd){
  const a=new Date(todayYmd+"T12:00:00Z"), b=new Date(dueYmd+"T12:00:00Z"); return Math.round((b-a)/86400000);
}
function esc(s){return String(s||"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
function reminderCopy(q,offset,company){
  const client=esc(q.clientNom||""); const number=esc(q.numero||""); const due=new Date(q.echeance+"T12:00:00").toLocaleDateString("fr-FR"); const url=esc(q.portalUrl||"");
  let subject,lead,body;
  if(offset===14){subject=`Votre devis ${q.numero} arrive à échéance dans 14 jours 🌸`;lead="Votre devis est toujours disponible.";body="Il arrivera à échéance dans deux semaines. Si vous souhaitez réserver votre date, vous pouvez le valider directement depuis votre espace client.";}
  else if(offset===7){subject=`Votre devis ${q.numero} arrive bientôt à échéance 🌸`;lead="Votre devis arrivera à échéance dans une semaine.";body="Afin de confirmer votre projet floral et de conserver la disponibilité de votre date, pensez à le valider avant son expiration.";}
  else if(offset===2){subject=`Plus que 2 jours pour valider votre devis ${q.numero}`;lead="Votre devis arrive à échéance dans 2 jours.";body="Nous vous invitons à finaliser sa validation avant l’échéance afin de confirmer votre projet.";}
  else {subject=`Dernier jour pour valider votre devis ${q.numero}`;lead="Votre devis expire aujourd’hui.";body="Passé ce délai, les tarifs et la disponibilité de votre date ne pourront plus être garantis.";}
  const html=`<div style="font-family:Arial,sans-serif;color:#3b2c2f;line-height:1.6;max-width:640px;margin:auto"><h2 style="color:#6f2638">${lead}</h2><p>Bonjour ${client||""},</p><p>${body}</p><p><strong>Devis :</strong> ${number}<br><strong>Date d’échéance :</strong> ${due}</p>${url?`<p style="text-align:center;margin:28px 0"><a href="${url}" style="display:inline-block;background:#6f2638;color:#fff;text-decoration:none;padding:13px 22px;border-radius:10px;font-weight:bold">Accéder à mon espace client</a></p>`:""}<p>Si vous avez la moindre question, nous restons à votre disposition.</p><p>Bien chaleureusement,<br><strong>${esc(company.name||"L'Atelier Fleurs & Sens")}</strong></p></div>`;
  return {subject,html};
}
async function sendBrevo(env,to,name,subject,html){
  const r=await fetch("https://api.brevo.com/v3/smtp/email",{method:"POST",headers:{"accept":"application/json","api-key":env.BREVO_API_KEY,"content-type":"application/json"},body:JSON.stringify({sender:{name:env.SENDER_NAME||"L'Atelier Fleurs & Sens",email:env.SENDER_EMAIL||"latelierfleursetsens@gmail.com"},to:[{email:to,name:name||""}],subject,htmlContent:html})});
  if(!r.ok) throw new Error(await r.text()); return true;
}
async function runReminders(env,force=false){
  if(!env.REMINDER_KV||!env.BREVO_API_KEY) return {ok:false,message:"Configuration manquante"};
  const cfg=await env.REMINDER_KV.get("reminder-config","json"); if(!cfg||!cfg.enabled) return {ok:true,disabled:true,sent:0};
  const now=parisDateParts(); if(!force&&now.hour!==8) return {ok:true,skipped:true,hour:now.hour,sent:0};
  let sent=0,errors=[]; const offsets=Array.isArray(cfg.offsets)?cfg.offsets:[14,7,2,0];
  for(const q of (cfg.quotes||[])){
    if(!q||!q.id||!q.echeance||!q.clientEmail) continue; const diff=daysBetween(now.ymd,q.echeance); if(!offsets.includes(diff)) continue;
    const key=`sent:${q.id}:${q.echeance}:J${diff}`; if(await env.REMINDER_KV.get(key)) continue;
    try{const c=reminderCopy(q,diff,cfg.company||{}); await sendBrevo(env,q.clientEmail,q.clientNom,c.subject,c.html); await env.REMINDER_KV.put(key,new Date().toISOString()); sent++;}
    catch(e){errors.push({id:q.id,error:String(e.message||e)});}
  }
  await env.REMINDER_KV.put("last-run",JSON.stringify({at:new Date().toISOString(),sent,errors})); return {ok:errors.length===0,sent,errors};
}
export default {
  async fetch(request,env){
    const url=new URL(request.url); if(request.method==="OPTIONS") return new Response(null,{headers:cors(request)});
    if(request.method==="GET"&&url.pathname==="/health"){
      const required=["REMINDER_KV","BREVO_API_KEY","ADMIN_UID","FIREBASE_API_KEY"];
      const missing=required.filter(k=>!env[k]);
      return json(request,{ok:true,service:"MyBusiness Quote Reminders",version:"6.5.2",configured:missing.length===0,missing});
    }

    if(request.method==="POST"&&url.pathname==="/test-email"){
      if(!(await verifyAdmin(request,env))) return json(request,{ok:false,message:"Accès administrateur refusé"},403);
      if(!env.BREVO_API_KEY) return json(request,{ok:false,message:"Secret BREVO_API_KEY manquant"},503);
      let data; try{data=await request.json();}catch{return json(request,{ok:false,message:"JSON invalide"},400);}
      const email=String(data.email||"").trim();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(request,{ok:false,message:"Adresse e-mail invalide"},400);
      const due=new Date(); due.setDate(due.getDate()+14);
      const ymd=due.toISOString().slice(0,10);
      const quote={numero:"D-TEST-REMINDER",echeance:ymd,clientNom:String(data.name||"Test MyBusiness"),portalUrl:"https://latelierfleursetsens-create.github.io/atelier-fleurs-app/espace-client.html"};
      const c=reminderCopy(quote,14,{name:env.SENDER_NAME||"L'Atelier Fleurs & Sens"});
      await sendBrevo(env,email,quote.clientNom,c.subject,c.html);
      return json(request,{ok:true,sentTo:email});
    }
    if(request.method==="POST"&&url.pathname==="/sync"){
      if(!env.REMINDER_KV) return json(request,{ok:false,message:"Binding REMINDER_KV manquant"},503); if(!(await verifyAdmin(request,env))) return json(request,{ok:false,message:"Accès administrateur refusé"},403);
      let data; try{data=await request.json();}catch{return json(request,{ok:false,message:"JSON invalide"},400);}
      const safe={enabled:!!data.enabled,offsets:(data.offsets||[]).map(Number).filter(x=>[14,7,2,0].includes(x)),quotes:(data.quotes||[]).slice(0,1000),company:data.company||{},updatedAt:new Date().toISOString()};
      await env.REMINDER_KV.put("reminder-config",JSON.stringify(safe)); return json(request,{ok:true,count:safe.quotes.length,enabled:safe.enabled,updatedAt:safe.updatedAt});
    }
    if(request.method==="POST"&&url.pathname==="/run"){
      if(!(await verifyAdmin(request,env))) return json(request,{ok:false,message:"Accès administrateur refusé"},403); return json(request,await runReminders(env,true));
    }
    if(request.method==="GET"&&url.pathname==="/status"){
      if(!(await verifyAdmin(request,env))) return json(request,{ok:false,message:"Accès administrateur refusé"},403); return json(request,{ok:true,lastRun:await env.REMINDER_KV.get("last-run","json"),config:await env.REMINDER_KV.get("reminder-config","json")});
    }
    return json(request,{ok:true,service:"MyBusiness Quote Reminders",version:"6.5.2"});
  },
  async scheduled(event,env,ctx){ctx.waitUntil(runReminders(env,false));}
};
