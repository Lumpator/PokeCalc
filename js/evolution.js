// ===== EVOLUTION ANIMATION =====

const Evolution = {
  animTimer: null,
  blinkTimers: [],

  start(oldId, newId) {
    const PD = window.PokemonData;
    Game.showScreen('evolution');

    const evoImg = document.getElementById('evo-image');
    const evoText = document.getElementById('evo-text');
    const evoDisplay = document.querySelector('.evolution-display');

    const oldName = PD.getPokemonName(oldId);
    const newName = PD.getPokemonName(newId);
    const oldFile = PD.getPokemonFile(oldId);
    const newFile = PD.getPokemonFile(newId);

    evoText.textContent = `${oldName} se vyvíjí...`;
    evoImg.src = oldFile;

    // Preload new image
    const preload = new Image();
    preload.src = newFile;

    // Add glow
    evoDisplay.classList.add('evolving');

    // Evolution blink animation
    // Starts slow (1000ms interval) and gradually speeds up to 80ms
    let interval = 1000;
    let showingNew = false;
    let totalTime = 0;
    const maxDuration = 5000; // 5 seconds total animation

    this.clearTimers();

    const blink = () => {
      showingNew = !showingNew;
      evoImg.src = showingNew ? newFile : oldFile;

      // Add flash class
      evoImg.classList.add('evo-flash');
      setTimeout(() => evoImg.classList.remove('evo-flash'), 100);

      totalTime += interval;

      if (totalTime >= maxDuration) {
        // Animation complete - show new pokemon
        this.finishEvolution(newFile, newName, evoImg, evoText, evoDisplay);
        return;
      }

      // Speed up: reduce interval by 15% each step
      interval = Math.max(80, interval * 0.85);

      this.animTimer = setTimeout(blink, interval);
    };

    // Start after a short delay
    this.animTimer = setTimeout(blink, 1500);
  },

  finishEvolution(newFile, newName, evoImg, evoText, evoDisplay) {
    evoImg.src = newFile;
    evoImg.classList.add('evo-complete');
    evoDisplay.classList.remove('evolving');
    evoDisplay.classList.add('evolved');

    evoText.textContent = `Vyvinul se v ${newName}!`;

    // Auto-continue after 3 seconds
    this.animTimer = setTimeout(() => {
      evoImg.classList.remove('evo-complete');
      evoDisplay.classList.remove('evolved');
      Game.showScreen('menu');
    }, 3000);
  },

  clearTimers() {
    if (this.animTimer) {
      clearTimeout(this.animTimer);
      this.animTimer = null;
    }
    this.blinkTimers.forEach(t => clearTimeout(t));
    this.blinkTimers = [];
  }
};
