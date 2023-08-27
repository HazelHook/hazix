import { QwikIntrinsicElements, component$, $, Slot } from "@builder.io/qwik";
import { useDropdownMenuContext } from "./dropdown-context";

// Typescript sucks
export type TriggerProps = {__ts_sucks?: false} & QwikIntrinsicElements["button"];

export const Trigger = component$<TriggerProps>((props) => {
  const context = useDropdownMenuContext();

  const onClick = $(() => {
    if (context.open) {
      context.open.value = !context.open.value;
    }
  });

  return (
    <>
      <button
        tabIndex={-1}
        {...props}
        onClick$={onClick}
        aria-expanded={context.open.value}
        data-state={context.open.value ? "open" : "closed"}
      >
        <Slot />
      </button>
    </>
  );
});
