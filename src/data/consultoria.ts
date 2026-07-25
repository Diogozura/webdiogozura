export type ConsultoriaItem = {
  id: string;
  emoji: string;
  title: string;
  description: string;
};

export const consultoriaItems: ConsultoriaItem[] = [
  {
    id: 'amizade',
    emoji: '🤝',
    title: 'Amizade',
    description: 'Consultoria estratégica em parceria e boas risadas. Sem contrato de fidelidade, só afinidade.',
  },
  {
    id: 'network',
    emoji: '🌐',
    title: 'Network',
    description: 'Te conecto com gente boa (e com memes de qualidade também). Networking do jeito gostoso de fazer.',
  },
  {
    id: 'treinos',
    emoji: '🏋️',
    title: 'Treinos',
    description: 'Motivação pra malhar, ou pelo menos pra combinar o horário do treino pela quinta vez.',
  },
  {
    id: 'cafe',
    emoji: '☕',
    title: 'Café',
    description: 'Toda boa reunião começa com um café bom. Isso aqui é consultoria séria, afinal.',
  },
  {
    id: 'fofocas',
    emoji: '🗣️',
    title: 'Fofocas',
    description: 'Fofoca é rede de inteligência. Trago as novidades em primeira mão, com direito a análise crítica.',
  },
  {
    id: 'mais',
    emoji: '🎉',
    title: 'E mais',
    description: 'O que mais você precisar, a gente dá um jeito. Consultoria multidisciplinar em ser gente boa.',
  },
];
