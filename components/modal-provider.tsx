"use client";
import { useState } from "react";
import { ProModal } from "./pro-modal"; 

import { useEffect } from "react";

export const ModalProvider = () => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(true);
    }, []);
    
    if (!isOpen) {
        return null;
    }

    return (
        <div className="relative">
            <ProModal />
        </div>
    )
}
