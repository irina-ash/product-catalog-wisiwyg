import React, {FC, memo} from 'react';
import styles from './Alert.module.scss';
import { IAlertProp } from './types';

const Alert: FC<IAlertProp> = ({title, message}) => (
  <div className={styles.alert}>
    {title && <h6>{title}</h6> }
    {message && <span>{message}</span>}
  </div>
);

export default memo(Alert);
