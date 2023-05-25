import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./category.store";
import {
    ICategoryState,
    PatchProductCategoryArgument,
    PostProductCategoryArgumentData
} from "./category.types";
import {TRootState} from "store/index";
import {IProduct} from "../product/product.types";

export const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
        addCategory(state: ICategoryState, action:PayloadAction<PostProductCategoryArgumentData>) {
            const oldItems = state.items;
            const ids = oldItems.map(p => p.id || 0);
            oldItems.push({
                products: [],
                id: Math.max(...ids) + 1,
                active: false,
                title: action.payload.title || "",
            });
            state.items = oldItems;
        },
        updateCategory(state: ICategoryState, action: PayloadAction<PatchProductCategoryArgument>) {
            const oldItems = state.items;
            const idx = state.items?.findIndex(p => p.id === action.payload.id);
            if (idx !== -1) {
                oldItems[idx] = {
                    ...state.items[idx],
                    ...action.payload.data,
                    title: action.payload?.data?.title || "",
                }
                state.items = oldItems;
            }
        },
        getProductTree(state: ICategoryState, action: PayloadAction<IProduct[]>) {
            const products = action.payload;
            const categories = state.items;
            state.items = categories.map(c => ({
                ...c,
                products: products.filter(p => p.categoryId === c.id),
            }));
            state.loading = "success";
        },
        deleteCategory(state: ICategoryState, action: PayloadAction<number>) {
            const categories = state.items || [];
            state.items = categories.filter(c => c.id !== action.payload);
            state.deleting = "success";
        },
        clearTitleCategoryLoadingState(state) {
            state.creating = 'idle';
            state.updating = 'idle';
        },
        setDeleteCategoryLoadingState(state, action) {
            state.deleting = action.payload;
        }
    },
});

export const {
    addCategory,
    updateCategory,
    getProductTree,
    deleteCategory ,
    clearTitleCategoryLoadingState,
    setDeleteCategoryLoadingState,
} = categorySlice.actions;
export const selectCategoriesState = (state: TRootState) => state.category;
export default categorySlice.reducer;