import {
  component$,
  type QwikIntrinsicElements,
  Signal,
  useSignal,
} from "@builder.io/qwik";

type SwitchCustomProps = {
  /**
   * The controlled state of the toggle.
   */
  pressed?: Signal<boolean>;
  /**
   * The state of the toggle when initially rendered. Use `defaultPressed`
   * if you do not need to control the state of the toggle.
   * @defaultValue false
   */
  defaultPressed?: boolean;
};

type SwitchProps = SwitchCustomProps & QwikIntrinsicElements["input"];

export const Switch = component$<SwitchProps>((props) => {
  const {
    // eslint-disable-next-line qwik/use-method-usage
    pressed = useSignal(props.defaultPressed),
    defaultPressed = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class: _,
    ...buttonProps
  } = props;

  return (
    <div
      class="relative inline-block w-10 h-6 bg-gray-600 p-1 cursor-pointer"
      onClick$={() => {
        pressed.value = !pressed.value;
      }}
    >
      <input
        type="checkbox"
        aria-pressed={pressed?.value ?? defaultPressed ?? false}
        data-state={pressed?.value ? "on" : "off"}
        data-disabled={props.disabled ? "" : undefined}
        {...(buttonProps as any)}
        class="absolute w-0 h-0 opacity-0"
      />
      <span
        class={(() => {
          const baseClass =
            "absolute inline-block w-4 h-4 bg-white transition-transform transform";

          if (pressed.value) {
            return `${baseClass} translate-x-full`;
          }
          return baseClass;
        })()}
      />
    </div>
  );
});

// export const SwitchThumb = component$<QwikIntrinsicElements["div"]>((props) => {
//   return (
//     <div
//       class="absolute inline-block w-4 h-4 bg-white transition-transform transform"
//       {...props}
//     />
//   );
// }