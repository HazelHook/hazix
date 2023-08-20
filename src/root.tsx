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
      <body class="bg-slate-700 container px-12 space-y-12">
        <Showcase/>
      </body>
    </>
  );
});