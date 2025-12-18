import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      const onChange = () => {
        if (typeof window !== 'undefined' && window.innerWidth !== undefined) {
          setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        }
      };
      
      if (mql && mql.addEventListener) {
        mql.addEventListener("change", onChange);
      }
      
      if (window.innerWidth !== undefined) {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }
      
      return () => {
        if (mql && mql.removeEventListener) {
          mql.removeEventListener("change", onChange);
        }
      };
    } catch (e) {
      console.warn('Erro ao verificar tamanho da tela:', e);
      setIsMobile(false);
    }
  }, []);

  return !!isMobile;
}
