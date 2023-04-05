import {IPopupModalCommonProps} from "entities/common/common.types";
import {IProductItem} from "entities/product/product.types";
import {IProductCategory} from "entities/category/category.types";

export interface IProductModalProps extends IPopupModalCommonProps {
    type: 'update' | 'create';
    product?: IProductItem | null;
    category?: IProductCategory | null;
}