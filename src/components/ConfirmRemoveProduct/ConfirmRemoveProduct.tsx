import React, {FC, memo} from 'react';
import cn from 'classnames';
import styles from './ConfirmRemoveProduct.module.scss';
import Button from 'components/Button';
import Popup from 'components/Popup';
import {useAppDispatch, useAppSelector} from 'store/index';
import {deleteProduct, selectProductsState} from 'entities/product/product.slice';
import { IConfirmRemoveProductProps } from './types';
import { CONFIRM_MSG, TITLE, TITLE_COMPLETE } from './constants';

const ConfirmRemoveProduct: FC<IConfirmRemoveProductProps>= ({
  opened,
  onCloseModal,
  product,
}) => {
  const {deleting} = useAppSelector(selectProductsState);

  const complete = deleting === 'success';
  const dispatch = useAppDispatch();

  const onConfirm = () => {
    if (product) {
      dispatch(deleteProduct(product.id));
    }
  };

  return (
    <Popup
      description={
        !complete && product?.title
          ? CONFIRM_MSG(product?.title)
          : null
      }
      title={complete ? TITLE_COMPLETE : TITLE}
    >
      {complete ? (
        <Button full onClick={onCloseModal}>Закрыть</Button>
      ) : (
        <div className={styles.buttons}>
          <Button onClick={onCloseModal}>Отмена</Button>
          <Button
              disabled={!product}
              onClick={onConfirm}
              theme="success"
          >
            Подтвердить
          </Button>
        </div>
      )}
    </Popup>
  );
};

export default memo(ConfirmRemoveProduct);
