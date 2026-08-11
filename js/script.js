/**
 * CINEMORA - Complete Frontend Application Logic
 * Clean, production-ready vanilla JavaScript implementation.
 */

// ==========================================
// 1. DATASET (Demo Movies & TV Series)
// ==========================================
const CINEMORA_DATA = [
  {
    id: "m1",
    title: "Cyberpunk 2099: Cyber City",
    type: "movie",
    rating: 8.9,
    year: 2024,
    runtime: "2h 28m",
    genres: ["Sci-Fi", "Action"],
    director: "Denis Villeneuve",
    cast: ["Keanu Reeves", "Ana de Armas", "Ryan Gosling"],
    description: "In a futuristic metropolis consumed by neon lights and artificial intelligence, a rogue operative uncovers a conspiracy that threatens human consciousness.",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "m2",
    title: "Shadows of Eldoria",
    type: "movie",
    rating: 9.1,
    year: 2023,
    runtime: "2h 45m",
    genres: ["Fantasy", "Adventure"],
    director: "Peter Jackson",
    cast: ["Ian McKellen", "Viggo Mortensen", "Cate Blanchett"],
    description: "When an ancient darkness wakes beneath the realm, four heroes must cross forgotten lands to seal the shadow realm before all light is lost.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  },
  {
    id: "s1",
    title: "Neon Horizon",
    type: "series",
    rating: 8.7,
    year: 2024,
    runtime: "3 Seasons",
    genres: ["Sci-Fi", "Drama"],
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Zendaya", "Timothy Chalamet"],
    description: "Humanity's last colony ship reaches an uncharted planet, only to discover time flows backwards on its stormy surface.",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          { epNumber: 1, title: "Departure", duration: "48m", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { epNumber: 2, title: "Singularity", duration: "52m", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
        ]
      }
    ]
  },
  {
    id: "m3",
    title: "Velocity Noir",
    type: "movie",
    rating: 8.4,
    year: 2022,
    runtime: "1h 55m",
    genres: ["Action", "Thriller"],
    director: "Chad Stahelski",
    cast: ["John Wick", "Halle Berry", "Donnie Yen"],
    description: "An elite getaway driver gets tangled in an underground heist across rain-slicked Tokyo streets.",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
  },
  {
    id: "s2",
    title: "The Alchemy Paradox",
    type: "series",
    rating: 9.3,
    year: 2023,
    runtime: "2 Seasons",
    genres: ["Fantasy", "Thriller"],
    director: "Guillermo del Toro",
    cast: ["Mads Mikkelsen", "Eva Green"],
    description: "In Victorian London, secret societies practice dangerous alchemy that blurs the line between science and sorcery.",
    poster: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          { epNumber: 1, title: "The Philosopher's Key", duration: "55m", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4" }
        ]
      }
    ]
  },
  {
    id: "m4",
    title: "Quantum Drift",
    type: "movie",
    rating: 7.9,
    year: 2024,
    runtime: "2h 10m",
    genres: ["Sci-Fi", "Adventure"],
    director: "Lana Wachowski",
    cast: ["Carrie-Anne Moss", "Yahya Abdul-Mateen"],
    description: "A team of deep-space salvagers discover a derelict research ship drifting between parallel dimensions.",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  }
];

// Combine unique genres
const ALL_GENRES = ["Action", "Adventure", "Animation", "Comedy", "Drama", "Fantasy", "Horror", "Sci-Fi", "Thriller"];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
let state = {
  watchlist: JSON.parse(localStorage.getItem("cinemora_watchlist")) || [],
  continueWatching: JSON.parse(localStorage.getItem("cinemora_continue")) || [],
  currentSearch: "",
  typeFilter: "all",
  genreFilter: "all",
  sortBy: "popular",
  activeMovie: null
};

// ==========================================
// 3. INITIALIZATION & EVENT LISTENERS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initHero();
  initGenreChips();
  renderAllSections();
  setupEventListeners();
  updateWatchlistBadge();
});

