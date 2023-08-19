import { Logo } from "./components/logo/logo"

import * as Accordion from "./components/accordion"

import "./global.css"
import { Toggle } from "./components/toggle"

export default () => {
	return (
		<>
			<head>
				<meta charSet="utf-8" />
				<title>Qwik Blank App</title>
			</head>
			<body class="bg-slate-700 container px-12 space-y-12">
				<Logo />
				<Accordion.Root class="bg-white w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5" type="single">
					<Accordion.Item>
						<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
						<Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
					</Accordion.Item>

					<Accordion.Item>
						<Accordion.Trigger>Is it unstyled?</Accordion.Trigger>
						<Accordion.Content>
							Yes. It's unstyled by default, giving you freedom over the look and feel.
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
				<Toggle>Uncontrolled</Toggle>
				<Toggle pressed={true} onChange$={(pressed) => console.log(pressed)}>
					Controlled
				</Toggle>
			</body>
		</>
	)
}
