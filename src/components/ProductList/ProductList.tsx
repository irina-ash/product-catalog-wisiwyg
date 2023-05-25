import React, {memo, useCallback, useEffect, useState} from 'react';
import cn from "classnames";

import Button from "components/Button";
import ProductListItem from 'components/ProductListItem';
import CategoryItem from 'components/CategoryItem';

import {ReactComponent as AddIcon} from "icons/Add.svg";
import {ReactComponent as EditIcon} from "icons/Edit.svg";
import {ReactComponent as RemoveIcon} from "icons/Bin.svg";

import styles from './ProductList.module.scss';

import {IProductListProps} from "./types";
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
  const [expandId, setExpandId] = useState<number | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);

  const onExpandCategory = useCallback((id: number) => {
    setExpandId(id);
  }, [expandId]);

  return (
    <>
      <div className={styles.title}>
        <h2>
            {TITLE}
        </h2>
        <Button className={styles.add} onClick={onAddCategoryClick}>
          <AddIcon />
        </Button>
      </div>
      <ul className={styles.list}>
        {categories.map((category, idx) => (
          <li key={`product-catalog-category-${idx}`}>
            <CategoryItem
                controls={
                    <div className={styles.controls}>
                        <Button className={styles.add} onClick={() => onAddProductClick(category)}>
                            <AddIcon/>
                        </Button>
                        <Button onClick={() => onEditCategoryClick(category)} theme="flat">
                            <EditIcon/>
                        </Button>
                        <Button onClick={() => onRemoveCategoryClick(category)} theme="flat">
                            <RemoveIcon />
                        </Button>
                    </div>
                }
              name={category.title}
              onClick={() => onExpandCategory(category.id)}
              selected={expandId === category.id}
            />

            {(expandId === category.id) && (
              <ul className={styles.list}>
                {category?.products?.map((item, idx) => (
                    <ProductListItem
                      key={`product-catalog-item-${idx}`}
                      controls={
                          <div className={styles.controls}>
                            <Button onClick={(e) => onEditProductClick(item, e)} theme="flat">
                                <EditIcon/>
                            </Button>
                            <Button onClick={(e) => onRemoveProductClick(item, e)} theme="flat">
                                <RemoveIcon />
                            </Button>
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
