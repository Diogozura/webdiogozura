export type ServiceItem = {
  id: string;
  title: string;
  priceFrom?: string;
  description: string;
  features: string[];
  href?: string;
  hrefLabel?: string;
};

export const serviceItems: ServiceItem[] = [
  {
    id: 'telecom',
    title: 'Automação de atendimento para telecom',
    description: 'Implantação de IXC + OPA Suite com IA para provedores de internet: atendimento automatizado, controle de massiva e integrações.',
    features: ['Automação de atendimento com IA', 'Integração IXC + OPA Suite', 'Suporte à operação'],
    href: '/ixc-opa-suite',
    hrefLabel: 'Ver implantação IXC + OPA Suite',
  },
  {
    id: 'sites',
    title: 'Sites e landing pages',
    priceFrom: 'a partir de R$ 200',
    description: 'Sites institucionais, portfólios e páginas de vendas, prontos para captar clientes.',
    features: ['Design responsivo', 'Otimização para SEO', 'Entrega rápida'],
  },
  {
    id: 'projetos',
    title: 'Projetos sob medida',
    description: 'Sistemas web, dashboards e ferramentas internas para necessidades específicas do seu negócio.',
    features: ['Levantamento de requisitos', 'Desenvolvimento ágil', 'Suporte pós-entrega'],
  },
];
