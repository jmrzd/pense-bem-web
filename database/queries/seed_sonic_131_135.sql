-- ============================================================
-- PENSE BEM WEB
-- Seed: Sonic e Tails em Alta Velocidade
-- Programas 131 a 135
--
-- Conteúdo:
--   5 programas
--   150 perguntas (30 por programa)
--   600 alternativas (4 por pergunta)
--
-- Compatível com o schema:
--   public.programs
--   public.questions
--   public.question_options
--
-- IMPORTANTE:
-- - Este script NÃO apaga partidas, tentativas ou jogadores.
-- - Pode ser executado novamente: programas, perguntas e alternativas
--   são atualizados por suas chaves únicas.
-- - Questões marcadas [VISUAL] dependem das ilustrações do livro.
-- - O Programa 132 já configura image_url para as imagens locais do frontend.
-- ============================================================

BEGIN;

-- 1) Programas
INSERT INTO public.programs (code, title, description, active)
VALUES
    ('131', 'Sonic e Tails — Alta Velocidade — Programa 1', 'Programa 1 do livro Pense Bem — Sonic e Tails em Alta Velocidade. Questões 1 a 30 do livro.', TRUE),
    ('132', 'Sonic e Tails — Alta Velocidade — Programa 2', 'Programa 2 do livro Pense Bem — Sonic e Tails em Alta Velocidade. Questões 31 a 60 do livro.', TRUE),
    ('133', 'Sonic e Tails — Alta Velocidade — Programa 3', 'Programa 3 do livro Pense Bem — Sonic e Tails em Alta Velocidade. Questões 61 a 90 do livro.', TRUE),
    ('134', 'Sonic e Tails — Alta Velocidade — Programa 4', 'Programa 4 do livro Pense Bem — Sonic e Tails em Alta Velocidade. Questões 91 a 120 do livro.', TRUE),
    ('135', 'Sonic e Tails — Alta Velocidade — Programa 5', 'Programa 5 do livro Pense Bem — Sonic e Tails em Alta Velocidade. Questões 121 a 150 do livro.', TRUE)
ON CONFLICT (code)
DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    active = TRUE;

-- 2) Dados temporários das 150 perguntas
CREATE TEMP TABLE tmp_sonic_seed (
    program_code VARCHAR(40) NOT NULL,
    question_number SMALLINT NOT NULL,
    prompt TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_code CHAR(1) NOT NULL CHECK (correct_code IN ('A','B','C','D'))
) ON COMMIT DROP;

