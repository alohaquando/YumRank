<script lang="ts">
	export let design: 'default' | 'gray' | 'green' = 'default';

	let customClasses = '';
	export { customClasses as class };

	let designClasses: string;
	// noinspection JSUnreachableSwitchBranches
	switch (design) {
		case 'default': {
			designClasses = 'bg-red-50 border-red-100 text-red-900';
			break;
		}
		case 'gray': {
			designClasses = 'bg-gray-50 border-gray-100 text-gray-900';
			break;
		}
		case 'green': {
			designClasses = 'bg-green-50 border-green-100 text-green-900';
			break;
		}
	}
</script>

<div
	class="rounded-[40px] py-8 px-6 flex-col items-center justify-center flex text-center border {designClasses} {customClasses}"
>
	<div class="flex items-center space-x-2">
		<slot name="icon" />
		<slot name="title" />
	</div>
	{#if $$slots.body || $$slots.default}
		<div class="self-stretch flex mt-6 text-center mx-auto w-full justify-center">
			<slot name="body" />
			<slot />
		</div>
	{/if}
</div>

<!--Example-->
<!--<AlertCard>-->
<!--	<Fa icon={faInfoCircle} slot="icon"/>-->
<!--	<Title slot="title">Pro-tip</Title>-->
<!--	<Body slot="body">You can scan the QR code directly through the camera app as well</Body>-->
<!--</AlertCard>-->
