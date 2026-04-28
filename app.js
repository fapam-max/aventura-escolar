// =============================================================
// APP.JS — Ponto de entrada da aplicação
// Inicializa o jogo e decide qual ecrã mostrar primeiro
// =============================================================

document.addEventListener("DOMContentLoaded", () => {

  // Pequena pausa para garantir que o CSS foi aplicado
  setTimeout(() => {

    // Tenta carregar um estado guardado anteriormente
    const temEstadoGuardado = GameEngine.carregarEstado();
    const estado = GameEngine.getEstado();

    if (temEstadoGuardado && estado.playerName) {
      // Jogador já registado → vai direto para o mapa
      UI.atualizarHUD();
      UI.renderMapaMundos();
    } else {
      // Primeira vez → mostra o onboarding
      UI.renderOnboarding();
    }

  }, 150);

});

// =============================================================
// Para reiniciar o jogo (útil para testes ou botão de reset)
// Podes chamar resetJogo() na consola do browser
// =============================================================
function resetJogo() {
  if (confirm("Tens a certeza que queres apagar todo o progresso?")) {
    GameEngine.limparEstado();
    location.reload();
  }
}
