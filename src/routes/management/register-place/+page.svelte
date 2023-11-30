<script>
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import TextArea from '$lib/components/inputs/TextArea.svelte';
	import Title from '$lib/components/typography/Title.svelte';
</script>

<LargePageTitle>Register and verify your place</LargePageTitle>

<form class="flex-col flex space-y-6">
	<Title>Logo</Title>

	<input
		accept="image/png, image/jpeg"
		class="rounded-full border border-gray-300 pr-4 placeholder-black/50 block w-full transition outline-none text-black font-sans trim-both
	file:rounded-full file:outline file:outline-1 file:outline-gray-300 file:hover:bg-red-50 file:bg-white file:px-4 file:border-0 file:transition file:py-2.5 file:me-4
		focus:ring-black/70 focus:ring-2
		disabled:bg-black/5
		disabled:placeholder-black/20 disabled:text-black/50
"
		id="logo"
		name="logo"
		type="file"
		placeholder="Upload logo"
	/>

	<Title>Info</Title>

	<TextField required id="name" name="name" placeholder="Place name" />
	<TextField required id="address" name="address" placeholder="Address" />
	<TextField required id="type" name="type" placeholder="Type" />
	<TextArea required id="description" name="description" placeholder="Description" />
	<Button type="submit" width="full">Submit</Button>
</form>
