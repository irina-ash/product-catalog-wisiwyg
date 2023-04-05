import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import styles from './ProductCategoryModal.module.sass';
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

const title = {
  update: 'Редактировать категорию',
  create: 'Добавить категорию',
};

const titleComplete = {
  update: 'Категория изменена',
  create: 'Категория добавлена',
};

const ProductCategoryModal = (props: IProductCategoryModalProps) => {
  const [name, setName] = useState("");
  const {creating, updating} = useAppSelector(selectCategoriesState);
  const {productsAll} = useAppSelector(selectProductsState);

  const complete =
      creating === 'success' || updating === 'success';
  const isSubmitting =
      creating === 'loading' || updating === 'loading';
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (complete) {
      dispatch(getProductTree(productsAll));
    }
  }, [complete]);

  const onSubmit = () => {
    if (props.type === 'update' && props.category) {
      dispatch(
        updateCategory({
          id: props.category.id,
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
    props.onCloseModal();
  };

  return (
    <Popup
      className={cn(styles.popup, {
        [styles.popupSuccess]: complete,
      })}
      title={complete ? titleComplete[props.type] : title[props.type]}
    >
        <form onSubmit={onSubmit} >
          <label>Наименование категории</label>
          <input
            name="name"
            maxLength={100}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <button
            className={styles.button}
            disabled={!name || isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
          </button>
      </form>
    </Popup>
  );
};

export default ProductCategoryModal;
