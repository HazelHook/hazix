import { component$ } from "@builder.io/qwik";
import { Logo } from "components/logo/logo";
import * as Checkbox from "components/checkbox";

export const Showcase = component$(() => {
  return (
    <div class="w-full h-full px-12 py-8 space-y-8 flex flex-col">
      <Logo />
      <Checkbox.Root
        class="w-5 h-5 bg-white rounded-sm"
        defaultChecked
      >
        <Checkbox.Indicator class="text-sm">
          X
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  );
});
