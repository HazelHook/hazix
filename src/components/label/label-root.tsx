import { type QwikIntrinsicElements, component$, Slot } from "@builder.io/qwik";

export type RootProps = Omit<QwikIntrinsicElements["label"], "for"> & {
    for: string;
};

export const Root = component$<RootProps>((props) => {
    return <label {...props}>
        <Slot />
    </label>
})
