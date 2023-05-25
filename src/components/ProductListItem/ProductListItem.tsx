import React, {FC, memo} from 'react';
import cn from 'classnames';
import styles from './ProductListItem.module.scss';
import {IProductListItemProps} from "./types";

const ProductListItem: FC<IProductListItemProps> = ({name, selected, onSelect, controls}) => (
  <li className={styles.product} onClick={onSelect}>
    <div
      className={cn(styles.productName, {
        [styles.selected]: selected,
        [styles.productWithControls]: controls,
      })}
    >
      {name}
    </div>
    {controls}
  </li>
);

export default memo(ProductListItem);
