import {IProduct, IProductsState} from "./product.types";

export const initialItems: IProduct[] = [
    {
        categoryId: 1,
        id: 1,
        title: "Диван",
        active: true,
        content: "",
    }, {
        categoryId: 1,
        id: 2,
        title: "Шкаф",
        active: false,
        content: "",
    }
]
export const initialState: IProductsState = {
    loading: "idle",
    creating: "idle",
    deleting: "idle",
    updating: "idle",
    error: null,
    productsAll: initialItems,
    productInfo: null,
};