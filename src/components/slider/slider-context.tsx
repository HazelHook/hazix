import {
  createContextId,
  useContext,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";

export type SliderRootContext = {
  thumbs: Set<HTMLElement>;
};

const checkboxContextId = createContextId<SliderRootContext>("checkbox-root");

export function useSliderContext() {
  return useContext(checkboxContextId);
}

export function setupSliderContextProvider(
  data: SliderRootContext
) {
  // eslint-disable-next-line qwik/use-method-usage
  const store = useStore(data);
  // eslint-disable-next-line qwik/use-method-usage
  useContextProvider(checkboxContextId, store);

  return store;
}
