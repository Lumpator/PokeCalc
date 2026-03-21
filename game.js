// PokeCalc - Game Logic

// === STATE MANAGEMENT ===
const STORAGE_KEY = "pokecalc_state";

const DEFAULT_STATE = {
    activePokemonIdx: 0,
    ownedPokemon: [], // [{id, exp}]
    totalCaught: 0,
    pokedex: [], // IDs ever owned
    started: false,
};

let state = loadState();

function loadState() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) return JSON.parse(data);
    } catch (e) {
        /* ignore */
    }
    return { ...DEFAULT_STATE };
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetGame() {
    if (confirm("Opravdu chceš smazat celý postup a začít znovu?")) {
        localStorage.removeItem(STORAGE_KEY);
        state = { ...DEFAULT_STATE, ownedPokemon: [], pokedex: [] };
        showScreen("start");
    }
}

// === SCREEN MANAGEMENT ===
function showScreen(name) {
    document
        .querySelectorAll(".screen")
        .forEach((s) => s.classList.remove("active"));
    const screen = document.getElementById("screen-" + name);
    if (screen) {
        screen.classList.add("active");
    }

    // Render dynamic screens
    switch (name) {
        case "menu":
            renderMenu();
            break;
        case "battle":
            Battle.start();
            break;
        case "pokedex":
            renderPokedex();
            break;
    }
}

// === UTILITY ===
function getUnlockedGens() {
    const gens = [1];
    if (state.totalCaught >= GEN_UNLOCK[2]) gens.push(2);
    if (state.totalCaught >= GEN_UNLOCK[3]) gens.push(3);
    if (state.totalCaught >= GEN_UNLOCK[4]) gens.push(4);
    return gens;
}

function getActivePokemon() {
    return state.ownedPokemon[state.activePokemonIdx] || null;
}

function addToPokedex(id) {
    if (!state.pokedex.includes(id)) {
        state.pokedex.push(id);
    }
}

function getHpColorClass(percent) {
    if (percent > 50) return "hp-high";
    if (percent > 20) return "hp-mid";
    return "hp-low";
}

// === MENU SCREEN ===
function renderMenu() {
    const el = document.getElementById("screen-menu");
    const active = getActivePokemon();
    if (!active) return;

    const name = getPokemonName(active.id);
    const file = getPokemonFile(active.id);
    const maxEvo = isMaxEvolved(active.id);
    const gens = getUnlockedGens();
    const uniqueCount = state.pokedex.length;

    let expHtml = "";
    if (!maxEvo) {
        const expPercent = (active.exp / 5) * 100;
        expHtml = `
      <div class="exp-bar-container">
        <div class="exp-bar-label">EXP: ${active.exp} / 5</div>
        <div class="exp-bar">
          <div class="exp-bar-fill" style="width:${expPercent}%"></div>
        </div>
      </div>`;
    } else {
        expHtml = `<div class="exp-bar-container"><div class="exp-bar-label">Maximální evoluce!</div></div>`;
    }

    const nextGenThreshold = !gens.includes(2)
        ? 50
        : !gens.includes(3)
          ? 100
          : !gens.includes(4)
            ? 150
            : null;

    const genInfoHtml = nextGenThreshold
        ? `<div class="menu-gen-info">Chytáš: ${state.totalCaught} / ${nextGenThreshold} pro další generaci</div>`
        : `<div class="menu-gen-info">Všechny generace odemčeny!</div>`;

    el.innerHTML = `
    <div class="menu-pokemon">
      <img src="${file}" alt="${name}">
      <div class="menu-pokemon-name">${name}${maxEvo ? '<span class="max-badge">MAX</span>' : ""}</div>
      <div class="menu-pokemon-info">#${active.id} · Gen ${getPokemonGen(active.id)}</div>
      ${expHtml}
    </div>
    <div class="menu-stats">
      <div class="menu-stat">
        <div class="menu-stat-value">${state.totalCaught}</div>
        <div class="menu-stat-label">Chyceno</div>
      </div>
      <div class="menu-stat">
        <div class="menu-stat-value">${uniqueCount}</div>
        <div class="menu-stat-label">Pokédex</div>
      </div>
      <div class="menu-stat">
        <div class="menu-stat-value">Gen ${gens[gens.length - 1]}</div>
        <div class="menu-stat-label">Generace</div>
      </div>
    </div>
    ${genInfoHtml}
    <div class="menu-buttons">
      <button class="btn btn-red btn-large" onclick="showScreen('battle')">Bojovat!</button>
      <button class="btn btn-blue btn-large" onclick="showScreen('pokedex')">Pokédex</button>
    </div>
    <button class="reset-btn" onclick="resetGame()">Resetovat hru</button>
  `;
}