INSERT INTO tmp_sonic_seed (
    program_code,
    question_number,
    prompt,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_code
)
VALUES
    ('131', 1, 'Sonic é um .... superveloz.', 'ratinho', 'porco-espinho', 'esquilo', 'pinguim', 'B'),
    ('131', 2, 'A principal arma de defesa de Sonic é o famoso .....', 'Cambalhota Voadora', 'Ataque Giratório Supersônico', 'Soco Frontal Direcionado', 'Pontapé Diagonal', 'B'),
    ('131', 3, 'Sonic tem muito orgulho de seus espinhos .....', 'verdes', 'vermelhos', 'azuis', 'amarelos', 'C'),
    ('131', 4, 'As botinhas de Sonic protegem seus pés do calor do atrito, durante as correrias.', 'azuis', 'amarelas', 'verdes', 'vermelhas', 'D'),
    ('131', 5, 'O Dr. Ovi Kintobor era um .... que fazia experiências malucas em seu .....', 'cozinheiro — cozinha', 'médico — consultório', 'cineasta — estúdio', 'cientista — laboratório', 'D'),
    ('131', 6, 'Mas, por causa de um engano, o Dr. K. acabou se transformando no perverso .....', 'Dr. Ivo Pitanguik', 'Dr. Ivo Robotnik', 'Dr. Ovni Nikotrov', 'Dr. Frankenstein', 'B'),
    ('131', 7, '[VISUAL] Tails é um raposinho diferente: ele tem dois....', 'rabos', 'orelhas', 'olhos', 'focinhos', 'A'),
    ('131', 8, '[VISUAL] Os rabos de Tails giram como....', 'hélice', 'pneu', 'bala', 'relógio', 'A'),
    ('131', 9, '[VISUAL] Tails flutua como um....', 'navio', 'carro', 'rato', 'helicóptero', 'D'),
    ('131', 10, 'O helicóptero é ... veloz que o navio.', 'menos', 'tanto', 'mais', 'leve', 'C'),
    ('131', 11, 'O ... é mais veloz que o helicóptero.', 'rato', 'foguete', 'caracol', 'skate', 'B'),
    ('131', 12, 'Balões e dirigíveis são muito ....', 'gordos', 'gelados', 'pesados', 'leves', 'D'),
    ('131', 13, 'O trem mais rápido do mundo é o ....', 'trem-bala', 'trem-fantasma', 'trem das onze', 'maria-fumaça', 'A'),
    ('131', 14, 'O animal mais veloz em terra é o ....', 'guepardo', 'tigre', 'alce', 'urso', 'A'),
    ('131', 15, 'Qual deles nada mais rápido?', 'polvo', 'baleia', 'peixe-voador', 'tubarão', 'C'),
    ('131', 16, 'Qual destas aves é mais veloz?', 'arara', 'sabiá', 'águia', 'galinha', 'C'),
    ('131', 17, 'Foguetes e mísseis ... a barreira do som.', 'ultrapassam', 'passam embaixo', 'desaparecem', 'navegam', 'A'),
    ('131', 18, 'Isto quer dizer que os foguetes e mísseis supersônicos são ... rápidos que o som.', 'super', 'muito', 'mais', 'bastante', 'C'),
    ('131', 19, 'Sonic adora a ....', 'música', 'calma', 'velocidade', 'feijoada', 'C'),
    ('131', 20, 'Veloz quer dizer ....', 'lento', 'rápido', 'fraco', 'forte', 'B'),
    ('131', 21, 'Por causa da velocidade, os espinhos de Sonic ficaram ....', 'invisíveis', 'verdes', 'quebrados', 'azuis', 'D'),
    ('131', 22, 'O contrário de “depressa” é ....', 'devagar', 'alto', 'feio', 'magro', 'A'),
    ('131', 23, 'Tails tem rabos ....', 'listrados', 'peludos', 'salgados', 'cortados', 'B'),
    ('131', 24, 'Para voar, ele gira seus rabos bem ....', 'depressa', 'baixinho', 'suavemente', 'quadrados', 'A'),
    ('131', 25, '[VISUAL] Qual objeto tem movimento giratório parecido com os rabos de Tails?', 'maçã', 'helicóptero', 'martelo', 'quadro', 'B'),
    ('131', 26, '[VISUAL] Qual objeto tem movimento giratório?', 'geladeira', 'rádio', 'colher', 'liquidificador', 'D'),
    ('131', 27, '[VISUAL] Qual objeto tem movimento giratório?', 'ventilador', 'cadeira', 'poltrona', 'ursinho', 'A'),
    ('131', 28, '[VISUAL] Qual objeto tem movimento giratório?', 'televisão', 'telefone', 'hélice/cata-vento', 'pincel', 'C'),
    ('131', 29, '[VISUAL] Qual objeto tem movimento giratório?', 'cata-vento', 'casa', 'barco', 'cogumelo', 'A'),
    ('131', 30, '[VISUAL] Qual objeto tem movimento giratório?', 'flor', 'sorvete', 'moinho de vento', 'camisa', 'C'),
    ('132', 1, '[VISUAL] Qual sequência forma a primeira descrição correta da gravura de Tails?', '1,2,3,4,11,13,14', '1,5,6,8,11,15', '1,2,6,8,9,13,14', '1,5,3,7,12,9', 'C'),
    ('132', 2, '[VISUAL] Qual sequência forma a segunda descrição correta da gravura de Tails?', '1,5,6,9', '1,2,3,7,12,16', '1,2,3,4,8,9', '1,9,3,4,15', 'B'),
    ('132', 3, '[VISUAL] Qual sequência forma a primeira descrição correta da gravura de Sonic?', '5,9,13,11,2', '2,9,13,11,16,4,15', '5,6,15,11,3,8', '5,6,3,12', 'D'),
    ('132', 4, '[VISUAL] Qual sequência forma a segunda descrição correta da gravura de Sonic?', '2,9,13,10,5,6,16', '2,6,3,8,4,15', '5,10,2,6,16,8', '5,9,13,11,14,7', 'D'),
    ('132', 5, '[VISUAL] Qual sequência forma a primeira descrição correta da gravura de Sonic e Tails?', '1,8,5', '1,15,4,7,14,3', '4,8,5,14,1', '4,15,1,10,2,9', 'D'),
    ('132', 6, '[VISUAL] Qual sequência forma a segunda descrição correta da gravura de Sonic e Tails?', '1,15,4,10,12', '1,15,4,7,14,12', '4,15,1,16,5', '1,16,11,5,3', 'B'),
    ('132', 7, 'O coelho corre muito ... do que a tartaruga.', 'atrás', 'menos', 'igual', 'mais', 'D'),
    ('132', 8, 'No dia da corrida, o coelho saiu na frente e no meio do caminho resolveu ....', 'descansar', 'voltar', 'chegar', 'pular', 'A'),
    ('132', 9, 'Só que ele dormiu, e nem percebeu quando a ... passou na sua frente.', 'raposa', 'tartaruga', 'galinha', 'borboleta', 'B'),
    ('132', 10, 'Foi assim que um bicho bem mais ... acabou vencendo o coelho!', 'lento', 'gordo', 'veloz', 'sábio', 'A'),
    ('132', 11, 'Existe um provérbio que diz: devagar se vai ao ....', 'cinema', 'longe', 'rio', 'perto', 'B'),
    ('132', 12, 'Mesmo sendo mais lenta, a tartaruga não ... e acabou ganhando.', 'sorriu', 'fugiu', 'caiu', 'desistiu', 'D'),
    ('132', 13, 'No esporte, todos dizem que o importante é ....', 'competir', 'perder', 'sonhar', 'atravessar', 'A'),
    ('132', 14, 'Mas também é muito emocionante ... uma prova esportiva!', 'sair', 'atrasar', 'vencer', 'dormir', 'C'),
    ('132', 15, '[VISUAL] O primeiro quadrinho da história do coelho e da tartaruga é:', 'F', 'B', 'C', 'D', 'A'),
    ('132', 16, '[VISUAL] O segundo quadrinho é:', 'B', 'C', 'D', 'F', 'B'),
    ('132', 17, '[VISUAL] O terceiro quadrinho é:', 'E', 'C', 'A', 'B', 'C'),
    ('132', 18, '[VISUAL] O quarto quadrinho é:', 'B', 'A', 'D', 'F', 'A'),
    ('132', 19, '[VISUAL] O quinto quadrinho é:', 'D', 'F', 'A', 'B', 'A'),
    ('132', 20, '[VISUAL] O sexto quadrinho é:', 'D', 'E', 'A', 'C', 'B'),
    ('132', 21, '[VISUAL] Que peça completa o espaço 51 do quebra-cabeça?', 'B', 'A', 'E', 'D', 'A'),
    ('132', 22, '[VISUAL] Que peça completa o espaço 52?', 'A', 'B', 'C', 'D', 'D'),
    ('132', 23, '[VISUAL] Que peça completa o espaço 53?', 'E', 'F', 'A', 'C', 'B'),
    ('132', 24, '[VISUAL] Que peça completa o espaço 54?', 'A', 'E', 'F', 'B', 'B'),
    ('132', 25, '[VISUAL] Que peça completa o espaço 55?', 'F', 'A', 'C', 'D', 'B'),
    ('132', 26, '[VISUAL] Que peça completa o espaço 56?', 'A', 'D', 'C', 'E', 'C'),
    ('132', 27, '[VISUAL] No labirinto, a primeira palavra da frase está dentro da bola número:', '18', '2', '3', '11', 'D'),
    ('132', 28, '[VISUAL] A segunda palavra está dentro da bola número:', '2', '10', '4', '3', 'C'),
    ('132', 29, '[VISUAL] A terceira palavra está dentro da bola número:', '4', '3', '2', '6', 'D'),
    ('132', 30, '[VISUAL] A quarta palavra está dentro da bola número:', '3', '15', '4', '13', 'D'),
    ('133', 1, '[VISUAL] Em cada linha, assinale o mais veloz:', 'avião', 'balão', 'dirigível', 'foguete', 'D'),
    ('133', 2, '[VISUAL] O mais veloz:', 'carro de Fórmula 1', 'automóvel', 'bicicleta', 'skate', 'A'),
    ('133', 3, '[VISUAL] O mais veloz:', 'tartaruga', 'elefante', 'guepardo', 'urso', 'C'),
    ('133', 4, '[VISUAL] O mais veloz:', 'tubarão', 'estrela-do-mar', 'peixe', 'cavalo-marinho', 'A'),
    ('133', 5, '[VISUAL] O mais veloz:', 'trem de alta velocidade', 'locomotiva a vapor', 'carrinho', 'ônibus', 'A'),
    ('133', 6, '[VISUAL] O mais veloz:', 'abelha', 'águia', 'passarinho', 'borboleta', 'B'),
    ('133', 7, 'Qual frase está na ordem correta?', 'Giram rodas como Sonic os de pés.', 'Rodas como giram Sonic pés de os.', 'Os pés de Sonic giram como rodas.', 'Sonic de como rodas os giram pés.', 'C'),
    ('133', 8, 'Qual frase está na ordem correta?', 'Nosso amigo corre em alta velocidade.', 'Velocidade alta amigo corre nosso em.', 'Alta corre nosso velocidade em amigo.', 'Em velocidade nosso alta corre amigo.', 'A'),
    ('133', 9, 'Qual frase está na ordem correta?', 'Ele escavou um túnel na montanha.', 'Montanha escavou ele túnel na um.', 'Túnel um montanha na escavou ele.', 'Ele túnel montanha escavou um na.', 'A'),
    ('133', 10, 'Qual frase está na ordem correta?', 'Quentes muito lava são fogo e.', 'Fogo e lava são muito quentes.', 'E lava quentes são fogo muito.', 'Muito lava são fogo e quentes.', 'B'),
    ('133', 11, 'Qual frase está na ordem correta?', 'Pedras vulcânicas voam para o alto.', 'Alto vulcânicas pedras para o voar.', 'O alto pedras voam vulcânicas para.', 'Vulcânicas voam alto para pedras o.', 'A'),
    ('133', 12, 'Qual frase está na ordem correta?', 'Brancas usa luvas Sonic.', 'Luvas usa brancas Sonic.', 'Usa brancas Sonic luvas.', 'Sonic usa luvas brancas.', 'D'),
    ('133', 13, 'O carro precisa de quê para se movimentar?', 'pés', 'gasolina', 'vento', 'carvão', 'B'),
    ('133', 14, 'A bicicleta precisa de quê para se movimentar?', 'pilha', 'pés', 'bateria', 'vento', 'B'),
    ('133', 15, 'O trem elétrico precisa de quê?', 'pés', 'eletricidade', 'ar', 'gasolina', 'B'),
    ('133', 16, 'O moinho precisa de quê para se movimentar?', 'carvão', 'ar', 'vento', 'pés', 'C'),
    ('133', 17, 'A locomotiva a vapor precisa de quê?', 'eletricidade', 'carvão', 'pés', 'gasolina', 'B'),
    ('133', 18, 'O relógio precisa de quê para funcionar?', 'bateria', 'ar', 'pés', 'carvão', 'A'),
    ('133', 19, 'O balão precisa de quê?', 'gasolina', 'pés', 'carvão', 'ar', 'D'),
    ('133', 20, 'O carrinho de controle remoto precisa de quê?', 'pés', 'pilha', 'carvão', 'vento', 'B'),
    ('133', 21, '[VISUAL] Ordene as invenções voadoras da mais antiga para a mais moderna. A primeira é:', 'F', 'B', 'C', 'D', 'A'),
    ('133', 22, 'A segunda é:', 'F', 'C', 'A', 'B', 'D'),
    ('133', 23, 'A terceira é:', 'B', 'D', 'B', 'F', 'B'),
    ('133', 24, 'A quarta é:', 'D', 'E', 'B', 'A', 'B'),
    ('133', 25, 'A quinta é:', 'E', 'B', 'F', 'C', 'D'),
    ('133', 26, 'A sexta é:', 'E', 'D', 'A', 'C', 'C'),
    ('133', 27, 'Ícaro conseguiu voar! Só que quando chegou perto do Sol, o calor ... a cera das asas.', 'congelou', 'esqueceu', 'derreteu', 'endureceu', 'C'),
    ('133', 28, 'As asas do pobre Ícaro se desmancharam e ele caiu no ....', 'céu', 'aeroporto', 'mar', 'espaço', 'C'),
    ('133', 29, 'Muito tempo depois, o sonho de voar se tornou realidade quando ... inventou o avião.', 'Santo do Monte', 'Santos Dumont', 'Santo Antônio', 'Monte Santo', 'B'),
    ('133', 30, 'Existe um esporte moderno que lembra o voo de Ícaro: é a ....', 'asa-delta', 'windsurf', 'tênis', 'futebol', 'A'),
    ('134', 1, 'O vento é ... em movimento.', 'sol', 'água', 'terra', 'ar', 'D'),
    ('134', 2, 'O ar está ... do planeta Terra.', 'embaixo', 'em volta', 'atrás', 'igual', 'B'),
    ('134', 3, 'Os raios do Sol ... o ar.', 'esquentam', 'escurecem', 'esfriam', 'descem', 'A'),
    ('134', 4, 'O ar quente é mais ... que o ar frio.', 'difícil', 'bonito', 'triste', 'leve', 'D'),
    ('134', 5, 'Então ele ... para o alto.', 'anda', 'sobe', 'grita', 'chora', 'B'),
    ('134', 6, 'Enquanto isso, o ar frio ....', 'brinca', 'desce', 'dorme', 'pinta', 'B'),
    ('134', 7, 'Esse sobe e desce do ar forma os ... que sopram sobre a Terra.', 'desertos', 'mares', 'ilhas', 'ventos', 'D'),
    ('134', 8, 'O vento que apenas movimenta as folhas das árvores é chamado de ....', 'brasa', 'Elisa', 'brisa', 'brita', 'C'),
    ('134', 9, 'O vento um pouco mais forte, que balança as árvores, se chama ....', 'ventania', 'calmaria', 'aragem', 'ventarola', 'A'),
    ('134', 10, 'Quando a velocidade do vento está acima de 90 quilômetros por hora ele recebe o nome de ....', 'furacão', 'vulcão', 'inundação', 'sertão', 'A'),
    ('134', 11, 'Outro nome para esse tipo de vento é ....', 'ciclovia', 'ciclista', 'ciclope', 'ciclone', 'D'),
    ('134', 12, 'Furacões acontecem nas regiões quentes, próximas ao ....', 'Equador', 'Pólo Norte', 'Pólo Sul', 'Meridiano', 'A'),
    ('134', 13, 'Mais veloz que o vento é o ....', 'caracol', 'sapo', 'sapoti', 'som', 'D'),
    ('134', 14, 'Vemos o clarão do raio ... de escutar o barulho do trovão.', 'depois', 'antes', 'atrás', 'ontem', 'B'),
    ('134', 15, 'Isso acontece porque a luz é ... veloz que o som.', 'mais', 'menos', 'igual', 'maior', 'A'),
    ('134', 16, 'Um foguete ... é mais rápido que o som.', 'elétrico', 'parabólico', 'supersônico', 'azul', 'C'),
    ('134', 17, 'Mas ... existe foguete mais rápido que a luz.', 'sim', 'tão', 'não', 'talvez', 'C'),
    ('134', 18, 'A Terra e a Lua não têm ... própria.', 'água', 'vida', 'sombra', 'luz', 'D'),
    ('134', 19, 'Elas recebem a luz do ....', 'Marte', 'satélite', 'planeta', 'Sol', 'D'),
    ('134', 20, 'A Terra demora ... dias para dar uma volta em torno do Sol.', '30', '14', '365', '210', 'C'),
    ('134', 21, 'O raio produz um ... muito forte.', 'perfume', 'sabão', 'clarão', 'casco', 'C'),
    ('134', 22, 'Também faz muito ....', 'dinheiro', 'bagunça', 'sujeira', 'barulho', 'D'),
    ('134', 23, 'O raio é uma descarga ....', 'patética', 'eclética', 'ética', 'elétrica', 'D'),
    ('134', 24, 'O clarão do raio é o ....', 'relâmpago', 'pirilampo', 'ângulo', 'âmago', 'A'),
    ('134', 25, 'O barulho do raio é o ....', 'trovão', 'canção', 'medalhão', 'turbilhão', 'A'),
    ('134', 26, 'O raio atinge os lugares mais ....', 'movimentados', 'escuros', 'altos', 'bonitos', 'C'),
    ('134', 27, '[VISUAL] Em cada linha, escolha o objeto que fornece luz.', 'sapato', 'rato', 'tomate', 'vela', 'D'),
    ('134', 28, '[VISUAL] Qual fornece luz?', 'abelha', 'lanterna', 'cachorro', 'relógio', 'B'),
    ('134', 29, '[VISUAL] Qual fornece luz?', 'sofá', 'luminária', 'bolo', 'caneca', 'B'),
    ('134', 30, '[VISUAL] Qual fornece luz?', 'caneta', 'coruja', 'martelo', 'fogueira', 'D'),
    ('135', 1, 'Qual destes é o meio mais rápido de se movimentar?', 'sussurrar', 'andar', 'engatinhar', 'correr', 'D'),
    ('135', 2, 'Qual destes é o meio mais rápido de se movimentar na água?', 'saltitar', 'nadar', 'lamber', 'boiar', 'B'),
    ('135', 3, 'A ... voa mais rápido que a gaivota.', 'galinha', 'águia', 'borboleta', 'pata', 'B'),
    ('135', 4, 'O canguru salta mais longe que o ....', 'mesa', 'minhoca', 'cadeira', 'sapo', 'D'),
    ('135', 5, 'Tubarões nadam mais rápido que ....', 'lambaris', 'gatos', 'aviões', 'pedras', 'A'),
    ('135', 6, 'O carro de Fórmula 1 é ... veloz que o fusca.', 'igual', 'mais', 'menos', 'tarde', 'B'),
    ('135', 7, '[VISUAL] CABEÇA — siga a linha e encontre a letra correspondente.', 'A', 'B', 'C', 'D', 'D'),
    ('135', 8, '[VISUAL] FOCINHO.', 'E', 'A', 'F', 'B', 'A'),
    ('135', 9, '[VISUAL] MÃO DIREITA.', 'D', 'A', 'F', 'C', 'B'),
    ('135', 10, '[VISUAL] MÃO ESQUERDA.', 'A', 'F', 'C', 'D', 'C'),
    ('135', 11, '[VISUAL] PÉ DIREITO.', 'F', 'D', 'B', 'E', 'C'),
    ('135', 12, '[VISUAL] PÉ ESQUERDO.', 'F', 'C', 'E', 'B', 'A'),
    ('135', 13, 'Qual palavra indica movimento/ação?', 'TAILS', 'GIRA', 'SEUS', 'RABOS', 'B'),
    ('135', 14, 'Qual palavra indica movimento/ação?', 'JOE', 'SUSHI', 'MERGULHA', 'FUNDO', 'C'),
    ('135', 15, 'Qual palavra indica movimento/ação?', 'SALLY ACORN', 'SABE', 'SALTAR', 'BEM', 'C'),
    ('135', 16, 'Qual palavra indica movimento/ação?', 'SONIC', 'ADORA', 'CORRER', 'BASTANTE', 'C'),
    ('135', 17, 'Qual palavra indica movimento/ação?', 'ROBOTNIK', 'GOSTA', 'DE', 'ATACAR', 'D'),
    ('135', 18, 'Qual palavra indica movimento/ação?', 'QUEM', 'CONSEGUE', 'VOAR', 'ALTO?', 'C'),
    ('135', 19, '[VISUAL] Que peça completa o espaço 139 do quebra-cabeça?', 'A', 'C', 'H', 'D', 'B'),
    ('135', 20, '[VISUAL] Que peça completa o espaço 140?', 'C', 'A', 'E', 'B', 'B'),
    ('135', 21, '[VISUAL] Que peça completa o espaço 141?', 'D', 'H', 'F', 'A', 'B'),
    ('135', 22, '[VISUAL] Que peça completa o espaço 142?', 'F', 'H', 'B', 'F', 'A'),
    ('135', 23, '[VISUAL] Que peça completa o espaço 143?', 'A', 'C', 'B', 'D', 'C'),
    ('135', 24, '[VISUAL] Que peça completa o espaço 144?', 'D', 'A', 'F', 'H', 'A'),
    ('135', 25, '[VISUAL] Que peça completa o espaço 145?', 'A', 'B', 'C', 'G', 'D'),
    ('135', 26, '[VISUAL] Que peça completa o espaço 146?', 'D', 'G', 'A', 'E', 'D'),
    ('135', 27, 'Sonic está ....', 'parando', 'pulando', 'vencendo', 'esquiando', 'D'),
    ('135', 28, 'Sonic está esquiando na ....', 'comendo', 'subindo', 'montanha', 'dormindo', 'C'),
    ('135', 29, 'Tails está ....', 'sonhando', 'escalando', 'mergulhando', 'flutuando', 'D'),
    ('135', 30, 'Tails está flutuando sobre o ....', 'ouvindo', 'danando', 'gelo', 'vento', 'C');

