<script>
    import LargePageTitle from '$lib/components/layouts/LargePageTitle.svelte';
    import Divider from '$lib/components/layouts/Divider.svelte';
</script>

<LargePageTitle>
    Place Settings
</LargePageTitle>

<div class="w-80 h-14 py-4 justify-start items-center gap-4 inline-flex">
    <div class="grow shrink basis-0 h-6 justify-start items-center gap-3 flex">
        <div class="w-6 h-6 justify-center items-center flex">
        </div>
        <div class="grow shrink basis-0 text-gray-900 text-base font-normal font-['Inter'] leading-normal">Update information</div>
    </div>
</div>

<Divider full={true} />

<div class="w-80 h-14 py-4 justify-start items-center gap-4 inline-flex">
    <div class="grow shrink basis-0 h-6 justify-start items-center gap-3 flex">
        <div class="grow shrink basis-0 text-red-600 text-base font-semibold font-['Inter'] leading-normal">Delete place</div>
    </div>
</div>



