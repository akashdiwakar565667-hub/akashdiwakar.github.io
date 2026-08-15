
const API_KEY = "f69c4c12d7283161b450f3e3d2bcacfd";
const TMDB = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/";

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const state = {
  view: "home",
  filter: "All",
  query: "",
  sort: "popularity",
  movies: [],
  series: [],
  all: [],
  heroIndex: 0,
  watchlist: read("cinemora-watchlist", []),
  recent: read("cinemora-recent", [])
};

function read(k, fallback) {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function save(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
}
function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}
function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  $("#toastStack").appendChild(el);
  setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 300); }, 2200);
}
function isSaved(id) { return state.watchlist.includes(Number(id)); }
function updateCount() { $("#watchlistCount").textContent = state.watchlist.length; }

function image(path, size = "w500") {
  return path ? IMG + size + path : placeholder();
}
function placeholder() {
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900">
      <rect width="100%" height="100%" fill="#121621"/>
      <text x="50%" y="50%" fill="#9b82ff" text-anchor="middle" font-family="Arial" font-size="34">CINEMORA</text>
    </svg>`
  );
}

async function api(path, params = {}) {
  if (!API_KEY || API_KEY === "YOUR_NEW_TMDB_API_KEY") {
    throw new Error("TMDB API key is missing. Add it at the top of js/script.js.");
  }
  const url = new URL(TMDB + path);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`);
  return res.json();
}

function normalize(x, type) {
  const isMovie = type === "Movie";
  return {
    id: Number(x.id),
    tmdbId: Number(x.id),
    title: x.title || x.name || "Untitled",
    type,
    year: (x.release_date || x.first_air_date || "").slice(0,4) || "N/A",
    rating: Number(x.vote_average || 0).toFixed(1),
    popularity: Number(x.popularity || 0),
    genres: [],
    description: x.overview || "No description is available.",
    poster: image(x.poster_path, "w500"),
    backdrop: image(x.backdrop_path, "w1280"),
    language: (x.original_language || "").toUpperCase(),
    voteCount: x.vote_count || 0
  };
}

async function loadHome() {
  $("#sections").innerHTML = `<div class="loading glass-panel">Loading CINEMORA from TMDB…</div>`;
  try {
    const [trending, movies, tv, genresM, genresT] = await Promise.all([
      api("/trending/all/week", {language:"en-US"}),
      api("/movie/popular", {language:"en-US", page:1}),
      api("/tv/popular", {language:"en-US", page:1}),
      api("/genre/movie/list", {language:"en-US"}),
      api("/genre/tv/list", {language:"en-US"})
    ]);

    const genreMap = new Map();
    [...genresM.genres, ...genresT.genres].forEach(g => genreMap.set(g.id, g.name));

    const make = (items, type) => items.map(x => {
      const item = normalize(x, type);
      item.genres = (x.genre_ids || []).map(id => genreMap.get(id)).filter(Boolean);
      return item;
    });

    state.movies = make(movies.results || [], "Movie");
    state.series = make(tv.results || [], "Series");
    const trend = (trending.results || [])
      .filter(x => x.media_type === "movie" || x.media_type === "tv")
      .map(x => normalize(x, x.media_type === "movie" ? "Movie" : "Series"));

    state.all = dedupe([...trend, ...state.movies, ...state.series]);
    renderHero(trend.length ? trend : state.all);
    renderCurrent();
  } catch (err) {
    console.error(err);
    $("#hero").innerHTML = `<div class="hero-error"><h1>TMDB connection needed</h1><p>${esc(err.message)}</p></div>`;
    $("#sections").innerHTML = `<div class="empty-state glass-panel"><h3>Could not load movies</h3><p>Check your API key and refresh the page.</p></div>`;
  }
}

function dedupe(arr) {
  const map = new Map();
  arr.forEach(x => map.set(`${x.type}-${x.id}`, x));
  return [...map.values()];
}

function card(item, delay = 0) {
  return `<article class="movie-card" data-id="${item.id}" data-type="${item.type}" style="animation-delay:${delay}ms">
    <div class="poster-wrap">
      <img class="poster" loading="lazy" src="${item.poster}" alt="${esc(item.title)} poster"
           onerror="this.onerror=null;this.src='${placeholder()}'">
      <div class="card-overlay"><div class="card-actions">
        <button class="mini-btn" data-action="details" data-id="${item.id}" data-type="${item.type}">▶</button>
        <button class="mini-btn" data-action="save" data-id="${item.id}" data-type="${item.type}">${isSaved(item.id)?"♥":"♡"}</button>
      </div></div>
    </div>
    <div class="card-info">
      <p class="card-title">${esc(item.title)}</p>
      <div class="card-sub"><span>${item.year} • ${item.type}</span><span class="rating">★ ${item.rating}</span></div>
    </div>
  </article>`;
}

