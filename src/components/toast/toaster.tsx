import { $, component$, useContextProvider, useStore } from "@builder.io/qwik"
import { ThemeStore, ToastContext } from "./theme-context"
import { Toast } from "./toast"

type ToasterProps = {
	class?: string
	hotkey?: string[]
}

export const Toaster = component$<ToasterProps>((props) => {
	const { hotkey = ["altKey", "KeyT"] } = props

	const toastStore = useStore<ThemeStore>({
		toasts: [],
		add: $(function (this, value) {
			this.toasts.push(value)
		}),
	})

	useContextProvider(ToastContext, toastStore)

	const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "")

	return (
		<section aria-label={`Notifications ${hotkeyLabel}`} tabIndex={-1}>
			<ol tabIndex={-1} data-hazix-toaster>
				{toastStore.toasts.map(({ ...toast }, index) => (
					<Toast key={toast.id} index={index} {...toast} />
				))}
			</ol>
		</section>
	)
})
