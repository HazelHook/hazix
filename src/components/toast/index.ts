/* eslint-disable qwik/valid-lexical-scope */

import { $, useContext } from "@builder.io/qwik"
import { ThemeStore, ToastContext } from "./toast-context"

export const useToast = () => {
	const context = useContext(ToastContext)

	const message = $((...value: Parameters<ThemeStore["message"]>) => context.message(...value))
	const error = $((...value: Parameters<ThemeStore["error"]>) => context.error(...value))
	const promise = $((...value: Parameters<ThemeStore["promise"]>) => context.promise(...value))
	const success = $((...value: Parameters<ThemeStore["success"]>) => context.success(...value))

	return {
		toasts: context.toasts,
		counter: context.toastCounter,
		toast: {
			message,
			error,
			promise,
			success,
		},
	}
}

export * from "./toast"
export * from "./toaster"
