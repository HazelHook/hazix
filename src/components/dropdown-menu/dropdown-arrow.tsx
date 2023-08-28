import {
  QwikIntrinsicElements,
  component$,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./dropdown-arrow.css?inline";
import { useDropdownMenuContext } from "./dropdown-context";

export type ContentProps = {} & QwikIntrinsicElements["span"];

export const Arrow = component$<ContentProps>(
  ({ class: classes, ...props }) => {
    useStylesScoped$(styles);
    const context = useDropdownMenuContext();
    const left = (context.contentRef.value?.clientWidth ?? 0) / 2 - 5;
    console.log(left)

    return (
      <span class={`dropdown-arrow ${classes}`} {...props} style={{left: `${left}px`}}>
        <svg
          width="10"
          height="5"
          viewBox="0 0 30 10"
          preserveAspectRatio="none"
          style="display: block; fill: currentColor;"
        >
          <polygon points="0,0 30,0 15,10"></polygon>
        </svg>
      </span>
    );
  }
);
