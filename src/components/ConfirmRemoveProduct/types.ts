import { IPopupModalCommonProps } from "entities/common/common.types";
import { IProductItem } from "entities/product/product.types";

export interface IConfirmRemoveProductProps extends IPopupModalCommonProps {
    product?: IProductItem | null;
}