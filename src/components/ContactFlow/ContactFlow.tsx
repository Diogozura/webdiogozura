import { useState } from 'react';
import {
  AREA_OPTIONS,
  CONTACT_CHANNELS,
  EMPTY_CONTACT_FLOW_DATA,
  buildContactMessage,
  type ContactFlowData,
} from '@/src/data/contactFlow';
import { ACCENTS } from '@/src/theme/ThemeContext';
import { INSTAGRAM_DM_URL } from '@/src/lib/constants';
import styles from './ContactFlow.module.css';

const STEP_COUNT = 5;

export function ContactFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ContactFlowData>(EMPTY_CONTACT_FLOW_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState<boolean | null>(null);

  function update<K extends keyof ContactFlowData>(key: K, value: ContactFlowData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function handleReset() {
    setStep(0);
    setData(EMPTY_CONTACT_FLOW_DATA);
    setSubmitted(false);
    setCopied(null);
  }

  const isStepValid = (): boolean => {
    if (step === 0) return data.area !== '' && (data.area !== 'Outros' || data.areaCustom.trim() !== '');
    if (step === 1) return data.aboutBusiness.trim() !== '';
    if (step === 3) return data.contactChannel !== '' && data.contactHandle.trim() !== '';
    return true;
  };

  async function handleSubmit() {
    const message = buildContactMessage(data);
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    window.open(INSTAGRAM_DM_URL, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  }

  const message = buildContactMessage(data);

  return (
    <div className={styles.panel}>
      {!submitted && step > 0 && (
        <button type="button" className={styles.resetLink} onClick={handleReset}>
          Recomeçar
        </button>
      )}

      {submitted ? (
          <>
            <div className={styles.stepTitle}>Prontinho!</div>
            <p className={styles.stepSubtitle}>
              {copied
                ? 'Copiei a mensagem pra área de transferência e abri seu Instagram numa nova aba — é só colar no direct.'
                : 'Abri seu Instagram numa nova aba. Não consegui copiar automaticamente, então copie a mensagem abaixo e cole no direct.'}
            </p>
            <div className={styles.successBox}>
              <strong>@diogo_zra</strong>
              <div className={styles.messagePreview}>{message}</div>
            </div>
            <div className={styles.footer}>
              <button
                type="button"
                className="btn btnGhost"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(message);
                    setCopied(true);
                  } catch {
                    setCopied(false);
                  }
                }}
              >
                Copiar mensagem novamente
              </button>
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btnPrimary"
              >
                Ir para o Instagram
              </a>
            </div>
          </>
        ) : (
          <>
            <div className={styles.progressLabel}>
              Etapa {step + 1} de {STEP_COUNT}
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${((step + 1) / STEP_COUNT) * 100}%` }} />
            </div>

            {step === 0 && (
              <>
                <div className={styles.stepTitle}>Qual sua área de atuação?</div>
                <p className={styles.stepSubtitle}>Isso me ajuda a pensar num site que faça sentido pro seu negócio.</p>
                <div className={styles.choiceGrid}>
                  {AREA_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.choiceButton} ${data.area === option ? styles.choiceButtonActive : ''}`}
                      onClick={() => update('area', option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {data.area === 'Outros' && (
                  <div className={styles.field}>
                    <label htmlFor="areaCustom">Qual área?</label>
                    <input
                      id="areaCustom"
                      value={data.areaCustom}
                      onChange={(e) => update('areaCustom', e.target.value)}
                    />
                  </div>
                )}
              </>
            )}

            {step === 1 && (
              <>
                <div className={styles.stepTitle}>Conte um pouco sobre sua empresa</div>
                <p className={styles.stepSubtitle}>O que ela faz, há quanto tempo existe, o que te diferencia.</p>
                <div className={styles.field}>
                  <textarea
                    value={data.aboutBusiness}
                    onChange={(e) => update('aboutBusiness', e.target.value)}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className={styles.stepTitle}>Identidade visual</div>
                <p className={styles.stepSubtitle}>Pra eu já ter uma ideia do ponto de partida.</p>

                <div className={styles.field}>
                  <label>Já tem logo?</label>
                  <div className={styles.toggleRow}>
                    <button
                      type="button"
                      className={`${styles.choiceButton} ${data.hasLogo === 'sim' ? styles.choiceButtonActive : ''}`}
                      onClick={() => update('hasLogo', 'sim')}
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      className={`${styles.choiceButton} ${data.hasLogo === 'nao' ? styles.choiceButtonActive : ''}`}
                      onClick={() => update('hasLogo', 'nao')}
                    >
                      Não
                    </button>
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Já tem domínio?</label>
                  <div className={styles.toggleRow}>
                    <button
                      type="button"
                      className={`${styles.choiceButton} ${data.hasDomain === 'sim' ? styles.choiceButtonActive : ''}`}
                      onClick={() => update('hasDomain', 'sim')}
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      className={`${styles.choiceButton} ${data.hasDomain === 'nao' ? styles.choiceButtonActive : ''}`}
                      onClick={() => update('hasDomain', 'nao')}
                    >
                      Não
                    </button>
                  </div>
                </div>
                {data.hasDomain === 'sim' && (
                  <div className={styles.field}>
                    <label htmlFor="domain">Qual domínio?</label>
                    <input id="domain" value={data.domain} onChange={(e) => update('domain', e.target.value)} />
                  </div>
                )}

                <div className={styles.field}>
                  <label>Qual cor você imagina para o site?</label>
                  <div className={styles.swatchRow}>
                    {ACCENTS.map((accent) => (
                      <button
                        key={accent.key}
                        type="button"
                        className={`${styles.swatch} ${data.colorPreference === accent.label ? styles.swatchActive : ''}`}
                        onClick={() => update('colorPreference', accent.label)}
                      >
                        <span
                          className={styles.swatchDot}
                          style={{ background: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})` }}
                        />
                        {accent.label}
                      </button>
                    ))}
                  </div>
                  <input
                    placeholder="Alguma observação sobre a cor? (opcional)"
                    value={data.colorNotes}
                    onChange={(e) => update('colorNotes', e.target.value)}
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className={styles.stepTitle}>Dados do negócio</div>
                <p className={styles.stepSubtitle}>Informações que vão aparecer no site.</p>
                <div className={styles.field}>
                  <label htmlFor="address">Endereço</label>
                  <input id="address" value={data.address} onChange={(e) => update('address', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label htmlFor="hours">Funcionamento</label>
                  <input
                    id="hours"
                    placeholder="Ex: Seg a sex, 9h às 18h"
                    value={data.hours}
                    onChange={(e) => update('hours', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="services">Serviços</label>
                  <textarea id="services" value={data.services} onChange={(e) => update('services', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Onde prefere que te chame?</label>
                  <div className={styles.toggleRow}>
                    {CONTACT_CHANNELS.map((channel) => (
                      <button
                        key={channel.key}
                        type="button"
                        className={`${styles.choiceButton} ${data.contactChannel === channel.key ? styles.choiceButtonActive : ''}`}
                        onClick={() => update('contactChannel', channel.key)}
                      >
                        {channel.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="contactHandle">
                    {data.contactChannel === 'whatsapp' ? 'Número do WhatsApp' : 'Usuário do Instagram'}
                  </label>
                  <input
                    id="contactHandle"
                    placeholder={data.contactChannel === 'whatsapp' ? '(11) 99999-9999' : '@seu_usuario'}
                    value={data.contactHandle}
                    onChange={(e) => update('contactHandle', e.target.value)}
                  />
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className={styles.stepTitle}>Últimos detalhes para o SEO</div>
                <p className={styles.stepSubtitle}>Essas informações ajudam bastante seu site a aparecer bem nas buscas locais.</p>
                <div className={styles.field}>
                  <label htmlFor="businessName">Nome do negócio</label>
                  <input
                    id="businessName"
                    value={data.businessName}
                    onChange={(e) => update('businessName', e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="city">Cidade/região atendida</label>
                  <input id="city" value={data.city} onChange={(e) => update('city', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label htmlFor="whatsapp">WhatsApp do negócio</label>
                  <input id="whatsapp" value={data.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Já tem perfil no Google Meu Negócio?</label>
                  <div className={styles.toggleRow}>
                    <button
                      type="button"
                      className={`${styles.choiceButton} ${data.hasGoogleBusiness === 'sim' ? styles.choiceButtonActive : ''}`}
                      onClick={() => update('hasGoogleBusiness', 'sim')}
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      className={`${styles.choiceButton} ${data.hasGoogleBusiness === 'nao' ? styles.choiceButtonActive : ''}`}
                      onClick={() => update('hasGoogleBusiness', 'nao')}
                    >
                      Não
                    </button>
                  </div>
                </div>
                {data.hasGoogleBusiness === 'sim' && (
                  <div className={styles.field}>
                    <label htmlFor="googleBusinessLink">Link do perfil</label>
                    <input
                      id="googleBusinessLink"
                      value={data.googleBusinessLink}
                      onChange={(e) => update('googleBusinessLink', e.target.value)}
                    />
                  </div>
                )}
              </>
            )}

            <div className={styles.footer}>
              <button
                type="button"
                className="btn btnGhost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
              >
                Voltar
              </button>
              {step < STEP_COUNT - 1 ? (
                <button
                  type="button"
                  className="btn btnPrimary"
                  disabled={!isStepValid()}
                  style={{ opacity: isStepValid() ? 1 : 0.5 }}
                  onClick={() => setStep((s) => Math.min(STEP_COUNT - 1, s + 1))}
                >
                  Próximo
                </button>
              ) : (
                <button type="button" className="btn btnPrimary" onClick={handleSubmit}>
                  Enviar pro Instagram
                </button>
              )}
            </div>
          </>
        )}
    </div>
  );
}
