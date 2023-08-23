import {
	$,
	CSSProperties,
	Signal,
	component$,
	useComputed$,
	useContext,
	useSignal,
	useTask$,
	useVisibleTask$,
} from "@builder.io/qwik"
import { Height, Position, ToastContext, type Toast as ToastType } from "./toast-context"
import { Loader, getAsset } from "./toast-assets"
import { GAP } from "./toaster"

type ToastProps = {
	index: number
	visibleToasts: number
	expanded: boolean
	expandByDefault: boolean
	position: Position
	heights: Signal<Height[]>
} & ToastType

const TOAST_LIFETIME = 4000

export const Toast = component$<ToastProps>(({ heights, ...toast }) => {
	const toasterContext = useContext(ToastContext)
	const disabled = toast.type === "loading"

	const Title = toast.title
	const { type, duration: toastDuration, promise, expanded } = toast

	const toastRef = useSignal<Element>()

	const mountedSignal = useSignal(false)
	const removedSignal = useSignal(false)
	const swipingSgnal = useSignal(false)
	const swipeOutSignal = useSignal(false)
	const initialHeightSignal = useSignal(0)

	const isFront = toast.index === 0
	const isVisible = toast.index + 1 <= toast.visibleToasts

	const heightIndex = useComputed$(
		// eslint-disable-next-line qwik/valid-lexical-scope
		() => heights.value.findIndex((height) => height.toastId === toast.id) || 0,
	)

	const toastsHeightBefore = useComputed$(() => {
		return heights.value.reduce((prev, curr, reducerIndex) => {
			// Calculate offset up untill current  toast
			if (reducerIndex >= heightIndex.value) {
				return prev
			}

			return prev + curr.height
		}, 0)
	})

	const offset = useComputed$(() => heightIndex.value * GAP + toastsHeightBefore.value)

	const duration = useComputed$(() => toastDuration || TOAST_LIFETIME)
	const remainingDuration = useSignal(duration.value)
	const lastTimerStartTime = useSignal<number>(0)
	const closeTimerStartTime = useSignal<number>(0)

	const [y, x] = toast.position.split("-")

	const id = toast.id

	const handleRemove = $(() => {
		// eslint-disable-next-line qwik/valid-lexical-scope
		toasterContext.remove(toast.id)
	})

	useTask$(({ cleanup }) => {
		// eslint-disable-next-line qwik/valid-lexical-scope
		if ((promise && type === "loading") || duration.value === Infinity) return

		let timeoutId: number

		const pauseTimer = () => {
			if (lastTimerStartTime.value < closeTimerStartTime.value) {
				// Get the elapsed time since the timer started
				const elapsedTime = new Date().getTime() - closeTimerStartTime.value

				remainingDuration.value = remainingDuration.value - elapsedTime
			}

			closeTimerStartTime.value = new Date().getTime()
		}

		const startTimer = () => {
			closeTimerStartTime.value = new Date().getTime()
			// Let the toast know it has started
			timeoutId = setTimeout(() => {
				// toast.onAutoClose?.(toast)
				handleRemove()
			}, remainingDuration.value)
		}

		if (expanded) {
			pauseTimer()
		} else {
			startTimer()
		}

		cleanup(() => clearTimeout(timeoutId))
	})

	useVisibleTask$(() => {
		if (!mountedSignal.value) {
			mountedSignal.value = true

			if (toastRef.value) {
				const originalHeight = toastRef.value.clientHeight
				console.log(originalHeight)

				// @ts-ignore
				toastRef.value.style.height = "auto"
				const newHeight = toastRef.value.getBoundingClientRect().height

				// @ts-ignore
				toastRef.value.style.height = originalHeight

				initialHeightSignal.value = newHeight

				heights.value = heights.value.map((height) =>
					height.toastId === id ? { ...height, height: newHeight } : height,
				)
			}
		}
	})

	useVisibleTask$(({ cleanup }) => {
		const toastNode = toastRef.value

		if (toastNode) {
			const height = toastNode.getBoundingClientRect().height

			// eslint-disable-next-line qwik/valid-lexical-scope
			heights.value = [{ toastId: toast.id, height }, ...heights.value]
			// Add toast height tot heights array after the toast is mounted
			// setInitialHeight(height)
			cleanup(() => {
				// eslint-disable-next-line qwik/valid-lexical-scope
				heights.value = heights.value.filter((height) => height.toastId !== toast.id)
			})
		}
	})

	return (
		<li
			ref={toastRef}
			class={toast.class}
			aria-live={toast.important ? "assertive" : "polite"}
			role="status"
			tabIndex={0}
			data-hazix-toast
			data-styled={String(true)}
			data-mounted={String(mountedSignal.value)}
			data-promise={Boolean(toast.promise)}
			data-removed={String(removedSignal.value)}
			data-visible={String(isVisible)}
			data-y-position={y}
			data-x-position={x}
			data-index={toast.index}
			data-front={String(isFront)}
			data-swiping={String(swipingSgnal.value)}
			data-type={toast.type || "normal"}
			data-invert={String(false)}
			data-swipe-out={String(swipeOutSignal.value)}
			data-expanded={String(Boolean(toast.expanded || (toast.expandByDefault && mountedSignal.value)))}
			style={
				{
					"--index": toast.index,
					"--toasts-before": toast.index,
					"--z-index": toasterContext.toasts.length - toast.index,
					"--offset": `${offset.value}px`,
					"--initial-height": toast.expandByDefault ? "auto" : `${initialHeightSignal.value}px`,
					...toast.style,
				} as CSSProperties
			}
		>
			{toast.closeButton && !toast.jsx ? (
				<button
					type="button"
					aria-label="Close toast"
					data-disabled={disabled}
					data-close-button
					onClick$={disabled ? undefined : handleRemove}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Xd</title>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			) : null}
			{toast.jsx ? (
				<jsx />
			) : (
				<>
					{toast.type || toast.icon || toast.promise ? (
						<div data-icon="">
							{toast.promise ? <Loader visible={toast.type === "loading"} /> : null}
							{toast.icon || getAsset(type)}
						</div>
					) : null}

					<div data-content="">
						<div data-title="">{Title ? typeof Title === "string" ? Title : <Title /> : undefined}</div>
						{toast.description ? (
							<div data-description="" class={toast.descriptionClass}>
								{toast.description}
							</div>
						) : null}
					</div>
					{toast.cancel ? (
						<button
							type="button"
							data-button
							data-cancel
							onClick$={() => {
								// TODO: DELETE TOAST HERE

								// eslint-disable-next-line qwik/valid-lexical-scope
								if (toast.cancel?.onClick) {
									// eslint-disable-next-line qwik/valid-lexical-scope
									toast.cancel.onClick()
								}
							}}
						>
							{toast.cancel.label}
						</button>
					) : null}
					{toast.action ? (
						<button
							type="button"
							data-button=""
							onClick$={(event) => {
								// eslint-disable-next-line qwik/valid-lexical-scope
								toast.action?.onClick(event)
								// TODO: DELETE TOAST HERE
								// if (event.defaultPrevented) return
								// deleteToast()
							}}
						>
							{toast.action.label}
						</button>
					) : null}
				</>
			)}
		</li>
	)
})
