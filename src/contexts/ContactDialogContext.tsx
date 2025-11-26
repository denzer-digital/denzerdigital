import { createContext, useContext, useState, ReactNode } from "react";

interface ContactDialogContextType {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const ContactDialogContext = createContext<ContactDialogContextType | undefined>(undefined);

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <ContactDialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
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

