import {
  component$,
  Slot,
  $,
  type QwikIntrinsicElements,
  QwikKeyboardEvent,
  useSignal,
  QwikMouseEvent,
  useContextProvider,
} from "@builder.io/qwik";
import { checkboxRootContextId } from "./checkbox-context";

type CheckedState = boolean | "indeterminate";
export type RootProps = Omit<
  QwikIntrinsicElements["button"],
  "checked" | "defaultChecked"
> & {
  defaultChecked?: CheckedState;
  checked?: CheckedState;
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

  const checked = useSignal<CheckedState>(
    checkedProp ?? defaultChecked ?? false
  );
  const ref = useSignal<HTMLButtonElement>();

  useContextProvider(checkboxRootContextId, {
    checked,
  });

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
        aria-checked={checkedProp === "indeterminate" ? "mixed" : checkedProp}
        aria-required={required}
        data-state={getState(checkedProp ?? false)}
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
        {checked.value === true ? <Slot /> : null}
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
