import React from 'react';
import styles from './NotFoundWithButton.module.sass';

interface INotFoundWithButtonProp {
  title?: string | null;
  subTitle?: string | null;
}

const NotFoundWithButton = (props: INotFoundWithButtonProp) => (
  <div className={styles.card}>
    <h1 className={styles.headline}>
      {props.title}
    </h1>
    <p className={styles.textDescription}>
      {props.subTitle}
    </p>
  </div>
);

export default NotFoundWithButton;
