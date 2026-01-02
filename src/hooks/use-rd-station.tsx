"use client";

import { useEffect, useRef } from "react";

// Declaração de tipo para o RD Station
declare global {
  interface Window {
    RDCaptureForms?: {
      init: () => void;
    };
    reinitRDStation?: () => boolean;
  }
}

/**
 * Hook para inicializar o RD Station Forms
 * @param formId - ID do formulário a ser capturado
 * @param enabled - Se deve inicializar (default: true)
 * @param delay - Delay em ms antes de inicializar (default: 200)
 */
export function useRDStation(formId: string, enabled: boolean = true, delay: number = 200) {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const initRDStation = () => {
      // Verifica se o formulário está no DOM
      const formElement = document.getElementById(formId);
      if (!formElement) {
        console.warn(`Formulário ${formId} não encontrado no DOM`);
        return false;
      }

      if (window.RDCaptureForms) {
        try {
          window.RDCaptureForms.init();
          console.log(`RD Station Forms inicializado - Form ID: ${formId}`);
          initializedRef.current = true;
          return true;
        } catch (error) {
          console.warn("Erro ao inicializar RD Station Forms:", error);
          return false;
        }
      }
      return false;
    };

    // Usa a função global se disponível
    if (typeof window.reinitRDStation === 'function') {
      const timeout = setTimeout(() => {
        window.reinitRDStation?.();
        initializedRef.current = true;
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      // Aguarda o script carregar
      const checkInterval = setInterval(() => {
        if (window.RDCaptureForms) {
          initRDStation();
          clearInterval(checkInterval);
        }
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
        if (!initializedRef.current) {
          console.warn(`RD Station Forms script não carregou a tempo para o formulário ${formId}`);
        }
      }, 5000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    }
  }, [formId, enabled, delay]);

  return { initialized: initializedRef.current };
}

