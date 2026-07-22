import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { portfolioItems } from '@/src/data/portfolio';
import { PortfolioCard } from '@/src/components/PortfolioCard/PortfolioCard';
import { ContactFlow } from '@/src/components/ContactFlow/ContactFlow';
import { Reveal } from '@/src/components/Reveal/Reveal';
import { GlobeIcon, SignalIcon, SparklesIcon, ArrowRightIcon } from '@/src/components/Icons/Icons';
import { INSTAGRAM_DM_URL } from '@/src/lib/constants';
import styles from '@/styles/Home.module.css';

const teaserItems = portfolioItems.filter((item) => item.category === 'site');

export default function Home() {
  return (
    <>
      <NextSeo
        title="Diogo Zura — Sites e sistemas sob medida em Cotia e região de SP"
        description="Desenvolvimento de sites a partir de R$200 e soluções sob medida para empresas de telecom e projetos diversos. Atendimento em Cotia, São Paulo e região, com trabalhos remotos para todo o Brasil."
        canonical="https://www.diogozura.com/"
      />

      <section className={`container ${styles.hero}`}>
        <span className={styles.badge}>Sites a partir de R$ 200</span>
        <h1 className={styles.title}>
          Sites e sistemas <span className="gradientText">sob medida</span> para o seu negócio crescer
        </h1>
        <p className={styles.subtitle}>
          Desenvolvo sites, dashboards e soluções para empresas de telecom e projetos diversos —
          do primeiro site institucional a sistemas mais complexos.
        </p>
        <p className={styles.location}>📍 Atendo Cotia, São Paulo e região — e 100% remoto para todo o Brasil.</p>
        <div className={styles.ctaRow}>
          <a href={INSTAGRAM_DM_URL} target="_blank" rel="noreferrer" className="btn btnPrimary">
            Fale comigo
          </a>
          <Link href="/portfolio" className="btn btnGhost">
            Ver portfólio
          </Link>
        </div>

        <div className={styles.highlights}>
          <Reveal className={styles.highlightCard} delay={0}>
            <div className={styles.highlightIcon}>
              <GlobeIcon />
            </div>
            <h3>Sites a partir de R$ 200</h3>
            <p>Páginas rápidas, responsivas e prontas para captar clientes, com preço acessível para começar.</p>
          </Reveal>
          <Reveal className={styles.highlightCard} delay={80}>
            <div className={styles.highlightIcon}>
              <SignalIcon />
            </div>
            <h3>Soluções para telecom</h3>
            <p>Sistemas e painéis sob medida para operações de empresas de telecomunicações.</p>
          </Reveal>
          <Reveal className={styles.highlightCard} delay={160}>
            <div className={styles.highlightIcon}>
              <SparklesIcon />
            </div>
            <h3>Projetos diversos</h3>
            <p>De ferramentas internas a plataformas completas, adaptadas para a realidade da sua empresa.</p>
          </Reveal>
        </div>
      </section>

      <section className="container section">
        <Reveal className={styles.aboutTeaser}>
          <div>
            <div className={styles.sectionHead} style={{ marginBottom: 16 }}>
              <h2>Quem está por trás do código</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
              Sou o Diogo Zura, desenvolvedor desde os 17 anos. Já passei pela equipe de tecnologia da
              escola, projetos de empresas, um estágio em RH e diversos projetos via Workana — hoje estou
              pronto para ajudar você e sua empresa.
            </p>
            <Link href="/sobre" className="btn btnGhost">
              Conhecer minha história
            </Link>
          </div>
          <div className={styles.aboutCard}>
            <p>
              &ldquo;Pronto para te ajudar e ajudar a sua empresa a crescer com tecnologia.&rdquo;
            </p>
          </div>
        </Reveal>
      </section>

      <section className="container section">
        <Reveal className={styles.sectionHead}>
          <h2>Projetos</h2>
          <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Ver todos os projetos <ArrowRightIcon size={14} />
          </Link>
        </Reveal>
        <div className={styles.portfolioGrid}>
          {teaserItems.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <PortfolioCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container section">
        <Reveal
          className={styles.sectionHead}
          style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', marginBottom: 32 }}
        >
          <h2>Vamos construir o próximo projeto juntos?</h2>
          <p style={{ color: 'var(--text-muted)' }}>Conta pra mim o que você precisa, é rapidinho.</p>
        </Reveal>
        <ContactFlow />
      </section>
    </>
  );
}
