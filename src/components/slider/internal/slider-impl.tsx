import { QwikIntrinsicElements, QwikKeyboardEvent, QwikPointerEvent, component$ } from "@builder.io/qwik";
import { ARROW_KEYS, PAGE_KEYS } from "./data";
import { useSliderContext } from "../slider-context";

type PrimitiveDivProps = QwikIntrinsicElements["div"];
export type SliderImplPrivateProps = {
  onSlideStart(event: QwikPointerEvent): void;
  onSlideMove(event: QwikPointerEvent): void;
  onSlideEnd(event: QwikPointerEvent): void;
  onHomeKeyDown(event: QwikKeyboardEvent): void;
  onEndKeyDown(event: QwikKeyboardEvent): void;
  onStepKeyDown(event: QwikKeyboardEvent): void;
};
export interface SliderImplProps extends PrimitiveDivProps, SliderImplPrivateProps {}
export type SliderImplElement = QwikIntrinsicElements["span"]

export const SliderImpl = component$<SliderImplProps>((props) => {
    const {
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onHomeKeyDown,
      onEndKeyDown,
      onStepKeyDown,
      ...sliderProps
    } = props;
    const context = useSliderContext();
  
    return (
      <span
        {...sliderProps}
        onKeyDown$={[
          ((event) => {
            if (event.key === "Home") {
              onHomeKeyDown(event);
              // Prevent scrolling to page start
              event.stopPropagation()
            } else if (event.key === "End") {
              onEndKeyDown(event);
              // Prevent scrolling to page end
              event.stopPropagation()
            } else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
              onStepKeyDown(event);
              // Prevent scrolling for directional key presses
              event.stopPropagation()
            }
          }),
          props.onKeyDown$,
        ]}
        onPointerDown$={[
          ((event) => {
            const target = event.target as HTMLElement;
            target.setPointerCapture(event.pointerId);
            // Prevent browser focus behaviour because we focus a thumb manually when values change.
            event.stopPropagation()
            // Touch devices have a delay before focusing so won't focus if touch immediately moves
            // away from target (sliding). We want thumb to focus regardless.
            if (context.thumbs.has(target)) {
              target.focus();
            } else {
              onSlideStart(event);
            }
          }),
          props.onPointerDown$,
        ]}
        onPointerMove$={[
          (event) => {
          const target = event.target as HTMLElement;
          if (target.hasPointerCapture(event.pointerId)) onSlideMove(event);
        }]}
        onPointerUp$={
          [(event) => {
          const target = event.target as HTMLElement;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
            onSlideEnd(event);
          }
        }]}
      />
    );
  });
  