function setupEventListeners() {
  // Mobile Hamburger Toggle
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");
  hamburgerBtn.addEventListener("click", () => navLinks.classList.toggle("active"));

  // Header Navigation Filter Clicks
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
      document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
      e.currentTarget.classList.add("active");
      
      const filter = e.currentTarget.dataset.filter;
      if (filter) {
        state.typeFilter = filter;
        document.getElementById("typeFilter").value = filter;
        applyFiltersAndSearch();
      }
      navLinks.classList.remove("active");
    });
  });

  // Search Input & Controls
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  
  searchInput.addEventListener("input", (e) => {
    state.currentSearch = e.target.value.toLowerCase().trim();
    clearSearchBtn.style.display = state.currentSearch ? "block" : "none";
    applyFiltersAndSearch();
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    state.currentSearch = "";
    clearSearchBtn.style.display = "none";
    applyFiltersAndSearch();
  });

  // Filter Dropdowns
  document.getElementById("typeFilter").addEventListener("change", (e) => {
    state.typeFilter = e.target.value;
    applyFiltersAndSearch();
  });

  document.getElementById("genreFilter").addEventListener("change", (e) => {
    state.genreFilter = e.target.value;
    applyFiltersAndSearch();
  });

  document.getElementById("sortFilter").addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    applyFiltersAndSearch();
  });

  // Header Action Buttons
  document.getElementById("surpriseBtn").addEventListener("click", handleSurpriseMe);
  document.getElementById("navWatchlistBtn").addEventListener("click", openProfileModal);
  document.getElementById("profileBtn").addEventListener("click", openProfileModal);

  // Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === "Escape") {
      closeAllModals();
    }
  });

  // Modals Close Events
  document.getElementById("closeDetailsModal").addEventListener("click", () => closeModal("detailsModal"));
  document.getElementById("closePlayerBtn").addEventListener("click", stopAndClosePlayer);
  document.getElementById("closeProfileModal").addEventListener("click", () => closeModal("profileModal"));

  // Back to top scroll listener
  const backToTopBtn = document.getElementById("backToTopBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTopBtn.style.display = "flex";
    else backToTopBtn.style.display = "none";
  });
  backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ==========================================
// 4. RENDERING FUNCTIONS
// ==========================================
function initHero() {
  const featured = CINEMORA_DATA[0];
  state.activeMovie = featured;

  document.getElementById("heroBackdrop").src = featured.backdrop;
  document.getElementById("heroTitle").textContent = featured.title;
  document.getElementById("heroDescription").textContent = featured.description;
  document.getElementById("heroRating").innerHTML = `<i class="fa-solid fa-star"></i> ${featured.rating}`;
  document.getElementById("heroYear").textContent = featured.year;
  document.getElementById("heroType").textContent = featured.type.toUpperCase();
  document.getElementById("heroGenres").innerHTML = `<i class="fa-solid fa-tags"></i> ${featured.genres.join(", ")}`;
  document.getElementById("heroRuntime").innerHTML = `<i class="fa-solid fa-clock"></i> ${featured.runtime}`;

  document.getElementById("heroWatchBtn").onclick = () => openPlayerModal(featured);
  document.getElementById("heroTrailerBtn").onclick = () => openDetailsModal(featured.id);
  document.getElementById("heroWatchlistBtn").onclick = () => toggleWatchlist(featured.id);
}

function initGenreChips() {
  const container = document.getElementById("genreChips");
  const select = document.getElementById("genreFilter");

  let html = `<button class="genre-chip active" data-genre="all">All Genres</button>`;
  
  ALL_GENRES.forEach(genre => {
    html += `<button class="genre-chip" data-genre="${genre}">${genre}</button>`;
    select.innerHTML += `<option value="${genre}">${genre}</option>`;
  });

  container.innerHTML = html;

  container.querySelectorAll(".genre-chip").forEach(chip => {
    chip.addEventListener("click", (e) => {
      container.querySelectorAll(".genre-chip").forEach(c => c.classList.remove("active"));
      e.target.classList.add("active");
      state.genreFilter = e.target.dataset.genre;
      select.value = state.genreFilter;
      applyFiltersAndSearch();
    });
  });
}

