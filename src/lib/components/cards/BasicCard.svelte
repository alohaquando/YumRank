<div
	class="rounded-[40px] bg-red-50 py-8 px-6 flex-col items-center justify-center flex text-center"
>
	<div class="pb-4">
		<slot name="start" />
	</div>
	<div class="pb-8">
		<slot name="center" />
	</div>
	<div class="self-stretch flex [&>button]:grow">
		<slot name="end" />
	</div>
</div>
