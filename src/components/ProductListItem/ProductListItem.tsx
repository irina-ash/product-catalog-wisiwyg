import React, {memo} from 'react';
import cn from 'classnames';
import styles from './ProductListItem.module.sass';
import {IProductListItemProps} from "./types";

const ProductListItem = ({name, selected, onSelect, controls}: IProductListItemProps) => (
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
