import { ToastTypes } from "./types"

export const getAsset = (type: ToastTypes) => {
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
		<div class="sonner-loading-wrapper" data-visible={visible}>
			<div className="sonner-spinner">
				{bars.map((_, i) => (
					<div className="sonner-loading-bar" key={`spinner-bar-${i}`} />
				))}
			</div>
		</div>
	)
}

const SuccessIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20">
		<title>Success Icon</title>
		<path
			fillRule="evenodd"
			d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
			clipRule="evenodd"
		/>
	</svg>
)

const ErrorIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="icon icon-tabler icon-tabler-exclamation-circle"
		width="44"
		height="44"
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
