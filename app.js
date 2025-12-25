// Minimal JS for Study Mode 167
}
return d;
}
// root nodes
mindmap.filter(n=>n.parent===null).forEach(root=>{
el.appendChild(makeNode(root));
const children = mindmap.filter(n=>n.parent===root.id);
children.forEach(c=>{ el.appendChild(makeNode(c)); });
});
}


function saveMindmap(){ localStorage.setItem(MM_KEY, JSON.stringify(mindmap)); }


function rebuildParentSelect(){
const sel = $('#mm-parent'); sel.innerHTML='';
const optRoot = document.createElement('option'); optRoot.value='root'; optRoot.textContent='(root)'; sel.appendChild(optRoot);
mindmap.forEach(n=>{ const o=document.createElement('option'); o.value=n.id; o.textContent=n.text; sel.appendChild(o); });
}


$('#mm-add').addEventListener('click', ()=>{
const text = $('#mm-node').value.trim(); if(!text) return alert('Node text required');
const parentVal = $('#mm-parent').value;
const parent = parentVal==='root' ? null : Number(parentVal);
const node = {id:Date.now(),text, parent};
mindmap.push(node); saveMindmap(); $('#mm-node').value=''; renderMindmap(); rebuildParentSelect();
});


rebuildParentSelect(); renderMindmap();


// Feynman analyze (lightweight: checks length/simplicity & suggests improvements)
$('#analyze-feynman').addEventListener('click', ()=>{
const text = $('#feynman-text').value.trim();
if(!text) return alert('Write your explanation first.');
const words = text.split(/\s+/).length;
const sentences = text.split(/[.!?]+/).filter(s=>s.trim()).length;
const avgWords = (words/sentences)||words;
let feedback = `You wrote ${words} words across ${sentences} sentences. `;
if(avgWords>20) feedback += 'Try shorter sentences (aim for 10-15 words). ';
// check for long words (naive)
const longWords = text.split(/\s+/).filter(w=>w.length>12).slice(0,5);
if(longWords.length) feedback += 'Some long words: '+longWords.join(', ')+'. Try simpler synonyms. ';
feedback += 'Try explaining with a step-by-step example and a short summary sentence.';
$('#feynman-feedback').textContent = feedback;
});


// ------------------ Reflection Mode ------------------
const REF_KEY = 'sm167_reflections_v1';
let reflections = JSON.parse(localStorage.getItem(REF_KEY) || '[]');


$('#save-reflection').addEventListener('click', ()=>{
const a = $('#ref-learn').value.trim();
const b = $('#ref-diff').value.trim();
const c = $('#ref-next').value.trim();
if(!a&&!b&&!c) return alert('Enter at least one reflection note.');
const r = {id:Date.now(),learn:a,difficult:b,next:c,date:Date.now()};
reflections.push(r); localStorage.setItem(REF_KEY, JSON.stringify(reflections));
$('#ref-learn').value='';$('#ref-diff').value='';$('#ref-next').value='';
alert('Reflection saved.');
renderWeeklySummary();
});


function renderWeeklySummary(){
const now = Date.now();
const weekAgo = now - 7*24*60*60*1000;
const weekly = reflections.filter(r=>r.date>=weekAgo);
const el = $('#weekly-summary'); el.innerHTML='';
if(!weekly.length) el.textContent='No reflections this week.';
else{
weekly.forEach(r=>{
const d = new Date(r.date).toLocaleString();
const div = document.createElement('div'); div.style.borderBottom='1px solid #eef8ff'; div.style.padding='8px 0';
div.innerHTML = `<strong>${d}</strong><div><em>Learned:</em> ${escapeHtml(r.learn)}</div><div><em>Difficulty:</em> ${escapeHtml(r.difficult)}</div><div><em>Next:</em> ${escapeHtml(r.next)}</div>`;
el.appendChild(div);
});
}
}


function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }


renderWeeklySummary();


// ------------------ Load saved flashcards into UI on startup for parent select
rebuildParentSelect();


// End of app.js
