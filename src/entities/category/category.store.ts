import {ICategoryState, IProductCategory} from "./category.types";

export const initialItems: IProductCategory[] = [
    {
        id: 1,
        title: "Мебель",
        active: true,
        products: [],
    },
    {
        id: 2,
        title: "Фурнитура",
        active: true,
        products: [],
    }
];

export const initialState: ICategoryState = {
    error: null,
    items: initialItems,
    loading: "idle",
    creating: "idle",
    deleting: "idle",
    updating: "idle",
};