-- 3) Perguntas: insere ou atualiza sem depender de IDs fixos
INSERT INTO public.questions (program_id, question_number, prompt)
SELECT
    p.id,
    s.question_number,
    s.prompt
FROM tmp_sonic_seed s
JOIN public.programs p
  ON p.code = s.program_code
ON CONFLICT (program_id, question_number)
DO UPDATE SET
    prompt = EXCLUDED.prompt;

-- 3.1) Imagens das questões visuais do Programa 132
-- Os arquivos devem estar em:
-- frontend/public/images/programs/132/
--
-- As questões 7 a 14 são textuais e ficam sem imagem.
UPDATE public.questions AS q
SET image_url = CASE
    WHEN q.question_number IN (1, 2)
        THEN '/images/programs/132/132_q01-q02.png'
    WHEN q.question_number IN (3, 4)
        THEN '/images/programs/132/132_q03-q04.png'
    WHEN q.question_number IN (5, 6)
        THEN '/images/programs/132/132_q05-q06.png'
    WHEN q.question_number BETWEEN 7 AND 14
        THEN NULL
    WHEN q.question_number BETWEEN 15 AND 20
        THEN '/images/programs/132/132_q15-q20.png'
    WHEN q.question_number BETWEEN 21 AND 26
        THEN '/images/programs/132/132_q21-q26.png'
    WHEN q.question_number BETWEEN 27 AND 30
        THEN '/images/programs/132/132_q27-q30.png'
    ELSE NULL
