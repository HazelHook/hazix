import { $, Slot, component$, useSignal } from "@builder.io/qwik"

import * as Accordion from "../components/accordion"
import * as Avatar from "../components/avatar"
import * as Tabs from "../components/tabs"
import * as Progress from "../components/progress"
import * as Dialog from "../components/dialog"
import * as Checkbox from "../components/checkbox"
import * as Popover from "../components/popover"
import * as Dropdown from "../components/dropdown-menu"
import * as Switch from "../components/switch"
import * as RadioGroup from "../components/radio-group"
import * as Select from "../components/select"

import { Toggle } from "../components/toggle"
import { AspectRatio } from "../components/aspect-ratio"
import { Tooltip } from "../components/tooltip/tooltip"
import { Separator } from "components/separator"
import { Label } from "components/label"
import { useToast } from "components/toast"

export const MainPage = component$(() => {
	const pressed = useSignal(false)

	const { toast } = useToast()

	return (
		<div class="space-y-12 py-48">
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
				<Popover.Portal>
					<Popover.Content>
						<div class="bg-red-500">WOWZIEZ</div>
					</Popover.Content>
				</Popover.Portal>
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
					<Switch.Root
						class="w-[42px] h-[25px] bg-blackA9 rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
						id="airplane-mode"
						style={{ "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)" }}
					>
						<Switch.Thumb class="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
					</Switch.Root>
					<Label for="test-switch" class="ml-2 text-white">
						Switch
					</Label>
				</div>
			</form>

			<Separator class="bg-white" />

			<Select.Root>
				<Select.Trigger
					class="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
					aria-label="Food"
				>
					<Select.Value>
						<p q:slot="placeholder">Select a fruit…</p>
					</Select.Value>
					<Select.Icon class="text-violet11">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler icon-tabler-chevron-down"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<title>Chevron Down</title>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M6 9l6 6l6 -6" />
						</svg>
					</Select.Icon>
				</Select.Trigger>
				<Select.Portal>
					<Select.Content class="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
						{/* <Select.ScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
							<ChevronUpIcon />
						</Select.ScrollUpButton> */}
						<Select.Viewport class="p-[5px]">
							<Select.Group>
								<Select.Label class="px-[25px] text-xs leading-[25px] text-mauve11">
									Fruits
								</Select.Label>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="blueberry">Blueberry</SelectItem>
								<SelectItem value="grapes">Grapes</SelectItem>
								<SelectItem value="pineapple">Pineapple</SelectItem>
							</Select.Group>

							<Select.Separator class="h-[1px] bg-violet6 m-[5px]" />

							<Select.Group>
								<Select.Label class="px-[25px] text-xs leading-[25px] text-mauve11">
									Vegetables
								</Select.Label>
								<SelectItem value="aubergine">Aubergine</SelectItem>
								<SelectItem value="broccoli">Broccoli</SelectItem>
								<SelectItem value="carrot" disabled>
									Carrot
								</SelectItem>
								<SelectItem value="courgette">Courgette</SelectItem>
								<SelectItem value="leek">Leek</SelectItem>
							</Select.Group>

							<Select.Separator class="h-[1px] bg-violet6 m-[5px]" />

							<Select.Group>
								<Select.Label class="px-[25px] text-xs leading-[25px] text-mauve11">Meat</Select.Label>
								<SelectItem value="beef">Beef</SelectItem>
								<SelectItem value="chicken">Chicken</SelectItem>
								<SelectItem value="lamb">Lamb</SelectItem>
								<SelectItem value="pork">Pork</SelectItem>
							</Select.Group>
						</Select.Viewport>
						{/* <Select.ScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
							<ChevronDownIcon />
						</Select.ScrollDownButton> */}
					</Select.Content>
				</Select.Portal>
			</Select.Root>

			<Dropdown.Root>
				<Dropdown.Trigger class="bg-slate-800 text-white rounded-xs px-4 py-2">Open Dropdown</Dropdown.Trigger>
				<Dropdown.Portal>
					<Dropdown.Content class="bg-white rounded-md p-4 max-w-sm">
						<p class="text-white">AHahah</p>
					</Dropdown.Content>
					<Dropdown.Arrow class="text-white" />
				</Dropdown.Portal>
			</Dropdown.Root>

			<Dropdown.Root>
				<Dropdown.Trigger class="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
					Hamburger Icon
				</Dropdown.Trigger>

				<Dropdown.Portal>
					<Dropdown.Content
						class="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
						// sideOffset={5}
					>
						<Dropdown.Item class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
							New Tab{" "}
							<div class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
								⌘+T
							</div>
						</Dropdown.Item>
						<Dropdown.Item class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
							New Window{" "}
							<div class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
								⌘+N
							</div>
						</Dropdown.Item>
						<Dropdown.Item
							class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
							disabled
						>
							New Private Window{" "}
							<div class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
								⇧+⌘+N
							</div>
						</Dropdown.Item>
						{/* <Dropdown.Sub>
							<Dropdown.SubTrigger class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1">
								More Tools
								<div class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
									<ChevronRightIcon />
								</div>
							</Dropdown.SubTrigger>
							<Dropdown.Portal>
								<Dropdown.SubContent
									class="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
									sideOffset={2}
									alignOffset={-5}
								>
									<Dropdown.Item class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
										Save Page As…{" "}
										<div class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
											⌘+S
										</div>
									</Dropdown.Item>
									<Dropdown.Item class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
										Create Shortcut…
									</Dropdown.Item>
									<Dropdown.Item class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
										Name Window…
									</Dropdown.Item>
									<Dropdown.Separator class="h-[1px] bg-violet6 m-[5px]" />
									<Dropdown.Item class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
										Developer Tools
									</Dropdown.Item>
								</Dropdown.SubContent>
							</Dropdown.Portal>
						</Dropdown.Sub>

						<Dropdown.Separator class="h-[1px] bg-violet6 m-[5px]" />

						<Dropdown.CheckboxItem
							class="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
							checked={bookmarksChecked}
							onCheckedChange={setBookmarksChecked}
						>
							<Dropdown.ItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
								<CheckIcon />
							</Dropdown.ItemIndicator>
							Show Bookmarks{" "}
							<div class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
								⌘+B
							</div>
						</Dropdown.CheckboxItem>
						<Dropdown.CheckboxItem
							class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
							checked={urlsChecked}
							onCheckedChange={setUrlsChecked}
						>
							<Dropdown.ItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
								<CheckIcon />
							</Dropdown.ItemIndicator>
							Show Full URLs
						</Dropdown.CheckboxItem>

						<Dropdown.Separator class="h-[1px] bg-violet6 m-[5px]" />

						<Dropdown.Label class="pl-[25px] text-xs leading-[25px] text-mauve11">People</Dropdown.Label>
						<Dropdown.RadioGroup value={person} onValueChange={setPerson}>
							<Dropdown.RadioItem
								class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
								value="pedro"
							>
								<Dropdown.ItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
									<DotFilledIcon />
								</Dropdown.ItemIndicator>
								Pedro Duarte
							</Dropdown.RadioItem>
							<Dropdown.RadioItem
								class="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
								value="colm"
							>
								<Dropdown.ItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
									<DotFilledIcon />
								</Dropdown.ItemIndicator>
								Colm Tuite
							</Dropdown.RadioItem>
						</Dropdown.RadioGroup> */}

						<Dropdown.Arrow class="fill-white" />
					</Dropdown.Content>
				</Dropdown.Portal>
			</Dropdown.Root>

			<Dialog.Root>
				<Dialog.Trigger
					as="a"
					class="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
				>
					Dialog
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
					<Dialog.Content class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
						<Dialog.Title class="text-mauve12 m-0 text-[17px] font-medium">Edit profile</Dialog.Title>
						<Dialog.Description class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
							Make changes to your profile here. Click save when you're done.
						</Dialog.Description>
						<fieldset class="mb-[15px] flex items-center gap-5">
							<label class="text-violet11 w-[90px] text-right text-[15px]" for="name">
								Name
							</label>
							<input
								class="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
								id="name"
								value="Pedro Duarte"
							/>
						</fieldset>
						<fieldset class="mb-[15px] flex items-center gap-5">
							<label class="text-violet11 w-[90px] text-right text-[15px]" for="username">
								Username
							</label>
							<input
								class="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
								id="username"
								value="@peduarte"
							/>
						</fieldset>
						<div class="mt-[25px] flex justify-end">
							<Dialog.Close class="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
								Save changes
							</Dialog.Close>
						</div>
						<Dialog.Close class="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none">
							X
						</Dialog.Close>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
			<RadioGroup.Root class="flex flex-col gap-2.5" defaultValue="default" aria-label="View density">
				<div class="flex items-center">
					<RadioGroup.Item
						class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
						value="default"
						id="r1"
					>
						<RadioGroup.Indicator class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
					</RadioGroup.Item>
					<Label class="text-white text-[15px] leading-none pl-[15px]" for="r1">
						Default
					</Label>
				</div>
				<div class="flex items-center">
					<RadioGroup.Item
						class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
						value="comfortable"
						id="r2"
					>
						<RadioGroup.Indicator class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
					</RadioGroup.Item>
					<Label class="text-white text-[15px] leading-none pl-[15px]" for="r2">
						Comfortable
					</Label>
				</div>
				<div class="flex items-center">
					<RadioGroup.Item
						class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
						value="compact"
						id="r3"
					>
						<RadioGroup.Indicator class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
					</RadioGroup.Item>
					<Label class="text-white text-[15px] leading-none pl-[15px]" for="r3">
						Compact
					</Label>
				</div>
			</RadioGroup.Root>
		</div>
	)
})

const SelectItem = component$((props: { value: string; disabled?: boolean }) => {
	return (
		<Select.Item
			class={
				"text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
			}
			{...props}
		>
			<Select.ItemText>
				<Slot />
			</Select.ItemText>
			<Select.ItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-check"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Check</title>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M5 12l5 5l10 -10" />
				</svg>
			</Select.ItemIndicator>
		</Select.Item>
	)
})
