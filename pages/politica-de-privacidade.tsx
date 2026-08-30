import { NextSeo } from 'next-seo';
import styles from '@/styles/PoliticaDePrivacidade.module.css';

const LAST_UPDATED = '30 de agosto de 2026';

export default function PoliticaDePrivacidade() {
  return (
    <>
      <NextSeo
        title="Política de Privacidade — Diogo Zura"
        description="Política de Privacidade de diogozura.com: quais dados coletamos, uso de cookies e analytics, e como exercer seus direitos previstos na LGPD."
        canonical="https://www.diogozura.com/politica-de-privacidade"
        noindex
      />

      <section className={`container ${styles.hero}`}>
        <h1 className={styles.title}>Política de Privacidade</h1>
        <p className={styles.lead}>
          Como Diogo Zura coleta, usa e protege os dados de quem visita ou entra em contato por este site.
        </p>
        <p className={styles.updated}>Última atualização: {LAST_UPDATED}</p>
      </section>

      <section className="container section" style={{ paddingTop: 24 }}>
        <div className={styles.content}>
          <div className={styles.block}>
            <h2>1. Quem é o controlador dos dados</h2>
            <p>
              Este site é operado por Diogo Zura (CNPJ 63.778.205/0001-12), sediado em Cotia, São Paulo,
              responsável pelo tratamento dos dados pessoais coletados através de diogozura.com, nos
              termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
            </p>
          </div>

          <div className={styles.block}>
            <h2>2. Quais dados coletamos</h2>
            <ul>
              <li>
                <strong>Dados que você fornece diretamente:</strong> nome, e-mail, WhatsApp/Instagram e
                as informações enviadas ao entrar em contato por formulário, e-mail ou direct.
              </li>
              <li>
                <strong>Dados de navegação:</strong> páginas visitadas, tempo de permanência, origem do
                acesso e dispositivo, coletados via cookies de analytics quando você autoriza no banner
                de cookies.
              </li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>3. Cookies</h2>
            <p>Usamos cookies divididos em duas categorias:</p>
            <ul>
              <li>
                <strong>Necessários:</strong> guardam apenas a sua preferência de tema/cor do site e a
                sua escolha neste aviso de cookies. Não podem ser desativados e não enviam dados a
                terceiros.
              </li>
              <li>
                <strong>Analytics e marketing (opcionais):</strong> hoje usamos o Google Analytics para
                entender como o site é usado. Se no futuro passarmos a rodar campanhas de anúncios
                (Google Ads e/ou Meta Ads), tags de conversão e remarketing dessas plataformas também
                serão carregadas apenas com o seu consentimento, e esta política será atualizada para
                detalhar cada uma.
              </li>
            </ul>
            <p>
              Você pode aceitar ou recusar os cookies opcionais no banner exibido na primeira visita, e
              alterar sua escolha a qualquer momento limpando os dados de navegação deste site no seu
              navegador.
            </p>
          </div>

          <div className={styles.block}>
            <h2>4. Para que usamos os dados</h2>
            <ul>
              <li>Responder aos contatos enviados por formulário, e-mail, WhatsApp ou Instagram;</li>
              <li>Entender quais páginas e serviços têm mais interesse, para melhorar o site;</li>
              <li>
                Quando aplicável e com consentimento, medir a performance de campanhas de anúncios
                (Google Ads / Meta Ads).
              </li>
            </ul>
          </div>

          <div className={styles.block}>
            <h2>5. Compartilhamento com terceiros</h2>
            <p>
              Não vendemos dados pessoais. Dados de navegação anonimizados podem ser processados pelo{' '}
              <strong>Google Analytics</strong> (Google LLC) para fins estatísticos. Se campanhas de
              anúncios forem ativadas, dados equivalentes poderão ser processados por{' '}
              <strong>Google Ads</strong> e/ou <strong>Meta (Facebook/Instagram)</strong>, sempre sujeitos
              às políticas de privacidade dessas empresas e ao seu consentimento prévio neste site.
            </p>
          </div>

          <div className={styles.block}>
            <h2>6. Seus direitos</h2>
            <p>Nos termos da LGPD, você pode a qualquer momento solicitar:</p>
            <ul>
              <li>Confirmação de que tratamos seus dados e acesso a eles;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Portabilidade dos dados a outro fornecedor;</li>
              <li>Revogação do consentimento e eliminação dos dados tratados com base nele.</li>
            </ul>
            <p>
              Para exercer qualquer um desses direitos, entre em contato pelo e-mail{' '}
              <a href="mailto:diogozura@gmail.com">diogozura@gmail.com</a>.
            </p>
          </div>

          <div className={styles.block}>
            <h2>7. Segurança</h2>
            <p>
              Adotamos medidas técnicas razoáveis para proteger os dados coletados contra acesso não
              autorizado, perda ou alteração indevida.
            </p>
          </div>

          <div className={styles.block}>
            <h2>8. Alterações nesta política</h2>
            <p>
              Esta política pode ser atualizada para refletir mudanças no site ou na legislação — por
              exemplo, ao ativarmos novas ferramentas de anúncios. A data no topo desta página sempre
              indica a versão mais recente.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