// === BATTLE SYSTEM ===
const Battle = {
    playerHp: 100,
    opponentHp: 100,
    opponentId: null,
    timer: null,
    timeLeft: 10,
    questionActive: false,
    currentAnswer: null,

    start() {
        this.playerHp = 100;
        this.opponentHp = 100;
        this.questionActive = false;

        // Pick random opponent from unlocked gens
        const gens = getUnlockedGens();
        const pool = [];
        gens.forEach((g) => {
            const [start, end] = GEN_RANGES[g];
            for (let i = start; i <= end; i++) pool.push(i);
        });
        this.opponentId = pool[Math.floor(Math.random() * pool.length)];

        this.render();
        this.nextQuestion();
    },

    render() {
        const el = document.getElementById("screen-battle");
        const active = getActivePokemon();
        const playerName = getPokemonName(active.id);
        const playerFile = getPokemonFile(active.id);
        const oppName = getPokemonName(this.opponentId);
        const oppFile = getPokemonFile(this.opponentId);

        el.innerHTML = `
      <div class="battle-container">
        <div class="timer-bar-container">
          <div class="timer-bar" id="timer-bar" style="width:100%"></div>
        </div>
        <div class="battle-field" id="battle-field">
          <div class="battle-opponent">
            <div class="pokemon-label">${oppName}</div>
            <div class="hp-bar-wrap">
              <div class="hp-label"><span>HP</span><span id="opp-hp-text">${this.opponentHp}%</span></div>
              <div class="hp-bar"><div class="hp-bar-fill ${getHpColorClass(this.opponentHp)}" id="opp-hp" style="width:${this.opponentHp}%"></div></div>
            </div>
            <img src="${oppFile}" alt="${oppName}" id="opp-img">
          </div>
          <div class="battle-player">
            <img src="${playerFile}" alt="${playerName}" id="player-img">
            <div class="pokemon-label">${playerName}</div>
            <div class="hp-bar-wrap">
              <div class="hp-label"><span>HP</span><span id="player-hp-text">${this.playerHp}%</span></div>
              <div class="hp-bar"><div class="hp-bar-fill ${getHpColorClass(this.playerHp)}" id="player-hp" style="width:${this.playerHp}%"></div></div>
            </div>
          </div>
        </div>
        <div class="battle-question" id="question-area"></div>
        <div class="battle-answers" id="answers-area"></div>
      </div>
    `;
    },

    nextQuestion() {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        this.currentAnswer = a * b;

        const answers = this.generateAnswers(this.currentAnswer);

        document.getElementById("question-area").innerHTML =
            `<div class="battle-question-text">${a} &times; ${b} = ?</div>`;

        const answersEl = document.getElementById("answers-area");
        answersEl.innerHTML = answers
            .map(
                (ans) =>
                    `<button class="answer-btn" onclick="Battle.answer(this, ${ans})">${ans}</button>`,
            )
            .join("");

        this.questionActive = true;
        this.startTimer();
    },

    generateAnswers(correct) {
        const answers = new Set([correct]);
        let attempts = 0;
        while (answers.size < 3 && attempts < 50) {
            attempts++;
            let wrong;
            const offset = Math.floor(Math.random() * 15) + 1;
            if (Math.random() < 0.5) {
                wrong = correct + offset;
            } else {
                wrong = correct - offset;
            }
            if (wrong > 0 && wrong !== correct) {
                answers.add(wrong);
            }
        }
        // Shuffle
        return [...answers].sort(() => Math.random() - 0.5);
    },

    startTimer() {
        this.timeLeft = 10;
        const timerBar = document.getElementById("timer-bar");
        if (!timerBar) return;

        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeLeft -= 0.1;
            const pct = Math.max(0, (this.timeLeft / 10) * 100);
            timerBar.style.width = pct + "%";

            if (this.timeLeft <= 3) {
                timerBar.classList.add("warning");
            } else {
                timerBar.classList.remove("warning");
            }

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                if (this.questionActive) {
                    this.questionActive = false;
                    this.onWrong(null);
                }
            }
        }, 100);
    },

    answer(btn, value) {
        if (!this.questionActive) return;
        this.questionActive = false;
        clearInterval(this.timer);

        // Disable all buttons
        document
            .querySelectorAll(".answer-btn")
            .forEach((b) => (b.style.pointerEvents = "none"));

        if (value === this.currentAnswer) {
            btn.classList.add("correct");
            this.onCorrect();
        } else {
            btn.classList.add("wrong");
            // Highlight correct answer
            document.querySelectorAll(".answer-btn").forEach((b) => {
                if (parseInt(b.textContent) === this.currentAnswer) {
                    b.classList.add("correct");
                }
            });
            this.onWrong(btn);
        }
    },

    onCorrect() {
        this.opponentHp -= 20;
        if (this.opponentHp < 0) this.opponentHp = 0;

        this.updateHpBars();
        this.showHitEffect("opp-img");

        setTimeout(() => {
            if (this.opponentHp <= 0) {
                this.onWin();
            } else {
                this.nextQuestion();
            }
        }, 800);
    },

    onWrong(btn) {
        this.playerHp -= 20;
        if (this.playerHp < 0) this.playerHp = 0;

        this.updateHpBars();
        this.showHitEffect("player-img");

        setTimeout(() => {
            if (this.playerHp <= 0) {
                this.onLose();
            } else {
                this.nextQuestion();
            }
        }, 1000);
    },

    showHitEffect(imgId) {
        const img = document.getElementById(imgId);
        if (img) {
            img.classList.add("shake-anim", "damage-flash");
            setTimeout(
                () => img.classList.remove("shake-anim", "damage-flash"),
                400,
            );
        }
    },

    updateHpBars() {
        const oppHp = document.getElementById("opp-hp");
        const oppText = document.getElementById("opp-hp-text");
        const playerHp = document.getElementById("player-hp");
        const playerText = document.getElementById("player-hp-text");

        if (oppHp) {
            oppHp.style.width = this.opponentHp + "%";
            oppHp.className = "hp-bar-fill " + getHpColorClass(this.opponentHp);
        }
        if (oppText) oppText.textContent = this.opponentHp + "%";

        if (playerHp) {
            playerHp.style.width = this.playerHp + "%";
            playerHp.className =
                "hp-bar-fill " + getHpColorClass(this.playerHp);
        }
        if (playerText) playerText.textContent = this.playerHp + "%";
    },

    onWin() {
        clearInterval(this.timer);
        const active = getActivePokemon();

        // Catch opponent
        state.ownedPokemon.push({ id: this.opponentId, exp: 0 });
        state.totalCaught++;
        addToPokedex(this.opponentId);

        // Give EXP to active pokemon if it can evolve
        let willEvolve = false;
        let oldId = active.id;
        if (canEvolve(active.id)) {
            active.exp++;
            if (active.exp >= 5) {
                willEvolve = true;
            }
        }

        saveState();
        this.showResult(true, willEvolve, oldId);
    },

    onLose() {
        clearInterval(this.timer);
        this.showResult(false, false, null);
    },

    showResult(won, willEvolve, oldId) {
        const el = document.getElementById("screen-result");
        const active = getActivePokemon();

        let html = '<div class="result-container">';

        if (won) {
            html += `<div class="result-title win">Vítězství!</div>`;

            // Show caught pokemon
            html += `
        <div class="result-caught">
          <div class="result-caught-title">Nový Pokémon chycen!</div>
          <img src="${getPokemonFile(this.opponentId)}" alt="">
          <div class="result-pokemon-name">${getPokemonName(this.opponentId)}</div>
        </div>`;

            // Show EXP gain
            if (canEvolve(active.id) || willEvolve) {
                if (willEvolve) {
                    html += `<div class="result-exp">+1 EXP → Evoluce!</div>`;
                } else {
                    html += `<div class="result-exp">+1 EXP (${active.exp}/5)</div>`;
                }
            }
        } else {
            html += `
        <div class="result-title lose">Prohra!</div>
        <div class="result-pokemon">
          <img src="${getPokemonFile(active.id)}" alt="">
          <div class="result-pokemon-name">${getPokemonName(active.id)} byl poražen</div>
        </div>`;
        }

        html += `<div class="result-buttons">`;
        if (won && willEvolve) {
            html += `<button class="btn btn-yellow btn-large" onclick="Evolution.start(${state.activePokemonIdx}, ${oldId})">Evoluce!</button>`;
        } else {
            html += `<button class="btn btn-red btn-large" onclick="showScreen('battle')">Další zápas</button>`;
            html += `<button class="btn btn-blue btn-large" onclick="showScreen('menu')">Zpět</button>`;
        }
        html += `</div></div>`;

        el.innerHTML = html;
        document
            .querySelectorAll(".screen")
            .forEach((s) => s.classList.remove("active"));
        el.classList.add("active");
    },
};

