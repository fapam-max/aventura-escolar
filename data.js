// =============================================================
// BANCO DE QUESTÕES — Adiciona ou edita perguntas aqui!
// Cada objeto segue o esquema definido no README.
// =============================================================

const QUESTOES = [

  // ─────────────────────────────────────────────────────────
  // MUNDO 1 — "Ilha das Palavras" (Português)
  // ─────────────────────────────────────────────────────────

  {
    id: "port_01",
    subject: "portugues",
    world: 1,
    checkpoint: 1,
    type: "multiple_choice",
    question: "Qual é o plural correto da palavra <b>«chapéu»</b>?",
    options: ["chapéus", "chapéues", "chapeus", "chapéi"],
    answer: "chapéus",
    explanation: "Palavras terminadas em <b>-éu</b> formam o plural acrescentando <b>-s</b>: chapéu → chapéus.",
    hint: "Pensa em outras palavras parecidas: «réu» → «réus». Só acrescenta o -s!"
  },
  {
    id: "port_02",
    subject: "portugues",
    world: 1,
    checkpoint: 1,
    type: "multiple_choice",
    question: "Numa frase, o <b>sujeito</b> é:",
    options: [
      "quem realiza ou sofre a ação do verbo",
      "a ação que acontece na frase",
      "o local onde decorre a ação",
      "a palavra que descreve o nome"
    ],
    answer: "quem realiza ou sofre a ação do verbo",
    explanation: "O <b>sujeito</b> é o ser (pessoa, animal ou coisa) sobre o qual o predicado diz algo — pode praticar ou sofrer a ação.",
    hint: "Pergunta «Quem é que…?» antes do verbo para encontrar o sujeito."
  },
  {
    id: "port_03",
    subject: "portugues",
    world: 1,
    checkpoint: 2,
    type: "multiple_choice",
    question: "Escolhe a frase com a pontuação <b>correta</b>:",
    options: [
      "O João foi à escola, mas esqueceu o livro.",
      "O João foi à escola mas, esqueceu o livro.",
      "O João foi à escola mas esqueceu, o livro.",
      "O João, foi à escola mas esqueceu o livro."
    ],
    answer: "O João foi à escola, mas esqueceu o livro.",
    explanation: "A vírgula coloca-se <b>antes</b> das conjunções adversativas como <b>«mas»</b>, para separar as orações.",
    hint: "A vírgula vem sempre antes do «mas» quando liga duas ideias diferentes."
  },
  {
    id: "port_04",
    subject: "portugues",
    world: 1,
    checkpoint: 2,
    type: "multiple_choice",
    question: "Qual destas palavras é um <b>adjetivo</b>?",
    options: ["veloz", "correr", "rapidamente", "felicidade"],
    answer: "veloz",
    explanation: "O <b>adjetivo</b> qualifica ou caracteriza um nome. «Veloz» descreve como algo é (ex.: o carro veloz).",
    hint: "O adjetivo responde à pergunta «Como é?» referindo-se a um nome."
  },
  {
    id: "port_05",
    subject: "portugues",
    world: 1,
    checkpoint: 3,
    type: "multiple_choice",
    question: "A palavra <b>«infeliz»</b> tem o prefixo <b>in-</b>. O que significa esse prefixo?",
    options: ["negação / contrário", "repetição", "tamanho grande", "dentro de"],
    answer: "negação / contrário",
    explanation: "O prefixo <b>in-</b> indica negação ou ideia contrária: feliz → infeliz; capaz → incapaz.",
    hint: "Pensa em «incrível» ou «impossível» — o que têm em comum?"
  },
  {
    id: "port_06",
    subject: "portugues",
    world: 1,
    checkpoint: 3,
    type: "multiple_choice",
    question: "Qual é o <b>sinónimo</b> de «alegre»?",
    options: ["contente", "triste", "cansado", "zangado"],
    answer: "contente",
    explanation: "<b>Sinónimos</b> são palavras com significado igual ou parecido. «Alegre» e «contente» expressam a mesma emoção positiva.",
    hint: "Sinónimos têm significados parecidos — pensa em como te sentes num dia feliz!"
  },

  // ─────────────────────────────────────────────────────────
  // MUNDO 2 — "Planeta dos Números" (Matemática)
  // ─────────────────────────────────────────────────────────

  {
    id: "mat_01",
    subject: "matematica",
    world: 2,
    checkpoint: 1,
    type: "multiple_choice",
    question: "Qual é a fração equivalente a <b>1/2</b>?",
    options: ["2/4", "1/3", "2/5", "4/10"],
    answer: "2/4",
    explanation: "<b>Frações equivalentes</b> representam a mesma parte do todo. 1/2 = 2/4 porque multiplicamos numerador e denominador por 2.",
    hint: "Multiplica o numerador e o denominador pelo mesmo número!"
  },
  {
    id: "mat_02",
    subject: "matematica",
    world: 2,
    checkpoint: 1,
    type: "multiple_choice",
    question: "Quanto é <b>345 × 6</b>?",
    options: ["2070", "2007", "2170", "1980"],
    answer: "2070",
    explanation: "345 × 6: primeiro 5×6=30 (escreve 0, transporta 3), depois 4×6=24+3=27 (escreve 7, transporta 2), depois 3×6=18+2=20. Resultado: <b>2070</b>.",
    hint: "Multiplica cada algarismo de direita para a esquerda e não te esqueças de transportar!"
  },
  {
    id: "mat_03",
    subject: "matematica",
    world: 2,
    checkpoint: 2,
    type: "multiple_choice",
    question: "Um retângulo tem 8 cm de comprimento e 5 cm de largura. Qual é a sua <b>área</b>?",
    options: ["40 cm²", "26 cm", "13 cm²", "40 cm"],
    answer: "40 cm²",
    explanation: "A <b>área do retângulo</b> calcula-se multiplicando comprimento × largura: 8 × 5 = <b>40 cm²</b>.",
    hint: "Área = comprimento × largura. Não te esqueças da unidade quadrada (cm²)!"
  },
  {
    id: "mat_04",
    subject: "matematica",
    world: 2,
    checkpoint: 2,
    type: "multiple_choice",
    question: "Ordena do <b>menor para o maior</b>: 3/4 · 1/2 · 7/8 · 1/4",
    options: ["1/4 · 1/2 · 3/4 · 7/8", "7/8 · 3/4 · 1/2 · 1/4", "1/2 · 1/4 · 3/4 · 7/8", "3/4 · 7/8 · 1/4 · 1/2"],
    answer: "1/4 · 1/2 · 3/4 · 7/8",
    explanation: "Com o mesmo denominador (8): 2/8 · 4/8 · 6/8 · 7/8. Ordena pelos numeradores: 2 < 4 < 6 < 7, logo <b>1/4 < 1/2 < 3/4 < 7/8</b>.",
    hint: "Converte todas as frações para o mesmo denominador e compara os numeradores!"
  },
  {
    id: "mat_05",
    subject: "matematica",
    world: 2,
    checkpoint: 3,
    type: "multiple_choice",
    question: "Qual é o <b>perímetro</b> de um quadrado com 7 cm de lado?",
    options: ["28 cm", "49 cm²", "14 cm", "21 cm"],
    answer: "28 cm",
    explanation: "O <b>perímetro do quadrado</b> é a soma dos 4 lados iguais: 7 + 7 + 7 + 7 = 4 × 7 = <b>28 cm</b>.",
    hint: "Perímetro = soma de todos os lados. O quadrado tem 4 lados iguais!"
  },
  {
    id: "mat_06",
    subject: "matematica",
    world: 2,
    checkpoint: 3,
    type: "multiple_choice",
    question: "Numa turma há 24 alunos. <b>1/3</b> deles têm cabelo loiro. Quantos alunos têm cabelo loiro?",
    options: ["8", "6", "12", "3"],
    answer: "8",
    explanation: "Para calcular <b>1/3 de 24</b>, divide-se 24 ÷ 3 = <b>8 alunos</b>.",
    hint: "«1/3 de» significa dividir por 3. Divide o total de alunos por 3!"
  },

  // ─────────────────────────────────────────────────────────
  // MUNDO 3 — "Laboratório do Mundo" (Estudo do Meio)
  // ─────────────────────────────────────────────────────────

  {
    id: "em_01",
    subject: "estudo_meio",
    world: 3,
    checkpoint: 1,
    type: "multiple_choice",
    question: "Qual é o órgão responsável pela <b>circulação do sangue</b> no corpo humano?",
    options: ["coração", "pulmões", "estômago", "fígado"],
    answer: "coração",
    explanation: "O <b>coração</b> é o motor do sistema circulatório — bate cerca de 70 vezes por minuto e bombeia o sangue para todo o corpo.",
    hint: "Coloca a mão no peito e sente as batidas — esse órgão é o responsável!"
  },
  {
    id: "em_02",
    subject: "estudo_meio",
    world: 3,
    checkpoint: 1,
    type: "multiple_choice",
    question: "Portugal faz fronteira terrestre com:",
    options: ["Espanha", "França", "Marrocos", "Brasil"],
    answer: "Espanha",
    explanation: "Portugal faz fronteira terrestre apenas com a <b>Espanha</b>, a norte e a leste. A oeste e a sul, é banhado pelo Oceano Atlântico.",
    hint: "Olha para um mapa de Portugal — qual é o país que partilha a mesma Península?"
  },
  {
    id: "em_03",
    subject: "estudo_meio",
    world: 3,
    checkpoint: 2,
    type: "multiple_choice",
    question: "O processo pelo qual as plantas produzem alimento usando a luz solar chama-se:",
    options: ["fotossíntese", "respiração", "digestão", "evaporação"],
    answer: "fotossíntese",
    explanation: "A <b>fotossíntese</b> é o processo em que as plantas usam luz solar, água e dióxido de carbono (CO₂) para produzir açúcar e libertar oxigénio.",
    hint: "«Foto» vem do grego e significa «luz». A planta usa a luz para sintetizar alimento!"
  },
  {
    id: "em_04",
    subject: "estudo_meio",
    world: 3,
    checkpoint: 2,
    type: "multiple_choice",
    question: "Qual destes animais é um <b>mamífero</b>?",
    options: ["golfinho", "crocodilo", "serpente", "sapo"],
    answer: "golfinho",
    explanation: "Os <b>mamíferos</b> têm sangue quente, respiram por pulmões, têm pelo (ou vestígios) e amamentam as crias. O golfinho é um mamífero aquático.",
    hint: "Os mamíferos amamentam as suas crias — esse é um traço distintivo importante!"
  },
  {
    id: "em_05",
    subject: "estudo_meio",
    world: 3,
    checkpoint: 3,
    type: "multiple_choice",
    question: "D. Afonso Henriques é conhecido como:",
    options: [
      "o primeiro rei de Portugal",
      "o descobridor do Brasil",
      "o fundador de Lisboa",
      "o último rei de Portugal"
    ],
    answer: "o primeiro rei de Portugal",
    explanation: "<b>D. Afonso Henriques</b> foi o primeiro rei de Portugal, tendo conquistado a independência do reino em 1143 com o Tratado de Zamora.",
    hint: "Portugal nasceu no século XII — quem foi o herói que lutou pela independência?"
  },
  {
    id: "em_06",
    subject: "estudo_meio",
    world: 3,
    checkpoint: 3,
    type: "multiple_choice",
    question: "Qual é o estado da água quando está a <b>100°C</b> ao nível do mar?",
    options: ["vapor (gasoso)", "líquido", "sólido (gelo)", "plasma"],
    answer: "vapor (gasoso)",
    explanation: "A <b>100°C</b>, ao nível do mar, a água atinge o ponto de ebulição e transforma-se em <b>vapor</b> — passa do estado líquido ao estado gasoso.",
    hint: "O que acontece quando fervemos água numa panela? O que sobe para o ar?"
  }
];

