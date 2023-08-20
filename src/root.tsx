import { Logo } from "./components/logo/logo"

import * as Accordion from "./components/accordion"
import * as Avatar from "./components/avatar"
import * as Tabs from "./components/tabs"

import "./global.css"
import { Toggle } from "./components/toggle"
import { component$, useSignal } from "@builder.io/qwik"

export default component$(() => {
	const pressed = useSignal(false)
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
				<Toggle
					class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-zinc-600 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-blue-500 data-[state=on]:text-white"
					pressed={pressed}
				>
					Controlled
				</Toggle>
				<div class="flex gap-5">
					<Avatar.Root class="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
						<Avatar.Image
							class="h-full w-full rounded-[inherit] object-cover"
							src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
							alt="Colm Tuite"
							width={64}
							height={64}
						/>
						<Avatar.Fallback
							class="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
							delayMs={600}
						>
							CT
						</Avatar.Fallback>
					</Avatar.Root>

					<Avatar.Root class="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
						<Avatar.Fallback class="text-black leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
							PD
						</Avatar.Fallback>
					</Avatar.Root>

					<Tabs.Root>
						<Tabs.List>
							<Tabs.Tab>Tab 1</Tabs.Tab>
							<Tabs.Tab>Tab 2</Tabs.Tab>
							<Tabs.Tab>Tab 3</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel>Content 1</Tabs.Panel>
						<Tabs.Panel>Content 2</Tabs.Panel>
						<Tabs.Panel>Content 3</Tabs.Panel>
					</Tabs.Root>
				</div>
			</body>
		</>
	)
})