// === EVOLUTION SYSTEM ===
const Evolution = {
    start(pokemonIdx, oldId) {
        const pokemon = state.ownedPokemon[pokemonIdx];
        const newId = getEvolution(oldId);
        if (!newId) {
            showScreen("menu");
            return;
        }

        // Record in pokedex, evolve
        addToPokedex(newId);
        pokemon.id = newId;
        pokemon.exp = 0;
        saveState();

        const el = document.getElementById("screen-evolution");
        const oldFile = getPokemonFile(oldId);
        const newFile = getPokemonFile(newId);
        const oldName = getPokemonName(oldId);
        const newName = getPokemonName(newId);

        el.innerHTML = `
      <div class="evolution-container">
        <div class="evolution-title">Evoluce!</div>
        <div class="evolution-pokemon" id="evo-pokemon">
          <div class="evolution-glow"></div>
          <img src="${oldFile}" alt="${oldName}" id="evo-old" style="opacity:1">
          <img src="${newFile}" alt="${newName}" id="evo-new" style="opacity:0">
        </div>
        <div id="evo-names">
          <div class="evolution-result">${oldName}</div>
        </div>
      </div>
    `;

        document
            .querySelectorAll(".screen")
            .forEach((s) => s.classList.remove("active"));
        el.classList.add("active");

        this.animate(oldName, newName);
    },

    animate(oldName, newName) {
        const oldImg = document.getElementById("evo-old");
        const newImg = document.getElementById("evo-new");
        const namesEl = document.getElementById("evo-names");
        if (!oldImg || !newImg) return;

        let interval = 800; // ms between blinks
        let showingNew = false;
        let blinkCount = 0;
        const maxBlinks = 14;

        const blink = () => {
            showingNew = !showingNew;
            blinkCount++;

            oldImg.style.opacity = showingNew ? "0" : "1";
            newImg.style.opacity = showingNew ? "1" : "0";

            if (blinkCount >= maxBlinks) {
                // Stay on new pokemon
                oldImg.style.opacity = "0";
                newImg.style.opacity = "1";
                namesEl.innerHTML = `
          <div class="evolution-arrow">${oldName} se vyvinul na</div>
          <div class="evolution-new-name">${newName}</div>
        `;

                setTimeout(() => {
                    namesEl.innerHTML += `
            <div class="result-buttons" style="margin-top:24px">
              <button class="btn btn-red btn-large" onclick="showScreen('battle')">Další zápas</button>
              <button class="btn btn-blue btn-large" onclick="showScreen('menu')">Zpět</button>
            </div>
          `;
                }, 800);
                return;
            }

            // Accelerate
            interval = Math.max(80, interval * 0.82);
            setTimeout(blink, interval);
        };

        setTimeout(blink, interval);
    },
};

