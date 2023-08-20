import { $, QwikIntrinsicElements, component$ } from "@builder.io/qwik";



export type RootProps = QwikIntrinsicElements["input"] & {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  onValueChange?: (value: number) => void;
  onValueCommit?: (value: number) => void;
  name?: string;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  dir?: Direction;
  inverted?: boolean;
  step?: number;
  minStepsBetweenThumbs?: number;
};

export const Root = component$<RootProps>((props) => {
  const {
    name,
    min = 0,
    max = 100,
    step = 1,
    orientation = "horizontal",
    disabled = false,
    minStepsBetweenThumbs = 0,
    defaultValue = [min],
    value,
    onValueChange = () => {},
    onValueCommit = () => {},
    inverted = false,
    ...sliderProps
  } = props;

  return <></>
});

