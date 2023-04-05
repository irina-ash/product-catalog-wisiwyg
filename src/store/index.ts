import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import category from "entities/category/category.slice";
import products from "entities/product/product.slice";

const exampleInitialState = {};

export const makeStore = (initialState = exampleInitialState) =>
configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    preloadedState: initialState,
    reducer: {
        category,
        products,
    },
});

export const store = makeStore();

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
