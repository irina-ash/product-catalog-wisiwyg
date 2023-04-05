export type TLoadingState = "idle" | "loading" | "success" | "failed";

export interface IPopupModalCommonProps {
    opened: boolean;
    onCloseModal(): void;
}