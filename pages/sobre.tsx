import { NextSeo } from 'next-seo';
import { Reveal } from '@/src/components/Reveal/Reveal';
import styles from '@/styles/Sobre.module.css';

const TIMELINE = [
  {
    age: '17',
    title: 'Início na escola',
    text: 'Comecei a desenvolver e passei a fazer parte da equipe de tecnologia da escola, ajudando em diversos projetos no ensino médio.',
  },
  {
    age: '18',
    title: 'Primeiro projeto de empresa',
    text: 'Tive meu primeiro contato com um projeto real de empresa, saindo dos projetos de estudo para o mercado.',
  },
  {
    age: '19-20',
    title: 'Estágio em RH',
    text: 'Trabalhei como estagiário em uma empresa de RH, ganhando experiência além do TI e uma visão mais ampla de negócio.',
  },
  {
    age: '20+',
    title: 'Freelas na Workana',
    text: 'Me arrisquei na Workana, pegando projetos bem diferentes do escopo tradicional e ampliando minha experiência.',
  },
  {
    age: 'Hoje',
    title: 'Pronto para ajudar',
    text: 'Agora estou aqui, pronto para te ajudar e ajudar a sua empresa a crescer com tecnologia.',
  },
];

export default function Sobre() {
  return (
    <>
      <NextSeo
        title="Sobre mim — Diogo Zura"
        description="Conheça a jornada de Diogo Zura na programação, dos 17 anos até hoje. Desenvolvedor em Cotia, São Paulo, com atendimento remoto para todo o Brasil."
        canonical="https://www.diogozura.com/sobre"
      />

      <section className={`container ${styles.hero}`}>
        <h1 className={styles.title}>Sobre mim</h1>
        <p className={styles.lead}>
          Sou o Diogo Zura, desenvolvedor desde os 17 anos. Essa é a minha jornada até aqui.
        </p>
      </section>

      <section className="container section">
        <div className={styles.timeline}>
          {TIMELINE.map((item, i) => (
            <Reveal key={item.age} className={styles.item} delay={i * 70}>
              <span className={styles.age}>{item.age}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
