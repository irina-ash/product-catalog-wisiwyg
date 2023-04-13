import {IProduct} from "entities/product/product.types";

export interface IProductInfoEditProps {
    product: IProduct;
    onFormChanged: (value:boolean) => void;
    mode: 'edit' | 'preview';
    setMode(value: 'edit' | 'preview'): void;
}