import { component$ } from "@builder.io/qwik"
import { type Toast as ToastType } from "./theme-context"
import { Loader, getAsset } from "./toast-assets"

type ToastProps = {
	index: number
} & ToastType

export const Toast = component$<ToastProps>((toast) => {
	const disabled = toast.type === "loading"

	return (
		<li
			class={toast.class}
			aria-live={toast.important ? "assertive" : "polite"}
			role="status"
			tabIndex={0}
			data-hazix-toast=""
		>
			{toast.closeButton && !toast.jsx ? (
				<button
					type="button"
					aria-label="Close toast"
					data-disabled={disabled}
					data-close-button
					onClick$={
						disabled
							? undefined
							: () => {
									// TODO: DELETE TOAST HERE
									// eslint-disable-next-line no-mixed-spaces-and-tabs
							  }
					}
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
							{toast.icon || getAsset(toast.type)}
						</div>
					) : null}

					<div data-content="">
						<div data-title="">{toast.title}</div>
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
