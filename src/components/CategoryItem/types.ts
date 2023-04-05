import {ReactNode} from "react";

export interface ICategoryItemProps {
    onClick(): void;
    selected: boolean;
    name: string;
    controls?: ReactNode;
}