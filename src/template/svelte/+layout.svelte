<script lang="ts">
	import '$css/app.css';

	let innerHeight: number | undefined;
</script>

<svelte:window bind:innerHeight />
<div
	class="w-full bg-c-bg text-c-on-bg min-h-screen flex flex-col"
	style={innerHeight !== undefined ? `min-height: ${innerHeight}px` : ''}
>
	<main class="w-full flex-1 flex flex-col overflow-x-hidden">
		<slot />
	</main>
</div>
