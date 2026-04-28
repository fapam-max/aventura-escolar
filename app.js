// =============================================================
// APP.JS — Ponto de entrada da aplicação
// =============================================================

window.addEventListener("error", (e) => {
  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = `
      <div style="padding:40px;text-align:center;font-family:sans-serif;max-width:500px;margin:0 auto">
        <div style="font-size:48px;margin-bottom:16px">⚠️</div>
        <h2 style="color:#c0392b;margin-bottom:12px">Erro ao carregar</h2>
        <p style="color:#555;margin-bottom:8px">Ficheiro: <code>${e.filename ? e.filename.split('/').pop() : 'desconhecido'}</code></p>
        <p style="color:#555;margin-bottom:24px">Erro: <code>${e.message}</code></p>
        <p style="color:#777;font-size:14px">Verifica se todos os ficheiros (css/ e js/) estão na raiz do repositório no GitHub.</p>
      </div>`;
  }
});

document.addEventListener("DOMContentLoaded", () => {

  if (typeof GameEngine === "undefined") {
    document.getElementById("app").innerHTML = `
      <div style="padding:40px;text-align:center;font-family:sans-serif">
        <div style="font-size:48px">❌</div>
        <h2 style="color:#c0392b">engine.js não carregou</h2>
        <p style="color:#555">Verifica se a pasta <strong>js/</strong> está na raiz do repositório GitHub.</p>
        <p style="color:#777;font-size:13px;margin-top:12px">O repositório deve ter: index.html, css/, js/ — todos na raiz.</p>
      </div>`;
    return;
  }

  if (typeof UI === "undefined") {
    document.getElementById("app").innerHTML = `
      <div style="padding:40px;text-align:center;font-family:sans-serif">
        <div style="font-size:48px">❌</div>
        <h2 style="color:#c0392b">ui.js não carregou</h2>
        <p style="color:#555">Verifica se a pasta <strong>js/</strong> está na raiz do repositório GitHub.</p>
      </div>`;
    return;
  }

  setTimeout(() => {
    try {
      const temEstadoGuardado = GameEngine.carregarEstado();
      const estado = GameEngine.getEstado();
      if (temEstadoGuardado && estado.playerName) {
        UI.atualizarHUD();
        UI.renderMapaMundos();
      } else {
        UI.renderOnboarding();
      }
    } catch (err) {
      console.error("Erro ao iniciar:", err);
      document.getElementById("app").innerHTML = `
        <div style="padding:40px;text-align:center;font-family:sans-serif">
          <div style="font-size:48px">🔧</div>
          <h2 style="color:#c0392b">Erro ao iniciar o jogo</h2>
          <p style="color:#555">${err.message}</p>
          <button onclick="localStorage.clear();location.reload()"
            style="margin-top:16px;padding:10px 24px;background:#3498db;color:white;border:none;border-radius:8px;cursor:pointer;font-size:16px">
            Limpar dados e tentar novamente
          </button>
        </div>`;
    }
  }, 150);

});

function resetJogo() {
  if (confirm("Tens a certeza que queres apagar todo o progresso?")) {
    GameEngine.limparEstado();
    location.reload();
  }
}
