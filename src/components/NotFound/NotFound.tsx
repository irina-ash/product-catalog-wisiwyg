import React, {FC, memo} from 'react';
import styles from './NotFound.module.scss';
import { INotFoundProps } from './types';

const NotFound: FC<INotFoundProps> = ({subTitle, title}) => (
  <div className={styles.card}>
    <h1 className={styles.headline}>
      {title}
    </h1>
    <p className={styles.textDescription}>
      {subTitle}
    </p>
  </div>
);

export default memo(NotFound);
