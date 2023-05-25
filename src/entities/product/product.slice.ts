import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./product.store";
import {TRootState} from "store/index";
import {IProductItem, IProductsState, PatchProductArgument, PostProductArgument} from "./product.types";

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        addProduct(state: IProductsState, action:PayloadAction<PostProductArgument>) {
            const products = state.productsAll;
            const ids = products.map(p => p.id || 0);
            products.push({
                id: Math.max(...ids) + 1,
                active: false,
                title: action.payload.title,
                categoryId: action.payload.productCategory,
            });
            state.productsAll = products;
        },
        updateProduct(state: IProductsState, action: PayloadAction<PatchProductArgument>) {
            const products = state.productsAll || [];
            const idx = state.productsAll?.findIndex(p => p.id === action.payload.id);
            if (idx !== -1) {
                products[idx] = {
                    ...state.productsAll[idx],
                    ...action.payload.data,
                }
                state.productsAll = products;
            }
        },
        getProduct(state: IProductsState, action:PayloadAction<number>) {
            const id = action.payload;
            state.productInfo = state.productsAll?.find(p => p.id === id) || null;
        },
        deleteProducts(state: IProductsState, action:PayloadAction<IProductItem[]>) {
            const oldList = state.productsAll;
            const ids = action.payload?.map(p => p.id);
            state.productsAll = oldList?.filter(p => !ids?.includes(p.id));
            state.deleting = "success";
        },
        deleteProduct(state: IProductsState, action: PayloadAction<number | null>) {
            const products = state.productsAll || [];
            state.productsAll = products.filter(c => c.id !== action.payload);
            state.deleting = "success";
        },
        clearTitleProductLoadingState(state) {
            state.creating = 'idle';
            state.updating = 'idle';
        },
        setDeleteProductLoadingState(state, action) {
            state.deleting = action.payload;
        },
    },
});

export const {
    addProduct,
    getProduct,
    deleteProducts,
    updateProduct,
    deleteProduct,
    clearTitleProductLoadingState,
    setDeleteProductLoadingState,
} = productSlice.actions;

export const selectProductsState = (state: TRootState) => state.products;
export default productSlice.reducer;