import { Fragment, JSXNode, component$, useContextProvider } from "@builder.io/qwik";
import { ContextPair, usePortalInfoListContext } from "./dialog-context";

const WrapJsxInContext = component$<{
    elementToTeleport: JSXNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contextPairs: Array<ContextPair<any>>;
  }>(({ elementToTeleport, contextPairs }) => {
    // eslint-disable-next-line qwik/use-method-usage
    contextPairs.forEach(({ id, value }) => useContextProvider(id, value));
    return (
      <>
        {/* Workaround: https://github.com/BuilderIO/qwik/issues/4966 */}
        {/* {jsx} */}
        {[elementToTeleport].map((jsx) => jsx)}
      </>
    );
  });

  
/**
 * IMPORTANT: In order for the <Portal> to correctly render in SSR, it needs
 * to be rendered AFTER the call to open portal. (Setting content to portal
 * AFTER the portal is rendered can't be done in SSR, because it is not possible
 * to return back to the <Portal/> after it has been streamed to the client.)
 */
export const Portal = component$<{ name: string }>(({ name }) => {
  const portalInfoList = usePortalInfoListContext()
  const myPortalInfoList = portalInfoList.value.filter(
    (portal) => portal.name === name
  );
  return (
    <>
      {myPortalInfoList.map((portalInfo) => (
        <Fragment key={name}>
          <WrapJsxInContext
            elementToTeleport={portalInfo.elementToTeleport}
            contextPairs={portalInfo.contextPairs}
          />
        </Fragment>
      ))}
    </>
  );
});
