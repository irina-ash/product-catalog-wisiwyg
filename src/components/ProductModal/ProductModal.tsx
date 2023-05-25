import React, {FC, memo, useEffect, useState} from 'react';
import cn from 'classnames';
import styles from './ProductModal.module.scss';
import Button from 'components/Button';
import Popup from 'components/Popup';
import {useAppDispatch, useAppSelector} from 'store/index';
import {
  updateProduct,
  addProduct,
  selectProductsState,
} from 'entities/product/product.slice';
import {IProductModalProps} from "./types";
import { NAME_LABEL, TITLE, TITLE_COMPLETE } from './constants';

const ProductModal: FC<IProductModalProps> = ({onCloseModal, opened, type, category, product}) => {
  const [name, setName] = useState("");
  const {creating, updating} = useAppSelector(selectProductsState);

  const complete = creating === 'success' || updating === 'success';
  const isSubmitting = creating === 'loading' || updating === 'loading';
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (type === 'update' && product) {
      setName(product.title);
    }
  }, [type, product])

  const onSubmit = () => {
    if (type === 'update' && product) {
      dispatch(
        updateProduct({
          id: product.id,
          data: {title: name},
        }),
      );
    } else if (category) {
      const data = {
        active: false,
        title: name,
        productCategory: category.id,
      };
      dispatch(addProduct(data));
    }
    onCloseModal();
  };

  const initialValues = {
    title: type === 'update' && product ? product.title : '',
  };

  return (
    <Popup
      title={
        complete 
        ? TITLE_COMPLETE[type] 
        : `${TITLE[type]}${
              (type === "create" && category) 
              ? ` в категорию "${category.title}"` 
              : ''}`
      }
    >
            <label>
                {NAME_LABEL}
                <input
                  className={styles.input}
                  name="name"
                  maxLength={100}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
            </label>

            <div className={styles.buttons}>
              <Button
                type="button"
                onClick={onCloseModal}
              >
                Отмена
              </Button>
              <Button
                className={styles.button}
                disabled={!name?.length || isSubmitting}
                type="button"
                theme="success"
                onClick={onSubmit}
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </div>
    </Popup>
  );
};

export default memo(ProductModal);
