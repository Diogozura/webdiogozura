export const AREA_OPTIONS = [
  'Personal Trainer',
  'Dentista',
  'Médico',
  'Psicólogo',
  'Advogado',
  'Restaurante',
  'Autoescola',
  'Professor/Instrutor',
  'Salão de Beleza',
  'Telecom',
  'Outros',
] as const;

export const CONTACT_CHANNELS = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'whatsapp', label: 'WhatsApp' },
] as const;

export type ContactChannel = (typeof CONTACT_CHANNELS)[number]['key'];

export type ContactFlowData = {
  area: string;
  areaCustom: string;
  aboutBusiness: string;
  hasLogo: 'sim' | 'nao' | '';
  hasDomain: 'sim' | 'nao' | '';
  domain: string;
  colorPreference: string;
  colorNotes: string;
  address: string;
  hours: string;
  services: string;
  contactChannel: ContactChannel | '';
  contactHandle: string;
  businessName: string;
  city: string;
  whatsapp: string;
  hasGoogleBusiness: 'sim' | 'nao' | '';
  googleBusinessLink: string;
};

export const EMPTY_CONTACT_FLOW_DATA: ContactFlowData = {
  area: '',
  areaCustom: '',
  aboutBusiness: '',
  hasLogo: '',
  hasDomain: '',
  domain: '',
  colorPreference: '',
  colorNotes: '',
  address: '',
  hours: '',
  services: '',
  contactChannel: '',
  contactHandle: '',
  businessName: '',
  city: '',
  whatsapp: '',
  hasGoogleBusiness: '',
  googleBusinessLink: '',
};

export function buildContactMessage(data: ContactFlowData): string {
  const area = data.area === 'Outros' && data.areaCustom ? data.areaCustom : data.area;
  const yesNo = (v: string) => (v === 'sim' ? 'Sim' : v === 'nao' ? 'Não' : '-');

  const lines = [
    'Olá Diogo, vim pelo seu site, segue as informações do projeto:',
    '',
    `Área de atuação: ${area || '-'}`,
    `Sobre a empresa: ${data.aboutBusiness || '-'}`,
    `Já tem logo: ${yesNo(data.hasLogo)}`,
    `Já tem domínio: ${yesNo(data.hasDomain)}${data.hasDomain === 'sim' && data.domain ? ` (${data.domain})` : ''}`,
    `Cor desejada para o site: ${data.colorPreference || '-'}${data.colorNotes ? ` — ${data.colorNotes}` : ''}`,
    `Endereço: ${data.address || '-'}`,
    `Funcionamento: ${data.hours || '-'}`,
    `Serviços oferecidos: ${data.services || '-'}`,
    `Nome do negócio: ${data.businessName || '-'}`,
    `Cidade/região atendida: ${data.city || '-'}`,
    `WhatsApp: ${data.whatsapp || '-'}`,
    `Perfil no Google Meu Negócio: ${yesNo(data.hasGoogleBusiness)}${data.hasGoogleBusiness === 'sim' && data.googleBusinessLink ? ` (${data.googleBusinessLink})` : ''}`,
    `Prefere ser contatado por: ${data.contactChannel === 'instagram' ? 'Instagram' : data.contactChannel === 'whatsapp' ? 'WhatsApp' : '-'}${data.contactHandle ? ` (${data.contactHandle})` : ''}`,
  ];

  return lines.join('\n');
}
