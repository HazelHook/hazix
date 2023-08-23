import "./styles.css"

import {
	$,
	CSSProperties,
	Slot,
	component$,
	useContextProvider,
	useSignal,
	useStore,
	useTask$,
	useVisibleTask$,
} from "@builder.io/qwik"
import { Height, Position, ThemeStore, ToastContext } from "./toast-context"
import { Toast } from "./toast"

type ToasterProps = {
	class?: string
	theme?: "light" | "dark"
	hotkey?: string[]
	position?: Position
	richColors?: boolean
	style?: CSSProperties
	visibleToasts?: number
}

const VISIBLE_TOASTS_AMOUNT = 10

// Viewport padding
const VIEWPORT_OFFSET = "32px"

// Default toast width
const TOAST_WIDTH = 356

// Default gap between toasts
export const GAP = 14

export const Toaster = component$<ToasterProps>((props) => {
	const {
		hotkey = ["altKey", "KeyT"],
		theme = "light",
		position = "bottom-right",
		richColors = false,
		style,
		visibleToasts = VISIBLE_TOASTS_AMOUNT,
	} = props

	const toastStore = useStore<ThemeStore>({
		toasts: [],
		toastCounter: 0,
		add: $(function (this, data) {
			this.toasts = [{ ...data }, ...this.toasts]
		}),
		remove: $(function (this, toastId) {
			this.toasts = this.toasts.filter((toast) => toast.id !== toastId)
		}),
		create: $(function (this, data) {
			const { message, ...rest } = data
			const id = typeof data?.id === "number" || (data.id?.length || 0) > 0 ? (data.id as string) : this.toastCounter++
			const alreadyExists = this.toasts.find((toast) => {
				return toast.id === id
			})

			if (alreadyExists) {
				this.toasts = this.toasts.map((toast) => {
					if (toast.id === id) {
						return { ...toast, ...data, id, title: message }
					}

					return toast
				})
			} else {
				this.add({ title: message, ...rest, id })
			}

			return id
		}),
		message: $(function (this, { message, data }) {
			this.create({ ...data, message: message, type: "normal" })
		}),
		success: $(function (this, { message, data }) {
			this.create({ ...data, message: message, type: "success" })
		}),
		error: $(function (this, { message, data }) {
			this.create({ ...data, message: message, type: "error" })
		}),
		promise: $(async function (this, promise, data) {
			const id = await this.create({ ...data, promise, type: "loading", message: data.loading })
			const p = promise instanceof Promise ? promise : promise()
			p.then((promiseData) => {
				console.log(promiseData)
				this.create({ id, type: "success", message: data.success })
			})
				.catch((error) => {
					console.log(error)
					// const message = typeof data.error === "function" ? data.error(error) : data.error
					this.create({ id, type: "error", message: data.error })
				})
				.finally(data.finally)
			return id
		}),
	})

	const heights = useSignal<Height[]>([])
	const expanded = useSignal(false)

	useContextProvider(ToastContext, toastStore)

	useTask$(() => {
		// Ensure expanded is always false when no toasts are present / only one left
		// eslint-disable-next-line qwik/valid-lexical-scope
		if (toastStore.toasts.length <= 1) {
			expanded.value = false
		}
	})

	useVisibleTask$(({ cleanup }) => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const isHotkeyPressed = hotkey.every((key) => (event as any)[key] || event.code === key)

			if (isHotkeyPressed) {
				expanded.value = true
			}

			if (
				event.code === "Escape"
				//  &&
				// (document.activeElement === listRef.current || listRef.current?.contains(document.activeElement))
			) {
				expanded.value = false
			}
		}
		document.addEventListener("keydown", handleKeyDown)

		cleanup(() => document.removeEventListener("keydown", handleKeyDown))
	})

	const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "")
	const [y, x] = position.split("-")

	const offset = 20

	return (
		<>
			<section aria-label={`Notifications ${hotkeyLabel}`} tabIndex={-1}>
				<ol
					tabIndex={-1}
					data-hazix-toaster
					data-theme={theme}
					data-y-position={y}
					data-x-position={x}
					data-rich-colors={String(richColors)}
					style={
						{
							"--front-toast-height": `${heights.value[0]?.height}px`,
							"--offset": typeof offset === "number" ? `${offset}px` : offset || VIEWPORT_OFFSET,
							"--width": `${TOAST_WIDTH}px`,
							"--gap": `${GAP}px`,
							...style,
						} as CSSProperties
					}
					onMouseEnter$={$(() => {
						expanded.value = true
					})}
					onMouseMove$={$(() => {
						expanded.value = true
					})}
					onMouseLeave$={$(() => {
						expanded.value = false
					})}
				>
					{toastStore.toasts.map(({ ...toast }, index) => (
						<Toast
							key={toast.id}
							index={index}
							{...toast}
							visibleToasts={visibleToasts}
							heights={heights}
							expanded={expanded.value}
							expandByDefault={false}
							position={position}
						/>
					))}
				</ol>
			</section>
			<Slot />
		</>
	)
})
