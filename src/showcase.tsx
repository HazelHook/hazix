import { component$ } from "@builder.io/qwik";
import { Logo } from "components/logo/logo";
import * as Checkbox from "components/checkbox";

export const Showcase = component$(() => {
  return (
    <div>
      <Logo />
      <Checkbox.Root
        class="w-5 h-5 bg-white rounded-sm"
      >
        <Checkbox.Indicator class="w-full h-full">
          <p class="text-sm">X</p>
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  );
});
