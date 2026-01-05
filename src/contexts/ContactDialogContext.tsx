import { createContext, useContext, useState, ReactNode } from "react";

interface ContactDialogContextType {
  isOpen: boolean;
  formId: string;
  openDialog: (formId?: string) => void;
  closeDialog: () => void;
}

const ContactDialogContext = createContext<ContactDialogContextType | undefined>(undefined);

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formId, setFormId] = useState<string>("0001"); // ID padrão

  const openDialog = (customFormId?: string) => {
    if (customFormId) {
      setFormId(customFormId);
    } else {
      setFormId("0001"); // Reset para o padrão se não especificado
    }
    setIsOpen(true);
  };

  const closeDialog = () => setIsOpen(false);

  return (
    <ContactDialogContext.Provider value={{ isOpen, formId, openDialog, closeDialog }}>
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

