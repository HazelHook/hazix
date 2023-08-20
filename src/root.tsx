import { Logo } from "./components/logo/logo"
import * as Checkbox from "./components/checkbox"


import "./global.css"

export default () => {
	return (
		<>
			<head>
				<meta charSet="utf-8" />
				<title>Qwik Blank App</title>
			</head>
			<body class="bg-slate-700 container px-12 space-y-12">
				<Logo />
				<Checkbox.Root class="w-5 h-5 bg-white rounded-sm" >
          <Checkbox.Indicator class="w-full h-full">
            <p class='text-sm'>X</p>
          </Checkbox.Indicator>
        </Checkbox.Root>
			</body>
		</>
	)
}
