import { NextSeo } from 'next-seo';
import { serviceItems } from '@/src/data/services';
import { GlobeIcon, SignalIcon, SparklesIcon, CheckIcon } from '@/src/components/Icons/Icons';
import { INSTAGRAM_DM_URL } from '@/src/lib/constants';
import { Reveal } from '@/src/components/Reveal/Reveal';
import styles from '@/styles/Servicos.module.css';

const SERVICE_ICONS: Record<string, typeof GlobeIcon> = {
  sites: GlobeIcon,
  telecom: SignalIcon,
  projetos: SparklesIcon,
};

export default function Servicos() {
  return (
    <>
      <NextSeo
        title="Serviços — Diogo Zura"
        description="Sites a partir de R$200 e soluções sob medida para empresas de telecom e projetos diversos. Atendimento em Cotia, São Paulo e região, com trabalhos remotos."
        canonical="https://www.diogozura.com/servicos"
      />

      <section className={`container ${styles.hero}`}>
        <h1 className={styles.title}>Serviços</h1>
        <p className={styles.lead}>
          Soluções sob medida para pessoas e empresas, de sites simples a sistemas mais complexos.
        </p>
      </section>

      <section className="container section" style={{ paddingTop: 24 }}>
        <div className={styles.grid}>
          {serviceItems.map((service, i) => {
            const Icon = SERVICE_ICONS[service.id] ?? SparklesIcon;
            return (
              <Reveal key={service.id} className={styles.card} delay={i * 80}>
                <div className={styles.cardIcon}>
                  <Icon />
                </div>
                {service.priceFrom && <span className={styles.price}>{service.priceFrom}</span>}
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className={styles.features}>
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <CheckIcon size={14} className={styles.featureIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <div className={styles.finalCta}>
          <h2>Não sabe exatamente o que precisa?</h2>
          <p>Me conta um pouco sobre o seu negócio e eu te ajudo a encontrar a melhor solução.</p>
          <a href={INSTAGRAM_DM_URL} target="_blank" rel="noreferrer" className="btn" style={{ background: '#fff', color: 'var(--primary)' }}>
            Fale comigo
          </a>
        </div>
      </section>
    </>
  );
}
