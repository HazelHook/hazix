import * as Accordion from "./components/accordion"
import * as Avatar from "./components/avatar"
import * as Tabs from "./components/tabs"
import * as Progress from "./components/progress"

import "./global.css"
import { Toggle } from "./components/toggle"
import { component$, useSignal } from "@builder.io/qwik"
import { AspectRatio } from "./components/aspect-ratio"

export default component$(() => {
	const pressed = useSignal(false)
	return (
		<>
			<head>
				<meta charSet="utf-8" />
				<title>Qwik Blank App</title>
			</head>
			<body class="bg-slate-700 container px-12 space-y-12">
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
				</div>
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
				<div class="shadow-black w-[300px] overflow-hidden rounded-md shadow-[0_2px_10px]">
					<AspectRatio ratio={16 / 9}>
						<img
							class="h-full w-full object-cover"
							width={800}
							height={800}
							src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
							alt="Landscape photograph by Tobias Tullius"
						/>
					</AspectRatio>
				</div>
				<Progress.Root
					class="relative overflow-hidden bg-zinc-700 rounded-full w-[300px] h-[25px]"
					style={{
						// Fix overflow clipping in Safari
						// https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
						transform: "translateZ(0)",
					}}
					value={10}
				>
					<Progress.Indicator
						class="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
						style={{ transform: `translateX(-${100 - 10}%)` }}
					/>
				</Progress.Root>
			</body>
		</>
	)
})
