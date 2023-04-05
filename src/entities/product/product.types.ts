import {TLoadingState} from "../common/common.types";

export interface IProductItem {
    title: string;
    active?: boolean;
    id: number | null;
    categoryId: number;
}

export interface IProduct extends IProductItem {
    content?: string | null;
}

export interface IProductsState {
    /** Индикаторы загрузки продуктов */
    loading: TLoadingState;
    creating: TLoadingState;
    deleting: TLoadingState;
    updating: TLoadingState;
    /** Ошибки */
    error: string | null;
    /** Все продукты во всех категориях */
    productsAll: IProduct[];
    /** Информация о продукте */
    productInfo: IProduct | null;
}

export interface PostProductArgument {
    title: string;
    productCategory: number;
}

export interface PatchProductArgumentData {
    title?: string;
    content?: string;
    active?: boolean;
}

export interface PatchProductArgument {
    data: PatchProductArgumentData;
    id: number | null;
}