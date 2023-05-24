import React, {memo} from "react";
import cn from "classnames";
import styles from "./Arrow.module.scss";
import {IArrowProps} from "./types";

const Arrow = ({
                   className,
                   direction = "right",
                   onClick,
               }: IArrowProps) => {
    return (
        <div
            className={cn(className, styles.arrowWrapper)}
        >
            <div
                className={cn(styles.arrow, styles[`arrow--direction-${direction}`])}
                onClick={onClick}
                role="presentation"
            />
        </div>
    );
};

export default memo(Arrow);