function renderMovieCard(item) {
  const isWatchlisted = state.watchlist.includes(item.id);

  return `
    <div class="movie-card" onclick="openDetailsModal('${item.id}')">
      <div class="card-poster-wrap">
        <img class="card-poster" src="${item.poster}" alt="${item.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop'" />
        <span class="card-badge-rating"><i class="fa-solid fa-star"></i> ${item.rating}</span>
        <div class="card-overlay">
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); openPlayerModalById('${item.id}')">
            <i class="fa-solid fa-play"></i> Watch
          </button>
        </div>
      </div>
      <div class="card-info">
        <h4 class="card-title">${item.title}</h4>
        <div class="card-meta">
          <span>${item.year}</span>
          <span>${item.genres[0]}</span>
        </div>
      </div>
    </div>
  `;
}

function renderAllSections() {
  renderGrid("trendingGrid", CINEMORA_DATA);
  renderGrid("popularMoviesGrid", CINEMORA_DATA.filter(i => i.type === "movie"));
  renderGrid("popularSeriesGrid", CINEMORA_DATA.filter(i => i.type === "series"));
  renderGrid("topRatedGrid", [...CINEMORA_DATA].sort((a,b) => b.rating - a.rating));
}

function renderGrid(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (items.length === 0) {
    container.innerHTML = `<p class="no-results">No content available.</p>`;
    return;
  }

  container.innerHTML = items.map(renderMovieCard).join("");
}

// ==========================================
// 5. SEARCH & FILTERING
// ==========================================
function applyFiltersAndSearch() {
  const searchResultsSection = document.getElementById("searchResultsSection");
  const searchResultsGrid = document.getElementById("searchResultsGrid");
  const resultCount = document.getElementById("resultCount");

  const filtered = CINEMORA_DATA.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(state.currentSearch) ||
                          item.genres.some(g => g.toLowerCase().includes(state.currentSearch)) ||
                          item.cast.some(c => c.toLowerCase().includes(state.currentSearch));

    const matchesType = state.typeFilter === "all" || item.type === state.typeFilter;
    const matchesGenre = state.genreFilter === "all" || item.genres.includes(state.genreFilter);

    return matchesSearch && matchesType && matchesGenre;
  });

  // Apply Sorting
  filtered.sort((a, b) => {
    if (state.sortBy === "rating") return b.rating - a.rating;
    if (state.sortBy === "newest") return b.year - a.year;
    if (state.sortBy === "title") return a.title.localeCompare(b.title);
    return 0; // default popularity
  });

  // Toggle layout sections
  if (state.currentSearch || state.typeFilter !== "all" || state.genreFilter !== "all") {
    searchResultsSection.classList.remove("hidden");
    resultCount.textContent = `${filtered.length} titles found`;
    renderGrid("searchResultsGrid", filtered);
  } else {
    searchResultsSection.classList.add("hidden");
  }
}

// ==========================================
// 6. MODALS & DETAILS VIEW
// ==========================================
function openDetailsModal(id) {
  const item = CINEMORA_DATA.find(m => m.id === id);
  if (!item) return;

  document.getElementById("modalBackdrop").src = item.backdrop;
  document.getElementById("modalPoster").src = item.poster;
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalRating").innerHTML = `<i class="fa-solid fa-star"></i> ${item.rating}`;
  document.getElementById("modalYear").textContent = item.year;
  document.getElementById("modalType").textContent = item.type.toUpperCase();
  document.getElementById("modalRuntime").textContent = item.runtime;
  document.getElementById("modalGenres").textContent = item.genres.join(", ");
  document.getElementById("modalDescription").textContent = item.description;
  document.getElementById("modalDirector").textContent = item.director;
  document.getElementById("modalCast").textContent = item.cast.join(", ");

  const playBtn = document.getElementById("modalPlayBtn");
  playBtn.onclick = () => {
    closeModal("detailsModal");
    openPlayerModal(item);
  };

  const watchlistBtn = document.getElementById("modalWatchlistBtn");
  const isSaved = state.watchlist.includes(item.id);
  watchlistBtn.innerHTML = isSaved ? `<i class="fa-solid fa-check"></i> In Watchlist` : `<i class="fa-solid fa-plus"></i> Add to Watchlist`;
  watchlistBtn.onclick = () => {
    toggleWatchlist(item.id);
    openDetailsModal(item.id); // Refresh modal UI
  };

  // Series Specific Episode Selector
  const episodesContainer = document.getElementById("seriesEpisodesContainer");
  if (item.type === "series" && item.seasons) {
    episodesContainer.classList.remove("hidden");
    renderEpisodes(item);
  } else {
    episodesContainer.classList.add("hidden");
  }

  // Related Grid
  const related = CINEMORA_DATA.filter(i => i.id !== item.id && i.genres.some(g => item.genres.includes(g)));
  renderGrid("relatedGrid", related.slice(0, 4));

  openModal("detailsModal");
}

