import React, {memo, useEffect, useState} from 'react';
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

const title = {
  update: 'Редактировать продукт',
  create: 'Добавить продукт',
};

const titleComplete = {
  update: 'Продукт изменён',
  create: 'Новый продукт добавлен',
};

const ProductModal = ({onCloseModal, opened, type, category, product}: IProductModalProps) => {
  const [name, setName] = useState("");
  const {creating, updating} = useAppSelector(selectProductsState);

  const complete =
      creating === 'success' || updating === 'success';
  const isSubmitting =
      creating === 'loading' || updating === 'loading';
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
  };

  const initialValues = {
    title: type === 'update' && product ? product.title : '',
  };

  return (
    <Popup
      title={
        complete 
        ? titleComplete[type] 
        : `${title[type]}${
              (type === "create" && category) 
              ? ` в категорию "${category.title}"` 
              : ''}`
      }
    >
        <form onSubmit={onSubmit}>
            <label>
                Наименование продукта
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
                type="submit"
                theme="success"
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </div>
        </form>
    </Popup>
  );
};

export default memo(ProductModal);
