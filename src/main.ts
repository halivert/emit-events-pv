import { createApp } from "petite-vue"

interface ChildProps {
	name?: string
	value?: string
	onClick?: Function
}

interface Parent {
	$template: string
	name: string
	handleUpdate: Function
	clearEvents: Function
	children: Array<object>
	events: Array<object>
}

function Parent(): Parent {
	return {
		$template: "#parent-template",
		name: "Parent",
		handleUpdate({ detail }: { detail: object }) {
			this.events.push(detail)
		},
		clearEvents() {
			this.events = []
		},
		children: [
			{ name: "1", value: "Number 1" },
			{ name: "2", value: "Number 2" },
			{ name: "3", value: "Number 3" },
		],
		events: [],
	}
}

function Child(props: ChildProps) {
	return {
		$template: "#child-template",
		name: "Child",
		value: "",
		onClick(evt: MouseEvent) {
			evt.target?.dispatchEvent(
				new CustomEvent("child-update", {
					bubbles: true,
					detail: {
						name: this.name,
						value: this.value,
					},
				})
			)
		},
		...props,
	}
}

createApp({
	Parent,
	Child,
}).mount("#app")
