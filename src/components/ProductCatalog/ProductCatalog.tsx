import React, {useEffect, useState, MouseEvent} from 'react';
import styles from './ProductCatalog.module.scss';
import Loader from 'components/Loader';
import ProductList from 'components/ProductList';
import ProductInfoEdit from 'components/ProductInfoEdit';
import ProductCategoryModal from 'components/ProductCategoryModal';
import ProductModal from 'components/ProductModal';
import ConfirmRemoveProduct from 'components/ConfirmRemoveProduct';
import ConfirmRemoveCategory from 'components/ConfirmRemoveCategory';
import ConfirmSkipChanges from "components/ConfirmSkipChanges";
import {useAppDispatch, useAppSelector} from 'store/index';
import {
    clearTitleProductLoadingState,
    getProduct,
    selectProductsState, setDeleteProductLoadingState,
} from 'entities/product/product.slice';
import {
    clearTitleCategoryLoadingState,
    getProductTree,
    selectCategoriesState,
    setDeleteCategoryLoadingState
} from 'entities/category/category.slice';
import NotFoundWithButton from 'components/NotFoundWithButton';
import {defaultCategoryOptions, defaultProductOptions} from "./store";
import {IProductCategoryModalOptions, IProductModalOptions} from "./types";
import {IProductCategory} from "entities/category/category.types";
import {IProductItem} from "entities/product/product.types";

const ProductCatalog = () => {
    const [categoryModal, setCategoryModal] =
        useState<IProductCategoryModalOptions>(defaultCategoryOptions);
    const [productModal, setProductModal] = useState<IProductModalOptions>(
        defaultProductOptions,
    );
    const [skipChangesOpen, setSkipChangesOpen] = useState(false);
    const [productId, setProductId] = useState<number | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [mode, setMode] = useState<'edit' | 'preview'>('edit');
    const [nextId, setNextId] = useState<number | null>(null);

    const {
        loading: getProductsLoadingState,
        productInfo,
        productsAll,
    } = useAppSelector(selectProductsState);

    const {
        loading: getCategoriesLoadingState,
        items: categories,
    } = useAppSelector(selectCategoriesState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProductTree(productsAll));
    }, [productsAll]);

    useEffect(() => {
        if (productId) {
            dispatch(getProduct(productId));
            setHasUnsavedChanges(false);
            setNextId(null);
            setMode('edit');
        }
    }, [productId]);

    const handleSelectProductClick = (id: number) => {
        if (hasUnsavedChanges) {
            setNextId(id);
            setSkipChangesOpen(true);
        } else {
            setProductId(id);
        }
    };

    const handleSkipChanges = () => {
        if (nextId) {
            setProductId(nextId);
            setSkipChangesOpen(false);
        }
    };

    const handlePreviewChanges = () => {
        setMode('preview');
        setSkipChangesOpen(false);
    };

    const handleAddCategory = () => {
        dispatch(clearTitleCategoryLoadingState());
        setCategoryModal({type: 'create', opened: true});
    };

    const handleEditCategory = (category: any) => {
        dispatch(clearTitleCategoryLoadingState());
        setCategoryModal({type: 'update', opened: true, category: category});
    };

    const handleRemoveCategory = (category: any) => {
        dispatch(setDeleteCategoryLoadingState('idle'));
        setCategoryModal({type: 'delete', opened: true, category: category});
    };

    const handleAddProduct = (category: IProductCategory) => {
        dispatch(clearTitleProductLoadingState());
        setProductModal({type: 'create', opened: true, category: category});
    };

    const handleEditProduct = (product: IProductItem, e: MouseEvent) => {
        e.stopPropagation();
        dispatch(clearTitleProductLoadingState());
        setProductModal({type: 'update', opened: true, product: product});
    };

    const handleRemoveProduct = (product: any, e: MouseEvent) => {
        e.stopPropagation();
        dispatch(setDeleteProductLoadingState('idle'));
        setProductModal({type: 'delete', opened: true, product: product});
    };

    if (getCategoriesLoadingState === "loading") return <Loader/>;

    return (
        <section className={styles.section}>
            {categories?.length > 0 ?
                <main className={styles.main}>
                    <div className={styles.leftSide}>
                        <ProductList
                            categories={categories}
                            onAddCategoryClick={handleAddCategory}
                            onAddProductClick={handleAddProduct}
                            onEditCategoryClick={handleEditCategory}
                            onEditProductClick={handleEditProduct}
                            onRemoveCategoryClick={handleRemoveCategory}
                            onRemoveProductClick={handleRemoveProduct}
                            selectedProduct={productId}
                            setSelectedProduct={setProductId}
                        />
                    </div>
                    <div className={styles.rightSide}>
                        {getProductsLoadingState === 'loading' ?
                            <Loader/> :
                            (productId && productInfo) ?
                                <ProductInfoEdit
                                    mode={mode}
                                    product={productInfo}
                                    onFormChanged={(value) => setHasUnsavedChanges(value)}
                                    setMode={setMode}
                                /> :
                                <NotFoundWithButton subTitle="Нажмите на название продукта для просмотра"
                                                    title="Вы ничего не выбрали"/>
                        }
                    </div>
                </main> : (
                    <NotFoundWithButton
                        subTitle="Следите за обновлениями каталога"
                        title="Категорий и продуктов пока нет"
                    />
                )
            }

            {categoryModal.opened &&
                (categoryModal.type === 'create' ||
                    categoryModal.type === 'update') && (
                    <ProductCategoryModal
                        onCloseModal={() => setCategoryModal(defaultCategoryOptions)}
                        opened={categoryModal.opened}
                        category={categoryModal.category}
                        type={categoryModal.type}
                    />
                )}

            {productModal.opened &&
                (productModal.type === 'create' || productModal.type === 'update') && (
                    <ProductModal
                        category={productModal.category}
                        onCloseModal={() => setProductModal(defaultProductOptions)}
                        opened={productModal.opened}
                        product={productModal.product}
                        type={productModal.type}
                    />
                )}

            {productModal.opened && productModal.type === 'delete' && (
                <ConfirmRemoveProduct
                    onCloseModal={() => setProductModal(defaultProductOptions)}
                    opened={productModal.opened}
                    product={productModal.product}
                />
            )}

            {categoryModal.opened && categoryModal.type === 'delete' && (
                <ConfirmRemoveCategory
                    category={categoryModal.category}
                    onCloseModal={() => setCategoryModal(defaultCategoryOptions)}
                    opened={categoryModal.opened}
                />
            )}

            {skipChangesOpen && (
                <ConfirmSkipChanges
                    onCloseModal={() => setSkipChangesOpen(false)}
                    onPreviewClick={handlePreviewChanges}
                    onSkipClick={handleSkipChanges}
                    opened={skipChangesOpen}
                />
            )}
        </section>
    )
}

export default ProductCatalog;