// =============================================================
// CONFIGURAÇÃO DOS MUNDOS — Edita títulos, ícones e cores aqui
// =============================================================
const MUNDOS = [
  {
    id: 1,
    nome: "Ilha das Palavras",
    materia: "portugues",
    emoji: "📖",
    cor: "#7EC8A4",
    corEscura: "#4A9970",
    descricao: "Mergulha no mundo das letras, palavras e histórias!",
    totalCheckpoints: 3,
    desbloqueadoPor: null // sempre desbloqueado
  },
  {
    id: 2,
    nome: "Planeta dos Números",
    materia: "matematica",
    emoji: "🔢",
    cor: "#7EB8E8",
    corEscura: "#3A7FBF",
    descricao: "Explora o universo dos números e das formas!",
    totalCheckpoints: 3,
    desbloqueadoPor: 1
  },
  {
    id: 3,
    nome: "Laboratório do Mundo",
    materia: "estudo_meio",
    emoji: "🔬",
    cor: "#F4A261",
    corEscura: "#C76B2F",
    descricao: "Descobre a natureza, o corpo humano e a história!",
    totalCheckpoints: 3,
    desbloqueadoPor: 2
  }
];

// Mensagens de encorajamento — adiciona mais aqui!
const MENSAGENS_SUCESSO = [
  "Fantástico, {nome}! Continua assim! 🌟",
  "Incrível, {nome}! Estás a arrasar! 🚀",
  "Muito bem, {nome}! És uma estrela! ⭐",
  "Brilhante, {nome}! Que resposta perfeita! 💡",
  "Parabéns, {nome}! Isso mesmo! 🎉",
  "Excelente trabalho, {nome}! Orgulho! 🏆",
  "Uau, {nome}! Estás a tornar-te um mestre! 🎓",
  "Perfeito, {nome}! Que inteligente! 🧠"
];
