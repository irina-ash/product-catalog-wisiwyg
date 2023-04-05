import {ReactNode} from "react";

export interface IProductListItemProps {
    onSelect(): void;
    selected: boolean;
    name: string;
    controls?: ReactNode;
}