import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

interface ContactDialogContextType {
  isOpen: boolean;
  formId: string;
  openDialog: (formId?: string) => void;
  closeDialog: () => void;
}

const ContactDialogContext = createContext<ContactDialogContextType | undefined>(undefined);

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formId, setFormId] = useState<string>("form-home"); // ID padrão

  const openDialog = useCallback((customFormId?: string) => {
    if (customFormId) {
      setFormId(customFormId);
    } else {
      setFormId("form-home"); // Reset para o padrão se não especificado
    }
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Memoiza o valor do contexto para evitar re-renders desnecessários
  const value = useMemo(() => ({
    isOpen,
    formId,
    openDialog,
    closeDialog,
  }), [isOpen, formId, openDialog, closeDialog]);

  return (
    <ContactDialogContext.Provider value={value}>
      {children}
    </ContactDialogContext.Provider>
  );
}

export function useContactDialog() {
  const context = useContext(ContactDialogContext);
  if (context === undefined) {
    throw new Error("useContactDialog must be used within a ContactDialogProvider");
  }
  return context;
}

