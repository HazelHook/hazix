import { QwikIntrinsicElements, component$ } from "@builder.io/qwik";

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
} & QwikIntrinsicElements["div"];

export const Separator = component$<SeparatorProps>(
  ({ orientation = "horizontal", ...props }) => {
    if(orientation === "horizontal") {
      return <div {...props} class={`w-full h-px ${props.class}`} />;
    }

    return <div {...props} class={`w-px h-full ${props.class}`} />;
  }
);
