import React, {FC, memo} from 'react';
import cn from 'classnames';
import Arrow from 'components/Arrow';
import styles from './CategoryItem.module.scss';
import {ICategoryItemProps} from "./types";

const CategoryItem: FC<ICategoryItemProps> = ({name, selected, controls, onClick}) => (
    <div className={styles.category}>
      <div className={styles.categoryWithArrow} onClick={onClick}>
        <Arrow
          direction={selected ? 'top' : 'bottom'}
        />
        <span className={cn(styles.categoryName, {
            [styles.categoryWithControls]: controls,
          })}>
          {name}
        </span>
      </div>
      {controls}
    </div>
);

export default memo(CategoryItem);
