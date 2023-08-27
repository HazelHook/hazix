import {
  QwikIntrinsicElements,
  component$,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./dropdown-arrow.css?inline";
import { useDropdownMenuContext } from "./dropdown-context";

export type ContentProps = {} & QwikIntrinsicElements["div"];

export const Arrow = component$<ContentProps>(
  ({ class: classes, ...props }) => {
    useStylesScoped$(styles);
    const context = useDropdownMenuContext()

    return (
      <span class="dropdown-arrow">
        <svg
          width="10"
          height="5"
          viewBox="0 0 30 10"
          preserveAspectRatio="none"
          style="display: block;"
        >
          <polygon points="0,0 30,0 15,10"></polygon>
        </svg>
      </span>
    );
  }
);
