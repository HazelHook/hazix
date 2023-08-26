import { component$, useSignal } from "@builder.io/qwik";
import { Logo } from "components/logo/logo";
import * as Checkbox from "components/checkbox";
import * as Dialog from "components/dialog";
import { Root as Label } from "components/label";

export const Showcase = component$(() => {
  const dialogOpen = useSignal(false)

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="black"
              role="checkbox"
              aria-checked
            >
              <path d="M6 18L18 6M6 6l12 12" stroke="black" stroke-width="2" />
            </svg>
          </Checkbox.Indicator>
        </Checkbox.Root>
        <Label for="test-checkbox" class="ml-2 text-white">
          Checkbox {dialogOpen.value ? "open" : "closed"}
        </Label>
      </form>

        <Dialog.Root open={dialogOpen}>
        <Dialog.Trigger class="bg-slate-800 text-white rounded-sm px-4 py-2 w-32">
          Open Dialog
        </Dialog.Trigger>
        <Dialog.Portal class="bg-black bg-opacity-50">
          <Dialog.Content class="bg-slate-700 rounded-md p-4 max-w-sm">
            <div q:slot="title" class="text-white text-xl">
              Dialog Title
            </div>
            <div q:slot="description" class="text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <Dialog.Close q:slot="close" class="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="18"
                height="18"
                viewBox="0 0 50 50"
                class="fill-white"
              >
                <title>Close</title>
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
              </svg>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
});
