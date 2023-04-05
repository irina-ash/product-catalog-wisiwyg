import {IProductCategory} from "entities/category/category.types";
import {IProduct, IProductItem} from "entities/product/product.types";

export type TModalType = 'create' | 'update' | 'delete';

export interface IProductCategoryModalOptions {
    category?: IProductCategory | null;
    type: TModalType;
    opened: boolean;
}

export interface IProductModalOptions {
    category?: IProductCategory | null;
    product?: IProductItem | null;
    type: TModalType;
    opened: boolean;
}