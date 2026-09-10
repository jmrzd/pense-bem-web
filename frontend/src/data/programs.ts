import type { Option, Program, Question } from '../types'

type RawQuestion = [prompt: string, options: [string, string, string, string], correctIndex: 0 | 1 | 2 | 3]

const OPTION_IDS = ['A', 'B', 'C', 'D'] as const

function buildQuestions(raw: RawQuestion[]): Question[] {
  return raw.map(([prompt, opts, correctIndex], index) => {
    const options: Option[] = opts.map((text, i) => ({ id: OPTION_IDS[i], text }))
    return {
      id: index + 1,
      questionNumber: index + 1,
      prompt,
      options,
      correctOptionId: OPTION_IDS[correctIndex],
    }
  })
}

const conhecimentosGeraisRaw: RawQuestion[] = [
  ['Qual é a capital do Brasil?', ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'], 2],
  ['Quantos estados tem o Brasil?', ['24', '25', '26', '27'], 2],
  ['Qual é o maior oceano do planeta?', ['Atlântico', 'Índico', 'Ártico', 'Pacífico'], 3],
  ['Quem pintou a Mona Lisa?', ['Michelangelo', 'Leonardo da Vinci', 'Rafael', 'Van Gogh'], 1],
  ['Qual é o menor país do mundo?', ['Mônaco', 'San Marino', 'Vaticano', 'Liechtenstein'], 2],
  ['Em que ano o homem pisou na Lua pela primeira vez?', ['1965', '1969', '1972', '1959'], 1],
  ['Qual é o rio mais longo do mundo?', ['Nilo', 'Amazonas', 'Yangtzé', 'Mississippi'], 1],
  ['Qual é a moeda oficial do Japão?', ['Won', 'Yuan', 'Iene', 'Rúpia'], 2],
  ['Quantos continentes existem?', ['5', '6', '7', '8'], 2],
  ['Qual desses países não faz parte da América do Sul?', ['Peru', 'Bolívia', 'Panamá', 'Equador'], 2],
  ['Quem escreveu "Dom Casmurro"?', ['José de Alencar', 'Machado de Assis', 'Castro Alves', 'Graciliano Ramos'], 1],
  ['Qual é a língua mais falada no mundo como nativa?', ['Inglês', 'Espanhol', 'Mandarim', 'Hindi'], 2],
  ['Qual é o maior deserto do mundo?', ['Saara', 'Antártica', 'Gobi', 'Kalahari'], 1],
  ['Quantos jogadores tem um time de futebol em campo?', ['9', '10', '11', '12'], 2],
  ['Qual é o metal líquido em temperatura ambiente?', ['Ferro', 'Mercúrio', 'Chumbo', 'Alumínio'], 1],
  ['Qual desses é considerado uma das sete maravilhas do mundo moderno?', ['Cristo Redentor', 'Torre Eiffel', 'Big Ben', 'Coliseu de Roma'], 0],
  ['Qual é a capital da França?', ['Marselha', 'Lyon', 'Paris', 'Nice'], 2],
  ['Quem foi o primeiro presidente do Brasil?', ['Getúlio Vargas', 'Deodoro da Fonseca', 'Juscelino Kubitschek', 'Prudente de Morais'], 1],
  ['Qual é o osso mais longo do corpo humano?', ['Fêmur', 'Tíbia', 'Úmero', 'Fíbula'], 0],
  ['Qual planeta é conhecido como o "planeta vermelho"?', ['Vênus', 'Marte', 'Júpiter', 'Saturno'], 1],
  ['Quantas cordas tem um violão clássico?', ['4', '5', '6', '7'], 2],
  ['Qual é a maior floresta tropical do mundo?', ['Floresta Amazônica', 'Floresta Negra', 'Taiga', 'Mata Atlântica'], 0],
  ['Em que continente fica o Egito?', ['Ásia', 'África', 'Europa', 'Oceania'], 1],
  ['Qual é o esporte mais popular do mundo?', ['Basquete', 'Futebol', 'Críquete', 'Tênis'], 1],
  ['Quem é o autor da teoria da relatividade?', ['Isaac Newton', 'Albert Einstein', 'Galileu Galilei', 'Nikola Tesla'], 1],
  ['Qual é a montanha mais alta do mundo?', ['K2', 'Monte Everest', 'Kilimanjaro', 'Aconcágua'], 1],
  ['Qual desses animais é um mamífero marinho?', ['Tubarão', 'Baleia', 'Polvo', 'Água-viva'], 1],
  ['Qual é o principal idioma falado em Angola?', ['Francês', 'Inglês', 'Português', 'Espanhol'], 2],
  ['Quantos minutos tem um jogo de futebol (tempo normal)?', ['80', '90', '100', '120'], 1],
  ['Qual é a capital da Itália?', ['Milão', 'Veneza', 'Roma', 'Turim'], 2],
]

const cienciaNaturezaRaw: RawQuestion[] = [
  ['Qual é a fórmula química da água?', ['CO2', 'H2O', 'O2', 'NaCl'], 1],
  ['Quantos ossos tem o corpo humano adulto, aproximadamente?', ['186', '206', '226', '246'], 1],
  ['Qual é o órgão responsável por bombear sangue no corpo?', ['Pulmão', 'Fígado', 'Coração', 'Rim'], 2],
  ['Qual gás os humanos precisam respirar para sobreviver?', ['Nitrogênio', 'Oxigênio', 'Hidrogênio', 'Dióxido de carbono'], 1],
  ['Qual é o maior planeta do sistema solar?', ['Terra', 'Saturno', 'Júpiter', 'Urano'], 2],
  ['Quantos planetas existem no sistema solar atualmente?', ['7', '8', '9', '10'], 1],
  ['Qual é a unidade básica da vida?', ['Átomo', 'Célula', 'Molécula', 'Tecido'], 1],
  ['Qual animal é conhecido por mudar de cor para se camuflar?', ['Camaleão', 'Iguana', 'Jacaré', 'Sapo'], 0],
  ['Qual é o processo pelo qual as plantas produzem energia?', ['Respiração', 'Fotossíntese', 'Fermentação', 'Digestão'], 1],
  ['Qual é a velocidade da luz, aproximadamente?', ['300 km/s', '3.000 km/s', '300.000 km/s', '30.000 km/s'], 2],
  ['Qual cientista formulou as leis do movimento e da gravitação?', ['Einstein', 'Newton', 'Darwin', 'Tesla'], 1],
  ['Qual é o maior mamífero do mundo?', ['Elefante-africano', 'Baleia-azul', 'Girafa', 'Rinoceronte'], 1],
  ['Quantos corações tem um polvo?', ['1', '2', '3', '4'], 2],
  ['Qual gás é essencial para a fotossíntese?', ['Oxigênio', 'Nitrogênio', 'Dióxido de carbono', 'Hidrogênio'], 2],
  ['Qual é o nome da camada que protege a Terra dos raios UV?', ['Camada de ozônio', 'Ionosfera', 'Troposfera', 'Estratosfera'], 0],
  ['Qual desses é um osso do crânio?', ['Fêmur', 'Parietal', 'Tíbia', 'Rádio'], 1],
  ['Qual é o estado físico da matéria com forma e volume definidos?', ['Gasoso', 'Líquido', 'Sólido', 'Plasma'], 2],
  ['Qual planeta é conhecido por seus anéis visíveis?', ['Marte', 'Saturno', 'Mercúrio', 'Netuno'], 1],
  ['Qual é o principal componente do ar que respiramos?', ['Oxigênio', 'Nitrogênio', 'Argônio', 'Dióxido de carbono'], 1],
  ['Qual desses animais é um réptil?', ['Sapo', 'Jacaré', 'Salamandra', 'Peixe-boi'], 1],
  ['Quantas câmaras tem o coração humano?', ['2', '3', '4', '5'], 2],
  ['Qual é a menor unidade de um elemento químico?', ['Molécula', 'Átomo', 'Célula', 'Íon'], 1],
  ['Qual é o nome do processo de divisão celular que gera células idênticas?', ['Meiose', 'Mitose', 'Fecundação', 'Osmose'], 1],
  ['Qual desses é considerado um vertebrado?', ['Estrela-do-mar', 'Minhoca', 'Cavalo', 'Água-viva'], 2],
  ['Qual é a estrela mais próxima da Terra?', ['Alpha Centauri', 'Sol', 'Sirius', 'Betelgeuse'], 1],
  ['Qual desses gases contribui para o efeito estufa?', ['Hélio', 'Dióxido de carbono', 'Neônio', 'Argônio'], 1],
  ['Qual é o nome da força que atrai objetos em direção à Terra?', ['Magnetismo', 'Gravidade', 'Atrito', 'Inércia'], 1],
  ['Qual é o líquido essencial que compõe a maior parte do corpo humano?', ['Sangue', 'Água', 'Plasma', 'Saliva'], 1],
  ['Qual inseto é responsável por polinizar boa parte das flores?', ['Formiga', 'Abelha', 'Barata', 'Mosca'], 1],
  ['Qual é o nome do fenômeno que causa as marés?', ['Vulcanismo', 'Atração gravitacional da Lua', 'Ventos', 'Correntes marítimas'], 1],
]

const gamesECulturaPopRaw: RawQuestion[] = [
  ['Qual encanador é o protagonista dos jogos da Nintendo?', ['Luigi', 'Mario', 'Yoshi', 'Wario'], 1],
  ['Em qual jogo o personagem Master Chief é o protagonista?', ['Halo', 'Gears of War', 'Destiny', 'Doom'], 0],
  ['Qual é o nome do reino onde se passa "The Legend of Zelda"?', ['Hyrule', 'Azeroth', 'Narnia', 'Termina'], 0],
  ['Qual empresa é a criadora do PlayStation?', ['Microsoft', 'Nintendo', 'Sony', 'Sega'], 2],
  ['Qual é o jogo de construção e sobrevivência com blocos mais famoso do mundo?', ['Terraria', 'Roblox', 'Minecraft', 'Fortnite'], 2],
  ['Em "Among Us", qual é o papel de quem sabota a nave?', ['Tripulante', 'Impostor', 'Engenheiro', 'Capitão'], 1],
  ['Qual saga de filmes acompanha os Vingadores?', ['DC', 'Marvel', 'Star Wars', 'X-Men'], 1],
  ['Qual é o nome do vilão principal em "Super Mario Bros"?', ['Bowser', 'Ganon', 'Dr. Eggman', 'Sephiroth'], 0],
  ['Em qual jogo os jogadores constroem e administram uma ilha, como no Animal Crossing?', ['Stardew Valley', 'Animal Crossing', 'Farmville', 'The Sims'], 1],
  ['Qual é a cor da camisa clássica do personagem Sonic?', ['Vermelho', 'Amarelo', 'Azul', 'Verde'], 2],
  ['Qual jogo é conhecido por batalhas royale com 100 jogadores em uma ilha?', ['Valorant', 'Fortnite', 'League of Legends', 'Apex Legends'], 1],
  ['Quem é o criador de "Pense Bem", relembrado como referência do jogo?', ['TecToy', 'Nintendo', 'Sega', 'Atari'], 0],
  ['Em "Free Fire" e "Fortnite", o objetivo final é...', ['Coletar pontos', 'Ser o último sobrevivente', 'Construir uma base', 'Vencer corridas'], 1],
  ['Qual é o nome do encanador verde, irmão do Mario?', ['Wario', 'Luigi', 'Toad', 'Waluigi'], 1],
  ['Qual franquia de jogos de luta apresenta Ryu e Ken?', ['Mortal Kombat', 'Tekken', 'Street Fighter', 'Injustice'], 2],
  ['Em qual console clássico o jogo "Pense Bem" fez sucesso no Brasil?', ['Master System', 'Atari 2600', 'Mega Drive', 'Nintendinho'], 0],
  ['Qual é o nome da moeda coletável nos jogos clássicos do Mario?', ['Gemas', 'Moedas', 'Estrelas', 'Anéis'], 1],
  ['Qual jogo de RPG japonês é famoso pela franquia com "Final" no nome?', ['Final Fantasy', 'Dragon Quest', 'Persona', 'Kingdom Hearts'], 0],
  ['Qual personagem é o rival clássico do Sonic?', ['Tails', 'Knuckles', 'Shadow', 'Dr. Eggman'], 3],
  ['Qual jogo de tabuleiro eletrônico brasileiro inspirou este projeto?', ['Perfil', 'Pense Bem', 'Genius', 'Cara a Cara'], 1],
  ['Qual é o gênero de jogos onde se resolvem quizzes e perguntas?', ['FPS', 'Trivia', 'RPG', 'Plataforma'], 1],
  ['Em qual jogo os jogadores caçam e constroem em um mundo aberto de blocos e mobs?', ['Minecraft', 'Roblox', 'Terraria', 'Valheim'], 0],
  ['Qual é o nome do encanador antagonista de Mario e Luigi?', ['Bowser', 'Wario', 'King Boo', 'Petey Piranha'], 1],
  ['Qual jogo popularizou o gênero "battle royale" mobile no Brasil?', ['PUBG Mobile', 'Free Fire', 'Call of Duty Mobile', 'Rules of Survival'], 1],
  ['Qual é a plataforma de jogos e criação mais popular entre crianças e adolescentes hoje?', ['Steam', 'Epic Games', 'Roblox', 'Itch.io'], 2],
  ['Em qual jogo o personagem principal se chama "Link"?', ['Final Fantasy', 'The Legend of Zelda', 'Kingdom Hearts', 'Fire Emblem'], 1],
  ['Qual é o nome da equipe de heróis da Marvel liderada pelo Capitão América?', ['Liga da Justiça', 'Vingadores', 'X-Men', 'Guardiões da Galáxia'], 1],
  ['Qual jogo de simulação de vida permite criar e controlar personagens do cotidiano?', ['The Sims', 'Minecraft', 'Stardew Valley', 'Cities: Skylines'], 0],
  ['Qual é o nome do fantasma que aparece nos jogos clássicos do Pac-Man?', ['Goomba', 'Blinky', 'Koopa', 'Boo'], 1],
  ['Qual jogo eletrônico de perguntas e respostas é a inspiração direta deste projeto?', ['Pense Bem', 'Show do Milhão', 'Passa ou Repassa', 'Genius'], 0],
]

const programsRaw: {
  id: string
  name: string
  tagline: string
  description: string
  icon: string
  accent: Program['accent']
  raw: RawQuestion[]
}[] = [
  {
    id: 'conhecimentos-gerais',
    name: 'Conhecimentos Gerais',
    tagline: 'Cultura, geografia e história num só programa',
    description: 'Um mix clássico de perguntas de conhecimentos gerais para testar sua bagagem cultural.',
    icon: '🌍',
    accent: 'mustard',
    raw: conhecimentosGeraisRaw,
  },
  {
    id: 'ciencia-natureza',
    name: 'Ciência & Natureza',
    tagline: 'Do átomo às estrelas',
    description: 'Perguntas sobre biologia, física, química e o universo ao nosso redor.',
    icon: '🧬',
    accent: 'teal',
    raw: cienciaNaturezaRaw,
  },
  {
    id: 'games-cultura-pop',
    name: 'Games & Cultura Pop',
    tagline: 'Para quem vive conectado',
    description: 'Videogames, filmes, heróis e memes que marcaram gerações.',
    icon: '🎮',
    accent: 'coral',
    raw: gamesECulturaPopRaw,
  },
]

export const programs: Program[] = programsRaw.map((p) => ({
  id: p.id,
  name: p.name,
  tagline: p.tagline,
  description: p.description,
  icon: p.icon,
  accent: p.accent,
  questions: buildQuestions(p.raw),
}))

export function getProgramById(id: string): Program | undefined {
  return programs.find((p) => p.id === id)
}
