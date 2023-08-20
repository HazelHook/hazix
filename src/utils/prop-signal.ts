import { Signal, useSignal } from "@builder.io/qwik";
import { isSignal } from "./types";


export function makeSignal<T>(value: T | Signal<T>): Signal<T> {
    if(isSignal(value)){
        return value as Signal<T>;
    }
    // eslint-disable-next-line qwik/use-method-usage
    return useSignal(value);
}