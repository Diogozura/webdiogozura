export type IxcOpaFeature = {
  id: string;
  icon: 'bolt' | 'clock' | 'signal' | 'chart' | 'star' | 'chat' | 'invoice';
  title: string;
  description: string;
  tag: string;
  wide?: boolean;
};

export const ixcOpaFeatures: IxcOpaFeature[] = [
  {
    id: 'automacao',
    icon: 'bolt',
    title: 'Até 80% do atendimento sem operador humano',
    description:
      'Fluxos automatizados cobrem o que mais entra na fila: segunda via, desbloqueio, status de conexão, agendamento. O operador só assume o que exige decisão — e chega na conversa já com o histórico lido.',
    tag: 'Fila menor · TMA menor',
    wide: true,
  },
  {
    id: '24h',
    icon: 'clock',
    title: 'Atendimento 24 horas',
    description:
      'Domingo às 23h o cliente é atendido igual à terça de manhã. Sem plantão, sem fila represada para o dia seguinte.',
    tag: 'Sempre aberto',
  },
  {
    id: 'massiva',
    icon: 'signal',
    title: 'Controle de massiva',
    description:
      'Identificou a queda, marca a área. Todo cliente afetado recebe aviso e o atendimento passa a responder o mesmo status — sem dezenas de conversas iguais na fila.',
    tag: 'Aviso proativo',
  },
  {
    id: 'relatorios',
    icon: 'chart',
    title: 'Relatórios precisos',
    description:
      'Volume por canal, tempo de resposta, resolução na IA, produtividade por operador. Número que fecha com a realidade — dá para decidir escala em cima dele.',
    tag: 'Dado confiável',
  },
  {
    id: 'pesquisa',
    icon: 'star',
    title: 'Pesquisa de satisfação sem custo extra',
    description:
      'CSAT disparado no fim de cada atendimento, sem ferramenta paga por fora e sem cobrança por envio. A nota volta amarrada ao protocolo e ao operador.',
    tag: 'Incluso',
  },
  {
    id: 'ia',
    icon: 'chat',
    title: 'IA com contexto do seu provedor',
    description:
      'A IA lê o cadastro, o contrato e o histórico antes de responder — então a resposta sai lapidada, no tom da empresa, sem roteiro de robô travado.',
    tag: 'Resposta com contexto',
  },
  {
    id: 'boleto',
    icon: 'invoice',
    title: 'Boleto e 2ª via 24h',
    description:
      'Segunda via, PIX e desbloqueio saem na hora, madrugada inclusive. Menos inadimplência por atrito e menos ligação só para pedir um código.',
    tag: 'Financeiro no automático',
    wide: true,
  },
];

export type IxcOpaCompareRow = {
  situation: string;
  before: string;
  after: string;
};

export const ixcOpaCompareRows: IxcOpaCompareRow[] = [
  {
    situation: 'Fora do horário comercial',
    before: 'Fila acumulada para o dia seguinte e cliente esperando resposta.',
    after: 'Atendimento rodando 24h; a demanda simples nem chega ao operador.',
  },
  {
    situation: 'Queda em uma região',
    before: 'Dezenas de conversas idênticas, cada uma respondida na mão.',
    after: 'Massiva marcada uma vez, aviso enviado a todos os clientes afetados.',
  },
  {
    situation: 'Segunda via de boleto',
    before: 'Depende de alguém disponível para emitir e enviar.',
    after: 'Emissão automática a qualquer hora, direto no canal do cliente.',
  },
  {
    situation: 'Satisfação do cliente',
    before: 'Medida por percepção, ou por ferramenta paga à parte.',
    after: 'Pesquisa automática ao fim do atendimento, sem custo adicional.',
  },
  {
    situation: 'Relatórios',
    before: 'Planilha montada na mão, sempre atrasada e discutível.',
    after: 'Indicadores prontos por canal, operador, fila e período.',
  },
  {
    situation: 'Crescer a base',
    before: 'Mais clientes exige contratar mais gente na mesma proporção.',
    after: 'A automação absorve o volume; a equipe cresce por escolha.',
  },
];

export type IxcOpaStep = {
  n: string;
  title: string;
  description: string;
};

export const ixcOpaSteps: IxcOpaStep[] = [
  {
    n: 'Etapa 01',
    title: 'Diagnóstico',
    description:
      'Levantamento do que entra na sua central hoje: volume, canais, motivos de contato e onde a equipe perde mais tempo.',
  },
  {
    n: 'Etapa 02',
    title: 'Modelagem',
    description:
      'Desenho dos fluxos, das filas e das regras de IA em cima do seu processo real — inclusive o que não vai ser automatizado.',
  },
  {
    n: 'Etapa 03',
    title: 'Implantação',
    description:
      'Configuração no IXC e no OPA Suite, integrações, testes com atendimento real e treinamento da equipe.',
  },
  {
    n: 'Etapa 04',
    title: 'Acompanhamento',
    description:
      'Leitura dos indicadores nas primeiras semanas e ajuste fino dos fluxos até os números estabilizarem.',
  },
];

export type IxcOpaFaqItem = {
  question: string;
  answer: string;
};

export const ixcOpaFaq: IxcOpaFaqItem[] = [
  {
    question: 'Preciso trocar o IXC ou o OPA Suite que já uso?',
    answer:
      'Não necessariamente. O trabalho parte do que você já tem funcionando: o que estiver rodando bem permanece, e a implantação preenche o que falta ou integra o que está solto. Trocar tudo é a última alternativa, não a primeira.',
  },
  {
    question: 'Os 80% de automação valem para qualquer provedor?',
    answer:
      'O número vem dos atendimentos repetitivos, que costumam ser a maior fatia da fila em qualquer central: segunda via, status de conexão, desbloqueio, dados cadastrais. O percentual final depende do seu mix de contatos — e é justamente isso que o diagnóstico mede antes de qualquer promessa.',
  },
  {
    question: 'Meu cliente vai perceber que está falando com uma IA?',
    answer:
      'A IA responde com o contexto do cadastro e do contrato, no tom definido pela empresa, e transfere para um humano assim que a demanda sai do que ela resolve bem. O objetivo não é esconder a automação: é que o cliente resolva o problema na primeira mensagem.',
  },
  {
    question: 'Quanto tempo leva a implantação de IXC + OPA Suite?',
    answer:
      'Depende do tamanho da base e de quantos canais entram. O que dá para garantir é a sequência: diagnóstico, modelagem, implantação e acompanhamento — com prazo fechado depois do diagnóstico, quando já se sabe o escopo real.',
  },
  {
    question: 'Atende provedor de qualquer estado?',
    answer: 'Sim. A base é em Cotia, São Paulo, e o atendimento é remoto para todo o Brasil.',
  },
];
