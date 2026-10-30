import {puzzles} from './puzzles.js';
import {day,fresh,eligible,guess,hint,won,stats,validate,candidates} from './game.js';
import {load,save} from './storage.js';
validate(puzzles);
const $=id=>document.getElementById(id);
let history=load(puzzles),today=day(),activeDate,p,s,selected=1;
// Testing bypass. Replace with verified subscription entitlement before launch.
const archiveAccess = { testUnlocked: true, subscribed: false };
const canPlayArchive = () => archiveAccess.testUnlocked || archiveAccess.subscribed;
function persist(){if(won(s)&&!s.completedOn)s.completedOn=day();if(!save(history))$('storage-warning').hidden=false;}
function openPuzzle(date) {
  if(date>day() || (date<day()&&!canPlayArchive()))return;
  activeDate=date;p=puzzles.find(x=>x.date===date);
  $('date').textContent=date+' · '+(date<day()?'ARCHIVE · ':'')+(p?'PUZZLE '+String(p.id).padStart(3,'0'):'DAILY EDITION');
  $('game').hidden=!p;$('unavailable').hidden=!!p;
  $('back-today').hidden=date===day();$('guess').value='';$('feedback').textContent='';
  if(p){s=history[date]||fresh(p);history[date]=s;selected=1;render();}
}
function changeDay(){const wasToday=!activeDate||activeDate===today;today=day();if(wasToday)openPuzzle(today);else openPuzzle(activeDate);}
function showArchive(){
  const past=puzzles.filter(x=>x.date<day()).sort((a,b)=>b.date.localeCompare(a.date));
  modal('<h2>Your puzzle history</h2><p>'+ (archiveAccess.testUnlocked?'Archive access is unlocked for testing.':'Previous puzzles are a subscriber feature.')+'</p><div id="archive-list"></div><p>Progress is saved on this browser. Archive wins count toward totals, but do not backfill daily streaks.</p>');
  for(const puzzle of past){const saved=history[puzzle.date];const status=saved&&won(saved)?'Completed':saved?.started?'In progress':'Not played';const button=document.createElement('button');button.className='archive-entry';button.disabled=!canPlayArchive();button.textContent=puzzle.date+' · '+status+(saved?.started?' · '+saved.mistakes+' misses · '+saved.hints+' hints':'');button.onclick=()=>{$('dialog').close();openPuzzle(puzzle.date);if(!won(s))$('guess').focus();};$('archive-list').append(button);}
  if(!past.length)$('archive-list').textContent='No previous puzzles are available yet.';
}
$('archive').onclick=showArchive;
$('back-today').onclick=()=>openPuzzle(day());
function render(){if(!eligible(s,selected))selected=s.revealed.findIndex((_,i)=>eligible(s,i));$('progress').textContent=`${s.revealed.filter(Boolean).length} OF 7 CONNECTED`;$('chain').replaceChildren();p.words.forEach((word,i)=>{const b=document.createElement('button');const open=eligible(s,i);b.type='button';b.className='word '+(s.revealed[i]?'solved':selected===i?'selected':open?'eligible':'locked');b.disabled=!open;const letters=s.revealed[i]?s.answers[i]:candidates(p,s)[0][i].split('').map((c,n)=>n<s.letters[i]?c:'_').join(' ');b.setAttribute('aria-label',`Word ${i+1}: ${s.revealed[i]?word:word.length+' letters, '+(open?'available':'locked')}`);b.setAttribute('aria-pressed',String(selected===i));b.innerHTML=`<span class="number">0${i+1}</span><span class="letters">${letters}</span><span class="state">${s.revealed[i]?'✓':selected===i?'Guess':open?'Open':'Locked'}</span>`;b.onclick=()=>{selected=i;render();$('guess').focus();};$('chain').append(b);});$('counts').textContent=`${s.mistakes} misses · ${s.hints} hints`;$('form').hidden=won(s);$('hint').disabled=won(s);$('complete').hidden=!won(s);if(selected>=0)$('input-label').textContent=`Your next connection · word ${selected+1}`;if(won(s)){$('complete').innerHTML=`<h2>Everything connects.</h2><p>${s.mistakes} incorrect guesses · ${s.hints} hints used</p><p>${p.phrases.join(' · ')}</p><button id="share">Share result ↗</button><p id="countdown"></p><textarea id="share-fallback" aria-label="Copy your result" readonly hidden></textarea>`;$('share').onclick=share;countdown();}}
function current(){if(day()!==today){changeDay();$('feedback').textContent='A new day, a new chain.';return false;}return !!p;}
$('form').onsubmit=e=>{e.preventDefault();if(!current())return;const value=$('guess').value;if(!value.trim())return;const correct=guess(p,s,selected,value);persist();render();$('feedback').textContent=correct?(won(s)?'Chain complete. Well connected!':'Connected. Keep going.'):'Not a word in today’s chain.';if(correct)$('guess').value='';else $('guess').select();if(!won(s))$('guess').focus();else $('share').focus();};
$('hint').onclick=()=>{if(!current())return;hint(p,s,selected);persist();render();$('feedback').textContent=won(s)?'Chain complete with assistance.':'One more letter revealed.';if(!won(s))$('guess').focus();};
async function share(){const result=`Chain Reaction #${p.id} · ${activeDate}\n${s.letters.map((n,i)=>i===0||i===6?'○':n?'◐':'●').join('')}\n${s.mistakes} misses · ${s.hints} hints`;try{await navigator.clipboard.writeText(result);$('feedback').textContent='Result copied.';}catch{const area=$('share-fallback');area.hidden=false;area.value=result;area.focus();area.select();$('feedback').textContent='Copy the selected result to share.';}}
function modal(content){$('dialog-content').innerHTML=content;$('dialog').showModal();}
$('help').onclick=()=>modal('<h2>Find the missing links.</h2><p>Complete seven words. Every neighboring pair forms a familiar phrase or compound, read <strong>top to bottom</strong>.</p><p>For example: <strong>School → Bus → Stop</strong> makes “school bus” and “bus stop”.</p><p>Start next to either revealed endpoint. Select an open box, type a word, and press Enter. Work inward from both ends.</p><p>You are finding today’s target chain. Several words may seem possible; only reviewed answers in the chain are accepted. Words never need to change spelling.</p><p>Guesses are unlimited. Reveal a letter whenever you need a hand. A fully revealed hint word counts as assisted.</p><p>New puzzles arrive at 00:00 UTC. Progress is saved in this browser.</p>');
$('statistics').onclick=()=>{const st=stats(history);modal('<h2>Your connections</h2><div class="stat-grid">'+Object.entries({Played:st.played,Won:st.wins,'Current streak':st.current,'Best streak':st.best}).map(([k,v])=>`<div><strong>${v}</strong>${k}</div>`).join('')+'</div><p>Saved on this browser. A puzzle counts as played after your first guess or hint. Archive wins count toward totals; daily streaks require completion on the scheduled day.</p>');};
$('close').onclick=()=>$('dialog').close();
function countdown(){if(!$('countdown'))return;const remaining=86400000-(Date.now()%86400000);$('countdown').textContent='Next daily reset in '+new Date(remaining).toISOString().slice(11,19)+' · UTC';}
setInterval(()=>{if(day()!==today)changeDay();else countdown();},1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&day()!==today)changeDay();});
changeDay();

// Theme preference is independent of game progress.
const themeToggle = $('theme-toggle');
function updateThemeControl() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  themeToggle.firstElementChild.textContent = dark ? '☀' : '☾';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#122a25' : '#f6f4ee';
}
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('chain-reaction-theme', theme); } catch { /* Still usable without storage. */ }
  updateThemeControl();
});
updateThemeControl();