function renderHero(items) {
  if (!items.length) return;
  const item = items[state.heroIndex % Math.min(items.length, 10)];
  $("#hero").innerHTML = `
    <div class="hero-bg" style="background-image:url('${item.backdrop}')"></div>
    <div class="hero-content">
      <p class="eyebrow">FEATURED ${item.type.toUpperCase()}</p>
      <h1>${esc(item.title)}</h1>
      <div class="meta"><span class="rating">★ ${item.rating}</span><span>${item.year}</span>
        <span>${item.language || "TMDB"}</span>
        ${item.genres.slice(0,3).map(g => `<span class="tag">${esc(g)}</span>`).join("")}
      </div>
      <p class="hero-desc">${esc(item.description)}</p>
      <div class="hero-actions">
        <button class="primary-btn" data-action="details" data-id="${item.id}" data-type="${item.type}">More Info</button>
        <button class="secondary-btn" data-action="save" data-id="${item.id}" data-type="${item.type}">${isSaved(item.id)?"♥ Saved":"♡ Watchlist"}</button>
      </div>
    </div>`;
  requestAnimationFrame(() => $(".hero-bg")?.classList.add("zoom"));
  bindDynamic();
}

function filters() {
  const values = ["All","Movies","Series","Action","Adventure","Comedy","Drama","Fantasy","Sci-Fi","Thriller","Animation","Horror","Romance"];
  $("#filterRow").innerHTML = values.map(v =>
    `<button class="filter-chip ${state.filter===v?"active":""}" data-filter="${v}">${v}</button>`
  ).join("");
}

function currentItems() {
  let items = state.view === "movies" ? state.movies :
              state.view === "series" ? state.series :
              state.view === "trending" ? [...state.all].sort((a,b)=>b.popularity-a.popularity) :
              state.all;
  if (state.filter === "Movies") items = items.filter(x => x.type === "Movie");
  if (state.filter === "Series") items = items.filter(x => x.type === "Series");
  if (!["All","Movies","Series"].includes(state.filter))
    items = items.filter(x => x.genres.includes(state.filter));

  const q = state.query.trim().toLowerCase();
  if (q) items = items.filter(x =>
    `${x.title} ${x.year} ${x.type} ${x.genres.join(" ")}`.toLowerCase().includes(q)
  );
  return sortItems(items);
}

function sortItems(items) {
  const a = [...items];
  if (state.sort === "rating") a.sort((x,y)=>Number(y.rating)-Number(x.rating));
  if (state.sort === "newest") a.sort((x,y)=>Number(y.year)-Number(x.year));
  if (state.sort === "oldest") a.sort((x,y)=>Number(x.year)-Number(y.year));
  if (state.sort === "az") a.sort((x,y)=>x.title.localeCompare(y.title));
  if (state.sort === "popularity") a.sort((x,y)=>y.popularity-x.popularity);
  return a;
}

function section(title, items) {
  if (!items.length) return "";
  return `<section class="content-section">
    <div class="section-title"><h3>${esc(title)}</h3></div>
    <div class="movie-grid">${items.map((x,i)=>card(x,i*30)).join("")}</div>
  </section>`;
}

function renderHome() {
  $("#pageTitle").textContent = state.query || state.filter !== "All" ? "Search Results" : "Trending Now";
  $("#sortRow").classList.add("hidden");
  filters();

  if (state.query || state.filter !== "All") {
    const items = currentItems();
    $("#sections").innerHTML = items.length
      ? section(`${items.length} result${items.length===1?"":"s"}`, items)
      : `<div class="empty-state glass-panel"><div class="empty-icon">⌕</div><h3>No stories found</h3><p>Try another title or genre.</p></div>`;
    bindDynamic();
    return;
  }

  $("#sections").innerHTML =
    section("Trending This Week", state.all.slice(0,12)) +
    section("Popular Movies", state.movies.slice(0,12)) +
    section("Popular Series", state.series.slice(0,12)) +
    section("Top Rated", [...state.all].sort((a,b)=>Number(b.rating)-Number(a.rating)).slice(0,12));
  bindDynamic();
}

