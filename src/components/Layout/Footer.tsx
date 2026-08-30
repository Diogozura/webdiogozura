import Link from 'next/link';
import { Logo } from '@/src/components/Logo/Logo';
import { InstagramIcon, LinkedinIcon, MailIcon } from '@/src/components/Icons/Icons';
import { INSTAGRAM_URL, LINKEDIN_URL } from '@/src/lib/constants';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.col}>
            <Logo />
            <p style={{ marginTop: 12, maxWidth: 320 }}>
              Automação de atendimento com IA para provedores de internet e empresas de telecom, além de sites e sistemas sob medida para negócios de todos os tamanhos. Atendo Cotia, São Paulo e região, além de trabalhos 100% remotos para todo o Brasil.
            </p>
          </div>

          <nav className={styles.links}>
            <Link href="/ixc-opa-suite">IXC + OPA Suite</Link>
            <Link href="/servicos">Serviços</Link>
            <Link href="/portfolio">Portfólio</Link>
            {/* <Link href="/consultoria">Consultoria</Link> */}
            <Link href="/sobre">Sobre mim</Link>
          </nav>

          <nav className={styles.links}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <InstagramIcon size={16} /> Instagram
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              <LinkedinIcon size={16} /> LinkedIn
            </a>
            <a href="mailto:diogozura@gmail.com">
              <MailIcon size={16} /> diogozura@gmail.com
            </a>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Diogo Zura</span>
          <span>CNPJ 63.778.205/0001-12</span>
          <Link href="/politica-de-privacidade">Política de Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}
