// ===== GAME STATE MANAGEMENT =====

const Game = {
  state: null,

  // Generation unlock thresholds
  GEN_THRESHOLDS: [0, 0, 50, 100, 150], // gen1=free, gen2=50, gen3=100, gen4=150

  // Default state
  defaultState() {
    return {
      ownedPokemon: [],       // [{id, exp}]
      activePokemonIdx: 0,    // index in ownedPokemon
      totalCaught: 0,         // total catches (including duplicates, for gen unlock)
      pokedex: [],            // all IDs ever owned (unique)
      started: false,
      maxNumber: 10           // upper bound for multiplication table (3–10)
    };
  },

  // === PERSISTENCE ===
  save() {
    localStorage.setItem('pokecalc_save', JSON.stringify(this.state));
  },

  load() {
    const saved = localStorage.getItem('pokecalc_save');
    if (saved) {
      this.state = JSON.parse(saved);
      return true;
    }
    this.state = this.defaultState();
    return false;
  },

  reset() {
    if (confirm('Opravdu chceš smazat celý postup?')) {
      localStorage.removeItem('pokecalc_save');
      this.state = this.defaultState();
      this.showScreen('start');
    }
  },

  // === POKEMON MANAGEMENT ===
  getActivePokemon() {
    if (this.state.ownedPokemon.length === 0) return null;
    return this.state.ownedPokemon[this.state.activePokemonIdx];
  },

  setActivePokemon(idx) {
    if (idx >= 0 && idx < this.state.ownedPokemon.length) {
      this.state.activePokemonIdx = idx;
      this.save();
    }
  },

  addPokemon(id) {
    this.state.ownedPokemon.push({ id: id, exp: 0 });
    this.state.totalCaught++;
    this.addToPokedex(id);
    this.save();
  },

  addToPokedex(id) {
    if (!this.state.pokedex.includes(id)) {
      this.state.pokedex.push(id);
    }
  },

  // Add EXP to active pokemon, returns {evolved, oldId, newId} or null
  addExpToActive() {
    const active = this.getActivePokemon();
    if (!active) return null;

    const PD = window.PokemonData;
    // Only add EXP if pokemon can evolve
    if (!PD.canEvolve(active.id)) return null;

    active.exp++;
    this.save();

    if (active.exp >= 5) {
      const oldId = active.id;
      const newId = PD.getEvolution(oldId);
      active.id = newId;
      active.exp = 0;
      this.addToPokedex(newId);
      this.save();
      return { evolved: true, oldId: oldId, newId: newId };
    }

    return { evolved: false };
  },

  // === GENERATION MANAGEMENT ===
  getUnlockedGens() {
    const gens = [];
    for (let g = 1; g <= 4; g++) {
      if (this.state.totalCaught >= this.GEN_THRESHOLDS[g]) {
        gens.push(g);
      }
    }
    return gens;
  },

  getMaxUnlockedGen() {
    const gens = this.getUnlockedGens();
    return gens[gens.length - 1];
  },

  // Get random opponent from unlocked generations
  getRandomOpponent() {
    const PD = window.PokemonData;
    const unlockedGens = this.getUnlockedGens();

    // Collect all pokemon IDs from unlocked generations
    const available = [];
    for (const gen of unlockedGens) {
      const range = PD.GEN_RANGES[gen - 1];
      for (let id = range[0]; id <= range[1]; id++) {
        available.push(id);
      }
    }

    // Pick a random one
    return available[Math.floor(Math.random() * available.length)];
  },

  // === STARTER SELECTION ===
  chooseStarter(id) {
    this.state.started = true;
    this.state.ownedPokemon = [{ id: id, exp: 0 }];
    this.state.activePokemonIdx = 0;
    this.state.totalCaught = 1;
    this.state.pokedex = [id];
    this.save();
    this.showScreen('menu');
  },

  // === SCREEN MANAGEMENT ===
  showScreen(name) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    const screen = document.getElementById('screen-' + name);
    if (screen) {
      screen.classList.add('active');
    }

    // Run screen-specific setup
    switch (name) {
      case 'menu':
        this.renderMenu();
        break;
      case 'battle':
        if (typeof Battle !== 'undefined') Battle.start();
        break;
      case 'pokedex':
        if (typeof Pokedex !== 'undefined') Pokedex.render();
        break;
    }
  },

  // === MENU RENDERING ===
  renderMenu() {
    const PD = window.PokemonData;
    const active = this.getActivePokemon();
    if (!active) return;

    // Pokemon image and name
    document.getElementById('menu-pokemon-img').src = PD.getPokemonFile(active.id);
    document.getElementById('menu-pokemon-name').textContent = PD.getPokemonName(active.id);

    // MAX badge
    const maxBadge = document.getElementById('menu-max-badge');
    if (PD.isMaxEvolution(active.id)) {
      maxBadge.style.display = 'inline-block';
    } else {
      maxBadge.style.display = 'none';
    }

    // EXP bar
    const canEvo = PD.canEvolve(active.id);
    const expFill = document.getElementById('menu-exp-fill');
    const expText = document.getElementById('menu-exp-text');
    if (canEvo) {
      expFill.style.width = (active.exp / 5 * 100) + '%';
      expText.textContent = active.exp + ' / 5';
    } else {
      expFill.style.width = '100%';
      expText.textContent = 'MAX';
    }

    // Stats
    document.getElementById('menu-total-caught').textContent = this.state.totalCaught;
    document.getElementById('menu-team-count').textContent = this.state.ownedPokemon.length;
    document.getElementById('menu-gens').textContent = this.getUnlockedGens().join(', ');

    // Max number selector
    const maxNumSelect = document.getElementById('select-max-number');
    if (maxNumSelect) {
      maxNumSelect.value = this.state.maxNumber || 10;
    }
  },

  // === INITIALIZATION ===
  init() {
    const hasState = this.load();

    // Bind starter card clicks
    document.querySelectorAll('.starter-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.pokemon);
        this.chooseStarter(id);
      });
    });

    // Bind menu buttons
    document.getElementById('btn-battle').addEventListener('click', () => {
      this.showScreen('battle');
    });
    document.getElementById('btn-pokedex').addEventListener('click', () => {
      this.showScreen('pokedex');
    });
    document.getElementById('btn-reset').addEventListener('click', () => {
      this.reset();
    });

    // Bind pokedex back button
    document.getElementById('btn-pokedex-back').addEventListener('click', () => {
      this.showScreen('menu');
    });

    // Bind battle result button
    document.getElementById('result-btn').addEventListener('click', () => {
      Battle.onResultContinue();
    });

    // Bind max number selector
    const maxNumSelect = document.getElementById('select-max-number');
    if (maxNumSelect) {
      maxNumSelect.addEventListener('change', () => {
        this.state.maxNumber = parseInt(maxNumSelect.value);
        this.save();
      });
    }

    // Show correct screen
    if (hasState && this.state.started) {
      this.showScreen('menu');
    } else {
      this.showScreen('start');
    }
  }
};

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