function renderLibrary(title, items) {
  $("#pageTitle").textContent = title;
  $("#sortRow").classList.remove("hidden");
  filters();
  const out = sortItems(items.filter(x => {
    if (state.filter === "All") return true;
    if (state.filter === "Movies") return x.type === "Movie";
    if (state.filter === "Series") return x.type === "Series";
    return x.genres.includes(state.filter);
  }));
  $("#sections").innerHTML = out.length
    ? section(`${out.length} titles`, out)
    : `<div class="empty-state glass-panel"><h3>Nothing found</h3><p>Try another filter.</p></div>`;
  bindDynamic();
}

function renderCurrent() {
  if (state.view === "home") renderHome();
  else if (state.view === "movies") renderLibrary("Movies", state.movies);
  else if (state.view === "series") renderLibrary("Series", state.series);
  else if (state.view === "trending") renderLibrary("Trending", state.all);
  else if (state.view === "genres") renderLibrary("Browse Genres", state.all);
  updateCount();
}

async function openDetails(id, type) {
  const endpoint = type === "Series" ? `/tv/${id}` : `/movie/${id}`;
  try {
    const item = await api(endpoint, {language:"en-US"});
    const normalized = normalize(item, type);
    normalized.genres = (item.genres || []).map(g=>g.name);
    state.recent = [id, ...state.recent.filter(x=>x!==id)].slice(0,12);
    save("cinemora-recent", state.recent);

    $("#modalContent").innerHTML = `
      <div class="detail-hero" style="background-image:url('${image(item.backdrop_path,"w1280")}')"></div>
      <div class="detail-content">
        <div class="detail-main">
          <img class="detail-poster" src="${image(item.poster_path,"w500")}" alt="">
          <div class="detail-text">
            <p class="eyebrow">${type.toUpperCase()}</p>
            <h2>${esc(normalized.title)}</h2>
            <div class="meta"><span class="rating">★ ${normalized.rating}</span><span>${normalized.year}</span>
              ${normalized.genres.map(g=>`<span class="tag">${esc(g)}</span>`).join("")}
            </div>
            <p class="detail-description">${esc(normalized.description)}</p>
            <p class="detail-description"><b>Original language:</b> ${esc(normalized.language || "N/A")}</p>
            <div class="hero-actions">
              <button class="secondary-btn" data-action="save" data-id="${id}" data-type="${type}">${isSaved(id)?"♥ Saved":"♡ Watchlist"}</button>
              ${item.homepage ? `<a class="secondary-btn" href="${esc(item.homepage)}" target="_blank" rel="noopener">Official Site</a>` : ""}
            </div>
          </div>
        </div>
      </div>`;
    $("#modalBackdrop").classList.remove("hidden");
    document.body.style.overflow = "hidden";
    bindDynamic();
  } catch (e) {
    toast("Could not load title details.");
    console.error(e);
  }
}

function toggleWatchlist(id) {
  id = Number(id);
  if (isSaved(id)) {
    state.watchlist = state.watchlist.filter(x=>x!==id);
    toast("Removed from Watchlist");
  } else {
    state.watchlist.push(id);
    toast("Added to Watchlist");
  }
  save("cinemora-watchlist", state.watchlist);
  updateCount();
  renderCurrent();
}

function openWatchlist() {
  const items = state.all.filter(x => isSaved(x.id));
  $("#drawerContent").innerHTML = `<p class="eyebrow">YOUR LIBRARY</p><h2>Watchlist</h2>` +
    (items.length ? items.map(x => `
      <div class="drawer-card">
        <img src="${x.poster}" alt="">
        <div><h4>${esc(x.title)}</h4><p>${x.year} • ${x.type} • ★ ${x.rating}</p>
        <button class="mini-btn" data-action="details" data-id="${x.id}" data-type="${x.type}">▶</button>
        <button class="mini-btn" data-action="save" data-id="${x.id}" data-type="${x.type}">♥</button></div>
      </div>`).join("") :
      `<div class="empty-state"><div class="empty-icon">♡</div><h3>Your watchlist is empty</h3><p>Add titles you want to remember.</p></div>`);
  $("#drawer").classList.add("open");
  bindDynamic();
}

function openProfile() {
  $("#drawerContent").innerHTML = `
    <p class="eyebrow">LOCAL PROFILE</p><h2>CINEMORA Explorer</h2>
    <div class="glass-panel profile-box">
      <div class="avatar-btn big-avatar">A</div>
      <h3>Movie Explorer</h3>
      <p>Watchlist: <b>${state.watchlist.length}</b></p>
      <p>Recently viewed: <b>${state.recent.length}</b></p>
      <p>Your activity stays in this browser.</p>
    </div>
    <button class="secondary-btn" id="clearData">Reset local data</button>`;
  $("#drawer").classList.add("open");
}

