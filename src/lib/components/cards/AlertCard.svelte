<div class="rounded-[40px] bg-red-50 py-8 px-6 flex-col items-center  justify-center flex text-center text-red-900 border border-red-100">
	<div class="flex items-center space-x-2 pb-4">
		<slot name="icon" />
		<slot name="title" />
	</div>
	<div class="self-stretch flex">
		<slot name="body" />
	</div>
</div>

<!--Example-->
<!--<AlertCard>-->
<!--	<Fa icon={faInfoCircle} slot="icon"/>-->
<!--	<Title slot="title">Pro-tip</Title>-->
<!--	<Body slot="body">You can scan the QR code directly through the camera app as well</Body>-->
<!--</AlertCard>-->