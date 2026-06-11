declare module "@splidejs/react-splide" {
  import { ComponentType, RefAttributes } from "react";

  export interface SplideProps {
    options?: Record<string, unknown>;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: unknown;
  }

  export interface SplideSlideProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    [key: string]: unknown;
  }

  export const Splide: ComponentType<SplideProps & RefAttributes<unknown>>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
  export const SplideTrack: ComponentType<Record<string, unknown>>;
}
