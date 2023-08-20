import { component$ } from "@builder.io/qwik";
import { Logo } from "components/logo/logo";
import * as Checkbox from "components/checkbox";
import {Root as Label} from "components/label";

export const Showcase = component$(() => {
  return (
    <div class="w-full h-full px-12 py-8 space-y-8 flex flex-col">
      <Logo />
      <form>
        <Checkbox.Root
          class="w-4 h-4 bg-white rounded-sm"
          defaultChecked
          name="test-checkbox"
        >
          <Checkbox.Indicator class="text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="black" role="checkbox" aria-checked>
              <path d="M6 18L18 6M6 6l12 12" stroke="black" stroke-width="2"/>
            </svg>
          </Checkbox.Indicator>
        </Checkbox.Root>
        <Label for="test-checkbox" class="ml-2 text-white">Checkbox</Label>

        
      </form>
    </div>
  );
});
