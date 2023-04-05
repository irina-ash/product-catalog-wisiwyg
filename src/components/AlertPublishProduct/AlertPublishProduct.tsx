import React from 'react';
import styles from './AlertPublishProduct.module.sass';

interface AlertPublishProductProp {
  message: string | null;
  title: string | null;
}

const AlertPublishProduct = (props: AlertPublishProductProp) => {
  return (
    <div className={styles.popup}>
      <h6>{props.title}</h6>
      <span>{props.message}</span>
    </div>
  );
};

export default AlertPublishProduct;
