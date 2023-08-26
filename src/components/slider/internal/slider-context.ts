import {
  createContextId,
  useContext,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";

export type SliderOrientationRootContext = {
  direction: 1 | -1;
} & (
  | {
      type: "horizontal";
      startEdge: "left" | "right";
      endEdge: "left" | "right";
    }
  | {
      type: "vertical";
      startEdge: "top" | "bottom";
      endEdge: "top" | "bottom";
    }
);

const sliderOrientationContextId =
  createContextId<SliderOrientationRootContext>("slider-orientation");

export function useSliderOrientationContext() {
  return useContext(sliderOrientationContextId);
}

export function setupSliderOrientationContextProvider(
  data: SliderOrientationRootContext
) {
  // eslint-disable-next-line qwik/use-method-usage
  const store = useStore(data);
  // eslint-disable-next-line qwik/use-method-usage
  useContextProvider(sliderOrientationContextId, store);

  return store;
}
