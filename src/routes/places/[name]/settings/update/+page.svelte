<script>
	import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import Button from '$lib/components/buttons/Button.svelte';

	let name = 'Example';
	let address = 'Example';
	let description = 'Example';
	let logo = 'https://via.placeholder.com/120x120';
	let placePicture = 'https://via.placeholder.com/342x246';
	let submittedLogo = '';
	let submittedPlacePicture = '';

	function updateInformation() {
		// Call your update function here
	}

	function handleLogoUpload(event) {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = () => {
			submittedLogo = reader.result;
		};

		reader.readAsDataURL(file);
	}
</script>

<LargePageTitle showBackButton>Update information</LargePageTitle>

<div class="flex flex-col gap-8">
	<TextField
		bind:value={name}
		label="Name"
		id="name"
		placeholder="Enter your name"
		name="name"
	/>
	<TextField
		bind:value={address}
		label="Address"
		id="address"
		placeholder="Enter address"
		name="address"
	/>
	<TextField
		bind:value={description}
		label="Description"
		id="description"
		placeholder="Enter description"
		name="description"
	/>
	<TextField
		bind:value={logo}
		label="Logo"
		type="file"
		on:change={handleLogoUpload}
	/>
	<TextField
		bind:value={placePicture}
		label="Picture of your place"
		type="file"
	/>

	<Button
		class="w-full"
		on:click={updateInformation}>Submit</Button
	>
</div>
