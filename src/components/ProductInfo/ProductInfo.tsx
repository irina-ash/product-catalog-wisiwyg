import React, {memo} from 'react';
import styles from './ProductInfo.module.sass';
import {IProduct} from 'entities/product/product.types';

interface ProductInfoProp {
  product: IProduct;
}

const ProductInfo = ({product}: ProductInfoProp) => {
  return (
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
};

export default memo(ProductInfo);
