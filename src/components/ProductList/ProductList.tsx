import React, {memo, useEffect, useState} from 'react';
import cn from "classnames";

import ProductListItem from 'components/ProductListItem';
import CategoryItem from 'components/CategoryItem';

import {useAppDispatch} from "store/index";

import {ReactComponent as AddIcon} from "icons/Add.svg";
import {ReactComponent as EditIcon} from "icons/Edit.svg";
import {ReactComponent as RemoveIcon} from "icons/Bin.svg";

import styles from './ProductList.module.sass';

import {IProductItem} from "entities/product/product.types";
import {IProductCategory} from "entities/category/category.types";
import {IExpandedItem, IProductListProps} from "./types";
import {TITLE} from "components/ProductList/store";

const ProductList = ({
    categories,
    selectedProduct,
    setSelectedProduct,
    onAddProductClick,
    onEditProductClick,
    onEditCategoryClick,
    onRemoveCategoryClick,
    onRemoveProductClick,
    onAddCategoryClick,
}: IProductListProps) => {
  const [expandList, setExpandList] = useState<IExpandedItem[]>([]);
    const [publishError, setPublishError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setExpandList(categories?.map(c => ({
        id: c.id,
        expand: false,
    })));
  }, [categories]);

  const onExpandCategory = (id: number) => {
      setExpandList(oldList => {
          const idx = oldList?.findIndex(c => c.id === id);
          if (idx === -1) return oldList;
          const copyArr = oldList;
          copyArr[idx] = {
              ...oldList[idx],
              expand: !oldList[idx].expand,
          };
          return copyArr;
      });
  };

    /*const activeProductButtonHandler = useCallback(
        debounce(700, true, (item: IProductItem, e: MouseEvent) => {
            e.stopPropagation();
            const descEmpty = !item.content || item.content.trim() === '';
            if (!item.active && descEmpty) {
                setPublishError('Описание');
            } else {
                setPublishError(null);
                dispatch(
                    patchProduct({
                        url: item.id,
                        data: {active: !item.active},
                    }),
                ).then(() => dispatch(getProducts()));
            }
        }),
        [],
    );

    const activeCategoryButtonHandler = useCallback(
        debounce(700, true, (item: IProductCategory) => {
            dispatch(
                patchProductCategory({
                    url: item.id,
                    data: {active: !item.active},
                }),
            ).then(() => dispatch(getProductCategories()));
        }),
        [],
    );*/

  return (
    <>
      <div className={styles.title}>
        <h2>
            {TITLE}
        </h2>
           <button className={styles.add} onClick={onAddCategoryClick}>
            <AddIcon />
          </button>
      </div>
      <ul className={styles.list}>
        {categories.map((category, idx) => (
          <li key={`product-catalog-category-${idx}`}>
            <CategoryItem
                controls={
                    <div className={styles.controls}>
                        <button className={cn(styles.addWithMargin, styles.add)} onClick={() => onAddProductClick(category)}>
                            <AddIcon/>
                        </button>
                        <div className={styles.toggle}>0</div>
                        <button onClick={() => onEditCategoryClick(category)}>
                            <EditIcon/>
                        </button>
                        <button onClick={() => onRemoveCategoryClick(category)}>
                            <RemoveIcon />
                        </button>
                    </div>
                }
              name={category.title}
              onClick={() => onExpandCategory(category.id)}
              selected={!!expandList?.find(c => c.id === category.id)?.expand}
            />

            {expandList[category.id] && (
              <ul className={styles.list}>
                {category?.products?.map((item, idx) => (
                    <ProductListItem
                      key={`product-catalog-item-${idx}`}
                      controls={
                          <div className={styles.controls}>
                              <div className={styles.toggle}>0</div>
                              <button onClick={(e) => onEditProductClick(item, e)}>
                                  <EditIcon/>
                              </button>
                              <button onClick={(e) => onRemoveProductClick(item, e)}>
                                  <RemoveIcon />
                              </button>
                          </div>
                      }
                      name={item.title}
                      onSelect={() => setSelectedProduct(item.id)}
                      selected={selectedProduct === item.id}
                    />
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default memo(ProductList);
