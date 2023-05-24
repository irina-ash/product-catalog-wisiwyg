import React, {memo} from 'react';
import cn from 'classnames';
import styles from './ConfirmRemoveCategory.module.sass';
import Popup from 'components/Popup';
import {IPopupModalCommonProps} from 'entities/common/common.types';
import {IProductCategory} from "entities/category/category.types";
import {useAppDispatch, useAppSelector} from "store/index";
import {
    deleteCategory,
    selectCategoriesState,
} from "entities/category/category.slice";
import {deleteProducts} from "entities/product/product.slice";

interface ConfirmRemoveCategoryProp extends IPopupModalCommonProps {
    category?: IProductCategory | null;
}

const ConfirmRemoveCategory = ({
   opened,
   onCloseModal,
   category,
}: ConfirmRemoveCategoryProp) => {
    const dispatch = useAppDispatch();
    const {
        deleting,
        items,
    } = useAppSelector(
        selectCategoriesState,
    );
    const categoryData = items?.find(c => c.id === category?.id);

    const onConfirm = async () => {
        if (categoryData) {
            dispatch(deleteProducts(categoryData.products));
            dispatch(deleteCategory(categoryData.id));
        }
    };

    return (
        <Popup
            description={deleting !== 'success' ? `Подтвердите удаление категории "${category?.title}" из каталога` : null}
            title={deleting === 'success' ? "Категория успешно удалена" : "Удаление категории"}
        >
            <div>
                {!!categoryData?.products?.length && (
                    <span>
                    {`Количество продуктов, содержащихся в выбранной категории: ${categoryData.products.length}. Они также будут удалены.`}
                </span>
                )}
                <button disabled={!category || deleting === 'loading'}
                        className={styles.button}
                        onClick={onConfirm}
                >
                    {deleting === 'loading'
                        ? 'Удаление категории...'
                        : 'Подтвердить'
                    }
                </button>
            </div>
        </Popup>
    )
}

export default memo(ConfirmRemoveCategory);