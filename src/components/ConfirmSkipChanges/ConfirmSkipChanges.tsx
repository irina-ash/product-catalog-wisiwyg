import React from 'react';
import styles from './ConfirmSkipChanges.module.sass';
import Popup from 'components/Popup';
import {IPopupModalCommonProps} from 'entities/common/common.types';

interface ConfirmSkipChangesProp extends IPopupModalCommonProps {
  onSkipClick: () => void;
  onPreviewClick: () => void;
}

const ConfirmSkipChanges = (props: ConfirmSkipChangesProp) => {
  return (
    <Popup
      description="На форме редактирования продукта имеются несохранённые изменения. Выберите действие."
      title="Сохранение изменений"
    >
      <div className={styles.buttons}>
        <button
          onClick={props.onSkipClick}
        >
          Отменить изменения
        </button>
        <button
          onClick={props.onPreviewClick}
        >
          Предпросмотр и сохранение
        </button>
      </div>
    </Popup>
  );
};

export default ConfirmSkipChanges;
