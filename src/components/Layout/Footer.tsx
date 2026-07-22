import Link from 'next/link';
import { Logo } from '@/src/components/Logo/Logo';
import { InstagramIcon, MailIcon } from '@/src/components/Icons/Icons';
import { INSTAGRAM_URL } from '@/src/lib/constants';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.col}>
            <Logo />
            <p style={{ marginTop: 12, maxWidth: 320 }}>
              Desenvolvimento de sites e sistemas sob medida, com foco em resultado para negócios de todos os tamanhos — de projetos pessoais a soluções para empresas de telecom. Atendo Cotia, São Paulo e região, além de trabalhos 100% remotos para todo o Brasil.
            </p>
          </div>

          <nav className={styles.links}>
            <Link href="/portfolio">Portfólio</Link>
            <Link href="/servicos">Serviços</Link>
            <Link href="/sobre">Sobre mim</Link>
          </nav>

          <nav className={styles.links}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <InstagramIcon size={16} /> Instagram
            </a>
            <a href="mailto:diogozura@gmail.com">
              <MailIcon size={16} /> diogozura@gmail.com
            </a>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Diogo Zura</span>
          <span>CNPJ 63.778.205/0001-12</span>
        </div>
      </div>
    </footer>
  );
}
