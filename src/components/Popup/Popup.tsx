import React from "react";
import cn from "classnames";
import styles from "./Popup.module.sass";
import {IPopupProps} from "./types";

export const Popup = ({ className, children }: IPopupProps) => {
    return (
        <div className={cn(className, styles.popup)}>
            <h2></h2>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Popup;