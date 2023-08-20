import { component$ } from "@builder.io/qwik";
export type LogoProps = {
  width?: number;
  height?: number;
};
export const Logo = component$<LogoProps>(({
  width = 100,
  height = 100
}) => {
  return (
    <div>
      <a href="https://qwik.builder.io/">
        <img
          alt="Qwik Logo"
          width={width}
          height={height}
          src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F667ab6c2283d4c4d878fb9083aacc10f"
        />
      </a>
    </div>
  );
});
