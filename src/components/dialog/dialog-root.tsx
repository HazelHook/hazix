/* eslint-disable qwik/valid-lexical-scope */
import { component$, JSXNode, Slot, useSignal, $ } from "@builder.io/qwik";
import { ContextPair, PortalInfo, closePortalContextId, setupPortalInfoListContextProvider, setupPortalProviderContextProvider } from "./dialog-context";
import { Portal } from "./dialog-portal";

export const QwikUIProvider = component$(() => {
    const portalInfoListSig = useSignal<PortalInfo[]>([]);
    setupPortalInfoListContextProvider(portalInfoListSig);
  
    // Provide the public API for the PopupManager for other components.
    setupPortalProviderContextProvider(
      $(
        (
          name: string,
          elementToTeleport: JSXNode,
          contextPairs?: Array<ContextPair<unknown>>
        ) => {
          const portalInfo: PortalInfo = {
            name,
            elementToTeleport,
            contextPairs: contextPairs || [],
          };
          portalInfo.close$ = $(function removePortalFromList() {
            portalInfoListSig.value = portalInfoListSig.value.filter(
              (currentPortalInfo) => currentPortalInfo !== portalInfo
            );
          });
          portalInfo.contextPairs.push({
            id: closePortalContextId,
            value: portalInfo.close$,
          });
          portalInfoListSig.value = [...portalInfoListSig.value, portalInfo];
          return portalInfo.close$;
        }
      )
    );
    return (
      <>
        <Slot />
        <Portal name="comboboxPortal" />
      </>
    );
  });
  