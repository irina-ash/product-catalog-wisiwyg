import {IProductItem} from "entities/product/product.types";
import {TLoadingState} from "../common/common.types";

export interface IProductCategory {
    title: string;
    active: boolean;
    products: IProductItem[];
    id: number;
}

export interface ICategoryState {
    items: IProductCategory[];
    loading: TLoadingState;
    creating: TLoadingState;
    deleting: TLoadingState;
    updating: TLoadingState;
    error: string | null;
}

export interface PostProductCategoryArgumentData {
    title: string | null;
    active?: boolean;
}

export interface PatchProductCategoryArgumentData {
    title: string | null;
    active?: boolean;
}

export interface PatchProductCategoryArgument {
    data: PatchProductCategoryArgumentData;
    id: number | null;
}