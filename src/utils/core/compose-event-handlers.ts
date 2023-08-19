import { QRL } from "@builder.io/qwik"

function composeEventHandlers<E, T>(
	originalEventHandler?: QRL<(event: E, element: T) => void>,
	ourEventHandler?: QRL<(event: E, element: T) => void>,
	{ checkForDefaultPrevented = true } = {},
) {
	return function handleEvent(event: E, element: T) {
		originalEventHandler?.(event, element)

		if (checkForDefaultPrevented === false || !(event as unknown as Event).defaultPrevented) {
			return ourEventHandler?.(event, element)
		}
	}
}

export { composeEventHandlers }
