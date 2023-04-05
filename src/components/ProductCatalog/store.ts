import {IProductCategoryModalOptions, IProductModalOptions} from "./types";

export const defaultCategoryOptions: IProductCategoryModalOptions = {
    category: null,
    type: 'create',
    opened: false,
};

export const defaultProductOptions: IProductModalOptions = {
    product: null,
    category: null,
    type: 'create',
    opened: false,
};