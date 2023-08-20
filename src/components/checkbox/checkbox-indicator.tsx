import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";

export type IndicatorProps = QwikIntrinsicElements["span"];

export const Indicator = component$<IndicatorProps>((props) => {

  return <span {...props}>
    <Slot />
  </span>
});