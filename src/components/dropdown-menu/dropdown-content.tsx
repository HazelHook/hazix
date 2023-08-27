import { QwikIntrinsicElements, component$, Slot, useSignal, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import { useDropdownMenuContext } from "./dropdown-context";
import styles from "./dropdown-content.css?inline"

export type ContentProps = {} & QwikIntrinsicElements["div"];

export const Content = component$<ContentProps>(
  ({ class: classes, ...props }) => {
    const context = useDropdownMenuContext();
    const ref = useSignal<HTMLElement>()
    useStylesScoped$(styles)

    useVisibleTask$(() => {
      context.contentRef.value = ref.value
    })

    return (
      <div
        {...props}
        role="menu"
        ref={ref}
        aria-label="Dropdown Menu"
        aria-orientation="vertical"
        data-state={context.open.value ? "open" : "closed"}
        class={`dropdown-content ${context.open.value ? 'open' : 'closed'} ${classes}`}
      >
        <Slot />
      </div>
    );
  }
);
