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
        title="Diogo Zura — Automação de Atendimento para Provedores de Internet e Telecom"
        description="Implantação de automação de atendimento com IA (IXC + OPA Suite) para provedores de internet e empresas de telecom, além de sites e sistemas sob medida. Atendimento em Cotia, São Paulo e região, com trabalhos remotos para todo o Brasil."
        canonical="https://www.diogozura.com"
      />

      <section className={`container ${styles.hero}`}>
        <span className={styles.badge}>Automação de atendimento com IA para telecom</span>
        <h1 className={styles.title}>
          Automação de atendimento e sistemas <span className="gradientText">sob medida</span> para o seu negócio crescer
        </h1>
        <p className={styles.subtitle}>
          Implanto automação de atendimento com IA para provedores de internet e empresas de telecom
          — e desenvolvo sites e sistemas sob medida para outros negócios, do institucional ao mais complexo.
        </p>
        <p className={styles.location}>📍 Atendo Cotia, São Paulo e região — e 100% remoto para todo o Brasil.</p>
        <div className={styles.ctaRow}>
          <Link href="/ixc-opa-suite" className="btn btnPrimary">
            Ver implantação IXC + OPA Suite
          </Link>
          <a href={INSTAGRAM_DM_URL} target="_blank" rel="noreferrer" className="btn btnGhost">
            Fale comigo
          </a>
        </div>

        <div className={styles.highlights}>
          <Reveal className={styles.highlightCard} delay={0}>
            <div className={styles.highlightIcon}>
              <SignalIcon />
            </div>
            <h3>Automação para provedores de telecom</h3>
            <p>Implantação de IXC + OPA Suite com IA: atendimento automatizado, controle de massiva e boleto automático.</p>
            <Link href="/ixc-opa-suite" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, fontWeight: 600 }}>
              Saiba mais <ArrowRightIcon size={14} />
            </Link>
          </Reveal>
          <Reveal className={styles.highlightCard} delay={80}>
            <div className={styles.highlightIcon}>
              <GlobeIcon />
            </div>
            <h3>Sites a partir de R$ 200</h3>
            <p>Páginas rápidas, responsivas e prontas para captar clientes, com preço acessível para começar.</p>
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
