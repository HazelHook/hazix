export * from "./keycode.types"

export function getState(open: boolean) {
	return open ? "open" : "closed"
}
