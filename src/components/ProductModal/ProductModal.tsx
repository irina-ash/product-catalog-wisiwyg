import React, {useState} from 'react';
import cn from 'classnames';
import styles from './ProductModal.module.sass';
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

const ProductModal = (props: IProductModalProps) => {
  const [name, setName] = useState("");
  const {creating, updating} = useAppSelector(selectProductsState);

  const complete =
      creating === 'success' || updating === 'success';
  const isSubmitting =
      creating === 'loading' || updating === 'loading';
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    if (props.type === 'update' && props.product) {
      dispatch(
        updateProduct({
          id: props.product.id,
          data: {title: name},
        }),
      );
    } else if (props.category) {
      const data = {
        active: false,
        title: name,
        productCategory: props.category.id,
      };
      dispatch(addProduct(data));
    }
  };

  const initialValues = {
    title: props.type === 'update' && props.product ? props.product.title : '',
  };

  return (
    <Popup
      description={
        !complete && props.type === 'create' && props.category
          ? `Добавить новый продукт в категорию "${props.category.title}"`
          : null
      }
      title={complete ? titleComplete[props.type] : title[props.type]}
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

            <button
              className={styles.button}
              disabled={!name?.length || isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </button>
        </form>
    </Popup>
  );
};

export default ProductModal;
