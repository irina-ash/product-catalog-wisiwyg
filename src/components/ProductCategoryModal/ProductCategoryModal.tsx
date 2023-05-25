import React, {FC, memo, useEffect, useState} from 'react';
import cn from 'classnames';
import styles from './ProductCategoryModal.module.scss';
import Button from 'components/Button';
import Popup from 'components/Popup';
import {useAppDispatch, useAppSelector} from 'store/index';
import {
  getProductTree,
  updateCategory,
  addCategory,
  selectCategoriesState,
} from 'entities/category/category.slice';
import {IProductCategoryModalProps} from "./types";
import {selectProductsState} from "entities/product/product.slice";
import { TITLE_COMPLETE, TITLE, LABEL_CATEGORY } from './constants';

const ProductCategoryModal: FC<IProductCategoryModalProps> = ({onCloseModal, opened, category, type}) => {
  const [name, setName] = useState("");
  const {creating, updating} = useAppSelector(selectCategoriesState);
  const {productsAll} = useAppSelector(selectProductsState);

  const complete =
      creating === 'success' || updating === 'success';
  const isSubmitting =
      creating === 'loading' || updating === 'loading';
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (type === "update" && category) {
      setName(category.title);
    }
  }, [type, category]);

  useEffect(() => {
    if (complete) {
      dispatch(getProductTree(productsAll));
      onCloseModal();
    }
  }, [complete]);

  const onSubmit = () => {
    if (type === 'update' && category) {
      dispatch(
        updateCategory({
          id: category.id,
          data: {title: name},
        }),
      );
    } else {
      const data = {
        title: name,
        active: false,
      };
      dispatch(addCategory(data));
    }
    onCloseModal();
  };

  return (
    <Popup title={complete ? TITLE_COMPLETE[type] : TITLE[type]}>
          <label>{LABEL_CATEGORY}</label>
          <input
            className={styles.input}
            name="name"
            maxLength={100}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <div className={styles.buttons}>
            <Button
              type="button"
              onClick={onCloseModal}
            >
              Отмена
            </Button>
            <Button
              disabled={!name || isSubmitting}
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

export default memo(ProductCategoryModal);
