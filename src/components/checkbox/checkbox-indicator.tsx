import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";
import { useCheckboxContext } from "./checkbox-context";

export const Indicator = component$<QwikIntrinsicElements["div"]>((props) => {
  const { checked } = useCheckboxContext();

  console.log("Indicator", checked.value);

  if (checked.value)
    return (
      <div
        {...props}
        data-state={checked.value}
      >
        <Slot />
      </div>
    );

  return <></>;
});
