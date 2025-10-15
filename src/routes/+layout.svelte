<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<title>svelte-starter</title>
</svelte:head>

<div>
	<main class="mx-auto antialiased">
		{@render children?.()}
	</main>
</div>
