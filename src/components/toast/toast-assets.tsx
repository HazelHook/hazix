import { ToastTypes } from "./theme-context"

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
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20">
		<title>Error Icon</title>
		<path
			fillRule="evenodd"
			d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
			clipRule="evenodd"
		/>
	</svg>
)