// === POKEDEX ===
let pokedexCurrentGen = 1;

function renderPokedex(gen) {
    if (gen !== undefined) pokedexCurrentGen = gen;
    const currentGen = pokedexCurrentGen;

    const el = document.getElementById("screen-pokedex");
    const gens = getUnlockedGens();
    const [start, end] = GEN_RANGES[currentGen];
    const active = getActivePokemon();

    // Build tabs
    let tabsHtml = "";
    for (let g = 1; g <= 4; g++) {
        const unlocked = gens.includes(g);
        const cls =
            (g === currentGen ? "active" : "") + (unlocked ? "" : " locked");
        const label = unlocked ? `Gen ${g}` : `Gen ${g} 🔒`;
        tabsHtml += `<button class="pokedex-tab ${cls}" onclick="renderPokedex(${g})">${label}</button>`;
    }

    // Build grid
    let gridHtml = "";
    for (let id = start; id <= end; id++) {
        const name = getPokemonName(id);
        const file = getPokemonFile(id);
        const owned = state.pokedex.includes(id);
        const isInTeam = state.ownedPokemon.some((p) => p.id === id);
        const isActive = active && active.id === id;

        let classes = "pokedex-card";
        if (owned) {
            classes += " owned";
        } else {
            classes += " silhouette";
        }
        if (isActive) classes += " active-pokemon";

        const onclick = isInTeam ? `onclick="selectPokemon(${id})"` : "";

        gridHtml += `
      <div class="${classes}" ${onclick}>
        <img src="${file}" alt="${name}" loading="lazy">
        <div class="poke-number">#${String(id).padStart(3, "0")}</div>
        <div class="poke-name">${owned ? name : "???"}</div>
      </div>`;
    }

    el.innerHTML = `
    <div class="pokedex-header">
      <h2 class="pokedex-title">Pokédex</h2>
      <button class="pokedex-back" onclick="showScreen('menu')">← Zpět</button>
    </div>
    <div class="pokedex-tabs">${tabsHtml}</div>
    <div class="pokedex-select-hint">Klikni na pokémona, kterého vlastníš, pro výběr do boje</div>
    <div class="pokedex-grid">${gridHtml}</div>
  `;
}

function selectPokemon(id) {
    // Find in owned pokemon list
    const idx = state.ownedPokemon.findIndex((p) => p.id === id);
    if (idx === -1) return;

    state.activePokemonIdx = idx;
    saveState();
    showScreen("menu");
}

// === GAME OBJECT (public API) ===
const Game = {
    chooseStarter(id) {
        state.started = true;
        state.ownedPokemon = [{ id: id, exp: 0 }];
        state.activePokemonIdx = 0;
        state.totalCaught = 0;
        state.pokedex = [id];
        saveState();
        showScreen("menu");
    },
};

// === INIT ===
(function init() {
    if (state.started && state.ownedPokemon.length > 0) {
        showScreen("menu");
    } else {
        showScreen("start");
    }
})();
