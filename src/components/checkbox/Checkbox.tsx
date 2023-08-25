import { component$, Slot, type QwikIntrinsicElements } from "@builder.io/qwik"

export type CheckboxProps = {
	attributes?: QwikIntrinsicElements["input"]
	defaultChecked?: boolean
	checked?: boolean
	onCheckedChange?: (checked: boolean) => void
	disabled?: boolean
	required?: boolean
	name?: string
	value?: string
}

export const Root = component$<CheckboxProps>(({ attributes }) => {
	return (
		<input
			type="checkbox"
			aria-hidden
			tabIndex={-1}
			{...attributes}
			style={{
				position: "absolute",
				pointerEvents: "none",
				opacity: 0,
				margin: 0,
			}}
		/>
	)
})

type IndicatorProps = QwikIntrinsicElements["div"]

export const Indicator = component$<IndicatorProps>((props) => {
	return (
		<div {...props}>
			<Slot />
		</div>
	)
})
