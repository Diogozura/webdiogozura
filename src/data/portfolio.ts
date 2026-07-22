export type PortfolioCategory = 'site' | 'complexo';

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: PortfolioCategory;
  url?: string;
  logo?: string;
  logoBg?: 'light' | 'dark';
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'mariana-karas',
    title: 'Mariana Karas — Psicóloga',
    description: 'Site institucional para psicóloga infantil e adolescente, com foco em acolhimento e apresentação clara dos atendimentos presenciais e online.',
    tags: ['Site institucional', 'Saúde', 'SEO'],
    category: 'site',
    url: 'https://marianakaras.com.br/',
    logo: '/portfolio/mariana-karas.png',
    logoBg: 'light',
  },
  {
    id: 'vk-marmoraria',
    title: 'VK Mármores e Granitos',
    description: 'Site para empresa de mármores e pedras naturais premium, apresentando peças sob medida, catálogo de produtos e projetos de design e instalação.',
    tags: ['Site institucional', 'Catálogo', 'Design'],
    category: 'site',
    url: 'https://www.vkmarmoraria.com.br/',
    logo: '/portfolio/vk-marmoraria.jpeg',
  },
  {
    id: 'juliana-camargo-personal',
    title: 'Juliana Camargo Personal',
    description: 'Site para personal trainer com atendimento personalizado, destacando programas de emagrecimento, condicionamento e treinos para gestantes e idosos.',
    tags: ['Site institucional', 'Fitness', 'Landing Page'],
    category: 'site',
    url: 'https://julianacamargopersonal.com.br/',
    logo: '/portfolio/juliana-camargo.png',
  },
  {
    id: 'rx-social',
    title: 'RX Social',
    description: 'Site para agência de social media, apresentando os serviços de estratégia, criação de conteúdo e gestão de Instagram para pequenas e médias empresas.',
    tags: ['Site institucional', 'Agência', 'Marketing'],
    category: 'site',
    url: 'https://www.rxsocial.com.br/',
    logo: '/portfolio/rx-social.png',
  },
  {
    id: 'graja-fibra',
    title: 'Grajaú Fibra',
    description: 'Soluções de tecnologia para provedora de internet: melhoria dos fluxos de atendimento ao cliente, automações internas e acompanhamento de desempenho e resultados.',
    tags: ['Telecom', 'Automação', 'Atendimento'],
    category: 'complexo',
    url: 'https://www.grajafibra.com.br/',
    logo: '/portfolio/graja-fibra.avif',
    logoBg: 'dark',
  },
  {
    id: 'vnt-fibra',
    title: 'VNT Fibra',
    description: 'Projetos de automação e tecnologia para provedora de internet, com foco em otimizar processos, melhorar o desempenho operacional e apoiar a tomada de decisão.',
    tags: ['Telecom', 'Automação', 'Resultados'],
    category: 'complexo',
    url: 'https://vntfibras.com.br/',
    logo: '/portfolio/vnt-fibra.png',
  },
];
