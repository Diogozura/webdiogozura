import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Logo } from '@/src/components/Logo/Logo';
import { Customizer } from '@/src/components/Customizer/Customizer';
import styles from './Header.module.css';

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/ixc-opa-suite', label: 'IXC + OPA Suite' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/portfolio', label: 'Portfólio' },
  { href: '/sobre', label: 'Sobre' },
  // { href: '/consultoria', label: 'Consultoria' },
];

export function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.bar}>
          <Link href="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className={styles.nav}>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${router.pathname === link.href ? styles.navLinkActive : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Customizer />
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menu"
              aria-expanded={open}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <div className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ''}`}>
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
