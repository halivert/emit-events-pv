import { createApp } from "petite-vue"

interface ChildProps {
	name: string
	value: string
	onClick: Function
}

function Parent() {
	return {
		$template: "#parent-template",
		name: "Parent",
		handleUpdate({ detail }) {
			console.log(detail)
		},
		children: [
			{ name: "1", value: "Number 1" },
			{ name: "2", value: "Number 2" },
			{ name: "3", value: "Number 3" },
		],
	}
}

function Child(props: ChildProps) {
	return {
		$template: "#child-template",
		name: "Child",
		value: "",
		onClick(evt: Event) {
			evt.target.dispatchEvent(
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

document.querySelector("#app").innerHTML = `
			<template id="parent-template">
				<h1>{{ name }}</h1>

				<article v-for="child in children" v-scope="Child(child)"></article>
			</template>

			<template id="child-template">
				<h5>{{ name }}</h5>

				<input type="text" v-model="value" />

				<button @click="onClick">Press me!</button>
			</template>

			<section v-scope="Parent()" @child-update="handleUpdate"></section>
`;

createApp({
	Parent,
	Child,
}).mount("#app")
