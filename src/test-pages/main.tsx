import { $, component$, useSignal } from "@builder.io/qwik"

import * as Accordion from "../components/accordion"
import * as Avatar from "../components/avatar"
import * as Tabs from "../components/tabs"
import * as Progress from "../components/progress"
import * as Dialog from "../components/dialog"
import * as Checkbox from "../components/checkbox"
import * as Popover from "../components/popover"
import * as Dropdown from "../components/dropdown-menu"

import { Toggle } from "../components/toggle"
import { AspectRatio } from "../components/aspect-ratio"
import { Tooltip } from "../components/tooltip/tooltip"
import { Switch } from "components/switch"
import { Separator } from "components/separator"
import { Label } from "components/label"
import { useToast } from "components/toast"

export const MainPage = component$(() => {
	const pressed = useSignal(false)

	const { toast } = useToast()

	return (
		<div class="space-y-12">
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
			<div class="flex flex-col gap-4">
				<button
					class="bg-red-600"
					type="button"
					onClick$={() => {
						toast.message({
							message: component$(() => <div>AMAZING</div>),
						})
					}}
				>
					WOW
				</button>
				<button
					class="bg-red-600"
					type="button"
					onClick$={() => {
						toast.success({
							data: {
								closeButton: true,
							},
							message: component$(() => <div>AMAZING SUCCESS</div>),
						})
					}}
				>
					Success
				</button>
				<button
					class="bg-red-600"
					type="button"
					onClick$={() => {
						toast.error({
							data: {
								closeButton: true,
							},
							message: component$(() => <div>AMAZING ERROR</div>),
						})
					}}
				>
					Error
				</button>
				<button
					class="bg-cyan-600"
					type="button"
					onClick$={() => {
						const promise = $(() => new Promise((resolve) => setTimeout(resolve, 2000)))

						toast.promise(promise, {
							loading: "Loading...",
							success: "WOW SUCESS",
							error: "Error",
						})
					}}
				>
					Promise
				</button>
			</div>
			<Popover.Root>
				<Popover.Content>
					<div class="bg-red-500">WOWZIEZ</div>
				</Popover.Content>
				<Popover.Trigger>
					<button
						type="button"
						class="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none"
						aria-label="Update dimensions"
					>
						A
					</button>
				</Popover.Trigger>
			</Popover.Root>
			<Tooltip content="Tooltip Content">Trigger content</Tooltip>
			<Tooltip>
				<div q:slot="content">Tooltip Content</div>
				Trigger content
			</Tooltip>

			<form class="flex flex-row gap-4">
				<div>
					<Checkbox.Root class="w-4 h-4 bg-white rounded-sm" defaultChecked name="test-checkbox">
						<Checkbox.Indicator class="text-xs">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-4 h-4"
								viewBox="0 0 24 24"
								fill="black"
								role="checkbox"
								aria-checked
							>
								<path d="M6 18L18 6M6 6l12 12" stroke="black" stroke-width="2" />
							</svg>
						</Checkbox.Indicator>
					</Checkbox.Root>
					<Label for="test-checkbox" class="ml-2 text-white">
						Checkbox
					</Label>
				</div>

				<Separator orientation="vertical" class="bg-white h-6" />

				<div>
					<Switch name="test-switch" class="w-8 h-4 bg-white rounded-sm" />
					<Label for="test-switch" class="ml-2 text-white">
						Switch
					</Label>
				</div>
			</form>

			<Separator class="bg-white" />

			<Dropdown.Root>
				<Dropdown.Trigger class="bg-slate-800 text-white rounded-xs px-4 py-2">Open Dropdown</Dropdown.Trigger>
				<Dropdown.Portal>
					<Dropdown.Content class="bg-white rounded-md p-4 max-w-sm">
						<p class="text-white">AHahah</p>
					</Dropdown.Content>
					<Dropdown.Arrow class="text-white" />
				</Dropdown.Portal>
			</Dropdown.Root>

			<Dialog.Root>
				<Dialog.Trigger class="bg-slate-800 text-white rounded-sm px-4 py-2 w-32">Open Dialog</Dialog.Trigger>
				<Dialog.Portal class="bg-black bg-opacity-50">
					<Dialog.Content class="bg-slate-700 rounded-md p-4 max-w-sm">
						<div q:slot="title" class="text-white text-xl">
							Dialog Title
						</div>
						<div q:slot="description" class="text-white">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</div>
						<Dialog.Close q:slot="close" class="text-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								width="18"
								height="18"
								viewBox="0 0 50 50"
								class="fill-white"
							>
								<title>Close</title>
								<path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
							</svg>
						</Dialog.Close>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	)
})
