import { NextSeo } from 'next-seo';
import { portfolioItems } from '@/src/data/portfolio';
import { PortfolioCard } from '@/src/components/PortfolioCard/PortfolioCard';
import { Reveal } from '@/src/components/Reveal/Reveal';
import styles from '@/styles/Portfolio.module.css';

export default function Portfolio() {
  const sites = portfolioItems.filter((item) => item.category === 'site');
  const complexos = portfolioItems.filter((item) => item.category === 'complexo');

  return (
    <>
      <NextSeo
        title="Portfólio — Diogo Zura"
        description="Projetos de sites e sistemas desenvolvidos por Diogo Zura para clientes em Cotia, São Paulo e região, além de projetos remotos."
        canonical="https://www.diogozura.com/portfolio"
      />

      <section className={`container ${styles.hero}`}>
        <h1 className={styles.title}>Portfólio</h1>
        <p className={styles.lead}>
          Alguns exemplos do que já desenvolvi. Em atualização com projetos reais.
        </p>
      </section>

      <section className="container section" style={{ paddingTop: 24 }}>
        <h2 className={styles.groupTitle}>Sites</h2>
        <p className={styles.groupLead}>Sites institucionais e páginas para profissionais e pequenos negócios.</p>
        <div className={styles.grid}>
          {sites.map((item, i) => (
            <Reveal key={item.id} delay={i * 70}>
              <PortfolioCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container section" style={{ paddingTop: 0 }}>
        <h2 className={styles.groupTitle}>Projetos complexos</h2>
        <p className={styles.groupLead}>Sistemas e soluções sob medida para empresas de telecom.</p>
        <div className={styles.grid}>
          {complexos.map((item, i) => (
            <Reveal key={item.id} delay={i * 70}>
              <PortfolioCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