function openSettings() {
  $("#drawerContent").innerHTML = `
    <p class="eyebrow">PREFERENCES</p><h2>Settings</h2>
    <div class="glass-panel profile-box">
      <p><b>CINEMORA</b></p><p>TMDB-powered discovery with a cinematic glass interface.</p>
      <button class="secondary-btn" id="clearData2">Clear local data</button>
    </div>`;
  $("#drawer").classList.add("open");
}

async function searchTMDB(q) {
  if (!(q.trim())) { renderHome(); return; }
  try {
    const data = await api("/search/multi", {query:q, language:"en-US", include_adult:"false", page:1});
    const results = (data.results || [])
      .filter(x => x.media_type==="movie" || x.media_type==="tv")
      .map(x => normalize(x, x.media_type==="movie" ? "Movie" : "Series"));
state.all = results;
    $("#pageTitle").textContent = `${results.length} Search Results`;
    $("#sortRow").classList.remove("hidden");

    $("#filterRow").innerHTML = "";

    $("#sections").innerHTML = results.length
      ? section("Results", results)
      : `<div class="empty-state glass-panel"><h3>No results</h3><p>Try a different search.</p></div>`;

    bindDynamic();
  } catch(e) {
    toast("Search failed.");
    console.error(e);
  }
}

function bindDynamic() {
$$(".movie-card").forEach(el => {
  el.onclick = e => {
    if (e.target.closest("button")) return;

    const title = el.querySelector(".card-title")?.textContent || "";

    window.open(
      "https://watch.spencerdevs.xyz/search?q=" +
      encodeURIComponent(title),
      "_blank"
    );
  };
});

  $$("[data-action]").forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const id = Number(btn.dataset.id), type = btn.dataset.type;
    if (btn.dataset.action === "details") {
  const item = state.all.find(
    x => x.id === id && x.type === type
  );

  if (item) {
    window.open(
      "https://watch.spencerdevs.xyz/search?q=" +
      encodeURIComponent(item.title),
      "_blank"
    );
  }
}
      if (btn.dataset.action === "save") toggleWatchlist(id);
    };
  });

  $$("[data-filter]").forEach(btn => {
    btn.onclick = () => {
      state.filter = btn.dataset.filter;
      state.query = "";
      $("#searchInput").value = "";
      renderCurrent();
    };
  });
}

function bindNavigation() {
  $$("[data-nav]").forEach(btn => {
    btn.onclick = () => {
      state.view = btn.dataset.nav;
      state.query = "";
      state.filter = "All";
      $("#searchInput").value = "";
      $("#mobileMenu").classList.remove("open");
      $$(".nav-link").forEach(x => x.classList.toggle("active", x.dataset.nav === state.view));
      renderCurrent();
      window.scrollTo({top:0,behavior:"smooth"});
    };
  });
}

function bindUI() {
  bindNavigation();

  $("#searchToggle").onclick = () => {
    $("#searchArea").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    $("#searchInput").focus();
  };

  $("#searchInput").onkeydown = e => {
    if (e.key === "Enter") searchTMDB(e.target.value);
  };

  $("#clearSearch").onclick = () => {
    state.query = "";
    $("#searchInput").value = "";
    renderHome();
  };

  $("#watchlistBtn").onclick = openWatchlist;
  $("#mobileWatchlist").onclick = openWatchlist;
  $("#profileBtn").onclick = openProfile;
  $("#settingsBtn").onclick = openSettings;
  $("#menuToggle").onclick = () =>
    $("#mobileMenu").classList.toggle("open");

  $("#modalClose").onclick = closeModal;
  $("#drawerClose").onclick = () =>
    $("#drawer").classList.remove("open");

  $("#modalBackdrop").onclick = e => {
    if (e.target.id === "modalBackdrop") closeModal();
  };

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeModal();
      $("#drawer").classList.remove("open");
      $("#mobileMenu").classList.remove("open");
    }
  });
}

function closeModal() {
  $("#modalBackdrop").classList.add("hidden");
  document.body.style.overflow = "";
}

async function init() {
  bindUI();
  updateCount();
  await loadHome();

  setInterval(() => {
    if (!state.all.length) return;
    state.heroIndex = (state.heroIndex + 1) % Math.min(state.all.length, 10);
    renderHero(state.all);
  }, 7000);
}

init();
