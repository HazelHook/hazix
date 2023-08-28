import {
  component$,
  QwikIntrinsicElements,
  Signal,
  Slot,
  useSignal,
} from "@builder.io/qwik";
import { setupDropdownMenuContextProvider } from "./dropdown-context";

export type RootProps = {
  open?: Signal<boolean>;
  defaultOpen?: boolean;
} & QwikIntrinsicElements["div"];

export const Root = component$<RootProps>((props) => {
  const {
    open = useSignal(props.defaultOpen ?? false),
    defaultOpen,
    ...rest
  } = props;

  setupDropdownMenuContextProvider({
    open,
    contentRef: useSignal<HTMLElement>(),
  });

  return (
    <div {...rest}>
      <Slot />
    </div>
  );
});
