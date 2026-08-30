import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextSeo, BreadcrumbJsonLd, FAQPageJsonLd } from 'next-seo';
import {
  ixcOpaFeatures,
  ixcOpaCompareRows,
  ixcOpaSteps,
  ixcOpaFaq,
  type IxcOpaFeature,
} from '@/src/data/ixcOpaSuite';
import { INSTAGRAM_URL } from '@/src/lib/constants';
import { Reveal } from '@/src/components/Reveal/Reveal';
import {
  BoltIcon,
  ClockIcon,
  SignalIcon,
  ChartBarIcon,
  StarIcon,
  ChatIcon,
  InvoiceIcon,
  MailIcon,
  InstagramIcon,
} from '@/src/components/Icons/Icons';
import styles from '@/styles/IxcOpaSuite.module.css';

const PAGE_URL = 'https://www.diogozura.com/ixc-opa-suite';

const FEATURE_ICONS: Record<IxcOpaFeature['icon'], typeof BoltIcon> = {
  bolt: BoltIcon,
  clock: ClockIcon,
  signal: SignalIcon,
  chart: ChartBarIcon,
  star: StarIcon,
  chat: ChatIcon,
  invoice: InvoiceIcon,
};

const SERVICE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Implantação de IXC Provedor e OPA Suite',
  serviceType: 'Implantação e integração de sistema de gestão e atendimento com IA para provedores de internet',
  description:
    'Implantação e integração de IXC Provedor (ERP) e OPA Suite (atendimento omnichannel com IA) para provedores de internet: automação de atendimento, controle de massiva, boleto automático e relatórios.',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Diogo Zura',
    url: 'https://www.diogozura.com',
    email: 'contato@diogozura.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cotia',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
  },
  areaServed: { '@type': 'Country', name: 'Brasil' },
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Provedores de internet (ISPs) e empresas de telecomunicações',
  },
  url: PAGE_URL,
};

const QUEUE_ROWS = [
  { label: '2ª via de boleto', tag: 'ia' as const, value: '8s' },
  { label: 'Sem conexão · área da massiva', tag: 'ia' as const, value: '11s' },
  { label: 'Alteração de plano', tag: 'hum' as const, value: '—' },
  { label: 'Desbloqueio de confiança', tag: 'ia' as const, value: '6s' },
];

