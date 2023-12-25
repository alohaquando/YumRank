<script lang="ts">
	import { faTimes } from '@fortawesome/pro-regular-svg-icons';
	import { faImage } from '@fortawesome/pro-light-svg-icons';
	import Fa from 'svelte-fa';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import Body from '$lib/components/typography/Body.svelte';


	let input: HTMLInputElement;
	let image: HTMLElement;
	let filesList: FileList | null;
	let filesListURL: any[] = ['ars'];
	let showImage = false;
	let file;
	let thing;

	function onChange() {
		filesList = input.files;
		if (filesList !== null) {

			Array.from(filesList).forEach(file => {
				let reader = new FileReader();

				reader.readAsDataURL(file);
				reader.onload =  function(e) {
					console.log('DataURL:', e.target?.result);
					filesListURL.push(e.target?.result)
				};
				filesListURL.push("sant")
			});
		}
		filesListURL.forEach(e => console.log('hi'+e))
	}

	$: filesListURL



</script>
{#each filesListURL as url}
	{url}
	{/each}
<div
	class="w-full rounded-3xl ring-1 ring-gray-300 grid grid-cols-4 grid-flow-row text-center justify-center overflow-clip p-4 [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2 gap-4">
	{#if filesList != null}
		{#each filesList as file, index}
			<img
				bind:this={thing}
				class=" ring-1 ring-gray-300 rounded-2xl aspect-square flex flex-col space-y-4 items-center justify-center hover:bg-red-50 transition relative"

			/>

		{/each}
	{/if}

</div>

<input
	accept="image/png, image/jpeg"
	bind:this={input}
	class=""
	id="logo"
	multiple={true}
	name="logo"
	on:change={() => {
		console.log("hi")
		onChange()
		console.log('bye')
	}}
	placeholder="Upload logo"
	type="file"
/>
