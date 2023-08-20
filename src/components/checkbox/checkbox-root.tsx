import {
  component$,
  Slot,
  $,
  type QwikIntrinsicElements,
  QwikKeyboardEvent,
  useSignal,
  QwikMouseEvent,
  Signal,
} from "@builder.io/qwik";
import { setupCheckboxContextProvider } from "./checkbox-context";
import { makeSignal } from "../../utils/prop-signal";

type CheckedState = boolean | "indeterminate";
export type RootProps = Omit<
  QwikIntrinsicElements["button"],
  "checked" | "defaultChecked"
> & {
  defaultChecked?: CheckedState;
  checked?: Signal<CheckedState> | CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
  required?: boolean;
};

export const Root = component$<RootProps>((props) => {
  const {
    defaultChecked,
    checked: checkedProp,
    onCheckedChange,
    disabled,
    value = "on",
    required,
    ...otherProps
  } = props;
  const otherPropsTyped: QwikIntrinsicElements["button"] = otherProps;
  const ref = useSignal<HTMLButtonElement>();

  const checked = makeSignal<CheckedState>(checkedProp ?? defaultChecked ?? false)
  setupCheckboxContextProvider(checked);

  return (
    <>
      <input
        type="checkbox"
        aria-hidden
        tabIndex={-1}
        class={'absolute pointer-events-none opacity-0 m-0'}
      />
      <button
        type="button"
        role="checkbox"
        ref={ref}
        aria-checked={checked.value === "indeterminate" ? "mixed" : checked.value}
        aria-required={required}
        data-state={getState(checked.value ?? false)}
        data-disabled={disabled ? "" : undefined}
        disabled={disabled}
        value={value}
        {...otherPropsTyped}
        onKeyDown$={[
          $((e: QwikKeyboardEvent) => {
            // According to WAI ARIA, Checkboxes don't activate on enter keypress
            if (e.key === "Enter") {
              e.stopPropagation();
            }
          }),
          otherPropsTyped.onKeyDown$,
        ]}
        onClick$={[
          $((event: QwikMouseEvent) => {
            checked.value =
              checked.value === "indeterminate" ? true : !checked.value;
            onCheckedChange?.(checked.value);
            event.stopPropagation();
          }),
          otherPropsTyped.onClick$,
        ]}
      >
        {checked.value && <Slot />}
      </button>
    </>
  );
});

function getState(checked: CheckedState) {
  return checked === "indeterminate"
    ? "indeterminate"
    : checked
    ? "checked"
    : "unchecked";
}
