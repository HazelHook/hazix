import { useContext } from "@builder.io/qwik"
import { ToastContext } from "./toast-context"

export const useToast = () => {
	const { toasts, toastCounter, ...rest } = useContext(ToastContext)

	return {
		toasts,
		counter: toastCounter,
		toast: rest,
	}
}

export * from "./toast"
export * from "./toaster"
