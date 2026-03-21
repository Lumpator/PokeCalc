// ===== POKEDEX =====

const Pokedex = {
  currentGen: 1,

  render() {
    this.renderTabs();
    this.renderGrid();
  },

  renderTabs() {
    const container = document.getElementById('pokedex-tabs');
    const unlockedGens = Game.getUnlockedGens();

    let html = '';
    for (let g = 1; g <= 4; g++) {
      const unlocked = unlockedGens.includes(g);
      const active = g === this.currentGen && unlocked;
      const threshold = Game.GEN_THRESHOLDS[g];

      if (unlocked) {
        html += `<button class="gen-tab${active ? ' active' : ''}" data-gen="${g}">Gen ${g}</button>`;
      } else {
        html += `<button class="gen-tab locked" disabled title="Chyť ${threshold} pokémonů">Gen ${g} 🔒</button>`;
      }
    }
    container.innerHTML = html;

    // Bind tab clicks
    container.querySelectorAll('.gen-tab:not(.locked)').forEach(tab => {
      tab.addEventListener('click', () => {
        this.currentGen = parseInt(tab.dataset.gen);
        this.render();
      });
    });

    // If current gen is locked, switch to gen 1
    if (!unlockedGens.includes(this.currentGen)) {
      this.currentGen = 1;
    }
  },

  renderGrid() {
    const PD = window.PokemonData;
    const container = document.getElementById('pokedex-grid');
    const range = PD.GEN_RANGES[this.currentGen - 1];
    const pokedex = Game.state.pokedex;
    const activePokemon = Game.getActivePokemon();

    let html = '';
    for (let id = range[0]; id <= range[1]; id++) {
      const owned = pokedex.includes(id);
      const isActive = activePokemon && activePokemon.id === id;
      // Check if this pokemon is in the owned list (can be selected as fighter)
      const ownedIdx = Game.state.ownedPokemon.findIndex(p => p.id === id);
      const canSelect = ownedIdx >= 0;

      let classes = 'pokedex-entry';
      if (owned) classes += ' owned';
      if (!owned) classes += ' silhouette';
      if (isActive) classes += ' selected';

      const name = PD.getPokemonName(id);
      const file = PD.getPokemonFile(id);

      // Show EXP for owned pokemon in team
      let expInfo = '';
      if (canSelect) {
        const pokemon = Game.state.ownedPokemon[ownedIdx];
        if (PD.isMaxEvolution(pokemon.id)) {
          expInfo = '<span class="pokedex-max">MAX</span>';
        } else if (PD.canEvolve(pokemon.id)) {
          expInfo = `<span class="pokedex-exp">${pokemon.exp}/5</span>`;
        }
      }

      html += `
        <div class="${classes}" data-id="${id}" data-owned-idx="${ownedIdx}">
          <div class="pokedex-img-container">
            <img src="${file}" alt="${name}" class="pokemon-img pokedex-pokemon-img${!owned ? ' silhouette' : ''}">
            ${expInfo}
          </div>
          <span class="pokedex-name">#${id} ${owned ? name : '???'}</span>
        </div>`;
    }
    container.innerHTML = html;

    // Bind clicks - only for pokemon you currently own in your team
    container.querySelectorAll('.pokedex-entry').forEach(entry => {
      const ownedIdx = parseInt(entry.dataset.ownedIdx);
      if (ownedIdx >= 0) {
        entry.style.cursor = 'pointer';
        entry.addEventListener('click', () => {
          this.selectPokemon(ownedIdx);
        });
      }
    });
  },

  selectPokemon(ownedIdx) {
    const PD = window.PokemonData;
    Game.setActivePokemon(ownedIdx);
    const pokemon = Game.state.ownedPokemon[ownedIdx];
    const name = PD.getPokemonName(pokemon.id);

    // Brief visual feedback
    this.renderGrid();

    // Show confirmation and go back to menu
    setTimeout(() => {
      Game.showScreen('menu');
    }, 300);
  }
};
