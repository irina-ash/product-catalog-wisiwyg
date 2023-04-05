import {IProductCategory} from "entities/category/category.types";
import {IPopupModalCommonProps} from "entities/common/common.types";

export interface IProductCategoryModalProps extends IPopupModalCommonProps {
    type: 'update' | 'create';
    category?: IProductCategory | null;
}