<script lang='ts'>
    import Image from '$lib/components/media/Image.svelte'; 
    import Body from '$lib/components/typography/Body.svelte';

    export let name: string | undefined | null = 'Name';
    export let address: string | undefined | null = 'Address';
	export let src: string | undefined | null;
    export let href: string | undefined | null = undefined;



</script>

<svelte:element
    class="flex flex-nowrap flex-row space-x-4 items-center place-content-between"
    {href}
    this={href ? 'a' : 'div'}
>

<div class="flex flex-row space-x-2 items-center">
    <Image alt={name} class="w-16 h-16 rounded-3xl ring-1 ring-gray-200" {src} />
    <div class="flex flex-col space-y-1">
        <Body class="font-semibold">{name}</Body>
        <Body class="text-black-500">{address}</Body>
</div>

</svelte:element>


