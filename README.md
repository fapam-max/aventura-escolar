# 🌍 Aventura Escolar — 4.º Ano

> Jogo educativo SPA para alunos do 4.º ano do ensino básico em Portugal.  
> Cobre Português, Matemática e Estudo do Meio — Aprendizagens Essenciais.

---

## 🚀 Como usar

### Opção 1 — Abrir localmente
Basta abrir `index.html` diretamente no browser. Não é necessário nenhum servidor.

### Opção 2 — GitHub Pages
1. Faz upload de todos os ficheiros para um repositório público no GitHub.
2. Em **Settings → Pages**, define a `branch main` e a pasta `/ (root)` como source.
3. Acede ao URL gerado (ex: `https://SEU_USER.github.io/aventura-escolar/`).

---

## 📁 Estrutura do Projeto

```
aventura-escolar/
├── index.html          ← Ponto de entrada da SPA
├── css/
│   └── style.css       ← Todos os estilos (paleta pastel, animações, responsivo)
├── js/
│   ├── data.js         ← 🗂️ BANCO DE QUESTÕES — edita aqui!
│   ├── engine.js       ← ⚙️ Motor do jogo (lógica pura, sem DOM)
│   ├── ui.js           ← 🖼️ Módulo de UI (renderização e eventos)
│   └── app.js          ← 🚀 Inicialização da aplicação
└── README.md
```

---

## ✏️ Como Adicionar Questões

Abre `js/data.js` e adiciona um novo objeto ao array `QUESTOES`:

```js
{
  id: "port_07",           // ID único
  subject: "portugues",    // "portugues" | "matematica" | "estudo_meio"
  world: 1,                // 1 = Português | 2 = Matemática | 3 = Estudo do Meio
  checkpoint: 1,           // 1, 2 ou 3 (nível dentro do mundo)
  type: "multiple_choice", // por agora apenas multiple_choice é suportado
  question: "Qual é o antónimo de «alegre»?",
  options: ["triste", "contente", "feliz", "animado"],
  answer: "triste",        // tem que coincidir exatamente com uma das opções
  explanation: "Antónimos são palavras com significado oposto.",
  hint: "Pensa no contrário de estar feliz..."
}
```

---

## ⚙️ Mecânicas do Jogo

| Elemento | Comportamento |
|---|---|
| **Vidas** | 3 por fase; repõem ao iniciar uma nova fase |
| **Estrelas** | +1 por resposta correta; acumulam globalmente |
| **Progresso** | Guardado em `localStorage` automaticamente |
| **Mundos** | Desbloqueados sequencialmente ao completar o anterior |
| **Feedback de erro** | Modal positivo com explicação + dica (sem sons negativos) |

---

## 🎨 Tecnologias

- **HTML5 + CSS3** (Flexbox / Grid / CSS Variables)
- **Vanilla JavaScript ES6+** (módulos IIFE)
- **Google Fonts** — Lexend (body) + Fredoka One (display)
- **localStorage** para persistência de progresso
- Zero dependências externas — funciona offline!

---

## 🏫 Alinhamento Curricular (Aprendizagens Essenciais)

| Mundo | Matéria | Conteúdos abordados |
|---|---|---|
| 📖 Ilha das Palavras | Português | Plural irregular, análise sintática, pontuação, classes de palavras, prefixos, sinónimos |
| 🔢 Planeta dos Números | Matemática | Frações equivalentes, multiplicação, área, ordenação de frações, perímetro, fração de uma quantidade |
| 🔬 Laboratório do Mundo | Estudo do Meio | Sistema circulatório, geografia de Portugal, fotossíntese, classificação de animais, história de Portugal, estados físicos da água |

---

## 🛠️ Desenvolvimento

Para testar o reset do progresso, abre a consola do browser e executa:
```js
resetJogo()
```

---

*Feito com ❤️ para alunos curiosos do 4.º ano!*