function renderEpisodes(series) {
  const seasonSelect = document.getElementById("seasonSelect");
  const episodesList = document.getElementById("episodesList");

  seasonSelect.innerHTML = series.seasons.map(s => `<option value="${s.seasonNumber}">Season ${s.seasonNumber}</option>`).join("");
  
  const loadEps = (seasonNum) => {
    const season = series.seasons.find(s => s.seasonNumber == seasonNum);
    if (!season) return;
    
    episodesList.innerHTML = season.episodes.map(ep => `
      <div class="episode-card" onclick="openPlayerModalById('${series.id}')">
        <div>
          <strong>Ep ${ep.epNumber}: ${ep.title}</strong>
          <span style="color:var(--text-muted); font-size:0.8rem; margin-left:10px;">${ep.duration}</span>
        </div>
        <i class="fa-solid fa-circle-play text-accent"></i>
      </div>
    `).join("");
  };

  seasonSelect.onchange = (e) => loadEps(e.target.value);
  loadEps(series.seasons[0].seasonNumber);
}

// ==========================================
// 7. CUSTOM VIDEO PLAYER
// ==========================================
const videoPlayer = document.getElementById("mainVideoPlayer");

function openPlayerModalById(id) {
  const item = CINEMORA_DATA.find(m => m.id === id);
  if (item) openPlayerModal(item);
}

function openPlayerModal(item) {
  document.getElementById("playerMediaTitle").textContent = item.title;
  videoPlayer.src = item.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  openModal("playerModal");
  videoPlayer.play();
  setupPlayerControls();
}

function setupPlayerControls() {
  const playPauseBtn = document.getElementById("playPauseBtn");
  const progressBar = document.getElementById("progressBar");
  const progressContainer = document.getElementById("progressContainer");

  playPauseBtn.onclick = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
      playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
      videoPlayer.pause();
      playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
  };

  videoPlayer.ontimeupdate = () => {
    const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.style.width = `${percent}%`;
  };

  progressContainer.onclick = (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoPlayer.currentTime = pos * videoPlayer.duration;
  };
}

function stopAndClosePlayer() {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  closeModal("playerModal");
}

// ==========================================
// 8. WATCHLIST & PROFILE
// ==========================================
function toggleWatchlist(id) {
  if (state.watchlist.includes(id)) {
    state.watchlist = state.watchlist.filter(i => i !== id);
    showToast("Removed from Watchlist");
  } else {
    state.watchlist.push(id);
    showToast("Added to Watchlist");
  }
  localStorage.setItem("cinemora_watchlist", JSON.stringify(state.watchlist));
  updateWatchlistBadge();
}

function updateWatchlistBadge() {
  document.getElementById("watchlistCount").textContent = state.watchlist.length;
}

function openProfileModal() {
  document.getElementById("profileWatchlistCount").textContent = state.watchlist.length;
  
  const savedItems = CINEMORA_DATA.filter(item => state.watchlist.includes(item.id));
  renderGrid("watchlistGrid", savedItems);

  openModal("profileModal");
}

function handleSurpriseMe() {
  const randomItem = CINEMORA_DATA[Math.floor(Math.random() * CINEMORA_DATA.length)];
  openDetailsModal(randomItem.id);
  showToast(`Surprise: Selected "${randomItem.title}"`);
}

// ==========================================
// 9. UTILITIES & TOASTS
// ==========================================
function openModal(id) {
  document.getElementById(id).classList.add("active");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  videoPlayer.pause();
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
