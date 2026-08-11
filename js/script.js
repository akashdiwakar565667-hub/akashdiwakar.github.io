const poster = (seed) => `https://picsum.photos/seed/cinemora-${encodeURIComponent(seed)}/600/900`;
const backdrop = (seed) => `https://picsum.photos/seed/cinemora-bg-${encodeURIComponent(seed)}/1600/900`;

const baseTitles = [
  ["Neon Horizon","Movie",2026,8.8,["Sci-Fi","Thriller"],"A courier discovers a hidden signal beneath a city that never sleeps."],
  ["The Last Atlas","Movie",2025,8.6,["Adventure","Fantasy"],"An unlikely crew races across a forgotten continent to find a map that changes reality."],
  ["Midnight Protocol","Series",2026,8.9,["Drama","Thriller"],"A young analyst uncovers a pattern hidden inside years of harmless-looking data."],
  ["Blue Ember","Movie",2024,8.2,["Drama","Romance"],"Two ambitious artists meet at the wrong time and build something neither expected."],
  ["Orbit Seven","Series",2025,8.7,["Sci-Fi","Adventure"],"Seven explorers wake early from a journey that was never meant to have a second chapter."],
  ["Paper Kingdom","Movie",2023,7.9,["Fantasy","Drama"],"A quiet illustrator discovers that every drawing she makes becomes a doorway."],
  ["Signal House","Series",2024,8.1,["Mystery","Thriller"],"A remote coastal station receives a message dated twenty years in the future."],
  ["Afterlight","Movie",2026,8.4,["Action","Sci-Fi"],"A rescue pilot has one night to cross a city losing power one district at a time."],
  ["Northbound","Movie",2022,7.8,["Adventure","Drama"],"A road trip turns into a search for a missing family photograph."],
  ["Velvet Rain","Series",2023,8.0,["Drama","Mystery"],"A journalist returns home to solve a story everyone else wants forgotten."],
  ["Static Hearts","Movie",2025,8.3,["Romance","Comedy"],"Two radio hosts compete for the same job while accidentally becoming best friends."],
  ["Gravity Club","Series",2026,8.5,["Sci-Fi","Comedy"],"Students build a machine that bends gravity and immediately learn why nobody should."],
  ["Wild Meridian","Movie",2024,8.0,["Adventure","Action"],"A ranger follows an impossible trail through a protected valley."],
  ["Glass Harbor","Series",2025,8.4,["Drama","Mystery"],"A harbor town's perfect reputation cracks after a vanished boat returns."],
  ["Second Sunrise","Movie",2021,7.7,["Drama","Fantasy"],"A photographer gets one chance to revisit a day she thought was lost forever."],
  ["Echo District","Series",2024,8.2,["Thriller","Action"],"An investigator tracks a string of crimes connected by the same anonymous recording."],
  ["Solaris Run","Movie",2026,8.7,["Sci-Fi","Action"],"A racer crosses a solar-powered wasteland carrying a message that could unite three cities."],
  ["The Quiet Room","Movie",2023,7.6,["Mystery","Drama"],"A sound engineer investigates why one room in an old hotel has no recorded noise."],
  ["Moonlit Arcade","Series",2022,7.9,["Comedy","Fantasy"],"A late-night arcade hides a game that knows every player's future."],
  ["Iron Valley","Movie",2025,8.1,["Action","Drama"],"A mechanic rebuilds an abandoned machine before a dangerous winter arrives."],
  ["Cloudline","Series",2026,8.6,["Adventure","Drama"],"A mountain rescue team faces storms, secrets and impossible decisions."],
  ["Amber Code","Movie",2024,8.3,["Thriller","Mystery"],"A cryptographer receives a code that appears to predict events hours before they happen."],
  ["Frost & Fire","Movie",2022,7.8,["Fantasy","Adventure"],"Two rival kingdoms must cooperate when an ancient weather engine awakens."],
  ["City of Small Stars","Series",2025,8.0,["Drama","Romance"],"Five neighbors discover that their separate dreams are connected."],
  ["Redline Summer","Movie",2023,7.5,["Action","Comedy"],"A rookie driver enters a chaotic weekend race with a borrowed car."],
  ["The Lantern Keepers","Series",2024,8.5,["Fantasy","Mystery"],"Keepers of an island lighthouse protect a light with an unusual secret."],
  ["Zero Hour Café","Movie",2026,7.9,["Comedy","Drama"],"A café crew has twelve hours to save the place they grew up in."],
  ["Hidden Current","Series",2023,8.1,["Thriller","Adventure"],"Divers discover an underwater structure that should not exist."],
  ["Wildflower Hotel","Movie",2025,8.0,["Romance","Drama"],"A temporary hotel job becomes a summer neither guest will forget."],
  ["Blackbird Lane","Series",2022,7.7,["Mystery","Drama"],"A new neighbor notices details about the street that everyone else ignores."],
  ["Aurora Engine","Movie",2024,8.5,["Sci-Fi","Adventure"],"Engineers test a machine capable of storing sunlight for years."],
  ["Sunday Static","Series",2026,7.8,["Comedy","Drama"],"A community radio team tries to keep their tiny station alive."],
  ["Silver Current","Movie",2023,7.9,["Action","Thriller"],"A marine engineer races to stop a malfunctioning deep-sea system."],
  ["Memory Garden","Series",2025,8.3,["Fantasy","Drama"],"A gardener discovers plants that bloom with memories."],
  ["The Long Detour","Movie",2022,7.6,["Comedy","Adventure"],"A simple delivery takes three friends across an entire country."],
  ["Cinder Lake","Series",2024,8.2,["Mystery","Thriller"],"A detective returns to a lake town where every resident remembers the same night differently."],
  ["Parallel Summer","Movie",2026,8.1,["Fantasy","Romance"],"A student finds a doorway leading to a summer that never happened."],
  ["Golden Frequency","Series",2023,8.0,["Drama","Mystery"],"A producer hears a voice on an old recording that sounds exactly like him."],
  ["Rooftop Season","Movie",2025,7.8,["Romance","Comedy"],"A group of friends turns a forgotten rooftop into the city's best secret hangout."],
  ["Deep Blue North","Movie",2024,8.4,["Adventure","Drama"],"A small research crew sails into an unexplored northern passage."],
  ["Night Shift Stories","Series",2022,7.9,["Drama","Comedy"],"Six coworkers share the strangest hours in the city."],
  ["Electric Orchard","Movie",2023,8.0,["Sci-Fi","Fantasy"],"A farmer's experimental orchard starts producing fruit that glows at night."],
  ["Map of Tomorrow","Series",2026,8.7,["Adventure","Mystery"],"A cartographer receives maps of places that have not been built yet."],
  ["Crimson Bicycle","Movie",2021,7.4,["Drama","Adventure"],"A teenager restores an old bicycle and follows its owner's unfinished route."],
  ["Harbor Lights","Series",2025,8.1,["Romance","Drama"],"A group of friends reunites at a harbor restaurant for one unforgettable season."],
  ["The Fifth Door","Movie",2024,8.6,["Fantasy","Thriller"],"An architect finds a fifth door in a building designed to have only four."],
  ["Sunday Astronauts","Series",2023,7.8,["Comedy","Sci-Fi"],"A weekend club takes amateur stargazing far more seriously than planned."],
  ["River of Glass","Movie",2022,8.0,["Fantasy","Adventure"],"A traveler follows a river that reflects possible futures."],
  ["Static Moon","Series",2024,8.2,["Sci-Fi","Mystery"],"A radio telescope picks up a repeating signal from the moon."],
  ["Bright Side","Movie",2025,7.7,["Comedy","Drama"],"A small-town team tries to turn a failed festival into a local tradition."],
  ["Evergreen Signal","Series",2026,8.4,["Thriller","Drama"],"A mountain station receives a distress call from a number that was disconnected years ago."]
];

