<script lang="ts">
	import Header from './header.svelte';
	import Footer from './footer.svelte';
	import PageTransition from './transition.svelte';

	import 'open-props/style';
	// import 'open-props/normalize';
	import 'open-props/buttons';

	import '../app.css';

	let { children, data } = $props();
</script>

<div class="layout">
	<Header />

	<main>
		<PageTransition url={data.url}>
			{@render children?.()}
		</PageTransition>
	</main>

	<Footer />
</div>

<style>
	.layout {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-inline: auto;
	}

	main {
		padding-block: var(--size-4);
	}

	@media (min-width: 1440px) {
		.layout {
			padding-inline: 0;
		}
	}
</style>
