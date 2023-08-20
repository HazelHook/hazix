import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";
import { useCheckboxContext } from "./checkbox-context";

export const Indicator = component$<QwikIntrinsicElements["span"]>((props) => {
  const { checked } = useCheckboxContext();

  console.log("Indicator", checked.value);

  if (checked.value)
    return (
      <span
        data-state={checked.value}
        class={`pointer-events-none ${props.class}`}
        {...props}
      >
        <Slot />
      </span>
    );

  return <></>;
});
