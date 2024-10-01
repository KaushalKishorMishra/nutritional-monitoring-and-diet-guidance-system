import type { PropsWithChildren, ReactElement } from "react";

export type PParallaxScrollView = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;