export default function IxcOpaSuite() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function tick() {
      const el = clockRef.current;
      if (!el) return;
      const d = new Date();
      el.textContent = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
    tick();
    const clockInterval = setInterval(tick, 20000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bar = barRef.current;
    const pct = pctRef.current;
    if (!bar || !pct) return;

    const alvo = 80;
    const timer = setTimeout(() => {
      bar.style.width = `${alvo}%`;
      if (reduce) {
        pct.textContent = String(alvo);
        return;
      }
      let start: number | null = null;
      let raf = 0;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / 1500, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        pct.textContent = String(Math.round(alvo * eased));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, 420);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let lanes: { y: number; amp: number; phase: number; w: number }[] = [];
    let pulses: { lane: number; x: number; speed: number; len: number }[] = [];
    const cols = { line: '#1257e5', glow: '#12a9c8', alpha: 0.16 };

    function readColors() {
      const cs = getComputedStyle(host as HTMLElement);
      cols.line = (cs.getPropertyValue('--primary') || '#1257e5').trim();
      cols.glow = (cs.getPropertyValue('--secondary') || '#12a9c8').trim();
      cols.alpha = 0.16;
    }

    function newPulse(laneIdx: number, x?: number) {
      return {
        lane: laneIdx,
        x: x === undefined ? -120 : x,
        speed: 90 + Math.random() * 150,
        len: 90 + Math.random() * 150,
      };
    }

    function build() {
      const r = (host as HTMLElement).getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(r.width, 1);
      H = Math.max(r.height, 1);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      lanes = [];
      const n = Math.max(6, Math.round(H / 74));
      for (let i = 0; i < n; i++) {
        const y = (i + 0.5) * (H / n);
        lanes.push({ y, amp: 5 + (i % 3) * 4, phase: i * 1.1, w: i % 4 === 0 ? 1.15 : 0.7 });
      }
      pulses = [];
      for (let j = 0; j < Math.min(7, n); j++) {
        pulses.push(newPulse(Math.floor(Math.random() * lanes.length), Math.random() * W));
      }
    }

    function laneY(l: { y: number; amp: number; phase: number }, x: number, t: number) {
      return l.y + Math.sin(x / 320 + l.phase + t * 0.18) * l.amp;
    }

    function drawLanes(t: number) {
      ctx!.lineCap = 'round';
      for (const l of lanes) {
        ctx!.beginPath();
        for (let x = 0; x <= W; x += 14) {
          const y = laneY(l, x, t);
          if (x === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = cols.line;
        ctx!.globalAlpha = cols.alpha * (l.w > 1 ? 1 : 0.62);
        ctx!.lineWidth = l.w;
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;
    }

    function drawPulses(t: number) {
      for (const p of pulses) {
        const l = lanes[p.lane];
        if (!l) continue;
        const x0 = p.x - p.len;
        const x1 = p.x;
        const g = ctx!.createLinearGradient(x0, 0, x1, 0);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(1, cols.glow);
        ctx!.beginPath();
        const startX = Math.max(x0, 0);
        let first = true;
        for (let x = startX; x <= Math.min(x1, W); x += 8) {
          const y = laneY(l, x, t);
          if (first) {
            ctx!.moveTo(x, y);
            first = false;
          } else ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = g;
        ctx!.lineWidth = 1.9;
        ctx!.globalAlpha = 0.9;
        ctx!.stroke();

        if (x1 >= 0 && x1 <= W) {
          const hy = laneY(l, x1, t);
          ctx!.beginPath();
          ctx!.arc(x1, hy, 2.1, 0, Math.PI * 2);
          ctx!.fillStyle = cols.glow;
          ctx!.fill();
        }
        ctx!.globalAlpha = 1;
      }
    }

    let last = 0;
    let elapsed = 0;
    let raf: number | null = null;

    function frame(ts: number) {
      const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0.016;
      last = ts;
      elapsed += dt;
      ctx!.clearRect(0, 0, W, H);
      drawLanes(elapsed);
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        p.x += p.speed * dt;
        if (p.x - p.len > W) pulses[i] = newPulse(Math.floor(Math.random() * lanes.length));
      }
      drawPulses(elapsed);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      readColors();
      build();
      if (raf) cancelAnimationFrame(raf);
      if (reduce) {
        ctx!.clearRect(0, 0, W, H);
        drawLanes(0);
        return;
      }
      last = 0;
      raf = requestAnimationFrame(frame);
    }

    start();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(start, 160);
    };
    window.addEventListener('resize', onResize);

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      } else if (!reduce && !raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      clearTimeout(resizeTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.page}>
      <NextSeo
        title="Implantação IXC + OPA Suite para Provedores de Internet — Diogo Zura"
        description="Implantação de IXC Provedor e OPA Suite com IA para provedores de internet: até 80% do atendimento resolvido sem operador, 24h por dia, controle de massiva, boleto automático e relatórios precisos."
        canonical={PAGE_URL}
        openGraph={{
          type: 'website',
          url: PAGE_URL,
          title: 'Implantação IXC + OPA Suite para Provedores de Internet',
          description:
            'Até 80% do atendimento resolvido sem operador, 24h por dia, com IA. Software moldado para a operação do seu provedor de internet.',
          locale: 'pt_BR',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'implantação IXC provedor, OPA Suite, automação de atendimento para provedor de internet, chatbot IA para telecom, atendimento automatizado ISP, integração IXC OPA Suite, sistema para provedor de internet',
          },
        ]}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSON_LD) }}
        />
      </Head>
      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: 'Início', item: 'https://www.diogozura.com' },
          { position: 2, name: 'Serviços', item: 'https://www.diogozura.com/servicos' },
          { position: 3, name: 'IXC + OPA Suite', item: PAGE_URL },
        ]}
      />
      <FAQPageJsonLd
        mainEntity={ixcOpaFaq.map((item) => ({
          name: item.question,
          answerCount: 1,
          acceptedAnswer: { text: item.answer },
        }))}
      />

      <section className={styles.hero}>
        <canvas ref={canvasRef} className={styles.fibraCanvas} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div>
            <span className={styles.eyebrow}>Implantação IXC Provedor + OPA Suite</span>
            <h1 className={styles.title}>
              Mais <span className="gradientText">economia</span> para o seu provedor de internet.
            </h1>
            <p className={styles.lead}>
              Até 80% do atendimento resolvido sem operador humano, 24 horas por dia, com IA treinada
              no contexto do seu provedor. Software moldado para a sua operação — não o contrário.
            </p>
            <div className={styles.heroActions}>
              <a className="btn btnPrimary" href="#contato">
                Quero um diagnóstico
              </a>
              <a className="btn btnGhost" href="#recursos">
                Ver o que entra no pacote
              </a>
            </div>
            <p className={styles.heroNote}>
              <span className={styles.dot} /> Automação e tecnologia já aplicadas em provedores reais,
              como <Link href="/portfolio">Grajaú Fibra e VNT Fibra</Link>.
            </p>
          </div>

          <Reveal className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.panelHeadTag}>Fila de atendimento</span>
              <span ref={clockRef} className={`${styles.panelHeadTag} ${styles.panelHeadRight}`}>
                00:00
              </span>
            </div>
            <div className={styles.rows}>
              {QUEUE_ROWS.map((row) => (
                <div key={row.label} className={styles.row}>
                  <span className={styles.rowLabel}>{row.label}</span>
                  <span className={`${styles.tag} ${row.tag === 'ia' ? styles.tagIa : styles.tagHum}`}>
                    {row.tag === 'ia' ? 'IA' : 'Humano'}
                  </span>
                  <span className={styles.rowValue}>{row.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.panelFoot}>
              <div className={styles.panelStat}>
                <span>Resolvido sem operador</span>
                <b>
                  <span ref={pctRef}>0</span>%
                </b>
              </div>
              <div className={styles.bar}>
                <span ref={barRef} className={styles.barFill} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className={styles.strip}>
        <div className={`container ${styles.stripGrid}`}>
          <div className={styles.metric}>
            <span className={styles.metricValue}>80%</span>
            <span className={styles.metricLabel}>do atendimento resolvido sem humano</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricValue}>24h</span>
            <span className={styles.metricLabel}>operação e emissão de boleto, todo dia</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricValue}>R$ 0</span>
            <span className={styles.metricLabel}>de custo extra na pesquisa de satisfação</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricValue}>1x</span>
            <span className={styles.metricLabel}>configuração de massiva atinge toda a área afetada</span>
          </div>
        </div>
      </div>

      <section id="recursos" className="container section">
        <div>
          <p className={styles.eyebrow}>O que entra na operação</p>
          <h2 style={{ marginTop: 12 }}>Sete frentes que tiram peso da sua equipe.</h2>
          <p className={styles.lead} style={{ marginTop: 16 }}>
            Cada item abaixo já roda em provedores reais. Nada aqui é módulo experimental: é
            configuração validada, ajustada ao fluxo que a sua central já usa.
          </p>
        </div>

        <div className={styles.featsGrid} style={{ marginTop: 40 }}>
          {ixcOpaFeatures.map((feature, i) => {
            const Icon = FEATURE_ICONS[feature.icon];
            return (
              <Reveal
                key={feature.id}
                className={`${styles.feat} ${feature.wide ? styles.featWide : ''}`}
                delay={i * 60}
              >
                <Icon size={30} className={styles.featIcon} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className={styles.featTag}>{feature.tag}</span>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="comparativo" className="container section" style={{ paddingTop: 0 }}>
        <p className={styles.eyebrow}>Onde o dinheiro escapa hoje</p>
        <h2 style={{ marginTop: 12, maxWidth: '18ch' }}>
          O custo não está no sistema. Está na repetição.
        </h2>
        <p className={styles.lead} style={{ marginTop: 16, marginBottom: 40 }}>
          A maior parte do que ocupa a sua central é pergunta repetida, com resposta que o próprio
          sistema já tem. É esse pedaço que sai da mão do operador.
        </p>

        <Reveal className={styles.compareWrap}>
          <table className={styles.ctable}>
            <thead>
              <tr>
                <th>Situação</th>
                <th>Operação sem automação</th>
                <th>Com IXC + OPA Suite</th>
              </tr>
            </thead>
            <tbody>
              {ixcOpaCompareRows.map((row) => (
                <tr key={row.situation}>
                  <td>{row.situation}</td>
                  <td className={styles.antes}>{row.before}</td>
                  <td className={styles.depois}>{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      <section id="implantacao" className="container section" style={{ paddingTop: 0 }}>
        <p className={styles.eyebrow}>Como funciona o trabalho</p>
        <h2 style={{ marginTop: 12, maxWidth: '20ch' }}>Software moldado para a sua necessidade.</h2>
        <p className={styles.lead} style={{ marginTop: 16, marginBottom: 40 }}>
          Nada de pacote fechado. A ordem abaixo é a mesma em todo projeto, porque cada etapa depende
          do que a anterior levantou.
        </p>

        <div className={styles.stepsGrid}>
          {ixcOpaSteps.map((step) => (
            <Reveal key={step.n} className={styles.step}>
              <span className={styles.stepNum}>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="plataformas" className="container section" style={{ paddingTop: 0 }}>
        <p className={styles.eyebrow}>As duas pontas</p>
        <h2 style={{ marginTop: 12, maxWidth: '22ch' }}>
          IXC e OPA Suite, trabalhando como um sistema só.
        </h2>
        <p className={styles.lead} style={{ marginTop: 16, marginBottom: 40 }}>
          Separados, cada um resolve metade do problema. Integrados, o atendimento passa a enxergar o
          cadastro, o contrato e o financeiro no mesmo lugar.
        </p>

        <div className={styles.duo}>
          <Reveal className={styles.prod}>
            <div>
              <div className={styles.prodRole}>Gestão do provedor</div>
              <div className={styles.prodName}>IXC Provedor</div>
            </div>
            <p>
              <strong>IXC Provedor é o ERP</strong> usado por provedores de internet para cadastro de
              clientes, contratos, financeiro, ordens de serviço e controle de rede — o núcleo da
              operação, num sistema só.
            </p>
            <ul className={styles.prodList}>
              <li>Base de clientes e contratos centralizada</li>
              <li>Financeiro, cobrança e emissão de boleto</li>
              <li>Ordens de serviço e agenda técnica</li>
              <li>Controle de rede e provisionamento</li>
            </ul>
          </Reveal>
          <Reveal className={styles.prod}>
            <div>
              <div className={styles.prodRole}>Atendimento omnichannel</div>
              <div className={styles.prodName}>OPA Suite</div>
            </div>
            <p>
              <strong>OPA Suite é a plataforma de atendimento com IA</strong> que centraliza WhatsApp e
              demais canais numa fila só, com automação, chatbot e indicadores em cima de cada
              atendimento.
            </p>
            <ul className={styles.prodList}>
              <li>WhatsApp e demais canais em fila unificada</li>
              <li>Chatbot e fluxos automatizados com IA</li>
              <li>Aviso de massiva e disparos para a base</li>
              <li>Pesquisa de satisfação e relatórios por operador</li>
            </ul>
          </Reveal>
        </div>

        <Reveal className={styles.proofBand}>
          <p>
            Já usa um dos dois e quer integrar ao outro? Esse é exatamente o ponto onde a maioria dos
            provedores trava — e onde a implantação costuma se pagar mais rápido. Veja outros
            projetos de automação para provedores no <Link href="/portfolio">portfólio</Link>.
          </p>
          <a className="btn btnGhost" href="#contato">
            Falar sobre a sua operação
          </a>
        </Reveal>
      </section>

      <section id="duvidas" className="container section" style={{ paddingTop: 0 }}>
        <p className={styles.eyebrow}>Perguntas frequentes</p>
        <h2 style={{ marginTop: 12, maxWidth: '22ch' }}>
          O que os provedores perguntam antes de fechar.
        </h2>
        <p className={styles.lead} style={{ marginTop: 16, marginBottom: 24 }}>
          Se a sua dúvida não estiver aqui, me chame direto — respondo pessoalmente.
        </p>

        <div className={styles.faq}>
          {ixcOpaFaq.map((item, i) => (
            <details key={item.question} className={styles.faqItem} open={i === 0}>
              <summary>{item.question}</summary>
              <div className={styles.faqAnswer}>{item.answer}</div>
            </details>
          ))}
        </div>
      </section>

      <div className={`section ${styles.ctaBand}`} id="contato">
        <div className={`container ${styles.ctaGrid}`}>
          <Reveal>
            <p className={styles.eyebrow}>Próximo passo</p>
            <h2 style={{ marginTop: 12, marginBottom: 18, maxWidth: '20ch' }}>
              Vamos olhar os números da sua central antes de falar em contrato.
            </h2>
            <p className={styles.lead}>
              Me mande como funciona o seu atendimento hoje: canais, volume aproximado e tamanho da
              equipe. Eu retorno com o que dá para automatizar primeiro e o impacto esperado — sem
              compromisso.
            </p>
          </Reveal>
          <Reveal className={styles.contactCard}>
            <a
              className={styles.contactLine}
              href="mailto:contato@diogozura.com?subject=Implanta%C3%A7%C3%A3o%20IXC%20%2B%20OPA%20Suite"
            >
              <MailIcon size={19} />
              contato@diogozura.com
            </a>
            <a className={styles.contactLine} href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <InstagramIcon size={19} />
              Instagram
            </a>
            <div className={styles.contactMeta}>
              Diogo · Cotia — SP
              <br />
              Atendimento remoto para todo o Brasil
              <br />
              CNPJ 63.778.205/0001-12
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
