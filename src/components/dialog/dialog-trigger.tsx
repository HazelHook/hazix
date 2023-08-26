import { QwikIntrinsicElements, component$, $, Slot } from "@builder.io/qwik";
import { usePortalProviderContext } from "./dialog-context";

export type ComboboxTriggerProps = {
  dialog?: string;
} & QwikIntrinsicElements["button"];

export const Trigger = component$<ComboboxTriggerProps>((props) => {
  const portalContext = usePortalProviderContext();

  const onClick = $(() => {
    if (portalContext.open) {
      portalContext.open.value = !portalContext.open.value;
    }
  });
  
  return (
    <>
      <button tabIndex={-1} type="button" {...props} onClick$={onClick}>
        <Slot />
      </button>
    </>
  );
});
