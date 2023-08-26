import {
  ContextId,
  JSXNode,
  QRL,
  Signal,
  createContextId,
  useContext,
  useContextProvider,
} from "@builder.io/qwik";

export type ContextPair<T> = { id: ContextId<T>; value: T };
export type PortalProviderContext = QRL<
  (
    name: string,
    elementToTeleport: JSXNode,
    contexts?: Array<ContextPair<unknown>>
  ) => QRL<() => void>
>;
export interface PortalInfo {
  name: string;
  elementToTeleport: JSXNode;
  contextPairs: Array<ContextPair<unknown>>;
  close$?: QRL<() => void>;
}


const portalProviderContextId =
  createContextId<PortalProviderContext>("portal-provider");
export const closePortalContextId = createContextId<QRL<() => void>>("close-portal");
const portalInfoListContextId =
  createContextId<Signal<Array<PortalInfo>>>("Portals");

export function usePortalProviderContext() {
  return useContext(portalProviderContextId);
}
export function setupPortalProviderContextProvider(context: PortalProviderContext) {
  // eslint-disable-next-line qwik/use-method-usage
  useContextProvider(portalProviderContextId, context);
}

export function useClosePortalContext() {
  return useContext(closePortalContextId);
}
export function setupClosePortalContextProvider(context: QRL<() => void>) {
  // eslint-disable-next-line qwik/use-method-usage
  useContextProvider(closePortalContextId, context);
}

export function usePortalInfoListContext() {
  return useContext(portalInfoListContextId);
}
export function setupPortalInfoListContextProvider(context: Signal<Array<PortalInfo>>) {
  // eslint-disable-next-line qwik/use-method-usage
  useContextProvider(portalInfoListContextId, context);
}