END
FROM public.programs AS p
WHERE q.program_id = p.id
  AND p.code = '132';

-- 4) Antes de atualizar alternativas, limpa a marcação de correta
--    somente nas questões deste seed. Isso evita conflito com o índice
--    uq_question_one_correct_option caso a resposta correta seja alterada.
UPDATE public.question_options qo
SET is_correct = FALSE
FROM public.questions q
JOIN public.programs p
  ON p.id = q.program_id
JOIN tmp_sonic_seed s
  ON s.program_code = p.code
 AND s.question_number = q.question_number
WHERE qo.question_id = q.id;

-- 5) Alternativas: 4 por pergunta
INSERT INTO public.question_options (
    question_id,
    option_code,
    option_text,
    is_correct
)
SELECT
    q.id,
    v.option_code,
    v.option_text,
    v.is_correct
FROM tmp_sonic_seed s
JOIN public.programs p
  ON p.code = s.program_code
JOIN public.questions q
  ON q.program_id = p.id
 AND q.question_number = s.question_number
CROSS JOIN LATERAL (
    VALUES
        ('A'::CHAR(1), s.option_a, s.correct_code = 'A'),
        ('B'::CHAR(1), s.option_b, s.correct_code = 'B'),
        ('C'::CHAR(1), s.option_c, s.correct_code = 'C'),
        ('D'::CHAR(1), s.option_d, s.correct_code = 'D')
) AS v(option_code, option_text, is_correct)
ON CONFLICT (question_id, option_code)
DO UPDATE SET
    option_text = EXCLUDED.option_text,
    is_correct = EXCLUDED.is_correct;

