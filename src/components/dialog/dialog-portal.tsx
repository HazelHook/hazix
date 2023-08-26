import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";
import { usePortalProviderContext } from "./dialog-context";

export const Portal = component$<QwikIntrinsicElements["div"]>(
  ({ class: classProp, ...props }) => {
    const portalContext = usePortalProviderContext();
    return (
      <div
        {...props}
        class={`z-30 absolute w-screen h-screen top-0 left-0 justify-center items-center align-middle flex ${classProp}`}
        onClick$={() => {
          portalContext.open.value = false;
        }}
        style={{
          display: portalContext.open?.value ? "flex" : "none",
          marginTop: "0px",
        }}
      >
        <Slot />
      </div>
    );
  }
);

export const Content = component$<QwikIntrinsicElements["div"]>((props) => {
  return (
    <div {...props} onClick$={(e) => e.stopPropagation()}>
      <div class="flex flex-row justify-between ">
        <div class="mr-4">
          <Slot name="title" />
        </div>
        <Slot name="close" />
      </div>
      <Slot name="description" />
    </div>
  );
});

export const Close = component$<QwikIntrinsicElements["button"]>((props) => {
  const portalContext = usePortalProviderContext();

  return (
    <button
      type="button"
      {...props}
      class={`${props.class}`}
      onClick$={() => {
        portalContext.open.value = false;
      }}
      window:onKeyDown$={(e) => {
        if(e.key === "Escape") portalContext.open.value = false;
      }}
    >
      <Slot />
    </button>
  );
});
