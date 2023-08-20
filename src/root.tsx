import "./global.css";
import { component$ } from "@builder.io/qwik";
import { Showcase } from "./showcase";

export default component$(() => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body class="bg-slate-700 p-0 m-0">
        <Showcase/>
      </body>
    </>
  );
});