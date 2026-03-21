// ===== BATTLE SYSTEM =====

const Battle = {
  // Battle state
  enemyId: null,
  enemyHp: 100,
  playerHp: 100,
  correctAnswer: null,
  answers: [],
  timer: null,
  timerStart: null,
  timerDuration: 10000, // 10 seconds
  animationFrame: null,
  isProcessing: false,  // prevent multiple clicks
  pendingEvolution: null,

  // === START BATTLE ===
  start() {
    const PD = window.PokemonData;
    const active = Game.getActivePokemon();
    if (!active) return;

    // Reset battle state
    this.enemyId = Game.getRandomOpponent();
    this.enemyHp = 100;
    this.playerHp = 100;
    this.isProcessing = false;
    this.pendingEvolution = null;

    // Set up visuals
    document.getElementById('battle-enemy-img').src = PD.getPokemonFile(this.enemyId);
    document.getElementById('battle-enemy-name').textContent = PD.getPokemonName(this.enemyId);
    document.getElementById('battle-enemy-hp').style.width = '100%';
    document.getElementById('battle-enemy-hp').className = 'hp-fill';

    document.getElementById('battle-player-img').src = PD.getPokemonFile(active.id);
    document.getElementById('battle-player-name').textContent = PD.getPokemonName(active.id);
    document.getElementById('battle-player-hp').style.width = '100%';
    document.getElementById('battle-player-hp').className = 'hp-fill';

    // Hide result overlay
    document.getElementById('battle-result-overlay').style.display = 'none';

    // Bind answer buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
      btn.onclick = () => this.selectAnswer(parseInt(btn.dataset.index));
      btn.className = 'answer-btn btn'; // reset classes
    });

    // Generate first question
    this.nextQuestion();
  },

  // === GENERATE QUESTION ===
  nextQuestion() {
    if (this.isProcessing) return;

    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    this.correctAnswer = a * b;

    // Generate 3 answers: 1 correct + 2 wrong
    this.answers = this.generateAnswers(this.correctAnswer);

    // Update UI
    document.getElementById('battle-question').textContent = `${a} × ${b} = ?`;

    const btns = document.querySelectorAll('.answer-btn');
    btns.forEach((btn, i) => {
      btn.textContent = this.answers[i];
      btn.className = 'answer-btn btn'; // reset styling
      btn.disabled = false;
    });

    // Start timer
    this.startTimer();
  },

  // === GENERATE ANSWERS ===
  generateAnswers(correct) {
    const answers = [correct];

    while (answers.length < 3) {
      // Generate plausible wrong answer
      let wrong;
      const strategy = Math.random();

      if (strategy < 0.4) {
        // Close to correct (±1 to ±5)
        const offset = Math.floor(Math.random() * 5) + 1;
        wrong = correct + (Math.random() < 0.5 ? offset : -offset);
      } else if (strategy < 0.7) {
        // Common mistake: off by one factor
        const factor = Math.floor(Math.random() * 3) + 1;
        wrong = correct + (Math.random() < 0.5 ? factor * 10 : -factor * 10);
      } else {
        // Random from multiplication table range
        const ra = Math.floor(Math.random() * 10) + 1;
        const rb = Math.floor(Math.random() * 10) + 1;
        wrong = ra * rb;
      }

      // Ensure valid and unique
      if (wrong > 0 && wrong <= 100 && !answers.includes(wrong)) {
        answers.push(wrong);
      }
    }

    // Shuffle answers
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    return answers;
  },

  // === TIMER ===
  startTimer() {
    this.stopTimer();
    this.timerStart = Date.now();

    const timerFill = document.getElementById('battle-timer-fill');
    timerFill.style.width = '100%';
    timerFill.classList.remove('timer-danger');

    const tick = () => {
      const elapsed = Date.now() - this.timerStart;
      const remaining = Math.max(0, this.timerDuration - elapsed);
      const pct = (remaining / this.timerDuration) * 100;

      timerFill.style.width = pct + '%';

      // Add danger class when low
      if (remaining < 3000) {
        timerFill.classList.add('timer-danger');
      }

      if (remaining <= 0) {
        // Time's up - wrong answer
        this.onWrongAnswer();
        return;
      }

      this.animationFrame = requestAnimationFrame(tick);
    };

    this.animationFrame = requestAnimationFrame(tick);
  },

  stopTimer() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  },

  // === ANSWER HANDLING ===
  selectAnswer(index) {
    if (this.isProcessing) return;
    this.isProcessing = true;
    this.stopTimer();

    const selected = this.answers[index];
    const btns = document.querySelectorAll('.answer-btn');

    if (selected === this.correctAnswer) {
      // Highlight correct
      btns[index].classList.add('btn-correct');
      this.onCorrectAnswer();
    } else {
      // Highlight wrong and show correct
      btns[index].classList.add('btn-wrong');
      btns.forEach((btn, i) => {
        if (this.answers[i] === this.correctAnswer) {
          btn.classList.add('btn-correct');
        }
      });
      this.onWrongAnswer();
    }
  },

  // === CORRECT ANSWER ===
  onCorrectAnswer() {
    this.enemyHp = Math.max(0, this.enemyHp - 20);

    // Update enemy HP bar
    const hpFill = document.getElementById('battle-enemy-hp');
    hpFill.style.width = this.enemyHp + '%';
    this.updateHpColor(hpFill, this.enemyHp);

    // Shake enemy
    const enemyImg = document.getElementById('battle-enemy-img');
    enemyImg.classList.add('damage');
    setTimeout(() => enemyImg.classList.remove('damage'), 500);

    // Check if enemy defeated
    if (this.enemyHp <= 0) {
      setTimeout(() => this.onBattleWin(), 800);
    } else {
      setTimeout(() => {
        this.isProcessing = false;
        this.nextQuestion();
      }, 1000);
    }
  },

  // === WRONG ANSWER ===
  onWrongAnswer() {
    this.isProcessing = true;
    this.stopTimer();
    this.playerHp = Math.max(0, this.playerHp - 20);

    // Update player HP bar
    const hpFill = document.getElementById('battle-player-hp');
    hpFill.style.width = this.playerHp + '%';
    this.updateHpColor(hpFill, this.playerHp);

    // Shake player
    const playerImg = document.getElementById('battle-player-img');
    playerImg.classList.add('damage');
    setTimeout(() => playerImg.classList.remove('damage'), 500);

    // Highlight correct answer
    const btns = document.querySelectorAll('.answer-btn');
    btns.forEach((btn, i) => {
      if (this.answers[i] === this.correctAnswer) {
        btn.classList.add('btn-correct');
      }
      btn.disabled = true;
    });

    // Check if player defeated
    if (this.playerHp <= 0) {
      setTimeout(() => this.onBattleLose(), 800);
    } else {
      setTimeout(() => {
        this.isProcessing = false;
        this.nextQuestion();
      }, 1500);
    }
  },

  // === HP BAR COLOR ===
  updateHpColor(element, hp) {
    element.classList.remove('hp-high', 'hp-mid', 'hp-low');
    if (hp > 50) {
      element.classList.add('hp-high');
    } else if (hp > 20) {
      element.classList.add('hp-mid');
    } else {
      element.classList.add('hp-low');
    }
  },

  // === BATTLE WIN ===
  onBattleWin() {
    this.stopTimer();
    const PD = window.PokemonData;

    // Add caught pokemon
    Game.addPokemon(this.enemyId);

    // Add EXP to active pokemon
    const evoResult = Game.addExpToActive();

    // Store pending evolution
    if (evoResult && evoResult.evolved) {
      this.pendingEvolution = evoResult;
    }

    // Show result
    const overlay = document.getElementById('battle-result-overlay');
    overlay.style.display = 'flex';

    document.getElementById('result-title').textContent = 'Vítězství!';
    document.getElementById('result-title').className = 'result-title result-win';

    const resultImg = document.getElementById('result-pokemon-img');
    resultImg.src = PD.getPokemonFile(this.enemyId);
    resultImg.style.display = 'block';

    let text = PD.getPokemonName(this.enemyId) + ' byl chycen!';

    // Check generation unlock
    const unlockedGens = Game.getUnlockedGens();
    if (unlockedGens.length > 1) {
      const thresholds = Game.GEN_THRESHOLDS;
      for (let g = 2; g <= 4; g++) {
        if (Game.state.totalCaught === thresholds[g]) {
          text += '\n🎉 Generace ' + g + ' odemčena!';
        }
      }
    }

    document.getElementById('result-text').textContent = text;
  },

  // === BATTLE LOSE ===
  onBattleLose() {
    this.stopTimer();

    const overlay = document.getElementById('battle-result-overlay');
    overlay.style.display = 'flex';

    document.getElementById('result-title').textContent = 'Prohra...';
    document.getElementById('result-title').className = 'result-title result-lose';

    document.getElementById('result-pokemon-img').style.display = 'none';
    document.getElementById('result-text').textContent = 'Nevadí, zkus to znovu!';
  },

  // === RESULT CONTINUE ===
  onResultContinue() {
    if (this.pendingEvolution) {
      // Show evolution animation
      const evo = this.pendingEvolution;
      this.pendingEvolution = null;
      Evolution.start(evo.oldId, evo.newId);
    } else {
      Game.showScreen('menu');
    }
  }
};
