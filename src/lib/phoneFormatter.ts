/**
 * Formata um número de telefone brasileiro
 * Formato: (00) 00000-0000 para celular ou (00) 0000-0000 para fixo
 */
export function formatPhone(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos (celular) ou 10 dígitos (fixo)
  const limitedNumbers = numbers.slice(0, 11);
  
  // Aplica a máscara
  if (limitedNumbers.length <= 2) {
    return limitedNumbers.length > 0 ? `(${limitedNumbers}` : '';
  } else if (limitedNumbers.length <= 6) {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
  } else if (limitedNumbers.length <= 10) {
    // Telefone fixo: (00) 0000-0000
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
  } else {
    // Celular: (00) 00000-0000
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
  }
}

/**
 * Remove a formatação do telefone, retornando apenas números
 */
export function unformatPhone(value: string): string {
  return value.replace(/\D/g, '');
}

