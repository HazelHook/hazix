import { ToastTypes } from "./toast-context"

export const getAsset = (type: ToastTypes | undefined) => {
	switch (type) {
		case "success":
			return SuccessIcon

		case "error":
			return ErrorIcon

		default:
			return null
	}
}

const bars = Array(12).fill(0)

export const Loader = ({ visible }: { visible: boolean }) => {
	return (
		<div class="hazix-loading-wrapper" data-visible={visible}>
			<div class="hazix-spinner">
				{bars.map((_, i) => (
					<div class="hazix-loading-bar" key={`spinner-bar-${i}`} />
				))}
			</div>
		</div>
	)
}

const SuccessIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="icon icon-tabler icon-tabler-circle-check"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<title>Check</title>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M9 12l2 2l4 -4" />
	</svg>
)

const ErrorIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="icon icon-tabler icon-tabler-exclamation-circle"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<title>Erorr</title>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M12 9v4" />
		<path d="M12 16v.01" />
	</svg>
)
