import React, {memo} from 'react';
import styles from './AlertPublishProduct.module.scss';

interface AlertPublishProductProp {
  message: string | null;
  title: string | null;
}

const AlertPublishProduct = (props: AlertPublishProductProp) => {
  return (
    <div>
      <h6>{props.title}</h6>
      <span>{props.message}</span>
    </div>
  );
};

export default memo(AlertPublishProduct);
