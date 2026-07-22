export type ServiceItem = {
  id: string;
  title: string;
  priceFrom?: string;
  description: string;
  features: string[];
};

export const serviceItems: ServiceItem[] = [
  {
    id: 'sites',
    title: 'Sites e landing pages',
    priceFrom: 'a partir de R$ 200',
    description: 'Sites institucionais, portfólios e páginas de vendas, prontos para captar clientes.',
    features: ['Design responsivo', 'Otimização para SEO', 'Entrega rápida'],
  },
  {
    id: 'telecom',
    title: 'Soluções para telecom',
    description: 'Sistemas sob medida para empresas de telecomunicações: painéis, integrações e automações.',
    features: ['Integração com APIs', 'Painéis de acompanhamento', 'Suporte à operação'],
  },
  {
    id: 'projetos',
    title: 'Projetos sob medida',
    description: 'Sistemas web, dashboards e ferramentas internas para necessidades específicas do seu negócio.',
    features: ['Levantamento de requisitos', 'Desenvolvimento ágil', 'Suporte pós-entrega'],
  },
];
