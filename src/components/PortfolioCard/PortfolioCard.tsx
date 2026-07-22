import Image from 'next/image';
import { PortfolioItem } from '@/src/data/portfolio';
import { SignalIcon, ArrowRightIcon } from '@/src/components/Icons/Icons';
import styles from './PortfolioCard.module.css';

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className={styles.card}>
      <div
        className={item.logo ? styles.thumbLogo : styles.thumb}
        data-bg={item.logo && item.logoBg ? item.logoBg : undefined}
      >
        {item.logo ? (
          <Image src={item.logo} alt={`Logo ${item.title}`} width={140} height={140} style={{ objectFit: 'contain', maxHeight: '100%' }} />
        ) : (
          <SignalIcon size={36} className={styles.thumbIcon} />
        )}
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className={styles.tags}>
        {item.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      {item.url && (
        <a href={item.url} target="_blank" rel="noreferrer" className={styles.link}>
          Visitar site <ArrowRightIcon size={14} />
        </a>
      )}
    </article>
  );
}
