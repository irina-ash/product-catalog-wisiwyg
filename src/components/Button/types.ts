import { ComponentPropsWithRef, ReactNode } from "react";

export type TButtonTheme = "default" | "flat" | "success";

export interface IButtonProps extends ComponentPropsWithRef<"button"> {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  full?: boolean;
  theme?: TButtonTheme;
}
