import { ReactNode, createContext, useContext, useState } from 'react';

type ModalType = {
    content: ReactNode;
    onClose: () => void;
};

type ModalContextType = {
    modalStack: ModalType[];
    openModal: (content: ModalType) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
    undefined,
);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [modalStack, setModalStack] = useState<ModalType[]>([]);

    const openModal = (content: ModalType) => {
        setModalStack((prev) => [...prev, content]);
    };

    const closeModal = () => {
        setModalStack((prevStack) => {
            const newStack = prevStack.slice(0, -1);
            return newStack;
        });
    };
    return (
        <ModalContext.Provider
            value={{
                modalStack,
                openModal,
                closeModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};
