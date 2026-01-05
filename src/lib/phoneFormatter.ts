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

/**
 * Formata um valor monetário em Real brasileiro
 * Formato: R$ 1.234,56 ou R$ 1.234 (sem centavos se não houver)
 * Recebe apenas números (string de dígitos) e formata
 */
export function formatCurrency(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  if (!numbers) return '';
  
  // Converte para número
  const numValue = parseInt(numbers, 10);
  
  if (isNaN(numValue) || numValue === 0) return '';
  
  // Formata com separadores de milhar (sem centavos por padrão)
  // Se quiser incluir centavos, divida por 100: numValue / 100
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numValue);
}

/**
 * Remove a formatação de moeda, retornando apenas números (sem centavos)
 * Ex: "R$ 1.234,56" -> "123456" (centavos incluídos)
 * Para obter o valor em reais, divida por 100
 */
export function unformatCurrency(value: string): string {
  return value.replace(/\D/g, '');
}

