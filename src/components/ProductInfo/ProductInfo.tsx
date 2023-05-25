import React, {FC, memo} from 'react';
import styles from './ProductInfo.module.scss';
import { IProductInfoProps } from './types';

const ProductInfo: FC<IProductInfoProps> = ({product}) => (
  <div>
    <div className={styles.headline}>
      <h1>{product?.title}</h1>
    </div>
    <div
      className={styles.content}
      dangerouslySetInnerHTML={{__html: product?.content || ''}}
    />
  </div>
);

export default memo(ProductInfo);
