import { Toaster } from "./components/toast/toaster"
import "./global.css"
import { Slot, component$ } from "@builder.io/qwik"
import { MainPage } from "./test-pages/main"

export default component$(() => {
	return (
		<>
			<head>
				<meta charSet="utf-8" />
				<title>Qwik Blank App</title>
			</head>
			<body class="bg-slate-700 container px-12 space-y-12">
				<Toaster>
					<Slot />
					<MainPage />
				</Toaster>
			</body>
		</>
	)
})
