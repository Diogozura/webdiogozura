import Image from 'next/image';

type LogoProps = {
  showWordmark?: boolean;
  size?: number;
};

export function Logo({ showWordmark = true, size = 36 }: LogoProps) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <Image
        src="/logo-simbolo-diogo-zura.png"
        alt="Diogo Zura"
        width={size}
        height={size}
        priority
      />
      {showWordmark && (
        <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: -0.3 }}>
          diogo<span style={{ color: 'var(--secondary)' }}>zura</span>
        </span>
      )}
    </span>
  );
}
