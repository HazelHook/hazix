import { QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik"

export type SelectIconProps = {} & Omit<QwikIntrinsicElements["span"], "placeholder">

const SelectIcon = component$<SelectIconProps>((props) => {
	return (
		<span class="peer" {...props} aria-hidden>
			<Slot />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="hidden only:block"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<title>Chevron Down</title>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M6 9l6 6l6 -6" />
			</svg>
		</span>
	)
})

const Icon = SelectIcon

export { SelectIcon, Icon }
