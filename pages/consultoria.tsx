import { NextSeo } from 'next-seo';
import { consultoriaItems } from '@/src/data/consultoria';
import { INSTAGRAM_DM_URL, YASMIN_INSTAGRAM_URL, INSTAGRAM_URL } from '@/src/lib/constants';
import { Reveal } from '@/src/components/Reveal/Reveal';
import styles from '@/styles/Consultoria.module.css';

const DUO = [
  {
    id: 'tico',
    emoji: '🐿️',
    tag: 'Tico',
    name: 'Yasmin',
    bio: 'Metade da dupla, especialista em fofoca boa, café e network que rende risada.',
    href: YASMIN_INSTAGRAM_URL,
    handle: '@ysxmni',
  },
  {
    id: 'teco',
    emoji: '🐿️',
    tag: 'Teco',
    name: 'Diogo',
    bio: 'Outra metade da dupla, sempre pronto pra treino, amizade e trocar ideia sobre a vida.',
    href: INSTAGRAM_URL,
    handle: '@diogo_zra',
  },
];

const FLOATERS = [
  { emoji: '🤝', top: '12%', left: '8%', delay: '0s' },
  { emoji: '☕', top: '20%', left: '85%', delay: '1.2s' },
  { emoji: '🎉', top: '65%', left: '5%', delay: '0.6s' },
  { emoji: '🌐', top: '70%', left: '90%', delay: '1.8s' },
];

export default function Consultoria() {
  return (
    <div className={styles.page}>
      <NextSeo
        title="Consultoria Tico e Teco — Diogo Zura"
        description="Consultoria Tico e Teco em amizade, network, treinos, café, fofocas e muito mais. 100% descontraída."
        canonical="https://www.diogozura.com/consultoria"
      />

      <section className={`container ${styles.hero}`}>
        <div className={styles.floaters}>
          {FLOATERS.map((f) => (
            <span
              key={f.emoji}
              className={styles.floater}
              style={{ top: f.top, left: f.left, animationDelay: f.delay }}
            >
              {f.emoji}
            </span>
          ))}
        </div>

        <span className={styles.badge}>😄 100% descontraída</span>
        <h1 className={styles.title}>Consultoria Tico e Teco</h1>
        <p className={styles.lead}>
          Amizade, network, treinos, café, fofocas e muito mais. A consultoria mais divertida
          (e sem powerpoint) que você vai encontrar. 🎉
        </p>

        <div className={styles.ctaRow}>
          <a href={INSTAGRAM_DM_URL} target="_blank" rel="noreferrer" className="btn btnPrimary">
            Bora bater um papo 💬
          </a>
        </div>
      </section>

      <section className="container section" style={{ paddingTop: 24 }}>
        <div className={styles.grid}>
          {consultoriaItems.map((item, i) => (
            <Reveal key={item.id} className={styles.card} delay={i * 80}>
              <div className={styles.cardEmoji}>{item.emoji}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>

        <div className={styles.duoIntro}>
          <span className={styles.partnerTag}>Quem somos</span>
          <h2>Tico e Teco</h2>
          <p>A dupla por trás da consultoria mais descontraída que você vai encontrar.</p>
        </div>

        <div className={styles.duoGrid}>
          {DUO.map((person) => (
            <Reveal key={person.id} className={styles.partner}>
              <div className={styles.partnerAvatar}>{person.emoji}</div>
              <div>
                <span className={styles.partnerTag}>{person.tag}</span>
                <h3>{person.name}</h3>
                <p>{person.bio}</p>
                <a href={person.href} target="_blank" rel="noreferrer" className={styles.partnerLink}>
                  {person.handle} ↗
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <div className={styles.finalCta}>
          <h2>Vaga de consultor(a) de vida disponível 😎</h2>
          <p>Sem contrato, sem burocracia — só chamar e marcar o café.</p>
          <a href={INSTAGRAM_DM_URL} target="_blank" rel="noreferrer" className="btn" style={{ background: '#fff', color: 'var(--primary)' }}>
            Chama no Instagram
          </a>
          <div className={styles.finalEmojis}>🤝 ☕ 🏋️ 🌐 🗣️ 🎉</div>
        </div>
      </section>
    </div>
  );
}
