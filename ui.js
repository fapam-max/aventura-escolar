// =============================================================
// MÓDULO DE UI — Toda a renderização e interações visuais
// Não contém lógica de jogo — apenas constrói e atualiza o DOM
// =============================================================

const UI = (() => {

  // ── Referências ao DOM ────────────────────────────────
  const app = document.getElementById("app");

  // ── Transição entre ecrãs ─────────────────────────────
  function mostrarEcra(htmlConteudo, classe = "") {
    app.innerHTML = `<div class="screen ${classe} screen-enter">${htmlConteudo}</div>`;
    // Força reflow para a animação funcionar
    void app.querySelector(".screen").offsetWidth;
    app.querySelector(".screen").classList.remove("screen-enter");
    atualizarHUD();
  }

  // ── HUD persistente (cabeçalho) ───────────────────────
  function atualizarHUD() {
    const hud = document.getElementById("hud");
    if (!hud) return;
    const est = GameEngine.getEstado();
    if (!est.playerName) {
      hud.style.opacity = "0";
      hud.style.pointerEvents = "none";
      return;
    }
    hud.style.opacity = "1";
    hud.style.pointerEvents = "all";

    const avatar = est.avatarURL
      ? `<img src="${est.avatarURL}" alt="avatar" class="hud-avatar">`
      : `<div class="hud-avatar hud-avatar-placeholder">${est.playerName.charAt(0).toUpperCase()}</div>`;

    hud.innerHTML = `
      ${avatar}
      <span class="hud-name">${est.playerName}</span>
      <div class="hud-spacer"></div>
      <div class="hud-stat">
        <span class="hud-icon">⭐</span>
        <span id="hud-stars" class="hud-value">${est.stars}</span>
      </div>
      <div class="hud-stat">
        ${Array.from({ length: est.maxLives }, (_, i) =>
          `<span class="hud-heart ${i < est.lives ? "alive" : "lost"}">❤️</span>`
        ).join("")}
      </div>
    `;
  }

  // ── Ecrã de Onboarding ────────────────────────────────
  function renderOnboarding() {
    mostrarEcra(`
      <div class="onboarding-container">
        <div class="onboarding-deco">
          <div class="deco-bubble b1">📖</div>
          <div class="deco-bubble b2">🔢</div>
          <div class="deco-bubble b3">🔬</div>
          <div class="deco-bubble b4">⭐</div>
          <div class="deco-bubble b5">🚀</div>
        </div>
        <div class="onboarding-card">
          <div class="onboarding-logo">🌍</div>
          <h1 class="onboarding-title">Aventura Escolar</h1>
          <p class="onboarding-subtitle">A tua viagem pelo saber começa aqui!</p>

          <div class="avatar-section">
            <div class="avatar-preview-wrap" id="avatar-wrap">
              <div class="avatar-preview" id="avatar-preview">
                <span id="avatar-placeholder">😊</span>
              </div>
              <label class="avatar-upload-btn" for="avatar-input" title="Escolher foto">
                📷
              </label>
              <input type="file" id="avatar-input" accept="image/*" style="display:none">
            </div>
          </div>

          <div class="input-group">
            <label for="name-input">Como te chamas?</label>
            <input
              type="text"
              id="name-input"
              placeholder="Escreve o teu nome..."
              maxlength="20"
              autocomplete="off"
            >
          </div>

          <button class="btn-primary btn-start" id="btn-start" disabled>
            <span>Começar a Aventura</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    `, "onboarding-screen");

    // Eventos do onboarding
    const nameInput = document.getElementById("name-input");
    const btnStart = document.getElementById("btn-start");
    const avatarInput = document.getElementById("avatar-input");
    const avatarPreview = document.getElementById("avatar-preview");
    const avatarPlaceholder = document.getElementById("avatar-placeholder");

    nameInput.addEventListener("input", () => {
      const valido = nameInput.value.trim().length >= 2;
      btnStart.disabled = !valido;
      if (valido && !avatarInput.files?.length) {
        avatarPlaceholder.textContent = nameInput.value.trim().charAt(0).toUpperCase();
      }
    });

    avatarInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        avatarPreview.innerHTML = `<img src="${ev.target.result}" alt="avatar">`;
        avatarPreview._avatarDataURL = ev.target.result;
      };
      reader.readAsDataURL(file);
    });

    btnStart.addEventListener("click", () => {
      const nome = nameInput.value.trim();
      const avatar = avatarPreview._avatarDataURL || "";
      GameEngine.definirJogador(nome, avatar);
      renderMapaMundos();
    });

    // Foco automático
    setTimeout(() => nameInput.focus(), 300);
  }

  // ── Mapa dos Mundos ───────────────────────────────────
  function renderMapaMundos() {
    const est = GameEngine.getEstado();

    const mundosHTML = MUNDOS.map(mundo => {
      const desbloqueado = GameEngine.estaDesbloqueado(mundo.id);
      const concluido = est.worldsCompleted.includes(mundo.id);
      const classe = desbloqueado ? (concluido ? "world-card concluido" : "world-card desbloqueado") : "world-card bloqueado";

      return `
        <div class="${classe}" data-mundo="${mundo.id}"
          style="--world-color: ${mundo.cor}; --world-dark: ${mundo.corEscura}">
          <div class="world-glow"></div>
          <div class="world-emoji">${mundo.emoji}</div>
          <div class="world-info">
            <h3 class="world-name">${mundo.nome}</h3>
            <p class="world-desc">${mundo.descricao}</p>
          </div>
          <div class="world-status">
            ${concluido ? '<span class="badge-concluido">✅ Concluído</span>' :
              desbloqueado ? '<span class="badge-jogar">▶ Jogar!</span>' :
              '<span class="badge-bloqueado">🔒 Bloqueado</span>'}
          </div>
          ${!desbloqueado ? '<div class="world-overlay"><span>🔒</span></div>' : ""}
        </div>
      `;
    }).join("");

    mostrarEcra(`
      <div class="mapa-container">
        <div class="mapa-header">
          <h2 class="mapa-title">🗺️ Mapa das Aventuras</h2>
          <p class="mapa-subtitle">Escolhe o mundo que queres explorar, ${est.playerName}!</p>
        </div>
        <div class="mundos-grid">${mundosHTML}</div>
      </div>
    `, "mapa-screen");

    // Cliques nos mundos
    document.querySelectorAll(".world-card.desbloqueado, .world-card.concluido").forEach(card => {
      card.addEventListener("click", () => {
        const mundoId = parseInt(card.dataset.mundo);
        renderCheckpoints(mundoId);
      });
    });
  }

  // ── Checkpoints do mundo ──────────────────────────────
  function renderCheckpoints(mundoId) {
    const mundo = MUNDOS.find(m => m.id === mundoId);
    const est = GameEngine.getEstado();

    const checkpoints = Array.from({ length: mundo.totalCheckpoints }, (_, i) => {
      const cpId = i + 1;
      const concluido = GameEngine.checkpointConcluido(mundoId, cpId);
      const disponivel = cpId === 1 || GameEngine.checkpointConcluido(mundoId, cpId - 1);

      return `
        <div class="checkpoint-node ${concluido ? "cp-done" : disponivel ? "cp-available" : "cp-locked"}"
          data-cp="${cpId}"
          style="--world-color: ${mundo.cor}; --world-dark: ${mundo.corEscura}">
          <div class="cp-icon">
            ${concluido ? "✅" : disponivel ? mundo.emoji : "🔒"}
          </div>
          <div class="cp-label">Nível ${cpId}</div>
          ${disponivel && !concluido ? '<div class="cp-pulse"></div>' : ""}
        </div>
        ${i < mundo.totalCheckpoints - 1 ?
          `<div class="cp-path ${GameEngine.checkpointConcluido(mundoId, cpId) ? "path-done" : ""}"></div>` : ""}
      `;
    }).join("");

    mostrarEcra(`
      <div class="checkpoints-container">
        <button class="btn-back" id="btn-back">← Voltar ao Mapa</button>
        <div class="cp-world-header" style="--world-color: ${mundo.cor}">
          <span class="cp-world-emoji">${mundo.emoji}</span>
          <div>
            <h2>${mundo.nome}</h2>
            <p>${mundo.descricao}</p>
          </div>
        </div>
        <div class="checkpoints-path">
          <div class="path-line" style="--world-color: ${mundo.cor}"></div>
          <div class="checkpoints-nodes">${checkpoints}</div>
        </div>
      </div>
    `, "checkpoints-screen");

    document.getElementById("btn-back").addEventListener("click", renderMapaMundos);

    document.querySelectorAll(".checkpoint-node.cp-available, .checkpoint-node.cp-done").forEach(node => {
      node.addEventListener("click", () => {
        const cpId = parseInt(node.dataset.cp);
        iniciarJogo(mundoId, cpId);
      });
    });
  }

  // ── Ecrã de Jogo ──────────────────────────────────────
  function iniciarJogo(mundoId, checkpointId) {
    GameEngine.iniciarFase(mundoId, checkpointId);
    renderQuestao();
  }

  function renderQuestao() {
    const questao = GameEngine.getQuestaoAtual();
    const est = GameEngine.getEstado();
    const mundo = GameEngine.getMundoAtual();

    if (!questao) {
      renderFaseConcluida();
      return;
    }

    const total = GameEngine.getTotalQuestoes();
    const atual = est.currentQuestionIndex + 1;
    const progresso = (est.currentQuestionIndex / total) * 100;

    const opcoesHTML = questao.options.map((op, i) => `
      <button class="opcao-btn" data-resposta="${op}" data-index="${i}">
        <span class="opcao-letra">${String.fromCharCode(65 + i)}</span>
        <span class="opcao-texto">${op}</span>
      </button>
    `).join("");

    mostrarEcra(`
      <div class="jogo-container" style="--world-color: ${mundo.cor}; --world-dark: ${mundo.corEscura}">
        <div class="jogo-header">
          <button class="btn-back-small" id="btn-exit">✕ Sair</button>
          <div class="jogo-progress-wrap">
            <div class="jogo-progress-bar">
              <div class="jogo-progress-fill" style="width: ${progresso}%"></div>
            </div>
            <span class="jogo-progress-label">${atual} / ${total}</span>
          </div>
          <div class="jogo-mundo-badge">${mundo.emoji} ${mundo.nome}</div>
        </div>

        <div class="jogo-body">
          <div class="questao-card">
            <div class="questao-numero">Pergunta ${atual}</div>
            <p class="questao-texto">${questao.question}</p>
          </div>

          <div class="opcoes-grid" id="opcoes-grid">
            ${opcoesHTML}
          </div>
        </div>
      </div>
    `, "jogo-screen");

    document.getElementById("btn-exit").addEventListener("click", () => {
      renderCheckpoints(est.currentWorld);
    });

    document.querySelectorAll(".opcao-btn").forEach(btn => {
      btn.addEventListener("click", () => processarResposta(btn.dataset.resposta));
    });
  }

  function processarResposta(resposta) {
    // Desativa botões enquanto processa
    document.querySelectorAll(".opcao-btn").forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.resposta === resposta) btn.classList.add("selecionada");
    });

    setTimeout(() => {
      const resultado = GameEngine.responder(resposta);
      if (!resultado) return;

      if (resultado.correto) {
        mostrarFeedbackSucesso(resultado, () => {
          if (resultado.faseConcluida) {
            renderFaseConcluida();
          } else {
            renderQuestao();
          }
        });
      } else {
        if (resultado.semVidas) {
          mostrarSemVidas();
        } else {
          mostrarModalErro(resultado.questao, () => renderQuestao());
        }
      }
    }, 300);
  }

  // ── Feedback de Sucesso ────────────────────────────────
  function mostrarFeedbackSucesso(resultado, callback) {
    // Animar ⭐ no HUD
    const hudStars = document.getElementById("hud-stars");
    if (hudStars) {
      hudStars.textContent = GameEngine.getEstado().stars;
      hudStars.classList.add("star-pop");
      setTimeout(() => hudStars.classList.remove("star-pop"), 600);
    }

    // Overlay de sucesso
    const overlay = document.createElement("div");
    overlay.className = "feedback-overlay sucesso";
    overlay.innerHTML = `
      <div class="feedback-content">
        <div class="feedback-stars">
          ${["⭐", "✨", "🌟"].map((s, i) => `<span class="star-anim" style="animation-delay:${i * 0.15}s">${s}</span>`).join("")}
        </div>
        <p class="feedback-msg">${resultado.mensagem}</p>
      </div>
    `;
    document.body.appendChild(overlay);
    atualizarHUD();

    setTimeout(() => {
      overlay.classList.add("fade-out");
      setTimeout(() => { overlay.remove(); callback(); }, 400);
    }, 1600);
  }

  // ── Modal de Erro / Conhecimento ──────────────────────
  function mostrarModalErro(questao, callback) {
    atualizarHUD();

    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-card modal-erro">
        <div class="modal-icon">💡</div>
        <h3 class="modal-titulo">Quase lá!</h3>
        <div class="modal-explicacao">
          <strong>O que precisas saber:</strong>
          <p>${questao.explanation}</p>
        </div>
        <div class="modal-dica">
          <span class="dica-icon">🎯</span>
          <p><strong>Dica:</strong> ${questao.hint}</p>
        </div>
        <button class="btn-primary btn-tentar" id="btn-tentar">
          Tentar novamente →
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    // Animação de entrada
    requestAnimationFrame(() => modal.querySelector(".modal-card").classList.add("modal-enter"));

    document.getElementById("btn-tentar").addEventListener("click", () => {
      modal.classList.add("fade-out");
      setTimeout(() => { modal.remove(); callback(); }, 300);
    });
  }

  // ── Sem Vidas ─────────────────────────────────────────
  function mostrarSemVidas() {
    const est = GameEngine.getEstado();
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-card modal-vidas">
        <div class="modal-icon">🌟</div>
        <h3 class="modal-titulo">Não desistas, ${est.playerName}!</h3>
        <p class="modal-texto">Todos os heróis aprendem com os seus erros.<br>Tenta de novo e vai conseguir!</p>
        <button class="btn-primary btn-tentar" id="btn-retry">
          ❤️ Recomeçar fase
        </button>
        <button class="btn-secondary" id="btn-mapa-vidas">
          🗺️ Voltar ao mapa
        </button>
      </div>
    `;
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.querySelector(".modal-card").classList.add("modal-enter"));
    atualizarHUD();

    document.getElementById("btn-retry").addEventListener("click", () => {
      modal.remove();
      GameEngine.reiniciarVidas();
      iniciarJogo(est.currentWorld, est.currentCheckpoint);
    });
    document.getElementById("btn-mapa-vidas").addEventListener("click", () => {
      modal.remove();
      GameEngine.reiniciarVidas();
      renderMapaMundos();
    });
  }

  // ── Fase Concluída ────────────────────────────────────
  function renderFaseConcluida() {
    const est = GameEngine.getEstado();
    const mundo = GameEngine.getMundoAtual();
    const mundoConcluido = est.worldsCompleted.includes(est.currentWorld);

    mostrarEcra(`
      <div class="concluido-container" style="--world-color: ${mundo.cor}; --world-dark: ${mundo.corEscura}">
        <div class="confetti-wrap" id="confetti"></div>
        <div class="concluido-card">
          <div class="concluido-emoji">${mundoConcluido ? "🏆" : "⭐"}</div>
          <h2 class="concluido-titulo">
            ${mundoConcluido ? "Mundo Concluído!" : "Nível Concluído!"}
          </h2>
          <p class="concluido-msg">
            ${mundoConcluido
              ? `Parabéns, ${est.playerName}! Completaste <b>${mundo.nome}</b>!`
              : `Muito bem, ${est.playerName}! Nível ${est.currentCheckpoint} superado!`}
          </p>
          <div class="concluido-estrelas">
            <span class="big-star s1">⭐</span>
            <span class="big-star s2">⭐</span>
            <span class="big-star s3">⭐</span>
          </div>
          <div class="concluido-btns">
            ${!mundoConcluido && est.currentCheckpoint < mundo.totalCheckpoints ? `
              <button class="btn-primary" id="btn-proximo">
                ▶ Próximo Nível
              </button>
            ` : ""}
            <button class="btn-secondary" id="btn-mapa-concluido">
              🗺️ Voltar ao Mapa
            </button>
          </div>
        </div>
      </div>
    `, "concluido-screen");

    lancarConfetti();
    atualizarHUD();

    document.getElementById("btn-mapa-concluido")?.addEventListener("click", renderMapaMundos);
    document.getElementById("btn-proximo")?.addEventListener("click", () => {
      iniciarJogo(est.currentWorld, est.currentCheckpoint + 1);
    });
  }

  // ── Confetti simples ──────────────────────────────────
  function lancarConfetti() {
    const container = document.getElementById("confetti");
    if (!container) return;
    const emojis = ["⭐", "🎉", "✨", "🌟", "💫", "🎊"];
    for (let i = 0; i < 30; i++) {
      const el = document.createElement("span");
      el.className = "confetti-piece";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = Math.random() * 100 + "%";
      el.style.animationDuration = (1.5 + Math.random() * 2) + "s";
      el.style.animationDelay = Math.random() * 1.5 + "s";
      el.style.fontSize = (16 + Math.random() * 20) + "px";
      container.appendChild(el);
    }
  }

  // API pública da UI
  return {
    renderOnboarding,
    renderMapaMundos,
    renderCheckpoints,
    atualizarHUD
  };

})();
