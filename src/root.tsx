import * as Checkbox from "./components/checkbox/Checkbox";
export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <Checkbox.Root>
          <Checkbox.Indicator />
        </Checkbox.Root>
      </body>
    </>
  );
};
