import { useEffect, useRef, useState } from 'react';
import { ACCENTS, useTheme } from '@/src/theme/ThemeContext';
import styles from './Customizer.module.css';

export function Customizer() {
  const { mode, accent, setMode, setAccent } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-label="Personalizar aparência do site"
        aria-expanded={open}
      >
        🎨
      </button>

      {open && (
        <div className={styles.panel} role="dialog" aria-label="Personalizar aparência">
          <div className={styles.title}>Modo</div>
          <div className={styles.modeRow}>
            <button
              type="button"
              className={`${styles.modeButton} ${mode === 'light' ? styles.modeButtonActive : ''}`}
              onClick={() => setMode('light')}
            >
              Claro
            </button>
            <button
              type="button"
              className={`${styles.modeButton} ${mode === 'dark' ? styles.modeButtonActive : ''}`}
              onClick={() => setMode('dark')}
            >
              Escuro
            </button>
          </div>

          <div className={styles.title}>Cores</div>
          <div className={styles.swatches}>
            {ACCENTS.map((option) => (
              <button
                key={option.key}
                type="button"
                title={option.label}
                aria-label={option.label}
                className={`${styles.swatch} ${accent === option.key ? styles.swatchActive : ''}`}
                style={{ background: `linear-gradient(135deg, ${option.primary}, ${option.secondary})` }}
                onClick={() => setAccent(option.key)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
