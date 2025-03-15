<script lang="ts">
    import * as config from '$lib/config';
    import { page } from "$app/state";
	import { formatDate } from '$lib/utils';
</script>

<svelte:head>
    <title>{page.data.meta.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={page.data.meta.title} />
</svelte:head>

<article>
    <hgroup>
        <h1>{page.data.meta.title}</h1>
        <p>Published at {formatDate(page.data.meta.date)}</p>
    </hgroup>

    <div class="tags">
        {#each page.data.meta.categories as category}
            <span class="surface-4">&num;{category}</span>
        {/each}
    </div>

    <div class="prose">
        <svelte:component this={page.data.content}/>
    </div>
</article>

<style>
    article {
        max-inline-size: var(--size-content-4);
        margin-inline: auto;
    }

    h1 {
        text-transform: capitalize;
        font-weight: normal;
    }

    h1 + p {
        margin-top: var(--size-2);
        color: var(--text-2);
    }

    .tags {
        display: flex;
        gap: var(--size-3);
        margin-top: var(--size-7);
    }

    .tags > * {
        padding: var(--size-2) var(--size-3);
        border-radius: var(--radius-round);
    }
</style>