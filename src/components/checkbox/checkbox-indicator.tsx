import {
  QwikIntrinsicElements,
  Slot,
  component$,
} from "@builder.io/qwik";
import { useCheckboxContext } from "./checkbox-context";

export type IndicatorProps = QwikIntrinsicElements["span"];

export const Indicator = component$<IndicatorProps>((props) => {
  const context = useCheckboxContext()

  return (
    <span
      data-state={context.checked.value}
      {...props}
      class={`pointer-events-none ${props.class}`}
    >
      <Slot />
    </span>
  );
});
