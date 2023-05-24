import cn from "classnames";
import React, { FC, forwardRef, memo } from "react";

import { IButtonProps } from "./types";

import styles from "./Button.module.scss";

const Button: FC<IButtonProps> = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
  const {
    className,
    children,
    disabled = false,
    full = false,
    type = "button",
    theme = "default",
    ...rest
  } = props;

  const buttonProps = {
    ...rest,
    className: cn(
      styles.button,
      styles[`button--${theme}`],
      { [styles.buttonCursorPointer]: !!rest.onClick },
      { [styles.buttonFull]: full },
      { [styles.buttonPointerEventsOff]: disabled },
      className,
    ),
    disabled,
    ref,
    type,
  };

  return (
    <button {...buttonProps}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default memo(Button);
