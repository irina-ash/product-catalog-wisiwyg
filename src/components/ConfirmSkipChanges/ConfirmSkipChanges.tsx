import React, {FC, memo} from 'react';
import styles from './ConfirmSkipChanges.module.scss';
import Popup from 'components/Popup';
import Button from 'components/Button';
import { IConfirmSkipChangesProps } from './types';
import { BTN_CANCEL, BTN_OK, DESCRIPTION, TITLE } from './constants';

const ConfirmSkipChanges: FC<IConfirmSkipChangesProps> = ({onPreviewClick, onSkipClick}) => (
  <Popup
    description={DESCRIPTION}
    title={TITLE}
  >
    <div className={styles.buttons}>
      <Button
        onClick={onSkipClick}
      >
        {BTN_CANCEL}
      </Button>
      <Button
        onClick={onPreviewClick}
        theme="success"
      >
        {BTN_OK}
      </Button>
    </div>
  </Popup>
);

export default memo(ConfirmSkipChanges);