const DATA = baseTitles.map((x,i)=>({
  id:i+1,title:x[0],type:x[1],year:x[2],rating:x[3],genres:x[4],description:x[5],
  runtime:`${92+(i*7)%55} min`,poster:poster(x[0]),backdrop:backdrop(x[0]),
  cast:["Ari Vale","Noah Reed","Mira Stone"],director:["Lena Park","Jon Bell","R. Sen"][i%3],
  popularity:100-i,featured:i<6,trailer:"https://www.youtube.com/embed/dQw4w9WgXcQ",
  video:"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  seasons:x[1]==="Series"?2+(i%3):0,
  episodes:x[1]==="Series"?Array.from({length:5+(i%4)},(_,e)=>({number:e+1,title:`Episode ${e+1}: ${["First Signal","Open Skies","The Crossing","Hidden Pattern","After Midnight","New Ground","The Return"][e%7]}`,description:"A new chapter changes what the team thought they knew.",duration:`${38+(e*5)%16} min`})):[],
}));

const state = {
  view:"home", filter:"All", query:"", sort:"popularity", heroIndex:0,
  watchlist:read("cinemora-watchlist",[]), progress:read("cinemora-progress",{}),
  recent:read("cinemora-recent",[])
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function read(key,fallback){try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch{return fallback}}
function save(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
function find(id){return DATA.find(x=>x.id===Number(id))}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function toast(message){const el=document.createElement("div");el.className="toast";el.textContent=message;$("#toastStack").appendChild(el);setTimeout(()=>{el.classList.add("out");setTimeout(()=>el.remove(),300)},2400)}
function isSaved(id){return state.watchlist.includes(Number(id))}
function toggleWatchlist(id){
  id=Number(id); const item=find(id);
  if(!item)return;
  if(isSaved(id)){state.watchlist=state.watchlist.filter(x=>x!==id);toast("Removed from Watchlist")}
  else {state.watchlist.push(id);toast("Added to Watchlist")}
  save("cinemora-watchlist",state.watchlist);updateCount();renderCurrent();
}
function updateCount(){$("#watchlistCount").textContent=state.watchlist.length}

function imageFallback(img){
  img.addEventListener("error",()=>{
    img.onerror=null;
    img.src=`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#15112b"/><stop offset="1" stop-color="#142b49"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="50%" fill="#fff" opacity=".8" text-anchor="middle" font-family="Arial" font-size="34">CINEMORA</text></svg>`)}`;
  });
}
function card(item, delay=0){
  const pct=state.progress[item.id]?.percent||0;
  return `<article class="movie-card" data-id="${item.id}" style="animation-delay:${delay}ms">
    <div class="poster-wrap">
      <img class="poster" loading="lazy" src="${item.poster}" alt="${esc(item.title)} poster">
      <div class="card-overlay"><div class="card-actions">
        <button class="mini-btn card-watch" data-id="${item.id}" aria-label="Open ${esc(item.title)}">▶</button>
        <button class="mini-btn card-save" data-id="${item.id}" aria-label="Toggle watchlist">${isSaved(item.id)?"♥":"♡"}</button>
      </div></div>
    </div>
    <div class="card-info"><p class="card-title">${esc(item.title)}</p>
      <div class="card-sub"><span>${item.year} • ${item.type}</span><span class="rating">★ ${item.rating}</span></div>
      ${pct?`<div class="progress"><span style="width:${pct}%"></span></div>`:""}
    </div>
  </article>`;
}
function attachImageFallbacks(root=document){root.querySelectorAll("img").forEach(imageFallback)}

function renderHero(){
  const item=DATA[state.heroIndex%6];
  $("#hero").innerHTML=`<div class="hero-bg" style="background-image:url('${item.backdrop}')"></div>
    <div class="hero-content">
      <p class="eyebrow">FEATURED ${item.type.toUpperCase()}</p>
      <h1>${esc(item.title)}</h1>
      <div class="meta"><span class="rating">★ ${item.rating}</span><span>${item.year}</span><span>${item.runtime}</span>${item.genres.slice(0,3).map(g=>`<span class="tag">${g}</span>`).join("")}</div>
      <p class="hero-desc">${esc(item.description)}</p>
      <div class="hero-actions">
        <button class="primary-btn" data-action="details" data-id="${item.id}">▶ Watch Demo</button>
        <button class="secondary-btn" data-action="details" data-id="${item.id}">More Info</button>
        <button class="secondary-btn" data-action="save" data-id="${item.id}">${isSaved(item.id)?"♥ Saved":"♡ Watchlist"}</button>
      </div>
    </div>`;
  attachImageFallbacks($("#hero"));
  const bg=$("#hero .hero-bg"); requestAnimationFrame(()=>bg.classList.add("zoom"));
}

function filters(){
  const values=["All","Movies","Series","Action","Adventure","Comedy","Drama","Fantasy","Sci-Fi","Thriller","Animation","Horror","Romance"];
  $("#filterRow").innerHTML=values.map(v=>`<button class="filter-chip ${state.filter===v?"active":""}" data-filter="${v}">${v}</button>`).join("");
}
function matches(item){
  if(state.filter==="Movies"&&item.type!=="Movie")return false;
  if(state.filter==="Series"&&item.type!=="Series")return false;
  if(!["All","Movies","Series"].includes(state.filter)&&!item.genres.includes(state.filter))return false;
  const q=state.query.trim().toLowerCase();
  if(q){
    const hay=[item.title,item.type,item.year,...item.genres].join(" ").toLowerCase();
    if(!hay.includes(q))return false;
  }
  return true;
}
function sorted(items){
  const a=[...items];
  if(state.sort==="rating")a.sort((x,y)=>y.rating-x.rating);
  if(state.sort==="newest")a.sort((x,y)=>y.year-x.year);
  if(state.sort==="oldest")a.sort((x,y)=>x.year-y.year);
  if(state.sort==="az")a.sort((x,y)=>x.title.localeCompare(y.title));
  if(state.sort==="popularity")a.sort((x,y)=>y.popularity-x.popularity);
  return a;
}
function section(title,items){
  if(!items.length)return "";
  return `<section class="content-section"><div class="section-title"><h3>${title}</h3><button class="see-all" data-seeall="${title}">See all →</button></div><div class="movie-grid">${items.map((x,i)=>card(x,i*35)).join("")}</div></section>`;
}
function getWatchlist(){return state.watchlist.map(find).filter(Boolean)}
function renderHome(){
  $("#pageTitle").textContent="Trending Now";
  $("#sortRow").classList.add("hidden");
  filters();
  const eligible=DATA.filter(matches);
  if(state.query || state.filter!=="All"){
    $("#sections").innerHTML=eligible.length?`<section class="content-section sort-results"><div class="section-title"><h3>${eligible.length} result${eligible.length===1?"":"s"}</h3></div><div class="movie-grid">${sorted(eligible).map((x,i)=>card(x,i*25)).join("")}</div></section>`:`<div class="empty-state glass-panel"><div class="empty-icon">⌕</div><h3>No stories found</h3><p>Try another title, genre or year.</p></div>`;
    attachImageFallbacks($("#sections"));return;
  }
  const continueItems=DATA.filter(x=>state.progress[x.id]?.percent>0&&state.progress[x.id]?.percent<100);
  const recentItems=state.recent.map(find).filter(Boolean);
  $("#sections").innerHTML=
    section("Trending Now",DATA.slice(0,12))+
    section("Popular Movies",DATA.filter(x=>x.type==="Movie").slice(0,12))+
    section("Popular Series",DATA.filter(x=>x.type==="Series").slice(0,12))+
    (continueItems.length?section("Continue Watching",continueItems):"")+
    (recentItems.length?section("Recently Viewed",recentItems):"")+
    section("New Releases",[...DATA].sort((a,b)=>b.year-a.year).slice(0,12))+
    section("Top Rated",[...DATA].sort((a,b)=>b.rating-a.rating).slice(0,12));
  attachImageFallbacks($("#sections"));
}
function renderLibrary(title,items){
  $("#pageTitle").textContent=title;$("#sortRow").removeClass("hidden");filters();
  const out=sorted(items.filter(matches));
  $("#sections").innerHTML=out.length?`<section class="content-section sort-results"><div class="movie-grid">${out.map((x,i)=>card(x,i*20)).join("")}</div></section>`:`<div class="empty-state glass-panel"><div class="empty-icon">♡</div><h3>Nothing here yet</h3><p>Save a title to build your collection.</p></div>`;
  attachImageFallbacks($("#sections"));
}
function renderCurrent(){
  if(state.view==="home")renderHome();
  if(state.view==="movies")renderLibrary("Movies",DATA.filter(x=>x.type==="Movie"));
  if(state.view==="series")renderLibrary("Series",DATA.filter(x=>x.type==="Series"));
  if(state.view==="trending")renderLibrary("Trending",DATA.slice().sort((a,b)=>b.popularity-a.popularity));
  if(state.view==="genres")renderLibrary("Browse Genres",DATA);
  updateCount();
}
function openDetails(id){
  const item=find(id); if(!item)return;
  state.recent=[Number(id),...state.recent.filter(x=>x!==Number(id))].slice(0,12);save("cinemora-recent",state.recent);
  const episodes=item.episodes?.length?`<div class="related"><h3>Episodes</h3><div class="episode-list">${item.episodes.map(e=>`<div class="episode" data-episode="${e.number}" data-id="${item.id}"><span class="episode-num">E${e.number}</span><div><strong>${esc(e.title)}</strong><br><small>${esc(e.description)} • ${e.duration}</small></div></div>`).join("")}</div></div>`:"";
  $("#modalContent").innerHTML=`<div class="detail-hero" style="background-image:url('${item.backdrop}')"></div>
    <div class="detail-content"><div class="detail-main"><img class="detail-poster" src="${item.poster}" alt="${esc(item.title)} poster"><div class="detail-text">
      <p class="eyebrow">${item.type.toUpperCase()}</p><h2>${esc(item.title)}</h2>
      <div class="meta"><span class="rating">★ ${item.rating}</span><span>${item.year}</span><span>${item.runtime}</span>${item.genres.map(g=>`<span class="tag">${g}</span>`).join("")}</div>
      <p class="detail-description">${esc(item.description)}</p>
      <p class="detail-description"><b>Cast:</b> ${item.cast.join(", ")} &nbsp; <b>Director:</b> ${item.director}</p>
      <div class="hero-actions"><button class="primary-btn" data-action="watch" data-id="${item.id}">▶ Watch Demo</button><button class="secondary-btn" data-action="save" data-id="${item.id}">${isSaved(item.id)?"♥ Saved":"♡ Watchlist"}</button><button class="secondary-btn" data-action="trailer" data-id="${item.id}">Trailer</button></div>
    </div></div>${episodes}<div class="related"><h3>Related</h3><div class="movie-grid">${DATA.filter(x=>x.id!==item.id&&x.genres.some(g=>item.genres.includes(g))).slice(0,6).map(x=>card(x)).join("")}</div></div></div>`;
  attachImageFallbacks($("#modalContent"));
  $("#modalBackdrop").classList.remove("hidden");document.body.style.overflow="hidden";
}
function closeModal(){$("#modalBackdrop").classList.add("hidden");document.body.style.overflow=""}
function openWatchlist(){
  const items=getWatchlist();
  $("#drawerContent").innerHTML=`<p class="eyebrow">YOUR LIBRARY</p><h2>Watchlist</h2>${items.length?items.map(x=>`<div class="drawer-card"><img src="${x.poster}" alt=""><div><h4>${esc(x.title)}</h4><p>${x.year} • ${x.type} • ★ ${x.rating}</p><div class="hero-actions" style="margin-top:9px"><button class="mini-btn" data-action="details" data-id="${x.id}">▶</button><button class="mini-btn" data-action="save" data-id="${x.id}">♥</button></div></div></div>`).join(""):`<div class="empty-state"><div class="empty-icon">♡</div><h3>Your watchlist is empty</h3><p>Add stories you want to remember.</p></div>`}`;
  attachImageFallbacks($("#drawerContent"));$("#drawer").classList.add("open");
}
function openProfile(){
  const genres={};getWatchlist().forEach(x=>x.genres.forEach(g=>genres[g]=(genres[g]||0)+1));
  const fav=Object.entries(genres).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]).join(", ")||"Not enough data";
  $("#drawerContent").innerHTML=`<p class="eyebrow">LOCAL PROFILE</p><h2>Akash's CINEMORA</h2><div class="glass-panel" style="padding:18px;border-radius:16px;margin-top:16px"><div class="avatar-btn" style="width:60px;height:60px;font-size:20px">A</div><h3>Movie Explorer</h3><p style="color:#8c93a3;font-size:12px">Your activity stays in this browser.</p><p>Watchlist: <b>${state.watchlist.length}</b></p><p>Continue watching: <b>${Object.values(state.progress).filter(x=>x.percent>0&&x.percent<100).length}</b></p><p>Recently viewed: <b>${state.recent.length}</b></p><p>Favorite genres: <b>${esc(fav)}</b></p></div><div style="margin-top:20px"><button class="secondary-btn" id="clearData">Reset local data</button></div>`;
  $("#drawer").classList.add("open");
}
function openSettings(){
  $("#drawerContent").innerHTML=`<p class="eyebrow">PREFERENCES</p><h2>Settings</h2><div class="glass-panel" style="padding:16px;border-radius:16px;margin-top:16px">
    <p><b>Appearance</b></p><p style="color:#858d9d;font-size:12px">CINEMORA uses a cinematic dark glass theme.</p>
    <button class="secondary-btn" id="reduceMotion">Toggle reduced motion</button>
    <button class="secondary-btn" id="clearData2" style="margin-top:8px">Clear all local data</button>
  </div>`;
  $("#drawer").classList.add("open");
}
function watchDemo(id,episode=1){
  const item=find(id);if(!item)return;
  const current=state.progress[id]?.percent||0;
  $("#modalContent").innerHTML=`<div style="padding:24px 24px 30px"><p class="eyebrow">DEMO PLAYER</p><h2>${esc(item.title)}${item.type==="Series"?` • Episode ${episode}`:""}</h2>
    <div style="border-radius:18px;overflow:hidden;background:#000;border:1px solid rgba(255,255,255,.1)"><video id="demoVideo" controls playsinline preload="metadata" style="width:100%;display:block" src="${item.video}"></video></div>
    <div class="meta"><span>Progress saved locally</span><span>${current}% completed</span></div>
    <div class="hero-actions"><button class="secondary-btn" data-action="details" data-id="${id}">← Details</button>${item.type==="Series"?`<button class="secondary-btn" data-action="next" data-id="${id}" data-episode="${episode}">Next Episode →</button>`:""}</div>
    <p class="detail-description">This is a legal demo video player. No copyrighted movie or TV episode is provided.</p></div>`;
  const video=$("#demoVideo");
  video.addEventListener("timeupdate",()=>{if(video.duration){const percent=Math.min(99,Math.round(video.currentTime/video.duration*100));state.progress[id]={percent,time:video.currentTime,episode};save("cinemora-progress",state.progress)}});
  $("#modalBackdrop").classList.remove("hidden");document.body.style.overflow="hidden";
}
function showTrailer(id){
  const item=find(id);
  $("#modalContent").innerHTML=`<div style="padding:24px"><p class="eyebrow">TRAILER</p><h2>${esc(item.title)}</h2><div style="aspect-ratio:16/9;border-radius:16px;overflow:hidden;background:#000"><iframe title="${esc(item.title)} trailer" src="${item.trailer}" style="width:100%;height:100%;border:0" allowfullscreen></iframe></div><p class="detail-description">Trailer embed shown as a demo. Availability depends on the external provider.</p></div>`;
}

function navigate(view){
  state.view=view;state.query="";state.filter="All";$("#searchInput").value="";
  $$(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.nav===view));
  $("#mobileMenu").classList.remove("open");renderCurrent();window.scrollTo({top:0,behavior:"smooth"});
}
function showSearch(){const area=$("#searchArea");area.scrollIntoView({behavior:"smooth",block:"center"});$("#searchInput").focus()}
function renderSuggestions(){
  const q=state.query.trim().toLowerCase(), box=$("#suggestions");
  if(!q){box.classList.add("hidden");return}
  const items=DATA.filter(x=>(x.title+" "+x.genres.join(" ")+" "+x.year).toLowerCase().includes(q)).slice(0,6);
  box.innerHTML=items.length?items.map(x=>`<button class="suggestion" data-id="${x.id}"><img src="${x.poster}" alt=""><span><b>${esc(x.title)}</b><br><small>${x.year} • ${x.type} • ★ ${x.rating}</small></span></button>`).join(""):`<div style="padding:15px;color:#8c93a3;font-size:12px">No matching titles.</div>`;
  box.classList.remove("hidden");attachImageFallbacks(box);
}

document.addEventListener("click",e=>{
  const nav=e.target.closest("[data-nav]");if(nav){navigate(nav.dataset.nav);return}
  const filter=e.target.closest("[data-filter]");if(filter){state.filter=filter.dataset.filter;renderCurrent();return}
  const sort=e.target.closest("[data-seeall]");if(sort){state.query="";state.filter="All";state.sort="popularity";renderLibrary(sort.dataset.seeall,DATA);return}
  const cardEl=e.target.closest(".movie-card");const action=e.target.closest("[data-action]");
  if(action){
    const id=Number(action.dataset.id);
    if(action.dataset.action==="details")openDetails(id);
    if(action.dataset.action==="save")toggleWatchlist(id);
    if(action.dataset.action==="watch")watchDemo(id);
    if(action.dataset.action==="trailer")showTrailer(id);
    if(action.dataset.action==="next")watchDemo(id,Number(action.dataset.episode||1)+1);
    return;
  }
  if(cardEl && !e.target.closest("button"))openDetails(cardEl.dataset.id);
  const sug=e.target.closest(".suggestion");if(sug){openDetails(sug.dataset.id);$("#suggestions").classList.add("hidden")}
  const ep=e.target.closest(".episode");if(ep)watchDemo(ep.dataset.id,Number(ep.dataset.episode));
});
$("#searchInput").addEventListener("input",e=>{state.query=e.target.value;state.view="home";renderHome();renderSuggestions()});
$("#searchInput").addEventListener("keydown",e=>{if(e.key==="Enter"){state.query=e.target.value;$("#suggestions").classList.add("hidden");renderHome()}});
$("#clearSearch").addEventListener("click",()=>{state.query="";$("#searchInput").value="";renderHome();$("#suggestions").classList.add("hidden")});
$("#searchToggle").addEventListener("click",showSearch);
$("#watchlistBtn").addEventListener("click",openWatchlist);
$("#mobileWatchlist").addEventListener("click",openWatchlist);
$("#profileBtn").addEventListener("click",openProfile);
$("#menuToggle").addEventListener("click",()=>$("#mobileMenu").classList.toggle("open"));
$("#modalClose").addEventListener("click",closeModal);
$("#modalBackdrop").addEventListener("click",e=>{if(e.target.id==="modalBackdrop")closeModal()});
$("#drawerClose").addEventListener("click",()=>$("#drawer").classList.remove("open"));
$("#surpriseBtn").addEventListener("click",()=>openDetails(DATA[Math.floor(Math.random()*DATA.length)].id));
$("#sortSelect").addEventListener("change",e=>{state.sort=e.target.value;renderCurrent()});
$("#backTop").addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
window.addEventListener("scroll",()=>$("#backTop").classList.toggle("show",scrollY>500));
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){closeModal();$("#mobileMenu").classList.remove("open");$("#drawer").classList.remove("open");$("#suggestions").classList.add("hidden")}
  if(e.key==="/" && document.activeElement.tagName!=="INPUT" && document.activeElement.tagName!=="TEXTAREA"){e.preventDefault();showSearch()}
});
document.addEventListener("click",e=>{
  if(e.target.id==="clearData"||e.target.id==="clearData2"){
    try{["cinemora-watchlist","cinemora-progress","cinemora-recent"].forEach(k=>localStorage.removeItem(k))}catch{}
    state.watchlist=[];state.progress={};state.recent=[];toast("Local data cleared");updateCount();renderCurrent();
  }
});
let heroTimer=setInterval(()=>{state.heroIndex=(state.heroIndex+1)%6;renderHero()},6500);

renderHero();renderCurrent();updateCount();
