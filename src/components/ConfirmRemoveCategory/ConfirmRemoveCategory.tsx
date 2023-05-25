import React, {FC, memo, useCallback} from 'react';
import cn from 'classnames';

import styles from './ConfirmRemoveCategory.module.scss';
import Alert from 'components/Alert';
import Button from 'components/Button';
import Popup from 'components/Popup';
import {useAppDispatch, useAppSelector} from "store/index";
import {
    deleteCategory,
    selectCategoriesState,
} from "entities/category/category.slice";
import {deleteProducts} from "entities/product/product.slice";
import { IConfirmRemoveCategoryProp } from './types';
import { CONFIRM_MSG, DESCRIPTION, TITLE, TITLE_COMPLETE } from './constants';

const ConfirmRemoveCategory: FC<IConfirmRemoveCategoryProp> = ({
   opened,
   onCloseModal,
   category,
}) => {
    const dispatch = useAppDispatch();
    const {deleting, items} = useAppSelector(selectCategoriesState);
    const categoryData = items?.find(c => c.id === category?.id);

    const onConfirm = useCallback(() => {
        if (categoryData) {
            dispatch(deleteProducts(categoryData.products));
            dispatch(deleteCategory(categoryData.id));
        }
    }, []);

    return (
        <Popup
            description={deleting !== 'success' && category?.title ? DESCRIPTION(category?.title) : null}
            title={deleting === 'success' ? TITLE_COMPLETE : TITLE}
        >
            <div>
                {!!categoryData?.products?.length && (
                    <Alert message={CONFIRM_MSG(categoryData.products.length)} />
                )}

                {deleting === 'success' ? (
                    <Button full onClick={onCloseModal}>Закрыть</Button>
                ) : (
                    <div className={styles.buttons}>
                        <Button onClick={onCloseModal}>Отмена</Button>
                        <Button disabled={!category}
                                onClick={onConfirm}
                                theme="success">
                            Подтвердить
                        </Button>
                    </div>
                )}
            </div>
        </Popup>
    )
}

export default memo(ConfirmRemoveCategory);