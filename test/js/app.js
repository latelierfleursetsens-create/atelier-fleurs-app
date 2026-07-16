/* V3.8.3 TEST MODULAIRE — Bibliothèque matériel : tri A-Z, recherche, filtres et édition complète. */
"use strict";

var APP_VERSION = "TEST V3.8.3 MODULAIRE";
var APP_VERSION_NOTE = "Test : bibliothèque matériel triée, recherchable et entièrement modifiable, toujours sans décompte automatique.";
var APP_CHANGELOG = [
  "V3.8.3 TEST — Bibliothèque matériel : tri alphabétique, recherche, filtres, statuts et édition complète de chaque article.",
  "V3.8.2 TEST — Recettes matériel configurables : ajout libre d’articles stock et association à un ou plusieurs ateliers avec quantité par personne.",
  "V3.8.1 TEST — Simulation des besoins matériel des ateliers sans aucune modification du stock réel.",
  "V3.7.2 PROD — Correctif du bouton Ajouter au carnet dans Clients > Encaissements manuels, avec prise en charge des montants saisis avec une virgule.",
  "V3.7.1 PROD — Photos d’inspiration mariage : import multiple pendant le RDV et onglet Inspirations dans la fiche mariage.",
  "V3.7.0 TEST — Tableau de bord simplifié : retrait des statistiques et aperçus secondaires, ajout d’accès rapides.",
  "V3.6.6 PROD — Correctif téléphone devis mariage + ajout des canaux Mail et Site internet.",
  "V3.6.5 TEST — Actualisation automatique du devis mariage lié depuis la fiche mariage et la fiche cliente.",
  "V3.6.4 PROD — Correctif téléphone devis mariage : priorité à la fiche cliente à jour lors de la création/recréation du devis.",
  "V3.6.3 PROD — Correctif devis mariage : canal de communication masqué côté client + coordonnées client à jour lors de la création/recréation du devis.",
  "V3.6.1 PROD — CRM Mariage : retrait du bouton Nouvelle cliente, création désormais guidée par Préparer mon rendez-vous.",
  "V3.6.0 TEST — CRM Mariage : fiche mariage réorganisée en onglets Résumé, Fiche, Créations, Documents, Suivi, Budget et Historique.",
  "V3.5.3 TEST — Wedding Manager : retrait du bloc Jalons J- jugé inutile.",
  "V3.5.2 TEST — Bouton Retour à la liste ajouté en haut des fiches mariage.",
  "V3.5.1 TEST — Bouton Préparer mon rendez-vous : formulaire guidé pour les appels mariage et création automatique de la fiche.",
  "V3.5.0 TEST — Wedding Manager : bandeau mariage, timeline, todo, documents et budget.",
  "V3.4.1 TEST — Suivi mariages : les étapes automatiques peuvent être cochées manuellement pour les anciens dossiers sans devis/facture liés.",
  "V3.4.0 TEST — Centre de suivi des mariages : checklist métier, progression sur le tableau de bord et chronologie automatique.",
  "V3.3.1 TEST — Prestations complémentaires proposées aussi dans les fiches mariage + affichage version corrigé.",
  "V3.3.0 TEST — Module Paramètres enrichi : déplacements, modèles de mails, coordonnées, URSSAF et prestations centralisées.",
  "V3.2.1 PROD — Todo list déplacée juste entre Bonjour Elodie et le centre de notifications.",
  "V3.2.0 TEST — Nouveau tableau de bord orienté actions : version discrète, indicateurs clés et journal déplacé dans Paramètres > À propos de l’application.",
  "V3.1.2 TEST — Ajout du centre de notifications prioritaires sur le tableau de bord.",
  "V3.1.1 TEST — Correctif encaissements ateliers avec devis/factures liés.",
  "V3.1.0 TEST — Ajout d’une bibliothèque de prestations réutilisables dans Paramètres.",
  "V3.0.4 PROD — Correctif du double comptage des ateliers dans À encaisser prochainement.",
  "V3.0.3 PROD — Architecture modulaire validée et mise en production.",
  "V3.0.3 TEST — Ajout du journal des modifications visible sur le tableau de bord.",
  "V3.0.2 TEST — Correction renforcée du bouton Ajouter le client dans Fiches clientes.",
  "V3.0.1 TEST — Premier correctif sur l’ajout client après passage en architecture modulaire.",
  "V3.0.0 TEST — Mise en place de l’architecture en plusieurs fichiers.",
  "V2.1.1 TEST — Prestations complémentaires ateliers, sans mentions internes bien/service côté client."
];
var APP_ROADMAP = [
  "Tester le module Paramètres enrichi",
  "Brancher automatiquement le calcul des frais de déplacement dans les devis ateliers",
  "Découper réellement les modules Clients et Ateliers dans leurs fichiers JS",
  "Préparer la future gestion de stock fleurs et fournitures"
];

/* ===================== Données par défaut ===================== */
var DEFAULT_PRESTATIONS_BIBLIOTHEQUE = [
  {id:"dep", label:"Frais de déplacement", type:"service", prix:0, qte:1, actif:true},
  {id:"premium", label:"Pack premium", type:"bien", prix:0, qte:1, actif:true},
  {id:"perso", label:"Personnalisation", type:"service", prix:0, qte:1, actif:true},
  {id:"fournitures", label:"Fournitures supplémentaires", type:"bien", prix:0, qte:1, actif:true},
  {id:"livraison", label:"Livraison", type:"service", prix:0, qte:1, actif:true},
  {id:"autre", label:"Autre / champ libre", type:"service", prix:0, qte:1, actif:true}
];
var DEFAULT_SETTINGS = {
  nomEntreprise:"L'Atelier Fleurs & Sens", entrepreneur:"", adresse:"Valenciennes (59)",
  siret:"", tel:"", email:"", site:"latelierfleursetsens.fr", iban:"", bic:"",
  mentionTVA:"TVA non applicable, article 293 B du CGI",
  conditionsReglement:"Acompte de 30 % à la commande, solde à la livraison.",
  delaiPaiement:30,
  penalites:"En cas de retard de paiement, application de pénalités au taux légal en vigueur. Indemnité forfaitaire pour frais de recouvrement : 40 € (clients professionnels).",
  validiteDevis:30, acompteParDefaut:30,
  seuilBiens:188700, seuilServices:77700, tauxCotisBiens:12.3, tauxCotisServices:21.2,
  partService:60, compteurs:{}, googleDriveUrl:"", googleDriveAuto:false, googleDriveLast:"",
  kmOfferts:20, tarifKm:0.60, deplacementAllerRetour:true,
  mailObjetDevis:"Votre devis {numero} - L'Atelier Fleurs & Sens",
  mailObjetFacture:"Votre facture {numero} - L'Atelier Fleurs & Sens",
  mailMessageDevis:"<p>Bonjour {client},</p>\n<p>J'espère que vous allez bien.</p>\n<p>Je vous prie de trouver ci-joint votre <strong>devis</strong> relatif à votre commande auprès de <strong>L'Atelier Fleurs & Sens</strong>.</p>\n<p>Je vous remercie chaleureusement pour votre confiance. Si vous avez la moindre question, je reste bien entendu à votre disposition.</p>\n<p>Bien chaleureusement,</p>\n<p><strong>Élodie Rouzé</strong><br><strong>L'Atelier Fleurs & Sens</strong><br>🌿 Des fleurs, des émotions, un instant pour soi<br>📞 06 50 91 63 59<br>📧 latelierfleursetsens@gmail.com<br>🌐 www.latelierfleursetsens.fr</p>",
  mailMessageFacture:"<p>Bonjour {client},</p>\n<p>J'espère que vous allez bien.</p>\n<p>Je vous prie de trouver ci-joint votre <strong>facture</strong> relative à votre commande auprès de <strong>L'Atelier Fleurs & Sens</strong>.</p>\n<p>Je vous remercie chaleureusement pour votre confiance.</p>\n<p>Bien chaleureusement,</p>\n<p><strong>Élodie Rouzé</strong><br><strong>L'Atelier Fleurs & Sens</strong><br>🌿 Des fleurs, des émotions, un instant pour soi<br>📞 06 50 91 63 59<br>📧 latelierfleursetsens@gmail.com<br>🌐 www.latelierfleursetsens.fr</p>",
  mailMessageRelance:"Bonjour {client},\n\nJe me permets de revenir vers vous concernant le devis {numero}.\nN'hésitez pas à me dire si vous avez des questions ou besoin d'un ajustement.\n\nBien chaleureusement,\nÉlodie",
  prestationsBibliotheque:DEFAULT_PRESTATIONS_BIBLIOTHEQUE.map(function(p){ return Object.assign({},p); }),
  atelierRecipes:null
};

/* ===================== État ===================== */
var state = { settings:Object.assign({},DEFAULT_SETTINGS), catalogue:[], clients:[], devis:[], factures:[], mariages:[], encaissements:[], commandes:[], emails:[], achats:[], ventesSite:[], ateliers:[], logo:"", todoList:"", shoppingList:"", stockItems:[] };
var ui = { tab:"accueil", wizard:null, factureDraft:null, commandeDraft:null, commandeOpen:null, preview:null, anneeDash:new Date().getFullYear(), dirty:false, baseName:null, mariageOpen:null, mariageFilter:"avenir", mariageView:"fiches", lightbox:null, wizardLinkMariage:null, clientOpen:null, monthDetail:null, confirmDelete:null, achatDraft:null, mariageGroups:null, atelierOpen:null, clientsSub:"clients", documentsSub:"devis", financesSub:"tresorerie", pendingPaymentsModal:false, paymentPrompt:null, todoEditing:false, todoSaveTimer:null, globalSearch:"", tresoYear:new Date().getFullYear(), tresoMonth:new Date().getMonth()+1, versionNotesModal:false, mariageRdvDraft:null, mariageDetailTab:"resume", stockRecipeModel:"", stockRecipeFocusItem:"", stockSearch:"", stockCategoryFilter:"", stockEditId:null };
var fileHandle = null;

/* ===================== Helpers ===================== */
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,6); }
function r2(n){ return Math.round((Number(n)+Number.EPSILON)*100)/100; }
function euro(n){ return (Number(n)||0).toLocaleString("fr-FR",{style:"currency",currency:"EUR"}); }
function todayISO(){ return new Date().toISOString().slice(0,10); }
function addDays(iso,d){ var dt=new Date(iso+"T00:00:00"); dt.setDate(dt.getDate()+d); return dt.toISOString().slice(0,10); }
function frDate(iso){ return iso? new Date(iso+"T00:00:00").toLocaleDateString("fr-FR") : "—"; }
var MOIS=["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"];
var MOISL=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]);}); }
function num(v){ return Number(v)||0; }

var COMM_CHANNELS=["Mail","Site internet","Téléphone","WhatsApp","Messenger","TikTok","Instagram","SMS"];
function commOptions(selected){
  selected=selected||"";
  return '<option value="">Non renseigné</option>'+COMM_CHANNELS.map(function(ch){return '<option value="'+esc(ch)+'"'+(ch===selected?' selected':'')+'>'+esc(ch)+'</option>';}).join("");
}

function totals(lignes, partService){
  var p=(Number(partService)||0)/100, biens=0, services=0, total=0;
  (lignes||[]).forEach(function(l){
    var lt=num(l.qte)*num(l.prix); total+=lt;
    var urssaf=l.urssafType||l.categorieUrssaf||"";
    if(urssaf==="service"){ services+=lt; }
    else if(urssaf==="bien"){ biens+=lt; }
    else if(l.type==="service"){ services+=lt*p; biens+=lt*(1-p); }
    else { biens+=lt; }
  });
  return { biens:r2(biens), services:r2(services), total:r2(total) };
}

function factureCalc(lignes, partService, f){
  var base=totals(lignes, partService), total=base.total;
  f=f||{};
  var valRem=num(f.reductionValeur), remise=0;
  if(valRem>0){
    if(f.reductionType==="pourcent"){ remise=r2(total*valRem/100); }
    else { remise=r2(valRem); }
  }
  remise=Math.min(remise,total);
  var apres=r2(total-remise);
  var acompte=Math.min(num(f.acompteDejaPaye),apres);
  var net=r2(apres-acompte);
  var ratio=total>0?apres/total:1;
  return {
    biens:r2(base.biens*ratio),
    services:r2(base.services*ratio),
    totalInitial:base.total,
    remiseMontant:remise,
    totalApresRemise:apres,
    acompteDejaPaye:acompte,
    total:net
  };
}

var ST_DEVIS={ brouillon:{l:"Brouillon",c:"var(--ink-s)",b:"#efe7df"}, envoye:{l:"Envoyé",c:"#6a5a2a",b:"#f3ead0"},
  accepte:{l:"Accepté",c:"var(--green)",b:"var(--green-s)"}, refuse:{l:"Refusé",c:"#9b3b3b",b:"#f3dede"}, archive:{l:"Archivé",c:"var(--ink-s)",b:"#eeeeee"} };
var ST_FAC={ a_envoyer:{l:"À envoyer",c:"var(--ink-s)",b:"#efe7df"}, envoyee:{l:"Envoyée",c:"#6a5a2a",b:"#f3ead0"}, payee:{l:"Payée",c:"var(--green)",b:"var(--green-s)"} };
var TYPE_FAC={ acompte:"Facture d\'acompte", solde:"Facture de solde", totale:"Facture" };
var MAIL_WORKER_URL="https://atelier-fleurs-mail.latelierfleursetsens.workers.dev/";


/* ===================== Firebase (cloud sécurisé) ===================== */
var firebaseConfig={ apiKey:"AIzaSyCPuUcFt99zQsUI1lBDSEZkX-RJHtgs5BY", authDomain:"l-atelier-fleurs-et-sens.firebaseapp.com", projectId:"l-atelier-fleurs-et-sens", storageBucket:"l-atelier-fleurs-et-sens.firebasestorage.app", messagingSenderId:"520271601373", appId:"1:520271601373:web:150541ed9bf7091b804534" };
firebase.initializeApp(firebaseConfig);
var auth=firebase.auth();
var db=firebase.firestore();
try{ db.enablePersistence({synchronizeTabs:true}).catch(function(){}); }catch(e){}
var docRef=null, cloudTimer=null;

function serialize(){ return { settings:state.settings, catalogue:state.catalogue, clients:state.clients, devis:state.devis, factures:state.factures, mariages:state.mariages, encaissements:state.encaissements, commandes:state.commandes, emails:state.emails, achats:state.achats, ventesSite:state.ventesSite, ateliers:state.ateliers, logo:state.logo, todoList:state.todoList, shoppingList:state.shoppingList, stockItems:state.stockItems, _meta:{savedAt:new Date().toISOString()} }; }
function serializeCloud(){ var d=serialize(); d.mariages=(d.mariages||[]).map(function(m){ var c=Object.assign({},m); c.medias=[]; return c; }); return d; }
function applyData(d){
  if(!d) return;
  state.settings=Object.assign({},DEFAULT_SETTINGS,d.settings||{});
  if(!state.settings.compteurs) state.settings.compteurs={};
  state.catalogue=d.catalogue||[]; state.clients=d.clients||[];
  state.devis=d.devis||[]; state.factures=d.factures||[]; state.mariages=d.mariages||[]; state.encaissements=d.encaissements||[]; state.commandes=d.commandes||[]; state.emails=d.emails||[]; state.achats=d.achats||[]; state.ventesSite=d.ventesSite||[]; state.ateliers=d.ateliers||[]; state.logo=d.logo||""; state.todoList=d.todoList||""; state.shoppingList=d.shoppingList||""; state.stockItems=d.stockItems||[];
}
function applyRemote(d){
  var localMedias={}; state.mariages.forEach(function(m){ localMedias[m.id]=m.medias||[]; });
  applyData(d);
  state.mariages.forEach(function(m){ if(localMedias[m.id] && (!m.medias||!m.medias.length)) m.medias=localMedias[m.id]; });
  try{ localStorage.setItem("afs_cache", JSON.stringify({data:serialize()})); }catch(e){}
}
function loadCache(){ try{ var raw=localStorage.getItem("afs_cache"); if(raw){ applyData(JSON.parse(raw).data); } }catch(e){} }

function isTextEditing(){
  var a=document.activeElement;
  if(!a) return false;
  var tag=(a.tagName||"").toLowerCase();
  return tag==="textarea" || tag==="input" || a.isContentEditable;
}
function saveTodoFromFields(){
  var t=document.getElementById("dashTodoList");
  var s=document.getElementById("dashShoppingList");
  if(t) state.todoList=t.value||"";
  if(s) state.shoppingList=s.value||"";
}


function isTodoField(el){
  return !!(el && (el.id==="dashTodoList" || el.id==="dashShoppingList"));
}
function saveTodoFromFields(){
  var t=document.getElementById("dashTodoList");
  var s=document.getElementById("dashShoppingList");
  if(t) state.todoList=t.value||"";
  if(s) state.shoppingList=s.value||"";
}
function saveTodoLocalOnly(){
  saveTodoFromFields();
  try{ localStorage.setItem("afs_cache", JSON.stringify({data:serialize()})); }catch(e){}
}
function saveTodoCloudDelayed(){
  clearTimeout(ui.todoSaveTimer);
  ui.todoSaveTimer=setTimeout(function(){
    if(ui.todoEditing) return;
    saveTodoFromFields();
    saveCache();
  }, 1200);
}

function saveCache(){
  try{ localStorage.setItem("afs_cache", JSON.stringify({data:serialize()})); }catch(e){}
  if(ui && ui.todoEditing) return;
  saveCloud();
}
function saveCloud(){
  if(!docRef) return;
  if(ui && ui.todoEditing) return;
  cloudStatus("☁️ Enregistrement…");
  clearTimeout(cloudTimer);
  cloudTimer=setTimeout(function(){
    docRef.set({ data:JSON.stringify(serializeCloud()), updatedAt:firebase.firestore.FieldValue.serverTimestamp() })
      .then(function(){ cloudStatus("☁️ Synchronisé ✓"); })
      .catch(function(e){ cloudStatus("⚠️ Hors-ligne (sera synchronisé)"); console.error(e); });
  }, 800);
}
function startSync(uidStr){
  docRef=db.collection("bases").doc(uidStr);
  docRef.onSnapshot({includeMetadataChanges:true}, function(snap){
    if(snap.metadata.hasPendingWrites) return; // notre propre écriture en cours
    if(snap.exists){ var d=snap.data(); if(d && d.data){ try{ if(isTextEditing && isTextEditing()){ cloudStatus("☁️ Synchronisé ✓"); return; } applyRemote(JSON.parse(d.data)); render(); setTimeout(maybeAutoGoogleDriveBackup, 1200); }catch(e){ console.error(e); } } }
    cloudStatus(snap.metadata.fromCache ? "☁️ Hors-ligne (sera synchronisé)" : "☁️ Synchronisé ✓");
  }, function(err){ cloudStatus("⚠️ Erreur de synchro"); console.error(err); });
}
function cloudStatus(t){ var el=document.getElementById("cloudStatus"); if(el) el.textContent=t; }
function downloadJSON(text,name){
  var blob=new Blob([text],{type:"application/json"}), url=URL.createObjectURL(blob);
  var a=document.createElement("a"); a.href=url; a.download=name; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}
function googleDriveStatusText(){
  var s=state.settings||{};
  if(!s.googleDriveUrl) return "Google Drive non configuré.";
  var txt="✅ Google Drive configuré";
  if(s.googleDriveLastAt){
    try{ txt+=" · dernière sauvegarde : "+new Date(s.googleDriveLastAt).toLocaleString("fr-FR"); }
    catch(e){ txt+=" · dernière sauvegarde : "+frDate(s.googleDriveLast||""); }
  }else if(s.googleDriveLast){
    txt+=" · dernière sauvegarde : "+frDate(s.googleDriveLast);
  }
  if(s.googleDriveLastFile) txt+=" · fichier : "+s.googleDriveLastFile;
  return txt;
}
async function googleDriveBackup(manual){
  var s=state.settings||{};
  var url=(s.googleDriveUrl||"").trim();
  if(!url){ toast("Colle d'abord l'URL du script Google Drive dans Paramètres."); return; }
  try{
    if(manual) toast("Sauvegarde Google Drive en cours…");
    var payload={ token:"atelier-fleurs-sauvegarde-2026", replaceToday:true, sourceDate:todayISO(), data:serialize() };
    var res=await fetch(url,{ method:"POST", body:JSON.stringify(payload) });
    var txt=await res.text();
    var out={};
    try{ out=JSON.parse(txt); }catch(e){}
    if(!res.ok || out.success===false){ throw new Error(out.error||txt||("Erreur HTTP "+res.status)); }
    state.settings.googleDriveLast=todayISO();
    state.settings.googleDriveLastAt=new Date().toISOString();
    if(out.filename) state.settings.googleDriveLastFile=out.filename;
    try{ localStorage.setItem("afs_cache", JSON.stringify({data:serialize()})); }catch(e){}
    saveCloud();
    if(manual) toast((out.replaced?"Sauvegarde du jour remplacée dans Google Drive.":"Sauvegarde créée dans Google Drive.")+(out.filename?" Fichier : "+out.filename:""));
    render();
  }catch(e){ console.error(e); if(manual) toast("Sauvegarde Google Drive impossible : "+(e&&e.message?e.message:"vérifie l'URL du script.")); }
}
function maybeAutoGoogleDriveBackup(){
  var s=state.settings||{};
  if(!s.googleDriveAuto || !s.googleDriveUrl) return;
  if(s.googleDriveLast===todayISO()) return;
  googleDriveBackup(false);
}

async function googleDriveRestoreLatest(){
  var s=state.settings||{};
  var url=(s.googleDriveUrl||"").trim();
  if(!url){ toast("Colle d'abord l'URL du script Google Drive dans Paramètres."); return; }

  var msg="Restaurer la dernière sauvegarde Google Drive ?\n\nLes données actuelles de l'application seront remplacées dans Firebase par celles de la dernière sauvegarde Google Drive.\n\nAvant de continuer, assure-toi qu'une sauvegarde récente existe bien.";
  if(!confirm(msg)){ toast("Restauration Google Drive annulée."); return; }

  try{
    toast("Recherche de la dernière sauvegarde Google Drive…");
    var sep = url.indexOf("?")>=0 ? "&" : "?";
    var res = await fetch(url + sep + "action=latest&token=" + encodeURIComponent("atelier-fleurs-sauvegarde-2026"), { method:"GET" });
    var txt = await res.text();
    var out = {};
    try{ out = JSON.parse(txt); }catch(e){ throw new Error("Réponse Google Drive illisible."); }

    if(!res.ok || out.success===false){ throw new Error(out.error || txt || ("Erreur HTTP " + res.status)); }

    var payload = out.data || {};
    var data = payload && payload.data ? payload.data : payload;
    var looksValid = data && typeof data==="object" && (data.settings || data.clients || data.devis || data.factures || data.mariages || data.encaissements || data.commandes || data.achats);

    if(!looksValid){ throw new Error("La dernière sauvegarde Google Drive ne ressemble pas à une sauvegarde valide."); }

    applyData(data);
    ui.wizard=null; ui.factureDraft=null; ui.commandeDraft=null; ui.preview=null; ui.mariageOpen=null; ui.commandeOpen=null; ui.clientOpen=null; ui.confirmDelete=null; ui.tab="accueil";
    saveCache();
    render();
    toast("Sauvegarde Google Drive restaurée avec succès"+(out.filename?" : "+out.filename:"")+".");
  }catch(e){
    console.error(e);
    toast("Restauration Google Drive impossible : "+(e&&e.message?e.message:"vérifie le script Google Apps Script."));
  }
}

function updateDirty(){}
/* connexion */
function showApp(){ var l=document.getElementById("login"); if(l)l.style.display="none"; var a=document.getElementById("appwrap"); if(a)a.style.display="block"; }
function showLogin(){
  var a=document.getElementById("appwrap"); if(a)a.style.display="none";
  var l=document.getElementById("login"); if(l)l.style.display="flex";
  try{ var em=localStorage.getItem("afs_remember_email"); var e=document.getElementById("loginEmail"); if(em && e && !e.value){ e.value=em; var p=document.getElementById("loginPwd"); if(p) p.focus(); } }catch(e){}
}
function doLogin(){
  var email=(val("loginEmail")||"").trim(), pwd=val("loginPwd"); var err=document.getElementById("loginErr");
  var rm=document.getElementById("rememberMe"); var remember = rm ? rm.checked : true;
  if(err) err.style.display="none";
  var persist = remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
  auth.setPersistence(persist).then(function(){
    return auth.signInWithEmailAndPassword(email, pwd);
  }).then(function(){
    try{ if(remember){ localStorage.setItem("afs_remember_email", email); } else { localStorage.removeItem("afs_remember_email"); } }catch(e){}
  }).catch(function(e){
    console.error("Erreur connexion Firebase :", e);
    if(err){
      err.style.display="block";
      err.textContent="Connexion impossible : " + (e && e.code ? e.code : "") + " " + (e && e.message ? e.message : "vérifie l'email et le mot de passe.");
    }
  });
}

/* ===================== Numérotation ===================== */
function prochainNumero(type){
  var an=new Date().getFullYear(); var comp=state.settings.compteurs||{}; var cle=type+"_"+an;
  var n=(comp[cle]||0)+1; comp[cle]=n; state.settings.compteurs=comp;
  return (type==="devis"?"D":"F")+"-"+an+"-"+String(n).padStart(3,"0");
}

/* ===================== Toast ===================== */
var toastT=null;
function toast(msg){
  var ex=document.getElementById("toast"); if(ex) ex.remove();
  var d=document.createElement("div"); d.className="toast"; d.id="toast"; d.textContent=msg; document.body.appendChild(d);
  clearTimeout(toastT); toastT=setTimeout(function(){ if(d.parentNode) d.remove(); }, 4200);
}

/* ===================== Rendu : barres communes ===================== */
var TABS=[["accueil","Tableau de bord"],["stock","Matériel"],["clientsModule","Clients"],["documentsModule","Documents"],["financesModule","Finances"],["calendrier","Calendrier"],["catalogue","Catalogue"],["params","Paramètres"]];
function renderTabs(){
  document.getElementById("tabs").innerHTML=TABS.map(function(t){
    return '<button data-action="nav-'+t[0]+'" class="'+(ui.tab===t[0]?"active":"")+'">'+esc(t[1])+'</button>';
  }).join("");
}
function renderTopbar(){
  var en=document.getElementById("entName"); if(en) en.innerHTML=esc(state.settings.nomEntreprise||"L'Atelier Fleurs & Sens");
  var gs=document.getElementById("globalSearchInput");
  if(gs && ui.globalSearch){ gs.value=ui.globalSearch; renderGlobalSearchBox(); }
}


/* ===================== Navigation V2.0 : modules ===================== */
function subNav(items, current, prefix){
  return '<div class="row-actions" style="margin:0 0 14px;">'+items.map(function(it){
    return '<button class="btn small '+(current===it[0]?'primary':'ghost')+'" data-action="'+prefix+it[0]+'">'+esc(it[1])+'</button>';
  }).join("")+'</div>';
}

function moduleHeader(title, subtitle){
  return '<div class="flexb" style="margin-bottom:12px;"><div><h2 style="margin:0;">'+title+'</h2><p class="muted" style="margin:4px 0 0;">'+subtitle+'</p></div><span class="pill" style="background:var(--blush-s);color:var(--bordeaux);">'+esc(APP_VERSION)+'</span></div>';
}

function viewClientsModule(){
  var sub=ui.clientsSub||"clients";
  var html=moduleHeader("Clients","Fiches clientes, mariages, ateliers, ventes et commandes regroupés au même endroit.")+
    subNav([["clients","Fiches clientes"],["mariages","Mariages"],["ateliers","Ateliers"],["commandes","Suivi des Commandes"],["ventesSite","Ventes site internet"],["encaissements","Encaissements manuels"]],sub,"mod-clients-");
  if(sub==="mariages") return html+viewMariages();
  if(sub==="ateliers") return html+viewAteliers();
  if(sub==="commandes") return html+viewCommandes();
  if(sub==="ventesSite") return html+viewVentesSite();
  if(sub==="encaissements") return html+viewEncaissements();
  return html+viewClients();
}

function viewDocumentsModule(){
  var sub=ui.documentsSub||"devis";
  var html=moduleHeader("Documents","Création, suivi et envoi des devis, factures et emails.")+
    subNav([["devis","Devis"],["factures","Factures"],["emails","Emails"]],sub,"mod-documents-");
  if(sub==="factures") return html+viewFactures();
  if(sub==="emails") return html+viewEmails();
  return html+(ui.wizard?viewWizard():viewDevis());
}

function viewFinancesModule(){
  var sub=ui.financesSub||"tresorerie";
  var html=moduleHeader("Finances","Analyse globale : trésorerie, chiffre d’affaires, marge, achats fournisseurs.")+
    subNav([["tresorerie","Trésorerie"],["achats","Achats fournisseurs"]],sub,"mod-finances-");
  if(sub==="achats") return html+viewAchats();
  return html+viewTresorerie();
}


/* ===================== Recherche globale ===================== */
function searchNorm(s){
  return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();
}
function searchText(parts){
  return searchNorm(parts.map(function(p){
    if(p===undefined||p===null) return "";
    if(typeof p==="object"){ try{return JSON.stringify(p);}catch(e){return "";} }
    return String(p);
  }).join(" "));
}
function addSearchResult(arr,q,type,id,label,sub,parts,score){
  var text=searchText([label,sub].concat(parts||[]));
  var nq=searchNorm(q);
  if(!nq || text.indexOf(nq)<0) return;
  var exact=searchNorm(label).indexOf(nq)===0 ? 100 : 0;
  arr.push({type:type,id:id,label:label||"Résultat",sub:sub||"",score:(score||0)+exact});
}
function globalSearchResults(q){
  q=(q||"").trim();
  if(q.length<2) return [];
  var res=[];
  (state.clients||[]).forEach(function(c){
    addSearchResult(res,q,"client",c.id,"👤 "+(c.nom||"Client"),[c.email,c.tel,c.canal].filter(Boolean).join(" · "),[c],30);
  });
  (state.devis||[]).forEach(function(d){
    var t=totals(d.lignes||[],state.settings.partService);
    addSearchResult(res,q,"devis",d.id,"📄 "+(d.numero||"Devis")+" · "+((d.client&&d.client.nom)||"Client"),frDate(d.date)+" · "+euro(t.total),[d],50);
  });
  (state.factures||[]).forEach(function(f){
    addSearchResult(res,q,"facture",f.id,"🧾 "+(f.numero||"Facture")+" · "+((f.client&&f.client.nom)||"Client"),frDate(f.date)+" · "+euro(f.montant||0)+" · "+(TYPE_FAC[f.type]||"Facture"),[f],50);
  });
  (state.mariages||[]).forEach(function(m){
    addSearchResult(res,q,"mariage",m.id,"💍 Mariage · "+(m.nom||"Cliente"),[m.dateMariage?frDate(m.dateMariage):"",m.lieu,m.theme].filter(Boolean).join(" · "),[m],40);
  });
  (state.ateliers||[]).forEach(function(a){
    var mode=(typeof atelierModeLabel==="function")?atelierModeLabel(atelierMode(a)):"Atelier";
    addSearchResult(res,q,"atelier",a.id,"🎨 "+mode+" · "+(a.theme||a.type||"Atelier"),[a.date?frDate(a.date):"",a.lieu,a.organistrice||a.organisatrice,a.structureNom].filter(Boolean).join(" · "),[a],35);
  });
  (state.commandes||[]).forEach(function(c){
    addSearchResult(res,q,"commande",c.id,"📦 Commande · "+(c.client||c.label||"Client"),[c.dateLivraison?frDate(c.dateLivraison):"",c.label].filter(Boolean).join(" · "),[c],35);
  });
  (state.stockItems||[]).forEach(function(it){
    addSearchResult(res,q,"stock",it.id,"🌸 Stock · "+(it.nom||"Article"),[it.categorie,it.fournisseur,(it.quantite||0)+" "+(it.unite||""),euro(it.prixUnitaire||0)].filter(Boolean).join(" · "),[it],45);
  });
  (state.ventesSite||[]).forEach(function(s){
    addSearchResult(res,q,"venteSite",s.id,"🌐 Vente site · "+(s.client||"Client"),[s.commande,s.produit,euro(s.montant||0),s.date?frDate(s.date):""].filter(Boolean).join(" · "),[s],25);
  });
  (state.encaissements||[]).forEach(function(e){
    addSearchResult(res,q,"encaissement",e.id,"💶 Encaissement · "+(e.client||e.libelle||"Vente"),[e.date?frDate(e.date):"",e.libelle,euro((e.montantBiens||0)+(e.montantServices||0))].filter(Boolean).join(" · "),[e],20);
  });
  (state.achats||[]).forEach(function(a){
    addSearchResult(res,q,"achat",a.id,"🛒 Achat · "+(a.fournisseur||a.libelle||"Fournisseur"),[a.date?frDate(a.date):"",a.categorie,euro(a.montant||0)].filter(Boolean).join(" · "),[a],20);
  });
  (state.catalogue||[]).forEach(function(p){
    addSearchResult(res,q,"catalogue",p.id,"📦 Catalogue · "+(p.designation||p.nom||"Article"),[p.type,euro(p.prix||0)].filter(Boolean).join(" · "),[p],15);
  });
  return res.sort(function(a,b){return b.score-a.score || a.label.localeCompare(b.label);}).slice(0,14);
}
function renderGlobalSearchBox(){
  var input=document.getElementById("globalSearchInput"), box=document.getElementById("globalSearchResults");
  if(!input||!box) return;
  var q=input.value||"";
  ui.globalSearch=q;
  if(q.trim().length<2){ box.className="global-results"; box.innerHTML=""; return; }
  var res=globalSearchResults(q);
  box.className="global-results open";
  if(!res.length){ box.innerHTML='<div class="global-nores">Aucun résultat trouvé.</div>'; return; }
  box.innerHTML=res.map(function(r){
    return '<button class="global-result" data-action="global-open-'+esc(r.type)+'-'+esc(r.id)+'">'+
      '<div class="type">'+esc(r.type)+'</div>'+
      '<b>'+esc(r.label)+'</b>'+
      (r.sub?'<div class="sub">'+esc(r.sub)+'</div>':'')+
    '</button>';
  }).join("");
}
function clearGlobalSearch(){
  ui.globalSearch="";
  var input=document.getElementById("globalSearchInput"), box=document.getElementById("globalSearchResults");
  if(input) input.value="";
  if(box){ box.className="global-results"; box.innerHTML=""; }
}
function openGlobalResult(type,id){
  clearGlobalSearch();
  ui.preview=null; ui.wizard=null; ui.confirmDelete=null;
  if(type==="client"){ ui.tab="clientsModule"; ui.clientsSub="clients"; ui.clientOpen=id; render(); window.scrollTo(0,0); return; }
  if(type==="devis"){ var d=findDevis(id); if(d){ ui.tab="documentsModule"; ui.documentsSub="devis"; ui.preview={kind:"devis",doc:d}; render(); } return; }
  if(type==="facture"){ var f=(state.factures||[]).find(function(x){return x.id===id;}); if(f){ ui.tab="documentsModule"; ui.documentsSub="factures"; ui.preview={kind:"facture",doc:f}; render(); } return; }
  if(type==="mariage"){ ui.tab="clientsModule"; ui.clientsSub="mariages"; ui.mariageOpen=id; ui.atelierOpen=null; ui.commandeOpen=null; render(); window.scrollTo(0,0); return; }
  if(type==="atelier"){ ui.tab="clientsModule"; ui.clientsSub="ateliers"; ui.atelierOpen=id; ui.mariageOpen=null; ui.commandeOpen=null; render(); window.scrollTo(0,0); return; }
  if(type==="commande"){ ui.tab="clientsModule"; ui.clientsSub="commandes"; ui.commandeOpen=id; ui.commandeDraft=null; render(); window.scrollTo(0,0); return; }
  if(type==="stock"){ ui.tab="stock"; render(); window.scrollTo(0,0); return; }
  if(type==="venteSite"){ ui.tab="clientsModule"; ui.clientsSub="ventesSite"; render(); window.scrollTo(0,0); return; }
  if(type==="encaissement"){ ui.tab="clientsModule"; ui.clientsSub="encaissements"; render(); window.scrollTo(0,0); return; }
  if(type==="achat"){ ui.tab="financesModule"; ui.financesSub="achats"; render(); window.scrollTo(0,0); return; }
  if(type==="catalogue"){ ui.tab="catalogue"; render(); window.scrollTo(0,0); return; }
}

/* ===================== Vue principale ===================== */
function render(){
  renderTabs(); renderTopbar();
  var v=document.getElementById("view");
  if(ui.tab==="accueil") v.innerHTML=viewDashboard();
  else if(ui.tab==="clientsModule") v.innerHTML=viewClientsModule();
  else if(ui.tab==="documentsModule") v.innerHTML=viewDocumentsModule();
  else if(ui.tab==="financesModule") v.innerHTML=viewFinancesModule();
  else if(ui.tab==="stock") v.innerHTML=viewStock();
  else if(ui.tab==="calendrier") v.innerHTML=viewCalendrier();
  else if(ui.tab==="catalogue") v.innerHTML=viewCatalogue();
  else if(ui.tab==="params") v.innerHTML=viewParams();

  // Fallbacks internes : utiles pour les anciens raccourcis, liens de calendrier ou restaurations
  else if(ui.tab==="commandes") v.innerHTML=viewCommandes();
  else if(ui.tab==="ateliers") v.innerHTML=viewAteliers();
  else if(ui.tab==="mariages") v.innerHTML=viewMariages();
  else if(ui.tab==="devis") v.innerHTML= ui.wizard? viewWizard() : viewDevis();
  else if(ui.tab==="factures") v.innerHTML=viewFactures();
  else if(ui.tab==="emails") v.innerHTML=viewEmails();
  else if(ui.tab==="encaissements") v.innerHTML=viewEncaissements();
  else if(ui.tab==="tresorerie") v.innerHTML=viewTresorerie();
  else if(ui.tab==="ventesSite") v.innerHTML=viewVentesSite();
  else if(ui.tab==="achats") v.innerHTML=viewAchats();
  else if(ui.tab==="clients") v.innerHTML=viewClients();
  else if(ui.tab==="stock") v.innerHTML=viewStock();
  else v.innerHTML=viewDashboard();
  renderModal();
}
function renderModal(){
  var ex=document.getElementById("modal"); if(ex) ex.remove();
  var lb=document.getElementById("lightbox"); if(lb) lb.remove();

  if(ui.paymentPrompt){
    var pp=ui.paymentPrompt;
    var m=document.createElement("div");
    m.id="modal";
    m.className="modal";
    m.innerHTML='<div class="card" style="max-width:520px;margin:8vh auto;">'+
      '<h2>'+esc(pp.title||"Moyen de paiement")+'</h2>'+
      '<p class="muted">'+esc(pp.message||"Choisis le moyen de paiement dans la liste.")+'</p>'+
      '<label class="field"><span>Moyen de paiement</span>'+paymentSelectHtml("paymentPromptSelect", pp.value||"")+'</label>'+
      '<div class="row-actions">'+
        '<button class="btn primary" data-action="payment-prompt-ok">Valider</button>'+
        '<button class="btn ghost" data-action="payment-prompt-cancel">Annuler</button>'+
      '</div>'+
    '</div>';
    document.body.appendChild(m);
    setTimeout(function(){
      var sel=document.getElementById("paymentPromptSelect");
      if(sel){ try{ sel.focus(); }catch(e){} }
    },80);
    return;
  }

  if(ui.stockEditId){
    var stockItem=(state.stockItems||[]).find(function(x){return x.id===ui.stockEditId;});
    if(stockItem){
      var sm=document.createElement("div");
      sm.innerHTML=viewStockEditModal(stockItem);
      document.body.appendChild(sm.firstElementChild);
      setTimeout(function(){ var f=document.getElementById("stockEditNom"); if(f){ try{f.focus();}catch(e){} } },60);
      return;
    }
    ui.stockEditId=null;
  }

  if(ui.versionNotesModal){
    var vm=document.createElement("div");
    vm.innerHTML=viewVersionNotesModal();
    document.body.appendChild(vm.firstElementChild);
    return;
  }

  if(ui.pendingPaymentsModal){
    var pm=document.createElement("div");
    pm.innerHTML=viewPendingPaymentsModal();
    document.body.appendChild(pm.firstElementChild);
  }
  if(ui.preview){
    var d=document.createElement("div");
    d.innerHTML=viewDoc(ui.preview);
    document.body.appendChild(d.firstElementChild);
  }
  if(ui.lightbox){
    var l=document.createElement("div"); l.id="lightbox"; l.className="modal"; l.setAttribute("data-action","lightbox-close");
    l.innerHTML='<div style="max-width:900px;margin:0 auto;text-align:center;"><img src="'+ui.lightbox+'" style="max-width:100%;max-height:88vh;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.4);"><div style="margin-top:10px;"><button class="btn ghost" data-action="lightbox-close">Fermer</button></div></div>';
    document.body.appendChild(l);
  }
}

/* ===================== Tableau de bord ===================== */
function siteSaleSplit(s){
  var montant=Number(s&&s.montant)||0;
  var mb=Number(s&&s.montantBiens)||0, ms=Number(s&&s.montantServices)||0;
  if(mb||ms) return {biens:r2(mb), services:r2(ms), total:r2(mb+ms)};
  var act=(s&&s.activite||"").toLowerCase();
  if(act.indexOf("atelier")>=0) return {biens:0, services:r2(montant), total:r2(montant)};
  if(act.indexOf("produit")>=0 || act.indexOf("box")>=0) return {biens:r2(montant), services:0, total:r2(montant)};
  if(act.indexOf("mariage")>=0){
    var p=(Number(state.settings.partService)||0)/100;
    return {biens:r2(montant*(1-p)), services:r2(montant*p), total:r2(montant)};
  }
  return {biens:r2(montant), services:0, total:r2(montant)};
}

function caAnnee(annee){
  var biens=new Array(12).fill(0), services=new Array(12).fill(0);
  state.factures.forEach(function(f){
    if(f.statut==="payee"&&f.datePaiement&&f.datePaiement.slice(0,4)===String(annee)){
      var m=parseInt(f.datePaiement.slice(5,7),10)-1; biens[m]+=Number(f.montantBiens)||0; services[m]+=Number(f.montantServices)||0;
    }
  });
  state.encaissements.forEach(function(e){
    if(e.date&&e.date.slice(0,4)===String(annee)){
      var m2=parseInt(e.date.slice(5,7),10)-1; biens[m2]+=Number(e.montantBiens)||0; services[m2]+=Number(e.montantServices)||0;
    }
  });
  (state.ventesSite||[]).forEach(function(s){
    if(s.date&&s.date.slice(0,4)===String(annee)){
      var m3=parseInt(s.date.slice(5,7),10)-1, sp=siteSaleSplit(s); biens[m3]+=sp.biens||0; services[m3]+=sp.services||0;
    }
  });
  return {biens:biens.map(r2),services:services.map(r2)};
}
function caMoisSplit(annee, moisIndex){
  var ca=caAnnee(annee), b=ca.biens[moisIndex]||0, s=ca.services[moisIndex]||0;
  return {biens:r2(b), services:r2(s), total:r2(b+s)};
}
function anneesDispo(){
  var s={}; state.factures.forEach(function(f){ if(f.datePaiement) s[f.datePaiement.slice(0,4)]=1; });
  state.encaissements.forEach(function(e){ if(e.date) s[e.date.slice(0,4)]=1; });
  s[String(new Date().getFullYear())]=1;
  return Object.keys(s).sort();
}


function atelierPendingPaymentItems(){
  var items=[];
  (state.ateliers||[]).forEach(function(a){
    if(!a || a.statut==="annule" || a.statut==="termine") return;
    var t=atelierTotals(a);
    var date=a.date||todayISO();
    var title=(typeof atelierModeLabel==="function"?atelierModeLabel(atelierMode(a)):"Atelier")+" · "+(a.theme||a.type||"atelier");
    var contact=a.organisatrice||a.structureNom||"";
    if((Number(t.resteNonFacture)||0)>0){
      items.push({
        kind:"atelier",
        id:a.id,
        date:date,
        label:title,
        client:contact||"Atelier",
        montant:Number(t.resteNonFacture)||0,
        motif:"À facturer",
        detail:"Montant atelier prévu non encore facturé"
      });
    }
    if((Number(t.siteSolde)||0)>0){
      items.push({
        kind:"atelier",
        id:a.id,
        date:date,
        label:title,
        client:contact||"Participantes site internet",
        montant:Number(t.siteSolde)||0,
        motif:"Solde jour J",
        detail:"Solde restant à encaisser le jour de l’atelier"
      });
    }
  });
  return items;
}
function pendingPaymentsTotal(){
  var factures=state.factures.filter(function(f){return f.statut!=="payee";}).reduce(function(a,f){return a+(Number(f.montant)||0);},0);
  var ateliers=atelierPendingPaymentItems().reduce(function(a,i){return a+(Number(i.montant)||0);},0);
  return r2(factures+ateliers);
}

function pendingPaymentsList(){
  var factures=state.factures.filter(function(f){return f.statut!=="payee";})
    .map(function(f){
      return {
        kind:"facture",
        id:f.id,
        date:f.echeance||f.date||"9999",
        numero:f.numero||"Facture",
        type:f.type,
        statut:f.statut,
        client:(f.client&&f.client.nom)||"Cliente non renseignée",
        montant:Number(f.montant)||0,
        paiementClient:f.paiementClient||"",
        devisNumero:f.devisNumero||""
      };
    });
  return factures.concat(atelierPendingPaymentItems())
    .sort(function(a,b){
      return (a.date||"9999").localeCompare(b.date||"9999") || (a.numero||a.label||"").localeCompare(b.numero||b.label||"");
    });
}
function viewPendingPaymentsModal(){
  var list=pendingPaymentsList();
  var total=list.reduce(function(s,f){return s+(Number(f.montant)||0);},0);
  var html='<div id="modal" class="modal"><div class="modal-inner">'+
    '<div class="modal-actions"><button class="btn ghost" data-action="pending-close">Fermer</button></div>'+
    '<div class="card" style="background:#fff;"><div class="flexb"><h2 style="margin:0;">À encaisser prochainement</h2><div style="font-weight:800;color:var(--bordeaux);font-size:20px;">'+euro(total)+'</div></div>'+
    '<p class="muted" style="margin:8px 0 12px;">Détail des factures non payées, des ateliers à facturer et des soldes à encaisser.</p>';
  if(!list.length){
    html+='<p class="muted" style="margin:0;">Aucun montant en attente.</p>';
  }else{
    list.forEach(function(f){
      if(f.kind==="atelier"){
        html+='<div class="checkrow" style="align-items:flex-start;">'+
          '<div style="flex:1;">'+
            '<div><b style="color:var(--bordeaux);">🎨 '+esc(f.motif)+'</b> · '+esc(f.label||"Atelier")+'</div>'+
            '<div class="muted" style="font-size:12px;">Contact : '+esc(f.client||"Atelier")+'</div>'+
            '<div class="muted" style="font-size:12px;">Date atelier : '+(f.date?frDate(f.date):"non renseignée")+' · '+esc(f.detail||"")+'</div>'+
          '</div>'+
          '<div style="text-align:right;min-width:110px;"><b style="color:var(--bordeaux);">'+euro(f.montant||0)+'</b><div style="margin-top:6px;"><button class="btn small ghost" data-action="pending-atelier-'+f.id+'">Ouvrir</button></div></div>'+
        '</div>';
      }else{
        var st=ST_FAC[f.statut]||ST_FAC.a_envoyer;
        html+='<div class="checkrow" style="align-items:flex-start;">'+
          '<div style="flex:1;">'+
            '<div><b style="color:var(--bordeaux);">'+esc(f.numero||"Facture")+'</b> · '+esc(TYPE_FAC[f.type]||"Facture")+' <span class="badge" style="color:'+st.c+';background:'+st.b+';">'+st.l+'</span></div>'+
            '<div class="muted" style="font-size:12px;">Cliente : '+esc(f.client||"Cliente non renseignée")+'</div>'+
            '<div class="muted" style="font-size:12px;">Échéance : '+(f.date?frDate(f.date):"non renseignée")+(f.paiementClient?' · Paiement prévu/renseigné : '+esc(f.paiementClient):'')+'</div>'+
            (f.devisNumero?'<div class="muted" style="font-size:12px;">Réf. devis : '+esc(f.devisNumero)+'</div>':'')+
          '</div>'+
          '<div style="text-align:right;min-width:110px;"><b style="color:var(--bordeaux);">'+euro(f.montant||0)+'</b><div style="margin-top:6px;"><button class="btn small ghost" data-action="pending-preview-'+f.id+'">Aperçu</button></div></div>'+
        '</div>';
      }
    });
  }
  html+='</div></div></div>';
  return html;
}



function viewVersionDashboard(){
  var env = APP_VERSION.indexOf("TEST")>=0 ? "TEST" : "PROD";
  var bg = env==="TEST" ? "#fffaf5" : "#eef7f1";
  var border = env==="TEST" ? "var(--gold-s)" : "#9fc9ab";
  return '<div class="card" style="background:'+bg+';border-color:'+border+';margin-bottom:12px;padding:10px 14px;">'+
    '<div class="flexb" style="gap:8px;">'+
      '<div><b style="color:var(--green);">✅ Version : '+esc(APP_VERSION)+'</b><div class="muted" style="font-size:12px;margin-top:2px;">☁ Synchronisation active · '+esc(APP_VERSION_NOTE)+'</div></div>'+ 
      '<button class="btn small ghost" data-action="version-notes-open">ℹ️ Notes de version</button>'+ 
    '</div>'+ 
  '</div>';
}
function viewVersionNotesModal(){
  var changes=(APP_CHANGELOG||[]).map(function(item){ return '<li>'+esc(item)+'</li>'; }).join('');
  var road=(APP_ROADMAP||[]).map(function(item){ return '<li>'+esc(item)+'</li>'; }).join('');
  return '<div id="modal" class="modal"><div class="modal-inner">'+
    '<div class="modal-actions"><button class="btn ghost" data-action="version-notes-close">Fermer</button></div>'+ 
    '<div class="card" style="background:#fff;">'+
      '<h2 style="margin-top:0;">À propos de l’application</h2>'+ 
      '<div class="summary" style="margin-bottom:14px;"><b style="color:var(--bordeaux);">'+esc(APP_VERSION)+'</b><div class="muted" style="font-size:12px;margin-top:4px;">'+esc(APP_VERSION_NOTE)+'</div></div>'+ 
      '<div class="inline" style="align-items:flex-start;">'+
        '<div><h3 style="margin:0 0 8px;">Modifications récentes</h3><ul style="margin:0 0 0 18px;padding:0;font-size:13px;line-height:1.6;">'+changes+'</ul></div>'+ 
        '<div><h3 style="margin:0 0 8px;">Prochaines étapes</h3><ul style="margin:0 0 0 18px;padding:0;font-size:13px;line-height:1.6;">'+road+'</ul></div>'+ 
      '</div>'+ 
    '</div>'+ 
  '</div></div>';
}
function dashboardKpiCounts(){
  var today=todayISO();
  var devis=(state.devis||[]).filter(function(d){return d.statut==="envoye" || d.statut==="brouillon";}).length;
  var ateliers=(state.ateliers||[]).filter(function(a){return a.date && a.date>=today && a.statut!=="annule" && a.statut!=="termine";}).length;
  var mariages=(state.mariages||[]).filter(function(m){
    if(mariageTermine(m)) return false;
    var d=m.dateLivraison||m.dateMariage||"";
    return d && d>=today;
  }).length;
  return {devis:devis,ateliers:ateliers,mariages:mariages};
}
function viewDashboardHero(){
  var notifications=dashboardPriorityNotifications();
  var attention=notifications.length;
  var dateLabel=new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  dateLabel=dateLabel.charAt(0).toUpperCase()+dateLabel.slice(1);
  var attentionText=attention
    ? attention+" action"+(attention>1?"s":"")+" nécessite"+(attention>1?"nt":"")+" ton attention."
    : "Aucune action prioritaire : tout est à jour.";
  return '<div class="card" style="background:linear-gradient(135deg,#fffdfb,#f4e4dd);border-color:var(--gold-s);margin-bottom:14px;">'+
    '<div class="serif" style="font-size:25px;font-weight:700;color:var(--bordeaux);">Bonjour Élodie 🌸</div>'+ 
    '<p class="muted" style="margin:5px 0 0;">'+esc(dateLabel)+' · '+esc(attentionText)+'</p>'+ 
    '<div class="row-actions" style="margin-top:14px;">'+
      '<button class="btn primary" data-action="dash-rdv-mariage">🎯 Préparer un RDV mariage</button>'+ 
      '<button class="btn gold" data-action="at-new">🌸 Nouvel atelier</button>'+ 
      '<button class="btn ghost" data-action="newdevis">📄 Nouveau devis</button>'+ 
    '</div>'+ 
  '</div>';
}
function kpiCard(icon,lab,val,action,hint){
  return '<div class="stat" '+(action?'data-action="'+action+'" style="cursor:pointer;"':'')+'><div class="lab">'+icon+' '+esc(lab)+'</div><div class="val" style="font-size:24px;">'+val+'</div>'+(hint?'<div class="muted" style="font-size:11px;margin-top:4px;">'+esc(hint)+'</div>':'')+'</div>';
}
function viewDashboardKpis(enAttente){
  var c=dashboardKpiCounts();
  return '<div class="grid-stats" style="margin-bottom:14px;">'+
    kpiCard('💰','À encaisser',euro(enAttente),'dash-pending-payments','Factures, acomptes, soldes et ateliers')+
    kpiCard('📄','Devis en attente',String(c.devis),'nav-devis','Brouillons ou envoyés')+
    kpiCard('🌸','Ateliers à venir',String(c.ateliers),'nav-ateliers','À partir d’aujourd’hui')+
    kpiCard('💍','Mariages à venir',String(c.mariages),'nav-mariages','Non terminés')+
  '</div>';
}
function viewDashboardNextSevenDays(){
  var today=todayISO(), end=addDays(today,7);
  var events=calEvents().filter(function(e){return e.date>=today && e.date<=end;}).slice(0,8);
  var html='<div class="card" style="margin-bottom:14px;"><div class="flexb"><h3 style="margin:0;">📆 Les 7 prochains jours</h3><button class="btn small ghost" data-action="go-calendrier">Calendrier</button></div>';
  if(!events.length) return html+'<p class="muted" style="margin:10px 0 0;">Aucun événement ou paiement prévu dans les 7 prochains jours.</p></div>';
  var by={};
  events.forEach(function(e){ by[e.date]=by[e.date]||[]; by[e.date].push(e); });
  Object.keys(by).sort().forEach(function(date){
    html+='<div style="margin-top:10px;"><div class="muted" style="font-size:12px;font-weight:700;text-transform:uppercase;">'+frDate(date)+'</div>';
    by[date].forEach(function(e){
      html+='<button data-action="'+esc(e.action)+'" style="width:100%;border:none;background:#fff;text-align:left;cursor:pointer;font-family:inherit;padding:8px 0;border-bottom:1px solid var(--line);"><b style="color:var(--bordeaux);">'+e.icon+' '+esc(e.title)+'</b><div class="muted" style="font-size:12px;">'+(e.sub?esc(e.sub):'')+'</div></button>';
    });
    html+='</div>';
  });
  return html+'</div>';
}
function viewDashboardUrssaf(currentMonthSplit, monthLabel){
  return '<div class="card" style="border-color:var(--bordeaux);background:#fffaf5;margin-bottom:14px;">'+
    '<div class="flexb" style="margin-bottom:10px;"><h3 style="margin:0;">🧾 Déclaration URSSAF du mois</h3><span class="badge" style="background:var(--blush-s);color:var(--bordeaux);">'+monthLabel+'</span></div>'+ 
    '<div class="grid-stats" style="margin-bottom:0;">'+
      stat("CA total à déclarer", euro(currentMonthSplit.total), true)+
      stat("Vente de biens", euro(currentMonthSplit.biens), false, "var(--blush-s)")+
      stat("Prestations de services", euro(currentMonthSplit.services), false, "var(--green-s)")+
    '</div>'+ 
    '<p class="muted" style="margin:10px 0 0;font-size:12px;">Calculé sur les encaissements réellement payés du mois : factures payées, encaissements manuels et ventes site internet.</p>'+ 
  '</div>';
}

function viewTodoDashboard(){
  return '<div class="card" style="border-color:var(--gold-s);background:#fffaf5;margin-bottom:14px;">'+
    '<div class="flexb" style="margin-bottom:8px;"><h3 style="margin:0;">📝 Todo list</h3><button class="btn small gold" data-action="dash-todo-save">Enregistrer</button></div>'+
    '<div class="inline">'+
      '<div><label class="field"><span>Choses à faire</span><textarea id="dashTodoList" style="min-height:120px;" placeholder="Ex : relancer une cliente, préparer un devis, commander des fleurs…">'+esc(state.todoList||"")+'</textarea></label></div>'+
      '<div><label class="field"><span>Achats à faire</span><textarea id="dashShoppingList" style="min-height:120px;" placeholder="Ex : rubans, colle chaude, fleurs, cartons, matériel atelier…">'+esc(state.shoppingList||"")+'</textarea></label></div>'+
    '</div>'+
    '<p class="muted" style="margin:0;font-size:12px;">Cette liste ne sauvegarde plus à chaque lettre. Clique sur Enregistrer ou quitte le champ.</p>'+
  '</div>';
}


function dashboardPriorityNotifications(){
  var today=todayISO();
  var soon7=addDays(today,7);
  var soon14=addDays(today,14);
  var items=[];
  function add(level,title,detail,amount,action,sortDate){
    items.push({level:level,title:title,detail:detail||"",amount:amount,action:action||"",sortDate:sortDate||today});
  }
  function levelRank(l){ return l==="danger"?0:(l==="warning"?1:2); }

  (state.factures||[]).forEach(function(f){
    if(f.statut==="payee") return;
    var due=f.echeance||f.date||"";
    var client=(f.client&&f.client.nom)||"Cliente non renseignée";
    var label=(f.numero||"Facture")+" · "+(TYPE_FAC[f.type]||"Facture");
    if(due && due<today){
      add("danger","Facture échue",label+" · "+client+" · échéance "+frDate(due),Number(f.montant)||0,"notif-open-facture-"+f.id,due);
    }else if(due && due<=soon7){
      add("warning","Facture à encaisser bientôt",label+" · "+client+" · échéance "+frDate(due),Number(f.montant)||0,"notif-open-facture-"+f.id,due);
    }
  });

  (state.devis||[]).forEach(function(d){
    if(d.statut!=="envoye") return;
    if(d.date && d.date<=addDays(today,-7)){
      var client=(d.client&&d.client.nom)||"Cliente non renseignée";
      add("warning","Devis à relancer",(d.numero||"Devis")+" · "+client+" · envoyé le "+frDate(d.date),totals(d.lignes||[],state.settings.partService).total,"notif-open-devis-"+d.id,d.date);
    }
  });

  (state.mariages||[]).forEach(function(m){
    if(mariageTermine(m)) return;
    var dl=m.dateLivraison||m.dateMariage||"";
    if(dl && dl>=today && dl<=soon14){
      add("warning","Mariage proche",(m.nom||"Cliente")+" · livraison/mariage le "+frDate(dl)+(m.lieu?" · "+m.lieu:""),null,"notif-open-mariage-"+m.id,dl);
    }
  });

  (state.ateliers||[]).forEach(function(a){
    if(a.statut==="annule"||a.statut==="termine") return;
    if(a.date && a.date>=today && a.date<=soon7){
      add("info","Atelier à venir",atelierModeLabel(atelierMode(a))+" · "+(a.theme||"À compléter")+" · "+frDate(a.date),atelierTotals(a).total,"notif-open-atelier-"+a.id,a.date);
    }
  });

  (state.stockItems||[]).forEach(function(it){
    if(Number(it.seuil)>0 && Number(it.quantite)<=Number(it.seuil)){
      add("warning","Stock bas",(it.nom||"Article")+" · reste "+(Number(it.quantite)||0)+" "+(it.unite||"")+" · seuil "+(Number(it.seuil)||0),null,"nav-stock",today);
    }
  });

  items.sort(function(a,b){
    return levelRank(a.level)-levelRank(b.level) || (a.sortDate||"").localeCompare(b.sortDate||"") || (a.title||"").localeCompare(b.title||"");
  });
  return items.slice(0,10);
}
function viewNotificationsDashboard(){
  var items=dashboardPriorityNotifications();
  var danger=items.filter(function(i){return i.level==="danger";}).length;
  var warning=items.filter(function(i){return i.level==="warning";}).length;
  var title=danger?"🔴 "+danger+" urgence"+(danger>1?"s":""):(warning?"🟠 "+warning+" point"+(warning>1?"s":"")+" à surveiller":"🟢 Tout est calme");
  var html='<div class="card" style="border-color:var(--bordeaux);background:#fffdfb;margin-bottom:14px;">'+
    '<div class="flexb" style="align-items:flex-start;"><div><h3 style="margin:0;">🔔 Centre de notifications</h3><p class="muted" style="margin:4px 0 0;font-size:12px;">Actions prioritaires calculées automatiquement : factures, devis, mariages, ateliers et stock.</p></div><span class="badge" style="background:var(--blush-s);color:var(--bordeaux);">'+esc(title)+'</span></div>';
  if(!items.length){
    html+='<p class="muted" style="margin:12px 0 0;">Aucune alerte prioritaire pour le moment.</p>';
  }else{
    html+='<div style="margin-top:10px;">';
    items.forEach(function(it){
      var bg=it.level==="danger"?"#fbe6df":(it.level==="warning"?"#fbf3e6":"var(--green-s)");
      var icon=it.level==="danger"?"⚠️":(it.level==="warning"?"⏳":"ℹ️");
      html+='<div class="checkrow" style="align-items:flex-start;background:'+bg+';border-radius:10px;border-bottom:none;margin-bottom:7px;padding:10px;">'+
        '<div style="flex:1;min-width:0;"><div><b style="color:var(--bordeaux);">'+icon+' '+esc(it.title)+'</b></div><div class="muted" style="font-size:12px;margin-top:2px;">'+esc(it.detail)+'</div></div>'+
        '<div style="text-align:right;min-width:96px;">'+(it.amount!=null?'<b style="color:var(--bordeaux);">'+euro(it.amount)+'</b>':'')+(it.action?'<div style="margin-top:6px;"><button class="btn small ghost" data-action="'+esc(it.action)+'">Ouvrir</button></div>':'')+'</div>'+
      '</div>';
    });
    html+='</div>';
  }
  html+='</div>';
  return html;
}

function viewDashboard(){
  return ''+
  '<div class="flexb" style="margin-bottom:14px;"><div><h2 style="margin:0;">Tableau de bord</h2><div class="muted" style="font-size:12px;margin-top:3px;">Ton espace de travail du jour</div></div></div>'+ 
  viewVersionDashboard()+
  viewDashboardHero()+
  viewTodoDashboard()+
  viewNotificationsDashboard()+
  viewDashboardMariageProgress();
}
function monthSales(year, mi){
  var pref=String(year)+"-"+("0"+(mi+1)).slice(-2), items=[];
  state.encaissements.forEach(function(e){
    if(e.date && e.date.slice(0,7)===pref){
      var mb=Number(e.montantBiens)||0, ms=Number(e.montantServices)||0;
      items.push({date:e.date, label:e.libelle||"(vente)", client:e.client||"", montant:r2(mb+ms), biens:r2(mb), services:r2(ms), type:"Encaissement"});
    }
  });
  state.factures.forEach(function(f){
    if(f.statut==="payee" && f.datePaiement && f.datePaiement.slice(0,7)===pref){
      var fb=Number(f.montantBiens)||0, fs=Number(f.montantServices)||0;
      items.push({date:f.datePaiement, label:f.numero+" ("+TYPE_FAC[f.type].toLowerCase()+")", client:(f.client&&f.client.nom)||"", montant:r2(fb+fs), biens:r2(fb), services:r2(fs), type:"Facture"});
    }
  });
  (state.ventesSite||[]).forEach(function(s){
    if(s.date && s.date.slice(0,7)===pref){
      var sp=siteSaleSplit(s);
      items.push({date:s.date, label:(s.commande?("Squarespace "+s.commande+" · "):"")+(s.produit||"Vente site"), client:s.client||"", montant:sp.total, biens:sp.biens, services:sp.services, type:"Vente site"});
    }
  });
  items.sort(function(a,b){ return (a.date||"").localeCompare(b.date||""); });
  return items;
}
function monthDetailCard(an){
  if(!ui.monthDetail || ui.monthDetail.year!==an) return "";
  var mi=ui.monthDetail.month, items=monthSales(an, mi);
  var totB=r2(items.reduce(function(s,x){return s+(x.biens||0);},0));
  var totS=r2(items.reduce(function(s,x){return s+(x.services||0);},0));
  var tot=r2(totB+totS);
  var rows = items.length ? items.map(function(it){
    return '<div class="checkrow" style="align-items:flex-start;"><div style="flex:1;"><div>'+esc(it.label)+(it.client?' <span class="muted">· '+esc(it.client)+'</span>':'')+'</div>'+
      '<div class="muted" style="font-size:12px;">'+frDate(it.date)+' · '+it.type+' · '+euro(it.biens)+' biens · '+euro(it.services)+' services</div></div><div style="font-weight:600;white-space:nowrap;">'+euro(it.montant)+'</div></div>';
  }).join("") : '<p class="muted" style="margin:0;">Aucune vente encaissée ce mois-ci.</p>';
  return '<div class="card"><div class="flexb" style="margin-bottom:8px;"><h3 style="margin:0;">Ventes de '+MOISL[mi]+' '+an+'</h3>'+
    '<button class="btn small ghost" data-action="dash-month-close">Fermer</button></div>'+
    rows+(items.length?'<div style="border-top:2px solid var(--bordeaux);margin-top:8px;padding-top:6px;"><div class="totrow" style="font-weight:700;color:var(--bordeaux);"><span>Total encaissé</span><span>'+euro(tot)+'</span></div><div class="muted" style="text-align:right;font-size:12px;">'+euro(totB)+' biens · '+euro(totS)+' services</div></div>':'')+'</div>';
}
function stat(lab,val,big,bg,action){
  return '<div class="stat"'+(bg?' style="background:'+bg+';"':"")+(action?' data-action="'+action+'" style="'+(bg?'background:'+bg+';':'')+'cursor:pointer;" title="Cliquer pour voir le détail"':"")+'><div class="lab">'+esc(lab)+'</div><div class="val" style="font-size:'+(big?26:20)+'px;">'+val+'</div>'+(action?'<div class="muted" style="font-size:11px;margin-top:4px;">Voir le détail →</div>':'')+'</div>';
}
function jauge(lab,v,seuil,pct,color){
  return '<div class="jauge" style="margin-bottom:12px;"><div class="flexb" style="font-size:13px;margin-bottom:4px;"><span style="font-weight:600;">'+esc(lab)+'</span><span class="muted">'+euro(v)+' / '+euro(seuil)+'</span></div>'+
    '<div class="track"><div class="fill" style="width:'+pct+'%;background:'+color+';"></div></div></div>';
}

/* ===================== Devis : liste ===================== */
function facturesDuDevis(id){ return state.factures.filter(function(f){return f.devisId===id;}); }
function viewDevis(){
  var filtre = ui.devisFiltre || "actifs";
  var actifs = state.devis.filter(function(d){ return d.statut !== "accepte" && d.statut !== "refuse" && d.statut !== "archive"; });
  var acceptes = state.devis.filter(function(d){ return d.statut === "accepte"; });
  var refuses = state.devis.filter(function(d){ return d.statut === "refuse"; });
  var archives = state.devis.filter(function(d){ return d.statut === "archive"; });
  var liste = actifs;
  if(filtre === "acceptes") liste = acceptes;
  if(filtre === "refuses") liste = refuses;
  if(filtre === "archives") liste = archives;

  var html = '<div class="flexb" style="margin-bottom:14px;">'+
    '<div><h2 style="margin:0;">Mes devis</h2><p class="muted" style="margin:4px 0 0;">Vue simplifiée : seuls les devis à traiter restent visibles au premier coup d’œil.</p></div>'+
    '<button class="btn primary" data-action="newdevis">+ Nouveau devis</button></div>';

  html += '<div class="row-actions" style="margin-bottom:14px;">'+
    '<button class="btn small '+(filtre==="actifs"?'primary':'ghost')+'" data-action="devis-filtre-actifs">À traiter ('+actifs.length+')</button>'+
    '<button class="btn small '+(filtre==="acceptes"?'primary':'ghost')+'" data-action="devis-filtre-acceptes">Acceptés ('+acceptes.length+')</button>'+
    '<button class="btn small '+(filtre==="refuses"?'primary':'ghost')+'" data-action="devis-filtre-refuses">Refusés ('+refuses.length+')</button>'+
    '<button class="btn small '+(filtre==="archives"?'primary':'ghost')+'" data-action="devis-filtre-archives">Archivés ('+archives.length+')</button>'+
  '</div>';

  if(state.devis.length===0){
    html+='<div class="card"><p class="muted" style="margin:0;">Aucun devis. Quand un client vous appelle, touchez « Nouveau devis » et laissez-vous guider.</p></div>';
    return html;
  }
  if(liste.length===0){
    var msg = "Aucun devis à traiter pour le moment.";
    if(filtre==="acceptes") msg = "Aucun devis accepté pour le moment.";
    if(filtre==="refuses") msg = "Aucun devis refusé pour le moment.";
    if(filtre==="archives") msg = "Aucun devis archivé pour le moment.";
    html+='<div class="card"><p class="muted" style="margin:0;">'+msg+'</p></div>';
    return html;
  }

  liste.forEach(function(d){
    var t=totals(d.lignes,state.settings.partService); var fs=facturesDuDevis(d.id);
    var ac=fs.find(function(f){return f.type==="acompte";});
    var aA=!!ac, aS=fs.some(function(f){return f.type==="solde";}), aT=fs.some(function(f){return f.type==="totale";});
    var acomptePaye=!!(ac && ac.statut==="payee");
    var sd=ST_DEVIS[d.statut]||ST_DEVIS.brouillon;
    var delPending = ui.confirmDelete === "devis:"+d.id;
    html+='<div class="card"><div class="flexb"><div>'+
      '<div style="font-weight:700;color:var(--bordeaux);">'+esc(d.numero)+' · '+esc(d.client&&d.client.nom)+'</div>'+
      '<div class="muted">'+frDate(d.date)+' · '+euro(t.total)+' ('+euro(t.biens)+' biens · '+euro(t.services)+' services)</div></div>'+
      '<span class="badge" style="color:'+sd.c+';background:'+sd.b+';">'+sd.l+'</span></div>'+
      '<div class="row-actions">'+
        '<button class="btn small ghost" data-action="devis-preview-'+d.id+'">Aperçu / PDF</button>'+
        '<button class="btn small gold" data-action="devis-email-'+d.id+'">Envoyer par email</button>'+
        (d.statut==="brouillon"?'<button class="btn small soft" data-action="devis-st-'+d.id+'-envoye">Marquer envoyé</button>':'')+
        (d.statut!=="accepte"&&d.statut!=="refuse"&&d.statut!=="archive"?'<button class="btn small soft" data-action="devis-st-'+d.id+'-accepte">Marquer accepté</button>':'')+
        (d.statut!=="refuse"&&d.statut!=="accepte"&&d.statut!=="archive"?'<button class="btn small danger" data-action="devis-st-'+d.id+'-refuse">Refusé</button>':'')+
        (d.statut==="accepte"&&!aA&&!aT?'<button class="btn small gold" data-action="fac-acompte-'+d.id+'">Facture d\'acompte '+state.settings.acompteParDefaut+' %</button><button class="btn small ghost" data-action="fac-totale-'+d.id+'">Facture complète (100 %)</button>':'')+
        (d.statut==="accepte"&&aA&&!aS&&acomptePaye?'<button class="btn small gold" data-action="fac-solde-'+d.id+'">Créer facture de solde</button>':'')+
        (d.statut==="accepte"&&aA&&!aS&&!acomptePaye?'<span class="muted" style="align-self:center;font-size:12px;">Solde disponible après paiement de l\'acompte.</span>':'')+
        ((d.statut==="accepte"||d.statut==="refuse")?'<button class="btn small ghost" data-action="devis-archive-'+d.id+'">Archiver</button>':'')+
        (d.statut==="archive"?'<button class="btn small ghost" data-action="devis-unarchive-'+d.id+'">Désarchiver</button>':'')+
        '<button class="btn small danger" data-action="devis-del-'+d.id+'">'+(delPending?'Confirmer suppression':'Supprimer')+'</button>'+
      '</div>'+ 
      (fs.length?'<div class="muted" style="margin-top:10px;">Factures liées : '+fs.map(function(f){return esc(f.numero)+" ("+TYPE_FAC[f.type].toLowerCase()+")";}).join(" · ")+'</div>':'')+
    '</div>';
  });
  return html;
}
/* ===================== Devis : assistant ===================== */
function newWizard(){ ui.wizard={ step:1, clientMode:state.clients.length?"existant":"nouveau", clientId:state.clients[0]?state.clients[0].id:"", client:{nom:"",adresse:"",email:"",tel:""}, lignes:[], notes:"", date:todayISO() }; }
function wzTotals(){ return totals(ui.wizard.lignes,state.settings.partService); }
function viewWizard(){
  var w=ui.wizard, dot=function(n,l){ return '<div style="display:flex;align-items:center;gap:7px;"><div style="width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:700;background:'+(w.step>=n?"var(--bordeaux)":"#fff")+';color:'+(w.step>=n?"#fff":"var(--ink-s)")+';border:1px solid '+(w.step>=n?"var(--bordeaux)":"var(--line)")+';">'+n+'</div><span style="font-size:12px;font-weight:600;color:'+(w.step>=n?"var(--ink)":"var(--ink-s)")+';">'+l+'</span></div>'; };
  var head='<div class="card"><div style="display:flex;flex-wrap:wrap;gap:14px;margin-bottom:18px;">'+dot(1,"Client")+'<span style="color:var(--line);">—</span>'+dot(2,"Créations")+'<span style="color:var(--line);">—</span>'+dot(3,"Validation")+'</div>';
  var body="";
  if(w.step===1){
    var modeBtns='<div class="row-actions" style="margin-top:0;margin-bottom:14px;">'+
      '<button class="btn small '+(w.clientMode==="nouveau"?"primary":"ghost")+'" data-action="wz-mode-nouveau">Nouveau client</button>'+
      (state.clients.length?'<button class="btn small '+(w.clientMode==="existant"?"primary":"ghost")+'" data-action="wz-mode-existant">Client enregistré</button>':'')+'</div>';
    var form;
    if(w.clientMode==="existant"){
      form='<label class="field"><span>Choisir le client</span><select id="wzClient" data-action="wz-clientsel">'+sortedClients().map(function(c){return '<option value="'+esc(c.id)+'"'+(c.id===w.clientId?" selected":"")+'>'+esc(c.nom)+'</option>';}).join("")+'</select></label>';
    } else {
      form='<label class="field"><span>Nom du client *</span><input id="wzNom" value="'+esc(w.client.nom)+'" placeholder="Ex : Camille & Julien Martin"></label>'+
        '<label class="field"><span>Adresse</span><input id="wzAdr" value="'+esc(w.client.adresse)+'"></label>'+
        '<div class="inline"><div><label class="field"><span>Email</span><input id="wzEmail" value="'+esc(w.client.email)+'"></label></div>'+
        '<div><label class="field"><span>Téléphone</span><input id="wzTel" value="'+esc(w.client.tel)+'"></label></div></div>';
    }
    body='<h3 style="margin:0 0 12px;">À qui est destiné ce devis ?</h3>'+modeBtns+form+
      '<div class="flexb" style="margin-top:8px;"><button class="btn ghost" data-action="wz-cancel">Annuler</button><button class="btn primary" data-action="wz-next">Continuer →</button></div>';
  }
  else if(w.step===2){
    var cat=state.catalogue.length? state.catalogue.map(function(it){
      return '<button data-action="wz-add-'+it.id+'" style="text-align:left;border:1px solid var(--line);background:'+(it.type==="service"?"var(--green-s)":"var(--blush-s)")+';border-radius:10px;padding:8px 11px;cursor:pointer;font-family:inherit;">'+
        '<div style="font-size:13px;font-weight:600;">+ '+esc(it.designation)+'</div><div class="muted">'+euro(it.prix)+' · '+(it.type==="service"?"service":"bien")+'</div></button>';
    }).join("") : '<span class="muted">Aucun article. Ajoutez-en dans Catalogue, ou créez une ligne libre.</span>';
    var rows=w.lignes.map(function(l){
      return '<tr style="border-top:1px solid var(--line);">'+
        '<td style="padding:6px;"><input data-linedesig data-id="'+l.id+'" value="'+esc(l.designation)+'"></td>'+
        '<td style="padding:6px;"><select data-linetype data-id="'+l.id+'"><option value="bien"'+(l.type==="bien"?" selected":"")+'>Bien</option><option value="service"'+(l.type==="service"?" selected":"")+'>Service</option></select></td>'+
        '<td style="padding:6px;width:70px;"><input type="number" min="0" data-linefield="qte" data-id="'+l.id+'" value="'+esc(l.qte)+'"></td>'+
        '<td style="padding:6px;width:100px;"><input type="number" min="0" step="0.01" data-linefield="prix" data-id="'+l.id+'" value="'+esc(l.prix)+'"></td>'+
        '<td style="padding:6px;font-weight:600;white-space:nowrap;">'+euro(num(l.qte)*num(l.prix))+'</td>'+
        '<td style="padding:6px;"><button data-action="wz-delline-'+l.id+'" style="border:none;background:none;color:#9b3b3b;cursor:pointer;font-size:18px;">×</button></td></tr>';
    }).join("");
    var table=w.lignes.length? '<div class="scroll" style="margin-bottom:12px;"><table style="min-width:520px;"><thead><tr class="muted" style="text-align:left;"><th style="padding:6px;">Désignation</th><th style="padding:6px;">Type</th><th style="padding:6px;">Qté</th><th style="padding:6px;">Prix unit.</th><th style="padding:6px;">Total</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div>' : '';
    var t=wzTotals();
    body='<h3 style="margin:0 0 12px;">Que commande le client ?</h3>'+
      '<div class="muted" style="font-weight:600;margin-bottom:8px;">Depuis votre catalogue :</div>'+
      '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">'+cat+'</div>'+
      table+'<button class="btn small soft" data-action="wz-addfree">+ Ligne libre</button>'+
      '<div id="wzTot" style="margin-top:14px;padding:12px;background:var(--cream);border-radius:10px;font-size:14px;">'+wizTotHTML(t)+'</div>'+
      '<div class="flexb" style="margin-top:14px;"><button class="btn ghost" data-action="wz-back">← Retour</button><button class="btn primary" data-action="wz-next"'+(w.lignes.length?"":" disabled")+'>Continuer →</button></div>';
  }
  else {
    var t2=wzTotals(); var cn = w.clientMode==="existant" ? (state.clients.find(function(c){return c.id===w.clientId;})||{}).nom : w.client.nom;
    body='<h3 style="margin:0 0 12px;">Vérification</h3>'+
      '<label class="field"><span>Note pour le client (facultatif)</span><textarea id="wzNotes" placeholder="Ex : Retrait en atelier, livraison sur Valenciennes…">'+esc(w.notes)+'</textarea></label>'+
      '<div style="padding:12px;background:var(--cream);border-radius:10px;font-size:14px;margin-bottom:12px;">'+
        '<div><b>Client :</b> '+esc(cn)+'</div><div><b>Lignes :</b> '+w.lignes.length+'</div>'+
        '<div><b>Total :</b> '+euro(t2.total)+' ('+euro(t2.biens)+' biens · '+euro(t2.services)+' services)</div>'+
        '<div class="muted" style="margin-top:4px;">Validité jusqu\'au '+frDate(addDays(w.date,state.settings.validiteDevis))+'</div></div>'+
      '<div class="flexb"><button class="btn ghost" data-action="wz-back">← Retour</button><button class="btn gold" data-action="wz-finish">Créer le devis</button></div>';
  }
  return head+body+'</div>';
}
function wizTotHTML(t){
  return '<div class="totrow muted"><span>Biens</span><span>'+euro(t.biens)+'</span></div>'+
    '<div class="totrow muted"><span>Services</span><span>'+euro(t.services)+'</span></div>'+
    '<div class="totrow" style="font-weight:700;color:var(--bordeaux);border-top:1px solid var(--line);margin-top:4px;padding-top:6px;"><span>Total devis</span><span>'+euro(t.total)+'</span></div>';
}
function captureWizardInputs(){ // lit les champs avant un changement d'étape
  var w=ui.wizard; if(!w) return;
  if(w.step===1&&w.clientMode==="nouveau"){
    var g=function(id){var e=document.getElementById(id);return e?e.value:"";};
    w.client={nom:g("wzNom"),adresse:g("wzAdr"),email:g("wzEmail"),tel:g("wzTel")};
  }
  if(w.step===3){ var n=document.getElementById("wzNotes"); if(n) w.notes=n.value; }
}

/* ===================== Factures : liste ===================== */
function devisAFacturerHTML(){
  var devis=state.devis.filter(function(d){ return d.statut==="accepte"; });
  var html="";
  devis.forEach(function(d){
    var fs=facturesDuDevis(d.id);
    var ac=fs.find(function(f){return f.type==="acompte";});
    var hasAcompte=!!ac;
    var hasSolde=fs.some(function(f){return f.type==="solde";});
    var hasTotale=fs.some(function(f){return f.type==="totale";});
    var acomptePaye=!!(ac && ac.statut==="payee");
    var t=totals(d.lignes,state.settings.partService);
    if(!hasAcompte && !hasTotale){
      html+='<div class="card" style="border-color:var(--gold-s);"><div class="flexb"><div><div style="font-weight:700;color:var(--bordeaux);">Devis accepté à facturer : '+esc(d.numero)+' · '+esc(d.client&&d.client.nom||"")+'</div><div class="muted">Total du devis : '+euro(t.total)+' · Choisir le type de facture à créer</div></div></div><div class="row-actions"><button class="btn small gold" data-action="fac-acompte-'+d.id+'">Créer facture d\'acompte '+state.settings.acompteParDefaut+' %</button><button class="btn small ghost" data-action="fac-totale-'+d.id+'">Créer facture complète 100 %</button></div></div>';
    } else if(hasAcompte && !hasSolde && !hasTotale){
      html+='<div class="card" style="border-color:var(--line);"><div style="font-weight:700;color:var(--bordeaux);">Devis '+esc(d.numero)+' · '+esc(d.client&&d.client.nom||"")+'</div><div class="muted">Acompte créé '+(acomptePaye?'et payé. Tu peux créer le solde.':'mais pas encore marqué payé. Le solde sera disponible après paiement de l\'acompte.')+'</div><div class="row-actions">'+(acomptePaye?'<button class="btn small gold" data-action="fac-solde-'+d.id+'">Créer facture de solde</button>':'<button class="btn small soft" disabled>Solde disponible après paiement de l\'acompte</button>')+'</div></div>';
    }
  });
  return html;
}
function factureCardHTML(f){
  var sf=ST_FAC[f.statut]||ST_FAC.a_envoyer;
  var delPending = ui.confirmDelete === "facture:"+f.id;
  return '<div class="card" style="margin-bottom:10px;"><div class="flexb"><div>'+
    '<div style="font-weight:700;color:var(--bordeaux);">'+esc(f.numero)+' · '+esc(TYPE_FAC[f.type]||"Facture")+(f.origine==="manuelle"?' <span class="pill" style="background:var(--blush-s);color:var(--bordeaux);">saisie directe</span>':'')+'</div>'+
    '<div class="muted">'+esc(f.client&&f.client.nom)+' · '+frDate(f.date)+' · <b>'+euro(f.montant)+'</b></div>'+
    '<div class="muted">'+euro(f.montantBiens)+' biens · '+euro(f.montantServices)+' services'+(f.datePaiement?" · payée le "+frDate(f.datePaiement):"")+(f.paiementClient?" · paiement : "+esc(f.paiementClient):"")+'</div></div>'+
    '<span class="badge" style="color:'+sf.c+';background:'+sf.b+';">'+sf.l+'</span></div>'+
    '<div class="row-actions">'+
      '<button class="btn small ghost" data-action="fac-preview-'+f.id+'">Aperçu / PDF</button>'+
      '<button class="btn small gold" data-action="fac-email-'+f.id+'">Envoyer par email</button>'+ 
      '<button class="btn small ghost" data-action="fac-paymethod-'+f.id+'">Moyen de paiement</button>'+
      (f.statut==="a_envoyer"?'<button class="btn small soft" data-action="fac-st-'+f.id+'-envoyee">Marquer envoyée</button>':'')+
      (f.statut==="envoyee"?'<button class="btn small ghost" data-action="fac-st-'+f.id+'-a_envoyer">Remettre à envoyer</button>':'')+
      (f.statut!=="payee"?'<button class="btn small gold" data-action="fac-paid-'+f.id+'">Marquer payée</button>':'')+
      (f.statut==="payee"?'<button class="btn small ghost" data-action="fac-st-'+f.id+'-envoyee">Annuler paiement</button>':'')+
      '<button class="btn small danger" data-action="fac-del-'+f.id+'">'+(delPending?'Confirmer suppression':'Supprimer')+'</button>'+
    '</div></div>';
}
function viewFactureGroup(key,label,list,openDefault){
  ui.factureGroups=ui.factureGroups||{};
  var open = ui.factureGroups[key];
  if(open===undefined) open=openDefault;
  var total=list.reduce(function(s,f){return s+(Number(f.montant)||0);},0);
  var color = key==="a_envoyer" ? "var(--bordeaux)" : (key==="envoyee" ? "#6a5a2a" : "var(--green)");
  var bg = key==="a_envoyer" ? "var(--blush-s)" : (key==="envoyee" ? "#f3ead0" : "var(--green-s)");
  var html='<div class="card" style="padding:0;overflow:hidden;">'+
    '<button data-action="fac-group-toggle-'+key+'" style="width:100%;border:none;background:'+bg+';padding:13px 16px;cursor:pointer;text-align:left;font-family:inherit;">'+
      '<div class="flexb"><div style="font-weight:800;color:'+color+';">'+(open?'▾':'▸')+' '+esc(label)+' <span class="muted">('+list.length+')</span></div>'+
      '<div style="font-weight:700;color:'+color+';">'+euro(total)+'</div></div>'+
    '</button>';
  if(open){
    html+='<div style="padding:12px 12px 2px;">';
    if(!list.length) html+='<p class="muted" style="margin:0 0 10px;">Aucune facture dans cette catégorie.</p>';
    list.forEach(function(f){ html+=factureCardHTML(f); });
    html+='</div>';
  }
  html+='</div>';
  return html;
}
function viewFactures(){
  var html='<div class="flexb" style="margin-bottom:14px;"><h2 style="margin:0;">Mes factures</h2><button class="btn primary" data-action="fac-new">+ Nouvelle facture</button></div>';
  html+=devisAFacturerHTML();
  if(ui.factureDraft){ html+=viewFactureManualForm(); }
  if(state.factures.length===0){ html+='<div class="card"><p class="muted" style="margin:0;">Aucune facture. Vous pouvez créer une facture depuis un devis accepté, ou directement avec le bouton « Nouvelle facture ».</p></div>'; return html; }

  var sorted=state.factures.slice().sort(function(a,b){
    return (b.date||"").localeCompare(a.date||"") || (b.numero||"").localeCompare(a.numero||"");
  });
  var groups={
    a_envoyer: sorted.filter(function(f){return (f.statut||"a_envoyer")==="a_envoyer";}),
    envoyee: sorted.filter(function(f){return f.statut==="envoyee";}),
    payee: sorted.filter(function(f){return f.statut==="payee";})
  };
  html+='<p class="muted" style="margin-top:-6px;">Factures classées par état. Clique sur une catégorie pour l’ouvrir ou la réduire.</p>';
  html+=viewFactureGroup("a_envoyer","À envoyer",groups.a_envoyer,true);
  html+=viewFactureGroup("envoyee","Envoyées / en attente de paiement",groups.envoyee,true);
  html+=viewFactureGroup("payee","Payées",groups.payee,false);
  return html;
}
function newFactureDraft(){
  ui.factureDraft={ date:todayISO(), echeance:addDays(todayISO(),state.settings.delaiPaiement), statut:"a_envoyer", clientMode:state.clients.length?"existant":"nouveau", clientId:state.clients[0]?state.clients[0].id:"", client:{nom:"",adresse:"",email:"",tel:"",canal:""}, lignes:[], reductionType:"montant", reductionValeur:0, acompteDejaPaye:0, paiementClient:"", notes:"" };
}
function facDraftTotals(){ return factureCalc(ui.factureDraft?ui.factureDraft.lignes:[], state.settings.partService, ui.factureDraft); }
function viewFactureManualForm(){
  var f=ui.factureDraft;
  var clientPart='';
  if(state.clients.length){
    clientPart+='<div class="row-actions" style="margin-top:0;margin-bottom:14px;">'+
      '<button class="btn small '+(f.clientMode==="nouveau"?"primary":"ghost")+'" data-action="fac-mode-nouveau">Nouveau client</button>'+ 
      '<button class="btn small '+(f.clientMode==="existant"?"primary":"ghost")+'" data-action="fac-mode-existant">Client enregistré</button></div>';
  }
  if(f.clientMode==="existant"&&state.clients.length){
    clientPart+='<label class="field"><span>Client</span><select id="facClient" data-action="fac-clientsel">'+sortedClients().map(function(c){return '<option value="'+esc(c.id)+'"'+(c.id===f.clientId?" selected":"")+'>'+esc(c.nom)+'</option>';}).join("")+'</select></label>';
  } else {
    clientPart+='<label class="field"><span>Nom du client *</span><input id="facNom" value="'+esc(f.client.nom)+'" placeholder="Ex : Camille Martin"></label>'+ 
      '<label class="field"><span>Adresse</span><input id="facAdr" value="'+esc(f.client.adresse)+'"></label>'+ 
      '<div class="inline"><div><label class="field"><span>Email</span><input id="facEmail" value="'+esc(f.client.email)+'"></label></div>'+ 
      '<div><label class="field"><span>Téléphone</span><input id="facTel" value="'+esc(f.client.tel)+'"></label></div></div>'+
      '<label class="field"><span>Canal de communication préféré</span><select id="facCanal">'+commOptions(f.client.canal||"")+'</select></label>';
  }
  var cat=state.catalogue.length? state.catalogue.map(function(it){
    return '<button data-action="fac-addcat-'+it.id+'" style="text-align:left;border:1px solid var(--line);background:'+(it.type==="service"?"var(--green-s)":"var(--blush-s)")+';border-radius:10px;padding:8px 11px;cursor:pointer;font-family:inherit;">'+
      '<div style="font-size:13px;font-weight:600;">+ '+esc(it.designation)+'</div><div class="muted">'+euro(it.prix)+' · '+(it.type==="service"?"service":"bien")+'</div></button>';
  }).join("") : '<span class="muted">Votre catalogue est vide : utilisez une ligne libre.</span>';
  var rows=f.lignes.map(function(l){
    return '<tr style="border-top:1px solid var(--line);">'+
      '<td style="padding:6px;"><input data-faclinedesig data-id="'+l.id+'" value="'+esc(l.designation)+'"></td>'+ 
      '<td style="padding:6px;"><select data-faclinetype data-id="'+l.id+'"><option value="bien"'+(l.type==="bien"?" selected":"")+'>Bien</option><option value="service"'+(l.type==="service"?" selected":"")+'>Service</option></select></td>'+ 
      '<td style="padding:6px;width:70px;"><input type="number" min="0" data-faclinefield="qte" data-id="'+l.id+'" value="'+esc(l.qte)+'"></td>'+ 
      '<td style="padding:6px;width:100px;"><input type="number" min="0" step="0.01" data-faclinefield="prix" data-id="'+l.id+'" value="'+esc(l.prix)+'"></td>'+ 
      '<td style="padding:6px;font-weight:600;white-space:nowrap;">'+euro(num(l.qte)*num(l.prix))+'</td>'+ 
      '<td style="padding:6px;"><button data-action="fac-delline-'+l.id+'" style="border:none;background:none;color:#9b3b3b;cursor:pointer;font-size:18px;">×</button></td></tr>';
  }).join("");
  var table=f.lignes.length? '<div class="scroll" style="margin-bottom:12px;"><table style="min-width:520px;"><thead><tr class="muted" style="text-align:left;"><th style="padding:6px;">Désignation</th><th style="padding:6px;">Type</th><th style="padding:6px;">Qté</th><th style="padding:6px;">Prix unit.</th><th style="padding:6px;">Total</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div>' : '<p class="muted">Ajoutez au moins une ligne de facturation.</p>';
  return '<div class="card" style="border-color:var(--gold-s);"><div class="flexb" style="margin-bottom:10px;"><h3 style="margin:0;">Nouvelle facture directe</h3><button class="btn small ghost" data-action="fac-cancel-manual">Annuler</button></div>'+ 
    '<div class="inline"><div><label class="field"><span>Date de facture</span><input id="facDate" type="date" value="'+esc(f.date)+'"></label></div>'+ 
    '<div><label class="field"><span>Échéance</span><input id="facEcheance" type="date" value="'+esc(f.echeance)+'"></label></div>'+ 
    '</div>'+ 
    clientPart+ 
    '<div class="section-title">Lignes de facture</div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">'+cat+'</div>'+table+ 
    '<button class="btn small soft" data-action="fac-addfree">+ Ligne libre</button>'+ 
    '<div class="section-title">Réduction / acompte déjà payé</div>'+ 
    '<div class="inline"><div><label class="field"><span>Type de réduction</span><select id="facReductionType"><option value="montant"'+(f.reductionType!=="pourcent"?" selected":"")+'>Montant €</option><option value="pourcent"'+(f.reductionType==="pourcent"?" selected":"")+'>Pourcentage %</option></select></label></div>'+ 
    '<div><label class="field"><span>Réduction</span><input id="facReductionValeur" type="number" min="0" step="0.01" value="'+esc(f.reductionValeur||0)+'"></label></div>'+ 
    '<div><label class="field"><span>Acompte déjà payé (€)</span><input id="facAcompteDejaPaye" type="number" min="0" step="0.01" value="'+esc(f.acompteDejaPaye||0)+'"></label></div></div>'+ 
    '<label class="field"><span>Moyen de paiement de la cliente</span><select id="facPaiementClient">'+paymentOptions(f.paiementClient||"")+'</select><div class="hint">Utile si la facture ou un acompte est déjà payé.</div></label>'+
    '<div id="facTot" style="margin-top:14px;padding:12px;background:var(--cream);border-radius:10px;font-size:14px;">'+facTotHTML(facDraftTotals())+'</div>'+ 
    '<label class="field" style="margin-top:12px;"><span>Note sur la facture (facultatif)</span><textarea id="facNotes">'+esc(f.notes||"")+'</textarea></label>'+ 
    '<div class="row-actions"><button class="btn gold" data-action="fac-create-manual">Créer la facture</button><button class="btn ghost" data-action="fac-cancel-manual">Annuler</button></div></div>';
}
function facTotHTML(t){
  return '<div class="totrow muted"><span>Biens</span><span>'+euro(t.biens)+'</span></div>'+ 
    '<div class="totrow muted"><span>Services</span><span>'+euro(t.services)+'</span></div>'+ 
    '<div class="totrow" style="font-weight:700;color:var(--bordeaux);border-top:1px solid var(--line);margin-top:4px;padding-top:6px;"><span>Total facture</span><span>'+euro(t.total)+'</span></div>';
}
function captureFactureDraft(){
  var f=ui.factureDraft; if(!f) return;
  f.date=val("facDate")||todayISO(); f.echeance=val("facEcheance")||addDays(f.date,state.settings.delaiPaiement); f.statut="a_envoyer"; f.notes=val("facNotes"); f.reductionType=val("facReductionType")||"montant"; f.reductionValeur=num(val("facReductionValeur")); f.acompteDejaPaye=num(val("facAcompteDejaPaye")); f.paiementClient=val("facPaiementClient"); f.paiementClient=val("facPaiementClient");
  if(f.clientMode==="existant"&&state.clients.length){ f.clientId=val("facClient")||f.clientId; }
  else { f.client={nom:val("facNom"),adresse:val("facAdr"),email:val("facEmail"),tel:val("facTel"),canal:val("facCanal")}; }
}
function refreshFactureTotals(){ var box=document.getElementById("facTot"); if(box) box.innerHTML=facTotHTML(facDraftTotals()); }
function createManualFacture(){
  captureFactureDraft(); var f=ui.factureDraft, client;
  if(!f) return;
  if(f.clientMode==="existant"&&state.clients.length){ client=state.clients.find(function(c){return c.id===f.clientId;}); }
  else {
    if(!(f.client.nom||"").trim()){ toast("Indique le nom du client."); return; }
    var k=normName(f.client.nom); client=state.clients.find(function(c){return normName(c.nom)===k;});
    if(client){ if(!client.email&&f.client.email)client.email=f.client.email; if(!client.tel&&f.client.tel)client.tel=f.client.tel; if(!client.adresse&&f.client.adresse)client.adresse=f.client.adresse; if(!client.canal&&f.client.canal)client.canal=f.client.canal; }
    else { client=Object.assign({id:uid()},f.client); state.clients.push(client); }
  }
  if(!client){ toast("Choisis un client."); return; }
  if(!f.lignes.length){ toast("Ajoute au moins une ligne."); return; }
  var t=factureCalc(f.lignes,state.settings.partService,f);
  if(t.totalInitial<=0){ toast("Le total de la facture doit être supérieur à 0 €."); return; }
  var facture={ id:uid(), numero:prochainNumero("facture"), type:"totale", date:f.date, echeance:f.echeance, client:client, lignes:f.lignes, notes:f.notes, montantBiens:t.biens, montantServices:t.services, montant:t.total, totalInitial:t.totalInitial, remiseType:f.reductionType, remiseValeur:num(f.reductionValeur), remiseMontant:t.remiseMontant, totalApresRemise:t.totalApresRemise, acompteDejaPaye:t.acompteDejaPaye, paiementClient:f.paiementClient||"", statut:"a_envoyer", datePaiement:null, origine:"manuelle" };
  state.factures.unshift(facture); ui.factureDraft=null; saveCache(); render(); toast("Facture "+facture.numero+" créée.");
}




/* ===================== Achats fournisseurs ===================== */
var ACHAT_CATEGORIES=["Fleurs","Emballages","Matériel","Fournitures","Communication","Déplacements","Formation","Divers"];
var ACHAT_PAIEMENTS=["CB","Espèces","Virement","PayPal","Autre"];

var CLIENT_PAYMENT_METHODS=["", "Espèces", "CB", "Virement", "Wero", "PayPal", "Chèque", "Stripe", "Squarespace", "Site internet", "Autre"];
function normalizePaymentMethod(v){
  v=String(v||"").trim();
  var n=v.toLowerCase();
  if(!n) return "";
  if(n==="espece"||n==="espèces"||n==="especes") return "Espèces";
  if(n==="carte"||n==="cb"||n==="carte bancaire") return "CB";
  if(n==="virement bancaire") return "Virement";
  if(n==="site"||n==="site internet") return "Site internet";
  return v.charAt(0).toUpperCase()+v.slice(1);
}
function paymentOptions(selected){
  selected=normalizePaymentMethod(selected||"");
  return CLIENT_PAYMENT_METHODS.map(function(p){
    var label=p?esc(p):"Non renseigné";
    return '<option value="'+esc(p)+'"'+(p===selected?' selected':'')+'>'+label+'</option>';
  }).join("");
}
function paymentSelectHtml(id, value){
  value=normalizePaymentMethod(value||"");
  var h='<select id="'+id+'">';
  h+=CLIENT_PAYMENT_METHODS.map(function(o){
    var label=o?esc(o):"À choisir";
    return '<option value="'+esc(o)+'"'+(o===value?' selected':'')+'>'+label+'</option>';
  }).join("");
  h+='</select>';
  return h;
}
function askPaymentMethodModal(title, message, current, callback){
  ui.paymentPrompt={title:title||"Moyen de paiement", message:message||"Choisis le moyen de paiement dans la liste.", value:current||"", callback:callback};
  renderModal();
}



var MARIAGE_LIVRAISON_MODES=["Remise en main propre","Envoi","Retrait domicile"];
function livraisonOptions(selected){
  selected=selected||"";
  return '<option value="">Non renseigné</option>'+MARIAGE_LIVRAISON_MODES.map(function(m){
    return '<option value="'+esc(m)+'"'+(m===selected?' selected':'')+'>'+esc(m)+'</option>';
  }).join("");
}
var MARIAGE_COMM_CHANNELS=["Mail","Site internet","Téléphone","SMS","WhatsApp","Messenger","Instagram","TikTok","Snapchat","Facebook"];
function mariageCommunicationOptions(selected){
  selected=selected||"";
  return '<option value="">Non renseigné</option>'+MARIAGE_COMM_CHANNELS.map(function(c){
    return '<option value="'+esc(c)+'"'+(c===selected?' selected':'')+'>'+esc(c)+'</option>';
  }).join("");
}
function mariageDateRef(m){ return (m&&m.dateLivraison) || (m&&m.dateMariage) || ""; }
function mariageCountdown(m){ return countdown(mariageDateRef(m)); }
function mariageReady(m){
  var arts=m&&m.articles?m.articles:[];
  return arts.length>0 && arts.every(function(a){return !!a.fait;});
}
function mariageTermine(m){ return !!(m && (m.livre || m.statut==="realise")); }
function mariageGroupKey(m){
  if(mariageTermine(m)) return "terminee";
  if(mariageReady(m)) return "prete";
  return "realiser";
}



function newAchatDraft(){
  ui.achatDraft={
    id:uid(),
    date:todayISO(),
    fournisseur:"",
    categorie:"Fleurs",
    montantTTC:0,
    tva:0,
    moyenPaiement:"CB",
    projetType:"",
    projetId:"",
    projetLabel:"",
    notes:"",
    justificatif:null,
    ocrText:"",
    statut:"a_verifier"
  };
}

function achatProjetOptions(selected){
  selected=selected||"";
  var opts='<option value="">Aucun projet associé</option>';
  (state.mariages||[]).forEach(function(m){
    var v="mariage:"+m.id;
    opts+='<option value="'+esc(v)+'"'+(selected===v?' selected':'')+'>💍 '+esc(m.nom||"Mariage")+(m.dateMariage?' · '+frDate(m.dateMariage):'')+'</option>';
  });
  (state.commandes||[]).forEach(function(c){
    var v="commande:"+c.id;
    opts+='<option value="'+esc(v)+'"'+(selected===v?' selected':'')+'>📦 '+esc(c.label||"Commande")+(c.client?' · '+esc(c.client):'')+'</option>';
  });
  return opts;
}

function achatProjetFromValue(v){
  if(!v) return {type:"",id:"",label:""};
  var p=v.split(":"), type=p[0], id=p.slice(1).join(":");
  if(type==="mariage"){
    var m=(state.mariages||[]).find(function(x){return x.id===id;});
    return {type:type,id:id,label:m?("Mariage · "+(m.nom||"")):"Mariage"};
  }
  if(type==="commande"){
    var c=(state.commandes||[]).find(function(x){return x.id===id;});
    return {type:type,id:id,label:c?("Commande · "+(c.label||"")):"Commande"};
  }
  return {type:"",id:"",label:""};
}

function captureAchatDraft(){
  var a=ui.achatDraft; if(!a) return;
  a.date=val("achatDate")||todayISO();
  a.fournisseur=val("achatFournisseur");
  a.categorie=val("achatCategorie")||"Divers";
  a.montantTTC=num(val("achatMontant"));
  a.tva=num(val("achatTVA"));
  a.moyenPaiement=val("achatPaiement")||"CB";
  var pr=achatProjetFromValue(val("achatProjet"));
  a.projetType=pr.type; a.projetId=pr.id; a.projetLabel=pr.label;
  a.notes=val("achatNotes");
}

function totalAchatsPeriode(annee, mois){
  return (state.achats||[]).filter(function(a){
    if(!a.date) return false;
    if(String(a.date).slice(0,4)!==String(annee)) return false;
    if(mois!=null && parseInt(a.date.slice(5,7),10)!==mois) return false;
    return true;
  }).reduce(function(s,a){return s+(Number(a.montantTTC)||0);},0);
}

function achatsParCategorie(annee){
  var out={};
  (state.achats||[]).forEach(function(a){
    if(annee && a.date && a.date.slice(0,4)!==String(annee)) return;
    var k=a.categorie||"Divers";
    out[k]=(out[k]||0)+(Number(a.montantTTC)||0);
  });
  return out;
}

function achatFormHTML(){
  var a=ui.achatDraft, projetValue=a.projetType&&a.projetId ? a.projetType+":"+a.projetId : "";
  var catOpts=ACHAT_CATEGORIES.map(function(c){return '<option value="'+esc(c)+'"'+(a.categorie===c?' selected':'')+'>'+esc(c)+'</option>';}).join("");
  var payOpts=ACHAT_PAIEMENTS.map(function(p){return '<option value="'+esc(p)+'"'+(a.moyenPaiement===p?' selected':'')+'>'+esc(p)+'</option>';}).join("");
  var proof=a.justificatif?'<div class="purchase-proof">📎 '+esc(a.justificatif.name||"justificatif")+' <button class="btn small ghost" data-action="achat-proof-open" style="padding:2px 7px;">ouvrir</button> <button class="btn small danger" data-action="achat-proof-remove" style="padding:2px 7px;">×</button></div>':'<span class="muted">Aucun justificatif ajouté.</span>';
  return '<div class="card"><div class="flexb" style="margin-bottom:10px;"><h3 style="margin:0;">Nouvel achat fournisseur</h3><button class="btn small ghost" data-action="achat-cancel">Annuler</button></div>'+
    '<div class="inline"><div><label class="field"><span>Date d’achat</span><input id="achatDate" type="date" value="'+esc(a.date)+'"></label></div>'+
    '<div><label class="field"><span>Fournisseur</span><input id="achatFournisseur" value="'+esc(a.fournisseur)+'" placeholder="Ex : Floristen Center"></label></div></div>'+
    '<div class="inline"><div><label class="field"><span>Catégorie</span><select id="achatCategorie">'+catOpts+'</select></label></div>'+
    '<div><label class="field"><span>Moyen de paiement</span><select id="achatPaiement">'+payOpts+'</select></label></div></div>'+
    '<div class="inline"><div><label class="field"><span>Montant TTC (€)</span><input id="achatMontant" type="number" step="0.01" min="0" value="'+esc(a.montantTTC||"")+'"></label></div>'+
    '<div><label class="field"><span>TVA incluse (€) facultatif</span><input id="achatTVA" type="number" step="0.01" min="0" value="'+esc(a.tva||"")+'"></label></div></div>'+
    '<label class="field"><span>Projet associé</span><select id="achatProjet">'+achatProjetOptions(projetValue)+'</select><div class="hint">Tu peux rattacher l’achat à un mariage ou à une commande.</div></label>'+
    '<label class="field"><span>Notes</span><textarea id="achatNotes" placeholder="Ex : gypsophile, renoncules, rubans…">'+esc(a.notes||"")+'</textarea></label>'+
    '<div class="section-title">Justificatif & lecture automatique</div>'+
    '<p class="muted" style="margin-top:-4px;">Ajoute une photo de ticket/facture. L’application essaie de lire automatiquement le fournisseur, la date et le montant. Tu peux toujours corriger les champs après lecture.</p>'+
    '<div style="margin-bottom:10px;">'+proof+'</div>'+
    '<div class="row-actions" style="margin-top:0;"><button class="btn soft" data-action="achat-proof-pick">📷 Scanner / ajouter facture</button>'+
    '<button class="btn ghost" data-action="achat-ocr-retry" '+(!a.justificatif||!a.justificatif.dataUrl?'disabled':'')+'>Relancer la lecture automatique</button></div>'+
    (a.ocrText?'<details style="margin-top:10px;"><summary class="muted" style="cursor:pointer;">Texte détecté par OCR</summary><pre style="white-space:pre-wrap;background:var(--cream);padding:10px;border-radius:8px;font-size:11px;max-height:220px;overflow:auto;">'+esc(a.ocrText)+'</pre></details>':'')+
    '<div class="row-actions"><button class="btn primary" data-action="achat-save">Enregistrer l’achat</button></div>'+
    '<input id="achatFileInput" type="file" accept="image/*,application/pdf" style="display:none;"></div>';
}

function viewAchats(){
  var annee=new Date().getFullYear(), mois=new Date().getMonth()+1;
  var totalM=totalAchatsPeriode(annee,mois), totalA=totalAchatsPeriode(annee,null);
  var html='<div class="flexb" style="margin-bottom:14px;"><h2 style="margin:0;">Achats fournisseurs</h2><button class="btn primary" data-action="achat-new">+ Nouvel achat</button></div>'+
    '<p class="muted" style="margin-top:-8px;">Suis tes factures fournisseurs, tickets et achats de matériel. Les montants sont comptabilisés comme tes ventes, mais côté dépenses.</p>'+
    '<div class="grid-stats"><div class="stat"><div class="lab">Achats du mois</div><div class="val">'+euro(totalM)+'</div></div>'+
    '<div class="stat"><div class="lab">Achats de l’année</div><div class="val">'+euro(totalA)+'</div></div>'+
    '<div class="stat"><div class="lab">Justificatifs</div><div class="val">'+(state.achats||[]).filter(function(a){return a.justificatif;}).length+'</div></div></div>';
  if(ui.achatDraft) html+=achatFormHTML();
  var cats=achatsParCategorie(annee), catKeys=Object.keys(cats).sort(function(a,b){return cats[b]-cats[a];});
  if(catKeys.length){
    html+='<div class="card"><h3 style="margin:0 0 10px;">Répartition par catégorie '+annee+'</h3>';
    catKeys.forEach(function(k){ html+='<div class="totrow"><span>'+esc(k)+'</span><b>'+euro(cats[k])+'</b></div>'; });
    html+='</div>';
  }
  var list=(state.achats||[]).slice().sort(function(a,b){return (b.date||"").localeCompare(a.date||"");});
  if(!list.length) return html+'<div class="card"><p class="muted" style="margin:0;">Aucun achat enregistré pour le moment.</p></div>';
  html+='<div class="card"><div class="flexb" style="margin-bottom:10px;"><h3 style="margin:0;">Historique des achats</h3><span class="muted">'+list.length+' achat'+(list.length>1?'s':'')+'</span></div>';
  list.forEach(function(a){
    var delPending=ui.confirmDelete==="achat:"+a.id;
    html+='<div class="checkrow" style="align-items:flex-start;"><div style="flex:1;">'+
      '<div><b style="color:var(--bordeaux);">'+esc(a.fournisseur||"Fournisseur")+'</b> <span class="achat-cat">'+esc(a.categorie||"Divers")+'</span></div>'+
      '<div class="muted" style="font-size:12px;">'+frDate(a.date)+' · '+euro(a.montantTTC||0)+' · '+esc(a.moyenPaiement||"")+(a.tva?(' · TVA '+euro(a.tva)):'')+'</div>'+
      (a.projetLabel?'<div class="muted" style="font-size:12px;">Projet : '+esc(a.projetLabel)+'</div>':'')+
      (a.justificatif?'<div class="muted" style="font-size:12px;">📎 Justificatif : '+esc(a.justificatif.name||"fichier")+'</div>':'')+
      (a.notes?'<div class="muted" style="font-size:12px;">'+esc(a.notes)+'</div>':'')+
      '</div><div class="row-actions" style="margin-top:0;">'+
      (a.justificatif?'<button class="btn small ghost" data-action="achat-open-'+a.id+'">Voir justificatif</button>':'')+
      '<button class="btn small soft" data-action="achat-validate-'+a.id+'">'+(a.statut==="valide"?'Validé':'À vérifier')+'</button>'+
      '<button class="btn small danger" data-action="achat-del-'+a.id+'">'+(delPending?'Confirmer suppression':'Supprimer')+'</button>'+
      '</div></div>';
  });
  html+='</div>';
  return html;
}

function saveAchat(){
  captureAchatDraft();
  var a=ui.achatDraft; if(!a) return;
  if(!(a.fournisseur||"").trim()){ toast("Indique le fournisseur."); return; }
  if(!(Number(a.montantTTC)>0)){ toast("Indique le montant TTC."); return; }
  a.statut=a.statut||"a_verifier";
  state.achats=state.achats||[];
  state.achats.unshift(Object.assign({},a));
  ui.achatDraft=null;
  saveCache(); render(); toast("Achat fournisseur enregistré.");
}

function compressImageDataUrl(file, cb){
  var reader=new FileReader();
  reader.onload=function(e){
    var img=new Image();
    img.onload=function(){
      var max=1400, ratio=Math.min(max/img.width,max/img.height,1);
      var w=Math.round(img.width*ratio), h=Math.round(img.height*ratio);
      var c=document.createElement("canvas"); c.width=w; c.height=h;
      c.getContext("2d").drawImage(img,0,0,w,h);
      cb(c.toDataURL("image/jpeg",0.78));
    };
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);
}

function readAchatFile(file){
  if(!ui.achatDraft || !file) return;
  captureAchatDraft();
  if(/^image\//.test(file.type)){
    toast("Ajout du justificatif et lecture automatique en cours…");
    compressImageDataUrl(file,function(dataUrl){
      ui.achatDraft.justificatif={name:file.name,type:file.type,dataUrl:dataUrl};
      render();
      runAchatOCR(dataUrl);
    });
  } else if(file.type==="application/pdf" || file.name.toLowerCase().endsWith(".pdf")){
    var r=new FileReader();
    r.onload=function(e){
      ui.achatDraft.justificatif={name:file.name,type:file.type||"application/pdf",dataUrl:e.target.result};
      saveCache(); render();
      toast("PDF ajouté. La lecture automatique fonctionne surtout avec les photos ; vérifie et complète les champs.");
    };
    r.readAsDataURL(file);
  } else {
    toast("Format non pris en charge. Utilise une photo ou un PDF.");
  }
}

async function runAchatOCR(dataUrl){
  if(!ui.achatDraft || !dataUrl){ toast("Aucun justificatif à lire."); return; }
  if(typeof Tesseract==="undefined"){
    toast("Lecture automatique indisponible. Tu peux saisir les champs manuellement.");
    return;
  }
  try{
    toast("Lecture automatique en cours… cela peut prendre quelques secondes.");
    var result=await Tesseract.recognize(dataUrl, "fra+eng");
    var text=result && result.data ? (result.data.text||"") : "";
    applyAchatOCR(text);
    saveCache(); render();
    toast("Lecture terminée. Vérifie et corrige les champs si besoin.");
  }catch(e){
    console.error(e);
    toast("Lecture automatique impossible. Tu peux corriger/remplir manuellement.");
  }
}

function applyAchatOCR(text){
  var a=ui.achatDraft; if(!a) return;
  a.ocrText=text||"";
  var lines=(text||"").split(/\n+/).map(function(l){return l.trim();}).filter(Boolean);
  if(!a.fournisseur){
    var first=lines.find(function(l){
      var low=l.toLowerCase();
      return l.length>2 && !/(total|ticket|facture|siret|tva|merci|date|cb|visa|mastercard|carte)/i.test(low);
    });
    if(first) a.fournisseur=first.slice(0,60);
  }
  if(!a.date || a.date===todayISO()){
    var dm=(text||"").match(/\b(\d{1,2})[\/\-.](\d{1,2})[\/\-.](20\d{2})\b/);
    if(dm){ a.date=dm[3]+"-"+String(dm[2]).padStart(2,"0")+"-"+String(dm[1]).padStart(2,"0"); }
  }
  var amount=parseAmountFromOCR(text||"");
  if(amount>0) a.montantTTC=amount;
  var low=(text||"").toLowerCase();
  if(/fleur|florist|hortensia|gyps|rose|renoncule|eucalyptus|statice|pampa/.test(low)) a.categorie="Fleurs";
  else if(/carton|boite|sachet|emballage|papier|ruban/.test(low)) a.categorie="Emballages";
  else if(/colle|pistolet|sécateur|secateur|ciseaux|fil de fer|outil/.test(low)) a.categorie="Matériel";
  else if(/facebook|meta|instagram|pub|publicit|canva|site|domain/.test(low)) a.categorie="Communication";
}

function parseAmountFromOCR(text){
  var candidates=[];
  var lines=(text||"").split(/\n/);
  lines.forEach(function(line){
    var score=/total|ttc|net.?a.?payer|montant/i.test(line)?10:0;
    var matches=line.match(/(?:\d{1,4}(?:[ \u00A0]\d{3})*|\d+)[,.]\d{2}/g)||[];
    matches.forEach(function(m){
      var n=Number(m.replace(/[ \u00A0]/g,"").replace(",","."));
      if(isFinite(n) && n>0 && n<10000) candidates.push({n:n,score:score});
    });
  });
  if(!candidates.length) return 0;
  candidates.sort(function(a,b){ return (b.score-a.score) || (b.n-a.n); });
  return r2(candidates[0].n);
}


function viewAchatsPreview(){
  var annee=new Date().getFullYear(), mois=new Date().getMonth()+1;
  var totalM=totalAchatsPeriode(annee,mois);
  var last=(state.achats||[]).slice().sort(function(a,b){return (b.date||"").localeCompare(a.date||"");}).slice(0,3);
  var html='<div class="card"><div class="flexb"><h3 style="margin:0;">🛒 Achats fournisseurs</h3><button class="btn small primary" data-action="go-achats">Ouvrir</button></div>'+
    '<p class="muted" style="margin:8px 0 10px;">Achats du mois : <b style="color:var(--bordeaux);">'+euro(totalM)+'</b></p>';
  if(!last.length) return html+'<p class="muted" style="margin:0;">Aucun achat enregistré.</p></div>';
  last.forEach(function(a){html+='<div class="cal-listitem"><b style="color:var(--bordeaux);">'+esc(a.fournisseur||"Fournisseur")+'</b><div class="muted" style="font-size:12px;">'+frDate(a.date)+' · '+euro(a.montantTTC||0)+' · '+esc(a.categorie||"Divers")+'</div></div>';});
  return html+'</div>';
}


/* ===================== Ventes site internet V3.0.0 ===================== */
var SITE_ACTIVITES=["Atelier","Produit","Box DIY","Mariage","Autre"];

function newSiteSaleDraft(){
  var firstAtelier=(state.ateliers||[]).slice().sort(function(a,b){return (a.date||"9999").localeCompare(b.date||"9999");})[0];
  ui.siteSaleDraft={
    id:uid(),
    date:todayISO(),
    clientMode:state.clients.length?"existant":"nouveau",
    clientId:state.clients[0]?state.clients[0].id:"",
    client:"",
    email:"",
    tel:"",
    produit:"",
    commande:"",
    activite:"Atelier",
    atelierId:firstAtelier?firstAtelier.id:"",
    atelierParticipantId:"",
    atelierLabel:"",
    prestation:"Place atelier",
    atelierPaiementType:"acompte30",
    atelierPrixTotal:0,
    montant:0,
    frais:0,
    notes:"",
    paiement:"Site internet",
    statut:"payee",
    createdAt:new Date().toISOString()
  };
}

function captureSiteSaleDraft(){
  var s=ui.siteSaleDraft; if(!s) return;
  s.date=val("siteDate")||todayISO();
  s.commande=val("siteCommande");
  s.activite=val("siteActivite")||"Autre";
  s.clientMode=s.clientMode||"nouveau";

  if(s.clientMode==="existant" && state.clients.length){
    s.clientId=val("siteClientId")||s.clientId;
    var c=state.clients.find(function(x){return x.id===s.clientId;});
    if(c){ s.client=c.nom||""; s.email=c.email||""; s.tel=c.tel||""; }
  } else {
    s.client=val("siteClient");
    s.email=val("siteEmail");
    s.tel=val("siteTel");
  }

  s.atelierId=val("siteAtelierId")||s.atelierId||"";
  s.prestation=val("sitePrestation")||s.prestation||"";
  s.produit=val("siteProduit");
  s.atelierPaiementType=val("siteAtelierPaiementType")||s.atelierPaiementType||"acompte30";
  s.atelierPrixTotal=num(val("siteAtelierPrixTotal"))||num(s.atelierPrixTotal)||0;

  if(s.activite==="Atelier"){
    var a=getAtelier(s.atelierId);
    s.atelierLabel=a?((a.type||"Atelier")+" · "+(a.theme||"")+" · "+(a.date?frDate(a.date):"")):"";
    if(!s.produit) s.produit=s.prestation||"Réservation atelier";

    var paid=num(val("siteMontant"));
    if(!paid && s.atelierPrixTotal>0){
      paid=s.atelierPaiementType==="acompte30"?r2(s.atelierPrixTotal*0.30):s.atelierPrixTotal;
    }
    s.montant=paid;
  } else {
    s.montant=num(val("siteMontant"));
  }

  s.frais=num(val("siteFrais"));
  s.notes=val("siteNotes");
  s.paiement="Site internet";
  s.statut="payee";
}

function siteActiviteOptions(selected){
  selected=selected||"Atelier";
  return SITE_ACTIVITES.map(function(a){
    return '<option value="'+esc(a)+'"'+(a===selected?' selected':'')+'>'+esc(a)+'</option>';
  }).join("");
}

function viewSiteSaleForm(){
  var s=ui.siteSaleDraft;
  var clientPart='';
  if(state.clients.length){
    clientPart+='<div class="row-actions" style="margin-top:0;margin-bottom:12px;">'+
      '<button class="btn small '+(s.clientMode==="nouveau"?"primary":"ghost")+'" data-action="site-mode-nouveau">Nouvelle cliente</button>'+
      '<button class="btn small '+(s.clientMode==="existant"?"primary":"ghost")+'" data-action="site-mode-existant">Cliente enregistrée</button></div>';
  }
  if(s.clientMode==="existant"&&state.clients.length){
    clientPart+='<label class="field"><span>Cliente liée à la base clients</span><select id="siteClientId" data-action="site-clientsel">'+sortedClients().map(function(c){return '<option value="'+esc(c.id)+'"'+(c.id===s.clientId?' selected':'')+'>'+esc(c.nom)+'</option>';}).join("")+'</select><div class="hint">La vente sera automatiquement ajoutée dans l’historique de cette cliente.</div></label>';
  } else {
    clientPart+='<div class="inline"><div><label class="field"><span>Cliente</span><input id="siteClient" value="'+esc(s.client||"")+'" placeholder="Nom de la cliente"></label></div>'+
      '<div><label class="field"><span>Email</span><input id="siteEmail" type="email" value="'+esc(s.email||"")+'" placeholder="email@exemple.fr"></label></div></div>'+
      '<label class="field"><span>Téléphone</span><input id="siteTel" value="'+esc(s.tel||"")+'"></label>';
  }

  var atelierPart='';
  if(s.activite==="Atelier"){
    var ateliers=(state.ateliers||[]).filter(function(a){return atelierMode(a)==="thematique";}).slice().sort(function(a,b){return (a.date||"9999").localeCompare(b.date||"9999");});
    var prixTotal=num(s.atelierPrixTotal)||0;
    var montantSug=s.atelierPaiementType==="acompte30"?r2(prixTotal*0.30):prixTotal;
    var soldeSug=s.atelierPaiementType==="acompte30"?r2(prixTotal-montantSug):0;
    atelierPart+='<div class="card" style="background:var(--cream);"><h3 style="margin-top:0;">Lien avec un atelier</h3>';
    if(!ateliers.length){
      atelierPart+='<p class="muted">Aucun atelier thématique site créé pour le moment. Crée d’abord un atelier en catégorie « Atelier thématique site » dans Clients → Ateliers.</p>';
    } else {
      atelierPart+='<label class="field"><span>Atelier concerné</span><select id="siteAtelierId" data-action="site-atelier-change">'+ateliers.map(function(a){return '<option value="'+esc(a.id)+'"'+(a.id===s.atelierId?' selected':'')+'>'+esc((a.date?frDate(a.date)+" · ":"")+(a.type||"Atelier")+" · "+(a.theme||"Sans thème")+(a.lieu?" · "+a.lieu:""))+'</option>';}).join("")+'</select><div class="hint">La participante sera ajoutée automatiquement dans cet atelier.</div></label>'+
      '<label class="field"><span>Prestation / place réservée</span><input id="sitePrestation" value="'+esc(s.prestation||"")+'" placeholder="Ex : Place atelier couronne, demi-couronne…"></label>'+
      '<div class="inline"><div><label class="field"><span>Type de réservation Squarespace</span><select id="siteAtelierPaiementType" data-action="site-atelier-pay-change"><option value="acompte30"'+(s.atelierPaiementType==="acompte30"?' selected':'')+'>Acompte 30 %</option><option value="total"'+(s.atelierPaiementType==="total"?' selected':'')+'>Prix total</option></select></label></div>'+
      '<div><label class="field"><span>Prix total de la place (€)</span><input id="siteAtelierPrixTotal" data-action="site-atelier-price" type="number" min="0" step="0.01" value="'+esc(s.atelierPrixTotal||"")+'"></label></div></div>'+
      '<div class="summary" style="margin-bottom:0;"><div class="totrow"><span>Montant à saisir / encaissé Squarespace</span><b>'+(prixTotal?euro(montantSug):"—")+'</b></div><div class="totrow"><span>Solde restant le jour de l’atelier</span><b>'+(soldeSug?euro(soldeSug):"0,00 €")+'</b></div></div>';
    }
    atelierPart+='</div>';
  }

  return '<div class="card" style="border-color:var(--gold-s);"><div class="flexb" style="margin-bottom:10px;"><h3 style="margin:0;">Nouvelle vente site internet</h3><button class="btn small ghost" data-action="site-cancel">Annuler</button></div>'+
    '<p class="muted" style="margin-top:0;">À utiliser pour les commandes Squarespace déjà facturées et payées par le site. Si c’est une réservation atelier, elle sera aussi ajoutée dans l’atelier correspondant.</p>'+
    '<div class="inline"><div><label class="field"><span>Date de commande</span><input id="siteDate" type="date" value="'+esc(s.date)+'"></label></div>'+
    '<div><label class="field"><span>N° commande Squarespace</span><input id="siteCommande" value="'+esc(s.commande||"")+'" placeholder="Ex : #000123"></label></div></div>'+
    clientPart+
    '<div class="inline"><div><label class="field"><span>Type de vente</span><select id="siteActivite" data-action="site-activite-change">'+siteActiviteOptions(s.activite)+'</select></label></div>'+
    '<div><label class="field"><span>Montant encaissé sur Squarespace (€)</span><input id="siteMontant" type="number" min="0" step="0.01" value="'+esc(s.montant||"")+'"><div class="hint">Pour un atelier avec acompte, indique seulement le montant réellement payé sur Squarespace.</div></label></div></div>'+
    atelierPart+
    '<label class="field"><span>Produit / libellé affiché</span><input id="siteProduit" value="'+esc(s.produit||"")+'" placeholder="Ex : Atelier couronne, Box DIY, bouquet…"></label>'+
    '<label class="field"><span>Frais éventuels (€)</span><input id="siteFrais" type="number" min="0" step="0.01" value="'+esc(s.frais||"")+'"></label>'+
    '<label class="field"><span>Notes</span><textarea id="siteNotes" placeholder="Infos utiles, nombre de participantes, produit expédié…">'+esc(s.notes||"")+'</textarea></label>'+
    '<div class="summary"><div class="totrow"><span>Moyen de paiement</span><b>Site internet</b></div><div class="totrow"><span>Statut</span><b>Payé</b></div></div>'+
    '<div class="row-actions"><button class="btn primary" data-action="site-save">Enregistrer la vente site</button></div></div>';
}

function viewVentesSite(){
  var list=(state.ventesSite||[]).slice().sort(function(a,b){return (b.date||"").localeCompare(a.date||"");});
  var totalM=list.filter(function(s){return (s.date||"").slice(0,7)===todayISO().slice(0,7);}).reduce(function(t,s){return t+(Number(s.montant)||0);},0);
  var totalA=list.filter(function(s){return (s.date||"").slice(0,4)===todayISO().slice(0,4);}).reduce(function(t,s){return t+(Number(s.montant)||0);},0);
  var html='<div class="flexb" style="margin-bottom:14px;"><h2 style="margin:0;">Ventes site internet</h2><button class="btn primary" data-action="site-new">+ Nouvelle vente site</button></div>'+
    '<p class="muted" style="margin-top:-6px;">Ici, tu enregistres les ventes Squarespace déjà facturées automatiquement par le site : réservations d’ateliers, box DIY, produits en ligne. Elles alimentent la Trésorerie sans créer de doublon de facture.</p>'+
    '<div class="grid-stats">'+stat("Site internet ce mois",euro(r2(totalM)),false)+stat("Site internet cette année",euro(r2(totalA)),false)+stat("Nombre de ventes",list.length,false)+'</div>';
  if(ui.siteSaleDraft) html+=viewSiteSaleForm();
  if(!list.length) return html+'<div class="card"><p class="muted" style="margin:0;">Aucune vente site enregistrée.</p></div>';
  html+='<div class="card"><h3 style="margin:0 0 10px;">Historique des ventes site</h3>';
  list.forEach(function(s){
    var del=ui.confirmDelete==="site:"+s.id;
    html+='<div class="checkrow" style="align-items:flex-start;"><div style="flex:1;">'+
      '<div><b style="color:var(--bordeaux);">'+esc(s.produit||"Vente site")+'</b> <span class="achat-cat">'+esc(s.activite||"Autre")+'</span></div>'+
      '<div class="muted" style="font-size:12px;">'+frDate(s.date)+(s.client?' · '+esc(s.client):'')+(s.commande?' · Commande '+esc(s.commande):'')+'</div>'+
      '<div class="muted" style="font-size:12px;">Paiement : Site internet · Statut : payé'+(s.email?' · '+esc(s.email):'')+(s.atelierLabel?' · Atelier lié : '+esc(s.atelierLabel):'')+'</div>'+
      (s.notes?'<div class="muted" style="font-size:12px;">'+esc(s.notes)+'</div>':'')+
      '</div><div style="text-align:right;"><b style="color:var(--bordeaux);">'+euro(s.montant||0)+'</b><div style="margin-top:6px;"><button class="btn small danger" data-action="site-del-'+s.id+'">'+(del?'Confirmer':'Supprimer')+'</button></div></div></div>';
  });
  html+='</div>';
  return html;
}

function resolveSiteSaleClient(s){
  var client=null;
  if(s.clientMode==="existant"&&s.clientId){
    client=state.clients.find(function(c){return c.id===s.clientId;})||null;
  }
  if(!client){
    var k=normName(s.client||"");
    client=(state.clients||[]).find(function(c){return normName(c.nom)===k;})||null;
  }
  if(client){
    if(s.email&&!client.email) client.email=s.email;
    if(s.tel&&!client.tel) client.tel=s.tel;
    s.client=client.nom||s.client;
    s.email=client.email||s.email||"";
    s.tel=client.tel||s.tel||"";
    s.clientId=client.id;
    return client;
  }
  client={id:uid(),nom:(s.client||"").trim(),adresse:"",email:s.email||"",tel:s.tel||"",canal:"",anniversaire:"",notes:""};
  state.clients.push(client);
  s.clientId=client.id;
  return client;
}
function syncSiteSaleToAtelier(s){
  if(!s || s.activite!=="Atelier" || !s.atelierId) return;
  var a=getAtelier(s.atelierId);
  if(!a) return;
  if(atelierMode(a)!=="thematique") return;
  a.participants=a.participants||[];
  var existing=a.participants.find(function(p){return p.siteSaleId===s.id;});
  var prestation=s.prestation||s.produit||"Réservation site internet";
  var prixTotal=num(s.atelierPrixTotal)||num(s.montant)||0;
  var paye=num(s.montant)||0;
  var solde=Math.max(0,r2(prixTotal-paye));
  var facturationSite=s.atelierPaiementType==="acompte30"?"site_acompte":"site_total";

  if(existing){
    existing.nom=s.client;
    existing.email=s.email;
    existing.tel=s.tel;
    existing.prestation=prestation;
    existing.montant=prixTotal;
    existing.payeSiteMontant=paye;
    existing.soldeSite=solde;
    existing.source="site";
    existing.facturation=facturationSite;
    existing.payeSite=true;
    existing.commande=s.commande||"";
    s.atelierParticipantId=existing.id;
  } else {
    var p={id:uid(),nom:s.client,email:s.email||"",tel:s.tel||"",prestation:prestation,montant:prixTotal,payeSiteMontant:paye,soldeSite:solde,facturation:facturationSite,source:"site",payeSite:true,siteSaleId:s.id,commande:s.commande||""};
    a.participants.push(p);
    s.atelierParticipantId=p.id;
  }
  s.atelierPrixTotal=prixTotal;
  s.atelierSolde=solde;
  s.atelierLabel=(a.type||"Atelier")+" · "+(a.theme||"")+" · "+(a.date?frDate(a.date):"");
}
function removeSiteSaleFromAtelier(s){
  if(!s) return;
  (state.ateliers||[]).forEach(function(a){
    a.participants=(a.participants||[]).filter(function(p){return p.siteSaleId!==s.id;});
  });
}
function saveSiteSale(){
  captureSiteSaleDraft();
  var s=ui.siteSaleDraft; if(!s) return;
  if(!(s.client||"").trim()){ toast("Indique la cliente."); return; }
  if(s.activite==="Atelier"){
    if(!s.atelierId){ toast("Choisis l’atelier concerné pour synchroniser la participante."); return; }
    if(!(num(s.atelierPrixTotal)>0)){ toast("Indique le prix total de la place."); return; }
    if(!(num(s.montant)>0)){
      s.montant=s.atelierPaiementType==="acompte30"?r2(num(s.atelierPrixTotal)*0.30):num(s.atelierPrixTotal);
    }
  } else if(!(Number(s.montant)>0)){
    toast("Indique le montant encaissé."); return;
  }

  resolveSiteSaleClient(s);
  if(!(s.produit||"").trim()) s.produit=(s.activite==="Atelier"?(s.prestation||"Réservation atelier"):"Vente site internet");
  syncSiteSaleToAtelier(s);

  state.ventesSite=state.ventesSite||[];
  state.ventesSite.unshift(Object.assign({},s));
  ui.siteSaleDraft=null;
  saveCache(); render(); toast("Vente site enregistrée et synchronisée.");
}


function viewSiteSalesPreview(){
  var list=(state.ventesSite||[]).slice().sort(function(a,b){return (b.date||"").localeCompare(a.date||"");}).slice(0,3);
  var total=(state.ventesSite||[]).filter(function(s){return (s.date||"").slice(0,7)===todayISO().slice(0,7);}).reduce(function(t,s){return t+(Number(s.montant)||0);},0);
  var html='<div class="card"><div class="flexb"><h3 style="margin:0;">🌐 Ventes site internet</h3><button class="btn small primary" data-action="nav-ventesSite">Ouvrir</button></div>'+
    '<p class="muted" style="margin:8px 0 10px;">Ventes Squarespace du mois : <b style="color:var(--bordeaux);">'+euro(r2(total))+'</b></p>';
  if(!list.length) return html+'<p class="muted" style="margin:0;">Aucune vente site enregistrée.</p></div>';
  list.forEach(function(s){ html+='<div class="cal-listitem"><b style="color:var(--bordeaux);">'+esc(s.produit||"Vente site")+'</b><div class="muted" style="font-size:12px;">'+frDate(s.date)+' · '+esc(s.client||"")+' · '+euro(s.montant||0)+'</div></div>'; });
  return html+'</div>';
}


/* ===================== Trésorerie V3.0.0 ===================== */
function encaissementsTresorerie(){
  var arr=[];
  (state.factures||[]).forEach(function(f){
    if(f.statut==="payee"){
      arr.push({
        id:f.id,
        type:"facture",
        date:f.datePaiement||f.date||todayISO(),
        libelle:f.numero||"Facture",
        client:(f.client&&f.client.nom)||"",
        montant:Number(f.montant)||0,
        montantBiens:Number(f.montantBiens)||0,
        montantServices:Number(f.montantServices)||0,
        paiement:normalizePaymentMethod(f.paiementClient||""),
        activite:activiteFacture(f),
        facture:f
      });
    }
  });
  (state.encaissements||[]).forEach(function(e){
    arr.push({
      id:e.id,
      type:"manuel",
      date:e.date||todayISO(),
      libelle:e.libelle||"Encaissement manuel",
      client:e.client||"",
      montant:Number(e.montant)||((Number(e.montantBiens)||0)+(Number(e.montantServices)||0)),
      montantBiens:Number(e.montantBiens)||0,
      montantServices:Number(e.montantServices)||0,
      paiement:normalizePaymentMethod(e.paiement||""),
      activite:activiteEncaissement(e),
      facture:null
    });
  });
  (state.ventesSite||[]).forEach(function(s){
    arr.push({
      id:s.id,
      type:"site",
      date:s.date||todayISO(),
      libelle:(s.commande?("Squarespace "+s.commande):"Vente site")+" · "+(s.produit||""),
      client:s.client||"",
      montant:siteSaleSplit(s).total,
      montantBiens:siteSaleSplit(s).biens,
      montantServices:siteSaleSplit(s).services,
      paiement:"Site internet",
      activite:activiteVenteSite(s),
      facture:null,
      siteSale:s
    });
  });
  arr.sort(function(a,b){return (b.date||"").localeCompare(a.date||"");});
  return arr;
}
function activiteFacture(f){
  if(f && f.origine==="atelier") return "Ateliers";
  if(f.devisId && (state.mariages||[]).some(function(m){return m.devisLie===f.devisId;})) return "Mariages";
  var txt=((f.notes||"")+" "+((f.client&&f.client.nom)||"")+" "+(f.devisNumero||"")).toLowerCase();
  if(txt.indexOf("atelier")>=0 || txt.indexOf("evjf")>=0 || txt.indexOf("qvt")>=0) return "Ateliers";
  return "Commandes";
}
function activiteEncaissement(e){
  var txt=((e.libelle||"")+" "+(e.client||"")).toLowerCase();
  if(txt.indexOf("mariage")>=0) return "Mariages";
  if(txt.indexOf("atelier")>=0 || txt.indexOf("evjf")>=0 || txt.indexOf("qvt")>=0) return "Ateliers";
  return "Commandes";
}
function activiteVenteSite(s){
  var a=(s.activite||"").toLowerCase();
  if(a.indexOf("mariage")>=0) return "Mariages";
  if(a.indexOf("atelier")>=0) return "Ateliers";
  return "Commandes";
}
function groupTresorerieBy(keyFn, list){
  var out={};
  (list||encaissementsTresorerie()).forEach(function(e){
    var k=keyFn(e)||"Non renseigné";
    out[k]=(out[k]||0)+(Number(e.montant)||0);
  });
  return out;
}
function tresoBar(label,val,total){
  var pct=total>0?Math.round((val/total)*100):0;
  return '<div style="margin:8px 0;"><div class="flexb"><span>'+esc(label)+'</span><b>'+euro(val)+' · '+pct+'%</b></div><div class="jauge"><div class="track"><div class="fill" style="width:'+pct+'%;background:var(--bordeaux);"></div></div></div></div>';
}
function tresoAvailableYears(list){
  var years={};
  (list||encaissementsTresorerie()).forEach(function(e){ if(e.date) years[String(e.date).slice(0,4)]=1; });
  (state.achats||[]).forEach(function(a){ if(a.date) years[String(a.date).slice(0,4)]=1; });
  years[String(new Date().getFullYear())]=1;
  return Object.keys(years).sort();
}
function tresoSelectedPeriod(){
  var now=new Date();
  if(!ui.tresoYear) ui.tresoYear=now.getFullYear();
  if(!ui.tresoMonth) ui.tresoMonth=now.getMonth()+1;
  var y=Number(ui.tresoYear)||now.getFullYear();
  var m=Number(ui.tresoMonth)||now.getMonth()+1;
  if(m<1||m>12) m=now.getMonth()+1;
  return {year:y, month:m, prefix:String(y)+"-"+String(m).padStart(2,"0")};
}
function tresoUrssafEstimate(biens, services){
  var s=state.settings||{};
  var b=r2((Number(biens)||0)*(Number(s.tauxCotisBiens)||0)/100);
  var sv=r2((Number(services)||0)*(Number(s.tauxCotisServices)||0)/100);
  return {biens:b, services:sv, total:r2(b+sv)};
}
function tresoPeriodLabel(period){ return MOISL[(Number(period.month)||1)-1]+" "+period.year; }
function tresoMonthOptions(sel){
  return MOISL.map(function(m,i){ var v=i+1; return '<option value="'+v+'"'+(v===Number(sel)?' selected':'')+'>'+m+'</option>'; }).join("");
}
function tresoYearOptions(years, sel){
  return (years||[]).map(function(y){ return '<option value="'+esc(y)+'"'+(String(y)===String(sel)?' selected':'')+'>'+esc(y)+'</option>'; }).join("");
}
function viewTresorerie(){
  var period=tresoSelectedPeriod();
  var list=encaissementsTresorerie();
  var years=tresoAvailableYears(list);
  var listYear=list.filter(function(e){return (e.date||"").slice(0,4)===String(period.year);});
  var listMonth=list.filter(function(e){return (e.date||"").slice(0,7)===period.prefix;});

  var caMB=r2(listMonth.reduce(function(s,e){return s+(Number(e.montantBiens)||0);},0));
  var caMS=r2(listMonth.reduce(function(s,e){return s+(Number(e.montantServices)||0);},0));
  var caM=r2(caMB+caMS);
  var caAB=r2(listYear.reduce(function(s,e){return s+(Number(e.montantBiens)||0);},0));
  var caAS=r2(listYear.reduce(function(s,e){return s+(Number(e.montantServices)||0);},0));
  var caA=r2(caAB+caAS);
  var achatsM=(typeof totalAchatsPeriode==="function") ? totalAchatsPeriode(Number(period.year), Number(period.month)) : 0;
  var achatsA=(typeof totalAchatsPeriode==="function") ? totalAchatsPeriode(Number(period.year), null) : 0;
  var urssaf=tresoUrssafEstimate(caMB, caMS);
  var byPay=groupTresorerieBy(function(e){return e.paiement;}, listYear);
  var byAct=groupTresorerieBy(function(e){return e.activite;}, listYear);
  var label=tresoPeriodLabel(period);
  var html='<div class="flexb" style="margin-bottom:14px;"><div><h2 style="margin:0;">Trésorerie</h2><span class="muted">Factures payées + encaissements manuels + ventes site</span></div>'+ 
    '<div class="row-actions" style="margin:0;align-items:flex-end;">'+
      '<label class="field" style="margin:0;min-width:150px;"><span>Mois</span><select data-action="treso-month">'+tresoMonthOptions(period.month)+'</select></label>'+ 
      '<label class="field" style="margin:0;min-width:100px;"><span>Année</span><select data-action="treso-year">'+tresoYearOptions(years, period.year)+'</select></label>'+ 
      '<button class="btn small ghost" data-action="treso-current-month" style="align-self:flex-end;">Mois actuel</button>'+ 
    '</div></div>'+ 
    '<div class="card" style="background:#eef7f1;border-color:#9fc9ab;margin-bottom:14px;"><b style="color:var(--green);">✅ Version active : '+esc(APP_VERSION)+'</b><div class="muted" style="font-size:12px;margin-top:4px;">Trésorerie mensuelle détaillée : '+esc(label)+'.</div></div>'+ 
    '<div class="grid-stats">'+
      stat('CA encaissé '+label,euro(caM),true)+
      stat('Vente de biens',euro(caMB),false,'var(--blush-s)')+
      stat('Prestations de services',euro(caMS),false,'var(--green-s)')+
      stat('Estimation URSSAF',euro(urssaf.total),false,'#fffaf5')+
      stat('Achats '+label,euro(achatsM),false)+
      stat('Marge brute estimée',euro(r2(caM-achatsM)),false)+
    '</div>'+ 
    '<div class="card" style="border-color:var(--bordeaux);background:#fffaf5;"><div class="flexb" style="margin-bottom:8px;"><h3 style="margin:0;">🧾 Déclaration URSSAF — '+esc(label)+'</h3><span class="badge" style="background:var(--blush-s);color:var(--bordeaux);">mensuel</span></div>'+ 
      '<div class="totrow"><span>Vente de biens</span><b>'+euro(caMB)+'</b></div>'+ 
      '<div class="totrow"><span>Prestations de services</span><b>'+euro(caMS)+'</b></div>'+ 
      '<div class="totrow" style="font-weight:700;color:var(--bordeaux);border-top:1px solid var(--line);margin-top:4px;padding-top:5px;"><span>Total CA à déclarer</span><span>'+euro(caM)+'</span></div>'+ 
      '<div style="margin-top:12px;padding:10px;background:#fff;border:1px solid var(--line);border-radius:10px;">'+
        '<div style="font-weight:700;color:var(--bordeaux);margin-bottom:6px;">Estimation des cotisations URSSAF</div>'+ 
        '<div class="totrow"><span>Biens ('+(state.settings.tauxCotisBiens||0)+' %)</span><span>'+euro(urssaf.biens)+'</span></div>'+ 
        '<div class="totrow"><span>Services ('+(state.settings.tauxCotisServices||0)+' %)</span><span>'+euro(urssaf.services)+'</span></div>'+ 
        '<div class="totrow" style="font-weight:700;color:var(--bordeaux);border-top:1px solid var(--line);margin-top:4px;padding-top:5px;"><span>Total estimé à payer</span><span>'+euro(urssaf.total)+'</span></div>'+ 
      '</div>'+ 
      '<p class="muted" style="font-size:12px;margin:8px 0 0;">Montant indicatif calculé avec les taux renseignés dans Paramètres. À vérifier lors de la déclaration réelle.</p></div>'+ 
    '<div class="card"><div class="flexb"><h3 style="margin:0 0 10px;">Détail des ventes encaissées — '+esc(label)+'</h3><span class="muted">'+listMonth.length+' ligne(s)</span></div>';
  if(!listMonth.length) html+='<p class="muted">Aucune vente encaissée sur ce mois.</p>';
  else listMonth.forEach(function(e){
    html+='<div class="checkrow" style="align-items:flex-start;cursor:'+(e.facture?'pointer':'default')+';" '+(e.facture?'data-action="treso-open-facture-'+e.id+'"':'')+'>'+ 
      '<div style="flex:1;"><b style="color:var(--bordeaux);">'+esc(e.libelle)+'</b>'+ 
      '<div class="muted" style="font-size:12px;">'+frDate(e.date)+(e.client?' · '+esc(e.client):'')+' · '+esc(e.activite)+' · '+esc(e.paiement)+(e.type==="site"?' · Squarespace':'')+'</div>'+ 
      '<div class="muted" style="font-size:12px;">'+euro(e.montantBiens||0)+' biens · '+euro(e.montantServices||0)+' services</div></div>'+ 
      '<div style="font-weight:800;color:var(--bordeaux);white-space:nowrap;">'+euro(e.montant)+'</div></div>';
  });
  if(listMonth.length){
    html+='<div style="border-top:2px solid var(--bordeaux);margin-top:10px;padding-top:8px;">'+
      '<div class="totrow" style="font-weight:700;color:var(--bordeaux);"><span>Total encaissé</span><span>'+euro(caM)+'</span></div>'+ 
      '<div class="muted" style="text-align:right;font-size:12px;">'+euro(caMB)+' biens · '+euro(caMS)+' services · URSSAF estimée '+euro(urssaf.total)+'</div>'+ 
    '</div>';
  }
  html+='</div>'+ 
    '<div class="card"><h3 style="margin:0 0 10px;">Répartition par moyen de paiement '+period.year+'</h3>';
  CLIENT_PAYMENT_METHODS.concat(['Non renseigné']).forEach(function(p){
    if(byPay[p]) html+=tresoBar(p, r2(byPay[p]), caA);
  });
  if(!Object.keys(byPay).length) html+='<p class="muted">Aucun encaissement sur cette année.</p>';
  html+='</div><div class="card"><h3 style="margin:0 0 10px;">Répartition par activité '+period.year+'</h3>';
  ['Mariages','Ateliers','Commandes'].forEach(function(a){
    if(byAct[a]) html+=tresoBar(a, r2(byAct[a]), caA);
  });
  if(!Object.keys(byAct).length) html+='<p class="muted">Aucune activité encaissée sur cette année.</p>';
  html+='</div>'+ 
    '<div class="card"><h3 style="margin:0 0 8px;">Synthèse annuelle '+period.year+'</h3>'+ 
      '<div class="totrow"><span>CA encaissé annuel</span><b>'+euro(caA)+'</b></div>'+ 
      '<div class="totrow"><span>dont biens</span><span>'+euro(caAB)+'</span></div>'+ 
      '<div class="totrow"><span>dont services</span><span>'+euro(caAS)+'</span></div>'+ 
      '<div class="totrow"><span>Achats annuels</span><span>'+euro(achatsA)+'</span></div>'+ 
    '</div>';
  return html;
}
function todaySmartData(){
  var today=todayISO();
  var commandes=(state.commandes||[]).filter(function(c){return !c.fait;}).length;
  var aEncaisser=pendingPaymentsTotal();
  var echues=(state.factures||[]).filter(function(f){return f.statut!=="payee" && f.echeance && f.echeance<today;}).length;
  var mariagesLivraison=(state.mariages||[]).filter(function(m){return !mariageTermine(m) && m.dateLivraison && m.dateLivraison>=today && m.dateLivraison<=addDays(today,7);}).length;
  var devisRelance=(state.devis||[]).filter(function(d){return d.statut==="envoye" && d.date && d.date<=addDays(today,-7);}).length;
  var siteM=(state.ventesSite||[]).filter(function(s){return (s.date||"").slice(0,7)===today.slice(0,7);}).reduce(function(t,s){return t+(Number(s.montant)||0);},0);
  var ateliersSoon=(typeof atelierUpcoming==='function')?atelierUpcoming().filter(function(a){return a.date<=addDays(today,7);}).length:0;
  return {commandes:commandes,aEncaisser:r2(aEncaisser),echues:echues,mariagesLivraison:mariagesLivraison,devisRelance:devisRelance,siteM:r2(siteM),ateliersSoon:ateliersSoon};
}
function viewSmartDashboard(){
  var d=todaySmartData();
  return '<div class="card" style="border-color:var(--bordeaux);"><h3 style="margin:0 0 10px;">Aujourd’hui</h3>'+
    '<div class="checkrow" data-action="goto-commandes-suivi" style="cursor:pointer;"><div style="flex:1;">📦 Commandes à préparer</div><b>'+d.commandes+'</b></div>'+
    '<div class="checkrow" data-action="dash-pending-payments" style="cursor:pointer;"><div style="flex:1;">💶 À encaisser prochainement</div><b>'+euro(d.aEncaisser)+'</b></div>'+
    '<div class="checkrow" data-action="nav-mariages" style="cursor:pointer;"><div style="flex:1;">💍 Mariages à livrer sous 7 jours</div><b>'+d.mariagesLivraison+'</b></div>'+
    '<div class="checkrow" data-action="nav-devis" style="cursor:pointer;"><div style="flex:1;">📞 Devis à relancer</div><b>'+d.devisRelance+'</b></div>'+
    '<div class="checkrow" data-action="nav-ateliers" style="cursor:pointer;"><div style="flex:1;">🎨 Ateliers à venir sous 7 jours</div><b>'+d.ateliersSoon+'</b></div>'+ 
    '<div class="checkrow" data-action="nav-ventesSite" style="cursor:pointer;"><div style="flex:1;">🌐 Ventes site du mois</div><b>'+euro(d.siteM)+'</b></div>'+
    '<div class="checkrow" data-action="dash-pending-payments" style="cursor:pointer;border-bottom:none;"><div style="flex:1;">⚠️ Factures échues</div><b>'+d.echues+'</b></div>'+
  '</div>';
}


/* ===================== Clients V1.2 ===================== */
function clientKey(cOrName){ return normName(typeof cOrName==="string"?cOrName:(cOrName&&cOrName.nom)||""); }
function clientNameMatches(nom, candidate){ return candidate && clientKey(candidate)===clientKey(nom); }

function clientHistoriqueComplet(c){
  var key=clientKey(c), items=[];
  (state.devis||[]).forEach(function(d){
    if(d.client && clientNameMatches(c.nom,d.client.nom)){
      items.push({date:d.date,type:"Devis",label:d.numero+" · "+((ST_DEVIS[d.statut]||ST_DEVIS.brouillon).l),montant:totals(d.lignes,state.settings.partService).total,paid:null,source:"devis",id:d.id});
    }
  });
  (state.factures||[]).forEach(function(f){
    if(f.client && clientNameMatches(c.nom,f.client.nom)){
      items.push({date:f.datePaiement||f.date,type:"Facture",label:(f.numero||"Facture")+" · "+(TYPE_FAC[f.type]||"Facture"),montant:Number(f.montant)||0,paid:f.statut==="payee",source:"facture",id:f.id,paiement:f.paiementClient||""});
    }
  });
  (state.encaissements||[]).forEach(function(e){
    if(e.client && clientNameMatches(c.nom,e.client)){
      items.push({date:e.date,type:"Encaissement manuel",label:e.libelle||"Encaissement",montant:Number(e.montant)||((Number(e.montantBiens)||0)+(Number(e.montantServices)||0)),paid:true,source:"encaissement",id:e.id,paiement:e.paiement||""});
    }
  });
  (state.ventesSite||[]).forEach(function(s){
    if(s.client && clientNameMatches(c.nom,s.client)){
      items.push({date:s.date,type:"Vente site internet",label:(s.commande?("Squarespace "+s.commande+" · "):"")+ (s.produit||"Vente site"),montant:Number(s.montant)||0,paid:true,source:"site",id:s.id,paiement:"Site internet",activite:s.activite||""});
    }
  });
  (state.ateliers||[]).forEach(function(a){
    (a.participants||[]).forEach(function(p){
      if(p.nom && clientNameMatches(c.nom,p.nom)){
        items.push({date:a.date,type:"Atelier",label:(a.type||"Atelier")+" · "+(a.theme||"")+" · "+(p.prestation||""),montant:Number(p.montant)||0,paid:null,source:"atelier",id:a.id,activite:"Atelier"});
      }
    });
  });
  (state.mariages||[]).forEach(function(m){
    if(clientNameMatches(c.nom,m.nom)){
      items.push({date:m.dateLivraison||m.dateMariage||m.createdAt,type:"Mariage",label:(m.dateLivraison?"Livraison ":"Mariage ")+(m.dateLivraison?frDate(m.dateLivraison):(m.dateMariage?frDate(m.dateMariage):""))+(m.statut?(" · "+((STATUT_MAR[m.statut]||{}).l||m.statut)):""),montant:0,paid:null,source:"mariage",id:m.id});
    }
  });
  items.sort(function(a,b){ return (b.date||"").localeCompare(a.date||""); });
  return items;
}

function clientStats(c){
  var h=clientHistoriqueComplet(c);
  var paid=h.filter(function(i){return i.paid===true && Number(i.montant)>0;});
  var total=r2(paid.reduce(function(s,i){return s+(Number(i.montant)||0);},0));
  var nb=paid.length;
  var panier=nb?r2(total/nb):0;
  var dates=paid.map(function(i){return i.date;}).filter(Boolean).sort();
  var payCount={};
  paid.forEach(function(i){ var p=normalizePaymentMethod(i.paiement||""); payCount[p]=(payCount[p]||0)+1; });
  var paiementHabituel=Object.keys(payCount).sort(function(a,b){return payCount[b]-payCount[a];})[0]||"Non renseigné";
  var hasMariage=h.some(function(i){return i.source==="mariage";});
  var hasAtelier=h.some(function(i){return (i.activite||"").toLowerCase().indexOf("atelier")>=0 || (i.label||"").toLowerCase().indexOf("atelier")>=0;});
  var badges=[];
  if(hasMariage) badges.push("💍 Mariée");
  if(hasAtelier) badges.push("🎨 Atelier");
  if(nb>=3) badges.push("⭐ Fidèle");
  if(total>=500) badges.push("💎 VIP");
  if(total>=1000) badges.push("🏆 Top cliente");
  return {historique:h,payees:paid,total:total,nb:nb,panier:panier,first:dates[0]||"",last:dates[dates.length-1]||"",paiementHabituel:paiementHabituel,badges:badges};
}

function clientTimelineHTML(c){
  var st=clientStats(c), h=st.historique;
  if(!h.length) return '<p class="muted" style="margin:0;">Aucun historique pour cette cliente.</p>';
  return h.map(function(i){
    var clickable=i.source==="facture"?' data-action="crm-open-facture-'+i.id+'" style="cursor:pointer;"':'';
    var paidTxt=i.paid===false?' · non payée':(i.paid===true?' · payée':'');
    return '<div class="checkrow" '+clickable+'><div style="flex:1;">'+
      '<div><b style="color:var(--bordeaux);">'+esc(i.type)+'</b> · '+esc(i.label||"")+'</div>'+
      '<div class="muted" style="font-size:12px;">'+(i.date?frDate(i.date):"date inconnue")+paidTxt+(i.paiement?' · '+esc(normalizePaymentMethod(i.paiement)):'')+'</div>'+
    '</div><div style="font-weight:700;color:var(--bordeaux);white-space:nowrap;">'+(i.montant?euro(i.montant):"")+'</div></div>';
  }).join("");
}

function topClientsCRM(limit){
  return (state.clients||[]).map(function(c){ var st=clientStats(c); return {c:c,total:st.total,nb:st.nb,badges:st.badges}; })
    .filter(function(x){return x.total>0 || x.nb>0;})
    .sort(function(a,b){return b.total-a.total;})
    .slice(0,limit||5);
}

function viewCRMPreview(){
  var top=topClientsCRM(3);
  var html='<div class="card"><div class="flexb"><h3 style="margin:0;">👥 Clients</h3><button class="btn small primary" data-action="nav-clients">Ouvrir</button></div>';
  if(!top.length) return html+'<p class="muted" style="margin:8px 0 0;">Aucune statistique client pour le moment.</p></div>';
  top.forEach(function(x){
    html+='<div class="cal-listitem"><b style="color:var(--bordeaux);">'+esc(x.c.nom)+'</b><div class="muted" style="font-size:12px;">'+euro(x.total)+' · '+x.nb+' achat(s) '+(x.badges.length?' · '+x.badges.join(" "):'')+'</div></div>';
  });
  return html+'</div>';
}


/* ===================== Ateliers V1.3 ===================== */

var ATELIER_TYPES=["EVJF","Structure","Anniversaire","Moment entre copine"];

/* ===================== V3.8.1 — Recettes ateliers / simulation stock ===================== */
var ATELIER_MODELES=[
  {id:"mandala_adulte_structure",label:"Mandala végétal adulte",modes:["structure"],materials:[{key:"base_carton_25",label:"Base cartonnée 25 cm",qty:1}]},
  {id:"mandala_enfant_structure",label:"Mandala végétal enfant / ado",modes:["structure"],materials:[{key:"base_carton_20",label:"Base cartonnée 20 cm",qty:1}]},
  {id:"papillon_vegetal_structure",label:"Papillon végétal adulte / ado",modes:["structure"],variants:["supportColor"],materials:[{variantKey:"supportColor",map:{blanc:"toile_24x30_blanche",noir:"toile_24x30_noire"},label:"Toile 24 × 30",qty:1},{key:"papier_miroir_colore",label:"Papier cartonné miroir coloré A4 250 g",qty:1}]},
  {id:"portrait_femme_structure",label:"Portrait de femme adulte / ado",modes:["structure"],variants:["supportColor"],materials:[{variantKey:"supportColor",map:{blanc:"toile_24x30_blanche",noir:"toile_24x30_noire"},label:"Toile 24 × 30",qty:1},{key:"papier_miroir_dore",label:"Papier cartonné miroir doré A4 250 g",qty:1}]},
  {id:"ruban_rose_structure",label:"Ruban Rose adulte / ado",modes:["structure"],variants:["supportColor"],materials:[{variantKey:"supportColor",map:{blanc:"toile_24x30_blanche",noir:"toile_24x30_noire"},label:"Toile 24 × 30",qty:1},{key:"papier_kraft_marron",label:"Papier kraft marron A4 200 g",qty:1},{key:"papier_colore_mot",label:"Papier coloré pour le mot",qty:1}]},
  {id:"photophore_adulte",label:"Photophore adulte",modes:["structure","prive"],materials:[{key:"vase_cyl_115_20",label:"Vase cylindrique 11,5 × 20 cm",qty:1},{key:"paille_blanche",label:"Pailles blanches",qty:35},{key:"ruban_jute_morceau",label:"Morceau de ruban de jute",qty:1}]},
  {id:"cadre_fleuri",label:"Cadre fleuri adulte / ado",modes:["structure","prive"],variants:["supportColor"],materials:[{variantKey:"supportColor",map:{blanc:"toile_24x30_blanche",noir:"toile_24x30_noire"},label:"Toile 24 × 30",qty:1},{key:"paille_blanche",label:"Pailles blanches",qty:35}]},
  {id:"photophore_ado",label:"Photophore ado",modes:["structure","prive"],variants:["strawColor"],materials:[{key:"vase_cyl_115_20",label:"Vase cylindrique 11,5 × 20 cm",qty:1},{variantKey:"strawColor",map:{rose:"paille_rose",violet:"paille_violette",vert:"paille_verte",jaune:"paille_jaune"},label:"Pailles colorées",qty:35},{key:"ruban_jute_morceau",label:"Morceau de ruban de jute",qty:1}]},
  {id:"couronne_signature",label:"Couronne signature adulte / ado",modes:["structure","prive"],variants:["circleSize","macrameColor"],materials:[{variantKey:"circleSize",map:{"20":"cercle_dore_20","25":"cercle_dore_25"},label:"Cercle doré",qty:1},{variantKey:"macrameColor",map:{beige:"macrame_beige",blanc:"macrame_blanc",vert_sauge:"macrame_vert_sauge",rose:"macrame_rose",marron:"macrame_marron",gris_clair:"macrame_gris_clair",violet:"macrame_violet"},label:"Fil macramé",qty:1}]},
  {id:"demi_couronne_seche",label:"Demi-couronne sèche adulte / ado",modes:["structure","prive"],variants:["circleSizeDemi"],materials:[{variantKey:"circleSizeDemi",map:{"15":"cercle_dore_15","20":"cercle_dore_20","25":"cercle_dore_25"},label:"Cercle doré",qty:1}]},
  {id:"arbre_vie_structure",label:"Arbre de vie enfant + 11 ans",modes:["structure"],materials:[{key:"base_carton_20",label:"Base cartonnée 20 cm",qty:1}]},
  {id:"miroir_fleuri",label:"Miroir fleuri",modes:["structure","prive"],materials:[{key:"miroir_rond",label:"Miroir rond",qty:1}]},
  {id:"couronne_tete_prive",label:"Couronne de tête",modes:["prive"],materials:[{key:"fil_fer_malleable_1mm",label:"Fil de fer malléable 1 mm",qty:1}]},
  {id:"peigne_bracelet_prive",label:"Peigne et bracelet",modes:["prive"],variants:["combSize"],materials:[{variantKey:"combSize",map:{"4":"peigne_4_dents","10":"peigne_10_dents"},label:"Peigne",qty:1}]}
];
var ATELIER_STOCK_INITIAL=[
  {key:"papier_miroir_colore",nom:"Feuille papier cartonné miroir coloré A4 250 g",categorie:"Consommables",quantite:60,unite:"pièce",prixUnitaire:0.30,fournisseur:"Amazon",seuil:10},
  {key:"papier_miroir_dore",nom:"Feuille papier cartonné miroir doré A4 250 g",categorie:"Consommables",quantite:60,unite:"pièce",prixUnitaire:0.30,fournisseur:"Amazon",seuil:10},
  {key:"papier_kraft_marron",nom:"Feuille papier kraft marron A4 200 g",categorie:"Consommables",quantite:70,unite:"pièce",prixUnitaire:0.17,fournisseur:"Amazon",seuil:10},
  {key:"macrame_beige",nom:"Fil macramé beige",categorie:"Consommables",quantite:500,unite:"mètre",prixUnitaire:2.49/167,fournisseur:"Action",seuil:30},
  {key:"macrame_blanc",nom:"Fil macramé blanc",categorie:"Consommables",quantite:500,unite:"mètre",prixUnitaire:2.49/167,fournisseur:"Action",seuil:30},
  {key:"macrame_vert_sauge",nom:"Fil macramé vert sauge",categorie:"Consommables",quantite:500,unite:"mètre",prixUnitaire:2.49/167,fournisseur:"Action",seuil:30},
  {key:"macrame_rose",nom:"Fil macramé rose",categorie:"Consommables",quantite:100,unite:"mètre",prixUnitaire:2.49/167,fournisseur:"Action",seuil:20},
  {key:"macrame_marron",nom:"Fil macramé marron",categorie:"Consommables",quantite:100,unite:"mètre",prixUnitaire:2.49/167,fournisseur:"Action",seuil:20},
  {key:"macrame_gris_clair",nom:"Fil macramé gris clair",categorie:"Consommables",quantite:100,unite:"mètre",prixUnitaire:2.49/167,fournisseur:"Action",seuil:20},
  {key:"macrame_violet",nom:"Fil macramé violet",categorie:"Consommables",quantite:100,unite:"mètre",prixUnitaire:2.49/167,fournisseur:"Action",seuil:20},
  {key:"toile_24x30_blanche",nom:"Toile / cadre blanc 24 × 30 cm",categorie:"Matériel",quantite:17,unite:"pièce",prixUnitaire:0.99,fournisseur:"Action",seuil:5},
  {key:"toile_24x30_noire",nom:"Toile / cadre noir 24 × 30 cm",categorie:"Matériel",quantite:15,unite:"pièce",prixUnitaire:0.99,fournisseur:"Action",seuil:5},
  {key:"cadre_blanc_20x20",nom:"Cadre blanc 20 × 20 cm",categorie:"Matériel",quantite:18,unite:"pièce",prixUnitaire:1.99/2,fournisseur:"Action",seuil:4},
  {key:"vase_cyl_115_20",nom:"Vase cylindrique 11,5 × 20 cm",categorie:"Matériel",quantite:31,unite:"pièce",prixUnitaire:1.99,fournisseur:"Action",seuil:8},
  {key:"cercle_dore_30",nom:"Cercle doré 30 cm",categorie:"Matériel",quantite:18,unite:"pièce",prixUnitaire:2.79,fournisseur:"Floralux",seuil:4},
  {key:"cercle_dore_25",nom:"Cercle doré 25 cm",categorie:"Matériel",quantite:6,unite:"pièce",prixUnitaire:1.20,fournisseur:"SHEIN",seuil:3},
  {key:"cercle_dore_20",nom:"Cercle doré 20 cm",categorie:"Matériel",quantite:54,unite:"pièce",prixUnitaire:0.96,fournisseur:"SHEIN",seuil:10},
  {key:"cercle_dore_15",nom:"Cercle doré 15 cm",categorie:"Matériel",quantite:4,unite:"pièce",prixUnitaire:0.70,fournisseur:"SHEIN",seuil:3},
  {key:"cercle_dore_12",nom:"Cercle doré 12 cm",categorie:"Matériel",quantite:37,unite:"pièce",prixUnitaire:0.70,fournisseur:"SHEIN",seuil:8},
  {key:"paille_rose",nom:"Paille rose",categorie:"Consommables",quantite:300,unite:"pièce",prixUnitaire:1.28/100,fournisseur:"Action",seuil:70},
  {key:"paille_violette",nom:"Paille violette",categorie:"Consommables",quantite:300,unite:"pièce",prixUnitaire:1.28/100,fournisseur:"Action",seuil:70},
  {key:"paille_verte",nom:"Paille verte",categorie:"Consommables",quantite:100,unite:"pièce",prixUnitaire:1.28/100,fournisseur:"Action",seuil:50},
  {key:"paille_jaune",nom:"Paille jaune",categorie:"Consommables",quantite:100,unite:"pièce",prixUnitaire:1.28/100,fournisseur:"Action",seuil:50},
  {key:"paille_blanche",nom:"Paille blanche",categorie:"Consommables",quantite:350,unite:"pièce",prixUnitaire:38.99/1000,fournisseur:"Amazon",seuil:100},
  {key:"miroir_rond",nom:"Miroir rond",categorie:"Matériel",quantite:47,unite:"pièce",prixUnitaire:3.33,fournisseur:"B&M",seuil:10},
  {key:"base_carton_25",nom:"Base cartonnée 25 cm",categorie:"Matériel",quantite:0,unite:"pièce",prixUnitaire:0,fournisseur:"À renseigner",seuil:5},
  {key:"base_carton_20",nom:"Base cartonnée 20 cm",categorie:"Matériel",quantite:0,unite:"pièce",prixUnitaire:0,fournisseur:"À renseigner",seuil:5},
  {key:"papier_colore_mot",nom:"Feuille papier coloré pour mot",categorie:"Consommables",quantite:0,unite:"pièce",prixUnitaire:0,fournisseur:"À renseigner",seuil:10},
  {key:"ruban_jute_morceau",nom:"Morceau de ruban de jute",categorie:"Rubans",quantite:0,unite:"pièce",prixUnitaire:0,fournisseur:"À renseigner",seuil:10},
  {key:"fil_fer_malleable_1mm",nom:"Fil de fer malléable 1 mm — portion par personne",categorie:"Consommables",quantite:0,unite:"pièce",prixUnitaire:0,fournisseur:"À renseigner",seuil:10},
  {key:"peigne_4_dents",nom:"Peigne 4 dents",categorie:"Accessoires",quantite:0,unite:"pièce",prixUnitaire:0,fournisseur:"À renseigner",seuil:5},
  {key:"peigne_10_dents",nom:"Peigne 10 dents",categorie:"Accessoires",quantite:0,unite:"pièce",prixUnitaire:0,fournisseur:"À renseigner",seuil:5}
];
function atelierModeleById(id){ return ATELIER_MODELES.find(function(x){return x.id===id;})||null; }
function atelierModeleOptions(selected,mode){
  var list=ATELIER_MODELES.filter(function(x){return !mode || x.modes.indexOf(mode)>=0;});
  if(selected && !list.some(function(x){return x.id===selected;})){ var old=atelierModeleById(selected); if(old) list.unshift(old); }
  return '<option value="">— Choisir un atelier —</option>'+list.map(function(x){return '<option value="'+esc(x.id)+'"'+(selected===x.id?' selected':'')+'>'+esc(x.label)+' — '+x.modes.map(atelierModeLabel).join(' / ')+'</option>';}).join('');
}
function atelierVariantValue(a,key){
  var defaults={supportColor:"blanc",strawColor:"rose",circleSize:"20",circleSizeDemi:"20",macrameColor:"beige",combSize:"4"};
  return (a&&a.stockVariants&&a.stockVariants[key])||defaults[key]||"";
}
function atelierVariantFields(a,model){
  if(!model||!model.variants) return '';
  var h='',v;
  model.variants.forEach(function(k){ v=atelierVariantValue(a,k);
    if(k==='supportColor') h+='<label class="field"><span>Couleur de la toile 24 × 30</span><select id="atVarSupportColor"><option value="blanc"'+(v==='blanc'?' selected':'')+'>Blanche</option><option value="noir"'+(v==='noir'?' selected':'')+'>Noire</option></select></label>';
    if(k==='strawColor') h+='<label class="field"><span>Couleur des pailles</span><select id="atVarStrawColor"><option value="rose"'+(v==='rose'?' selected':'')+'>Rose</option><option value="violet"'+(v==='violet'?' selected':'')+'>Violette</option><option value="vert"'+(v==='vert'?' selected':'')+'>Verte</option><option value="jaune"'+(v==='jaune'?' selected':'')+'>Jaune</option></select></label>';
    if(k==='circleSize') h+='<label class="field"><span>Diamètre du cercle signature</span><select id="atVarCircleSize"><option value="20"'+(v==='20'?' selected':'')+'>20 cm</option><option value="25"'+(v==='25'?' selected':'')+'>25 cm</option></select></label>';
    if(k==='circleSizeDemi') h+='<label class="field"><span>Diamètre du cercle demi-couronne</span><select id="atVarCircleSizeDemi"><option value="15"'+(v==='15'?' selected':'')+'>15 cm</option><option value="20"'+(v==='20'?' selected':'')+'>20 cm</option><option value="25"'+(v==='25'?' selected':'')+'>25 cm</option></select></label>';
    if(k==='macrameColor') h+='<label class="field"><span>Couleur du fil macramé</span><select id="atVarMacrameColor">'+[['beige','Beige'],['blanc','Blanc'],['vert_sauge','Vert sauge'],['rose','Rose'],['marron','Marron'],['gris_clair','Gris clair'],['violet','Violet']].map(function(o){return '<option value="'+o[0]+'"'+(v===o[0]?' selected':'')+'>'+o[1]+'</option>';}).join('')+'</select></label>';
    if(k==='combSize') h+='<label class="field"><span>Peigne choisi</span><select id="atVarCombSize"><option value="4"'+(v==='4'?' selected':'')+'>4 dents</option><option value="10"'+(v==='10'?' selected':'')+'>10 dents</option></select></label>';
  }); return h;
}
function atelierStockReference(key){ return ATELIER_STOCK_INITIAL.find(function(x){return x.key===key;})||null; }
function atelierStockNorm(v){ return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim(); }
function stockByAtelierKey(key){
  var items=state.stockItems||[];
  var linked=items.find(function(x){return x.atelierStockKey===key;});
  if(linked) return linked;
  var ref=atelierStockReference(key);
  if(!ref) return null;
  var target=atelierStockNorm(ref.nom);
  return items.find(function(x){return atelierStockNorm(x.nom)===target;})||null;
}
function atelierStockForSimulation(key){
  var actual=stockByAtelierKey(key);
  if(actual) return {item:actual,isFallback:false};
  var ref=atelierStockReference(key);
  return ref?{item:ref,isFallback:true}:null;
}
function atelierVariantLabels(key){
  var maps={
    supportColor:{blanc:"Toile blanche",noir:"Toile noire"},
    strawColor:{rose:"Pailles roses",violet:"Pailles violettes",vert:"Pailles vertes",jaune:"Pailles jaunes"},
    circleSize:{"20":"Cercle 20 cm","25":"Cercle 25 cm"},
    circleSizeDemi:{"15":"Cercle 15 cm","20":"Cercle 20 cm","25":"Cercle 25 cm"},
    macrameColor:{beige:"Macramé beige",blanc:"Macramé blanc",vert_sauge:"Macramé vert sauge",rose:"Macramé rose",marron:"Macramé marron",gris_clair:"Macramé gris clair",violet:"Macramé violet"},
    combSize:{"4":"Peigne 4 dents","10":"Peigne 10 dents"}
  };
  return maps[key]||{};
}
function defaultAtelierRecipeLines(model){
  var out=[];
  (model&&model.materials||[]).forEach(function(m,idx){
    if(m.variantKey&&m.map){
      Object.keys(m.map).forEach(function(v){
        out.push({id:"preset_"+model.id+"_"+idx+"_"+v,stockItemId:"",stockKey:m.map[v],qtyPerPerson:Number(m.qty)||0,conditionKey:m.variantKey,conditionValue:v,label:m.label||"Matériel"});
      });
    }else{
      out.push({id:"preset_"+model.id+"_"+idx,stockItemId:"",stockKey:m.key||"",qtyPerPerson:Number(m.qty)||0,conditionKey:"",conditionValue:"",label:m.label||"Matériel"});
    }
  });
  return out;
}
function ensureAtelierRecipeSettings(){
  state.settings=state.settings||{};
  if(!state.settings.atelierRecipes || typeof state.settings.atelierRecipes!=="object" || Array.isArray(state.settings.atelierRecipes)) state.settings.atelierRecipes={};
  ATELIER_MODELES.forEach(function(model){
    if(!Array.isArray(state.settings.atelierRecipes[model.id])) state.settings.atelierRecipes[model.id]=defaultAtelierRecipeLines(model);
  });
  return state.settings.atelierRecipes;
}
function atelierRecipeLines(modelId){
  var recipes=ensureAtelierRecipeSettings();
  return recipes[modelId]||[];
}
function atelierRecipeConditionMatches(a,line){
  if(!line.conditionKey) return true;
  return atelierVariantValue(a,line.conditionKey)===String(line.conditionValue||"");
}
function atelierRecipeLineStock(line){
  if(line.stockItemId){
    var actual=(state.stockItems||[]).find(function(x){return x.id===line.stockItemId;});
    if(actual) return {item:actual,isFallback:false};
  }
  return line.stockKey?atelierStockForSimulation(line.stockKey):null;
}
function atelierRecipe(a){
  var model=atelierModeleById(a&&a.atelierModeleId); if(!model) return [];
  var n=Math.max(0,atelierParticipantsCount(a)), grouped={};
  atelierRecipeLines(model.id).filter(function(line){return atelierRecipeConditionMatches(a,line);}).forEach(function(line){
    var sim=atelierRecipeLineStock(line), item=sim&&sim.item;
    var key=line.stockItemId?("item:"+line.stockItemId):(line.stockKey?("key:"+line.stockKey):("line:"+line.id));
    var qty=r2((Number(line.qtyPerPerson)||0)*n); if(qty<=0) return;
    if(!grouped[key]) grouped[key]={key:line.stockKey||"",stockItemId:line.stockItemId||"",label:(item&&item.nom)||line.label||"Matériel",qty:0,item:item||null,isFallback:!!(sim&&sim.isFallback)};
    grouped[key].qty=r2(grouped[key].qty+qty);
  });
  return Object.keys(grouped).map(function(k){return grouped[k];});
}
function atelierRecipePreview(a){
  var recipe=atelierRecipe(a), model=atelierModeleById(a&&a.atelierModeleId); if(!model) return '';
  var h='<div class="card" style="background:var(--cream);"><div class="flexb"><h3 style="margin:0;">📦 Simulation du matériel</h3><span class="pill" style="background:var(--blush-s);color:var(--bordeaux);">'+atelierParticipantsCount(a)+' personne(s)</span></div>'+ 
    '<p class="muted" style="margin:8px 0 10px;">Recette utilisée : <b>'+esc(model.label)+'</b>. Elle peut être modifiée dans <b>Stock → Recettes matériel des ateliers</b>. Aucune quantité n’est retirée dans cette version TEST.</p>';
  if(!recipe.length) return h+'<p class="muted">Aucun matériel n’est associé à cet atelier. Configure sa recette depuis l’onglet Stock.</p></div>';
  recipe.forEach(function(r){
    var it=r.item, available=it?Number(it.quantite)||0:null;
    var after=available===null?null:r2(available-r.qty), ok=available!==null&&after>=0;
    var unit=it?esc(it.unite||'pièce'):'pièce';
    var detail='Besoin : '+r.qty+' '+unit;
    if(it){ detail+=' · Stock : '+r2(available)+' → '+r2(after); if(r.isFallback) detail+=' (inventaire communiqué, non associé à une fiche stock)'; }
    else detail+=' · Article absent ou supprimé du stock';
    h+='<div class="checkrow"><div style="flex:1;"><b>'+esc(r.label)+'</b><div class="muted">'+detail+'</div></div>'+ 
      '<span class="badge" style="background:'+(ok?'#e7eee8':'#ffe1d8')+';color:'+(ok?'#384640':'#8a2d1b')+';">'+(ok?'Suffisant':'À compléter')+'</span></div>';
  });
  h+='<div class="summary" style="margin:12px 0 0;"><b>🧪 Mode simulation actif</b><div class="muted" style="margin-top:4px;">Les recettes sont enregistrées dans les paramètres, mais les quantités du stock réel ne sont jamais modifiées. Le futur bouton « Préparer le matériel » restera soumis à confirmation.</div></div>';
  return h+'</div>';
}
function atelierRecipeConditionValue(line){ return line.conditionKey?(line.conditionKey+'='+String(line.conditionValue||'')):'always'; }
function atelierRecipeConditionOptions(model,line){
  var selected=atelierRecipeConditionValue(line), opts=[['always','Toujours utilisé']];
  (model&&model.variants||[]).forEach(function(k){
    var labels=atelierVariantLabels(k);
    Object.keys(labels).forEach(function(v){opts.push([k+'='+v,'Seulement si : '+labels[v]]);});
  });
  return opts.map(function(o){return '<option value="'+esc(o[0])+'"'+(selected===o[0]?' selected':'')+'>'+esc(o[1])+'</option>';}).join('');
}
function atelierRecipeStockOptions(line){
  var actualFromKey=line.stockKey?stockByAtelierKey(line.stockKey):null;
  var selected=line.stockItemId?('item:'+line.stockItemId):(actualFromKey?('item:'+actualFromKey.id):(line.stockKey?('legacy:'+line.stockKey):''));
  var opts='<option value="">— Choisir dans le stock —</option>';
  if(line.stockKey){
    var ref=atelierStockReference(line.stockKey), actual=actualFromKey;
    if(!actual) opts+='<option value="legacy:'+esc(line.stockKey)+'"'+(selected==='legacy:'+line.stockKey?' selected':'')+'>⚠ '+esc((ref&&ref.nom)||line.label||line.stockKey)+' — référence non associée</option>';
  }
  (state.stockItems||[]).slice().sort(function(a,b){return (a.nom||'').localeCompare(b.nom||'');}).forEach(function(it){
    opts+='<option value="item:'+esc(it.id)+'"'+(selected==='item:'+it.id?' selected':'')+'>'+esc(it.nom||'Article')+' · '+r2(Number(it.quantite)||0)+' '+esc(it.unite||'')+'</option>';
  });
  return opts;
}
function captureAtelierRecipeEditor(showErrors){
  var modelId=ui.stockRecipeModel; if(!modelId) return true;
  var rows=document.querySelectorAll('[data-recipe-row]'), lines=[], valid=true;
  rows.forEach(function(row){
    var id=row.getAttribute('data-recipe-row')||uid();
    var stock=row.querySelector('[data-recipe-stock]'), qty=row.querySelector('[data-recipe-qty]'), cond=row.querySelector('[data-recipe-condition]');
    var sv=stock?stock.value:'', q=qty?num(qty.value):0, cv=cond?cond.value:'always';
    if(!sv || q<=0){valid=false; return;}
    var line={id:id,stockItemId:'',stockKey:'',qtyPerPerson:r2(q),conditionKey:'',conditionValue:'',label:''};
    if(sv.indexOf('item:')===0) line.stockItemId=sv.slice(5);
    if(sv.indexOf('legacy:')===0) line.stockKey=sv.slice(7);
    if(cv!=='always'&&cv.indexOf('=')>0){ var p=cv.split('='); line.conditionKey=p.shift(); line.conditionValue=p.join('='); }
    var item=line.stockItemId&&(state.stockItems||[]).find(function(x){return x.id===line.stockItemId;});
    var ref=line.stockKey&&atelierStockReference(line.stockKey); line.label=(item&&item.nom)||(ref&&ref.nom)||'Matériel';
    lines.push(line);
  });
  if(!valid){ if(showErrors) toast('Chaque ligne doit avoir un article de stock et une quantité supérieure à 0.'); return false; }
  ensureAtelierRecipeSettings()[modelId]=lines;
  return true;
}
function atelierRecipeLinksForStockItem(item){
  if(!item) return [];
  var out=[], recipes=ensureAtelierRecipeSettings();
  ATELIER_MODELES.forEach(function(model){
    (recipes[model.id]||[]).forEach(function(line){
      var resolved=!line.stockItemId&&line.stockKey?stockByAtelierKey(line.stockKey):null;
      var match=line.stockItemId===item.id || (!!resolved&&resolved.id===item.id);
      if(match) out.push({model:model,line:line});
    });
  });
  return out;
}
function viewAtelierRecipeManager(){
  ensureAtelierRecipeSettings();
  if(!ui.stockRecipeModel || !atelierModeleById(ui.stockRecipeModel)) ui.stockRecipeModel=ATELIER_MODELES[0]?ATELIER_MODELES[0].id:'';
  var model=atelierModeleById(ui.stockRecipeModel), lines=model?atelierRecipeLines(model.id):[];
  var html='<div class="card" id="atelierRecipeManager"><div class="flexb" style="align-items:flex-start;"><div><h3 style="margin:0;">🧰 Recettes matériel des ateliers</h3><p class="muted" style="margin:5px 0 0;">Définis ici le matériel consommé <b>pour une personne</b>. Un même article peut être utilisé dans plusieurs ateliers. Tu peux ajouter à tout moment une décoration de Noël ou une nouvelle fourniture.</p></div><span class="badge" style="background:var(--blush-s);color:var(--bordeaux);">Simulation uniquement</span></div>'+ 
    '<label class="field" style="margin-top:14px;"><span>Atelier à configurer</span><select data-action="stock-recipe-model-change">'+ATELIER_MODELES.map(function(m){return '<option value="'+esc(m.id)+'"'+(m.id===ui.stockRecipeModel?' selected':'')+'>'+esc(m.label)+' · '+m.modes.map(atelierModeLabel).join(' / ')+'</option>';}).join('')+'</select></label>';
  if(!state.stockItems.length) html+='<div class="summary"><b>Commence par ajouter tes articles dans le stock.</b><div class="muted">Ils apparaîtront ensuite dans les listes ci-dessous.</div></div>';
  if(!lines.length) html+='<p class="muted">Aucune fourniture configurée pour cet atelier.</p>';
  lines.forEach(function(line){
    html+='<div class="checkrow" data-recipe-row="'+esc(line.id)+'" style="align-items:flex-end;gap:8px;flex-wrap:wrap;">'+
      '<div style="flex:2;min-width:240px;"><label class="field" style="margin:0;"><span>Article du stock</span><select data-recipe-stock>'+atelierRecipeStockOptions(line)+'</select></label></div>'+ 
      '<div style="flex:0 0 145px;"><label class="field" style="margin:0;"><span>Quantité / personne</span><input data-recipe-qty type="number" min="0.01" step="0.01" value="'+esc(line.qtyPerPerson||1)+'"></label></div>'+ 
      '<div style="flex:1;min-width:220px;"><label class="field" style="margin:0;"><span>Condition</span><select data-recipe-condition>'+atelierRecipeConditionOptions(model,line)+'</select></label></div>'+ 
      '<button class="btn small danger" type="button" data-action="stock-recipe-remove-'+esc(line.id)+'">Retirer</button></div>';
  });
  html+='<div class="row-actions"><button class="btn soft" type="button" data-action="stock-recipe-add">+ Ajouter du matériel</button><button class="btn primary" type="button" data-action="stock-recipe-save">Enregistrer la recette</button><button class="btn ghost" type="button" data-action="stock-recipe-reset">Rétablir la recette initiale</button></div>'+ 
    '<div class="summary" style="margin:12px 0 0;"><b>Exemple</b><div class="muted">Pour ajouter une décoration de Noël au Photophore adulte : crée d’abord l’article dans le stock, sélectionne « Photophore adulte », clique sur « Ajouter du matériel », choisis l’article et indique la quantité utilisée par personne.</div></div></div>';
  return html;
}
function atelierApplyStock(a){
  return {ok:true,changed:false,simulation:true,message:'Mode simulation : le stock réel n’a pas été modifié.'};
}
function importAtelierInitialStock(){
  state.stockItems=state.stockItems||[]; var added=0,linked=0;
  ATELIER_STOCK_INITIAL.forEach(function(src){ var found=stockByAtelierKey(src.key); if(found) return; var norm=function(v){return String(v||'').toLowerCase().replace(/[^a-z0-9àâäéèêëîïôöùûüç]+/g,' ').trim();}; found=state.stockItems.find(function(x){return norm(x.nom)===norm(src.nom);}); if(found){found.atelierStockKey=src.key; linked++; return;} var it={id:uid(),createdAt:new Date().toISOString(),notes:'Référence ateliers — stock initial communiqué',atelierStockKey:src.key}; Object.keys(src).forEach(function(k){if(k!=='key') it[k]=src[k];}); state.stockItems.unshift(it); added++; });
  saveCache(); render(); toast('Stock ateliers importé : '+added+' référence(s) ajoutée(s), '+linked+' associée(s).');
}

var ATELIER_STATUTS={booke:"Booké",preparation:"En préparation",termine:"Terminé",annule:"Annulé"};


/* ===================== Documents ateliers structure / privé ===================== */
function atelierLinkedDevis(a){
  if(!a) return null;
  if(a.devisId){
    var d=findDevis(a.devisId);
    if(d) return d;
  }
  if(a.devisNumero){
    var byNum=(state.devis||[]).find(function(d){return d.numero===a.devisNumero;});
    if(byNum) return byNum;
  }
  return (state.devis||[]).find(function(d){return d.origine==="atelier" && d.atelierId===a.id;}) || null;
}
function atelierFacturesLiees(a){
  if(!a) return [];
  var d=atelierLinkedDevis(a);
  var factureIds=a.factureIds||[];
  var devisIds=[];
  var devisNumeros=[];
  if(d){
    if(d.id) devisIds.push(d.id);
    if(d.numero) devisNumeros.push(d.numero);
  }
  if(a.devisId) devisIds.push(a.devisId);
  if(a.devisNumero) devisNumeros.push(a.devisNumero);
  return (state.factures||[]).filter(function(f){
    return (f.origine==="atelier" && f.atelierId===a.id) ||
      (f.atelierId && f.atelierId===a.id) ||
      (f.devisId && devisIds.indexOf(f.devisId)>=0) ||
      (f.devisNumero && devisNumeros.indexOf(f.devisNumero)>=0) ||
      (factureIds.indexOf(f.id)>=0);
  });
}
function atelierClientForDoc(a){
  var mode=atelierMode(a);
  var nom="";
  if(mode==="structure") nom=a.structureNom || a.organisatrice || "Structure";
  else nom=a.organisatrice || "Atelier privé";
  var client={
    nom:nom,
    adresse:a.lieu||"",
    email:a.contactEmail||"",
    tel:a.contactTel||"",
    canal:""
  };
  var key=normName(client.nom);
  if(key){
    var existing=(state.clients||[]).find(function(c){return normName(c.nom)===key;});
    if(existing){
      if(!existing.email && client.email) existing.email=client.email;
      if(!existing.tel && client.tel) existing.tel=client.tel;
      if(!existing.adresse && client.adresse) existing.adresse=client.adresse;
      return existing;
    }
    var created=Object.assign({id:uid(),anniversaire:"",notes:""},client);
    state.clients=state.clients||[];
    state.clients.push(created);
    return created;
  }
  return client;
}
function prestationBibliothequeNormalisee(){
  var base = (state.settings && Array.isArray(state.settings.prestationsBibliotheque) && state.settings.prestationsBibliotheque.length)
    ? state.settings.prestationsBibliotheque
    : DEFAULT_PRESTATIONS_BIBLIOTHEQUE;
  return base.map(function(p,i){
    var type=(p.type==="bien"||p.urssafType==="bien")?"bien":"service";
    return {
      id:p.id||("prest_"+i+"_"+uid()),
      label:String(p.label||p.designation||p.libelle||"").trim()||"Prestation",
      type:type,
      urssafType:type,
      qte:num(p.qte!=null?p.qte:1)||1,
      prix:num(p.prix!=null?p.prix:p.prixUnitaire),
      actif:p.actif!==false
    };
  });
}
function prestationsActives(){
  var list=prestationBibliothequeNormalisee().filter(function(p){ return p.actif; });
  return list.length?list:DEFAULT_PRESTATIONS_BIBLIOTHEQUE.map(function(p){ return Object.assign({},p); });
}
function atelierPrestationTypeOptions(selected){
  selected=selected||"service";
  return '<option value="service"'+(selected==="service"?' selected':'')+'>Prestation de services</option>'+ 
    '<option value="bien"'+(selected==="bien"?' selected':'')+'>Vente de biens</option>';
}
function atelierPrestations(a){
  return ((a&&a.prestationsComplementaires)||[]).map(function(l){
    var q=num(l.qte!=null?l.qte:(l.quantite!=null?l.quantite:1));
    if(!q) q=1;
    return {
      id:l.id||uid(),
      designation:String(l.designation||l.libelle||"").trim(),
      type:l.type==="bien"?"bien":"service",
      urssafType:l.urssafType||l.categorieUrssaf||(l.type==="bien"?"bien":"service"),
      qte:q,
      prix:num(l.prix!=null?l.prix:l.prixUnitaire)
    };
  }).filter(function(l){ return l.designation || l.prix>0; });
}
function atelierPrestationsTotal(a){
  return r2(atelierPrestations(a).reduce(function(s,l){return s+(num(l.qte)*num(l.prix));},0));
}
function atelierBaseDocMontant(a){
  var mode=atelierMode(a);
  if(mode==="structure") return Number(a.montantPrestation)||0;
  if(mode==="prive") return Number(a.montantForfait)||0;
  var parts=(a&&a.participants)||[];
  return parts.reduce(function(s,p){return s+(Number(p.montant)||0);},0);
}
function atelierDocLignes(a){
  var lignes=[];
  var base=atelierBaseDocMontant(a);
  if(base>0){
    lignes.push({id:uid(), designation:atelierDocDesignation(a), type:"service", qte:1, prix:r2(base)});
  }
  atelierPrestations(a).forEach(function(l){
    lignes.push({id:uid(), designation:l.designation||"Prestation complémentaire", type:l.type, urssafType:l.type, qte:l.qte||1, prix:r2(l.prix)});
  });
  return lignes;
}
function atelierDocMontant(a){
  return totals(atelierDocLignes(a),state.settings.partService).total;
}
function atelierExtraLinesFromDOM(){
  var rows=document.querySelectorAll('[data-atextra-row]'), out=[];
  rows.forEach(function(row){
    var id=row.getAttribute('data-atextra-row')||uid();
    var designation=(row.querySelector('[data-atextra-field="designation"]')||{}).value||"";
    var qte=num((row.querySelector('[data-atextra-field="qte"]')||{}).value);
    var prix=num((row.querySelector('[data-atextra-field="prix"]')||{}).value);
    var type=(row.querySelector('[data-atextra-type]')||{}).value||"service";
    if(!qte) qte=1;
    if(designation.trim() || prix>0){ out.push({id:id,designation:designation.trim(),type:type==="bien"?"bien":"service",urssafType:type==="bien"?"bien":"service",qte:qte,prix:prix}); }
  });
  return out;
}
function captureAtelierPrestations(a){
  if(!a) return;
  var box=document.getElementById('atExtraBox');
  if(!box) return;
  a.prestationsComplementaires=atelierExtraLinesFromDOM();
}
function refreshAtelierExtraTotalsFromDOM(){
  var box=document.getElementById('atExtraTotal');
  var rows=document.querySelectorAll('[data-atextra-row]');
  var total=0;
  rows.forEach(function(row){
    var qte=num((row.querySelector('[data-atextra-field="qte"]')||{}).value);
    var prix=num((row.querySelector('[data-atextra-field="prix"]')||{}).value);
    if(!qte) qte=1;
    var ligneTotal=r2(qte*prix);
    total+=ligneTotal;
    var cell=row.querySelector('[data-atextra-line-total]');
    if(cell) cell.innerHTML=euro(ligneTotal);
  });
  if(box) box.innerHTML='Total compléments : '+euro(total);
}
function viewAtelierPrestationsComplementaires(a){
  a=a||{};
  var lignes=atelierPrestations(a);
  var total=atelierPrestationsTotal(a);
  var html='<div class="card" id="atExtraBox" style="background:var(--cream);"><div class="flexb"><div><h3 style="margin:0;">Prestations complémentaires à ajouter au devis</h3>'+ 
    '<p class="muted" style="margin:4px 0 0;">Ajoute ici les frais de déplacement, packs premium, personnalisations ou toute ligne libre. Elles seront intégrées au devis atelier avec quantité, prix unitaire et catégorie URSSAF.</p></div>'+ 
    '<span class="chip" id="atExtraTotal">Total compléments : '+euro(total)+'</span></div>';
  var presets=prestationsActives();
  html+='<div class="row-actions" style="margin-top:12px;">'+presets.map(function(p,i){ var prix=p.prix?(' · '+euro(p.prix)):''; return '<button class="btn small soft" data-action="at-extra-add-'+i+'">+ '+esc(p.label)+esc(prix)+'</button>'; }).join('')+'</div>';
  if(!lignes.length){
    html+='<p class="muted" style="margin:12px 0 0;">Aucune prestation complémentaire pour le moment.</p>';
  }else{
    html+='<div class="scroll" style="margin-top:12px;"><table><thead><tr style="text-align:left;color:var(--ink-s);font-size:12px;"><th style="padding:6px;">Libellé</th><th style="padding:6px;">Catégorie URSSAF</th><th style="padding:6px;width:82px;">Qté</th><th style="padding:6px;width:115px;">Prix unit.</th><th style="padding:6px;width:110px;text-align:right;">Total</th><th style="padding:6px;width:40px;"></th></tr></thead><tbody>';
    lignes.forEach(function(l){
      html+='<tr data-atextra-row="'+esc(l.id)+'" style="border-top:1px solid var(--line);">'+
        '<td style="padding:6px;"><input data-atextra-field="designation" value="'+esc(l.designation||'')+'" placeholder="Ex : Frais de déplacement"></td>'+ 
        '<td style="padding:6px;"><select data-atextra-type>'+atelierPrestationTypeOptions(l.type)+'</select></td>'+ 
        '<td style="padding:6px;"><input data-atextra-field="qte" type="number" min="0" step="1" value="'+esc(l.qte||1)+'"></td>'+ 
        '<td style="padding:6px;"><input data-atextra-field="prix" type="number" min="0" step="0.01" value="'+esc(l.prix||0)+'"></td>'+ 
        '<td data-atextra-line-total style="padding:6px;text-align:right;font-weight:700;white-space:nowrap;">'+euro(num(l.qte)*num(l.prix))+'</td>'+ 
        '<td style="padding:6px;text-align:center;"><button data-action="at-extra-del-'+esc(l.id)+'" style="border:none;background:none;color:#9b3b3b;cursor:pointer;font-size:18px;">×</button></td>'+ 
      '</tr>';
    });
    html+='</tbody></table></div>';
  }
  html+='<p class="muted" style="margin:10px 0 0;font-size:12px;">Astuce : choisis “Vente de biens” pour les fournitures ou packs matériels, et “Prestation de services” pour déplacement, animation ou personnalisation.</p></div>';
  return html;
}
function atelierDocDesignation(a){
  var mode=atelierMode(a);
  var parts=[];
  parts.push("Atelier "+atelierModeLabel(mode));
  if(a.type) parts.push(a.type);
  if(a.theme) parts.push(a.theme);
  if(a.date) parts.push(frDate(a.date));
  if(a.lieu) parts.push(a.lieu);
  var nb=atelierParticipantsCount(a);
  if(nb) parts.push(nb+" participant(s)");
  return parts.filter(Boolean).join(" - ");
}
function atelierCreateDevis(a){
  if(!a) return null;
  var existing=atelierLinkedDevis(a);
  if(existing) return existing;
  var lignes=atelierDocLignes(a);
  var montant=totals(lignes,state.settings.partService).total;
  if(montant<=0){ toast("Indique le montant de la prestation ou ajoute une ligne complémentaire avant de créer le devis."); return null; }
  var client=atelierClientForDoc(a);
  var date=todayISO();
  var d={
    id:uid(),
    numero:prochainNumero("devis"),
    date:date,
    validite:addDays(date,state.settings.validiteDevis),
    client:client,
    lignes:lignes,
    notes:"Devis généré depuis la fiche atelier"+(a.date?" du "+frDate(a.date):"")+".",
    statut:"brouillon",
    origine:"atelier",
    atelierId:a.id,
    atelierMode:atelierMode(a),
    atelierType:a.type||"",
    atelierTheme:a.theme||"",
    atelierDate:a.date||""
  };
  state.devis=state.devis||[];
  state.devis.unshift(d);
  a.devisId=d.id;
  a.devisNumero=d.numero;
  return d;
}
function atelierSyncLinkedDevis(a){
  if(!a) return null;
  var d=atelierLinkedDevis(a);
  if(!d){ toast("Aucun devis lié à cet atelier."); return null; }
  var lignes=atelierDocLignes(a);
  var montant=totals(lignes,state.settings.partService).total;
  if(montant<=0){ toast("Indique le montant de la prestation ou ajoute une ligne complémentaire avant de mettre à jour le devis."); return null; }
  d.client=atelierClientForDoc(a);
  d.lignes=lignes;
  d.notes=d.notes||("Devis généré depuis la fiche atelier"+(a.date?" du "+frDate(a.date):"")+".");
  d.origine="atelier";
  d.atelierId=a.id;
  d.atelierMode=atelierMode(a);
  d.atelierType=a.type||"";
  d.atelierTheme=a.theme||"";
  d.atelierDate=a.date||"";
  a.devisId=d.id;
  a.devisNumero=d.numero;
  return d;
}
function atelierCreateFactureFromDevis(a, type){
  if(!a) return null;
  var d=atelierLinkedDevis(a) || atelierCreateDevis(a);
  if(!d) return null;
  var f=null;
  if(type==="acompte"){
    f=creerAcompte(d);
  }else if(type==="solde"){
    f=creerSolde(d);
    if(!f){ toast("Crée d’abord une facture d’acompte."); return null; }
  }else{
    f=creerTotale(d);
  }
  if(f){
    f.origine="atelier";
    f.atelierId=a.id;
    f.atelierMode=atelierMode(a);
    f.atelierType=a.type||"";
    f.atelierTheme=a.theme||"";
    f.atelierDate=a.date||"";
    f.notes=(f.notes?f.notes+" ":"")+"Facture générée depuis la fiche atelier.";
    a.factureIds=a.factureIds||[];
    if(a.factureIds.indexOf(f.id)<0) a.factureIds.push(f.id);
  }
  return f;
}
function viewAtelierDocuments(a){
  var mode=atelierMode(a);
  if(mode==="thematique") return "";
  var d=atelierLinkedDevis(a);
  var fs=atelierFacturesLiees(a);
  var total=atelierDocMontant(a);
  var hasAcompte=fs.some(function(f){return f.type==="acompte";});
  var hasSolde=fs.some(function(f){return f.type==="solde";});
  var hasTotale=fs.some(function(f){return f.type==="totale";});
  var html='<div class="card"><div class="flexb"><div><h3 style="margin:0;">Devis & facture atelier</h3><p class="muted" style="margin:4px 0 0;">Pour les ateliers privés et structures, crée les documents directement depuis cette fiche.</p></div><span class="chip">Montant : '+euro(total)+'</span></div>';

  if(!d){
    html+='<div class="row-actions"><button class="btn primary" data-action="at-doc-devis-create">Créer le devis atelier</button></div>';
  }else{
    html+='<div class="checkrow" style="align-items:flex-start;"><div style="flex:1;"><b style="color:var(--bordeaux);">Devis '+esc(d.numero)+'</b>'+
      '<div class="muted" style="font-size:12px;">Client : '+esc((d.client&&d.client.nom)||"")+' · Total : '+euro(totals(d.lignes||[],state.settings.partService).total)+' · Statut : '+esc((ST_DEVIS[d.statut]||ST_DEVIS.brouillon).l)+'</div></div>'+
      '<div class="row-actions" style="margin-top:0;justify-content:flex-end;">'+
        '<button class="btn small ghost" data-action="at-doc-devis-sync">Mettre à jour le devis</button>'+
        '<button class="btn small soft" data-action="at-doc-devis-preview">Aperçu / PDF</button>'+
        '<button class="btn small primary" data-action="at-doc-devis-email">Envoyer devis</button>'+
      '</div></div>';

    html+='<div class="row-actions">'+
      (!hasAcompte&&!hasTotale?'<button class="btn gold" data-action="at-doc-fac-acompte">Créer facture acompte</button>':'')+
      (hasAcompte&&!hasSolde&&!hasTotale?'<button class="btn soft" data-action="at-doc-fac-solde">Créer facture solde</button>':'')+
      (!hasAcompte&&!hasTotale?'<button class="btn primary" data-action="at-doc-fac-totale">Créer facture totale</button>':'')+
    '</div>';

    if(fs.length){
      html+='<div style="margin-top:10px;">';
      fs.forEach(function(f){
        html+='<div class="checkrow" style="align-items:flex-start;"><div style="flex:1;"><b>Facture '+esc(f.numero)+'</b>'+
          '<div class="muted" style="font-size:12px;">'+esc(TYPE_FAC[f.type]||"Facture")+' · '+euro(f.montant||0)+' · '+(f.statut==="payee"?"Payée":(f.statut==="envoyee"?"Envoyée":"À envoyer"))+(f.paiementClient?' · '+esc(f.paiementClient):'')+'</div></div>'+
          '<div class="row-actions" style="margin-top:0;justify-content:flex-end;">'+
            '<button class="btn small soft" data-action="at-doc-fac-preview-'+f.id+'">Aperçu / PDF</button>'+
            '<button class="btn small primary" data-action="at-doc-fac-email-'+f.id+'">Envoyer facture</button>'+
          '</div></div>';
      });
      html+='</div>';
    }
  }
  html+='</div>';
  return html;
}

function atelierMode(a){
  return (a&&a.modeAtelier)||"thematique";
}
function atelierModeLabel(mode){
  return mode==="structure"?"Structure":(mode==="prive"?"Atelier privé":"Atelier thématique site");
}
function atelierModeOptions(selected){
  selected=selected||"thematique";
  return '<option value="thematique"'+(selected==="thematique"?' selected':'')+'>Atelier thématique site — réservation par place</option>'+
    '<option value="structure"'+(selected==="structure"?' selected':'')+'>Atelier en structure — prestation forfaitaire</option>'+
    '<option value="prive"'+(selected==="prive"?' selected':'')+'>Atelier privé — nombre d’invités défini</option>';
}
function atelierModeHelp(mode){
  if(mode==="structure") return "Atelier organisé avec une structure : tu notes l’organisatrice, le lieu et le montant de la prestation. Le nombre de participants n’impacte pas le prix.";
  if(mode==="prive") return "Atelier privé chez une cliente : tu notes l’organisatrice, le nombre de personnes prévues et le montant forfaitaire défini.";
  return "Atelier thématique proposé sur le site : chaque personne réserve sa place, via Squarespace ou ajout manuel.";
}
function atelierParticipantsCount(a){
  var mode=atelierMode(a);
  if(mode==="prive") return Number(a.nbPersonnes)||0;
  if(mode==="structure") return Number(a.nbParticipantsPrevu)||0;
  return ((a&&a.participants)||[]).length;
}


function atelierTypeOptions(selected){
  selected=selected||"";
  var opts=ATELIER_TYPES.slice();
  if(selected && opts.indexOf(selected)<0) opts.unshift(selected);
  return '<option value=""'+(!selected?' selected':'')+'></option>'+
    opts.map(function(t){return '<option value="'+esc(t)+'"'+(selected===t?' selected':'')+'>'+esc(t)+'</option>';}).join("");
}
function atelierStatutOptions(selected){
  selected=selected||"booke";
  return Object.keys(ATELIER_STATUTS).map(function(k){return '<option value="'+esc(k)+'"'+(selected===k?' selected':'')+'>'+esc(ATELIER_STATUTS[k])+'</option>';}).join("");
}
function getAtelier(id){ return (state.ateliers||[]).find(function(a){return a.id===id;}); }
function newAtelier(){
  var a={id:uid(),modeAtelier:"thematique",date:todayISO(),heure:"",lieu:"",theme:"À compléter",type:"EVJF",
    organisatrice:"",structureNom:"",contactEmail:"",contactTel:"",
    nbPersonnes:0,nbParticipantsPrevu:0,montantForfait:0,montantPrestation:0,
    prestationsComplementaires:[],atelierModeleId:"",stockVariants:{supportColor:"blanc",strawColor:"rose",circleSize:"20",circleSizeDemi:"20",macrameColor:"beige",combSize:"4"},stockConsumption:[],
    materiel:"",description:"",statut:"booke",participants:[],createdAt:new Date().toISOString()};
  state.ateliers=state.ateliers||[];
  state.ateliers.unshift(a);
  ui.tab="clientsModule";
  ui.clientsSub="ateliers";
  ui.atelierOpen=a.id;
  saveCache();
  render();
}
function atelierTotals(a){
  var mode=atelierMode(a);
  var parts=(a&&a.participants)||[];
  var participantTotal=parts.reduce(function(s,p){return s+(Number(p.montant)||0);},0);
  var total=participantTotal;
  if(mode==="structure") total=Number(a.montantPrestation)||0;
  if(mode==="prive") total=Number(a.montantForfait)||0;
  if(mode!=="thematique") total+=atelierPrestationsTotal(a);

  // V3.1.1 : pour les ateliers ayant déjà un devis, le total de référence est le devis.
  // Cela évite d'oublier les prestations complémentaires et permet de calculer
  // correctement le reste à facturer après acompte / solde.
  var d=atelierLinkedDevis(a);
  if(d && Array.isArray(d.lignes)){
    total=totals(d.lignes||[],state.settings.partService).total;
  }

  var sitePaye=parts.filter(function(p){return p.source==="site"||p.payeSite||String(p.facturation||"").indexOf("site")===0;}).reduce(function(s,p){return s+(Number(p.payeSiteMontant)||Number(p.montant)||0);},0);
  var siteSolde=parts.filter(function(p){return p.source==="site"||p.payeSite||String(p.facturation||"").indexOf("site")===0;}).reduce(function(s,p){return s+(Number(p.soldeSite)||0);},0);
  var factures=atelierFacturesLiees(a);
  var facture=factures.reduce(function(s,f){return s+(Number(f.montant)||0);},0);
  var paye=r2(sitePaye+factures.filter(function(f){return f.statut==="payee";}).reduce(function(s,f){return s+(Number(f.montant)||0);},0));
  var attente=r2(siteSolde+factures.filter(function(f){return f.statut!=="payee";}).reduce(function(s,f){return s+(Number(f.montant)||0);},0));
  var couvert=r2(facture+sitePaye+siteSolde);
  return {participants:atelierParticipantsCount(a),total:r2(total),facture:r2(facture),sitePaye:r2(sitePaye),siteSolde:r2(siteSolde),couvert:couvert,paye:paye,attente:attente,resteNonFacture:r2(Math.max(0,total-couvert))};
}
function atelierPrevisionTotal(){
  return (state.ateliers||[]).filter(function(a){return a.statut!=="annule";}).reduce(function(s,a){return s+atelierTotals(a).total;},0);
}
function atelierPrevisionNonFacturee(){
  return (state.ateliers||[]).filter(function(a){return a.statut!=="annule";}).reduce(function(s,a){return s+atelierTotals(a).resteNonFacture;},0);
}
function atelierUpcoming(){
  var today=todayISO();
  return (state.ateliers||[]).filter(function(a){return a.date>=today&&a.statut!=="annule"&&a.statut!=="termine";}).sort(function(a,b){return (a.date||"").localeCompare(b.date||"");});
}
function viewAteliers(){
  if(ui.atelierOpen) return viewAtelierDetail(getAtelier(ui.atelierOpen));
  var list=(state.ateliers||[]).slice().sort(function(a,b){return (a.date||"9999").localeCompare(b.date||"9999");});
  var prevision=atelierPrevisionTotal(), nonFacture=atelierPrevisionNonFacturee();
  var totalParticipants=list.reduce(function(s,a){return s+atelierParticipantsCount(a);},0);
  var html='<div class="flexb" style="margin-bottom:14px;"><h2 style="margin:0;">Ateliers</h2><button class="btn primary" data-action="at-new">+ Nouvel atelier</button></div>'+
    '<p class="muted" style="margin-top:-6px;">Distingue les ateliers en structure, les ateliers thématiques vendus sur le site et les ateliers privés.</p>'+
    '<div class="grid-stats">'+
      stat("Ateliers à venir",atelierUpcoming().length,false)+
      stat("Prévisionnel ateliers",euro(prevision),false)+
      stat("À facturer",euro(nonFacture),false)+
      stat("Participants / invités",totalParticipants,false)+
    '</div>';
  if(!list.length) return html+'<div class="card"><p class="muted" style="margin:0;">Aucun atelier enregistré pour le moment.</p></div>';
  list.forEach(function(a){
    var mode=atelierMode(a), t=atelierTotals(a), st=ATELIER_STATUTS[a.statut]||a.statut||"Booké";
    var contact=a.organisatrice||a.structureNom||"";
    html+='<div class="card"><div class="flexb"><div><b style="color:var(--bordeaux);font-size:16px;">'+esc(atelierModeLabel(mode))+' · '+esc(a.theme||"À compléter")+'</b>'+
      '<div class="muted">'+(a.date?frDate(a.date):"Date à définir")+(a.heure?' · '+esc(a.heure):'')+(a.lieu?' · '+esc(a.lieu):'')+(contact?' · '+esc(contact):'')+'</div></div>'+
      '<span class="pill" style="background:var(--blush-s);color:var(--bordeaux);">'+esc(st)+'</span></div>'+
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">'+
        '<span class="chip">🏷️ '+esc(atelierModeLabel(mode))+'</span>'+
        '<span class="chip">👥 '+t.participants+' '+(mode==="thematique"?'participant(s)':'personne(s) prévue(s)')+'</span>'+
        '<span class="chip">Prévu : '+euro(t.total)+'</span>'+
        '<span class="chip">Facturé : '+euro(t.facture)+'</span>'+
        (mode==="thematique"?'<span class="chip">Site : '+euro(t.sitePaye||0)+'</span><span class="chip">Solde jour J : '+euro(t.siteSolde||0)+'</span>':'')+
        '<span class="chip">À facturer : '+euro(t.resteNonFacture)+'</span>'+
      '</div>'+
      '<div class="row-actions"><button class="btn small gold" data-action="at-open-'+a.id+'">Ouvrir / compléter</button><button class="btn small danger" data-action="at-del-'+a.id+'">Supprimer</button></div></div>';
  });
  return html;
}
function captureAtelier(a){
  if(!a) return;
  a.modeAtelier=val("atModeAtelier")||a.modeAtelier||"thematique";
  a.date=val("atDate")||"";
  a.heure=val("atHeure")||"";
  a.lieu=val("atLieu")||"";
  a.theme=val("atTheme")||"";
  var typeCustom=(val("atTypeCustom")||"").trim();
  a.type=typeCustom || val("atType") || "";
  a.statut=val("atStatut")||"booke";
  a.organisatrice=val("atOrganisatrice")||"";
  a.structureNom=val("atStructureNom")||"";
  a.contactEmail=val("atContactEmail")||"";
  a.contactTel=val("atContactTel")||"";
  a.nbPersonnes=num(val("atNbPersonnes"));
  a.nbParticipantsPrevu=num(val("atNbParticipantsPrevu"));
  a.montantForfait=num(val("atMontantForfait"));
  a.montantPrestation=num(val("atMontantPrestation"));
  a.atelierModeleId=val("atAtelierModele")||"";
  a.stockVariants=a.stockVariants||{};
  if(document.getElementById("atVarSupportColor")) a.stockVariants.supportColor=val("atVarSupportColor");
  if(document.getElementById("atVarStrawColor")) a.stockVariants.strawColor=val("atVarStrawColor");
  if(document.getElementById("atVarCircleSize")) a.stockVariants.circleSize=val("atVarCircleSize");
  if(document.getElementById("atVarCircleSizeDemi")) a.stockVariants.circleSizeDemi=val("atVarCircleSizeDemi");
  if(document.getElementById("atVarMacrameColor")) a.stockVariants.macrameColor=val("atVarMacrameColor");
  if(document.getElementById("atVarCombSize")) a.stockVariants.combSize=val("atVarCombSize");
  captureAtelierPrestations(a);
  a.materiel=val("atMateriel")||"";
  a.description=val("atDescription")||"";
}
function viewAtelierDetail(a){
  if(!a){ ui.atelierOpen=null; return viewAteliers(); }
  a.participants=a.participants||[];
  a.modeAtelier=a.modeAtelier||"thematique";
  var mode=atelierMode(a), t=atelierTotals(a);
  var html='<div class="card"><div class="flexb" style="margin-bottom:10px;"><h2 style="margin:0;">Atelier · '+esc(atelierModeLabel(mode))+'</h2><button class="btn small ghost" data-action="at-back">← Liste</button></div>'+
    '<p class="muted" style="margin-top:0;">'+esc(atelierModeHelp(mode))+'</p>'+
    '<div class="grid-stats">'+
      stat("Budget prévu",euro(t.total),false)+
      stat("Déjà facturé",euro(t.facture),false)+
      (mode==="thematique"?stat("Payé site internet",euro(t.sitePaye||0),false):'')+
      (mode==="thematique"?stat("Soldes jour J",euro(t.siteSolde||0),false):'')+
      stat("À encaisser",euro(t.attente),false)+
      stat("À facturer",euro(t.resteNonFacture),false)+
    '</div>'+
    '<label class="field"><span>Catégorie d’atelier</span><select id="atModeAtelier" data-action="at-mode-change">'+atelierModeOptions(mode)+'</select></label>'+
    '<div class="inline"><div><label class="field"><span>Date</span><input id="atDate" type="date" value="'+esc(a.date||"")+'"></label></div>'+
    '<div><label class="field"><span>Heure</span><input id="atHeure" value="'+esc(a.heure||"")+'" placeholder="Ex : 14h-16h"></label></div></div>'+
    '<div class="inline"><div><label class="field"><span>Lieu</span><input id="atLieu" value="'+esc(a.lieu||"")+'" placeholder="Ex : La Barjo Onnaing"></label></div>'+
    '<div><label class="field"><span>Thème</span><select id="atType">'+atelierTypeOptions(a.type)+'</select><div class="hint">Choisis un thème existant ou indique un thème libre ci-dessous.</div></label></div></div>'+
    '<div class="inline"><div><label class="field"><span>Thème libre</span><input id="atTypeCustom" value="'+esc((a.type&&ATELIER_TYPES.indexOf(a.type)<0)?a.type:"")+'" placeholder="Ex : Fête des mères, Halloween, Baby shower…"></label></div>'+
    '<div><label class="field"><span>Nom / détails du thème</span><input id="atTheme" value="'+esc(a.theme||"")+'" placeholder="Ex : Couronne florale pastel, Bridgerton…"></label></div></div>'+
    '<div class="card" style="background:var(--cream);"><h3 style="margin-top:0;">🧰 Modèle d’atelier et simulation du stock</h3><label class="field"><span>Type d’atelier réalisé</span><select id="atAtelierModele" data-action="at-stock-config-change">'+atelierModeleOptions(a.atelierModeleId,mode)+'</select><div class="hint">La liste est filtrée selon Structure / Privé. Le matériel est calculé par personne, sans décompte réel dans cette version TEST.</div></label>'+atelierVariantFields(a,atelierModeleById(a.atelierModeleId))+'</div>'+
    '<label class="field"><span>Statut</span><select id="atStatut">'+atelierStatutOptions(a.statut)+'</select></label>';

  if(mode==="structure"){
    html+='<div class="card" style="background:var(--cream);"><h3 style="margin-top:0;">Atelier en structure</h3>'+
      '<p class="muted">Tu es payée à la prestation, peu importe le nombre de participants.</p>'+
      '<div class="inline"><div><label class="field"><span>Nom de la structure</span><input id="atStructureNom" value="'+esc(a.structureNom||"")+'" placeholder="Médiathèque, EHPAD, CCAS…"></label></div>'+
      '<div><label class="field"><span>Organisatrice / référente</span><input id="atOrganisatrice" value="'+esc(a.organisatrice||"")+'"></label></div></div>'+
      '<div class="inline"><div><label class="field"><span>Email référente</span><input id="atContactEmail" type="email" value="'+esc(a.contactEmail||"")+'"></label></div>'+
      '<div><label class="field"><span>Téléphone référente</span><input id="atContactTel" value="'+esc(a.contactTel||"")+'"></label></div></div>'+
      '<div class="inline"><div><label class="field"><span>Nombre de participants prévu</span><input id="atNbParticipantsPrevu" type="number" min="0" value="'+esc(a.nbParticipantsPrevu||"")+'"></label></div>'+
      '<div><label class="field"><span>Montant de la prestation (€)</span><input id="atMontantPrestation" type="number" min="0" step="0.01" value="'+esc(a.montantPrestation||"")+'"></label></div></div>'+
      '</div>';
  }else if(mode==="prive"){
    html+='<div class="card" style="background:var(--cream);"><h3 style="margin-top:0;">Atelier privé</h3>'+
      '<p class="muted">Une cliente organise chez elle et invite un nombre de personnes défini. Tu n’as pas besoin de l’identité de chaque participante.</p>'+
      '<div class="inline"><div><label class="field"><span>Cliente organisatrice</span><input id="atOrganisatrice" value="'+esc(a.organisatrice||"")+'"></label></div>'+
      '<div><label class="field"><span>Téléphone</span><input id="atContactTel" value="'+esc(a.contactTel||"")+'"></label></div></div>'+
      '<label class="field"><span>Email</span><input id="atContactEmail" type="email" value="'+esc(a.contactEmail||"")+'"></label>'+
      '<div class="inline"><div><label class="field"><span>Nombre de personnes prévu</span><input id="atNbPersonnes" type="number" min="0" value="'+esc(a.nbPersonnes||"")+'"></label></div>'+
      '<div><label class="field"><span>Montant forfaitaire défini (€)</span><input id="atMontantForfait" type="number" min="0" step="0.01" value="'+esc(a.montantForfait||"")+'"></label></div></div>'+
      '</div>';
  }

  if(mode!=="thematique"){
    html+=viewAtelierPrestationsComplementaires(a);
    html+=viewAtelierDocuments(a);
  }

  html+=atelierRecipePreview(a);

  html+='<label class="field"><span>Matériel nécessaire complémentaire</span><textarea id="atMateriel" placeholder="Fleurs, cercles, fil de fer, pistolets à colle, rubans…">'+esc(a.materiel||"")+'</textarea></label>'+
    '<label class="field"><span>Description / mémo</span><textarea id="atDescription" placeholder="Infos organisation, demandes particulières, déroulé de l’atelier…">'+esc(a.description||"")+'</textarea></label>'+
    '<div class="row-actions"><button class="btn primary" data-action="at-save">Enregistrer l’atelier</button></div></div>';

  if(mode==="thematique"){
    html+='<div class="card"><h3 style="margin-top:0;">Ajouter une participante</h3>'+
      '<p class="muted" style="margin-top:0;">Pour les ateliers thématiques du site, les participantes peuvent aussi être ajoutées automatiquement depuis Ventes site internet.</p>'+
      '<div class="inline"><div><label class="field"><span>Nom cliente</span><input id="atPNom" placeholder="Nom de la participante / cliente"></label></div>'+
      '<div><label class="field"><span>Email</span><input id="atPEmail" type="email"></label></div></div>'+
      '<div class="inline"><div><label class="field"><span>Téléphone</span><input id="atPTel"></label></div>'+
      '<div><label class="field"><span>Prestation choisie</span><input id="atPPrestation" placeholder="Ex : demi-couronne, couronne tête…"></label></div></div>'+
      '<div class="inline"><div><label class="field"><span>Montant total (€)</span><input id="atPMontant" type="number" min="0" step="0.01"></label></div>'+
      '<div><label class="field"><span>Facture à créer</span><select id="atPFacturation"><option value="acompte30">Acompte 30 %</option><option value="total">Totalité</option></select></label></div></div>'+
      '<div class="row-actions"><button class="btn gold" data-action="at-part-add">+ Ajouter la participante</button></div></div>';

    html+='<div class="card"><div class="flexb"><h3 style="margin:0;">Participantes</h3><span class="muted">'+a.participants.length+' participante(s)</span></div>';
    if(!a.participants.length){ html+='<p class="muted">Aucune participante renseignée.</p>'; }
    else {
      a.participants.forEach(function(p){
        var isSite=(p.source==='site'||p.payeSite||String(p.facturation||'').indexOf('site')===0), siteAcompte=(p.facturation==='site_acompte'), acompte=r2((Number(p.montant)||0)*0.30), solde=r2((Number(p.montant)||0)-acompte);
        html+='<div class="checkrow" style="align-items:flex-start;"><div style="flex:1;">'+
          '<div><b style="color:var(--bordeaux);">'+esc(p.nom||"Participante")+'</b> · '+esc(p.prestation||"Prestation")+'</div>'+
          '<div class="muted" style="font-size:12px;">Montant : '+euro(p.montant||0)+' · Choix : '+(isSite?(siteAcompte?"acompte 30 % via Squarespace":"prix total via Squarespace"):(p.facturation==="total"?"totalité":"acompte 30 %"))+(p.email?' · '+esc(p.email):'')+'</div>'+
          (p.factureNumero?'<div class="muted" style="font-size:12px;">Facture acompte/total : '+esc(p.factureNumero)+'</div>':'')+
          (p.factureSoldeNumero?'<div class="muted" style="font-size:12px;">Facture solde : '+esc(p.factureSoldeNumero)+'</div>':'')+
          (isSite?'<div class="muted" style="font-size:12px;">✅ Payé via Squarespace : '+euro(p.payeSiteMontant||p.montant||0)+(p.soldeSite?' · Solde à payer le jour de l’atelier : '+euro(p.soldeSite):'')+(p.commande?' · Commande '+esc(p.commande):'')+'</div>':'')+
          '</div><div class="row-actions" style="margin-top:0;justify-content:flex-end;">'+
            (!p.factureId&&!isSite?'<button class="btn small primary" data-action="at-fac-'+p.facturation+'-'+a.id+'-'+p.id+'">Créer facture '+(p.facturation==="total"?"totale":"acompte "+euro(acompte))+'</button>':'')+
            (p.factureId&&p.facturation==="acompte30"&&!p.factureSoldeId&&!isSite?'<button class="btn small soft" data-action="at-fac-solde-'+a.id+'-'+p.id+'">Créer facture solde '+euro(solde)+'</button>':'')+
            '<button class="btn small danger" data-action="at-part-del-'+a.id+'-'+p.id+'">Supprimer</button>'+
          '</div></div>';
      });
    }
    html+='</div>';
  }else{
    html+='<div class="card"><h3 style="margin-top:0;">Participants</h3><p class="muted" style="margin:0;">Pour ce type d’atelier, le détail nominatif des participants n’est pas nécessaire. Le budget est basé sur le montant renseigné ci-dessus.</p></div>';
  }
  return html;
}
function atelierClientFromParticipant(p){
  var k=normName(p.nom), c=(state.clients||[]).find(function(x){return normName(x.nom)===k;});
  if(c){
    if(!c.email&&p.email)c.email=p.email;
    if(!c.tel&&p.tel)c.tel=p.tel;
    return c;
  }
  c={id:uid(),nom:p.nom||"Cliente atelier",adresse:"",email:p.email||"",tel:p.tel||"",canal:"",anniversaire:"",notes:""};
  state.clients.push(c);
  return c;
}
function atelierCreateFacture(a,p,mode){
  if(!a||!p) return null;
  var total=Number(p.montant)||0;
  if(total<=0){ toast("Indique un montant pour cette participante."); return null; }
  var amount=total, type="totale", label="Atelier "+(a.type||"")+" - "+(a.theme||"");
  if(mode==="acompte30"){ amount=r2(total*0.30); type="acompte"; label="Acompte 30 % - "+label; }
  else if(mode==="solde"){ amount=r2(total-(total*0.30)); type="solde"; label="Solde - "+label; }
  else { label="Atelier "+(a.type||"")+" - "+(a.theme||""); }
  if(p.prestation) label += " - "+p.prestation;
  var lignes=[{id:uid(),designation:label,type:"service",qte:1,prix:amount}];
  var t=totals(lignes,state.settings.partService), date=todayISO();
  var client=atelierClientFromParticipant(p);
  var f={id:uid(),numero:prochainNumero("facture"),type:type,pourcentage:mode==="acompte30"?30:null,date:date,echeance:addDays(date,state.settings.delaiPaiement),
    client:client,lignes:lignes,montantBiens:t.biens,montantServices:t.services,montant:t.total,statut:"a_envoyer",paiementClient:"",
    datePaiement:null,origine:"atelier",atelierId:a.id,participantId:p.id,atelierType:a.type,atelierTheme:a.theme,atelierDate:a.date,notes:"Facture générée depuis l’onglet Atelier."};
  if(mode==="acompte30"){ f.devisTotal=total; f.acompteMontant=amount; }
  if(mode==="solde"){ f.devisTotal=total; f.acompteDeduit=r2(total*0.30); }
  state.factures.unshift(f);
  if(mode==="solde"){ p.factureSoldeId=f.id; p.factureSoldeNumero=f.numero; }
  else { p.factureId=f.id; p.factureNumero=f.numero; p.facturation=mode; }
  return f;
}
function viewAteliersPreview(){
  var upcoming=atelierUpcoming().slice(0,3), nonFact=atelierPrevisionNonFacturee();
  var html='<div class="card"><div class="flexb"><h3 style="margin:0;">🎨 Ateliers</h3><button class="btn small primary" data-action="nav-ateliers">Ouvrir</button></div>'+
    '<p class="muted" style="margin:8px 0 10px;">À facturer : <b style="color:var(--bordeaux);">'+euro(nonFact)+'</b> · Soldes jour J inclus dans les ateliers</p>';
  if(!upcoming.length) return html+'<p class="muted" style="margin:0;">Aucun atelier à venir.</p></div>';
  upcoming.forEach(function(a){ var t=atelierTotals(a); html+='<div class="cal-listitem"><b style="color:var(--bordeaux);">'+esc(a.type||"")+' · '+esc(a.theme||"")+'</b><div class="muted" style="font-size:12px;">'+frDate(a.date)+(a.lieu?' · '+esc(a.lieu):'')+' · '+euro(t.total)+'</div></div>'; });
  return html+'</div>';
}


/* ===================== Matériel / stock ===================== */
function stockCategoryOptions(selected){
  selected=selected||"Fleurs";
  var opts=["Fleurs","Feuillages","Matériel","Consommables","Papeterie","Cadres","Cercles","Pailles","Vases","Macramé","Emballage","Rubans","Accessoires","Autre"];
  if(selected && opts.indexOf(selected)<0) opts.unshift(selected);
  return opts.map(function(o){return '<option value="'+esc(o)+'"'+(selected===o?' selected':'')+'>'+esc(o)+'</option>';}).join("");
}
function stockUnitOptions(selected){
  selected=selected||"pièce";
  var opts=["pièce","tige","feuille","botte","lot","rouleau","mètre","centimètre","sachet","paquet","boîte","kg","g"];
  if(selected && opts.indexOf(selected)<0) opts.unshift(selected);
  return opts.map(function(o){return '<option value="'+esc(o)+'"'+(selected===o?' selected':'')+'>'+esc(o)+'</option>';}).join("");
}
function stockNum(v){
  var n=Number(String(v==null?"":v).replace(",","."));
  return Number.isFinite(n)?n:0;
}
function stockValue(item){ return r2((Number(item.quantite)||0)*(Number(item.prixUnitaire)||0)); }
function stockTotalValue(){ return r2((state.stockItems||[]).reduce(function(s,it){return s+stockValue(it);},0)); }
function stockCount(){ return (state.stockItems||[]).reduce(function(s,it){return s+(Number(it.quantite)||0);},0); }
function lowStockCount(){ return (state.stockItems||[]).filter(function(it){return stockStatus(it).level==="low"||stockStatus(it).level==="out";}).length; }
function stockSortName(a,b){
  return String(a&&a.nom||"").localeCompare(String(b&&b.nom||""),"fr",{sensitivity:"base",numeric:true});
}
function stockStatus(item){
  var q=Number(item&&item.quantite)||0, seuil=Number(item&&item.seuil)||0;
  if(q<=0) return {level:"out",label:"Rupture",bg:"#ffe1d8",fg:"#8a2d1b",icon:"🔴"};
  if(seuil>0 && q<=seuil) return {level:"low",label:"Stock bas",bg:"#fff0d8",fg:"#8a5a12",icon:"🟠"};
  if(seuil>0 && q<=seuil*2) return {level:"watch",label:"À surveiller",bg:"#fff8df",fg:"#756014",icon:"🟡"};
  return {level:"ok",label:"Stock OK",bg:"#e7eee8",fg:"#384640",icon:"🟢"};
}
function stockStatusBadge(item){
  var st=stockStatus(item);
  return '<span class="badge" style="background:'+st.bg+';color:'+st.fg+';">'+st.icon+' '+esc(st.label)+'</span>';
}
function stockDateTime(iso){
  if(!iso) return "—";
  try{return new Date(iso).toLocaleString("fr-FR",{dateStyle:"short",timeStyle:"short"});}catch(e){return String(iso);}
}
function stockLinkedSummary(item){
  var links=atelierRecipeLinksForStockItem(item);
  return links.length?links.map(function(x){return esc(x.model.label)+' ('+esc(x.line.qtyPerPerson)+' / personne)';}).join(' · '):'';
}
function stockHistoryLabel(field){
  return ({nom:"Nom",categorie:"Catégorie",quantite:"Quantité",unite:"Unité",prixUnitaire:"Prix unitaire",seuil:"Seuil d’alerte",fournisseur:"Fournisseur",reference:"Référence",emplacement:"Emplacement",notes:"Notes"})[field]||field;
}
function stockRecordHistory(item, changes){
  if(!changes.length) return;
  item.historique=item.historique||[];
  item.historique.unshift({date:new Date().toISOString(),changes:changes});
  if(item.historique.length>30) item.historique=item.historique.slice(0,30);
}
function viewStockEditModal(item){
  var links=atelierRecipeLinksForStockItem(item), hist=(item.historique||[]).slice(0,8);
  var h='<div id="modal" class="modal"><div class="modal-inner"><div class="card" style="max-width:760px;margin:2vh auto;">'+
    '<div class="flexb"><div><h2 style="margin:0;">Modifier l’article</h2><p class="muted" style="margin:4px 0 0;">Tous les champs de la fiche matériel peuvent être corrigés.</p></div>'+stockStatusBadge(item)+'</div>'+
    (links.length?'<div class="summary" style="margin-top:14px;"><b>🔗 Article utilisé dans '+links.length+' recette(s)</b><div class="muted" style="margin-top:4px;">'+links.map(function(x){return esc(x.model.label)+' · '+esc(x.line.qtyPerPerson)+' / personne';}).join('<br>')+'</div></div>':'')+
    '<div class="inline"><div><label class="field"><span>Nom</span><input id="stockEditNom" value="'+esc(item.nom||'')+'"></label></div><div><label class="field"><span>Catégorie</span><select id="stockEditCat">'+stockCategoryOptions(item.categorie||'Autre')+'</select></label></div></div>'+
    '<div class="inline"><div><label class="field"><span>Quantité</span><input id="stockEditQty" inputmode="decimal" type="number" step="0.01" min="0" value="'+esc(item.quantite==null?'':item.quantite)+'"></label></div><div><label class="field"><span>Unité</span><select id="stockEditUnit">'+stockUnitOptions(item.unite||'pièce')+'</select></label></div><div><label class="field"><span>Prix unitaire (€)</span><input id="stockEditPrice" inputmode="decimal" type="number" step="0.01" min="0" value="'+esc(item.prixUnitaire==null?'':item.prixUnitaire)+'"></label></div></div>'+
    '<div class="inline"><div><label class="field"><span>Seuil d’alerte</span><input id="stockEditSeuil" inputmode="decimal" type="number" step="0.01" min="0" value="'+esc(item.seuil==null?'':item.seuil)+'"></label></div><div><label class="field"><span>Fournisseur</span><input id="stockEditFournisseur" value="'+esc(item.fournisseur||'')+'"></label></div></div>'+
    '<div class="inline"><div><label class="field"><span>Référence</span><input id="stockEditReference" value="'+esc(item.reference||'')+'" placeholder="Référence fournisseur ou interne"></label></div><div><label class="field"><span>Emplacement</span><input id="stockEditEmplacement" value="'+esc(item.emplacement||'')+'" placeholder="Ex : étagère A, bac 3"></label></div></div>'+
    '<label class="field"><span>Notes</span><textarea id="stockEditNotes" placeholder="Couleur, usage, caractéristiques…">'+esc(item.notes||'')+'</textarea></label>'+
    '<div class="row-actions"><button class="btn primary" type="button" data-action="stock-edit-save">Enregistrer les modifications</button><button class="btn ghost" type="button" data-action="stock-edit-cancel">Annuler</button></div>';
  if(hist.length){
    h+='<div style="margin-top:18px;border-top:1px solid var(--line);padding-top:14px;"><h3 style="margin:0 0 8px;">Historique récent</h3>';
    hist.forEach(function(entry){
      h+='<div class="cal-listitem"><b>'+esc(stockDateTime(entry.date))+'</b><div class="muted" style="font-size:12px;">'+(entry.changes||[]).map(function(c){return esc(stockHistoryLabel(c.field))+': '+esc(c.from==null?'':c.from)+' → '+esc(c.to==null?'':c.to);}).join('<br>')+'</div></div>';
    });
    h+='</div>';
  }
  h+='</div></div></div>';
  return h;
}
function openStockEdit(id){
  var it=(state.stockItems||[]).find(function(x){return x.id===id;});
  if(!it){toast("Article introuvable.");return;}
  ui.stockEditId=id; renderModal();
}
function saveStockEdit(){
  var it=(state.stockItems||[]).find(function(x){return x.id===ui.stockEditId;});
  if(!it){ui.stockEditId=null;renderModal();return;}
  var next={
    nom:val("stockEditNom").trim(), categorie:val("stockEditCat")||"Autre", quantite:stockNum(val("stockEditQty")), unite:val("stockEditUnit")||"pièce",
    prixUnitaire:stockNum(val("stockEditPrice")), seuil:stockNum(val("stockEditSeuil")), fournisseur:val("stockEditFournisseur").trim(),
    reference:val("stockEditReference").trim(), emplacement:val("stockEditEmplacement").trim(), notes:val("stockEditNotes").trim()
  };
  if(!next.nom){toast("Le nom de l’article est obligatoire.");return;}
  var fields=["nom","categorie","quantite","unite","prixUnitaire","seuil","fournisseur","reference","emplacement","notes"], changes=[];
  fields.forEach(function(f){
    var before=it[f]==null?"":it[f], after=next[f]==null?"":next[f];
    if(String(before)!==String(after)){changes.push({field:f,from:before,to:after});it[f]=after;}
  });
  if(!changes.length){ui.stockEditId=null;renderModal();toast("Aucune modification à enregistrer.");return;}
  it.updatedAt=new Date().toISOString(); stockRecordHistory(it,changes); ui.stockEditId=null; saveCache(); render(); toast("Article mis à jour.");
}
function stockFilterRowsFromDOM(){
  var input=document.getElementById("stockSearch"), select=document.getElementById("stockCategoryFilter");
  var q=searchNorm(input?input.value:ui.stockSearch), cat=select?select.value:ui.stockCategoryFilter;
  ui.stockSearch=input?input.value:ui.stockSearch; ui.stockCategoryFilter=cat||"";
  var rows=document.querySelectorAll("[data-stock-row]"); var visible=0;
  Array.prototype.forEach.call(rows,function(row){
    var hay=searchNorm(row.getAttribute("data-stock-search")||""), rc=row.getAttribute("data-stock-category")||"";
    var show=(!q||hay.indexOf(q)>=0)&&(!cat||rc===cat); row.style.display=show?"":"none"; if(show) visible++;
  });
  var count=document.getElementById("stockVisibleCount"); if(count) count.textContent=visible+" article(s) affiché(s)";
}
function viewStock(){
  state.stockItems=state.stockItems||[];
  var total=stockTotalValue(), q=stockCount(), low=lowStockCount(), cats={};
  state.stockItems.forEach(function(it){ var c=it.categorie||"Autre"; cats[c]=(cats[c]||0)+stockValue(it); });
  var catHtml=Object.keys(cats).sort(function(a,b){return a.localeCompare(b,"fr",{sensitivity:"base"});}).map(function(c){return '<span class="chip">'+esc(c)+' : '+euro(cats[c])+'</span>';}).join(" ");
  var catFilter='<option value="">Toutes les catégories</option>'+Object.keys(cats).sort(function(a,b){return a.localeCompare(b,"fr",{sensitivity:"base"});}).map(function(c){return '<option value="'+esc(c)+'"'+(ui.stockCategoryFilter===c?' selected':'')+'>'+esc(c)+'</option>';}).join('');

  var html='<div class="flexb" style="margin-bottom:14px;"><h2 style="margin:0;">Matériel</h2><div class="row-actions" style="margin-top:0;"><button class="btn small soft" type="button" disabled>🧪 Mode simulation — stock non modifié automatiquement</button><span class="muted">Bibliothèque centrale des fleurs, fournitures et consommables</span></div></div>'+
    '<div class="grid-stats">'+stat("Valeur du matériel",euro(total),true)+stat("Quantité totale",q,false)+stat("Références",state.stockItems.length,false)+stat("Alertes",low,false)+'</div>'+
    '<div class="card"><h3 style="margin-top:0;">Ajouter une fleur ou un article</h3>'+
      '<div class="inline"><div><label class="field"><span>Nom</span><input id="stockNom" placeholder="Ex : Étoile décorative de Noël"></label></div><div><label class="field"><span>Catégorie</span><select id="stockCat">'+stockCategoryOptions("Fleurs")+'</select></label></div></div>'+
      '<div class="inline"><div><label class="field"><span>Quantité</span><input id="stockQty" inputmode="decimal" type="number" step="0.01" min="0"></label></div><div><label class="field"><span>Unité</span><select id="stockUnit">'+stockUnitOptions("pièce")+'</select></label></div><div><label class="field"><span>Prix unitaire (€)</span><input id="stockPrice" inputmode="decimal" type="number" step="0.01" min="0"></label></div></div>'+
      '<div class="inline"><div><label class="field"><span>Seuil alerte stock bas</span><input id="stockSeuil" inputmode="decimal" type="number" step="0.01" min="0" placeholder="facultatif"></label></div><div><label class="field"><span>Fournisseur</span><input id="stockFournisseur" placeholder="Ex : Floristen Center"></label></div></div>'+
      '<div class="inline"><div><label class="field"><span>Référence</span><input id="stockReference" placeholder="Référence fournisseur ou interne"></label></div><div><label class="field"><span>Emplacement</span><input id="stockEmplacement" placeholder="Ex : étagère A, bac 3"></label></div></div>'+
      '<label class="field"><span>Notes</span><textarea id="stockNotes" placeholder="Couleur, usage, caractéristiques…"></textarea></label>'+
      '<div class="row-actions"><button class="btn primary" type="button" data-action="stock-add">+ Ajouter au matériel</button></div></div>';

  html+=viewAtelierRecipeManager();
  if(catHtml) html+='<div class="card"><h3 style="margin-top:0;">Répartition par catégorie</h3><div style="display:flex;flex-wrap:wrap;gap:6px;">'+catHtml+'</div></div>';

  html+='<div class="card"><div class="flexb"><div><h3 style="margin:0;">Liste du matériel</h3><span id="stockVisibleCount" class="muted">'+state.stockItems.length+' article(s) affiché(s)</span></div><span class="muted">Tri automatique de A à Z</span></div>'+
    '<div class="inline" style="margin-top:12px;"><div style="flex:2;"><label class="field"><span>Rechercher</span><input id="stockSearch" value="'+esc(ui.stockSearch||'')+'" placeholder="Nom, fournisseur, référence, emplacement…"></label></div><div><label class="field"><span>Filtrer</span><select id="stockCategoryFilter">'+catFilter+'</select></label></div></div>';
  if(!state.stockItems.length){
    html+='<p class="muted">Aucun article pour le moment.</p>';
  }else{
    var list=state.stockItems.slice().sort(stockSortName);
    list.forEach(function(it){
      var linked=stockLinkedSummary(it), updated=it.updatedAt||it.createdAt||"";
      var search=[it.nom,it.categorie,it.fournisseur,it.reference,it.emplacement,it.notes].filter(Boolean).join(' ');
      html+='<div class="checkrow" data-stock-row="'+esc(it.id)+'" data-stock-edit-row="'+esc(it.id)+'" data-stock-category="'+esc(it.categorie||'Autre')+'" data-stock-search="'+esc(search)+'" style="align-items:flex-start;">'+
        '<div style="flex:1;min-width:0;"><div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;"><b style="color:var(--bordeaux);font-size:15px;">'+esc(it.nom||"Article")+'</b>'+stockStatusBadge(it)+'</div>'+
        '<div class="muted" style="font-size:12px;margin-top:3px;">'+esc(it.categorie||"Autre")+' · <b>'+esc(it.quantite==null?0:it.quantite)+' '+esc(it.unite||"")+'</b> · Prix unitaire : '+euro(it.prixUnitaire||0)+' · Valeur : '+euro(stockValue(it))+'</div>'+
        (it.fournisseur?'<div class="muted" style="font-size:12px;">Fournisseur : '+esc(it.fournisseur)+'</div>':'')+
        ((it.reference||it.emplacement)?'<div class="muted" style="font-size:12px;">'+(it.reference?'Réf. : '+esc(it.reference):'')+(it.reference&&it.emplacement?' · ':'')+(it.emplacement?'Emplacement : '+esc(it.emplacement):'')+'</div>':'')+
        (it.notes?'<div class="muted" style="font-size:12px;">Notes : '+esc(it.notes)+'</div>':'')+
        (linked?'<div class="muted" style="font-size:12px;">🔗 '+linked+'</div>':'')+
        (updated?'<div class="muted" style="font-size:11px;margin-top:3px;">Dernière modification : '+esc(stockDateTime(updated))+'</div>':'')+'</div>'+
        '<div class="row-actions" style="margin-top:0;justify-content:flex-end;"><button class="btn small soft" type="button" data-action="stock-edit-'+esc(it.id)+'">Modifier la fiche</button><button class="btn small danger" type="button" data-action="stock-del-'+esc(it.id)+'">Supprimer</button></div></div>';
    });
  }
  html+='</div>';
  setTimeout(stockFilterRowsFromDOM,0);
  return html;
}
function addStockItem(){
  var nom=val("stockNom").trim(); if(!nom){toast("Indique le nom de la fleur ou de l’article.");return;}
  var now=new Date().toISOString();
  var item={id:uid(),nom:nom,categorie:val("stockCat")||"Autre",quantite:stockNum(val("stockQty")),unite:val("stockUnit")||"pièce",prixUnitaire:stockNum(val("stockPrice")),seuil:stockNum(val("stockSeuil")),fournisseur:val("stockFournisseur").trim(),reference:val("stockReference").trim(),emplacement:val("stockEmplacement").trim(),notes:val("stockNotes").trim(),createdAt:now,updatedAt:now,historique:[{date:now,changes:[{field:"création",from:"",to:"Article créé"}]}]};
  state.stockItems=state.stockItems||[]; state.stockItems.push(item); saveCache(); render(); toast("Article ajouté au matériel.");
}
function adjustStockItem(id){ openStockEdit(id); }
function viewStockPreview(){
  var total=stockTotalValue?stockTotalValue():0, low=lowStockCount?lowStockCount():0;
  return '<div class="card"><div class="flexb"><h3 style="margin:0;">📦 Matériel</h3><button class="btn small primary" data-action="nav-stock">Ouvrir</button></div><p class="muted" style="margin:8px 0 0;">Valeur estimée : <b style="color:var(--bordeaux);">'+euro(total)+'</b>'+(low?' · '+low+' alerte(s)':'')+'</p></div>';
}

/* ===================== Calendrier ===================== */
function calMonthStart(){
  var base = ui.calMonth || todayISO().slice(0,7);
  var p=base.split("-");
  return new Date(Number(p[0]), Number(p[1])-1, 1);
}
function calSetMonth(offset){
  var d=calMonthStart();
  d.setMonth(d.getMonth()+offset);
  ui.calMonth=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");
  render();
}
function calDateKey(d){
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function calEvents(){
  var events=[];
  (state.mariages||[]).forEach(function(m){
    if(m.dateMariage) events.push({date:m.dateMariage,type:"mariage",icon:"💍",title:m.nom||"Mariage",sub:m.lieu||"",action:"mar-open-"+m.id});
    if(m.dateLivraison) events.push({date:m.dateLivraison,type:"mariage",icon:"📦",title:"Livraison "+(m.nom||"mariage"),sub:m.modeLivraison||"",action:"mar-open-"+m.id});
  });
  (state.ateliers||[]).forEach(function(a){
    if(a.date) events.push({date:a.date,type:"atelier",icon:"🎨",title:(a.type||"Atelier")+" · "+(a.theme||"atelier"),sub:a.lieu||"",action:"at-open-"+a.id});
  });
  (state.commandes||[]).forEach(function(c){
    var label=(c.label||"").toLowerCase();
    var isAtelier=label.indexOf("atelier")>=0||label.indexOf("evjf")>=0||label.indexOf("anniversaire")>=0||label.indexOf("qvt")>=0;
    if(c.dateLivraison&&isAtelier) events.push({date:c.dateLivraison,type:"atelier",icon:"🌸",title:c.label||"Atelier",sub:c.client||"",action:"cmd-open-"+c.id});
  });
  (state.factures||[]).forEach(function(f){
    if(f.echeance&&f.statut!=="payee") events.push({date:f.echeance,type:"paiement",icon:"💶",title:(f.numero||"Facture")+" à régler",sub:((f.client&&f.client.nom)||"")+" · "+euro(f.montant||0),action:"facture-preview-"+f.id});
  });
  events.sort(function(a,b){return (a.date||"").localeCompare(b.date||"");});
  return events;
}
function calEventsFor(date){return calEvents().filter(function(e){return e.date===date;});}
function viewCalendarPreview(){
  var today=todayISO(), events=calEvents().filter(function(e){return e.date>=today;}).slice(0,5);
  var html='<div class="card"><div class="flexb"><h3 style="margin:0;">📆 Calendrier</h3><button class="btn small primary" data-action="go-calendrier">Ouvrir</button></div>';
  if(!events.length) return html+'<p class="muted" style="margin:10px 0 0;">Aucun événement à venir renseigné.</p></div>';
  html+='<p class="muted" style="margin:8px 0 10px;">Prochains événements importants.</p>';
  events.forEach(function(e){html+='<div class="cal-listitem"><b style="color:var(--bordeaux);">'+e.icon+' '+esc(e.title)+'</b><div class="muted" style="font-size:12px;">'+frDate(e.date)+(e.sub?' · '+esc(e.sub):'')+'</div></div>';});
  return html+'</div>';
}
function viewCalendrier(){
  var d=calMonthStart(), year=d.getFullYear(), month=d.getMonth();
  var monthName=d.toLocaleDateString("fr-FR",{month:"long",year:"numeric"});
  var first=new Date(year,month,1), start=new Date(first), day=(first.getDay()+6)%7;
  start.setDate(first.getDate()-day);
  var today=todayISO();
  var html='<div class="cal-head"><h2 style="margin:0;">📆 Calendrier</h2><div class="row-actions" style="margin:0;"><button class="btn small ghost" data-action="cal-prev">← Mois précédent</button><button class="btn small soft" data-action="cal-today">Aujourd’hui</button><button class="btn small ghost" data-action="cal-next">Mois suivant →</button></div></div>'+
    '<div class="card"><div class="flexb"><h3 style="margin:0;text-transform:capitalize;">'+esc(monthName)+'</h3><div class="muted">💍 Mariages · 🌸 Ateliers · 💶 Paiements</div></div><div class="cal-grid" style="margin-top:12px;">';
  ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].forEach(function(n){html+='<div class="cal-dayname">'+n+'</div>';});
  for(var i=0;i<42;i++){
    var cur=new Date(start); cur.setDate(start.getDate()+i);
    var key=calDateKey(cur), evs=calEventsFor(key);
    var cls='cal-cell'+(cur.getMonth()!==month?' other':'')+(key===today?' today':'');
    html+='<div class="'+cls+'"><div class="cal-num">'+cur.getDate()+'</div>';
    evs.slice(0,3).forEach(function(e){html+='<div class="cal-event '+e.type+'" data-action="'+esc(e.action)+'" title="'+esc(e.title)+'">'+e.icon+' '+esc(e.title)+'</div>';});
    if(evs.length>3) html+='<div class="muted" style="font-size:11px;">+'+(evs.length-3)+' autre(s)</div>';
    html+='</div>';
  }
  html+='</div></div>';
  var upcoming=calEvents().filter(function(e){return e.date>=today;}).slice(0,12);
  html+='<div class="card"><h3 style="margin:0 0 10px;">À venir</h3>';
  if(!upcoming.length) html+='<p class="muted" style="margin:0;">Aucun événement à venir.</p>';
  upcoming.forEach(function(e){html+='<div class="cal-listitem"><button data-action="'+esc(e.action)+'" style="border:none;background:none;text-align:left;cursor:pointer;font-family:inherit;padding:0;width:100%;"><b style="color:var(--bordeaux);">'+e.icon+' '+esc(e.title)+'</b><div class="muted" style="font-size:12px;">'+frDate(e.date)+(e.sub?' · '+esc(e.sub):'')+'</div></button></div>';});
  return html+'</div>';
}

/* ===================== Commandes ===================== */
function getCommande(id){ return state.commandes.find(function(c){return c.id===id;}); }
function newCommandeDraft(){
  ui.commandeDraft={ dateCommande:todayISO(), dateLivraison:"", statut:"a_preparer", clientMode:state.clients.length?"existant":"nouveau", clientId:state.clients[0]?state.clients[0].id:"", client:{nom:"",adresse:"",email:"",tel:""}, lignes:[], notes:"" };
}
function commandeDraftTotals(){ return totals(ui.commandeDraft?ui.commandeDraft.lignes:[], state.settings.partService); }
function commandeTotHTML(t){
  return '<div class="totrow muted"><span>Biens</span><span>'+euro(t.biens)+'</span></div>'+ 
    '<div class="totrow muted"><span>Services</span><span>'+euro(t.services)+'</span></div>'+ 
    '<div class="totrow" style="font-weight:700;color:var(--bordeaux);border-top:1px solid var(--line);margin-top:4px;padding-top:6px;"><span>Total commande / facture</span><span>'+euro(t.total)+'</span></div>';
}
function viewCommandes(){
  if(ui.commandeOpen) return viewCommandeDetail(getCommande(ui.commandeOpen));
  var todo=cmdData().length;
  var html='<div class="flexb" style="margin-bottom:14px;"><h2 style="margin:0;">Suivi des Commandes</h2><button class="btn primary" data-action="cmd-new">+ Nouvelle commande</button></div>'+ 
    '<div class="row-actions" style="margin-bottom:12px;"><button class="btn small primary" data-action="cmd-suivi">Suivi</button></div>'+ 
    '<p class="muted" style="margin-top:-8px;">Saisis ici une commande personnalisée après un contact client : une facture est créée automatiquement dans l\'onglet Factures et la commande apparaît dans ce suivi.</p>';
  if(ui.commandeDraft){ html+=viewCommandeForm(); }
  var list=state.commandes.slice().sort(function(a,b){ return (a.fait?1:0)-(b.fait?1:0) || (a.dateLivraison||"9999").localeCompare(b.dateLivraison||"9999"); });
  if(!list.length){ return html+'<div class="card"><p class="muted" style="margin:0;">Aucune commande pour le moment.</p></div>'; }
  html+='<div class="card"><div class="flexb" style="margin-bottom:10px;"><h3 style="margin:0;">Suivi des commandes</h3><span class="muted">'+todo+' à traiter</span></div>';
  list.forEach(function(c){
    var facture=c.factureId?state.factures.find(function(f){return f.id===c.factureId;}):null;
    html+='<div class="checkrow" style="align-items:flex-start;"><input type="checkbox" data-action="cmd-toggle" data-id="'+c.id+'"'+(c.fait?' checked':'')+'><div style="flex:1;">'+
      '<button data-action="cmd-open-'+c.id+'" style="border:none;background:none;text-align:left;cursor:pointer;font-family:inherit;padding:0;width:100%;">'+
      '<div style="font-weight:600;color:var(--bordeaux);'+(c.fait?'text-decoration:line-through;color:var(--ink-s);':'')+'">'+esc(c.label||"Commande")+' →</div>'+ 
      '<div class="muted" style="font-size:12px;">'+(c.client?esc(c.client)+' · ':'')+(c.dateLivraison?'à préparer pour le '+frDate(c.dateLivraison):'sans date')+(c.montant?' · '+euro(c.montant):'')+'</div>'+ 
      (facture?'<div class="muted" style="font-size:12px;">Facture créée : '+esc(facture.numero)+' · '+(ST_FAC[facture.statut]||ST_FAC.a_envoyer).l+'</div>':'')+'</button></div>'+ 
      '<div class="row-actions" style="margin-top:0;"><button class="btn small gold" data-action="cmd-open-'+c.id+'">Ouvrir</button><button class="btn small danger" data-action="cmd-del-'+c.id+'">'+(ui.confirmDelete==="commande:"+c.id?'Confirmer suppression':'Supprimer')+'</button></div></div>';
  });
  html+='</div>';
  return html;
}
function viewCommandeForm(){
  var c=ui.commandeDraft;
  var clientPart='';
  if(state.clients.length){
    clientPart+='<div class="row-actions" style="margin-top:0;margin-bottom:14px;"><button class="btn small '+(c.clientMode==="nouveau"?"primary":"ghost")+'" data-action="cmd-mode-nouveau">Nouveau client</button><button class="btn small '+(c.clientMode==="existant"?"primary":"ghost")+'" data-action="cmd-mode-existant">Client enregistré</button></div>';
  }
  if(c.clientMode==="existant"&&state.clients.length){
    clientPart+='<label class="field"><span>Client</span><select id="cmdClientSel" data-action="cmd-clientsel">'+state.clients.map(function(cl){return '<option value="'+esc(cl.id)+'"'+(cl.id===c.clientId?' selected':'')+'>'+esc(cl.nom)+'</option>';}).join("")+'</select></label>';
  } else {
    clientPart+='<label class="field"><span>Nom du client *</span><input id="cmdNom" value="'+esc(c.client.nom)+'" placeholder="Ex : Camille Martin"></label>'+ 
      '<label class="field"><span>Adresse</span><input id="cmdAdr" value="'+esc(c.client.adresse)+'"></label>'+ 
      '<div class="inline"><div><label class="field"><span>Email</span><input id="cmdEmail" value="'+esc(c.client.email)+'"></label></div><div><label class="field"><span>Téléphone</span><input id="cmdTel" value="'+esc(c.client.tel)+'"></label></div></div>';
  }
  var cat=state.catalogue.length? state.catalogue.map(function(it){
    return '<button data-action="cmd-addcat-'+it.id+'" style="text-align:left;border:1px solid var(--line);background:'+(it.type==="service"?"var(--green-s)":"var(--blush-s)")+';border-radius:10px;padding:8px 11px;cursor:pointer;font-family:inherit;"><div style="font-size:13px;font-weight:600;">+ '+esc(it.designation)+'</div><div class="muted">'+euro(it.prix)+' · '+(it.type==="service"?"service":"bien")+'</div></button>';
  }).join("") : '<span class="muted">Votre catalogue est vide : utilisez une ligne libre.</span>';
  var rows=c.lignes.map(function(l){
    return '<tr style="border-top:1px solid var(--line);"><td style="padding:6px;"><input data-cmdlinedesig data-id="'+l.id+'" value="'+esc(l.designation)+'"></td>'+ 
      '<td style="padding:6px;"><select data-cmdlinetype data-id="'+l.id+'"><option value="bien"'+(l.type==="bien"?' selected':'')+'>Bien</option><option value="service"'+(l.type==="service"?' selected':'')+'>Service</option></select></td>'+ 
      '<td style="padding:6px;width:70px;"><input type="number" min="0" data-cmdlinefield="qte" data-id="'+l.id+'" value="'+esc(l.qte)+'"></td>'+ 
      '<td style="padding:6px;width:100px;"><input type="number" min="0" step="0.01" data-cmdlinefield="prix" data-id="'+l.id+'" value="'+esc(l.prix)+'"></td>'+ 
      '<td style="padding:6px;font-weight:600;white-space:nowrap;">'+euro(num(l.qte)*num(l.prix))+'</td>'+ 
      '<td style="padding:6px;"><button data-action="cmd-delline-'+l.id+'" style="border:none;background:none;color:#9b3b3b;cursor:pointer;font-size:18px;">×</button></td></tr>';
  }).join("");
  var table=c.lignes.length? '<div class="scroll" style="margin-bottom:12px;"><table style="min-width:520px;"><thead><tr class="muted" style="text-align:left;"><th style="padding:6px;">Désignation</th><th style="padding:6px;">Type</th><th style="padding:6px;">Qté</th><th style="padding:6px;">Prix unit.</th><th style="padding:6px;">Total</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div>' : '<p class="muted">Ajoutez au moins une ligne de commande.</p>';
  return '<div class="card" style="border-color:var(--gold-s);"><div class="flexb" style="margin-bottom:10px;"><h3 style="margin:0;">Nouvelle commande</h3><button class="btn small ghost" data-action="cmd-cancel">Annuler</button></div>'+ 
    '<div class="inline"><div><label class="field"><span>Date de commande</span><input id="cmdDateCommande" type="date" value="'+esc(c.dateCommande)+'"></label></div><div><label class="field"><span>Date de livraison / retrait</span><input id="cmdDateLivraison" type="date" value="'+esc(c.dateLivraison)+'"></label></div></div>'+ 
    clientPart+'<div class="section-title">Articles commandés</div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">'+cat+'</div>'+table+ 
    '<button class="btn small soft" data-action="cmd-addfree">+ Ligne libre</button>'+ 
    '<div id="cmdTot" style="margin-top:14px;padding:12px;background:var(--cream);border-radius:10px;font-size:14px;">'+commandeTotHTML(commandeDraftTotals())+'</div>'+ 
    '<label class="field" style="margin-top:12px;"><span>Note commande / facture (facultatif)</span><textarea id="cmdNotes">'+esc(c.notes||"")+'</textarea></label>'+ 
    '<div class="row-actions"><button class="btn gold" data-action="cmd-create">Enregistrer la commande + créer la facture</button><button class="btn ghost" data-action="cmd-cancel">Annuler</button></div></div>';
}
function captureCommandeDraft(){
  var c=ui.commandeDraft; if(!c) return;
  c.dateCommande=val("cmdDateCommande")||todayISO(); c.dateLivraison=val("cmdDateLivraison"); c.notes=val("cmdNotes");
  if(c.clientMode==="existant"&&state.clients.length){ c.clientId=val("cmdClientSel")||c.clientId; }
  else { c.client={nom:val("cmdNom"),adresse:val("cmdAdr"),email:val("cmdEmail"),tel:val("cmdTel")}; }
}
function refreshCommandeTotals(){ var box=document.getElementById("cmdTot"); if(box) box.innerHTML=commandeTotHTML(commandeDraftTotals()); var box2=document.getElementById("cmdOpenTot"); if(box2&&ui.commandeOpen){ var oc=getCommande(ui.commandeOpen); if(oc) box2.innerHTML=commandeTotHTML(totals(oc.lignes||[],state.settings.partService)); } }
function createCommande(){
  captureCommandeDraft(); var c=ui.commandeDraft, client;
  if(!c) return;
  if(c.clientMode==="existant"&&state.clients.length){ client=state.clients.find(function(cl){return cl.id===c.clientId;}); }
  else {
    if(!(c.client.nom||"").trim()){ toast("Indique le nom du client."); return; }
    var k=normName(c.client.nom); client=state.clients.find(function(cl){return normName(cl.nom)===k;});
    if(client){ if(!client.email&&c.client.email)client.email=c.client.email; if(!client.tel&&c.client.tel)client.tel=c.client.tel; if(!client.adresse&&c.client.adresse)client.adresse=c.client.adresse; }
    else { client=Object.assign({id:uid()},c.client); state.clients.push(client); }
  }
  if(!client){ toast("Choisis un client."); return; }
  if(!c.lignes.length){ toast("Ajoute au moins une ligne de commande."); return; }
  var t=totals(c.lignes,state.settings.partService);
  if(t.total<=0){ toast("Le total de la commande doit être supérieur à 0 €."); return; }
  var lignes=c.lignes.map(function(l){ return Object.assign({},l); });
  var facture={ id:uid(), numero:prochainNumero("facture"), type:"totale", date:c.dateCommande, echeance:addDays(c.dateCommande,state.settings.delaiPaiement), client:client, lignes:lignes.map(function(l){return Object.assign({},l);}), notes:c.notes, montantBiens:t.biens, montantServices:t.services, montant:t.total, statut:"a_envoyer", datePaiement:null, origine:"commande" };
  var label=lignes.map(function(l){return (num(l.qte)>1?l.qte+" x ":"")+l.designation;}).filter(function(x){return x.trim();}).join(" · ") || "Commande";
  var commande={ id:uid(), label:label, client:client.nom, clientObj:Object.assign({},client), dateCommande:c.dateCommande, dateLivraison:c.dateLivraison, fait:false, createdAt:c.dateCommande, factureId:facture.id, montant:t.total, lignes:lignes, notes:c.notes, historique:[{date:todayISO(),texte:"Commande créée et facture "+facture.numero+" générée."}] };
  state.factures.unshift(facture); state.commandes.unshift(commande); ui.commandeDraft=null; ui.commandeOpen=commande.id; saveCache(); ui.tab="commandes"; render(); toast("Commande enregistrée et facture "+facture.numero+" créée.");
}
function viewCommandeDetail(c){
  if(!c){ ui.commandeOpen=null; return viewCommandes(); }
  c.lignes=c.lignes||[]; c.clientObj=c.clientObj||{nom:c.client||"",adresse:"",email:"",tel:""};
  var facture=c.factureId?state.factures.find(function(f){return f.id===c.factureId;}):null;
  var t=totals(c.lignes,state.settings.partService), cd=countdown(c.dateLivraison);
  var lignes=c.lignes.map(function(l){ return '<tr style="border-top:1px solid var(--line);"><td style="padding:6px;"><input data-cmdopen-desig data-id="'+l.id+'" value="'+esc(l.designation)+'"></td><td style="padding:6px;"><select data-cmdopen-type data-id="'+l.id+'"><option value="bien"'+(l.type==="bien"?' selected':'')+'>Bien</option><option value="service"'+(l.type==="service"?' selected':'')+'>Service</option></select></td><td style="padding:6px;width:70px;"><input type="number" min="0" data-cmdopen-field="qte" data-id="'+l.id+'" value="'+esc(l.qte)+'"></td><td style="padding:6px;width:100px;"><input type="number" min="0" step="0.01" data-cmdopen-field="prix" data-id="'+l.id+'" value="'+esc(l.prix)+'"></td><td style="padding:6px;font-weight:600;white-space:nowrap;">'+euro(num(l.qte)*num(l.prix))+'</td><td style="padding:6px;"><button data-action="cmd-detail-delline-'+l.id+'" style="border:none;background:none;color:#9b3b3b;cursor:pointer;font-size:18px;">×</button></td></tr>'; }).join("");
  var table=c.lignes.length?'<div class="scroll"><table style="min-width:520px;"><thead><tr class="muted" style="text-align:left;"><th style="padding:6px;">Désignation</th><th style="padding:6px;">Type</th><th style="padding:6px;">Qté</th><th style="padding:6px;">Prix unit.</th><th style="padding:6px;">Total</th><th></th></tr></thead><tbody>'+lignes+'</tbody></table></div>':'<p class="muted">Aucune ligne.</p>';
  var hist=(c.historique||[]).map(function(h){return '<div style="padding:6px 0;border-bottom:1px solid var(--line);"><span class="muted" style="font-size:12px;">'+frDate(h.date)+'</span><div>'+esc(h.texte)+'</div></div>';}).join("");
  var delPending=ui.confirmDelete==="commande:"+c.id;
  return '<div class="summary"><div class="flexb"><div><span class="pill" style="background:'+(c.fait?'var(--green-s)':'var(--blush-s)')+';color:'+(c.fait?'var(--green)':'var(--bordeaux)')+';">'+(c.fait?'Terminée':'À traiter')+'</span> <span style="font-weight:700;color:'+cd.c+';margin-left:6px;">'+cd.txt+'</span></div>'+(facture?'<button class="btn small ghost" data-action="cmd-fac-preview-'+facture.id+'">Voir la facture '+esc(facture.numero)+'</button>':'')+'</div><div class="muted" style="margin-top:8px;">Total : <b>'+euro(t.total)+'</b>'+(facture?' · Facture : <b>'+esc(facture.numero)+' / '+(ST_FAC[facture.statut]||ST_FAC.a_envoyer).l+'</b>':'')+'</div></div>'+ 
    '<div class="card"><div class="flexb" style="margin-bottom:6px;"><h3 style="margin:0;">'+esc(c.label||"Commande")+'</h3><button class="btn small ghost" data-action="cmd-back">← Suivi</button></div>'+ 
    '<div class="checkrow"><input type="checkbox" data-action="cmd-detail-toggle" data-id="'+c.id+'"'+(c.fait?' checked':'')+'><div style="flex:1;"><b>Commande terminée</b></div></div>'+ 
    '<div class="inline"><div><label class="field"><span>Date de commande</span><input id="cmdOpenDateCommande" type="date" value="'+esc(c.dateCommande||c.createdAt||todayISO())+'"></label></div><div><label class="field"><span>Date de livraison / retrait</span><input id="cmdOpenDateLivraison" type="date" value="'+esc(c.dateLivraison||"")+'"></label></div></div>'+ 
    '<label class="field"><span>Nom du client</span><input id="cmdOpenClientNom" value="'+esc(c.clientObj.nom||c.client||"")+'"></label>'+ 
    '<label class="field"><span>Adresse</span><input id="cmdOpenClientAdr" value="'+esc(c.clientObj.adresse||"")+'"></label>'+ 
    '<div class="inline"><div><label class="field"><span>Email</span><input id="cmdOpenClientEmail" value="'+esc(c.clientObj.email||"")+'"></label></div><div><label class="field"><span>Téléphone</span><input id="cmdOpenClientTel" value="'+esc(c.clientObj.tel||"")+'"></label></div></div>'+ 
    '<label class="field"><span>Note commande / facture</span><textarea id="cmdOpenNotes" style="min-height:90px;">'+esc(c.notes||"")+'</textarea></label>'+ 
    '<button class="btn gold" data-action="cmd-save">Enregistrer la fiche</button></div>'+ 
    '<div class="card"><div class="flexb"><h3 style="margin:0;">Articles commandés</h3><span class="muted">'+c.lignes.length+' ligne'+(c.lignes.length>1?'s':'')+'</span></div><div style="margin:8px 0;">'+table+'</div><button class="btn small soft" data-action="cmd-detail-addfree">+ Ligne libre</button><div id="cmdOpenTot" style="margin-top:14px;padding:12px;background:var(--cream);border-radius:10px;font-size:14px;">'+commandeTotHTML(t)+'</div></div>'+ 
    '<div class="card"><h3 style="margin:0 0 8px;">Historique / notes datées</h3><div class="inline" style="margin-bottom:8px;"><div style="flex:3;"><input id="cmdHistInput" placeholder="Ex : Cliente prévenue, retrait confirmé…"></div><div style="flex:0;"><button class="btn primary" data-action="cmd-hist-add">+ Noter</button></div></div>'+(hist||'<p class="muted" style="margin:0;">Aucune note pour l\'instant.</p>')+'</div>'+ 
    '<div class="row-actions"><button class="btn danger" data-action="cmd-del-'+c.id+'">'+(delPending?'Confirmer suppression':'Supprimer cette commande')+'</button></div>';
}
function captureCommandeOpen(){
  var c=getCommande(ui.commandeOpen); if(!c) return;
  c.dateCommande=val("cmdOpenDateCommande")||c.dateCommande||todayISO(); c.createdAt=c.dateCommande;
  c.dateLivraison=val("cmdOpenDateLivraison"); c.notes=val("cmdOpenNotes");
  c.clientObj={nom:val("cmdOpenClientNom"),adresse:val("cmdOpenClientAdr"),email:val("cmdOpenClientEmail"),tel:val("cmdOpenClientTel")};
  c.client=c.clientObj.nom; c.montant=totals(c.lignes||[],state.settings.partService).total;
  c.label=(c.lignes||[]).map(function(l){return (num(l.qte)>1?l.qte+" x ":"")+l.designation;}).filter(function(x){return x.trim();}).join(" · ") || "Commande";
  var f=c.factureId?state.factures.find(function(x){return x.id===c.factureId;}):null;
  if(f){ var t=totals(c.lignes||[],state.settings.partService); f.date=c.dateCommande; f.echeance=addDays(c.dateCommande,state.settings.delaiPaiement); f.client=c.clientObj; f.lignes=(c.lignes||[]).map(function(l){return Object.assign({},l);}); f.notes=c.notes; f.montantBiens=t.biens; f.montantServices=t.services; f.montant=t.total; }
}
function lierFactureACommande(devisId, facture){
  if(!devisId||!facture) return;
  var c=state.commandes.find(function(x){return x.devisId===devisId;});
  if(c){
    c.factureId=facture.id;
    c.historique=c.historique||[];
    if(!c.historique.some(function(h){return (h.texte||"").indexOf(facture.numero)>=0;})){
      c.historique.unshift({date:todayISO(),texte:"Facture "+facture.numero+" liée à la commande."});
    }
  }
}
function factureHeriteInfosDevis(d,f){
  if(!d || !f) return f;
  if(d.origine==="atelier" || d.atelierId){
    f.origine="atelier";
    f.atelierId=d.atelierId||f.atelierId||"";
    f.atelierMode=d.atelierMode||f.atelierMode||"";
    f.atelierType=d.atelierType||f.atelierType||"";
    f.atelierTheme=d.atelierTheme||f.atelierTheme||"";
    f.atelierDate=d.atelierDate||f.atelierDate||"";
  }
  return f;
}
function creerAcompte(d){
  var t=totals(d.lignes,state.settings.partService), p=state.settings.acompteParDefaut, date=todayISO();
  var mb=r2(p/100*t.biens), ms=r2(p/100*t.services);
  var f={ id:uid(), numero:prochainNumero("facture"), type:"acompte", pourcentage:p, date:date, echeance:addDays(date,state.settings.delaiPaiement),
    devisId:d.id, devisNumero:d.numero, devisTotal:t.total, client:d.client, lignes:(d.lignes||[]).map(function(l){return Object.assign({},l);}), montantBiens:mb, montantServices:ms, montant:r2(mb+ms), statut:"a_envoyer", paiementClient:"", datePaiement:null, origine:"devis", choixFacturation:true };
  factureHeriteInfosDevis(d,f);
  state.factures.unshift(f);
  lierFactureACommande(d.id, f);
  return f;
}
function creerSolde(d){
  var t=totals(d.lignes,state.settings.partService); var ac=facturesDuDevis(d.id).find(function(f){return f.type==="acompte";}); if(!ac)return null;
  var date=todayISO(), mb=r2(t.biens-ac.montantBiens), ms=r2(t.services-ac.montantServices);
  var f={ id:uid(), numero:prochainNumero("facture"), type:"solde", date:date, echeance:addDays(date,state.settings.delaiPaiement),
    devisId:d.id, devisNumero:d.numero, client:d.client, lignes:(d.lignes||[]).map(function(l){return Object.assign({},l);}), acompteNumero:ac.numero, acompteMontant:ac.montant, montantBiens:mb, montantServices:ms, montant:r2(mb+ms), statut:"a_envoyer", paiementClient:"", datePaiement:null, origine:"devis", choixFacturation:true };
  factureHeriteInfosDevis(d,f);
  state.factures.unshift(f);
  lierFactureACommande(d.id, f);
  return f;
}
function creerTotale(d){
  var t=totals(d.lignes,state.settings.partService), date=todayISO();
  var f={ id:uid(), numero:prochainNumero("facture"), type:"totale", date:date, echeance:addDays(date,state.settings.delaiPaiement),
    devisId:d.id, devisNumero:d.numero, client:d.client, lignes:(d.lignes||[]).map(function(l){return Object.assign({},l);}), montantBiens:t.biens, montantServices:t.services, montant:t.total, statut:"a_envoyer", paiementClient:"", datePaiement:null, origine:"devis", choixFacturation:true };
  factureHeriteInfosDevis(d,f);
  state.factures.unshift(f);
  lierFactureACommande(d.id, f);
  return f;
}
function commandeExistePourDevis(devisId){ return state.commandes.some(function(c){return c.devisId===devisId;}); }
function mariageLieADevis(devisId){ return state.mariages.find(function(m){return m.devisLie===devisId;}); }
function commandeLieeMariage(c){ return !!(c && (c.mariageId || (c.devisId && mariageLieADevis(c.devisId)))); }
function creerCommandeDepuisDevis(d, facture){
  if(!d || commandeExistePourDevis(d.id)) return null;
  var lignes=(d.lignes||[]).map(function(l){return Object.assign({},l);});
  var t=totals(lignes,state.settings.partService);
  var label=lignes.map(function(l){return (num(l.qte)>1?l.qte+" x ":"")+l.designation;}).filter(function(x){return x.trim();}).join(" · ") || "Commande depuis devis "+d.numero;
  var mariage=mariageLieADevis(d.id);
  var c={ id:uid(), label:label, client:d.client&&d.client.nom?d.client.nom:"", clientObj:Object.assign({},d.client||{}), dateCommande:todayISO(), dateLivraison:"", fait:false, createdAt:todayISO(), devisId:d.id, devisNumero:d.numero, mariageId:mariage?mariage.id:null, origine:mariage?"mariage":"devis", factureId:facture?facture.id:null, montant:t.total, lignes:lignes, notes:d.notes||"", historique:[{date:todayISO(),texte:"Commande créée depuis le devis "+d.numero+(facture?" et liée à la facture "+facture.numero:".")}] };
  state.commandes.unshift(c);
  return c;
}
function validerDevisEtCreerSuivi(d){
  if(!d) return null;
  d.statut="accepte";
  // Important : l'acceptation d'un devis ne crée PLUS automatiquement de facture.
  // Elle crée seulement la commande / le suivi à préparer.
  // La facture est créée ensuite au choix : acompte 30 % ou facture complète.
  var commande=creerCommandeDepuisDevis(d, null);
  var mariage=state.mariages.find(function(m){return m.devisLie===d.id;});
  if(mariage){
    mariage.devisEnvoye=true;
    if(!mariage.devisDate) mariage.devisDate=todayISO();
    if(mariage.statut==="contact"||mariage.statut==="devis_envoye") mariage.statut="devis_accepte";
  }
  return {facture:null, commande:commande};
}

/* ===================== Catalogue ===================== */
function viewCatalogue(){
  var html='<h2 style="margin-top:0;">Catalogue</h2><p class="muted" style="margin-top:-6px;">Vos bouquets, accessoires (biens) et ateliers/animations (services). En un clic dans vos devis.</p>'+
  '<div class="card">'+
    '<label class="field"><span>Désignation</span><input id="catNom" placeholder="Ex : Bouquet de mariée fleurs séchées"></label>'+
    '<div class="inline"><div><label class="field"><span>Type</span><select id="catType"><option value="bien">Bien (bouquet, accessoire…)</option><option value="service">Service (atelier, animation…)</option></select></label></div>'+
    '<div style="max-width:140px;"><label class="field"><span>Prix (€)</span><input id="catPrix" type="number" min="0" step="0.01"></label></div></div>'+
    '<button class="btn primary" data-action="cat-add">+ Ajouter au catalogue</button></div>';
  if(state.catalogue.length===0) html+='<div class="card"><p class="muted" style="margin:0;">Votre catalogue est vide. Ajoutez votre premier article.</p></div>';
  state.catalogue.forEach(function(c){
    html+='<div class="card flexb"><div><div style="font-weight:600;">'+esc(c.designation)+'</div><div class="muted">'+euro(c.prix)+' · <span class="badge" style="color:'+(c.type==="service"?"var(--green)":"var(--bordeaux)")+';background:'+(c.type==="service"?"var(--green-s)":"var(--blush-s)")+';">'+(c.type==="service"?"service":"bien")+'</span></div></div>'+
      '<button class="btn small danger" data-action="cat-del-'+c.id+'">Supprimer</button></div>';
  });
  return html;
}

/* ===================== Clients ===================== */
function normName(s){ return (s||"").toString().trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," "); }
function sortedClients(){
  return (state.clients||[]).slice().sort(function(a,b){
    return (a.nom||"").localeCompare((b.nom||""),"fr",{sensitivity:"base"});
  });
}
function clientHistory(nom){
  var c=(state.clients||[]).find(function(x){return clientNameMatches(nom,x.nom);}) || {nom:nom};
  return clientHistoriqueComplet(c).map(function(i){
    return {date:i.date,type:i.type,label:i.label,montant:i.montant,paid:i.paid};
  });
}
function clientCA(nom){
  var c=(state.clients||[]).find(function(x){return clientNameMatches(nom,x.nom);}) || {nom:nom};
  return clientStats(c).total;
}
function addClientFromForm(){
  state.clients = Array.isArray(state.clients) ? state.clients : [];
  var cn=val("cliNom").trim();
  if(!cn){ toast("Indique un nom de client."); return; }
  var existing=state.clients.find(function(c){ return normName(c.nom)===normName(cn); });
  if(existing){
    ui.clientOpen=existing.id;
    toast("Cette fiche existe déjà : ouverture de la fiche.");
    render();
    window.scrollTo(0,0);
    return;
  }
  state.clients.push({
    id:uid(),
    nom:cn,
    adresse:val("cliAdr"),
    email:val("cliEmail"),
    tel:val("cliTel"),
    canal:val("cliCanal"),
    anniversaire:val("cliAnniv"),
    notes:val("cliNotes"),
    createdAt:todayISO()
  });
  saveCache();
  render();
  toast("Client ajouté.");
}
function viewClients(){
  if(ui.clientOpen) return viewClientDetail(state.clients.find(function(c){return c.id===ui.clientOpen;}));
  var html='<div class="flexb" style="margin-bottom:14px;"><h2 style="margin:0;">Clients</h2><span class="muted">Suivi client</span></div>'+
    '<div class="card">'+
    '<label class="field"><span>Nom</span><input id="cliNom"></label>'+
    '<label class="field"><span>Adresse</span><input id="cliAdr"></label>'+
    '<div class="inline"><div><label class="field"><span>Email</span><input id="cliEmail"></label></div>'+
    '<div><label class="field"><span>Téléphone</span><input id="cliTel"></label></div></div>'+
    '<div class="inline"><div><label class="field"><span>Canal de communication préféré</span><select id="cliCanal">'+commOptions("")+'</select></label></div>'+
    '<div><label class="field"><span>Anniversaire</span><input id="cliAnniv" type="date"></label></div></div>'+
    '<label class="field"><span>Notes privées</span><textarea id="cliNotes" placeholder="Préférences, infos importantes…"></textarea></label>'+
    '<button id="cliAddBtn" type="button" class="btn primary" data-action="cli-add">+ Ajouter le client</button></div>';
  if(state.clients.length===0){ html+='<div class="card"><p class="muted" style="margin:0;">Pas encore de client. Ils s’ajoutent ici, automatiquement lors d’un devis, ou à l’import de ton historique.</p></div>'; return html; }

  var top=topClientsCRM(5);
  if(top.length){
    html+='<div class="card"><h3 style="margin:0 0 10px;">Top clientes</h3>';
    top.forEach(function(x){ html+='<div class="checkrow"><div style="flex:1;"><b style="color:var(--bordeaux);">'+esc(x.c.nom)+'</b><div class="muted" style="font-size:12px;">'+x.nb+' achat(s) '+(x.badges.length?' · '+x.badges.join(" "):'')+'</div></div><b>'+euro(x.total)+'</b></div>'; });
    html+='</div>';
  }

  var list=state.clients.slice().sort(function(a,b){ return normName(a.nom)<normName(b.nom)?-1:1; });
  html+='<p class="muted">'+list.length+' cliente'+(list.length>1?"s":"")+'. Touche une fiche pour voir son historique, ses statistiques et ses badges.</p>';
  list.forEach(function(c){
    var st=clientStats(c);
    html+='<div class="card flexb"><button data-action="cli-open-'+c.id+'" style="border:none;background:none;text-align:left;cursor:pointer;font-family:inherit;padding:0;flex:1;">'+
      '<div style="font-weight:700;color:var(--bordeaux);">'+esc(c.nom)+' →</div>'+
      '<div class="muted">'+st.nb+' achat'+(st.nb>1?'s':'')+(st.total>0?' · '+euro(st.total)+' encaissé':'')+(c.canal?' · Canal : '+esc(c.canal):'')+'</div>'+
      (st.badges.length?'<div style="margin-top:5px;">'+st.badges.map(function(b){return '<span class="chip">'+esc(b)+'</span>';}).join(" ")+'</div>':'')+
      '</button><button class="btn small danger" data-action="cli-del-'+c.id+'">×</button></div>';
  });
  return html;
}
function viewClientDetail(c){
  if(!c){ ui.clientOpen=null; return viewClients(); }
  var st=clientStats(c);
  var html='<div class="card"><div class="flexb" style="margin-bottom:6px;"><h2 style="margin:0;">'+esc(c.nom)+'</h2><button class="btn small ghost" data-action="cli-back">← Liste</button></div>'+
    (st.badges.length?'<div style="margin-bottom:10px;">'+st.badges.map(function(b){return '<span class="chip">'+esc(b)+'</span>';}).join(" ")+'</div>':'')+
    '<div class="grid-stats">'+
      stat("Total dépensé",euro(st.total),false)+
      stat("Nombre d’achats",st.nb,false)+
      stat("Panier moyen",euro(st.panier),false)+
      stat("Paiement habituel",esc(st.paiementHabituel),false)+
    '</div>'+
    '<div class="inline"><div><label class="field"><span>Email</span><input id="cdEmail" value="'+esc(c.email||"")+'"></label></div>'+
    '<div><label class="field"><span>Téléphone</span><input id="cdTel" value="'+esc(c.tel||"")+'"></label></div></div>'+
    '<label class="field"><span>Adresse</span><input id="cdAdr" value="'+esc(c.adresse||"")+'"></label>'+
    '<div class="inline"><div><label class="field"><span>Canal de communication préféré</span><select id="cdCanal">'+commOptions(c.canal||"")+'</select></label></div>'+
    '<div><label class="field"><span>Anniversaire</span><input id="cdAnniv" type="date" value="'+esc(c.anniversaire||"")+'"></label></div></div>'+
    '<label class="field"><span>Notes privées</span><textarea id="cdNotes" placeholder="Préférences, infos importantes, relances…">'+esc(c.notes||"")+'</textarea></label>'+
    '<div class="muted" style="font-size:12px;margin-bottom:10px;">'+
      (st.first?'Première commande : '+frDate(st.first):'Première commande : —')+
      (st.last?' · Dernière commande : '+frDate(st.last):'')+
    '</div>'+
    '<button class="btn gold" data-action="cli-savecontact-'+c.id+'">Enregistrer le contact</button></div>';

  html+='<div class="card"><div class="flexb" style="margin-bottom:8px;"><h3 style="margin:0;">Timeline complète</h3><span class="muted">'+st.historique.length+' événement(s)</span></div>'+
    clientTimelineHTML(c)+'</div>';
  html+='<div class="row-actions"><button class="btn danger" data-action="cli-del-'+c.id+'">Supprimer la fiche</button></div>';
  return html;
}


/* ===================== Historique emails ===================== */
function viewEmails(){
  var list=(state.emails||[]).slice().sort(function(a,b){ return (b.sentAt||"").localeCompare(a.sentAt||""); });
  var html='<div class="flexb" style="margin-bottom:14px;"><h2 style="margin:0;">Historique des emails</h2>'+
    '<span class="muted">'+list.length+' email'+(list.length>1?'s':'')+' envoyé'+(list.length>1?'s':'')+'</span></div>'+
    '<p class="muted" style="margin-top:-8px;">Retrouve ici tous les devis et factures envoyés par email depuis l’application.</p>';
  if(!list.length){
    return html+'<div class="card"><p class="muted" style="margin:0;">Aucun email envoyé pour le moment.</p></div>';
  }
  html+='<div class="card">';
  list.forEach(function(e){
    var isDevis=e.kind==="devis";
    var doc=isDevis?findDevis(e.docId):state.factures.find(function(f){return f.id===e.docId;});
    var pill=isDevis?'Devis':'Facture';
    var sentDate=e.sentAt?new Date(e.sentAt).toLocaleString("fr-FR"):"—";
    html+='<div class="checkrow" style="align-items:flex-start;">'+
      '<div style="flex:1;">'+
        '<div><span class="pill" style="background:'+(isDevis?'var(--blush-s)':'var(--green-s)')+';color:'+(isDevis?'var(--bordeaux)':'var(--green)')+';">'+pill+'</span> '+
        '<b style="color:var(--bordeaux);">'+esc(e.numero||"")+'</b> <span class="muted">· '+esc(e.client||"Client")+'</span></div>'+
        '<div class="muted" style="font-size:12px;margin-top:3px;">Envoyé le '+esc(sentDate)+' à '+esc(e.email||"")+'</div>'+
        '<div class="muted" style="font-size:12px;">Objet : '+esc(e.sujet||"")+'</div>'+
        (e.montant!=null?'<div class="muted" style="font-size:12px;">Montant : '+euro(e.montant)+'</div>':'')+
      '</div>'+
      '<div class="row-actions" style="margin-top:0;">'+
        (doc?'<button class="btn small ghost" data-action="email-preview-'+(isDevis?'devis':'facture')+'-'+e.docId+'">Voir le document</button>':'<span class="muted" style="font-size:12px;">Document supprimé</span>')+
      '</div>'+
    '</div>';
  });
  html+='</div>';
  html+='<div class="card"><h3 style="margin:0 0 8px;">À savoir</h3><p class="muted" style="margin:0;">Cet historique confirme les envois réalisés depuis l’application. Il est sauvegardé avec Firebase, dans les sauvegardes JSON et dans les sauvegardes Google Drive.</p></div>';
  return html;
}

/* ===================== Paramètres ===================== */
function prestationTypeOptions(selected){
  selected=selected||"service";
  return '<option value="service"'+(selected==="service"?' selected':'')+'>Prestation de services</option>'+ 
    '<option value="bien"'+(selected==="bien"?' selected':'')+'>Vente de biens</option>';
}
function prestationsSettingsFromDOM(){
  var rows=document.querySelectorAll('[data-param-prestation-row]'), out=[];
  rows.forEach(function(row){
    var id=row.getAttribute('data-param-prestation-row')||uid();
    var label=(row.querySelector('[data-param-prestation-field="label"]')||{}).value||"";
    var type=(row.querySelector('[data-param-prestation-field="type"]')||{}).value||"service";
    var qte=num((row.querySelector('[data-param-prestation-field="qte"]')||{}).value)||1;
    var prix=num((row.querySelector('[data-param-prestation-field="prix"]')||{}).value);
    var actifInput=row.querySelector('[data-param-prestation-field="actif"]');
    var actif=actifInput?!!actifInput.checked:true;
    if(label.trim() || prix>0){ out.push({id:id,label:label.trim()||"Prestation",type:type==="bien"?"bien":"service",qte:qte,prix:prix,actif:actif}); }
  });
  return out.length?out:DEFAULT_PRESTATIONS_BIBLIOTHEQUE.map(function(p){ return Object.assign({},p); });
}
function captureParamsForm(){
  var s=state.settings;
  if(!document.getElementById("pNom")) return;
  s.nomEntreprise=val("pNom"); s.entrepreneur=val("pEnt"); s.adresse=val("pAdr"); s.siret=val("pSiret");
  s.tel=val("pTel"); s.email=val("pEmail"); s.site=val("pSite"); s.iban=val("pIban"); s.bic=val("pBic");
  s.mentionTVA=val("pTva"); s.conditionsReglement=val("pCond"); s.penalites=val("pPen");
  s.acompteParDefaut=num(val("pAcompte")); s.validiteDevis=num(val("pValid")); s.delaiPaiement=num(val("pDelai"));
  s.seuilBiens=num(val("pSeuilB")); s.seuilServices=num(val("pSeuilS")); s.tauxCotisBiens=num(val("pTauxB")); s.tauxCotisServices=num(val("pTauxS"));
  s.partService=num(val("pPartService"));
  s.kmOfferts=num(val("pKmOfferts")); s.tarifKm=num(val("pTarifKm"));
  var dar=document.getElementById("pDeplacementAllerRetour"); s.deplacementAllerRetour=!!(dar&&dar.checked);
  s.mailObjetDevis=val("pMailObjetDevis"); s.mailObjetFacture=val("pMailObjetFacture");
  s.mailMessageDevis=val("pMailMessageDevis"); s.mailMessageFacture=val("pMailMessageFacture"); s.mailMessageRelance=val("pMailMessageRelance");
  s.googleDriveUrl=val("pGoogleDriveUrl");
  var gda=document.getElementById("pGoogleDriveAuto"); s.googleDriveAuto=!!(gda&&gda.checked);
  s.prestationsBibliotheque=prestationsSettingsFromDOM();
}
function viewPrestationsBibliothequeSettings(){
  var list=prestationBibliothequeNormalisee();
  var html='<div class="card"><div class="flexb"><div><h3 style="margin:0 0 4px;">Bibliothèque de prestations</h3>'+ 
    '<p class="muted" style="margin:0;font-size:12px;">Ces lignes rapides seront proposées dans les prestations complémentaires des ateliers et des mariages. Les catégories restent internes et ne s’affichent pas sur les devis/factures client.</p></div>'+ 
    '<button class="btn small primary" data-action="params-prestation-add">+ Ajouter une prestation</button></div>';
  html+='<div class="scroll" style="margin-top:12px;"><table><thead><tr style="text-align:left;color:var(--ink-s);font-size:12px;"><th style="padding:6px;">Actif</th><th style="padding:6px;">Libellé</th><th style="padding:6px;">Catégorie interne</th><th style="padding:6px;width:85px;">Qté</th><th style="padding:6px;width:120px;">Prix par défaut</th><th style="padding:6px;width:40px;"></th></tr></thead><tbody>';
  list.forEach(function(p){
    html+='<tr data-param-prestation-row="'+esc(p.id)+'" style="border-top:1px solid var(--line);">'+
      '<td style="padding:6px;text-align:center;"><input data-param-prestation-field="actif" type="checkbox" '+(p.actif?'checked':'')+' style="width:18px;height:18px;"></td>'+
      '<td style="padding:6px;"><input data-param-prestation-field="label" value="'+esc(p.label)+'" placeholder="Ex : Frais de déplacement"></td>'+ 
      '<td style="padding:6px;"><select data-param-prestation-field="type">'+prestationTypeOptions(p.type)+'</select></td>'+ 
      '<td style="padding:6px;"><input data-param-prestation-field="qte" type="number" min="0" step="1" value="'+esc(p.qte||1)+'"></td>'+ 
      '<td style="padding:6px;"><input data-param-prestation-field="prix" type="number" min="0" step="0.01" value="'+esc(p.prix||0)+'"></td>'+ 
      '<td style="padding:6px;text-align:center;"><button data-action="params-prestation-del-'+esc(p.id)+'" style="border:none;background:none;color:#9b3b3b;cursor:pointer;font-size:18px;">×</button></td>'+ 
    '</tr>';
  });
  html+='</tbody></table></div>'+ 
    '<p class="muted" style="margin:10px 0 0;font-size:12px;">Exemples : frais de déplacement en service, pack premium en bien, personnalisation en service. Tu peux mettre un prix par défaut ou laisser à 0 € pour le saisir au cas par cas.</p></div>';
  return html;
}
function calculFraisDeplacement(km){
  var s=state.settings||{};
  var distance=Math.max(0,num(km));
  var facturable=Math.max(0,distance-num(s.kmOfferts));
  var trajet=s.deplacementAllerRetour===false?1:2;
  return r2(facturable*num(s.tarifKm)*trajet);
}
function viewDeplacementSettings(){
  var s=state.settings||{};
  var exemple=calculFraisDeplacement(35);
  return '<div class="card"><h3 style="margin:0 0 4px;">Déplacements</h3>'+ 
    '<p class="muted" style="margin-top:0;font-size:12px;">Ces réglages serviront au calcul automatique des frais de déplacement. Pour l’instant, ils sont centralisés ici et prêts à être branchés aux devis ateliers.</p>'+ 
    '<div class="inline"><div>'+ 
      '<label class="field"><span>Kilomètres offerts</span><input id="pKmOfferts" type="number" min="0" step="1" value="'+esc(s.kmOfferts==null?20:s.kmOfferts)+'"><span class="hint">Ex : 20 km offerts.</span></label>'+ 
    '</div><div>'+ 
      '<label class="field"><span>Tarif au km</span><input id="pTarifKm" type="number" min="0" step="0.01" value="'+esc(s.tarifKm==null?0.60:s.tarifKm)+'"><span class="hint">Ex : 0,60 € / km.</span></label>'+ 
    '</div></div>'+ 
    '<label style="display:flex;gap:8px;align-items:center;margin:4px 0 10px;"><input type="checkbox" id="pDeplacementAllerRetour" '+(s.deplacementAllerRetour!==false?'checked':'')+' style="width:18px;height:18px;"> Calculer en aller-retour</label>'+ 
    '<div class="summary" style="margin-bottom:0;font-size:12px;">Exemple avec 35 km : '+euro(exemple)+' de frais de déplacement avec les réglages actuels.</div>'+ 
  '</div>';
}
function viewMailTemplatesSettings(){
  var s=state.settings||{};
  return '<div class="card"><h3 style="margin:0 0 4px;">Modèles de mails</h3>'+ 
    '<p class="muted" style="margin-top:0;font-size:12px;">Ces textes seront utilisés lors de l’envoi des devis et factures par email. Variables possibles : {client}, {numero}, {type}, {montant}, {date}, {entreprise}.</p>'+ 
    '<label class="field"><span>Objet mail devis</span><input id="pMailObjetDevis" value="'+esc(s.mailObjetDevis||DEFAULT_SETTINGS.mailObjetDevis)+'"></label>'+ 
    '<label class="field"><span>Message mail devis</span><textarea id="pMailMessageDevis" style="min-height:150px;">'+esc(s.mailMessageDevis||DEFAULT_SETTINGS.mailMessageDevis)+'</textarea></label>'+ 
    '<label class="field"><span>Objet mail facture</span><input id="pMailObjetFacture" value="'+esc(s.mailObjetFacture||DEFAULT_SETTINGS.mailObjetFacture)+'"></label>'+ 
    '<label class="field"><span>Message mail facture</span><textarea id="pMailMessageFacture" style="min-height:150px;">'+esc(s.mailMessageFacture||DEFAULT_SETTINGS.mailMessageFacture)+'</textarea></label>'+ 
    '<label class="field"><span>Modèle de relance devis</span><textarea id="pMailMessageRelance" style="min-height:100px;">'+esc(s.mailMessageRelance||DEFAULT_SETTINGS.mailMessageRelance)+'</textarea><span class="hint">Ce modèle est sauvegardé pour la future fonction de relance automatique.</span></label>'+ 
  '</div>';
}
function viewAboutAppSettings(){
  var changes=(APP_CHANGELOG||[]).slice(0,6).map(function(item){ return '<li>'+esc(item)+'</li>'; }).join('');
  var road=(APP_ROADMAP||[]).map(function(item){ return '<li>'+esc(item)+'</li>'; }).join('');
  return '<div class="card"><div class="flexb" style="align-items:flex-start;">'+
    '<div><h3 style="margin:0 0 6px;">À propos de l’application</h3><p class="muted" style="margin:0;font-size:12px;">Journal technique déplacé ici pour garder le tableau de bord clair.</p></div>'+ 
    '<span class="pill" style="background:var(--green-s);color:var(--green);">'+esc(APP_VERSION)+'</span></div>'+ 
    '<p class="muted" style="font-size:12px;margin:10px 0 0;">'+esc(APP_VERSION_NOTE)+'</p>'+ 
    '<details style="margin-top:10px;"><summary style="cursor:pointer;color:var(--bordeaux);font-weight:700;">Voir les modifications récentes</summary><ul style="margin:8px 0 0 18px;padding:0;font-size:13px;line-height:1.6;">'+changes+'</ul></details>'+ 
    '<details style="margin-top:10px;"><summary style="cursor:pointer;color:var(--bordeaux);font-weight:700;">Voir les prochaines étapes</summary><ul style="margin:8px 0 0 18px;padding:0;font-size:13px;line-height:1.6;">'+road+'</ul></details>'+ 
  '</div>';
}
function viewParams(){
  var s=state.settings, partB=Math.max(0,100-num(s.partService));
  var logoPrev = (state.logo&&state.logo.length>10) ? '<img src="'+state.logo+'" alt="logo" style="max-height:70px;max-width:180px;object-fit:contain;border:1px solid var(--line);border-radius:8px;padding:6px;background:#fff;">' : '<div style="width:120px;height:60px;border:1px dashed var(--line);border-radius:8px;display:grid;place-items:center;font-size:12px;color:var(--ink-s);">aucun logo</div>';
  function F(label,id,val,hint,type){ return '<label class="field"><span>'+esc(label)+'</span><input id="'+id+'" value="'+esc(val==null?"":val)+'"'+(type?' type="'+type+'"':"")+'>'+(hint?'<span class="hint">'+esc(hint)+'</span>':"")+'</label>'; }
  return '<h2 style="margin-top:0;">Paramètres</h2><p class="muted" style="margin-top:-6px;">Centre de réglages de l’ERP : entreprise, documents, déplacements, URSSAF, prestations et mails.</p>'+
  '<div class="summary"><b>V3.4.1 TEST</b> — Suivi mariages amélioré : étapes semi-automatiques et validation manuelle possible pour les anciens dossiers.</div>'+
  viewAboutAppSettings()+
  '<div class="card"><h3 style="margin:0 0 10px;">Sauvegarde & restauration</h3>'+
    '<p class="muted" style="margin-top:0;">Télécharge une copie complète de tes données, ou restaure une sauvegarde JSON en cas de besoin.</p>'+
    '<div class="row-actions" style="margin-top:0;"><button class="btn gold" data-action="cloud-backup">Télécharger une sauvegarde JSON</button>'+
    '<button class="btn danger" data-action="restore-pick">Restaurer une sauvegarde JSON</button></div>'+
    '<p class="muted" style="font-size:11px;margin:10px 0 0;">⚠️ La restauration remplace les données actuellement synchronisées dans Firebase. Avant restauration, garde toujours une sauvegarde récente.</p></div>'+
  '<div class="card"><h3 style="margin:0 0 10px;">Sauvegarde automatique Google Drive</h3>'+
    '<p class="muted" style="margin-top:0;">Colle ici l’URL de ton script Google Apps Script. L’application pourra créer une sauvegarde JSON dans ton Google Drive.</p>'+
    '<label class="field"><span>URL du script Google Drive</span><input id="pGoogleDriveUrl" value="'+esc(s.googleDriveUrl||"")+'" placeholder="https://script.google.com/macros/s/.../exec"></label>'+
    '<label style="display:flex;gap:8px;align-items:center;margin:8px 0 12px;"><input type="checkbox" id="pGoogleDriveAuto" '+(s.googleDriveAuto?'checked':'')+' style="width:18px;height:18px;"> Activer une sauvegarde automatique quotidienne dans Google Drive (une seule par jour)</label>'+
    '<div class="row-actions" style="margin-top:0;"><button class="btn gold" data-action="gdrive-save">Enregistrer l’URL Google Drive</button><button class="btn primary" data-action="gdrive-backup">Tester / créer une sauvegarde Google Drive</button><button class="btn danger" data-action="gdrive-restore-latest">Restaurer la dernière sauvegarde Google Drive</button></div>'+
    '<p class="muted" style="font-size:11px;margin:10px 0 0;">'+esc(googleDriveStatusText())+'</p></div>'+
  '<div class="card"><h3 style="margin:0 0 10px;">Logo</h3><div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">'+logoPrev+
    '<div class="row-actions" style="margin:0;"><button class="btn primary" data-action="logo-pick">Choisir une image</button>'+
    (state.logo&&state.logo.length>10?'<button class="btn danger" data-action="logo-remove">Retirer</button>':'')+'</div></div>'+
    '<p class="hint" style="margin-top:10px;">S\'affiche en haut des documents (PNG transparent idéal).</p></div>'+
  '<div class="card"><h3 style="margin:0 0 4px;">Répartition des ateliers</h3><p class="muted" style="margin-top:0;font-size:12px;">Pour chaque <b>service</b>, le prix est ventilé : prestation de services + vente de biens (matériel emporté). Le total facturé ne change pas.</p>'+
    '<div class="inline" style="align-items:flex-end;"><div style="max-width:160px;"><label class="field"><span>Part service (%)</span><input id="pPartService" type="number" min="0" max="100" value="'+esc(s.partService)+'"></label></div>'+
    '<div style="padding-bottom:12px;" class="muted">→ <b style="color:var(--bordeaux);">'+partB+' %</b> en vente de biens</div></div></div>'+
  viewDeplacementSettings()+
  '<div class="card"><h3 style="margin:0 0 10px;">Votre entreprise</h3>'+
    F("Nom de l'entreprise","pNom",s.nomEntreprise)+F("Votre nom (entrepreneur individuel)","pEnt",s.entrepreneur)+
    F("Adresse","pAdr",s.adresse)+F("SIRET","pSiret",s.siret,"Obligatoire sur les factures.")+
    '<div class="inline"><div>'+F("Téléphone","pTel",s.tel)+'</div><div>'+F("Email","pEmail",s.email)+'</div></div>'+F("Site web","pSite",s.site)+'</div>'+
  '<div class="card"><h3 style="margin:0 0 10px;">Paiement & mentions</h3>'+
    '<div class="inline"><div style="flex:2;">'+F("IBAN","pIban",s.iban)+'</div><div>'+F("BIC","pBic",s.bic)+'</div></div>'+
    F("Mention TVA","pTva",s.mentionTVA)+F("Conditions de règlement","pCond",s.conditionsReglement)+
    '<label class="field"><span>Mentions de pénalités (factures)</span><textarea id="pPen">'+esc(s.penalites)+'</textarea></label>'+
    '<div class="inline"><div>'+F("Acompte par défaut (%)","pAcompte",s.acompteParDefaut,"","number")+'</div><div>'+F("Validité devis (jours)","pValid",s.validiteDevis,"","number")+'</div><div>'+F("Délai paiement (jours)","pDelai",s.delaiPaiement,"","number")+'</div></div></div>'+
  viewMailTemplatesSettings()+
  '<div class="card"><h3 style="margin:0 0 4px;">Seuils & cotisations (indicatifs)</h3><p class="muted" style="margin-top:0;font-size:12px;">À confirmer auprès de l\'URSSAF — ils évoluent chaque année.</p>'+
    '<div class="inline"><div>'+F("Seuil biens (€)","pSeuilB",s.seuilBiens,"","number")+'</div><div>'+F("Seuil services (€)","pSeuilS",s.seuilServices,"","number")+'</div></div>'+
    '<div class="inline"><div>'+F("Taux cotis. biens (%)","pTauxB",s.tauxCotisBiens,"","number")+'</div><div>'+F("Taux cotis. services (%)","pTauxS",s.tauxCotisServices,"","number")+'</div></div></div>'+
  viewPrestationsBibliothequeSettings()+
  '<button class="btn gold" data-action="params-save">Enregistrer les paramètres</button>';
}

/* ===================== Document (devis / facture) ===================== */
function viewDoc(p){
  var s=state.settings, doc=p.doc, kind=p.kind, t=totals(doc.lignes,s.partService);
  var titre = kind==="devis" ? "DEVIS N° "+esc(doc.numero) : TYPE_FAC[doc.type].toUpperCase()+" N° "+esc(doc.numero);
  var emetteur='<div class="serif" style="font-size:19px;color:var(--bordeaux);font-weight:700;">'+esc(s.nomEntreprise)+'</div>'+
    '<div class="muted" style="font-size:10.5px;margin-top:3px;">'+
    (s.entrepreneur?'<div>'+esc(s.entrepreneur)+' — Entrepreneur individuel (EI)</div>':'')+
    (s.adresse?'<div>'+esc(s.adresse)+'</div>':'')+(s.tel?'<div>Tél : '+esc(s.tel)+'</div>':'')+
    (s.email?'<div>'+esc(s.email)+'</div>':'')+(s.site?'<div>'+esc(s.site)+'</div>':'')+(s.siret?'<div>SIRET : '+esc(s.siret)+'</div>':'')+'</div>';
  var logoImg=(state.logo&&state.logo.length>10)?'<img src="'+state.logo+'" alt="logo" style="max-height:52px;max-width:150px;object-fit:contain;display:block;margin-bottom:8px;">':'';
  var rightInfo='<div class="serif" style="font-size:16px;color:var(--bordeaux);font-weight:700;">'+titre+'</div>'+
    '<div class="muted" style="font-size:12px;margin-top:4px;">Date : '+frDate(doc.date)+'</div>'+
    (kind==="devis"?'<div class="muted" style="font-size:12px;">Valable jusqu\'au : '+frDate(doc.validite)+'</div>':'')+
    (kind==="facture"&&doc.echeance?'<div class="muted" style="font-size:12px;">Échéance : '+frDate(doc.echeance)+'</div>':'')+
    (kind==="facture"&&doc.devisNumero?'<div class="muted" style="font-size:12px;">Réf. devis : '+esc(doc.devisNumero)+'</div>':'')+
    (kind==="facture"&&doc.paiementClient?'<div class="muted" style="font-size:12px;">Moyen de paiement : '+esc(doc.paiementClient)+'</div>':'');
  var client='<div style="margin-top:12px;padding:9px;background:var(--cream);border-radius:8px;max-width:280px;margin-left:auto;">'+
    '<div class="muted" style="font-size:11px;font-weight:700;text-transform:uppercase;">Client</div>'+
    '<div style="font-weight:600;">'+esc(doc.client&&doc.client.nom)+'</div>'+
    (doc.client&&doc.client.adresse?'<div style="font-size:12px;">'+esc(doc.client.adresse)+'</div>':'')+
    (doc.client&&doc.client.email?'<div style="font-size:12px;">'+esc(doc.client.email)+'</div>':'')+
    (doc.client&&doc.client.tel?'<div style="font-size:12px;">'+esc(doc.client.tel)+'</div>':'')+'</div>';
  var acEncart = (kind==="facture"&&doc.type==="acompte")?'<div style="margin-top:20px;padding:12px;border:1px solid var(--line);border-radius:8px;">Acompte de '+doc.pourcentage+' % sur le devis '+esc(doc.devisNumero)+' d\'un montant total de <b>'+euro(doc.devisTotal)+'</b>.</div>':'';
  var rows=doc.lignes.map(function(l){ return '<tr style="border-bottom:1px solid var(--line);"><td style="padding:6px;overflow-wrap:break-word;word-break:normal;">'+esc(l.designation)+'</td><td style="text-align:center;padding:6px;">'+esc(l.qte)+'</td><td style="text-align:right;padding:6px;">'+euro(l.prix)+'</td><td style="text-align:right;padding:6px;">'+euro(num(l.qte)*num(l.prix))+'</td></tr>'; }).join("");
  function tr(l,v,strong,soft){ return '<div class="totrow" style="font-size:'+(strong?14:12)+'px;font-weight:'+(strong?700:400)+';color:'+(strong?"var(--bordeaux)":soft?"var(--ink-s)":"var(--ink)")+';'+(strong?"border-top:2px solid var(--bordeaux);":"")+'"><span>'+esc(l)+'</span><span>'+v+'</span></div>'; }
  var tot='<div style="display:flex;justify-content:flex-end;margin-top:8px;"><div style="min-width:280px;">'+
    tr("Total",euro(doc.totalInitial||t.total))+tr(s.mentionTVA,"—",false,true)+
    (kind==="facture"&&doc.remiseMontant?tr("Réduction","– "+euro(doc.remiseMontant),false,true):'')+
    (kind==="facture"&&doc.remiseMontant?tr("Total après réduction",euro(doc.totalApresRemise||((doc.totalInitial||t.total)-doc.remiseMontant)),false,false):'')+
    (kind==="facture"&&doc.type==="acompte"?tr("Acompte "+doc.pourcentage+" %",euro(doc.montant),true):'')+
    (kind==="facture"&&doc.type==="solde"?tr("Acompte déjà versé ("+(doc.acompteNumero||"")+")","– "+euro(doc.acompteMontant),false,true)+tr("Net à payer (solde)",euro(doc.montant),true):'')+
    (kind==="facture"&&doc.type==="totale"&&doc.acompteDejaPaye?tr("Acompte déjà payé","– "+euro(doc.acompteDejaPaye),false,true):'')+
    (kind==="facture"&&doc.type==="totale"?tr((doc.acompteDejaPaye?"Solde à payer":"Net à payer"),euro(doc.montant),true):'')+
    (kind==="devis"?tr("Net à payer",euro(t.total),true):'')+'</div></div>';
  var mentions='<div style="margin-top:12px;font-size:10.5px;color:var(--ink-s);">'+
    (doc.notes?'<p style="margin:0 0 8px;">'+esc(doc.notes)+'</p>':'')+
    '<p style="margin:0 0 6px;"><b>Conditions de règlement :</b> '+esc(s.conditionsReglement)+'</p>'+
    ((s.iban||s.bic)?'<p style="margin:0 0 6px;"><b>Règlement par virement :</b> '+(s.iban?"IBAN "+esc(s.iban):"")+' '+(s.bic?"· BIC "+esc(s.bic):"")+'</p>':'')+
    (kind==="facture"?'<p style="margin:0 0 6px;">'+esc(s.penalites)+'</p>':'')+
    '<p style="margin:0;">'+esc(s.mentionTVA)+'.</p></div>';
  var signature = kind==="devis" ? '<div style="margin-top:14px;font-size:10.5px;"><div style="font-weight:700;">Bon pour accord</div><div class="muted">Date et signature du client :</div><div style="margin-top:18px;border-top:1px solid var(--line);width:200px;"></div></div>' : '';
  return '<div class="modal" id="modal"><div class="modal-inner">'+
    '<div class="modal-actions"><button class="btn gold" data-action="doc-test-pdf-only">Télécharger PDF</button><button class="btn ghost" data-action="doc-print">Imprimer / Enregistrer en PDF</button><button class="btn primary" data-action="doc-email">Envoyer par email</button><button class="btn ghost" data-action="doc-close">Fermer</button></div>'+
    '<div class="doc" id="doc" style="width:160mm;max-width:160mm;box-sizing:border-box;overflow-wrap:break-word;word-break:normal;margin:0;">'+
      '<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;"><div>'+logoImg+emetteur+'</div><div style="text-align:right;">'+rightInfo+'</div></div>'+
      client+acEncart+
      '<table style="margin-top:12px;width:100%;table-layout:fixed;border-collapse:collapse;"><thead><tr style="font-size:11px;"><th style="text-align:left;padding:6px;width:48%;">Désignation</th><th style="text-align:center;padding:6px;width:45px;">Qté</th><th style="text-align:right;padding:6px;width:78px;">Prix unit.</th><th style="text-align:right;padding:6px;width:78px;">Total</th></tr></thead><tbody>'+rows+'</tbody></table>'+
      tot+mentions+signature+
    '</div></div></div>';
}

/* ===================== Export CSV ===================== */
function exportCSV(annee){
  var rows=[];
  state.factures.forEach(function(f){
    if(f.statut==="payee"&&f.datePaiement&&(annee==="all"||f.datePaiement.slice(0,4)===String(annee))){
      rows.push({date:f.datePaiement, source:"Facture", ref:f.numero||"", type:TYPE_FAC[f.type]||"Facture", client:(f.client&&f.client.nom)||"", montant:Number(f.montant)||0, biens:Number(f.montantBiens)||0, services:Number(f.montantServices)||0, paiement:f.paiementClient||""});
    }
  });
  state.encaissements.forEach(function(e){
    if(e.date&&(annee==="all"||e.date.slice(0,4)===String(annee))){
      var b=Number(e.montantBiens)||0, s=Number(e.montantServices)||0;
      rows.push({date:e.date, source:"Encaissement manuel", ref:"", type:e.libelle||"Encaissement", client:e.client||"", montant:r2(b+s), biens:r2(b), services:r2(s), paiement:e.paiement||""});
    }
  });
  (state.ventesSite||[]).forEach(function(s){
    if(s.date&&(annee==="all"||s.date.slice(0,4)===String(annee))){
      var sp=siteSaleSplit(s);
      rows.push({date:s.date, source:"Vente site internet", ref:s.commande||"", type:s.produit||s.activite||"Vente site", client:s.client||"", montant:sp.total, biens:sp.biens, services:sp.services, paiement:"Site internet"});
    }
  });
  rows.sort(function(a,b){return (a.date||"").localeCompare(b.date||"");});
  if(rows.length===0){ toast("Aucune vente encaissée pour cette période."); return; }
  var fmt=function(n){ return (Number(n)||0).toFixed(2).replace(".",","); };
  var q=function(s){ return '"'+String(s==null?"":s).replace(/"/g,'""')+'"'; };
  var L=[["Date encaissement","Source","Référence","Type / Libellé","Client","Total (€)","Vente de biens (€)","Prestations de services (€)","Paiement"].map(q).join(";")];
  rows.forEach(function(r){ L.push([frDate(r.date),r.source,r.ref,r.type,r.client,fmt(r.montant),fmt(r.biens),fmt(r.services),r.paiement].map(q).join(";")); });
  var tb=r2(rows.reduce(function(a,r){return a+(Number(r.biens)||0);},0)), ts=r2(rows.reduce(function(a,r){return a+(Number(r.services)||0);},0));
  L.push(""); L.push(["","","","","TOTAL",fmt(tb+ts),fmt(tb),fmt(ts),""].map(q).join(";"));
  var csv="\uFEFF"+L.join("\r\n");
  downloadJSON(csv, "declaration-ca-"+(annee==="all"?"toutes-annees":annee)+".csv");
  toast("Export déclaration prêt.");
}

/* ===================== Logo ===================== */
function onLogoFile(file){
  if(!file||!/^image\//.test(file.type)){ toast("Choisissez un fichier image."); return; }
  var r=new FileReader();
  r.onload=function(e){
    var img=new Image();
    img.onload=function(){
      var maxW=360,maxH=200, ratio=Math.min(maxW/img.width,maxH/img.height,1);
      var w=Math.round(img.width*ratio), h=Math.round(img.height*ratio);
      var c=document.createElement("canvas"); c.width=w; c.height=h; c.getContext("2d").drawImage(img,0,0,w,h);
      state.logo=c.toDataURL("image/png"); saveCache(); render();
    };
    img.src=e.target.result;
  };
  r.readAsDataURL(file);
}

/* ===================== Suivi mariages ===================== */
/* ===================== Encaissements (ventes directes + historique) ===================== */
function viewEncaissements(){
  var list=state.encaissements.slice().sort(function(a,b){ return (b.date||"").localeCompare(a.date||""); });
  var totB=r2(state.encaissements.reduce(function(s,e){return s+(e.montantBiens||0);},0));
  var totS=r2(state.encaissements.reduce(function(s,e){return s+(e.montantServices||0);},0));
  var html='<h2 style="margin-top:0;">Encaissements manuels</h2>'+
    '<p class="muted" style="margin-top:-6px;">Tes ventes encaissées <b>sans facture émise</b> (marché, boutique, atelier réglé sur place) et ton <b>historique</b>. Elles s\'ajoutent à ton CA, ventilées biens / services. Les clientes sont ajoutées automatiquement à ta base.</p>'+
    '<div class="card"><h3 style="margin:0 0 10px;">Importer mon historique (Excel → CSV)</h3>'+
      '<p class="muted" style="margin-top:0;">Depuis Excel : « Enregistrer sous » → <b>CSV (séparateur point-virgule)</b>, avec ces colonnes dans cet ordre :</p>'+
      '<div style="background:var(--cream);border-radius:8px;padding:8px 10px;font-size:12px;font-family:monospace;overflow-x:auto;">Date ; Libellé ; Montant biens ; Montant services ; Client</div>'+
      '<div class="muted" style="font-size:11px;margin:6px 0 10px;">Date au format JJ/MM/AAAA ou AAAA-MM-JJ. La colonne Client est facultative (mais utile pour l\'historique par cliente). Pour une ligne 100 % service, laisse la colonne biens vide (et inversement).</div>'+
      '<div class="row-actions" style="margin-top:0;"><button class="btn gold" data-action="enc-import">Importer un fichier CSV</button>'+
      '<button class="btn ghost" data-action="enc-template">Télécharger un modèle</button>'+
      (state.encaissements.some(function(e){return e.source==="import";})?'<button class="btn danger" data-action="enc-clearimport">Vider l\'import précédent</button>':'')+'</div></div>'+
    '<div class="card"><h3 style="margin:0 0 10px;">Ajouter une vente</h3>'+
      '<div class="inline"><div><label class="field"><span>Date</span><input id="encDate" type="date" value="'+esc(todayISO())+'"></label></div>'+
      '<div style="flex:2;"><label class="field"><span>Libellé</span><input id="encLib" placeholder="Ex : Vente bouquet boutique"></label></div></div>'+
      '<label class="field"><span>Cliente (facultatif)</span><input id="encClient" list="clientsList" placeholder="Nom de la cliente"></label>'+
      '<datalist id="clientsList">'+sortedClients().map(function(c){return '<option value="'+esc(c.nom)+'">';}).join("")+'</datalist>'+
      '<label class="field"><span>Moyen de paiement</span><select id="encPaiement">'+paymentOptions("")+'</select></label>'+
      '<div class="inline"><div><label class="field"><span>Montant biens (€)</span><input id="encBiens" type="number" min="0" step="0.01" placeholder="0"></label></div>'+
      '<div><label class="field"><span>Montant services (€)</span><input id="encServ" type="number" min="0" step="0.01" placeholder="0"></label></div></div>'+
      '<button id="encAddBtn" type="button" class="btn primary" data-action="enc-add">+ Ajouter au carnet</button></div>';
  if(list.length===0){ html+='<div class="card"><p class="muted" style="margin:0;">Aucun encaissement saisi. Importe ton historique ou ajoute une vente ci-dessus.</p></div>'; return html; }
  html+='<div class="card"><div class="flexb" style="margin-bottom:0;"><h3 style="margin:0;">'+list.length+' encaissement'+(list.length>1?"s":"")+'</h3><span class="muted">'+euro(totB)+' biens · '+euro(totS)+' services</span></div></div>';
  list.forEach(function(e){
    html+='<div class="card flexb" style="padding:12px 14px;"><div><div style="font-weight:600;">'+esc(e.libelle||"(vente)")+(e.client?' <span class="muted" style="font-weight:400;">· '+esc(e.client)+'</span>':'')+'</div>'+
      '<div class="muted">'+frDate(e.date)+' · <b>'+euro(e.montant)+'</b> ('+euro(e.montantBiens)+' biens · '+euro(e.montantServices)+' services)'+(e.source==="import"?' · importé':'')+'</div></div>'+
      '<button class="btn small danger" data-action="enc-del-'+e.id+'">Supprimer</button></div>';
  });
  return html;
}
function addManualEncaissementFromForm(){
  try{
    var biens=parseAmountFR(val("encBiens"));
    var services=parseAmountFR(val("encServ"));
    if(biens===0 && services===0){
      toast("Indique un montant dans biens et/ou services.");
      return false;
    }
    if(!Array.isArray(state.encaissements)) state.encaissements=[];
    if(!Array.isArray(state.clients)) state.clients=[];
    var client=val("encClient").trim();
    var libelle=val("encLib").trim() || "Encaissement manuel";
    state.encaissements.unshift({
      id:uid(),
      date:val("encDate")||todayISO(),
      libelle:libelle,
      montantBiens:r2(biens),
      montantServices:r2(services),
      montant:r2(biens+services),
      client:client,
      paiement:val("encPaiement")||"",
      source:"manuel"
    });
    if(client) ensureClients([client]);
    saveCache();
    render();
    toast("Encaissement manuel ajouté au carnet.");
    return true;
  }catch(err){
    console.error("Erreur ajout encaissement manuel",err);
    toast("Impossible d’ajouter l’encaissement. Recharge la page puis réessaie.");
    return false;
  }
}
function parseAmountFR(s){
  if(s==null) return 0; s=String(s).replace(/[€\s\u00a0]/g,"");
  if(s.indexOf(".")>-1 && s.indexOf(",")>-1) s=s.replace(/\./g,"").replace(",",".");
  else s=s.replace(",",".");
  var n=parseFloat(s); return isNaN(n)?0:n;
}
function parseDateFR(s){
  s=(s||"").trim(); var m=s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if(m) return m[1]+"-"+("0"+m[2]).slice(-2)+"-"+("0"+m[3]).slice(-2);
  m=s.match(/^(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{2,4})/);
  if(m){ var y=m[3].length===2?("20"+m[3]):m[3]; return y+"-"+("0"+m[2]).slice(-2)+"-"+("0"+m[1]).slice(-2); }
  return null;
}
function importEncaissementsCSV(text){
  text=text.replace(/^\uFEFF/,"");
  var lines=text.split(/\r?\n/).filter(function(l){return l.trim().length;});
  if(!lines.length){ toast("Fichier vide."); return; }
  var rows=lines.map(function(l){ var delim=l.indexOf(";")>-1?";":(l.indexOf("\t")>-1?"\t":","); return l.split(delim).map(function(c){return c.trim().replace(/^"|"$/g,"");}); });
  var start=0, first=rows[0].join(" ").toLowerCase();
  if(/date|libell|montant|bien|service|client/.test(first)) start=1;
  var added=0, skipped=0, names=[];
  for(var i=start;i<rows.length;i++){
    var r=rows[i]; if(!r||r.length<2){ skipped++; continue; }
    var date=parseDateFR(r[0]); var lib=r[1]||"";
    var biens=parseAmountFR(r[2]), serv=parseAmountFR(r[3]);
    var client=(r[4]||"").trim();
    if(!date || (biens===0 && serv===0)){ skipped++; continue; }
    state.encaissements.push({ id:uid(), date:date, libelle:lib, montantBiens:r2(biens), montantServices:r2(serv), montant:r2(biens+serv), client:client, source:"import" });
    if(client) names.push(client);
    added++;
  }
  var addedClients=ensureClients(names);
  saveCache(); render();
  toast(added+" encaissement"+(added>1?"s":"")+" importé"+(added>1?"s":"")+(addedClients?(" · "+addedClients+" cliente(s) créée(s)"):"")+(skipped?(" · "+skipped+" ignorée(s)"):"")+".");
}
function ensureClients(names){
  var existing={}; state.clients.forEach(function(c){ existing[normName(c.nom)]=true; });
  var added=0;
  names.forEach(function(nm){
    var k=normName(nm); if(!k||existing[k])return;
    state.clients.push({id:uid(),nom:nm.trim(),adresse:"",email:"",tel:"",canal:"",anniversaire:"",notes:""});
    existing[k]=true; added++;
  });
  return added;
}
function onEncImport(file){ if(!file) return; var r=new FileReader(); r.onload=function(e){ importEncaissementsCSV(e.target.result); }; r.readAsText(file); }
function downloadTemplateCSV(){
  var csv="\uFEFF"+["Date;Libellé;Montant biens;Montant services;Client","15/01/2026;Vente bouquet boutique;45,00;0;Marie Dupont","02/02/2026;Atelier fleurs séchées;0;120,00;Julie Martin","20/03/2026;Bouquet + accessoires mariage;180,00;0;Camille Bernard"].join("\r\n");
  downloadJSON(csv,"modele-encaissements.csv"); toast("Modèle téléchargé : remplis-le puis importe-le.");
}

var DEFAULT_ARTICLES=["Bouquet de mariée","Bouquet demoiselle d'honneur","Boutonnière(s)","Couronne de fleurs","Centre(s) de table","Décor cérémonie / arche"];
var STATUT_MAR={
  contact:{l:"Premier contact",c:"var(--ink-s)",b:"#efe7df"},
  devis_envoye:{l:"Devis envoyé",c:"#6a5a2a",b:"#f3ead0"},
  acompte:{l:"Acompte payé",c:"var(--bordeaux)",b:"var(--blush-s)"},
  confirme:{l:"Confirmé",c:"var(--green)",b:"var(--green-s)"},
  realise:{l:"Réalisé",c:"#3f5236",b:"#dbe6d2"},
  perdu:{l:"Sans suite",c:"#9b3b3b",b:"#f3dede"}
};
function getMariage(id){ return state.mariages.find(function(m){return m.id===id;}); }
function countdown(dateISO){
  if(!dateISO) return {txt:"date à définir",c:"var(--ink-s)"};
  var d=new Date(dateISO+"T00:00:00"), now=new Date(); now.setHours(0,0,0,0);
  var j=Math.round((d-now)/86400000);
  if(j>0) return {txt:"J-"+j, c:(j<=30?"#9b3b3b":"var(--bordeaux)")};
  if(j===0) return {txt:"Jour J 🎉", c:"#9b3b3b"};
  return {txt:"passé", c:"var(--ink-s)"};
}
function relanceDue(m){ return m.relance && m.relance<=todayISO() && m.statut!=="realise" && m.statut!=="perdu"; }
function newMariage(){
  var m={ id:uid(), nom:"", email:"", tel:"", canalCommunication:"", dateMariage:"", dateLivraison:"", modeLivraison:"", lieu:"", theme:"", budget:"", besoins:"", synthese:"",
    statut:"contact", livre:false, dateLivree:"", relance:"", devisEnvoye:false, devisDate:"", factureEnvoyee:false, factureDate:"", devisLie:"",
    articles:DEFAULT_ARTICLES.map(function(l){return {id:uid(),label:l,fait:false};}),
    prestationsComplementaires:[],
    coutMatieres:"", todoMariage:[],
    medias:[], historique:[], createdAt:todayISO() };
  state.mariages.unshift(m); ui.mariageOpen=m.id; ui.mariageDetailTab="resume"; saveCache(); render();
}
function captureMariageInputs(){
  var m=getMariage(ui.mariageOpen); if(!m) return;
  var g=function(id){ var e=document.getElementById(id); return e?e.value:undefined; };
  ["nom","email","tel","canalCommunication","dateMariage","dateLivraison","modeLivraison","lieu","theme","budget","besoins","synthese","relance","devisDate","factureDate","coutMatieres"].forEach(function(k){
    var id="mar"+k.charAt(0).toUpperCase()+k.slice(1); var v=g(id); if(v!==undefined) m[k]=v;
  });
  captureMariagePrestations(m);
}
function mariagePrestations(m){ return atelierPrestations(m); }
function mariagePrestationsTotal(m){ return atelierPrestationsTotal(m); }
function mariageExtraLinesFromDOM(){
  var rows=document.querySelectorAll('[data-marextra-row]'), out=[];
  rows.forEach(function(row){
    var id=row.getAttribute('data-marextra-row')||uid();
    var designation=(row.querySelector('[data-marextra-field="designation"]')||{}).value||"";
    var qte=num((row.querySelector('[data-marextra-field="qte"]')||{}).value);
    var prix=num((row.querySelector('[data-marextra-field="prix"]')||{}).value);
    var type=(row.querySelector('[data-marextra-type]')||{}).value||"bien";
    if(!qte) qte=1;
    if(designation.trim() || prix>0){ out.push({id:id,designation:designation.trim(),type:type==="service"?"service":"bien",urssafType:type==="service"?"service":"bien",qte:qte,prix:prix}); }
  });
  return out;
}
function captureMariagePrestations(m){
  if(!m) return;
  var box=document.getElementById('marExtraBox');
  if(!box) return;
  m.prestationsComplementaires=mariageExtraLinesFromDOM();
}
function refreshMariageExtraTotalsFromDOM(){
  var box=document.getElementById('marExtraTotal');
  var rows=document.querySelectorAll('[data-marextra-row]');
  var total=0;
  rows.forEach(function(row){
    var qte=num((row.querySelector('[data-marextra-field="qte"]')||{}).value);
    var prix=num((row.querySelector('[data-marextra-field="prix"]')||{}).value);
    if(!qte) qte=1;
    var ligneTotal=r2(qte*prix);
    total+=ligneTotal;
    var cell=row.querySelector('[data-marextra-line-total]');
    if(cell) cell.innerHTML=euro(ligneTotal);
  });
  if(box) box.innerHTML='Total compléments : '+euro(total);
}
function viewMariagePrestationsComplementaires(m){
  m=m||{};
  var lignes=mariagePrestations(m);
  var total=mariagePrestationsTotal(m);
  var html='<div class="card" id="marExtraBox" style="background:var(--cream);"><div class="flexb"><div><h3 style="margin:0;">Prestations complémentaires à ajouter au devis</h3>'+
    '<p class="muted" style="margin:4px 0 0;">Ajoute ici les frais de déplacement, packs premium, livraison, personnalisations ou toute ligne libre pour le devis mariage.</p></div>'+
    '<span class="chip" id="marExtraTotal">Total compléments : '+euro(total)+'</span></div>';
  var presets=prestationsActives();
  html+='<div class="row-actions" style="margin-top:12px;">'+presets.map(function(p,i){ var prix=p.prix?(' · '+euro(p.prix)):''; return '<button class="btn small soft" data-action="mar-extra-add-'+i+'">+ '+esc(p.label)+esc(prix)+'</button>'; }).join('')+'</div>';
  if(!lignes.length){
    html+='<p class="muted" style="margin:12px 0 0;">Aucune prestation complémentaire pour le moment.</p>';
  }else{
    html+='<div class="scroll" style="margin-top:12px;"><table><thead><tr style="text-align:left;color:var(--ink-s);font-size:12px;"><th style="padding:6px;">Libellé</th><th style="padding:6px;">Catégorie interne</th><th style="padding:6px;width:82px;">Qté</th><th style="padding:6px;width:115px;">Prix unit.</th><th style="padding:6px;width:110px;text-align:right;">Total</th><th style="padding:6px;width:40px;"></th></tr></thead><tbody>';
    lignes.forEach(function(l){
      html+='<tr data-marextra-row="'+esc(l.id)+'" style="border-top:1px solid var(--line);">'+
        '<td style="padding:6px;"><input data-marextra-field="designation" value="'+esc(l.designation||'')+'" placeholder="Ex : Frais de déplacement"></td>'+
        '<td style="padding:6px;"><select data-marextra-type>'+atelierPrestationTypeOptions(l.type)+'</select></td>'+
        '<td style="padding:6px;"><input data-marextra-field="qte" type="number" min="0" step="1" value="'+esc(l.qte||1)+'"></td>'+
        '<td style="padding:6px;"><input data-marextra-field="prix" type="number" min="0" step="0.01" value="'+esc(l.prix||0)+'"></td>'+
        '<td data-marextra-line-total style="padding:6px;text-align:right;font-weight:700;white-space:nowrap;">'+euro(num(l.qte)*num(l.prix))+'</td>'+
        '<td style="padding:6px;text-align:center;"><button data-action="mar-extra-del-'+esc(l.id)+'" style="border:none;background:none;color:#9b3b3b;cursor:pointer;font-size:18px;">×</button></td>'+
      '</tr>';
    });
    html+='</tbody></table></div>';
  }
  html+='<p class="muted" style="margin:10px 0 0;font-size:12px;">Ces catégories restent internes : elles ne s’affichent pas sur le devis ni sur la facture client.</p></div>';
  return html;
}
function mariageCardHTML(m){
  var cd=mariageCountdown(m), st=STATUT_MAR[m.statut]||STATUT_MAR.contact;
  var prog=mariageWorkflowStats(m);
  var faits=(m.articles||[]).filter(function(a){return a.fait;}).length, totA=(m.articles||[]).length;
  var ref=mariageDateRef(m);
  return '<div class="card"><div class="flexb"><div>'+
    '<div style="font-weight:700;color:var(--bordeaux);font-size:16px;">'+esc(m.nom||"(sans nom)")+'</div>'+
    '<div class="muted">'+(m.dateMariage?'Mariage : '+frDate(m.dateMariage):"date mariage à définir")+(m.dateLivraison?' · Livraison : '+frDate(m.dateLivraison):"")+(m.modeLivraison?' · '+esc(m.modeLivraison):"")+(m.canalCommunication?' · Canal : '+esc(m.canalCommunication):"")+(m.lieu?" · "+esc(m.lieu):"")+'</div></div>'+
    '<div style="text-align:right;"><span class="pill" style="background:'+st.b+';color:'+st.c+';">'+(mariageTermine(m)?"Terminée":st.l)+'</span>'+
    '<div style="font-weight:700;color:'+cd.c+';margin-top:4px;">'+(ref?cd.txt:"date livraison à définir")+'</div></div></div>'+
    '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;align-items:center;">'+
      '<span class="chip">Suivi : '+prog.done+'/'+prog.total+' · '+prog.pct+' %</span>'+
      '<span class="chip">Articles : '+faits+'/'+totA+' faits</span>'+
      '<span class="chip">Devis '+(m.devisEnvoye?"✓ envoyé":"— non envoyé")+'</span>'+
      '<span class="chip">Facture '+(m.factureEnvoyee?"✓ envoyée":"— non envoyée")+'</span>'+
      (mariageReady(m)&&!mariageTermine(m)?'<span class="chip">✅ Prête à livrer</span>':'')+
      (mariageTermine(m)?'<span class="chip">📦 Livrée</span>':'')+
      ((m.medias&&m.medias.length)?'<span class="chip">📎 '+m.medias.length+'</span>':'')+
      (relanceDue(m)?'<span class="alert">⏰ À relancer</span>':'')+
    '</div>'+
    '<div class="row-actions"><button class="btn small gold" data-action="mar-open-'+m.id+'">Ouvrir la fiche</button>'+
      (mariageReady(m)&&!mariageTermine(m)?'<button class="btn small primary" data-action="mar-livre-'+m.id+'">Marquer livrée</button>':'')+
    '</div></div>';
}
function viewMariageGroup(key,label,list,openDefault){
  ui.mariageGroups=ui.mariageGroups||{};
  var open=ui.mariageGroups[key]; if(open===undefined) open=openDefault;
  var html='<div class="card" style="padding:0;overflow:hidden;">'+
    '<button data-action="mar-group-toggle-'+key+'" style="width:100%;border:none;background:'+(key==="prete"?"var(--green-s)":key==="terminee"?"#efe7df":"var(--blush-s)")+';padding:13px 16px;cursor:pointer;text-align:left;font-family:inherit;">'+
    '<div class="flexb"><div style="font-weight:800;color:var(--bordeaux);">'+(open?'▾':'▸')+' '+esc(label)+' <span class="muted">('+list.length+')</span></div></div></button>';
  if(open){
    html+='<div style="padding:12px 12px 2px;">';
    if(!list.length) html+='<p class="muted" style="margin:0 0 10px;">Aucune fiche dans cette catégorie.</p>';
    list.forEach(function(m){ html+=mariageCardHTML(m); });
    html+='</div>';
  }
  html+='</div>';
  return html;
}
function viewMariages(){
  if(ui.mariageOpen) return viewMariageDetail(getMariage(ui.mariageOpen));
  var header='<div class="flexb" style="margin-bottom:8px;"><h2 style="margin:0;">Suivi mariages</h2><div class="row-actions" style="margin:0;"><button class="btn primary" data-action="mar-rdv-start">🎯 Préparer mon rendez-vous</button></div></div>'+
    '<div class="row-actions" style="margin-bottom:12px;">'+
    '<button class="btn small '+(ui.mariageView==="fiches"?"primary":"ghost")+'" data-action="mar-view-fiches">Fiches</button>'+
    '<button class="btn small '+(ui.mariageView==="preparer"?"primary":"ghost")+'" data-action="mar-view-preparer">À préparer</button>'+
    '<button class="btn small '+(ui.mariageView==="rdv"?"primary":"ghost")+'" data-action="mar-rdv-start">Préparer RDV</button></div>';
  if(ui.mariageView==="preparer") return header+viewPreparer();
  if(ui.mariageView==="rdv") return header+viewMariageRdvWizard();

  var list=state.mariages.slice();
  if(ui.mariageFilter==="avenir") list=list.filter(function(m){ return !mariageTermine(m)&&m.statut!=="perdu"; });
  list.sort(function(a,b){ var da=mariageDateRef(a)||"9999", db=mariageDateRef(b)||"9999"; return da<db?-1:da>db?1:0; });
  var groups={ realiser:[], prete:[], terminee:[] };
  list.forEach(function(m){ groups[mariageGroupKey(m)].push(m); });

  var html=header+'<div class="row-actions" style="margin-bottom:14px;">'+
    '<button class="btn small '+(ui.mariageFilter==="avenir"?"soft":"ghost")+'" data-action="mar-filter-avenir">À venir</button>'+
    '<button class="btn small '+(ui.mariageFilter==="tous"?"soft":"ghost")+'" data-action="mar-filter-tous">Toutes</button></div>';
  if(list.length===0){ html+='<div class="card"><p class="muted" style="margin:0;">Aucune fiche. Touchez « Nouvelle cliente » pour créer le dossier d\'un mariage.</p></div>'; return html; }
  html+='<p class="muted" style="margin-top:-6px;">Les fiches sont classées automatiquement : à réaliser, prête à livrer quand tous les articles sont cochés, puis terminée après livraison.</p>';
  html+=viewMariageGroup("realiser","À réaliser",groups.realiser,true);
  html+=viewMariageGroup("prete","Prête à livrer",groups.prete,true);
  html+=viewMariageGroup("terminee","Terminées / livrées",groups.terminee,false);
  return html;
}
function mariageDevisAccepte(m){
  if(!m || !m.devisLie) return false;
  var d=state.devis.find(function(x){return x.id===m.devisLie;});
  return !!(d && d.statut==="accepte");
}
function mariageAcomptePaye(m){
  if(!m || !m.devisLie) return false;
  // Règle métier PROD V2.0.39 : un mariage passe dans “À préparer” uniquement si
  // la facture d’acompte liée au devis est réellement marquée payée.
  return (state.factures||[]).some(function(f){
    return f.devisId===m.devisLie && f.type==="acompte" && f.statut==="payee";
  });
}


var MARIAGE_WORKFLOW_STEPS=[
  {id:"inspirations",label:"Inspirations reçues",mode:"manual"},
  {id:"moodboard",label:"Moodboard réalisé",mode:"manual"},
  {id:"devis_envoye",label:"Devis envoyé",mode:"auto"},
  {id:"devis_accepte",label:"Devis accepté",mode:"auto"},
  {id:"acompte_encaisse",label:"Acompte encaissé",mode:"auto"},
  {id:"fleurs_validees",label:"Choix des fleurs validé",mode:"manual"},
  {id:"commande_fournisseur",label:"Commande fournisseur effectuée",mode:"semi"},
  {id:"bouquet_realise",label:"Bouquet réalisé",mode:"manual"},
  {id:"accessoires_realises",label:"Accessoires réalisés",mode:"manual"},
  {id:"solde_encaisse",label:"Solde encaissé",mode:"auto"},
  {id:"livraison_effectuee",label:"Livraison effectuée",mode:"auto"},
  {id:"photos_ajoutees",label:"Photos ajoutées",mode:"auto"},
  {id:"mariage_termine",label:"Mariage terminé",mode:"auto"}
];
function mariageSoldePaye(m){
  if(!m || !m.devisLie) return false;
  return (state.factures||[]).some(function(f){
    return f.devisId===m.devisLie && (f.type==="solde"||f.type==="totale") && f.statut==="payee";
  });
}
function mariageCommandeFournisseurAuto(m){
  if(!m) return false;
  return (state.achats||[]).some(function(a){
    return a && (a.mariageId===m.id || String(a.projet||"").indexOf("mariage:"+m.id)>=0);
  });
}
function mariageWorkflowManual(m,id){
  return !!(m && m.suiviMariage && m.suiviMariage[id]);
}
function mariageWorkflowAutoValue(m,step){
  if(!m || !step) return false;
  switch(step.id){
    case "devis_envoye": {
      var d=(m.devisLie?findDevis(m.devisLie):null);
      return !!(m.devisEnvoye || (d && d.statut && d.statut!=="brouillon"));
    }
    case "devis_accepte": return mariageDevisAccepte(m);
    case "acompte_encaisse": return mariageAcomptePaye(m);
    case "solde_encaisse": return mariageSoldePaye(m);
    case "livraison_effectuee": return !!(m.livre || m.dateLivree || m.statut==="realise");
    case "photos_ajoutees": return !!(m.medias && m.medias.length);
    case "mariage_termine": return mariageTermine(m);
    case "commande_fournisseur": return mariageCommandeFournisseurAuto(m);
    default: return false;
  }
}
function mariageWorkflowStepValue(m,step){
  return mariageWorkflowAutoValue(m,step) || mariageWorkflowManual(m,step.id);
}
function mariageWorkflowSource(m,step){
  if(mariageWorkflowAutoValue(m,step)) return "auto";
  if(mariageWorkflowManual(m,step.id)) return "manual";
  return "none";
}
function mariageWorkflowAutoHint(step){
  switch(step.id){
    case "devis_envoye": return "Auto si un devis lié est envoyé. Cochable manuellement si le devis a été fait hors logiciel.";
    case "devis_accepte": return "Auto si le devis lié est accepté. Cochable manuellement pour un ancien accord client.";
    case "acompte_encaisse": return "Auto si une facture d’acompte liée est payée. Cochable manuellement si l’acompte a été encaissé hors logiciel.";
    case "solde_encaisse": return "Auto si une facture de solde/totale liée est payée. Cochable manuellement si le solde a été encaissé hors logiciel.";
    case "livraison_effectuee": return "Auto si la commande est marquée livrée/réalisée. Cochable manuellement si la livraison a été faite hors logiciel.";
    case "photos_ajoutees": return "Auto si des médias sont ajoutés. Cochable manuellement si les photos sont rangées ailleurs.";
    case "mariage_termine": return "Auto si le mariage est marqué réalisé/livré. Cochable manuellement pour clôturer un ancien dossier.";
    case "commande_fournisseur": return "Auto si une commande fournisseur liée est détectée, sinon cochable manuellement.";
    default: return "À cocher manuellement.";
  }
}
function mariageWorkflowStats(m){
  var total=MARIAGE_WORKFLOW_STEPS.length;
  var done=MARIAGE_WORKFLOW_STEPS.filter(function(st){return mariageWorkflowStepValue(m,st);}).length;
  return {done:done,total:total,pct:total?Math.round((done/total)*100):0};
}
function mariageWorkflowColor(pct){ return pct>=80?"var(--green)":(pct>=45?"var(--blush)":"var(--bordeaux)"); }
function mariageWorkflowMissing(m){
  return MARIAGE_WORKFLOW_STEPS.filter(function(st){return !mariageWorkflowStepValue(m,st);}).map(function(st){return st.label;});
}
function mariageWorkflowNextStep(m){
  return MARIAGE_WORKFLOW_STEPS.find(function(st){return !mariageWorkflowStepValue(m,st);}) || null;
}
function mariageWorkflowStatusHTML(source,step){
  if(source==="auto") return '<span class="pill" style="background:var(--green-s);color:var(--green);">Automatique</span>';
  if(source==="manual") return '<span class="pill" style="background:var(--blush-s);color:var(--bordeaux);">Manuel</span>';
  if(step.mode==="auto" || step.mode==="semi") return '<span class="pill" style="background:#efe7df;color:var(--ink-s);">À valider ou auto</span>';
  return '<span class="pill" style="background:#efe7df;color:var(--ink-s);">À faire</span>';
}
function viewMariageWorkflow(m){
  var st=mariageWorkflowStats(m), color=mariageWorkflowColor(st.pct), missing=mariageWorkflowMissing(m).slice(0,3);
  var next=mariageWorkflowNextStep(m);
  var rows=MARIAGE_WORKFLOW_STEPS.map(function(step){
    var source=mariageWorkflowSource(m,step);
    var checked=source!=="none";
    var autoLocked=source==="auto";
    var hint=source==="auto"?"Validée automatiquement par le logiciel.":(source==="manual"?"Validée manuellement par toi.":mariageWorkflowAutoHint(step));
    return '<div class="checkrow" style="align-items:flex-start;">'+
      '<input type="checkbox" '+(checked?'checked ':'')+(autoLocked?'disabled ':'')+'data-action="mar-workflow-toggle-'+esc(step.id)+'">'+
      '<div style="flex:1;'+(checked?'text-decoration:line-through;color:var(--ink-s);':'')+'"><div class="flexb" style="gap:8px;"><b>'+esc(step.label)+'</b>'+mariageWorkflowStatusHTML(source,step)+'</div>'+
        '<div class="muted" style="font-size:11px;margin-top:2px;">'+esc(hint)+'</div></div>'+ 
    '</div>';
  }).join('');
  return '<div class="card" style="border-color:var(--gold-s);background:#fffaf5;">'+
    '<div class="flexb" style="align-items:flex-start;"><div><h3 style="margin:0;">📋 Suivi du mariage</h3>'+ 
    '<p class="muted" style="margin:4px 0 0;">Checklist métier du premier contact jusqu’à la livraison. Les anciens mariages peuvent être complétés manuellement.</p></div>'+ 
    '<span class="chip"><b>'+st.done+'/'+st.total+'</b> étapes · '+st.pct+' %</span></div>'+ 
    '<div class="jauge" style="margin:12px 0;"><div class="track"><div class="fill" style="width:'+st.pct+'%;background:'+color+';"></div></div></div>'+ 
    (next?'<div class="summary" style="margin-bottom:10px;"><b>➡️ Prochaine étape recommandée :</b> '+esc(next.label)+'</div>':'<div class="summary" style="margin-bottom:10px;"><b>🎉 Dossier complet :</b> toutes les étapes sont validées.</div>')+
    (missing.length?'<p class="muted" style="margin:0 0 10px;font-size:12px;">Étapes restantes : '+esc(missing.join(' · '))+(mariageWorkflowMissing(m).length>3?'…':'')+'</p>':'')+
    rows+
  '</div>';
}
function mariageDevisTotal(m){
  if(!m || !m.devisLie) return 0;
  var d=findDevis(m.devisLie);
  if(!d) return 0;
  if(d.montant!=null) return num(d.montant);
  try{ return totals(d.lignes||[], state.settings.partService).total; }catch(e){ return 0; }
}
function mariageFacturesLiees(m){
  if(!m || !m.devisLie) return [];
  return (state.factures||[]).filter(function(f){return f.devisId===m.devisLie;});
}
function mariageMontantPaye(m){
  return r2(mariageFacturesLiees(m).filter(function(f){return f.statut==="payee";}).reduce(function(s,f){return s+num(f.montant);},0));
}
function mariageBudgetData(m){
  var ca=mariageDevisTotal(m);
  var cout=num(m&&m.coutMatieres);
  var paye=mariageMontantPaye(m);
  return {ca:r2(ca), cout:r2(cout), marge:r2(Math.max(0,ca-cout)), paye:paye, reste:r2(Math.max(0,ca-paye))};
}
function mariageDateDiffText(dateISO){
  if(!dateISO) return "date à définir";
  var d=new Date(dateISO+"T00:00:00"), now=new Date(); now.setHours(0,0,0,0);
  var j=Math.round((d-now)/86400000);
  if(j>1) return "dans "+j+" jours";
  if(j===1) return "demain";
  if(j===0) return "aujourd’hui";
  return "passé depuis "+Math.abs(j)+" jours";
}
function viewMariageManagerHero(m){
  var st=mariageWorkflowStats(m), color=mariageWorkflowColor(st.pct), next=mariageWorkflowNextStep(m), bd=mariageBudgetData(m);
  var liv=m.dateLivraison||m.dateMariage||"";
  return '<div class="card" style="border-color:var(--gold-s);background:linear-gradient(135deg,#fffaf5,#fbf8f4);">'+
    '<div class="flexb" style="align-items:flex-start;gap:12px;"><div style="flex:1;min-width:220px;">'+
      '<div class="muted" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.03em;">Wedding Manager</div>'+
      '<h2 style="margin:3px 0 4px;">💍 '+esc(m.nom||"Projet mariage")+'</h2>'+
      '<div style="font-weight:700;color:var(--bordeaux);">'+(m.dateLivraison?'Livraison '+mariageDateDiffText(m.dateLivraison):m.dateMariage?'Mariage '+mariageDateDiffText(m.dateMariage):'Date à définir')+'</div>'+
      '<div class="muted" style="font-size:12px;margin-top:3px;">'+(m.dateLivraison?'Livraison : '+frDate(m.dateLivraison)+(m.modeLivraison?' · '+esc(m.modeLivraison):''):(m.dateMariage?'Mariage : '+frDate(m.dateMariage):'Renseigne une date de livraison pour prioriser ce dossier.'))+'</div>'+
    '</div><div style="min-width:210px;flex:1;">'+
      '<div class="jauge"><div class="track"><div class="fill" style="width:'+st.pct+'%;background:'+color+';"></div></div></div>'+
      '<div class="flexb" style="font-size:12px;margin-top:5px;"><span class="muted">Progression</span><b style="color:var(--bordeaux);">'+st.done+'/'+st.total+' · '+st.pct+' %</b></div>'+
      '<div class="summary" style="margin:10px 0 0;padding:8px 10px;">'+(next?'<b>➡️ Prochaine action :</b> '+esc(next.label):'<b>🎉 Dossier complet</b>')+(bd.reste>0?'<br><span class="muted">Reste à encaisser : <b>'+euro(bd.reste)+'</b></span>':'')+'</div>'+
    '</div></div></div>';
}
function mariageTimelineSteps(m){
  return [
    {id:"contact",label:"Contact",done:true},
    {id:"rdv",label:"RDV",done:mariageWorkflowStepValue(m,{id:"inspirations"})||mariageWorkflowStepValue(m,{id:"moodboard"})},
    {id:"devis_envoye",label:"Devis",done:mariageWorkflowStepValue(m,{id:"devis_envoye"})},
    {id:"devis_accepte",label:"Accepté",done:mariageWorkflowStepValue(m,{id:"devis_accepte"})},
    {id:"acompte_encaisse",label:"Acompte",done:mariageWorkflowStepValue(m,{id:"acompte_encaisse"})},
    {id:"creation",label:"Création",done:mariageWorkflowStepValue(m,{id:"bouquet_realise"})||mariageWorkflowStepValue(m,{id:"accessoires_realises"})},
    {id:"livraison_effectuee",label:"Livraison",done:mariageWorkflowStepValue(m,{id:"livraison_effectuee"})},
    {id:"mariage_termine",label:"Terminé",done:mariageWorkflowStepValue(m,{id:"mariage_termine"})}
  ];
}
function viewMariageManagerTimeline(m){
  var steps=mariageTimelineSteps(m);
  var html='<div class="card"><h3 style="margin:0 0 10px;">🧭 Timeline mariage</h3><div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">';
  steps.forEach(function(st,i){
    var bg=st.done?'var(--green-s)':'#efe7df', c=st.done?'var(--green)':'var(--ink-s)';
    html+='<div style="min-width:86px;text-align:center;">'+
      '<div style="width:28px;height:28px;border-radius:50%;margin:0 auto 5px;background:'+bg+';color:'+c+';display:flex;align-items:center;justify-content:center;font-weight:800;">'+(st.done?'✓':(i+1))+'</div>'+
      '<div style="font-size:11px;font-weight:700;color:'+c+';white-space:nowrap;">'+esc(st.label)+'</div>'+
    '</div>';
  });
  return html+'</div></div>';
}
function viewMariageJalons(m){
  var ref=m.dateLivraison||m.dateMariage||"";
  if(!ref) return '<div class="card"><h3 style="margin:0 0 8px;">📅 Jalons J-</h3><p class="muted" style="margin:0;">Renseigne une date de livraison ou de mariage pour afficher les jalons.</p></div>';
  var d=new Date(ref+"T00:00:00"), now=new Date(); now.setHours(0,0,0,0);
  var days=Math.round((d-now)/86400000);
  var jalons=[180,90,30,15,7,2,0];
  var html='<div class="card"><div class="flexb"><h3 style="margin:0;">📅 Jalons J-</h3><span class="pill" style="background:var(--blush-s);color:var(--bordeaux);">J-'+(days>0?days:(days===0?'0':'passé'))+'</span></div>'+
    '<p class="muted" style="margin:6px 0 10px;font-size:12px;">Référence : '+(m.dateLivraison?'livraison':'mariage')+' du '+frDate(ref)+'.</p>'+
    '<div style="display:flex;gap:7px;flex-wrap:wrap;">';
  jalons.forEach(function(j){
    var active=(days<=j && (j===0 || days>jalons[jalons.indexOf(j)+1]));
    if(days<=0 && j===0) active=true;
    html+='<span class="pill" style="background:'+(active?'var(--bordeaux)':'#efe7df')+';color:'+(active?'#fff':'var(--ink-s)')+';">'+(j===0?'Jour J':'J-'+j)+'</span>';
  });
  return html+'</div></div>';
}
function viewMariageTodoManager(m){
  m.todoMariage=m.todoMariage||[];
  var next=mariageWorkflowNextStep(m);
  var rows=m.todoMariage.map(function(t){
    return '<div class="checkrow"><input type="checkbox" data-action="mar-todo-toggle-'+esc(t.id)+'"'+(t.done?' checked':'')+'><div style="flex:1;'+(t.done?'text-decoration:line-through;color:var(--ink-s);':'')+'">'+esc(t.label)+'</div><button class="btn small danger" data-action="mar-todo-del-'+esc(t.id)+'">×</button></div>';
  }).join('');
  return '<div class="card"><h3 style="margin:0 0 8px;">✅ À faire pour ce mariage</h3>'+
    (next?'<div class="summary" style="margin-bottom:10px;"><b>Suggestion automatique :</b> '+esc(next.label)+'</div>':'')+
    (rows||'<p class="muted" style="margin:0 0 10px;">Aucune tâche personnelle ajoutée pour ce mariage.</p>')+
    '<div class="inline" style="margin-top:8px;"><div style="flex:3;"><input id="marTodoInput" placeholder="Ex : Commander les pivoines stabilisées"></div><div style="flex:0;"><button class="btn primary" data-action="mar-todo-add">+ Ajouter</button></div></div></div>';
}
function viewMariageDocumentsManager(m){
  var d=m.devisLie?findDevis(m.devisLie):null;
  var facs=mariageFacturesLiees(m);
  var hasMed=!!(m.medias&&m.medias.length);
  var synth=!!String(m.synthese||"").trim();
  var items=[
    {icon:"🖼️",label:"Inspirations / photos",ok:hasMed,action:hasMed?"mar-media-pick":"mar-media-pick"},
    {icon:"📝",label:"Synthèse / moodboard",ok:synth,action:"mar-test-synthese-only"},
    {icon:"📄",label:"Devis lié",ok:!!d,action:d?"notif-open-devis-"+d.id:"mar-createdevis"},
    {icon:"💰",label:"Factures",ok:facs.length>0,action:facs[0]?"notif-open-facture-"+facs[0].id:""}
  ];
  var html='<div class="card"><h3 style="margin:0 0 8px;">📁 Documents du dossier</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;">';
  items.forEach(function(it){
    html+='<button class="btn '+(it.ok?'soft':'ghost')+'" '+(it.action?'data-action="'+esc(it.action)+'"':'disabled')+' style="text-align:left;white-space:normal;">'+it.icon+' '+esc(it.label)+'<br><span class="muted" style="font-size:11px;">'+(it.ok?'Présent':'À ajouter')+'</span></button>';
  });
  return html+'</div></div>';
}
function viewMariageBudgetManager(m){
  var bd=mariageBudgetData(m);
  return '<div class="card"><h3 style="margin:0 0 8px;">💶 Budget du mariage</h3>'+
    '<div class="grid-stats" style="margin-bottom:10px;">'+
      '<div class="stat"><div class="lab">CA devis</div><div class="val">'+euro(bd.ca)+'</div></div>'+
      '<div class="stat"><div class="lab">Coût matières</div><div class="val">'+euro(bd.cout)+'</div></div>'+
      '<div class="stat"><div class="lab">Marge estimée</div><div class="val">'+euro(bd.marge)+'</div></div>'+
      '<div class="stat"><div class="lab">Reste à encaisser</div><div class="val">'+euro(bd.reste)+'</div></div>'+
    '</div>'+
    '<label class="field"><span>Coût matières estimé (€)</span><input id="marCoutMatieres" type="number" min="0" step="0.01" value="'+esc(m.coutMatieres||"")+'"><div class="hint">Tu peux le renseigner maintenant ou plus tard. Il servira pour calculer la marge.</div></label>'+
  '</div>';
}
function viewMariageManager(m){
  return viewMariageManagerHero(m)+viewMariageManagerTimeline(m)+viewMariageTodoManager(m)+viewMariageDocumentsManager(m)+viewMariageBudgetManager(m);
}
function mariageTimelineItems(m){
  var items=[];
  function add(date,type,txt){ if(date||txt) items.push({date:date||todayISO(),type:type||"note",texte:txt||""}); }
  if(m.createdAt) add(m.createdAt,"création","Fiche mariage créée");
  if(m.dateMariage) add(m.dateMariage,"mariage","Date du mariage");
  if(m.dateLivraison) add(m.dateLivraison,"livraison","Livraison prévue"+(m.modeLivraison?" · "+m.modeLivraison:""));
  if(m.devisDate || m.devisEnvoye) add(m.devisDate||todayISO(),"devis","Devis envoyé");
  if(m.devisLie){
    var d=findDevis(m.devisLie);
    if(d){ add(d.date,"devis","Devis lié : "+(d.numero||"devis")+" · "+((ST_DEVIS[d.statut]||{}).l||d.statut||"")); }
    (state.factures||[]).filter(function(f){return f.devisId===m.devisLie;}).forEach(function(f){
      add(f.datePaiement||f.date,"facture",(f.numero||"Facture")+" · "+(TYPE_FAC[f.type]||"Facture")+" · "+(f.statut==="payee"?"payée":"non payée")+" · "+euro(f.montant||0));
    });
  }
  if(m.dateLivree) add(m.dateLivree,"livraison","Commande livrée / remise à la cliente");
  (m.historique||[]).forEach(function(h){ add(h.date,"note",h.texte); });
  items.sort(function(a,b){ return (b.date||"").localeCompare(a.date||""); });
  return items;
}
function viewMariageTimeline(m){
  var items=mariageTimelineItems(m);
  var rows=items.map(function(h){
    var icon=h.type==="devis"?"📄":(h.type==="facture"?"💰":(h.type==="livraison"?"🚗":(h.type==="mariage"?"💍":"📝")));
    return '<div style="padding:8px 0;border-bottom:1px solid var(--line);"><span class="muted" style="font-size:12px;">'+icon+' '+frDate(h.date)+'</span><div>'+esc(h.texte)+'</div></div>';
  }).join('');
  return '<div class="card"><h3 style="margin:0 0 8px;">🕒 Chronologie</h3>'+ 
    '<p class="muted" style="margin-top:0;font-size:12px;">Les actions liées au devis, aux factures, aux livraisons et tes notes sont regroupées ici.</p>'+ 
    '<div class="inline" style="margin-bottom:8px;"><div style="flex:3;"><input id="marHistInput" placeholder="Ex : RDV le 12/06, a validé la palette terracotta"></div><div style="flex:0;"><button class="btn primary" data-action="mar-hist-add">+ Noter</button></div></div>'+ 
    (rows||'<p class="muted" style="margin:0;">Aucun événement pour l\'instant.</p>')+'</div>';
}
function viewDashboardMariageProgress(){
  var today=todayISO();
  var list=(state.mariages||[]).filter(function(m){return !mariageTermine(m)&&m.statut!=="perdu";}).map(function(m){
    var liv=m.dateLivraison||"";
    var ref=liv || m.dateMariage || "";
    return {m:m,st:mariageWorkflowStats(m),date:ref||"9999-99-99",livraison:liv||"9999-99-99"};
  });
  // Les mariages en cours sont affichés par date de livraison, du plus proche au plus éloigné.
  // Les dossiers sans date de livraison passent en bas, puis sont triés par date de mariage si disponible.
  list.sort(function(a,b){
    return (a.livraison||"9999-99-99").localeCompare(b.livraison||"9999-99-99") ||
           (a.date||"9999-99-99").localeCompare(b.date||"9999-99-99") ||
           a.st.pct-b.st.pct;
  });
  list=list.slice(0,5);
  var html='<div class="card" style="margin-bottom:14px;"><div class="flexb"><div><h3 style="margin:0;">💍 Mariages en cours</h3><p class="muted" style="margin:4px 0 0;font-size:12px;">Classés par date de livraison, du plus proche au plus éloigné.</p></div><button class="btn small ghost" data-action="nav-mariages">Tous les mariages</button></div>';
  if(!list.length) return html+'<p class="muted" style="margin:10px 0 0;">Aucun mariage actif à suivre pour le moment.</p></div>';
  list.forEach(function(x){
    var m=x.m, color=mariageWorkflowColor(x.st.pct), missing=mariageWorkflowMissing(m)[0]||"Tout est à jour";
    html+='<div style="border-top:1px solid var(--line);padding:10px 0;">'+
      '<div class="flexb" style="gap:8px;"><div style="flex:1;min-width:0;"><b style="color:var(--bordeaux);">'+esc(m.nom||"Cliente")+'</b><div class="muted" style="font-size:12px;">'+(m.dateLivraison?'Livraison : '+frDate(m.dateLivraison):(m.dateMariage?'Mariage : '+frDate(m.dateMariage):'date à définir'))+' · prochaine étape : '+esc(missing)+'</div></div>'+ 
      '<button class="btn small ghost" data-action="notif-open-mariage-'+esc(m.id)+'">Ouvrir</button></div>'+ 
      '<div class="jauge" style="margin:8px 0 0;"><div class="track"><div class="fill" style="width:'+x.st.pct+'%;background:'+color+';"></div></div><div class="muted" style="font-size:11px;margin-top:3px;text-align:right;">'+x.st.done+'/'+x.st.total+' étapes · '+x.st.pct+' %</div></div>'+ 
    '</div>';
  });
  return html+'</div>';
}


/* ===================== Préparer mon rendez-vous mariage ===================== */
function mariageRdvDefault(){
  return {
    nom:"", email:"", tel:"", canalCommunication:"Téléphone",
    dateMariage:"", dateLivraison:"", modeLivraison:"", lieu:"",
    theme:"", couleurs:"", budget:"",
    inspirations:"", fleursAimees:"", fleursAEviter:"", styleBouquet:"",
    contraintes:"", notes:"", relance:"", medias:[],
    bouquet:true, bouquetLancer:false, bouquetEnfant:false,
    nbBoutonnieres:"", nbBracelets:"", nbPeignes:"", couronne:false,
    decoVoiture:false, nbCentres:"", autresPrestations:""
  };
}
function mariageRdvStart(){ ui.mariageRdvDraft=mariageRdvDefault(); ui.mariageView="rdv"; ui.mariageOpen=null; render(); window.scrollTo(0,0); }
function mariageRdvDraft(){ ui.mariageRdvDraft=ui.mariageRdvDraft||mariageRdvDefault(); return ui.mariageRdvDraft; }
function rdvVal(id){ var e=document.getElementById(id); return e?e.value:""; }
function rdvChecked(id){ var e=document.getElementById(id); return !!(e&&e.checked); }
function captureMariageRdvDraft(){
  var d=mariageRdvDraft();
  ["nom","email","tel","canalCommunication","dateMariage","dateLivraison","modeLivraison","lieu","theme","couleurs","budget","inspirations","fleursAimees","fleursAEviter","styleBouquet","contraintes","notes","relance","nbBoutonnieres","nbBracelets","nbPeignes","nbCentres","autresPrestations"].forEach(function(k){ var id="rdv"+k.charAt(0).toUpperCase()+k.slice(1); d[k]=rdvVal(id); });
  ["bouquet","bouquetLancer","bouquetEnfant","couronne","decoVoiture"].forEach(function(k){ var id="rdv"+k.charAt(0).toUpperCase()+k.slice(1); d[k]=rdvChecked(id); });
  return d;
}
function mariageRdvArticles(d){
  var a=[];
  function add(label){ if(label) a.push({id:uid(),label:label,fait:false}); }
  if(d.bouquet) add("Bouquet de mariée");
  if(d.bouquetLancer) add("Mini bouquet à lancer");
  if(d.bouquetEnfant) add("Bouquet enfant / demoiselle d’honneur");
  var nbB=num(d.nbBoutonnieres); if(nbB>0) add(nbB+" boutonnière"+(nbB>1?"s":""));
  var nbBr=num(d.nbBracelets); if(nbBr>0) add(nbBr+" bracelet"+(nbBr>1?"s":"")+" floral"+(nbBr>1?"s":""));
  var nbP=num(d.nbPeignes); if(nbP>0) add(nbP+" accessoire"+(nbP>1?"s":"")+" cheveux / peigne"+(nbP>1?"s":""));
  if(d.couronne) add("Couronne fleurie");
  if(d.decoVoiture) add("Décoration voiture");
  var nbC=num(d.nbCentres); if(nbC>0) add(nbC+" centre"+(nbC>1?"s":"")+" de table");
  String(d.autresPrestations||"").split(/\n|,/).map(function(x){return x.trim();}).filter(Boolean).forEach(add);
  return a.length?a:DEFAULT_ARTICLES.map(function(l){return {id:uid(),label:l,fait:false};});
}
function mariageRdvSynthese(d){
  var articles=mariageRdvArticles(d).map(function(a){return "- "+a.label;}).join("\n");
  var txt=[];
  txt.push("# Synthèse du rendez-vous mariage");
  txt.push("");
  if(d.nom) txt.push("Cliente / couple : "+d.nom);
  if(d.dateMariage) txt.push("Date du mariage : "+frDate(d.dateMariage));
  if(d.dateLivraison) txt.push("Date de livraison souhaitée : "+frDate(d.dateLivraison)+(d.modeLivraison?" · "+d.modeLivraison:""));
  if(d.lieu) txt.push("Lieu : "+d.lieu);
  if(d.budget) txt.push("Budget évoqué : "+d.budget);
  txt.push(""); txt.push("## Univers floral");
  if(d.theme || d.couleurs) txt.push("Thème / couleurs : "+[d.theme,d.couleurs].filter(Boolean).join(" · "));
  if(d.styleBouquet) txt.push("Style de bouquet souhaité : "+d.styleBouquet);
  if(d.inspirations) txt.push("Inspirations reçues / évoquées : "+d.inspirations);
  if(d.fleursAimees) txt.push("Fleurs aimées : "+d.fleursAimees);
  if(d.fleursAEviter) txt.push("Fleurs / éléments à éviter : "+d.fleursAEviter);
  txt.push(""); txt.push("## Créations souhaitées"); txt.push(articles);
  if(d.contraintes){ txt.push(""); txt.push("## Contraintes / points d’attention"); txt.push(d.contraintes); }
  if(d.notes){ txt.push(""); txt.push("## Notes internes du rendez-vous"); txt.push(d.notes); }
  return txt.join("\n").replace(/\n{3,}/g,"\n\n").trim();
}
function mariageRdvBesoins(d){
  var parts=[];
  if(d.theme||d.couleurs) parts.push("Thème / couleurs : "+[d.theme,d.couleurs].filter(Boolean).join(" · "));
  if(d.styleBouquet) parts.push("Style bouquet : "+d.styleBouquet);
  if(d.fleursAimees) parts.push("Fleurs aimées : "+d.fleursAimees);
  if(d.fleursAEviter) parts.push("À éviter : "+d.fleursAEviter);
  if(d.inspirations) parts.push("Inspirations : "+d.inspirations);
  if(d.contraintes) parts.push("Contraintes : "+d.contraintes);
  if(d.notes) parts.push("Notes RDV : "+d.notes);
  return parts.join("\n");
}
function createMariageFromRdv(){
  var d=captureMariageRdvDraft();
  if(!String(d.nom||"").trim()){ toast("Indique au minimum le nom de la cliente ou du couple."); return; }
  var articles=mariageRdvArticles(d);
  var k=normName(d.nom), c=(state.clients||[]).find(function(x){return normName(x.nom)===k;});
  if(c){
    // On met à jour la fiche cliente existante avec les informations du RDV seulement si elles sont renseignées.
    // Le devis utilisera ensuite cette fiche cliente liée comme source unique des coordonnées.
    if(d.email) c.email=d.email;
    if(d.tel) c.tel=d.tel;
    if(d.lieu && !c.adresse) c.adresse=d.lieu;
    if(d.canalCommunication) c.canal=d.canalCommunication;
    c.updatedAt=todayISO();
  } else {
    c={id:uid(),nom:d.nom.trim(),adresse:d.lieu||"",email:d.email||"",tel:d.tel||"",canal:d.canalCommunication||"",anniversaire:"",notes:"Créée depuis l’assistant RDV mariage.",updatedAt:todayISO()};
    state.clients.push(c);
  }
  var rdvMedias=(d.medias||[]).map(function(md){ return Object.assign({},md); });
  var m={ id:uid(), clientId:c.id, nom:d.nom.trim(), email:d.email, tel:d.tel, canalCommunication:d.canalCommunication, dateMariage:d.dateMariage, dateLivraison:d.dateLivraison, modeLivraison:d.modeLivraison, lieu:d.lieu, theme:[d.theme,d.couleurs].filter(Boolean).join(" · "), budget:d.budget, besoins:mariageRdvBesoins(d), synthese:mariageRdvSynthese(d), statut:"contact", livre:false, dateLivree:"", relance:d.relance, devisEnvoye:false, devisDate:"", factureEnvoyee:false, factureDate:"", devisLie:"", articles:articles, prestationsComplementaires:[], coutMatieres:"", todoMariage:[], medias:rdvMedias, historique:[], createdAt:todayISO(), suiviMariage:{} };
  if(String(d.inspirations||"").trim() || rdvMedias.length) m.suiviMariage.inspirations=true;
  m.historique.unshift({date:todayISO(),texte:"Rendez-vous téléphonique préparé dans l’assistant RDV."});
  if(rdvMedias.length) m.historique.unshift({date:todayISO(),texte:rdvMedias.length+" photo(s) / fichier(s) d’inspiration ajouté(s) pendant le rendez-vous."});
  if(d.notes) m.historique.unshift({date:todayISO(),texte:"Notes RDV : "+d.notes});
  m.todoMariage.push({id:uid(),label:"Envoyer la synthèse du rendez-vous",done:false,createdAt:todayISO()});
  m.todoMariage.push({id:uid(),label:"Préparer le devis mariage",done:false,createdAt:todayISO()});
  state.mariages.unshift(m);
  ui.mariageRdvDraft=null; ui.mariageView="fiches"; ui.mariageOpen=m.id; ui.mariageDetailTab="resume";
  saveCache(); render(); window.scrollTo(0,0); toast("Fiche mariage créée depuis le rendez-vous.");
}
function rdvCheck(label,id,checked){ return '<label class="checkrow" style="border-bottom:none;cursor:pointer;"><input type="checkbox" id="'+id+'"'+(checked?' checked':'')+'><div style="flex:1;">'+esc(label)+'</div></label>'; }
function mariageRdvMediaHtml(d){
  var medias=(d.medias||[]).map(function(md){
    if(md.type==="image") return '<div style="position:relative;display:inline-block;"><img class="thumb" src="'+md.dataUrl+'" data-action="mar-rdv-media-open-'+md.id+'" title="Ouvrir '+esc(md.name||"image")+'"><button class="btn small danger" data-action="mar-rdv-media-del-'+md.id+'" style="position:absolute;top:-6px;right:-6px;padding:2px 7px;border-radius:50%;background:#fff;">×</button></div>';
    return '<span class="chip">📄 '+esc(md.name||"fichier")+' <button class="btn small ghost" data-action="mar-rdv-media-open-'+md.id+'" style="padding:2px 8px;">ouvrir</button> <button class="btn small danger" data-action="mar-rdv-media-del-'+md.id+'" style="padding:2px 8px;">×</button></span>';
  }).join("");
  return '<div style="margin-top:10px;padding:12px;border:1px dashed var(--gold-s);border-radius:10px;background:#fffdfb;">'+
    '<div class="flexb" style="margin-bottom:8px;"><div><b style="color:var(--bordeaux);">Photos d’inspiration</b><div class="muted" style="font-size:12px;">Ajoute les images reçues avant ou pendant l’appel. Sélection multiple possible.</div></div><span class="pill" style="background:var(--blush-s);color:var(--bordeaux);">'+(d.medias||[]).length+' fichier'+((d.medias||[]).length>1?'s':'')+'</span></div>'+
    '<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:10px;">'+(medias||'<span class="muted">Aucune photo ajoutée pour le moment.</span>')+'</div>'+
    '<button class="btn soft" data-action="mar-rdv-media-pick">📷 Ajouter des photos / fichiers</button></div>';
}
function viewMariageRdvWizard(){
  var d=mariageRdvDraft();
  function F(label,id,val,type,ph){ return '<label class="field"><span>'+esc(label)+'</span><input id="'+id+'" '+(type?'type="'+type+'" ':'')+'value="'+esc(val||"")+'" '+(ph?'placeholder="'+esc(ph)+'" ':'')+'></label>'; }
  function T(label,id,val,ph){ return '<label class="field"><span>'+esc(label)+'</span><textarea id="'+id+'" style="min-height:70px;" '+(ph?'placeholder="'+esc(ph)+'"':'')+'>'+esc(val||"")+'</textarea></label>'; }
  return '<div class="card" style="border-color:var(--gold-s);background:#fffaf5;"><div class="flexb" style="align-items:flex-start;"><div><div class="muted" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.03em;">Assistant rendez-vous mariage</div><h2 style="margin:3px 0 4px;">🎯 Préparer mon rendez-vous</h2><p class="muted" style="margin:0;">Guide les questions à poser pendant l’appel, puis crée automatiquement une fiche mariage complète.</p></div><button class="btn small ghost" data-action="mar-rdv-cancel">← Retour</button></div></div>'+ 
  '<div class="card"><h3 style="margin:0 0 10px;">1. Contact</h3>'+F("Nom de la cliente / du couple","rdvNom",d.nom,"text","Ex : Camille & Antoine")+'<div class="inline"><div>'+F("Email","rdvEmail",d.email,"email","")+'</div><div>'+F("Téléphone","rdvTel",d.tel,"tel","")+'</div></div><label class="field"><span>Canal de communication</span><select id="rdvCanalCommunication">'+mariageCommunicationOptions(d.canalCommunication||"Téléphone")+'</select></label></div>'+ 
  '<div class="card"><h3 style="margin:0 0 10px;">2. Informations mariage</h3><div class="inline"><div>'+F("Date du mariage","rdvDateMariage",d.dateMariage,"date","")+'</div><div>'+F("Date de livraison","rdvDateLivraison",d.dateLivraison,"date","")+'</div></div><div class="inline"><div>'+F("Lieu de réception / ville","rdvLieu",d.lieu,"text","")+'</div><div><label class="field"><span>Mode de livraison</span><select id="rdvModeLivraison">'+livraisonOptions(d.modeLivraison||"")+'</select></label></div></div><div class="inline"><div>'+F("Thème","rdvTheme",d.theme,"text","Bohème, champêtre, élégant…")+'</div><div>'+F("Couleurs","rdvCouleurs",d.couleurs,"text","Champagne, beige, sauge…")+'</div></div>'+F("Budget évoqué","rdvBudget",d.budget,"text","")+'</div>'+ 
  '<div class="card"><h3 style="margin:0 0 10px;">3. Inspirations et style</h3>'+T("Inspirations reçues / à demander","rdvInspirations",d.inspirations,"Photos Pinterest, bouquet préféré, exemples envoyés…")+mariageRdvMediaHtml(d)+'<div class="inline" style="margin-top:12px;"><div>'+T("Fleurs aimées","rdvFleursAimees",d.fleursAimees,"Pivoine, hortensia, rose stabilisée…")+'</div><div>'+T("À éviter","rdvFleursAEviter",d.fleursAEviter,"Couleurs vives, feuillage vert, rose…")+'</div></div>'+T("Style du bouquet","rdvStyleBouquet",d.styleBouquet,"Rond, aérien, sauvage, couché sur l’avant-bras, sans feuillage…")+'</div>'+ 
  '<div class="card"><h3 style="margin:0 0 10px;">4. Créations souhaitées</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:6px;">'+rdvCheck("Bouquet de mariée","rdvBouquet",d.bouquet)+rdvCheck("Mini bouquet à lancer","rdvBouquetLancer",d.bouquetLancer)+rdvCheck("Bouquet enfant / demoiselle","rdvBouquetEnfant",d.bouquetEnfant)+rdvCheck("Couronne fleurie","rdvCouronne",d.couronne)+rdvCheck("Décoration voiture","rdvDecoVoiture",d.decoVoiture)+'</div><div class="inline" style="margin-top:10px;"><div>'+F("Nombre de boutonnières","rdvNbBoutonnieres",d.nbBoutonnieres,"number","")+'</div><div>'+F("Nombre de bracelets","rdvNbBracelets",d.nbBracelets,"number","")+'</div><div>'+F("Nombre de peignes / accessoires cheveux","rdvNbPeignes",d.nbPeignes,"number","")+'</div><div>'+F("Nombre de centres de table","rdvNbCentres",d.nbCentres,"number","")+'</div></div>'+T("Autres prestations souhaitées","rdvAutresPrestations",d.autresPrestations,"Une ligne par création : arche, bouquet de table, marque-places…")+'</div>'+ 
  '<div class="card"><h3 style="margin:0 0 10px;">5. Points à ne pas oublier</h3>'+T("Contraintes / informations importantes","rdvContraintes",d.contraintes,"Délais, transport, photos à recevoir, budget à respecter, livraison…")+T("Notes internes du rendez-vous","rdvNotes",d.notes,"Ce que tu veux garder pour toi : ressenti, choses à relancer, points à vérifier…")+F("Date de relance prévue","rdvRelance",d.relance,"date","")+'<div class="row-actions"><button class="btn primary" data-action="mar-rdv-create">Créer la fiche mariage</button><button class="btn ghost" data-action="mar-rdv-cancel">Annuler</button></div></div>';
}

function prepData(){
  // seuls les mariages actifs dont la facture d’acompte est marquée payée apparaissent dans “À préparer”
  var arr=state.mariages.filter(function(m){ return !mariageTermine(m)&&m.statut!=="perdu"&&mariageDevisAccepte(m)&&mariageAcomptePaye(m); })
    .map(function(m){ return { m:m, todo:(m.articles||[]).filter(function(a){return !a.fait;}) }; })
    .filter(function(x){ return x.todo.length>0; });
  arr.sort(function(a,b){ var da=mariageDateRef(a.m)||"9999", db=mariageDateRef(b.m)||"9999"; return da<db?-1:da>db?1:0; });
  return arr;
}
function cmdData(){ return state.commandes.filter(function(c){return !c.fait;}); }
function cmdDashboardData(){ return state.commandes.filter(function(c){return !c.fait && !commandeLieeMariage(c);}); }
function countPrep(){
  var d=prepData();
  var cmds=cmdDashboardData().length;
  // Pour le tableau de bord, on compte les dossiers à traiter (1 mariage = 1 élément),
  // pas le nombre d’articles à préparer dans chaque mariage.
  return {items:d.length+cmds, weddings:d.length, commandes:cmds};
}
function viewPreparer(){
  var weddings=prepData();
  var totItems = weddings.reduce(function(s,x){return s+x.todo.length;},0);
  if(totItems===0) return '<div class="card" style="text-align:center;"><div style="font-size:30px;">🌿</div><p style="margin:6px 0 0;font-weight:600;color:var(--bordeaux);">Aucun mariage à préparer, tout est à jour !</p><p class="muted" style="margin:4px 0 0;">Les articles mariage apparaissent ici uniquement lorsque la facture d’acompte liée au devis est marquée payée. Les commandes sont dans l’onglet Commandes → Suivi.</p></div>';
  var entries=[];
  weddings.forEach(function(x){ entries.push({date:x.m.dateMariage||"9999", x:x}); });
  entries.sort(function(a,b){ return a.date<b.date?-1:a.date>b.date?1:0; });
  var html='<div class="summary"><b style="color:var(--bordeaux);">'+totItems+'</b> article'+(totItems>1?'s':'')+' mariage à préparer · '+weddings.length+' mariage'+(weddings.length>1?'s':'')+'.<div class="muted" style="font-size:12px;margin-top:4px;">Affichage limité aux mariages dont la facture d’acompte est marquée payée.</div></div>';
  entries.forEach(function(en){
    var m=en.x.m, cd=mariageCountdown(m); var soon=cd.txt.indexOf("J-")===0 && parseInt(cd.txt.slice(2),10)<=14;
    html+='<div class="card"><div class="flexb" style="margin-bottom:6px;">'+
      '<button data-action="mar-open-'+m.id+'" style="border:none;background:none;text-align:left;cursor:pointer;font-family:inherit;padding:0;">'+
        '<span style="font-weight:700;color:var(--bordeaux);font-size:16px;">💍 '+esc(m.nom||"(sans nom)")+'</span>'+
        '<div class="muted">'+(m.dateLivraison?'Livraison : '+frDate(m.dateLivraison):(m.dateMariage?'Mariage : '+frDate(m.dateMariage):'date à définir'))+(m.modeLivraison?' · '+esc(m.modeLivraison):'')+(m.lieu?' · '+esc(m.lieu):'')+' →</div></button>'+
      '<span class="pill" style="background:'+(soon?"#fbe6df":"#efe7df")+';color:'+cd.c+';font-size:13px;">'+cd.txt+'</span></div>';
    en.x.todo.forEach(function(a){ html+='<div class="checkrow"><input type="checkbox" data-action="prep-toggle" data-mid="'+m.id+'" data-aid="'+a.id+'"><div style="flex:1;">'+esc(a.label)+'</div></div>'; });
    html+='</div>';
  });
  return html;
}

function mariageDetailTabs(active){
  active=active||"resume";
  var tabs=[
    ["resume","Résumé"],
    ["fiche","Fiche"],
    ["creations","Créations"],
    ["inspirations","Inspirations"],
    ["documents","Documents"],
    ["suivi","Suivi"],
    ["budget","Budget"],
    ["historique","Historique"]
  ];
  var html='<div class="card" style="padding:10px 12px;margin-bottom:10px;position:sticky;top:64px;z-index:18;box-shadow:0 4px 14px rgba(0,0,0,.04);"><div class="row-actions" style="margin:0;gap:6px;overflow-x:auto;flex-wrap:nowrap;">';
  tabs.forEach(function(t){
    html+='<button class="btn small '+(active===t[0]?'primary':'ghost')+'" data-action="mar-tab-'+t[0]+'">'+esc(t[1])+'</button>';
  });
  return html+'</div></div>';
}
function mariageCrmMiniCards(m){
  var st=mariageWorkflowStats(m), bd=mariageBudgetData(m), next=mariageWorkflowNextStep(m), faits=(m.articles||[]).filter(function(a){return a.fait;}).length, tot=(m.articles||[]).length;
  return '<div class="grid-stats" style="margin-bottom:12px;">'+
    '<div class="stat"><div class="lab">Progression dossier</div><div class="val">'+st.done+'/'+st.total+' · '+st.pct+' %</div></div>'+
    '<div class="stat"><div class="lab">Prochaine action</div><div class="val" style="font-size:15px;">'+(next?esc(next.label):'Dossier complet')+'</div></div>'+ 
    '<div class="stat"><div class="lab">Créations</div><div class="val">'+faits+'/'+tot+'</div></div>'+
    '<div class="stat"><div class="lab">Reste à encaisser</div><div class="val">'+euro(bd.reste)+'</div></div>'+ 
  '</div>';
}

function viewMariageDetail(m){
  if(!m){ ui.mariageOpen=null; return viewMariages(); }
  var cd=mariageCountdown(m), st=STATUT_MAR[m.statut]||STATUT_MAR.contact;
  var faits=(m.articles||[]).filter(function(a){return a.fait;}).length, totA=(m.articles||[]).length;
  var stOpts=Object.keys(STATUT_MAR).map(function(k){ return '<option value="'+k+'"'+(m.statut===k?" selected":"")+'>'+STATUT_MAR[k].l+'</option>'; }).join("");
  var activeTab=ui.mariageDetailTab||"resume";
  // bandeau résumé
  var summary='<div class="summary"><div class="flexb"><div><span class="pill" style="background:'+st.b+';color:'+st.c+';">'+st.l+'</span> '+
    '<span style="font-weight:700;color:'+cd.c+';margin-left:6px;">'+cd.txt+'</span></div>'+
    (relanceDue(m)?'<span class="alert">⏰ À relancer</span>':'')+'</div>'+
    '<div class="muted" style="margin-top:8px;">Livraison : <b>'+(m.dateLivraison?frDate(m.dateLivraison):'non renseignée')+'</b>'+(m.modeLivraison?' · '+esc(m.modeLivraison):'')+(m.canalCommunication?' · Canal : '+esc(m.canalCommunication):'')+' · Créations : <b>'+faits+'/'+totA+'</b> faites · Devis : <b>'+(m.devisEnvoye?"envoyé le "+frDate(m.devisDate):"non envoyé")+'</b> · Facture : <b>'+(m.factureEnvoyee?"envoyée le "+frDate(m.factureDate):"non envoyée")+'</b></div>';
  if(m.devisLie){ var dl=state.devis.find(function(d){return d.id===m.devisLie;}); if(dl){ var fs=facturesDuDevis(dl.id); summary+='<div class="muted" style="margin-top:4px;">Devis lié : '+esc(dl.numero)+' ('+(ST_DEVIS[dl.statut]||ST_DEVIS.brouillon).l.toLowerCase()+')'+(fs.length?" · "+fs.map(function(f){return esc(f.numero);}).join(", "):"")+'</div>'; } }
  summary+='</div>';
  // infos
  function F(label,id,val,type){ return '<label class="field"><span>'+esc(label)+'</span><input id="'+id+'" '+(type?'type="'+type+'" ':"")+'value="'+esc(val==null?"":val)+'"></label>'; }
  var infos='<div class="card"><div class="flexb" style="margin-bottom:6px;"><h3 style="margin:0;">Fiche contact & projet</h3>'+
    '<button class="btn small ghost" data-action="mar-back">← Liste</button></div>'+
    F("Nom de la cliente / du couple","marNom",m.nom)+
    '<div class="inline"><div>'+F("Email","marEmail",m.email)+'</div><div>'+F("Téléphone","marTel",m.tel)+'</div></div>'+ 
    '<label class="field"><span>Canal de communication</span><select id="marCanalCommunication">'+mariageCommunicationOptions(m.canalCommunication||"")+'</select><div class="hint">Canal préféré pour échanger avec la cliente.</div></label>'+ 
    '<div class="inline"><div>'+F("Date du mariage","marDateMariage",m.dateMariage,"date")+'</div><div>'+F("Lieu de réception","marLieu",m.lieu)+'</div></div>'+ 
    '<div class="inline"><div>'+F("Date de livraison","marDateLivraison",m.dateLivraison,"date")+'</div><div><label class="field"><span>Mode de livraison</span><select id="marModeLivraison">'+livraisonOptions(m.modeLivraison||"")+'</select></label></div></div>'+ 
    '<div class="inline"><div>'+F("Thème & couleurs","marTheme",m.theme)+'</div><div>'+F("Budget estimé","marBudget",m.budget)+'</div></div>'+ 
    '<label class="field"><span>Statut du projet</span><select id="marStatut" data-action="mar-statut">'+stOpts+'</select></label>'+ 
    F("Me rappeler de la relancer le…","marRelance",m.relance,"date")+
    '<div class="checkrow"><input type="checkbox" data-action="mar-livre-toggle"'+(m.livre?' checked':'')+'><div style="flex:1;"><b>Commande livrée / remise à la cliente</b>'+(m.dateLivree?' <span class="muted">le '+frDate(m.dateLivree)+'</span>':'')+'</div></div>'+ 
    '<label class="field"><span>Ses besoins / mémo</span><textarea id="marBesoins" style="min-height:90px;" placeholder="Style souhaité, fleurs préférées, contraintes, échanges…">'+esc(m.besoins)+'</textarea></label>'+ 
    '<div class="section-title">Synthèse</div>'+ 
    '<label class="field"><span>Synthèse de son bouquet de mariée et de son projet</span><textarea id="marSynthese" style="min-height:150px;" placeholder="Ex : Bouquet de mariée bohème, tons blanc cassé et sauge, format aérien, accessoires souhaités, détails importants du projet…">'+esc(m.synthese||"")+'</textarea><div class="hint">Cette synthèse pourra être jointe automatiquement au mail du devis ou de la facture.</div></label>'+ 
    '<div class="row-actions"><button class="btn gold" data-action="mar-save">Enregistrer la fiche</button><button class="btn soft" data-action="mar-test-synthese-only">Télécharger synthèse</button><button class="btn ghost" data-action="mar-rdv-from-current">🎯 Préparer / compléter RDV</button></div></div>';
  // devis & facture
  var df='<div class="card"><h3 style="margin:0 0 10px;">Devis & facture</h3>'+ 
    '<div class="checkrow"><input type="checkbox" data-action="mar-devis-toggle"'+(m.devisEnvoye?" checked":"")+'><div style="flex:1;"><b>Devis</b> édité &amp; envoyé</div><input id="marDevisDate" type="date" style="width:auto;" value="'+esc(m.devisDate||"")+'"></div>'+ 
    '<div class="checkrow" style="border-bottom:none;"><input type="checkbox" data-action="mar-facture-toggle"'+(m.factureEnvoyee?" checked":"")+'><div style="flex:1;"><b>Facture</b> envoyée</div><input id="marFactureDate" type="date" style="width:auto;" value="'+esc(m.factureDate||"")+'"></div>'+ 
    '<label class="field" style="margin-top:10px;"><span>Associer un devis existant (facultatif)</span><select data-action="mar-link"><option value="">— aucun —</option>'+ 
      state.devis.map(function(d){ return '<option value="'+esc(d.id)+'"'+(m.devisLie===d.id?" selected":"")+'>'+esc(d.numero+" · "+(d.client&&d.client.nom||""))+'</option>'; }).join("")+'</select></label>'+ 
    '<button class="btn soft" data-action="mar-createdevis">Créer un devis pour cette cliente</button></div>';
  // articles à réaliser
  var arts=(m.articles||[]).map(function(a){
    return '<div class="checkrow"><input type="checkbox" data-action="mar-art-toggle-'+a.id+'"'+(a.fait?" checked":"")+'><div style="flex:1;'+(a.fait?"text-decoration:line-through;color:var(--ink-s);":"")+'">'+esc(a.label)+'</div><button class="btn small danger" data-action="mar-art-del-'+a.id+'">×</button></div>';
  }).join("");
  var artsCard='<div class="card"><div class="flexb"><h3 style="margin:0;">Créations désirées</h3><span class="muted">'+faits+'/'+totA+' faites</span></div>'+ 
    '<p class="muted" style="margin:6px 0 8px;">Liste les créations souhaitées par la cliente. Elles apparaîtront dans “À préparer” uniquement quand le devis sera accepté.</p>'+ 
    '<div style="margin:8px 0;">'+(arts||'<p class="muted" style="margin:0;">Aucune création.</p>')+'</div>'+ 
    '<div class="inline"><div style="flex:3;"><input id="marArtInput" placeholder="Ex : Bracelet floral demoiselles"></div><div style="flex:0;"><button class="btn primary" data-action="mar-art-add">+ Ajouter</button></div></div></div>';
  // médias
  var medias=(m.medias||[]).map(function(md){
    if(md.type==="image") return '<div style="position:relative;display:inline-block;"><img class="thumb" src="'+md.dataUrl+'" data-action="mar-media-open-'+md.id+'"><button class="btn small danger" data-action="mar-media-del-'+md.id+'" style="position:absolute;top:-6px;right:-6px;padding:2px 7px;border-radius:50%;background:#fff;">×</button></div>';
    return '<span class="chip">📄 '+esc(md.name||"fichier")+' <button class="btn small ghost" data-action="mar-media-open-'+md.id+'" style="padding:2px 8px;">ouvrir</button> <button class="btn small danger" data-action="mar-media-del-'+md.id+'" style="padding:2px 8px;">×</button></span>';
  }).join("");
  var medCard='<div class="card"><h3 style="margin:0 0 8px;">Photos & inspirations</h3>'+ 
    '<p class="muted" style="margin-top:0;">Exemples de bouquets, accessoires, palette de couleurs, documents…</p>'+ 
    '<div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:10px;">'+(medias||'')+'</div>'+ 
    '<button class="btn soft" data-action="mar-media-pick">+ Ajouter une image / un fichier</button></div>';
  // historique
  var hist=(m.historique||[]).map(function(h){ return '<div style="padding:6px 0;border-bottom:1px solid var(--line);"><span class="muted" style="font-size:12px;">'+frDate(h.date)+'</span><div>'+esc(h.texte)+'</div></div>'; }).join("");
  var histCard='<div class="card"><h3 style="margin:0 0 8px;">Notes internes datées</h3>'+ 
    '<div class="inline" style="margin-bottom:8px;"><div style="flex:3;"><input id="marHistInput" placeholder="Ex : RDV le 12/06, a validé la palette terracotta"></div><div style="flex:0;"><button class="btn primary" data-action="mar-hist-add">+ Noter</button></div></div>'+ 
    (hist||'<p class="muted" style="margin:0;">Aucune note pour l\'instant.</p>')+'</div>';
  var delPending = ui.confirmDelete === "mariage:"+m.id;
  var del='<div class="row-actions" style="margin-top:6px;"><button class="btn danger" data-action="mar-del-'+m.id+'">'+(delPending?'Confirmer suppression':'Supprimer cette fiche')+'</button></div>';
  var topBack='<div class="card" style="padding:10px 14px;margin-bottom:10px;position:sticky;top:0;z-index:20;box-shadow:0 4px 14px rgba(0,0,0,.06);">'+
    '<div class="flexb"><div><b style="color:var(--bordeaux);">'+esc(m.nom||"Fiche mariage")+'</b><div class="muted" style="font-size:12px;margin-top:2px;">'+(m.dateLivraison?'Livraison : '+frDate(m.dateLivraison):'Date de livraison non renseignée')+'</div></div>'+ 
    '<button class="btn small ghost" data-action="mar-back">← Retour à la liste des mariages</button></div></div>';
  var content='';
  if(activeTab==="resume") content=mariageCrmMiniCards(m)+summary+viewMariageWorkflow(m);
  else if(activeTab==="fiche") content=infos;
  else if(activeTab==="creations") content=artsCard+viewMariagePrestationsComplementaires(m);
  else if(activeTab==="inspirations") content=medCard;
  else if(activeTab==="documents") content=viewMariageDocumentsManager(m)+df;
  else if(activeTab==="suivi") content=viewMariageWorkflow(m)+viewMariageTodoManager(m);
  else if(activeTab==="budget") content=viewMariageBudgetManager(m);
  else if(activeTab==="historique") content=viewMariageTimeline(m)+histCard+del;
  else content=mariageCrmMiniCards(m)+summary+viewMariageWorkflow(m);
  return topBack+viewMariageManagerHero(m)+viewMariageManagerTimeline(m)+mariageDetailTabs(activeTab)+content;
}
function compressImage2(file,cb){
  var r=new FileReader();
  r.onload=function(e){ var img=new Image(); img.onload=function(){
    var maxW=1200,maxH=1200, ratio=Math.min(maxW/img.width,maxH/img.height,1);
    var w=Math.round(img.width*ratio), h=Math.round(img.height*ratio);
    var c=document.createElement("canvas"); c.width=w; c.height=h; c.getContext("2d").drawImage(img,0,0,w,h);
    cb(c.toDataURL("image/jpeg",0.72)); }; img.src=e.target.result; };
  r.readAsDataURL(file);
}
function mediaItemFromFile(file,cb){
  if(!file){ cb(null); return; }
  if(/^image\//.test(file.type)){
    compressImage2(file,function(durl){ cb({id:uid(),type:"image",name:file.name,dataUrl:durl,mime:"image/jpeg"}); });
    return;
  }
  if(file.size>2500000){ toast("Fichier "+file.name+" trop lourd (>2,5 Mo). Garde-le sur iCloud et note-le dans la fiche."); cb(null); return; }
  var rd=new FileReader();
  rd.onload=function(e){ cb({id:uid(),type:"file",name:file.name,dataUrl:e.target.result,mime:file.type}); };
  rd.onerror=function(){ toast("Impossible de lire le fichier "+file.name+"."); cb(null); };
  rd.readAsDataURL(file);
}
function addMediaFiles(files,target,done){
  var arr=Array.prototype.slice.call(files||[]);
  if(!arr.length){ if(done) done(0); return; }
  var pending=arr.length, added=0, items=new Array(arr.length);
  arr.forEach(function(file,idx){
    mediaItemFromFile(file,function(item){
      items[idx]=item; pending--;
      if(pending===0){
        items.forEach(function(x){ if(x){ target.push(x); added++; } });
        if(done) done(added);
      }
    });
  });
}
function onMarMediaFiles(files){
  var m=getMariage(ui.mariageOpen); if(!m) return; captureMariageInputs(); m.medias=m.medias||[];
  addMediaFiles(files,m.medias,function(added){ if(added){ m.suiviMariage=m.suiviMariage||{}; m.suiviMariage.inspirations=true; saveCache(); render(); toast(added+" fichier(s) d’inspiration ajouté(s)."); } });
}
function onRdvMediaFiles(files){
  var d=captureMariageRdvDraft(); d.medias=d.medias||[];
  addMediaFiles(files,d.medias,function(added){ if(added){ render(); toast(added+" fichier(s) ajouté(s) au rendez-vous."); } });
}
function openMediaItem(md){
  if(!md) return;
  if(md.type==="image"){ ui.lightbox=md.dataUrl; renderModal(); }
  else { var a=document.createElement("a"); a.href=md.dataUrl; a.download=md.name||"fichier"; document.body.appendChild(a); a.click(); document.body.removeChild(a); }
}
function openMedia(id){
  var m=getMariage(ui.mariageOpen); if(!m)return; openMediaItem((m.medias||[]).find(function(x){return x.id===id;}));
}
function openRdvMedia(id){
  var d=mariageRdvDraft(); openMediaItem((d.medias||[]).find(function(x){return x.id===id;}));
}


/* ===================== Envoi email via Brevo / Cloudflare ===================== */
function emailValide(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email||"").trim()); }
function docTitle(kind, doc){
  return kind==="devis" ? "Devis " + (doc.numero||"") : ((TYPE_FAC[doc.type]||"Facture") + " " + (doc.numero||""));
}
function docFileName(kind, doc){
  var base=(kind==="devis"?"devis":"facture")+"-"+(doc.numero||"document");
  return base.replace(/[^a-z0-9_-]+/gi,"-").replace(/-+/g,"-") + ".pdf";
}
function docTemplateVars(kind, doc){
  var montant = doc.montant!=null ? doc.montant : totals(doc.lignes||[],state.settings.partService).total;
  return {
    client:(doc.client&&doc.client.nom)||"",
    numero:doc.numero||"",
    type:kind==="devis"?"devis":"facture",
    montant:euro(montant),
    date:frDate(doc.date),
    entreprise:(state.settings&&state.settings.nomEntreprise)||"L'Atelier Fleurs & Sens"
  };
}
function applyDocTemplate(str, kind, doc){
  var vars=docTemplateVars(kind, doc);
  return String(str||"").replace(/\{(client|numero|type|montant|date|entreprise)\}/g,function(_,k){ return vars[k]||""; });
}
function docSubject(kind, doc){
  var s=state.settings||{};
  var tpl = kind==="devis" ? (s.mailObjetDevis||DEFAULT_SETTINGS.mailObjetDevis) : (s.mailObjetFacture||DEFAULT_SETTINGS.mailObjetFacture);
  return applyDocTemplate(tpl, kind, doc);
}

function docEmailHtml(kind, doc){
  var label = kind==="devis" ? "devis" : "facture";
  var accord = kind==="devis" ? "relatif" : "relative";
  return '<div style="margin:0;padding:0;background:#fbf7f4;font-family:Arial,Helvetica,sans-serif;color:#3b3033;">'+
    '<div style="max-width:600px;margin:0 auto;padding:20px 12px;">'+
      '<div style="background:#fff;border:1px solid #eadbd4;border-radius:14px;overflow:hidden;">'+
        '<div style="text-align:center;padding:18px 16px 10px;background:#fff;">'+
          '<img src="https://latelierfleursetsens-create.github.io/atelier-fleurs-app/logo-mail.jpg" alt="L\'Atelier Fleurs & Sens" width="220" style="width:220px;max-width:70%;height:auto;display:block;margin:0 auto;">'+
        '</div>'+
        '<div style="height:5px;background:#8a2846;"></div>'+
        '<div style="padding:24px 26px 18px;">'+
          '<p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Bonjour,</p>'+
          '<p style="margin:0 0 14px;font-size:15px;line-height:1.6;">J\'espère que vous allez bien.</p>'+
          '<p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Je vous prie de trouver ci-joint votre <strong>'+label+'</strong> '+accord+' à votre commande auprès de <strong>L\'Atelier Fleurs &amp; Sens</strong>.</p>'+
          '<p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Je vous remercie chaleureusement pour votre confiance et pour m\'avoir permis de participer, à ma façon, à ce joli projet. ✨</p>'+
          '<p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Si vous avez la moindre question, je reste bien entendu à votre disposition.</p>'+
          '<p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Au plaisir d\'échanger à nouveau avec vous et de vous accompagner dans de futures créations florales.</p>'+
          '<p style="margin:0 0 20px;font-size:15px;line-height:1.6;">Je vous souhaite une belle journée.</p>'+
          '<p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Bien chaleureusement,</p>'+
          '<div style="padding:14px 16px;background:#f8ede7;border-left:4px solid #8a2846;border-radius:10px;">'+
            '<p style="margin:0 0 4px;font-size:15px;color:#5b1f33;"><strong>Élodie Rouzé</strong></p>'+
            '<p style="margin:0 0 6px;font-size:14px;"><strong>L\'Atelier Fleurs &amp; Sens</strong></p>'+
            '<p style="margin:0 0 6px;font-size:13px;color:#6b555c;">🌿 <em>Des fleurs, des émotions, un instant pour soi</em></p>'+
            '<p style="margin:0;font-size:13px;line-height:1.7;">📞 06 50 91 63 59<br>📧 latelierfleursetsens@gmail.com<br>🌐 www.latelierfleursetsens.fr</p>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>';
}

function docMailMessage(kind, doc){
  var s=state.settings||{};
  var tpl = kind==="devis" ? (s.mailMessageDevis||DEFAULT_SETTINGS.mailMessageDevis) : (s.mailMessageFacture||DEFAULT_SETTINGS.mailMessageFacture);
  return applyDocTemplate(tpl, kind, doc);
}
function clientEmailOrPrompt(doc){
  var current=(doc.client&&doc.client.email)||"";
  var email=prompt("Adresse email du client :", current);
  if(email===null) return null;
  email=String(email).trim();
  if(!emailValide(email)){ toast("Adresse email invalide."); return null; }
  if(doc.client) doc.client.email=email;
  return email;
}

function findMariageForDoc(kind, doc){
  if(!doc) return null;

  // 1. Si une fiche mariage est ouverte et contient une synthèse, on la capture avant l'envoi.
  if(ui && ui.mariageOpen){
    try{ captureMariageInputs(); }catch(e){}
  }

  var devisId="";
  if(kind==="devis") devisId=doc.id||"";
  if(kind==="facture") devisId=doc.devisId||doc.devisLie||"";

  var nomDoc=searchNorm((doc.client&&doc.client.nom)||"");
  var emailDoc=searchNorm((doc.client&&doc.client.email)||"");
  var telDoc=searchNorm((doc.client&&doc.client.tel)||"");

  // 2. Lien direct devis <-> mariage.
  if(devisId){
    var byLink=(state.mariages||[]).find(function(m){ return m.devisLie===devisId; });
    if(byLink) return byLink;
  }

  // 3. Cas où le lien devis a été perdu mais le nom/email/tel correspondent.
  var candidates=(state.mariages||[]).filter(function(m){
    var mn=searchNorm(m.nom||""), me=searchNorm(m.email||""), mt=searchNorm(m.tel||"");
    return (nomDoc && mn && (mn===nomDoc || mn.indexOf(nomDoc)>=0 || nomDoc.indexOf(mn)>=0)) ||
           (emailDoc && me && emailDoc===me) ||
           (telDoc && mt && telDoc===mt);
  });

  // Priorité aux fiches qui ont une synthèse renseignée.
  return candidates.find(function(m){return String(m.synthese||"").trim();}) || candidates[0] || null;
}


async function testDownloadDocPdf(){
  if(!ui.preview || !ui.preview.doc){ toast("Document introuvable."); return; }
  try{
    toast("Préparation du PDF…");
    var b64=await pdfBase64FromDoc(ui.preview.kind, ui.preview.doc);
    var a=document.createElement("a");
    a.href="data:application/pdf;base64,"+b64;
    a.download=docFileName(ui.preview.kind, ui.preview.doc);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast("PDF téléchargé.");
  }catch(e){
    console.error(e);
    toast("Téléchargement PDF impossible : "+(e&&e.message?e.message:e));
  }
}

async function testDownloadSyntheseMariage(){
  var m=getMariage(ui.mariageOpen);
  if(!m){ toast("Fiche mariage introuvable."); return; }
  try{
    captureMariageInputs();
    if(!String(m.synthese||"").trim()){
      toast("La synthèse est vide.");
      return;
    }
    toast("Préparation de la synthèse…");
    var linkedDoc = m.devisLie ? findDevis(m.devisLie) : null;
    var b64 = await pdfBase64FromSynthese(m, linkedDoc);
    var a=document.createElement("a");
    a.href="data:application/pdf;base64,"+b64;
    a.download=syntheseFileName(m);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast("Synthèse téléchargée.");
  }catch(e){
    console.error(e);
    toast("Téléchargement synthèse impossible : "+(e&&e.message?e.message:e));
  }
}

function syntheseFileName(m){
  var base="synthese-de-votre-projet-"+((m&&m.nom)||"mariage");
  return base.replace(/[^a-z0-9_-]+/gi,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").toLowerCase()+".pdf";
}
function syntheseTextHtml(txt){
  txt=String(txt||"").trim();
  if(!txt) return '<p style="margin:0;color:#837568;">Aucune synthèse renseignée pour ce projet.</p>';

  var lines=esc(txt).split(/\n/);
  var html='';
  var inList=false;
  var recapStarted=false;

  function closeList(){
    if(inList){ html+='</ul>'; inList=false; }
  }

  function isRecapTitle(text){
    return text.toLowerCase().indexOf("récapitulatif de la commande")>=0 ||
           text.toLowerCase().indexOf("recapitulatif de la commande")>=0;
  }

  function isFinalThanks(text){
    var t=text.toLowerCase();
    return t.indexOf("je vous remercie")===0 || t.indexOf("merci pour votre confiance")===0;
  }

  lines.forEach(function(line){
    var l=line.trim();
    if(!l){ closeList(); return; }

    l=l.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
    var cleanTitle=l.replace(/^#{1,3}\s+/,'').trim();

    if(isRecapTitle(cleanTitle) && !recapStarted){
      closeList();
      recapStarted=true;
      html+='<div style="page-break-before:always;"></div>';
    }

    if(/^###\s+/.test(l)){
      closeList();
      html+='<h3 style="font-family:Georgia,serif;color:#5A2230;font-size:14px;margin:14px 0 6px;page-break-after:avoid;max-width:150mm;overflow-wrap:break-word;word-break:break-word;white-space:normal;">'+cleanTitle+'</h3>';
    }else if(/^##\s+/.test(l)){
      closeList();
      html+='<h2 style="font-family:Georgia,serif;color:#5A2230;font-size:16px;margin:16px 0 7px;page-break-after:avoid;max-width:150mm;overflow-wrap:break-word;word-break:break-word;white-space:normal;">'+cleanTitle+'</h2>';
    }else if(/^#\s+/.test(l)){
      closeList();
      html+='<h1 style="font-family:Georgia,serif;color:#5A2230;font-size:17px;margin:0 0 10px;page-break-after:avoid;max-width:150mm;overflow-wrap:break-word;word-break:break-word;white-space:normal;">'+cleanTitle+'</h1>';
    }else if(/^[-*✓✔]\s+/.test(l)){
      if(!inList){ html+='<ul style="margin:6px 0 10px 16px;padding:0;max-width:150mm;">'; inList=true; }
      html+='<li style="margin:3px 0;page-break-inside:avoid;max-width:148mm;overflow-wrap:break-word;word-break:break-word;white-space:normal;line-height:1.34;">'+l.replace(/^[-*✓✔]\s+/,'')+'</li>';
    }else if(/^---+$/.test(l)){
      closeList();
      html+='<hr style="border:none;border-top:1px solid #E7DDD5;margin:14px 0;max-width:150mm;">';
    }else{
      closeList();
      var extra=isFinalThanks(l)?'margin-top:10px;margin-bottom:18mm;padding-bottom:8mm;page-break-inside:avoid;':'';
      html+='<p style="margin:6px 0;'+extra+'max-width:150mm;overflow-wrap:break-word;word-break:break-word;white-space:normal;line-height:1.34;">'+l+'</p>';
    }
  });
  closeList();
  return html;
}
function viewSyntheseDoc(m, sourceDoc){
  var s=state.settings||{};
  var logo=(state.logo&&state.logo.length>10)?state.logo:"https://latelierfleursetsens-create.github.io/atelier-fleurs-app/logo-mail.jpg";
  var ref=(sourceDoc&&sourceDoc.numero)?'<div style="font-size:10.5px;color:#837568;margin-top:2px;">Document associé : '+esc(sourceDoc.numero)+'</div>':'';
  var synth=String((m&&m.synthese)||"").trim();

  return '<div id="synthese-doc" style="width:160mm;max-width:160mm;margin:0;background:#fff;color:#303437;font-family:Segoe UI,Arial,sans-serif;font-size:10.5px;line-height:1.34;box-sizing:border-box;padding:0 0 18mm 0;overflow:visible;overflow-wrap:break-word;word-break:break-word;white-space:normal;opacity:1;visibility:visible;">'+

    '<div style="text-align:center;margin:0 0 10px 0;page-break-inside:avoid;page-break-after:avoid;max-width:160mm;overflow-wrap:break-word;">'+
      '<div style="font-family:Georgia,serif;font-size:17px;line-height:1.2;color:#5A2230;font-weight:700;margin:0;white-space:normal;max-width:160mm;">Synthèse de votre projet</div>'+
      '<div style="font-size:10.5px;color:#837568;margin-top:5px;">Date : '+frDate(todayISO())+'</div>'+ref+
    '</div>'+

    '<div style="border-bottom:1px solid #E7DDD5;padding-bottom:8px;margin-bottom:12px;page-break-inside:avoid;max-width:160mm;overflow-wrap:break-word;">'+
      '<img src="'+logo+'" alt="logo" style="width:58px;height:auto;display:block;margin:0 0 5px 0;">'+
      '<div style="font-family:Georgia,serif;font-size:14px;color:#5A2230;font-weight:700;margin:0 0 3px 0;max-width:160mm;overflow-wrap:break-word;">'+esc(s.nomEntreprise||"L’Atelier Fleurs & Sens")+'</div>'+
      '<div style="font-size:10.5px;color:#837568;">'+esc(s.entrepreneur||"Élodie Rouzé")+'</div>'+
      '<div style="font-size:10.5px;color:#837568;max-width:160mm;overflow-wrap:break-word;word-break:break-word;">'+esc(s.email||"latelierfleursetsens@gmail.com")+' · '+esc(s.tel||"06 50 91 63 59")+'</div>'+
    '</div>'+

    '<div style="background:#FBF8F4;border:1px solid #E7DDD5;border-radius:8px;padding:8px 10px;margin-bottom:12px;page-break-inside:avoid;max-width:160mm;box-sizing:border-box;overflow-wrap:break-word;word-break:break-word;">'+
      '<div style="font-size:9.5px;text-transform:uppercase;color:#837568;font-weight:700;letter-spacing:.02em;">Projet mariage</div>'+
      '<div style="font-weight:700;color:#5A2230;font-size:13px;margin-top:2px;max-width:100%;overflow-wrap:break-word;">'+esc((m&&m.nom)||"Projet mariage")+'</div>'+
      ((m&&m.dateMariage)?'<div style="font-size:10.5px;color:#837568;margin-top:2px;max-width:100%;overflow-wrap:break-word;">Date du mariage : '+frDate(m.dateMariage)+'</div>':'')+
      ((m&&m.dateLivraison)?'<div style="font-size:10.5px;color:#837568;max-width:100%;overflow-wrap:break-word;">Livraison : '+frDate(m.dateLivraison)+(m.modeLivraison?' · '+esc(m.modeLivraison):'')+'</div>':'')+
      ((m&&m.theme)?'<div style="font-size:10.5px;color:#837568;max-width:100%;overflow-wrap:break-word;">Thème / couleurs : '+esc(m.theme)+'</div>':'')+
    '</div>'+

    '<div style="margin-top:6px;max-width:160mm;overflow-wrap:break-word;word-break:break-word;">'+
      '<h2 style="font-family:Georgia,serif;color:#5A2230;font-size:14px;margin:0 0 6px;page-break-after:avoid;max-width:160mm;">Synthèse</h2>'+
      '<div style="font-size:10.5px;line-height:1.36;max-width:160mm;overflow-wrap:break-word;word-break:break-word;white-space:normal;min-height:30mm;">'+syntheseTextHtml(synth)+'</div>'+
    '</div>'+

    '<div style="margin-top:12px;padding-top:7px;border-top:1px solid #E7DDD5;font-size:9.5px;color:#837568;page-break-inside:avoid;max-width:160mm;overflow-wrap:break-word;word-break:break-word;">'+
      'Merci pour votre confiance. Cette synthèse reprend les grandes lignes de votre projet floral et peut être ajustée au fil de nos échanges.'+
    '</div>'+
  '</div>';
}
function buildSyntheseElementForPdf(m, doc){
  var wrap=document.createElement("div");
  wrap.innerHTML=viewSyntheseDoc(m, doc);
  var node=wrap.querySelector("#synthese-doc");
  if(!node) return null;

  var clone=node.cloneNode(true);
  clone.id="synthese-email-temp";
  clone.style.opacity="1";
  clone.style.visibility="visible";
  clone.style.display="block";
  clone.style.background="#ffffff";
  clone.style.width="160mm";
  clone.style.maxWidth="160mm";
  clone.style.margin="0";
  clone.style.transform="translateX(-8mm)";
  clone.style.transformOrigin="top left";

  var holder=document.createElement("div");
  holder.id="synthese-email-holder";
  holder.style.position="fixed";
  holder.style.left="0";
  holder.style.top="0";
  holder.style.width="210mm";
  holder.style.maxWidth="210mm";
  holder.style.background="#ffffff";
  holder.style.boxSizing="border-box";
  holder.style.zIndex="99999";
  holder.style.opacity="0.01";
  holder.style.visibility="visible";
  holder.style.pointerEvents="none";
  holder.style.overflow="visible";
  holder.style.margin="0";
  holder.style.padding="0";

  holder.appendChild(clone);
  document.body.appendChild(holder);
  return {holder:holder,node:clone};
}
async function pdfBase64FromSynthese(m, doc){
  if(typeof html2pdf==="undefined") throw new Error("Bibliothèque PDF non chargée");
  if(!m || !String(m.synthese||"").trim()) throw new Error("Synthèse vide");
  var built=buildSyntheseElementForPdf(m, doc);
  if(!built) throw new Error("Synthèse introuvable");
  try{
    try{
      if(document.fonts && document.fonts.ready) await document.fonts.ready;
      var imgs=Array.prototype.slice.call(built.node.querySelectorAll("img"));
      await Promise.all(imgs.map(function(img){
        return new Promise(function(resolve){
          if(img.complete) return resolve();
          img.onload=resolve; img.onerror=resolve;
          setTimeout(resolve,1200);
        });
      }));
      await new Promise(function(resolve){ setTimeout(resolve,180); });
    }catch(waitErr){ console.warn("Attente ressources synthèse impossible", waitErr); }

    var opt={
      margin:[10,12,14,12],
      filename:syntheseFileName(m),
      image:{type:"jpeg",quality:0.98},
      html2canvas:{
        scale:1.55,
        useCORS:true,
        allowTaint:true,
        backgroundColor:"#ffffff",
        scrollX:0,
        scrollY:0,
        windowWidth:900,
        x:0,
        y:0
      },
      jsPDF:{unit:"mm",format:"a4",orientation:"portrait"},
      pagebreak:{mode:["css","legacy"],avoid:["h1","h2","h3","li",".avoid-break"]}
    };
    var worker=html2pdf().set(opt).from(built.node).toPdf();
    var pdf=await worker.get("pdf");

    // Ancien correctif conservé, mais uniquement s'il y a plusieurs pages.
    // Il sert à retirer la page blanche générée par certains navigateurs.
    // Test S1M : aucune suppression automatique de page pour éviter de perdre du contenu.
    var dataUri=pdf.output("datauristring");
    var b64=String(dataUri).split(",")[1]||"";
    if(!b64 || b64.length<1000) throw new Error("PDF synthèse généré vide");
    return b64;
  } finally {
    if(built.holder && built.holder.parentNode) built.holder.parentNode.removeChild(built.holder);
  }
}

function buildDocElementForPdf(kind, doc){
  var wrap=document.createElement("div");
  wrap.innerHTML=viewDoc({kind:kind, doc:doc});
  var node=wrap.querySelector("#doc");
  if(!node) return null;

  var clone=node.cloneNode(true);
  clone.id="doc-email-temp";
  clone.style.width="160mm";
  clone.style.maxWidth="160mm";
  clone.style.boxSizing="border-box";
  clone.style.background="#ffffff";
  clone.style.overflow="visible";
  clone.style.opacity="1";
  clone.style.visibility="visible";
  clone.style.transform="translateX(-18mm)";
  clone.style.transformOrigin="top left";
  clone.style.margin="0";

  var holder=document.createElement("div");
  holder.id="doc-email-holder";
  holder.style.position="fixed";
  holder.style.left="0";
  holder.style.top="0";
  holder.style.width="210mm";
  holder.style.maxWidth="210mm";
  holder.style.background="#ffffff";
  holder.style.boxSizing="border-box";
  holder.style.zIndex="99999";
  holder.style.opacity="0.01";
  holder.style.visibility="visible";
  holder.style.pointerEvents="none";
  holder.style.overflow="visible";
  holder.style.transform="none";
  holder.style.transformOrigin="top left";
  holder.style.margin="0";
  holder.style.padding="0";

  holder.appendChild(clone);
  document.body.appendChild(holder);
  return {holder:holder,node:clone};
}
async function pdfBase64FromDoc(kind, doc){
  if(typeof html2pdf==="undefined") throw new Error("Bibliothèque PDF non chargée");
  var built=buildDocElementForPdf(kind, doc);
  if(!built) throw new Error("Document introuvable");
  try{
    try{
      if(document.fonts && document.fonts.ready) await document.fonts.ready;
      var imgs=Array.prototype.slice.call(built.node.querySelectorAll("img"));
      await Promise.all(imgs.map(function(img){
        return new Promise(function(resolve){
          if(img.complete) return resolve();
          img.onload=resolve; img.onerror=resolve;
          setTimeout(resolve,1200);
        });
      }));
      await new Promise(function(resolve){ setTimeout(resolve,350); });
    }catch(waitErr){ console.warn("Attente ressources PDF impossible", waitErr); }

    var opt={
      margin:[8,12,12,12],
      filename:docFileName(kind, doc),
      image:{type:"jpeg",quality:0.98},
      html2canvas:{
        scale:1.5,
        useCORS:true,
        allowTaint:true,
        backgroundColor:"#ffffff",
        scrollX:0,
        scrollY:0,
        windowWidth:900,
        x:0,
        y:0
      },
      jsPDF:{unit:"mm",format:"a4",orientation:"portrait"},
      pagebreak:{mode:["css","legacy"],avoid:["tr",".totrow"]}
    };

    var dataUri=await html2pdf().set(opt).from(built.node).outputPdf("datauristring");
    var b64=String(dataUri).split(",")[1]||"";
    if(!b64 || b64.length<1000) throw new Error("PDF document généré vide");
    return b64;
  } finally {
    if(built.holder && built.holder.parentNode) built.holder.parentNode.removeChild(built.holder);
  }
}

function addEmailHistory(kind, doc, email){
  state.emails=state.emails||[];
  state.emails.unshift({
    id:uid(),
    sentAt:new Date().toISOString(),
    kind:kind,
    docId:doc.id,
    numero:doc.numero||"",
    client:(doc.client&&doc.client.nom)||"",
    email:email,
    sujet:docSubject(kind, doc),
    montant:doc.montant!=null?doc.montant:totals(doc.lignes,state.settings.partService).total,
    statut:"envoye"
  });
  if(state.emails.length>500) state.emails=state.emails.slice(0,500);
}

function markDocSent(kind, doc){
  if(kind==="devis"){
    if(doc.statut==="brouillon") doc.statut="envoye";
    doc.emailEnvoyeLe=todayISO();
    var m=state.mariages.find(function(x){return x.devisLie===doc.id;});
    if(m){ m.devisEnvoye=true; if(!m.devisDate) m.devisDate=todayISO(); if(m.statut==="contact") m.statut="devis_envoye"; }
  } else if(kind==="facture"){
    if(doc.statut!=="payee") doc.statut="envoyee";
    doc.emailEnvoyeeLe=todayISO();
    if(doc.devisId){
      var m2=state.mariages.find(function(x){return x.devisLie===doc.devisId;});
      if(m2){ m2.factureEnvoyee=true; if(!m2.factureDate) m2.factureDate=todayISO(); }
    }
  }
}
async function envoyerDocumentEmail(kind, doc){
  if(!doc){ toast("Document introuvable."); return; }
  var email=clientEmailOrPrompt(doc); if(!email) return;
  var nom=(doc.client&&doc.client.nom)||"Client";
  var titre=docTitle(kind, doc);
  if(ui && ui.mariageOpen){ try{ captureMariageInputs(); saveCache(); }catch(capErr){ console.warn(capErr); } }
  toast("Préparation des PDF…");
  try{
    var pdf64=await pdfBase64FromDoc(kind, doc);
    if(!pdf64 || pdf64.length<1000){ throw new Error("PDF principal vide"); }
    // Pause sécurité rendu PDF principal avant génération éventuelle de la synthèse.
    await new Promise(function(resolve){ setTimeout(resolve,300); });
    var attachments=[{ name:docFileName(kind, doc), content:pdf64 }];
    var mariageSynthese=findMariageForDoc(kind, doc);

    // Erreur synthèse non bloquante : ne doit jamais empêcher l'envoi du devis/facture ni casser l'appli.
    if(mariageSynthese && String(mariageSynthese.synthese||"").trim()){
      try{
        var synth64=await pdfBase64FromSynthese(mariageSynthese, doc);
        if(synth64 && synth64.length>1000){
          attachments.push({ name:syntheseFileName(mariageSynthese), content:synth64 });
        }else{
          console.warn("Synthèse ignorée : PDF vide ou trop court");
          toast("Attention : la synthèse n'a pas pu être générée correctement. Le document principal sera envoyé.");
        }
      }catch(synthErr){
        console.warn("Erreur synthèse non bloquante", synthErr);
        toast("Attention : synthèse non jointe, mais le document principal sera envoyé.");
      }
    }

    toast("Envoi de l'email…");
    var payload={
      email:email,
      nom:nom,
      sujet:docSubject(kind, doc),
      message:docMailMessage(kind, doc),
      attachment:attachments[0],
      attachments:attachments
    };
    if(attachments.length>1) payload.attachment2=attachments[1];
    var res=await fetch(MAIL_WORKER_URL,{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)});
    var txt=await res.text();
    if(!res.ok){ throw new Error(txt||("Erreur HTTP "+res.status)); }
    markDocSent(kind, doc);
    addEmailHistory(kind, doc, email);
    saveCache(); render();
    toast(titre+" envoyé par email à "+email+(attachments.length>1?" avec la synthèse du projet.":"."));
  } catch(e){ console.error(e); toast("Envoi impossible : "+(e&&e.message?e.message:"vérifie le Worker Cloudflare / Brevo.")); }
}

/* ===================== Gestion des actions ===================== */
function findDevis(id){ return state.devis.find(function(d){return d.id===id;}); }
function handleAction(action){

  if(action==="version-notes-open"){
    ui.versionNotesModal=true;
    renderModal();
    return;
  }
  if(action==="version-notes-close"){
    ui.versionNotesModal=false;
    renderModal();
    return;
  }

  if(action==="payment-prompt-ok"){
    var sel=document.getElementById("paymentPromptSelect");
    var val=sel?sel.value:"";
    var cb=ui.paymentPrompt&&ui.paymentPrompt.callback;
    ui.paymentPrompt=null;
    renderModal();
    if(typeof cb==="function") cb(val);
    return;
  }
  if(action==="payment-prompt-cancel"){
    ui.paymentPrompt=null;
    renderModal();
    return;
  }

  // nav
  
  
  
  
  if(action==="doc-test-pdf-only"){
    testDownloadDocPdf();
    return;
  }

  if(action==="mar-test-synthese-only"){
    testDownloadSyntheseMariage();
    return;
  }

  if(action.indexOf("global-open-")===0){
    var rest=action.slice(12);
    var dash=rest.indexOf("-");
    if(dash>0){
      openGlobalResult(rest.slice(0,dash), rest.slice(dash+1));
    }
    return;
  }

  if(action==="nav-stock"){
    ui.tab="stock";
    render();
    window.scrollTo(0,0);
    return;
  }

  if(action==="dash-rdv-mariage"){
    ui.tab="clientsModule";
    ui.clientsSub="mariages";
    mariageRdvStart();
    return;
  }

  if(action.indexOf("nav-")===0){
    var dest=action.slice(4);
    ui.wizard=null; ui.confirmDelete=null; ui.commandeOpen=null;
    if(["clients","mariages","ateliers","commandes","ventesSite","encaissements"].indexOf(dest)>=0){
      ui.tab="clientsModule"; ui.clientsSub=dest;
      if(dest!=="ateliers") ui.atelierOpen=null;
      if(dest!=="mariages") ui.mariageOpen=null;
    } else if(["devis","factures","emails"].indexOf(dest)>=0){
      ui.tab="documentsModule"; ui.documentsSub=dest;
    } else if(["tresorerie","achats"].indexOf(dest)>=0){
      ui.tab="financesModule"; ui.financesSub=dest;
    } else {
      ui.tab=dest;
    }
    render(); return;
  }
  
  if(action.indexOf("mod-clients-")===0){ ui.tab="clientsModule"; ui.clientsSub=action.slice(12); ui.commandeOpen=null; if(ui.clientsSub!=="ateliers") ui.atelierOpen=null; if(ui.clientsSub!=="mariages") ui.mariageOpen=null; render(); return; }
  if(action.indexOf("mod-documents-")===0){ ui.tab="documentsModule"; ui.documentsSub=action.slice(14); render(); return; }
  if(action.indexOf("mod-finances-")===0){ ui.tab="financesModule"; ui.financesSub=action.slice(13); render(); return; }

  
  if(action==="dash-pending-payments"){
    ui.pendingPaymentsModal=true;
    renderModal();
    return;
  }
  if(action==="pending-close"){
    ui.pendingPaymentsModal=false;
    renderModal();
    return;
  }
  
  if(action.indexOf("pending-atelier-")===0){
    ui.pendingPaymentsModal=false;
    ui.preview=null;
    ui.tab="clientsModule";
    ui.clientsSub="ateliers";
    ui.atelierOpen=action.slice(16);
    render();
    window.scrollTo(0,0);
    return;
  }

  if(action.indexOf("pending-preview-")===0){
    var pf=state.factures.find(function(f){return f.id===action.slice(16);});
    if(pf){
      ui.pendingPaymentsModal=false;
      ui.preview={kind:"facture",doc:pf};
      renderModal();
    }
    return;
  }

  

  if(action.indexOf("notif-open-facture-")===0){
    var nf=(state.factures||[]).find(function(f){return f.id===action.slice(19);});
    if(nf){ ui.preview={kind:"facture",doc:nf}; renderModal(); }
    return;
  }
  if(action.indexOf("notif-open-devis-")===0){
    var nd=findDevis(action.slice(17));
    if(nd){ ui.preview={kind:"devis",doc:nd}; renderModal(); }
    return;
  }
  if(action.indexOf("notif-open-atelier-")===0){
    ui.tab="clientsModule"; ui.clientsSub="ateliers"; ui.atelierOpen=action.slice(19); ui.mariageOpen=null; ui.commandeOpen=null; render(); window.scrollTo(0,0); return;
  }
  if(action.indexOf("notif-open-mariage-")===0){
    ui.tab="clientsModule"; ui.clientsSub="mariages"; ui.mariageOpen=action.slice(19); ui.atelierOpen=null; ui.commandeOpen=null; render(); window.scrollTo(0,0); return;
  }

    if(action==="treso-current-month"){ var tn=new Date(); ui.tresoYear=tn.getFullYear(); ui.tresoMonth=tn.getMonth()+1; render(); return; }

  if(action==="dash-todo-save"){ saveTodoFromFields(); ui.todoEditing=false; saveCache(); toast("Todo list enregistrée."); return; }

  
  if(action==="stock-edit-save"){ saveStockEdit(); return; }
  if(action==="stock-edit-cancel"){ ui.stockEditId=null; renderModal(); return; }
  if(action.indexOf("stock-edit-")===0){ openStockEdit(action.slice(11)); return; }

  if(action==="stock-recipe-add"){
    if(!captureAtelierRecipeEditor(false)) return;
    var first=(state.stockItems||[])[0];
    ensureAtelierRecipeSettings()[ui.stockRecipeModel].push({id:uid(),stockItemId:first?first.id:"",stockKey:"",qtyPerPerson:1,conditionKey:"",conditionValue:"",label:first?first.nom:"Matériel"});
    render();
    setTimeout(function(){var el=document.getElementById('atelierRecipeManager'); if(el) el.scrollIntoView({block:'start'});},0);
    return;
  }
  if(action==="stock-recipe-save"){
    if(!captureAtelierRecipeEditor(true)) return;
    saveCache(); render(); toast("Recette atelier enregistrée."); return;
  }
  if(action.indexOf("stock-recipe-remove-")===0){
    captureAtelierRecipeEditor(false);
    var rid=action.slice(20);
    ensureAtelierRecipeSettings()[ui.stockRecipeModel]=(atelierRecipeLines(ui.stockRecipeModel)||[]).filter(function(x){return x.id!==rid;});
    render(); return;
  }
  if(action==="stock-recipe-reset"){
    var rkey="recipe-reset:"+ui.stockRecipeModel;
    if(ui.confirmDelete!==rkey){ui.confirmDelete=rkey; toast("Retouche Rétablir pour confirmer la remise à zéro de cette recette."); return;}
    var rm=atelierModeleById(ui.stockRecipeModel); ensureAtelierRecipeSettings()[ui.stockRecipeModel]=defaultAtelierRecipeLines(rm); ui.confirmDelete=null; saveCache(); render(); toast("Recette initiale rétablie."); return;
  }
  if(action==="stock-import-ateliers"){
    if(!confirm("Ajouter ou associer les références de stock initiales communiquées ? Les quantités existantes ne seront pas remplacées.")) return;
    importAtelierInitialStock(); return;
  }
  if(action==="stock-add"){ addStockItem(); return; }
  if(action.indexOf("stock-adjust-")===0){ adjustStockItem(action.slice(13)); return; }
  if(action.indexOf("stock-del-")===0){
    var sid=action.slice(10), key="stock:"+sid;
    var linkedItem=(state.stockItems||[]).find(function(it){return it.id===sid;});
    var usages=atelierRecipeLinksForStockItem(linkedItem);
    if(usages.length){ toast("Cet article est utilisé dans "+usages.length+" recette(s) atelier. Retire d’abord ses associations."); return; }
    if(ui.confirmDelete!==key){ ui.confirmDelete=key; toast("Retouche Supprimer pour confirmer."); return; }
    state.stockItems=(state.stockItems||[]).filter(function(it){return it.id!==sid;});
    ui.confirmDelete=null;
    saveCache();
    render();
    toast("Article supprimé du stock.");
    return;
  }

  if(action.indexOf("fac-group-toggle-")===0){ ui.factureGroups=ui.factureGroups||{}; var g=action.slice(17); ui.factureGroups[g]=!(ui.factureGroups[g]===undefined?true:ui.factureGroups[g]); render(); return; }
  if(action==="newdevis"){ ui.tab="documentsModule"; ui.documentsSub="devis"; newWizard(); render(); return; }
  if(action==="go-calendrier"){ ui.tab="calendrier"; render(); return; }

  
  if(action==="at-doc-devis-create"){
    var ad=getAtelier(ui.atelierOpen);
    if(ad){ captureAtelier(ad); var dv=atelierCreateDevis(ad); if(dv){ saveCache(); render(); toast("Devis "+dv.numero+" créé."); } }
    return;
  }
  if(action==="at-doc-devis-preview"){
    var apd=getAtelier(ui.atelierOpen), dd=atelierLinkedDevis(apd);
    if(dd){ ui.preview={kind:"devis",doc:dd}; renderModal(); }
    else toast("Aucun devis lié à cet atelier.");
    return;
  }
  if(action==="at-doc-devis-email"){
    var aed=getAtelier(ui.atelierOpen), de=atelierLinkedDevis(aed);
    if(de){ envoyerDocumentEmail("devis", de); }
    else toast("Aucun devis lié à cet atelier.");
    return;
  }
  if(action==="at-doc-devis-sync"){
    var aus=getAtelier(ui.atelierOpen);
    if(aus){ captureAtelier(aus); var uds=atelierSyncLinkedDevis(aus); if(uds){ saveCache(); render(); toast("Devis "+uds.numero+" mis à jour avec les lignes actuelles."); } }
    return;
  }
  if(action==="at-doc-fac-acompte" || action==="at-doc-fac-totale" || action==="at-doc-fac-solde"){
    var af=getAtelier(ui.atelierOpen);
    if(af){
      captureAtelier(af);
      var typ=action==="at-doc-fac-acompte"?"acompte":(action==="at-doc-fac-solde"?"solde":"totale");
      var fac=atelierCreateFactureFromDevis(af, typ);
      if(fac){
        saveCache();
        render();
        toast("Facture "+fac.numero+" créée.");
      }
    }
    return;
  }
  if(action.indexOf("at-doc-fac-preview-")===0){
    var fid=action.slice(19);
    var ff=(state.factures||[]).find(function(f){return f.id===fid;});
    if(ff){ ui.preview={kind:"facture",doc:ff}; renderModal(); }
    return;
  }
  if(action.indexOf("at-doc-fac-email-")===0){
    var fid2=action.slice(17);
    var ff2=(state.factures||[]).find(function(f){return f.id===fid2;});
    if(ff2){ envoyerDocumentEmail("facture", ff2); }
    return;
  }

  if(action==="at-new"){ newAtelier(); return; }
  if(action.indexOf("at-open-")===0){ ui.tab="clientsModule"; ui.clientsSub="ateliers"; ui.atelierOpen=action.slice(8); ui.mariageOpen=null; ui.commandeOpen=null; ui.confirmDelete=null; render(); window.scrollTo(0,0); return; }
  if(action==="at-back"){ ui.atelierOpen=null; render(); return; }
  if(action==="at-save"){ var as=getAtelier(ui.atelierOpen); if(as){ captureAtelier(as); saveCache(); render(); toast("Atelier enregistré — mode simulation, stock inchangé."); } return; }
  if(action==="at-mode-change"){ var am=getAtelier(ui.atelierOpen); if(am){ captureAtelier(am); saveCache(); render(); } return; }
  if(action==="at-stock-config-change"){ var ac=getAtelier(ui.atelierOpen); if(ac){ captureAtelier(ac); saveCache(); render(); } return; }
  if(action.indexOf("at-extra-add-")===0){ var ax=getAtelier(ui.atelierOpen); if(ax){ captureAtelier(ax); var pi=Number(action.slice(13)); var list=prestationsActives(); var preset=list[pi]||list[list.length-1]||{label:"Autre / champ libre",type:"service",qte:1,prix:0}; ax.prestationsComplementaires=ax.prestationsComplementaires||[]; var ptype=preset.type==="bien"?"bien":"service"; ax.prestationsComplementaires.push({id:uid(),designation:preset.label,type:ptype,urssafType:ptype,qte:preset.qte||1,prix:num(preset.prix)}); saveCache(); render(); toast("Ligne ajoutée au devis atelier."); } return; }
  if(action.indexOf("at-extra-del-")===0){ var axd=getAtelier(ui.atelierOpen); if(axd){ captureAtelier(axd); var xid=action.slice(13); axd.prestationsComplementaires=(axd.prestationsComplementaires||[]).filter(function(l){return l.id!==xid;}); saveCache(); render(); toast("Ligne supprimée."); } return; }
  if(action.indexOf("at-del-")===0){ var adid=action.slice(7), akey="atelier:"+adid; if(ui.confirmDelete!==akey){ ui.confirmDelete=akey; render(); toast("Retouche Supprimer pour confirmer."); return; } state.ateliers=(state.ateliers||[]).filter(function(a){return a.id!==adid;}); ui.confirmDelete=null; ui.atelierOpen=null; saveCache(); render(); toast("Atelier supprimé — stock inchangé (simulation)."); return; }
  if(action==="at-part-add"){ var aa=getAtelier(ui.atelierOpen); if(aa){ captureAtelier(aa); var nom=val("atPNom").trim(); if(!nom){ toast("Indique le nom de la participante."); return; } var montant=num(val("atPMontant")); if(montant<=0){ toast("Indique le montant de la prestation."); return; } aa.participants=aa.participants||[]; aa.participants.push({id:uid(),nom:nom,email:val("atPEmail"),tel:val("atPTel"),prestation:val("atPPrestation"),montant:montant,facturation:val("atPFacturation")||"acompte30"}); ensureClients([nom]); saveCache(); render(); toast("Participante ajoutée."); } return; }
  if(action.indexOf("at-part-del-")===0){ var pp=action.slice(12).split("-"), at=getAtelier(pp[0]); if(at){ at.participants=(at.participants||[]).filter(function(p){return p.id!==pp[1];}); saveCache(); render(); toast("Participante supprimée."); } return; }
  if(action.indexOf("at-fac-")===0){ var parts=action.slice(7).split("-"), mode=parts[0], aid=parts[1], pid=parts[2]; if(mode==="solde"){ aid=parts[1]; pid=parts[2]; } var afat=getAtelier(aid); var ap=afat&&(afat.participants||[]).find(function(p){return p.id===pid;}); if(afat&&ap){ captureAtelier(afat); var fac=atelierCreateFacture(afat,ap,mode); if(fac){ saveCache(); render(); toast("Facture "+fac.numero+" créée dans la section Factures."); } } return; }

  
  if(action==="site-new"){ newSiteSaleDraft(); ui.tab="clientsModule"; ui.clientsSub="ventesSite"; render(); return; }
  if(action==="site-cancel"){ ui.siteSaleDraft=null; render(); return; }
  if(action==="site-mode-nouveau"){ captureSiteSaleDraft(); ui.siteSaleDraft.clientMode="nouveau"; render(); return; }
  if(action==="site-mode-existant"){ captureSiteSaleDraft(); ui.siteSaleDraft.clientMode="existant"; if(!ui.siteSaleDraft.clientId&&state.clients[0]) ui.siteSaleDraft.clientId=state.clients[0].id; render(); return; }
  if(action==="site-activite-change"){ captureSiteSaleDraft(); render(); return; }
  if(action==="site-atelier-change"){ captureSiteSaleDraft(); render(); return; }
  if(action==="site-atelier-pay-change"){ captureSiteSaleDraft(); render(); return; }
  if(action==="site-save"){ saveSiteSale(); return; }
  if(action.indexOf("site-del-")===0){
    var sid=action.slice(9), skey="site:"+sid;
    if(ui.confirmDelete!==skey){ ui.confirmDelete=skey; render(); toast("Retouche Supprimer pour confirmer."); return; }
    var saleToDelete=(state.ventesSite||[]).find(function(s){return s.id===sid;});
    removeSiteSaleFromAtelier(saleToDelete);
    state.ventesSite=(state.ventesSite||[]).filter(function(s){return s.id!==sid;});
    ui.confirmDelete=null; saveCache(); render(); toast("Vente site supprimée."); return;
  }

  if(action==="go-achats"){ ui.tab="financesModule"; ui.financesSub="achats"; render(); return; }
  if(action==="achat-new"){ newAchatDraft(); ui.tab="financesModule"; ui.financesSub="achats"; render(); return; }
  if(action==="achat-cancel"){ ui.achatDraft=null; render(); return; }
  if(action==="achat-save"){ saveAchat(); return; }
  if(action==="achat-proof-pick"){ captureAchatDraft(); var af=document.getElementById("achatFileInput"); if(af) af.click(); return; }
  if(action==="achat-proof-remove"){ if(ui.achatDraft){ ui.achatDraft.justificatif=null; ui.achatDraft.ocrText=""; render(); } return; }
  if(action==="achat-proof-open"){ if(ui.achatDraft&&ui.achatDraft.justificatif){ window.open(ui.achatDraft.justificatif.dataUrl,"_blank"); } return; }
  if(action==="achat-ocr-retry"){ if(ui.achatDraft&&ui.achatDraft.justificatif){ runAchatOCR(ui.achatDraft.justificatif.dataUrl); } return; }
  if(action.indexOf("achat-open-")===0){ var ao=(state.achats||[]).find(function(a){return a.id===action.slice(11);}); if(ao&&ao.justificatif){ window.open(ao.justificatif.dataUrl,"_blank"); } return; }
  if(action.indexOf("achat-validate-")===0){ var av=(state.achats||[]).find(function(a){return a.id===action.slice(15);}); if(av){ av.statut=av.statut==="valide"?"a_verifier":"valide"; saveCache(); render(); } return; }
  if(action.indexOf("achat-del-")===0){ var aid=action.slice(10), key="achat:"+aid; if(ui.confirmDelete!==key){ ui.confirmDelete=key; render(); toast("Retouche Supprimer pour confirmer."); return; } state.achats=(state.achats||[]).filter(function(a){return a.id!==aid;}); ui.confirmDelete=null; saveCache(); render(); toast("Achat supprimé."); return; }
  if(action==="cal-prev"){ calSetMonth(-1); return; }
  if(action==="cal-next"){ calSetMonth(1); return; }
  if(action==="cal-today"){ ui.calMonth=todayISO().slice(0,7); render(); return; }
  if(action.indexOf("email-preview-devis-")===0){ var ed=findDevis(action.slice(20)); if(ed){ ui.preview={kind:"devis",doc:ed}; renderModal(); } return; }
  if(action.indexOf("email-preview-facture-")===0){ var ef=state.factures.find(function(x){return x.id===action.slice(22);}); if(ef){ ui.preview={kind:"facture",doc:ef}; renderModal(); } return; }
  if(action==="do-login"){ doLogin(); return; }
  if(action==="do-logout"){ if(confirm("Se déconnecter ?")){ auth.signOut(); } return; }
  if(action==="cloud-backup"){ downloadJSON(JSON.stringify(serialize(),null,2), "sauvegarde-atelier-"+todayISO()+".json"); toast("Sauvegarde téléchargée."); return; }
  if(action==="restore-pick"){ var ri=document.getElementById("restoreInput"); if(ri) ri.click(); return; }
  if(action==="gdrive-save"){ saveParams(); return; }
  if(action==="gdrive-backup"){ state.settings.googleDriveUrl=val("pGoogleDriveUrl"); var gda=document.getElementById("pGoogleDriveAuto"); state.settings.googleDriveAuto=!!(gda&&gda.checked); googleDriveBackup(true); return; }
  if(action==="gdrive-restore-latest"){ state.settings.googleDriveUrl=val("pGoogleDriveUrl"); var gda2=document.getElementById("pGoogleDriveAuto"); state.settings.googleDriveAuto=!!(gda2&&gda2.checked); googleDriveRestoreLatest(); return; }
  if(action==="params-prestation-add"){ captureParamsForm(); state.settings.prestationsBibliotheque=prestationBibliothequeNormalisee(); state.settings.prestationsBibliotheque.push({id:uid(),label:"Nouvelle prestation",type:"service",qte:1,prix:0,actif:true}); saveCache(); render(); toast("Prestation ajoutée à la bibliothèque."); return; }
  if(action.indexOf("params-prestation-del-")===0){ captureParamsForm(); var pid=action.slice(22); state.settings.prestationsBibliotheque=prestationBibliothequeNormalisee().filter(function(p){return p.id!==pid;}); saveCache(); render(); toast("Prestation supprimée de la bibliothèque."); return; }

  // wizard
  if(action==="wz-cancel"){ ui.wizard=null; render(); return; }
  if(action==="wz-mode-nouveau"){ captureWizardInputs(); ui.wizard.clientMode="nouveau"; render(); return; }
  if(action==="wz-mode-existant"){ ui.wizard.clientMode="existant"; render(); return; }
  if(action==="wz-next"){ captureWizardInputs();
    if(ui.wizard.step===1){
      if(ui.wizard.clientMode==="nouveau" && !(ui.wizard.client.nom||"").trim()){ toast("Indiquez le nom du client."); return; }
      if(ui.wizard.clientMode==="existant" && !ui.wizard.clientId){ toast("Choisissez un client."); return; }
    }
    if(ui.wizard.step===2 && ui.wizard.lignes.length===0){ toast("Ajoutez au moins une ligne."); return; }
    ui.wizard.step++; render(); return; }
  if(action==="wz-back"){ captureWizardInputs(); ui.wizard.step--; render(); return; }
  if(action==="wz-addfree"){ ui.wizard.lignes.push({id:uid(),designation:"",type:"bien",qte:1,prix:0}); render(); return; }
  if(action.indexOf("wz-add-")===0){ var it=state.catalogue.find(function(c){return c.id===action.slice(7);}); if(it){ ui.wizard.lignes.push({id:uid(),designation:it.designation,type:it.type,qte:1,prix:it.prix}); render(); } return; }
  if(action.indexOf("wz-delline-")===0){ var lid=action.slice(11); ui.wizard.lignes=ui.wizard.lignes.filter(function(l){return l.id!==lid;}); render(); return; }
  if(action==="wz-finish"){ finishWizard(); return; }

  // devis
  if(action.indexOf("facture-preview-")===0){ var fp=state.factures.find(function(f){return f.id===action.slice(16);}); if(fp){ ui.preview={kind:"facture",doc:fp}; renderModal(); } return; }
  if(action.indexOf("devis-preview-")===0){ ui.preview={kind:"devis",doc:findDevis(action.slice(14))}; renderModal(); return; }
  if(action.indexOf("devis-email-")===0){ envoyerDocumentEmail("devis", findDevis(action.slice(12))); return; }
  if(action.indexOf("devis-filtre-")===0){ ui.devisFiltre=action.slice(13); ui.confirmDelete=null; render(); return; }
  if(action.indexOf("devis-archive-")===0){ var da=findDevis(action.slice(14)); if(da){ da.statutAvantArchive=da.statut; da.statut="archive"; ui.devisFiltre="archives"; saveCache(); render(); toast("Devis archivé."); } return; }
  if(action.indexOf("devis-unarchive-")===0){ var du=findDevis(action.slice(16)); if(du){ du.statut=du.statutAvantArchive||"envoye"; delete du.statutAvantArchive; ui.devisFiltre=(du.statut==="accepte"?"acceptes":(du.statut==="refuse"?"refuses":"actifs")); saveCache(); render(); toast("Devis désarchivé."); } return; }
  if(action.indexOf("devis-del-")===0){ var did=action.slice(10), key="devis:"+did;
    if(facturesDuDevis(did).length){ toast("Impossible : supprime d'abord les factures liées à ce devis."); return; }
    if(ui.confirmDelete!==key){ ui.confirmDelete=key; render(); toast("Retouche sur « Confirmer suppression » pour supprimer définitivement ce devis."); return; }
    state.devis=state.devis.filter(function(d){return d.id!==did;}); ui.confirmDelete=null; saveCache(); render(); toast("Devis supprimé."); return; }
  if(action.indexOf("devis-st-")===0){ var rest=action.slice(9); var i=rest.lastIndexOf("-"); var id=rest.slice(0,i), st=rest.slice(i+1); var d=findDevis(id); if(d){
    if(st==="accepte"){
      var res=validerDevisEtCreerSuivi(d);
      saveCache();
      ui.tab="devis";
      ui.devisFiltre="acceptes";
      ui.commandeOpen=null;
      render();
      toast("Devis accepté : choisis maintenant facture d\'acompte ou facture complète.");
    }
    else { d.statut=st; saveCache(); render(); }
  } return; }

  // commandes
  if(action==="cmd-new"){ newCommandeDraft(); ui.confirmDelete=null; render(); window.scrollTo(0,0); return; }
  if(action==="cmd-cancel"){ ui.commandeDraft=null; render(); return; }
  if(action==="cmd-mode-nouveau"){ captureCommandeDraft(); ui.commandeDraft.clientMode="nouveau"; render(); return; }
  if(action==="cmd-mode-existant"){ captureCommandeDraft(); ui.commandeDraft.clientMode="existant"; if(!ui.commandeDraft.clientId&&state.clients[0]) ui.commandeDraft.clientId=state.clients[0].id; render(); return; }
  if(action==="cmd-addfree"){ captureCommandeDraft(); ui.commandeDraft.lignes.push({id:uid(),designation:"",type:"bien",qte:1,prix:0}); render(); return; }
  if(action.indexOf("cmd-addcat-")===0){ captureCommandeDraft(); var ci=state.catalogue.find(function(c){return c.id===action.slice(11);}); if(ci){ ui.commandeDraft.lignes.push({id:uid(),designation:ci.designation,type:ci.type,qte:1,prix:ci.prix}); render(); } return; }
  if(action.indexOf("cmd-delline-")===0){ captureCommandeDraft(); var clid=action.slice(12); ui.commandeDraft.lignes=ui.commandeDraft.lignes.filter(function(l){return l.id!==clid;}); render(); return; }
  if(action==="cmd-create"){ createCommande(); return; }
  if(action==="cmd-suivi"){ ui.commandeOpen=null; render(); return; }
  if(action.indexOf("cmd-open-")===0){ ui.tab="commandes"; ui.commandeOpen=action.slice(9); ui.commandeDraft=null; ui.confirmDelete=null; render(); window.scrollTo(0,0); return; }
  if(action==="cmd-back"){ captureCommandeOpen(); saveCache(); ui.commandeOpen=null; render(); return; }
  if(action==="cmd-save"){ captureCommandeOpen(); saveCache(); render(); toast("Fiche commande enregistrée."); return; }
  if(action==="cmd-detail-addfree"){ var co=getCommande(ui.commandeOpen); if(co){ captureCommandeOpen(); co.lignes=co.lignes||[]; co.lignes.push({id:uid(),designation:"",type:"bien",qte:1,prix:0}); saveCache(); render(); } return; }
  if(action.indexOf("cmd-detail-delline-")===0){ var co2=getCommande(ui.commandeOpen); if(co2){ captureCommandeOpen(); var dlid=action.slice(19); co2.lignes=(co2.lignes||[]).filter(function(l){return l.id!==dlid;}); saveCache(); render(); } return; }
  if(action.indexOf("cmd-fac-preview-")===0){ var cf=state.factures.find(function(x){return x.id===action.slice(16);}); if(cf){ ui.preview={kind:"facture",doc:cf}; renderModal(); } return; }
  if(action==="cmd-hist-add"){ var ch=getCommande(ui.commandeOpen); if(ch){ captureCommandeOpen(); var tx=val("cmdHistInput"); if(tx.trim()){ ch.historique=ch.historique||[]; ch.historique.unshift({date:todayISO(),texte:tx}); saveCache(); render(); } } return; }
  if(action.indexOf("cmd-del-")===0){ var cdid=action.slice(8), ckey="commande:"+cdid;
    if(ui.confirmDelete!==ckey){ ui.confirmDelete=ckey; render(); toast("Retouche sur « Confirmer suppression » pour supprimer définitivement cette commande."); return; }
    state.commandes=state.commandes.filter(function(x){return x.id!==cdid;}); if(ui.commandeOpen===cdid) ui.commandeOpen=null; ui.confirmDelete=null; saveCache(); render(); toast("Commande supprimée."); return; }

  // facture directe
  if(action==="fac-new"){ newFactureDraft(); ui.confirmDelete=null; render(); window.scrollTo(0,0); return; }
  if(action==="fac-cancel-manual"){ ui.factureDraft=null; render(); return; }
  if(action==="fac-mode-nouveau"){ captureFactureDraft(); ui.factureDraft.clientMode="nouveau"; render(); return; }
  if(action==="fac-mode-existant"){ captureFactureDraft(); ui.factureDraft.clientMode="existant"; if(!ui.factureDraft.clientId&&state.clients[0]) ui.factureDraft.clientId=state.clients[0].id; render(); return; }
  if(action==="fac-addfree"){ captureFactureDraft(); ui.factureDraft.lignes.push({id:uid(),designation:"",type:"bien",qte:1,prix:0}); render(); return; }
  if(action.indexOf("fac-addcat-")===0){ captureFactureDraft(); var fi=state.catalogue.find(function(c){return c.id===action.slice(11);}); if(fi){ ui.factureDraft.lignes.push({id:uid(),designation:fi.designation,type:fi.type,qte:1,prix:fi.prix}); render(); } return; }
  if(action.indexOf("fac-delline-")===0){ captureFactureDraft(); var flid=action.slice(12); ui.factureDraft.lignes=ui.factureDraft.lignes.filter(function(l){return l.id!==flid;}); render(); return; }
  if(action==="fac-create-manual"){ createManualFacture(); return; }

  
  if(action.indexOf("treso-open-facture-")===0){
    var tf=state.factures.find(function(f){return f.id===action.slice(19);});
    if(tf){ ui.preview={kind:"facture",doc:tf}; renderModal(); }
    return;
  }
  // factures depuis devis
  if(action.indexOf("fac-acompte-")===0){
    var d1=findDevis(action.slice(12));
    if(d1){
      var fa=creerAcompte(d1);
      if(fa){
        askPaymentMethodModal("Moyen de paiement", "Si l'acompte est déjà réglé, choisis le moyen de paiement. Laisse « À choisir » si non payé.", fa.paiementClient||"", function(mpA){
          if(mpA){ fa.paiementClient=mpA; }
          saveCache(); ui.tab="factures"; render(); toast("Facture d'acompte créée.");
        });
      }else{ saveCache(); ui.tab="factures"; render(); toast("Facture d'acompte créée."); }
    }
    return;
  }
  if(action.indexOf("fac-solde-")===0){
    var d2=findDevis(action.slice(10));
    if(d2){
      var fs=creerSolde(d2);
      if(fs){
        askPaymentMethodModal("Moyen de paiement", "Si le solde est déjà réglé, choisis le moyen de paiement. Laisse « À choisir » si non payé.", fs.paiementClient||"", function(mpS){
          if(mpS){ fs.paiementClient=mpS; }
          saveCache(); ui.tab="factures"; render(); toast("Facture de solde créée.");
        });
      }else{ saveCache(); ui.tab="factures"; render(); toast("Facture de solde créée."); }
    }
    return;
  }
  if(action.indexOf("fac-totale-")===0){
    var d3=findDevis(action.slice(11));
    if(d3){
      var ft=creerTotale(d3);
      if(ft){
        askPaymentMethodModal("Moyen de paiement", "Si la facture est déjà réglée, choisis le moyen de paiement. Laisse « À choisir » si non payée.", ft.paiementClient||"", function(mpT){
          if(mpT){ ft.paiementClient=mpT; }
          saveCache(); ui.tab="factures"; render(); toast("Facture créée.");
        });
      }else{ saveCache(); ui.tab="factures"; render(); toast("Facture créée."); }
    }
    return;
  }

  // factures
  if(action.indexOf("fac-preview-")===0){ var f=state.factures.find(function(x){return x.id===action.slice(12);}); ui.preview={kind:"facture",doc:f}; renderModal(); return; }
  if(action.indexOf("fac-email-")===0){ var fe=state.factures.find(function(x){return x.id===action.slice(10);}); envoyerDocumentEmail("facture", fe); return; }
  if(action.indexOf("fac-paymethod-")===0){
    var fm=state.factures.find(function(x){return x.id===action.slice(14);});
    if(fm){
      askPaymentMethodModal("Moyen de paiement", "Choisis le moyen de paiement de la cliente.", fm.paiementClient||"", function(mp){
        fm.paiementClient=mp||"";
        saveCache(); render(); toast("Moyen de paiement enregistré.");
      });
    }
    return;
  }
  if(action.indexOf("fac-paid-")===0){
    var fp=state.factures.find(function(x){return x.id===action.slice(9);});
    if(fp){
      var finishPaid=function(){
        fp.statut="payee";
        fp.datePaiement=fp.datePaiement||todayISO();
        if(fp.type==="acompte" && fp.devisId){
          var dd=findDevis(fp.devisId);
          var hasSolde=facturesDuDevis(fp.devisId).some(function(f){return f.type==="solde";});
          var hasTotale=facturesDuDevis(fp.devisId).some(function(f){return f.type==="totale";});
          if(dd && !hasSolde && !hasTotale){ creerSolde(dd); toast("Acompte payé : facture de solde créée."); }
          else { toast("Facture marquée payée."); }
        } else { toast("Facture marquée payée."); }
        saveCache(); render();
      };
      if(!fp.paiementClient){
        askPaymentMethodModal("Moyen de paiement", "Choisis le moyen de paiement avant de marquer la facture comme payée.", "", function(mp){
          fp.paiementClient=mp||"";
          finishPaid();
        });
      }else{
        finishPaid();
      }
    }
    return;
  }
  if(action.indexOf("fac-st-")===0){
    var r2s=action.slice(7); var j=r2s.lastIndexOf("-"); var fid=r2s.slice(0,j), st2=r2s.slice(j+1);
    var ff=state.factures.find(function(x){return x.id===fid;});
    if(ff){
      var finishStatus=function(){
        ff.statut=st2;
        if(st2==="payee") ff.datePaiement=ff.datePaiement||todayISO();
        else ff.datePaiement=null;
        saveCache(); render();
      };
      if(st2==="payee" && !ff.paiementClient){
        askPaymentMethodModal("Moyen de paiement", "Choisis le moyen de paiement avant de passer la facture en payée.", "", function(mp){
          ff.paiementClient=mp||"";
          finishStatus();
        });
      }else{
        finishStatus();
      }
    }
    return;
  }
  if(action.indexOf("fac-del-")===0){ var fdid=action.slice(8), key="facture:"+fdid;
    if(ui.confirmDelete!==key){ ui.confirmDelete=key; render(); toast("Retouche sur « Confirmer suppression » pour supprimer définitivement cette facture."); return; }
    state.factures=state.factures.filter(function(x){return x.id!==fdid;}); ui.confirmDelete=null; saveCache(); render(); toast("Facture supprimée."); return; }

  // catalogue
  if(action==="cat-add"){ var nom=val("catNom"); if(!nom.trim()){ toast("Indiquez une désignation."); return; } state.catalogue.push({id:uid(),designation:nom,type:val("catType"),prix:num(val("catPrix"))}); saveCache(); render(); return; }
  if(action.indexOf("cat-del-")===0){ var cid=action.slice(8); state.catalogue=state.catalogue.filter(function(c){return c.id!==cid;}); saveCache(); render(); return; }

  if(action.indexOf("crm-open-facture-")===0){ var cf=state.factures.find(function(f){return f.id===action.slice(17);}); if(cf){ ui.preview={kind:"facture",doc:cf}; renderModal(); } return; }

  // clients
  if(action==="cli-add"){
    addClientFromForm();
    return;
  }
  if(action.indexOf("cli-open-")===0){ ui.clientOpen=action.slice(9); render(); window.scrollTo(0,0); return; }
  if(action==="cli-back"){ ui.clientOpen=null; render(); return; }
  if(action.indexOf("cli-savecontact-")===0){ var cc=state.clients.find(function(x){return x.id===action.slice(16);}); if(cc){ cc.email=val("cdEmail"); cc.tel=val("cdTel"); cc.adresse=val("cdAdr"); cc.canal=val("cdCanal"); cc.anniversaire=val("cdAnniv"); cc.notes=val("cdNotes"); cc.updatedAt=todayISO(); (state.mariages||[]).forEach(function(m){ var cm=clientContactForMariage(m); if(cm&&cm.id===cc.id){ syncMariageLinkedDevis(m,{silent:true}); } }); saveCache(); render(); toast("Contact enregistré. Devis lié actualisé si nécessaire."); } return; }
  if(action.indexOf("cli-del-")===0){ var clid=action.slice(8); if(confirm("Supprimer cette fiche cliente ? (son historique de ventes n'est pas supprimé)")){ state.clients=state.clients.filter(function(c){return c.id!==clid;}); ui.clientOpen=null; saveCache(); render(); } return; }

  // logo
  if(action==="logo-pick"){ document.getElementById("logoInput").click(); return; }
  if(action==="logo-remove"){ state.logo=""; saveCache(); render(); return; }

  // params
  if(action==="params-save"){ saveParams(); return; }

  // export
  if(action.indexOf("csv-")===0){ exportCSV(action.slice(4)); return; }

  // encaissements
  if(action==="enc-add"){ addManualEncaissementFromForm(); return; }
  if(action==="enc-clearimport"){ if(confirm("Supprimer tous les encaissements issus d'un import ? (les ventes saisies à la main sont conservées)")){ state.encaissements=state.encaissements.filter(function(e){return e.source!=="import";}); saveCache(); render(); toast("Encaissements importés supprimés."); } return; }
  if(action.indexOf("enc-del-")===0){ var eid=action.slice(8); if(confirm("Supprimer cet encaissement ?")){ state.encaissements=state.encaissements.filter(function(x){return x.id!==eid;}); saveCache(); render(); } return; }
  if(action==="enc-import"){ document.getElementById("encImport").click(); return; }
  if(action==="enc-template"){ downloadTemplateCSV(); return; }

  // mariages
  if(action==="mar-new"){ ui.tab="mariages"; newMariage(); return; }
  if(action==="mar-rdv-start"){ mariageRdvStart(); return; }
  if(action==="mar-rdv-cancel"){ ui.mariageRdvDraft=null; ui.mariageView="fiches"; render(); window.scrollTo(0,0); return; }
  if(action==="mar-rdv-create"){ createMariageFromRdv(); return; }
  if(action==="mar-rdv-media-pick"){ captureMariageRdvDraft(); var ri=document.getElementById("rdvMedia"); if(ri) ri.click(); return; }
  if(action.indexOf("mar-rdv-media-open-")===0){ openRdvMedia(action.slice(19)); return; }
  if(action.indexOf("mar-rdv-media-del-")===0){ var rd=mariageRdvDraft(); captureMariageRdvDraft(); var rmid=action.slice(18); rd.medias=(rd.medias||[]).filter(function(x){return x.id!==rmid;}); render(); return; }
  if(action==="mar-rdv-from-current"){ var crm=getMariage(ui.mariageOpen); if(crm){ captureMariageInputs(); ui.mariageRdvDraft=Object.assign(mariageRdvDefault(),{nom:crm.nom||"",email:crm.email||"",tel:crm.tel||"",canalCommunication:crm.canalCommunication||"Téléphone",dateMariage:crm.dateMariage||"",dateLivraison:crm.dateLivraison||"",modeLivraison:crm.modeLivraison||"",lieu:crm.lieu||"",theme:crm.theme||"",budget:crm.budget||"",notes:crm.besoins||"",relance:crm.relance||"",medias:(crm.medias||[]).map(function(md){return Object.assign({},md);})}); ui.mariageView="rdv"; ui.mariageOpen=null; render(); window.scrollTo(0,0); } return; }
  if(action==="mar-filter-avenir"){ ui.mariageFilter="avenir"; render(); return; }
  if(action==="mar-filter-tous"){ ui.mariageFilter="tous"; render(); return; }
  if(action==="mar-view-fiches"){ ui.mariageView="fiches"; render(); return; }
  if(action==="mar-view-preparer"){ ui.mariageView="preparer"; render(); return; }
  if(action==="goto-preparer"){ ui.tab="mariages"; ui.mariageView="preparer"; ui.mariageOpen=null; render(); window.scrollTo(0,0); return; }
  if(action==="goto-commandes-suivi"){ ui.tab="commandes"; ui.commandeOpen=null; render(); window.scrollTo(0,0); return; }
  if(action.indexOf("dash-month-")===0 && action!=="dash-month-close"){ var mi=parseInt(action.slice(11),10); var an=String(ui.anneeDash); if(ui.monthDetail && ui.monthDetail.year===an && ui.monthDetail.month===mi){ ui.monthDetail=null; } else { ui.monthDetail={year:an,month:mi}; } render(); return; }
  if(action==="dash-month-close"){ ui.monthDetail=null; render(); return; }
  if(action==="prep-cmd-add"){ var lbl=val("cmdLabel"); if(!lbl.trim()){ toast("Indique l'article à préparer."); return; } state.commandes.unshift({ id:uid(), label:lbl, client:val("cmdClient"), dateLivraison:val("cmdDate"), fait:false, createdAt:todayISO() }); saveCache(); render(); return; }
  if(action.indexOf("prep-cmd-del-")===0){ var cid=action.slice(13); state.commandes=state.commandes.filter(function(x){return x.id!==cid;}); saveCache(); render(); return; }
  if(action.indexOf("mar-open-")===0){ ui.tab="clientsModule"; ui.clientsSub="mariages"; ui.mariageOpen=action.slice(9); ui.mariageDetailTab="resume"; ui.atelierOpen=null; ui.commandeOpen=null; ui.confirmDelete=null; render(); window.scrollTo(0,0); return; }
  if(action.indexOf("mar-livre-")===0){ var ml=getMariage(action.slice(10)); if(ml){ ml.livre=true; ml.dateLivree=ml.dateLivree||todayISO(); ml.statut="realise"; saveCache(); render(); toast("Fiche classée en terminée."); } return; }
  if(action==="mar-livre-toggle"){ var mt=getMariage(ui.mariageOpen); if(mt){ mt.livre=!mt.livre; mt.dateLivree=mt.livre?todayISO():""; if(mt.livre) mt.statut="realise"; captureMariageInputs(); saveCache(); render(); } return; }
  if(action.indexOf("mar-tab-")===0){ captureMariageInputs(); ui.mariageDetailTab=action.slice(8)||"resume"; saveCache(); render(); window.scrollTo(0,0); return; }
  if(action==="mar-back"){ captureMariageInputs(); saveCache(); ui.mariageOpen=null; ui.mariageDetailTab="resume"; render(); return; }
  if(action==="mar-save"){ captureMariageInputs(); saveCache(); render(); toast("Fiche enregistrée et synchronisée."); return; }
  if(action.indexOf("mar-del-")===0){ var mid=action.slice(8), key="mariage:"+mid;
    if(ui.confirmDelete!==key){ ui.confirmDelete=key; render(); toast("Retouche sur « Confirmer suppression » pour supprimer définitivement cette fiche mariage."); return; }
    state.mariages=state.mariages.filter(function(x){return x.id!==mid;}); ui.mariageOpen=null; ui.confirmDelete=null; saveCache(); render(); toast("Fiche mariage supprimée."); return; }
  if(action.indexOf("mar-extra-add-")===0){ var mx=getMariage(ui.mariageOpen); if(mx){ captureMariageInputs(); var mpi=Number(action.slice(14)); var mlist=prestationsActives(); var mpreset=mlist[mpi]||mlist[mlist.length-1]||{label:"Autre / champ libre",type:"bien",qte:1,prix:0}; mx.prestationsComplementaires=mx.prestationsComplementaires||[]; var mptype=mpreset.type==="service"?"service":"bien"; mx.prestationsComplementaires.push({id:uid(),designation:mpreset.label,type:mptype,urssafType:mptype,qte:mpreset.qte||1,prix:num(mpreset.prix)}); syncMariageLinkedDevis(mx,{silent:true}); saveCache(); render(); toast("Ligne ajoutée au devis mariage."); } return; }
  if(action.indexOf("mar-extra-del-")===0){ var mxd=getMariage(ui.mariageOpen); if(mxd){ captureMariageInputs(); var mxid=action.slice(14); mxd.prestationsComplementaires=(mxd.prestationsComplementaires||[]).filter(function(l){return l.id!==mxid;}); syncMariageLinkedDevis(mxd,{silent:true}); saveCache(); render(); toast("Ligne supprimée."); } return; }
  if(action==="mar-createdevis"){ var mc=getMariage(ui.mariageOpen); if(mc){ captureMariageInputs(); saveCache(); newWizard(); ui.wizard.clientMode="nouveau"; ui.wizard.client=devisClientFromMariage(mc); ui.wizard.lignes=mariageLinesForDevis(mc); ui.wizard.step = ui.wizard.lignes.length ? 2 : 1; ui.wizard.notes="Devis créé depuis la fiche mariage"+(mc.dateMariage?" du "+frDate(mc.dateMariage):""); ui.wizardLinkMariage=mc.id; ui.tab="devis"; render(); window.scrollTo(0,0); } return; }
  if(action==="mar-media-pick"){ var mi=document.getElementById("marMedia"); if(mi) mi.click(); return; }
  if(action.indexOf("mar-media-open-")===0){ openMedia(action.slice(15)); return; }
  if(action.indexOf("mar-media-del-")===0){ var m1=getMariage(ui.mariageOpen); if(m1){ captureMariageInputs(); var rid=action.slice(14); m1.medias=(m1.medias||[]).filter(function(x){return x.id!==rid;}); saveCache(); render(); } return; }
  if(action==="mar-art-add"){ var m2=getMariage(ui.mariageOpen); if(m2){ captureMariageInputs(); var lbl=val("marArtInput"); if(lbl.trim()){ m2.articles=m2.articles||[]; m2.articles.push({id:uid(),label:lbl,fait:false}); syncMariageLinkedDevis(m2,{silent:true}); saveCache(); render(); } } return; }
  if(action.indexOf("mar-art-del-")===0){ var m3=getMariage(ui.mariageOpen); if(m3){ captureMariageInputs(); var aid=action.slice(12); m3.articles=(m3.articles||[]).filter(function(x){return x.id!==aid;}); syncMariageLinkedDevis(m3,{silent:true}); saveCache(); render(); } return; }
  if(action==="mar-hist-add"){ var m4=getMariage(ui.mariageOpen); if(m4){ captureMariageInputs(); var tx=val("marHistInput"); if(tx.trim()){ m4.historique=m4.historique||[]; m4.historique.unshift({date:todayISO(),texte:tx}); saveCache(); render(); } } return; }
  if(action==="mar-todo-add"){ var mtd=getMariage(ui.mariageOpen); if(mtd){ captureMariageInputs(); var tl=val("marTodoInput"); if(tl.trim()){ mtd.todoMariage=mtd.todoMariage||[]; mtd.todoMariage.push({id:uid(),label:tl.trim(),done:false,createdAt:todayISO()}); mtd.historique=mtd.historique||[]; mtd.historique.unshift({date:todayISO(),texte:"Tâche ajoutée : "+tl.trim()}); saveCache(); render(); } } return; }
  if(action.indexOf("mar-todo-del-")===0){ var mtdel=getMariage(ui.mariageOpen); if(mtdel){ captureMariageInputs(); var delid=action.slice(13); mtdel.todoMariage=(mtdel.todoMariage||[]).filter(function(x){return x.id!==delid;}); saveCache(); render(); } return; }
  if(action==="lightbox-close"){ ui.lightbox=null; renderModal(); return; }

  // doc modal
  if(action==="doc-close"){ ui.preview=null; renderModal(); return; }
  if(action==="doc-print"){ window.print(); return; }
  if(action==="doc-email"){ if(ui.preview){ envoyerDocumentEmail(ui.preview.kind, ui.preview.doc); } return; }
}

function digitsOnly(v){ return String(v||"").replace(/\D+/g,""); }
function clientContactScore(c,idx){
  var raw=c.updatedAt||c.modifiedAt||c.createdAt||"";
  var t=raw?Date.parse(raw):0;
  if(!isFinite(t)) t=0;
  // idx en second critère : en cas de doublon sans date, on privilégie la fiche la plus récemment ajoutée.
  return t + (idx||0)/100000;
}
function bestClientCandidate(list, mariageTel){
  if(!list || !list.length) return null;
  // Ancien bug : on privilégiait parfois une fiche dont le téléphone était différent
  // de celui du mariage. En cas de doublon, cela pouvait faire remonter un vieux numéro
  // dans le devis. Désormais on prend uniquement la fiche cliente la plus récente / complète.
  list.sort(function(a,b){ return clientContactScore(b.c,b.i)-clientContactScore(a.c,a.i); });
  return list[0].c;
}
function clientContactForMariage(m){
  if(!m) return null;
  var list=state.clients||[];
  if(m.clientId){
    var byId=list.find(function(c){ return c.id===m.clientId; });
    if(byId) return byId;
  }
  var email=(m.email||"").trim().toLowerCase();
  var nom=(m.nom||"").trim().toLowerCase();
  if(email){
    var emailMatches=[];
    list.forEach(function(c,i){ if((c.email||"").trim().toLowerCase()===email) emailMatches.push({c:c,i:i}); });
    var bestEmail=bestClientCandidate(emailMatches,m.tel);
    if(bestEmail){ m.clientId=bestEmail.id; return bestEmail; }
  }
  if(nom){
    var nameMatches=[];
    list.forEach(function(c,i){ if((c.nom||"").trim().toLowerCase()===nom || clientNameMatches(c.nom, m.nom)) nameMatches.push({c:c,i:i}); });
    var bestName=bestClientCandidate(nameMatches,m.tel);
    if(bestName){ m.clientId=bestName.id; return bestName; }
  }
  return null;
}
function devisClientFromMariage(m){
  var c=clientContactForMariage(m);
  // Le devis doit reprendre en priorité la fiche cliente.
  // Le téléphone stocké dans la fiche mariage peut être ancien, surtout pour les dossiers créés avant le CRM.
  return {
    nom:(c&&c.nom)||m.nom||"",
    adresse:(c&&c.adresse)||m.adresse||m.adresseCliente||m.lieu||"",
    email:(c&&c.email)||m.email||"",
    tel:(c&&c.tel)||""
  };
}


function mariageLinesForDevis(m){
  var lignes=[];
  (m.articles||[]).forEach(function(a){
    lignes.push({id:a.devisLineId||uid(), designation:a.label||"Article mariage", type:"bien", qte:1, prix:num(a.prix||0)});
  });
  mariagePrestations(m).forEach(function(l){
    lignes.push({id:l.devisLineId||l.id||uid(), designation:l.designation||"Prestation complémentaire", type:l.type==="service"?"service":"bien", qte:l.qte||1, prix:r2(l.prix)});
  });
  return lignes;
}
function syncMariageLinkedDevis(m, opts){
  opts=opts||{};
  if(!m || !m.devisLie) return false;
  var d=findDevis(m.devisLie);
  if(!d) return false;
  // Sécurité : on ne modifie automatiquement que les devis encore ajustables.
  // Un devis accepté/refusé/archivé reste figé pour éviter de modifier un document validé.
  if(["accepte","refuse","archive"].indexOf(d.statut)>=0) return false;
  d.client=Object.assign({}, d.client||{}, devisClientFromMariage(m));
  d.lignes=mariageLinesForDevis(m);
  d.notes="Devis mis à jour automatiquement depuis la fiche mariage"+(m.dateMariage?" du "+frDate(m.dateMariage):"");
  d.updatedAt=new Date().toISOString();
  if(!opts.silent) toast("Devis lié mis à jour automatiquement.");
  return true;
}
var mariageAutoSyncTimer=null;
function scheduleMariageAutoSync(){
  clearTimeout(mariageAutoSyncTimer);
  mariageAutoSyncTimer=setTimeout(function(){
    var m=getMariage(ui.mariageOpen);
    if(!m || !m.devisLie) return;
    captureMariageInputs();
    syncMariageLinkedDevis(m,{silent:true});
    saveCache();
  },700);
}

function val(id){ var e=document.getElementById(id); return e?e.value:""; }

function finishWizard(){
  captureWizardInputs();
  var w=ui.wizard, client;
  var linkedMariage = ui.wizardLinkMariage ? getMariage(ui.wizardLinkMariage) : null;
  if(linkedMariage){
    // Pour un devis mariage, on ne se fie pas aux champs du wizard si une fiche cliente existe :
    // cela évite de remettre un ancien téléphone dans le devis.
    client=clientContactForMariage(linkedMariage);
    if(!client){
      client=Object.assign({id:uid(),updatedAt:todayISO()}, devisClientFromMariage(linkedMariage));
      state.clients.push(client);
      linkedMariage.clientId=client.id;
    }
  } else if(w.clientMode==="existant"){ client=state.clients.find(function(c){return c.id===w.clientId;}); }
  else {
    var k=normName(w.client.nom);
    client=state.clients.find(function(c){return normName(c.nom)===k;});
    if(client){
      if(w.client.email) client.email=w.client.email;
      if(w.client.tel) client.tel=w.client.tel;
      if(w.client.adresse) client.adresse=w.client.adresse;
      client.updatedAt=todayISO();
    }
    else { client=Object.assign({id:uid(),updatedAt:todayISO()},w.client); state.clients.push(client); }
  }
  var devisClient = linkedMariage ? devisClientFromMariage(linkedMariage) : Object.assign({}, client||{});
  var d={ id:uid(), numero:prochainNumero("devis"), date:w.date, validite:addDays(w.date,state.settings.validiteDevis), client:devisClient, lignes:w.lignes, notes:w.notes, statut:"brouillon" };
  state.devis.unshift(d);
  if(linkedMariage){ linkedMariage.devisLie=d.id; }
  ui.wizardLinkMariage=null;
  ui.wizard=null; saveCache(); ui.tab="devis"; render(); toast("Devis "+d.numero+" créé.");
}
function saveParams(){
  captureParamsForm();
  saveCache(); render(); toast("Paramètres enregistrés.");
}

function onRestoreFile(file){
  if(!file){ return; }
  if(!/\.json$/i.test(file.name||"") && file.type && file.type.indexOf("json")===-1){
    toast("Choisis un fichier de sauvegarde JSON."); return;
  }
  var r=new FileReader();
  r.onload=function(e){
    try{
      var parsed=JSON.parse(e.target.result);
      var data=parsed && parsed.data ? parsed.data : parsed;
      var looksValid = data && typeof data==="object" && (data.settings || data.clients || data.devis || data.factures || data.mariages || data.encaissements || data.commandes || data.achats);
      if(!looksValid){ toast("Ce fichier ne ressemble pas à une sauvegarde de l'application."); return; }
      var msg="Restaurer cette sauvegarde ?\n\nLes données actuelles de l'application seront remplacées dans Firebase par celles du fichier : "+(file.name||"sauvegarde.json")+".\n\nAvant de continuer, assure-toi d'avoir téléchargé une sauvegarde récente.";
      if(!confirm(msg)){ toast("Restauration annulée."); return; }
      applyData(data);
      ui.wizard=null; ui.factureDraft=null; ui.commandeDraft=null; ui.preview=null; ui.mariageOpen=null; ui.commandeOpen=null; ui.clientOpen=null; ui.confirmDelete=null; ui.tab="accueil";
      saveCache();
      render();
      toast("Sauvegarde restaurée avec succès.");
    }catch(err){ console.error(err); toast("Impossible de lire cette sauvegarde JSON."); }
  };
  r.readAsText(file);
}

/* ===================== Écouteurs ===================== */
// Correctif V3.7.2 : listener direct et prioritaire pour le bouton "Ajouter au carnet".
// Utile notamment sur Safari/iPhone lorsque le listener générique ne reçoit pas correctement le clic.
document.addEventListener("click", function(e){
  var btn=e.target && e.target.closest ? e.target.closest("#encAddBtn,[data-action='enc-add']") : null;
  if(!btn) return;
  e.preventDefault();
  e.stopPropagation();
  if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  addManualEncaissementFromForm();
}, true);

// Correctif V3.0.2 : listener direct et prioritaire pour le bouton "Ajouter le client".
// Cela évite les cas où le clic était absorbé après le passage en architecture modulaire.
document.addEventListener("click", function(e){
  var closest = e.target && e.target.closest ? e.target.closest("#cliAddBtn,[data-action='cli-add']") : null;
  if(!closest) return;
  e.preventDefault();
  e.stopPropagation();
  if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  addClientFromForm();
}, true);

document.addEventListener("dblclick", function(e){
  var row=e.target&&e.target.closest?e.target.closest("[data-stock-edit-row]"):null;
  if(!row) return;
  e.preventDefault(); openStockEdit(row.getAttribute("data-stock-edit-row"));
});

document.addEventListener("click", function(e){
  var el=e.target.closest("[data-action]"); if(!el) return;
  // les <select> et <input> (cases à cocher) avec data-action sont gérés via l'événement "change"
  if(el.tagName==="SELECT"||el.tagName==="INPUT") return;
  e.preventDefault(); handleAction(el.getAttribute("data-action"));
});
document.addEventListener("input", function(e){
  var t=e.target;
  if(t && t.id==="globalSearchInput"){ renderGlobalSearchBox(); return; }
  if(t && t.id==="stockSearch"){ ui.stockSearch=t.value; stockFilterRowsFromDOM(); return; }
  if(isTodoField(t)){ ui.todoEditing=true; saveTodoLocalOnly(); return; }
  if(t.hasAttribute&&t.hasAttribute("data-linefield")){
    var id=t.getAttribute("data-id"), field=t.getAttribute("data-linefield");
    var l=ui.wizard&&ui.wizard.lignes.find(function(x){return x.id===id;}); if(l){ l[field]=t.value; refreshWizardTotals(); }
  } else if(t.hasAttribute&&t.hasAttribute("data-linedesig")){
    var id2=t.getAttribute("data-id"); var l2=ui.wizard&&ui.wizard.lignes.find(function(x){return x.id===id2;}); if(l2){ l2.designation=t.value; }
  } else if(t.hasAttribute&&t.hasAttribute("data-faclinefield")){
    var id3=t.getAttribute("data-id"), field3=t.getAttribute("data-faclinefield");
    var l3=ui.factureDraft&&ui.factureDraft.lignes.find(function(x){return x.id===id3;}); if(l3){ l3[field3]=t.value; refreshFactureTotals(); }
  } else if(t.hasAttribute&&t.hasAttribute("data-faclinedesig")){
    var id4=t.getAttribute("data-id"); var l4=ui.factureDraft&&ui.factureDraft.lignes.find(function(x){return x.id===id4;}); if(l4){ l4.designation=t.value; }
  } else if(t.hasAttribute&&t.hasAttribute("data-cmdlinefield")){
    var id5=t.getAttribute("data-id"), field5=t.getAttribute("data-cmdlinefield");
    var l5=ui.commandeDraft&&ui.commandeDraft.lignes.find(function(x){return x.id===id5;}); if(l5){ l5[field5]=t.value; refreshCommandeTotals(); }
  } else if(t.hasAttribute&&t.hasAttribute("data-cmdlinedesig")){
    var id6=t.getAttribute("data-id"); var l6=ui.commandeDraft&&ui.commandeDraft.lignes.find(function(x){return x.id===id6;}); if(l6){ l6.designation=t.value; }
  } else if(t.hasAttribute&&t.hasAttribute("data-cmdopen-field")){
    var id7=t.getAttribute("data-id"), field7=t.getAttribute("data-cmdopen-field");
    var oc=getCommande(ui.commandeOpen); var l7=oc&&(oc.lignes||[]).find(function(x){return x.id===id7;}); if(l7){ l7[field7]=t.value; refreshCommandeTotals(); }
  } else if(t.hasAttribute&&t.hasAttribute("data-cmdopen-desig")){
    var id8=t.getAttribute("data-id"); var oc2=getCommande(ui.commandeOpen); var l8=oc2&&(oc2.lignes||[]).find(function(x){return x.id===id8;}); if(l8){ l8.designation=t.value; }
  } else if(t.hasAttribute&&t.hasAttribute("data-atextra-field")){
    refreshAtelierExtraTotalsFromDOM();
  } else if(t.hasAttribute&&t.hasAttribute("data-marextra-field")){
    refreshMariageExtraTotalsFromDOM();
    scheduleMariageAutoSync();
  } else if(t.id && /^mar[A-Z]/.test(t.id)){
    scheduleMariageAutoSync();
  }
});
document.addEventListener("change", function(e){
  var t=e.target;
  if(t.id==="achatFileInput"){ if(t.files&&t.files[0]) readAchatFile(t.files[0]); return; }
  if(t.id==="stockCategoryFilter"){ ui.stockCategoryFilter=t.value; stockFilterRowsFromDOM(); return; }
  if(t.getAttribute&&t.getAttribute("data-action")==="dash-year"){ ui.anneeDash=Number(t.value); ui.monthDetail=null; render(); return; }
  if(t.getAttribute&&t.getAttribute("data-action")==="treso-year"){ ui.tresoYear=Number(t.value); render(); return; }
  if(t.getAttribute&&t.getAttribute("data-action")==="treso-month"){ ui.tresoMonth=Number(t.value); render(); return; }
  if(t.hasAttribute&&t.hasAttribute("data-linetype")){ var id=t.getAttribute("data-id"); var l=ui.wizard&&ui.wizard.lignes.find(function(x){return x.id===id;}); if(l){ l.type=t.value; render(); } return; }
  if(t.hasAttribute&&t.hasAttribute("data-faclinetype")){ var fid=t.getAttribute("data-id"); var fl=ui.factureDraft&&ui.factureDraft.lignes.find(function(x){return x.id===fid;}); if(fl){ fl.type=t.value; render(); } return; }
  if(t.hasAttribute&&t.hasAttribute("data-cmdlinetype")){ var cid=t.getAttribute("data-id"); var cl=ui.commandeDraft&&ui.commandeDraft.lignes.find(function(x){return x.id===cid;}); if(cl){ cl.type=t.value; render(); } return; }
  if(t.hasAttribute&&t.hasAttribute("data-cmdopen-type")){ var oid=t.getAttribute("data-id"); var oc=getCommande(ui.commandeOpen); var ol=oc&&(oc.lignes||[]).find(function(x){return x.id===oid;}); if(ol){ ol.type=t.value; render(); } return; }
  if(t.hasAttribute&&t.hasAttribute("data-atextra-type")){ refreshAtelierExtraTotalsFromDOM(); return; }
  if(t.hasAttribute&&t.hasAttribute("data-marextra-type")){ refreshMariageExtraTotalsFromDOM(); scheduleMariageAutoSync(); return; }
  if(t.getAttribute&&t.getAttribute("data-action")==="cmd-clientsel"){ if(ui.commandeDraft) ui.commandeDraft.clientId=t.value; return; }
  if(t.getAttribute&&t.getAttribute("data-action")==="fac-clientsel"){ if(ui.factureDraft) ui.factureDraft.clientId=t.value; return; }
  if(t.getAttribute&&t.getAttribute("data-action")==="site-clientsel"){ if(ui.siteSaleDraft){ ui.siteSaleDraft.clientId=t.value; captureSiteSaleDraft(); } return; }
  if(t.getAttribute&&t.getAttribute("data-action")==="site-activite-change"){ if(ui.siteSaleDraft){ ui.siteSaleDraft.activite=t.value; captureSiteSaleDraft(); render(); } return; }
  if(t.getAttribute&&t.getAttribute("data-action")==="site-atelier-change"){ if(ui.siteSaleDraft){ ui.siteSaleDraft.atelierId=t.value; captureSiteSaleDraft(); } return; }
  if(t.getAttribute&&t.getAttribute("data-action")==="site-atelier-pay-change"){ if(ui.siteSaleDraft){ ui.siteSaleDraft.atelierPaiementType=t.value; captureSiteSaleDraft(); render(); } return; }
  if(t.getAttribute&&t.getAttribute("data-action")==="wz-clientsel"){ if(ui.wizard) ui.wizard.clientId=t.value; return; }
  if(t.id==="logoInput"){ onLogoFile(t.files[0]); t.value=""; return; }
  if(t.id==="marMedia"){ onMarMediaFiles(t.files); t.value=""; return; }
  if(t.id==="rdvMedia"){ onRdvMediaFiles(t.files); t.value=""; return; }
  if(t.id==="encImport"){ onEncImport(t.files[0]); t.value=""; return; }
  if(t.id==="restoreInput"){ onRestoreFile(t.files[0]); t.value=""; return; }
  var act=t.getAttribute&&t.getAttribute("data-action");
  if(act==="at-mode-change"){ var am=getAtelier(ui.atelierOpen); if(am){ captureAtelier(am); saveCache(); render(); } return; }
  if(act==="stock-recipe-model-change"){ captureAtelierRecipeEditor(false); ui.stockRecipeModel=t.value; render(); setTimeout(function(){var el=document.getElementById('atelierRecipeManager'); if(el) el.scrollIntoView({block:'start'});},0); return; }
  if(act==="mar-statut"){ var ms=getMariage(ui.mariageOpen); if(ms){ captureMariageInputs(); ms.statut=t.value; saveCache(); render(); } return; }
  if(act==="mar-link"){ var ml=getMariage(ui.mariageOpen); if(ml){ captureMariageInputs(); ml.devisLie=t.value; saveCache(); render(); } return; }
  if(act==="mar-devis-toggle"){ var md=getMariage(ui.mariageOpen); if(md){ captureMariageInputs(); md.devisEnvoye=t.checked; if(t.checked&&!md.devisDate) md.devisDate=todayISO(); if(md.statut==="contact"&&t.checked) md.statut="devis_envoye"; saveCache(); render(); } return; }
  if(act==="mar-facture-toggle"){ var mf=getMariage(ui.mariageOpen); if(mf){ captureMariageInputs(); mf.factureEnvoyee=t.checked; if(t.checked&&!mf.factureDate) mf.factureDate=todayISO(); saveCache(); render(); } return; }
  if(act&&act.indexOf("mar-workflow-toggle-")===0){ var mw=getMariage(ui.mariageOpen); if(mw){ captureMariageInputs(); var sid=act.slice(20); mw.suiviMariage=mw.suiviMariage||{}; mw.suiviMariage[sid]=!!t.checked; var step=(MARIAGE_WORKFLOW_STEPS||[]).find(function(x){return x.id===sid;}); mw.historique=mw.historique||[]; mw.historique.unshift({date:todayISO(),texte:(t.checked?"Étape cochée : ":"Étape décochée : ")+(step?step.label:sid)}); saveCache(); render(); } return; }
  if(act&&act.indexOf("mar-todo-toggle-")===0){ var mtodo=getMariage(ui.mariageOpen); if(mtodo){ captureMariageInputs(); var tid=act.slice(16); var td=(mtodo.todoMariage||[]).find(function(x){return x.id===tid;}); if(td){ td.done=!!t.checked; saveCache(); render(); } } return; }
  if(act&&act.indexOf("mar-art-toggle-")===0){ var ma=getMariage(ui.mariageOpen); if(ma){ captureMariageInputs(); var aid=act.slice(15); var a=(ma.articles||[]).find(function(x){return x.id===aid;}); if(a){ a.fait=t.checked; saveCache(); render(); } } return; }
  if(act==="prep-toggle"){ var pm=getMariage(t.getAttribute("data-mid")); if(pm){ var pa=(pm.articles||[]).find(function(x){return x.id===t.getAttribute("data-aid");}); if(pa){ pa.fait=t.checked; saveCache(); render(); } } return; }
  if(act==="prep-cmd-toggle"||act==="cmd-toggle"||act==="cmd-detail-toggle"){ var pc=state.commandes.find(function(x){return x.id===t.getAttribute("data-id");}); if(pc){ pc.fait=t.checked; saveCache(); render(); } return; }
});
function refreshWizardTotals(){
  var box=document.getElementById("wzTot"); if(box) box.innerHTML=wizTotHTML(wzTotals());
}

/* ===================== Démarrage ===================== */
auth.onAuthStateChanged(function(user){
  if(user){
    showApp();
    loadCache();   // affichage instantané depuis le cache local
    render();
    startSync(user.uid);  // puis synchro temps réel avec le cloud
    setTimeout(maybeAutoGoogleDriveBackup, 2500);
  } else {
    showLogin();
  }
});
// Connexion à la touche Entrée
document.addEventListener("keydown", function(e){
  if(e.key==="Enter"){ var l=document.getElementById("login"); if(l && l.style.display!=="none"){ doLogin(); } }
});
