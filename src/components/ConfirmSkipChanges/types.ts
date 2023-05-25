import { IPopupModalCommonProps } from "entities/common/common.types";

export interface IConfirmSkipChangesProps extends IPopupModalCommonProps {
    onSkipClick(): void;
    onPreviewClick(): void;
}