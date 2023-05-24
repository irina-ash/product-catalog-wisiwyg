import React, {memo} from 'react';
import cn from 'classnames';
import styles from './ConfirmRemoveProduct.module.scss';
import Popup from 'components/Popup';
import {IPopupModalCommonProps} from 'entities/common/common.types';
import {IProductItem} from "entities/product/product.types";
import {useAppDispatch, useAppSelector} from 'store/index';
import {deleteProduct, selectProductsState} from 'entities/product/product.slice';

interface ConfirmRemoveProductProp extends IPopupModalCommonProps {
  product?: IProductItem | null;
}

const ConfirmRemoveProduct = ({
  opened,
  onCloseModal,
  product,
}: ConfirmRemoveProductProp) => {
  const {deleting} = useAppSelector(selectProductsState);

  const complete = deleting === 'success';
  const isSubmitting = deleting === 'loading';
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    if (product) {
      dispatch(deleteProduct(product.id));
    }
  };

  return (
    <Popup
      description={
        !complete
          ? `Подтвердите удаление продукта "${product?.title}" из каталога`
          : null
      }
      title={complete ? 'Продукт успешно удалён' : 'Удаление продукта'}
    >
      <button
          className={styles.button}
          disabled={!product || isSubmitting}
          onClick={onConfirm}
      >
        Подтвердить
      </button>
    </Popup>
  );
};

export default memo(ConfirmRemoveProduct);
