/**
 * Helper para capturar e injetar UTMs nos formulários do RD Station
 * Garante que a origem do lead seja capturada corretamente (orgânico, pago, etc)
 */

/**
 * Captura UTMs da URL e salva no localStorage
 * Deve ser executado uma única vez quando a página carrega
 */
export function saveUTMs(): void {
  if (typeof window === 'undefined') return;

  try {
    const params = new URLSearchParams(window.location.search);
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

    utms.forEach((utm) => {
      const value = params.get(utm);
      if (value) {
        localStorage.setItem(utm, value);
        console.log(`UTM ${utm} salvo:`, value);
      }
    });

    // Também captura gclid (Google Ads) e fbclid (Facebook Ads)
    const gclid = params.get('gclid');
    if (gclid) {
      localStorage.setItem('gclid', gclid);
      // Se tem gclid, é tráfego pago do Google
      if (!params.get('utm_source')) {
        localStorage.setItem('utm_source', 'google');
      }
      if (!params.get('utm_medium')) {
        localStorage.setItem('utm_medium', 'cpc');
      }
    }

    const fbclid = params.get('fbclid');
    if (fbclid) {
      localStorage.setItem('fbclid', fbclid);
      // Se tem fbclid, é tráfego pago do Facebook
      if (!params.get('utm_source')) {
        localStorage.setItem('utm_source', 'facebook');
      }
      if (!params.get('utm_medium')) {
        localStorage.setItem('utm_medium', 'cpc');
      }
    }
  } catch (error) {
    console.warn('Erro ao salvar UTMs:', error);
  }
}

/**
 * Injeta UTMs no formulário como campos hidden
 * Deve ser chamado ANTES do submit do formulário
 * @param formElement - Elemento do formulário HTML
 */
export function injectUTMsIntoForm(formElement: HTMLFormElement): void {
  if (!formElement || typeof window === 'undefined') return;

  try {
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

    utms.forEach((utm) => {
      const value = localStorage.getItem(utm);
      if (value) {
        // Verifica se já existe um input com esse name
        let input = formElement.querySelector(`input[name="${utm}"]`) as HTMLInputElement;

        // Se não existe, cria um novo input hidden
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = utm;
          formElement.appendChild(input);
        }

        // Define o valor
        input.value = value;
        console.log(`UTM ${utm} injetado no formulário:`, value);
      }
    });
  } catch (error) {
    console.warn('Erro ao injetar UTMs no formulário:', error);
  }
}

