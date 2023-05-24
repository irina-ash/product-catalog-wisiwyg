import {MouseEvent} from "react";
import {IProductCategory} from "entities/category/category.types";
import {IProductItem} from "entities/product/product.types";

export interface IProductListProps {
    selectedProduct: number | null;
    setSelectedProduct(id: number | null): void;
    onAddCategoryClick(): void;
    onAddProductClick(category: IProductCategory): void;
    onEditCategoryClick(category: IProductCategory): void;
    onEditProductClick(product: IProductItem, e: MouseEvent): void;
    onRemoveCategoryClick(category: IProductCategory): void;
    onRemoveProductClick(product: IProductItem, e: MouseEvent): void;
    categories: IProductCategory[];
}