import {
	$,
	PropFunction,
	QRL,
	QwikIntrinsicElements,
	Slot,
	component$,
	createContextId,
	useContext,
	useContextProvider,
	useSignal,
	useStore,
	useVisibleTask$,
} from "@builder.io/qwik"

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error"

export const AvatarRootContext = createContextId<AvatarStore>("avatar-root")

function useImageLoadingStatus(src?: string) {
	const loadingStatusSignal = useSignal<ImageLoadingStatus>("idle")

	useVisibleTask$(() => {
		if (!src) {
			loadingStatusSignal.value = "error"
			return
		}

		let isMounted = true
		const image = new window.Image()

		const updateStatus = (status: ImageLoadingStatus) => () => {
			if (!isMounted) return
			loadingStatusSignal.value = status
		}

		loadingStatusSignal.value = "loading"

		image.onload = updateStatus("loaded")
		image.onerror = updateStatus("error")
		image.src = src

		return () => {
			isMounted = false
		}
	})

	return loadingStatusSignal
}

export type AvatarProps = {} & QwikIntrinsicElements["span"]

type AvatarStore = {
	status: ImageLoadingStatus
	setStatus: QRL<(this: AvatarStore, status: ImageLoadingStatus) => void>
}

const Avatar = component$((props: AvatarProps) => {
	const { ...avatarProps } = props
	const imageStore = useStore<AvatarStore>({
		status: "idle",
		setStatus: $(function (this: AvatarStore, val: ImageLoadingStatus) {
			this.status = val
		}),
	})

	useContextProvider(AvatarRootContext, imageStore)

	return (
		<span {...avatarProps}>
			<Slot />
		</span>
	)
})

export type AvatarImageProps = {
	onLoadingStatusChange?: PropFunction<(status: ImageLoadingStatus) => void>
} & QwikIntrinsicElements["img"]

const AvatarImage = component$((props: AvatarImageProps) => {
	const { src, onLoadingStatusChange, ...imageProps } = props
	const context = useContext(AvatarRootContext)
	const imageLoadingStatusSignal = useImageLoadingStatus(src)

	const handleLoadingStatusChange = $((status: ImageLoadingStatus) => {
		onLoadingStatusChange?.(status)
		context.setStatus(status)
	})

	useVisibleTask$(() => {
		if (imageLoadingStatusSignal.value !== "idle") {
			handleLoadingStatusChange(imageLoadingStatusSignal.value)
		}
	})

	// rome-ignore lint/a11y/useAltText: <explanation>
	return imageLoadingStatusSignal.value === "loaded" ? <img {...imageProps} src={src} /> : null
})

export type AvatarFallbackProps = {
	delayMs?: number
} & QwikIntrinsicElements["span"]

const AvatarFallback = component$((props: AvatarFallbackProps) => {
	const { delayMs, ...fallbackProps } = props
	const context = useContext(AvatarRootContext)
	const canRender = useSignal(delayMs === undefined)

	useVisibleTask$(() => {
		if (delayMs !== undefined) {
			const timerId = window.setTimeout(() => {
				canRender.value = true
			}, delayMs)
			return () => window.clearTimeout(timerId)
		}
	})

	return canRender && context.status !== "loaded" ? (
		<span {...fallbackProps}>
			<Slot />
		</span>
	) : null
})

export { Avatar, AvatarFallback, AvatarImage, Avatar as Root, AvatarFallback as Fallback, AvatarImage as Image }
