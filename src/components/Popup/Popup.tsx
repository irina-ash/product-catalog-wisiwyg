import React, { FC } from "react";
import cn from "classnames";
import styles from "./Popup.module.scss";
import {IPopupProps} from "./types";

export const Popup: FC<IPopupProps> = ({ description, className, children, title }) => (
    <div className={cn(className, styles.popup)}>
        <div className={styles.content}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {description && <p className={styles.description}>{description}</p>}
            {children}
        </div>
    </div>
);

export default Popup;