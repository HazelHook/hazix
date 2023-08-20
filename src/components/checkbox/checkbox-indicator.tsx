import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
} from "@builder.io/qwik";
import { checkboxRootContextId } from "./checkbox-context";

export type IndicatorProps = QwikIntrinsicElements["span"];

export const Indicator = component$<IndicatorProps>((props) => {
  const context = useContext(checkboxRootContextId);

  return (
    <span
      data-state$={context.checked.value}
      {...props}
      class={`pointer-events-none ${props.class}`}
    >
      <Slot />
    </span>
  );
});
