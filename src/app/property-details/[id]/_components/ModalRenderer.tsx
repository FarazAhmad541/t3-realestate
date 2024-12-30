import React from 'react';

import { useModalContext } from '../_context/modalContext';

export const ModalRenderer: React.FC = () => {
    const { modalStack } = useModalContext();

    return (
        <>
            {modalStack.map((content, index) => (
                <>{content.content}</>
            ))}
        </>
    );
};
