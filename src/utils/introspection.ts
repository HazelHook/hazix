import { Signal } from "@builder.io/qwik";

export function isSignal(value: any): value is Signal<any> {
    return value && value.constructor.name === 'SignalImpl';
}