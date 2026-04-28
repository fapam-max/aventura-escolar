// =============================================================
// MOTOR DO JOGO — Lógica central da aplicação
// Separação de responsabilidades: apenas lógica, sem HTML
// =============================================================

const GameEngine = (() => {

  // ── Estado inicial do jogo ──────────────────────────────
  const ESTADO_INICIAL = {
    playerName: "",
    avatarURL: "",
    currentWorld: null,
    currentCheckpoint: null,
    currentQuestionIndex: 0,
    stars: 0,
    lives: 3,
    maxLives: 3,
    worldsCompleted: [],   // IDs dos mundos concluídos
    checkpointsCompleted: {} // { "1_1": true, "1_2": true, ... }
  };

  let estado = { ...ESTADO_INICIAL };

  // ── Persistência em LocalStorage ───────────────────────
  const CHAVE_STORAGE = "aventura_escolar_estado";

  function guardarEstado() {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(estado));
  }

  function carregarEstado() {
    const guardado = localStorage.getItem(CHAVE_STORAGE);
    if (guardado) {
      try {
        const dados = JSON.parse(guardado);
        estado = { ...ESTADO_INICIAL, ...dados };
        return true;
      } catch (e) {
        console.warn("Erro ao carregar estado:", e);
        return false;
      }
    }
    return false;
  }

  function limparEstado() {
    localStorage.removeItem(CHAVE_STORAGE);
    estado = { ...ESTADO_INICIAL };
  }

  // ── Getters do estado ──────────────────────────────────
  function getEstado() { return { ...estado }; }

  function getMundoAtual() {
    return MUNDOS.find(m => m.id === estado.currentWorld) || null;
  }

  function estaDesbloqueado(mundoId) {
    const mundo = MUNDOS.find(m => m.id === mundoId);
    if (!mundo) return false;
    if (!mundo.desbloqueadoPor) return true; // Mundo 1 sempre desbloqueado
    return estado.worldsCompleted.includes(mundo.desbloqueadoPor);
  }

  function checkpointConcluido(mundoId, checkpointId) {
    const chave = `${mundoId}_${checkpointId}`;
    return estado.checkpointsCompleted[chave] === true;
  }

  // ── Questões do checkpoint atual ───────────────────────
  function getQuestoesDaFase(mundoId, checkpointId) {
    return QUESTOES.filter(
      q => q.world === mundoId && q.checkpoint === checkpointId
    );
  }

  function getQuestaoAtual() {
    const questoes = getQuestoesDaFase(estado.currentWorld, estado.currentCheckpoint);
    return questoes[estado.currentQuestionIndex] || null;
  }

  function getTotalQuestoes() {
    return getQuestoesDaFase(estado.currentWorld, estado.currentCheckpoint).length;
  }

  // ── Ações do jogador ──────────────────────────────────

  function definirJogador(nome, avatarURL) {
    estado.playerName = nome.trim();
    estado.avatarURL = avatarURL || "";
    guardarEstado();
  }

  function iniciarFase(mundoId, checkpointId) {
    estado.currentWorld = mundoId;
    estado.currentCheckpoint = checkpointId;
    estado.currentQuestionIndex = 0;
    estado.lives = estado.maxLives; // repõe vidas ao iniciar uma fase
    guardarEstado();
  }

  // Processa a resposta do jogador — retorna objeto com resultado
  function responder(respostaJogador) {
    const questao = getQuestaoAtual();
    if (!questao) return null;

    const correto = respostaJogador === questao.answer;

    if (correto) {
      // ✅ Resposta certa: avança e dá estrela
      estado.stars += 1;
      estado.currentQuestionIndex += 1;

      const questoes = getQuestoesDaFase(estado.currentWorld, estado.currentCheckpoint);
      const faseConcluida = estado.currentQuestionIndex >= questoes.length;

      if (faseConcluida) {
        // Marca o checkpoint como concluído
        const chave = `${estado.currentWorld}_${estado.currentCheckpoint}`;
        estado.checkpointsCompleted[chave] = true;

        // Verifica se o mundo inteiro foi concluído
        const mundo = getMundoAtual();
        const todosConcluidos = Array.from(
          { length: mundo.totalCheckpoints },
          (_, i) => `${mundo.id}_${i + 1}`
        ).every(k => estado.checkpointsCompleted[k]);

        if (todosConcluidos && !estado.worldsCompleted.includes(mundo.id)) {
          estado.worldsCompleted.push(mundo.id);
        }
      }

      guardarEstado();
      return {
        correto: true,
        faseConcluida,
        mensagem: getMensagemSucesso(),
        questao
      };
    } else {
      // ❌ Resposta errada: perde uma vida
      estado.lives = Math.max(0, estado.lives - 1);
      const semVidas = estado.lives === 0;
      guardarEstado();
      return {
        correto: false,
        semVidas,
        questao
      };
    }
  }

  function reiniciarVidas() {
    estado.lives = estado.maxLives;
    guardarEstado();
  }

  // ── Utilitários ────────────────────────────────────────

  function getMensagemSucesso() {
    const msgs = MENSAGENS_SUCESSO;
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    return msg.replace("{nome}", estado.playerName || "Campeão");
  }

  // Exporta a API pública do motor
  return {
    carregarEstado,
    guardarEstado,
    limparEstado,
    getEstado,
    getMundoAtual,
    estaDesbloqueado,
    checkpointConcluido,
    getQuestoesDaFase,
    getQuestaoAtual,
    getTotalQuestoes,
    definirJogador,
    iniciarFase,
    responder,
    reiniciarVidas
  };

})();