COMMIT;

-- ============================================================
-- VERIFICAÇÃO
-- Deve retornar 30 perguntas, 120 alternativas e
-- 30 alternativas corretas para CADA programa.
-- ============================================================

SELECT
    p.code,
    p.title,
    COUNT(DISTINCT q.id) AS questions,
    COUNT(qo.id) AS options,
    COUNT(*) FILTER (WHERE qo.is_correct) AS correct_options
FROM public.programs p
LEFT JOIN public.questions q
  ON q.program_id = p.id
LEFT JOIN public.question_options qo
  ON qo.question_id = q.id
WHERE p.code IN ('131','132','133','134','135')
GROUP BY p.id, p.code, p.title
ORDER BY p.code;

-- Conferência das imagens do Programa 132.
-- Esperado: 22 questões com image_url e 8 sem image_url.
SELECT
    p.code,
    COUNT(*) FILTER (WHERE q.image_url IS NOT NULL) AS questions_with_image,
    COUNT(*) FILTER (WHERE q.image_url IS NULL) AS questions_without_image
FROM public.programs p
JOIN public.questions q
  ON q.program_id = p.id
WHERE p.code = '132'
GROUP BY p.code;

-- Resultado esperado por linha:
-- questions = 30
-- options = 120
-- correct_options = 30
