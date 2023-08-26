/* eslint-disable qwik/use-method-usage */
import { QwikKeyboardEvent, component$ } from "@builder.io/qwik";
import { SliderImpl, SliderImplElement, SliderImplPrivateProps, SliderImplProps } from "./slider-impl";
import { Direction } from "./data";
import { setupSliderOrientationContextProvider } from "./slider-context";

// const [SliderOrientationProvider, useSliderOrientationContext] = createSliderContext<{
//   startEdge: Side;
//   endEdge: Side;
//   size: keyof NonNullable<ReturnType<typeof useSize>>;
//   direction: number;
// }>(SLIDER_NAME, {
//   startEdge: 'left',
//   endEdge: 'right',
//   size: 'width',
//   direction: 1,
// });

type SliderOrientationPrivateProps = {
  min: number;
  max: number;
  inverted: boolean;
  onSlideStart?(value: number): void;
  onSlideMove?(value: number): void;
  onSlideEnd?(): void;
  onHomeKeyDown(event: QwikKeyboardEvent): void;
  onEndKeyDown(event: QwikKeyboardEvent): void;
  onStepKeyDown(step: { event: QwikKeyboardEvent; direction: number }): void;
};
interface SliderOrientationProps
  extends Omit<SliderImplProps, keyof SliderImplPrivateProps>,
    SliderOrientationPrivateProps {}

interface SliderHorizontalProps extends SliderOrientationProps {
  dir?: Direction;
}

export const SliderHorizontal = component$<SliderHorizontalProps>(
  ({class: classProp, ...props}) => {
    const {
      min,
      max,
      dir: direction = 'ltr',
      inverted,
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onStepKeyDown,
      ...sliderProps
    } = props;
    const isDirectionLTR = direction === 'ltr';
    const isSlidingFromLeft = (isDirectionLTR && !inverted) || (!isDirectionLTR && inverted);

    setupSliderOrientationContextProvider({
      direction: isSlidingFromLeft ? 1 : -1,
      endEdge: isSlidingFromLeft ? 'right' : 'left',
      startEdge: isSlidingFromLeft ? 'left' : 'right',
      type: 'horizontal'
    })

    return (
      <SliderImpl
        dir={direction}
        data-orientation="horizontal"
        {...sliderProps}
        class={`${classProp} --slider-thumb-transform' as any]: 'translateX(-50%)`}
        onSlideStart={(event) => {
          onSlideStart?.(event.clientX);
        }}
        onSlideMove={(event) => {
          onSlideMove?.(event.clientX);
        }}
        onSlideEnd={() => {
          onSlideEnd?.();
        }}
        onStepKeyDown={(event) => {
          const slideDirection = isSlidingFromLeft ? 'from-left' : 'from-right';
          const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
          onStepKeyDown?.({ event, direction: isBackKey ? -1 : 1 });
        }}
      />
    );
  }
);
