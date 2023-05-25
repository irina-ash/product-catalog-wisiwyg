import { IProductCategory } from "entities/category/category.types";
import { IPopupModalCommonProps } from "entities/common/common.types";

export interface IConfirmRemoveCategoryProp extends IPopupModalCommonProps {
    category?: IProductCategory | null;
}
