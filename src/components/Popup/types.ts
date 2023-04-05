import React from "react";

export interface IPopupProps {
    className?: string;
    children: React.ReactNode;
    title: string;
    description?: string | null;
}