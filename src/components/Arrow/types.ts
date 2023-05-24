export type TArrowDirections = "left" | "right" | "top" | "bottom";

export interface IArrowProps {
    /** дополнительные классы */
    className?: string;
    /** направление стрелки */
    direction: TArrowDirections;
    /** событие при нажатии на стрелку */
    onClick?(): void;
}