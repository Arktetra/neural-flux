<script lang="ts">
	import { base } from "$app/paths";
    import * as config from "$lib/config";
	import Toggle from "./toggle.svelte";
</script>

<nav>
    <a href="{base}/" class="title">
        <b>{config.title}</b>
    </a>

    <ul class="links">
        <Toggle />
    </ul>
</nav>

<style>
    a {
        color: inherit;
        text-decoration: none;
    }

    nav {
        display: flex;
        justify-content: space-between;
        padding-block: var(--size-7);
        margin-left: 0;
        border-bottom: 1px solid var(--border);
        align-items: center;
    }

    .links {
        display: flex;
        gap: var(--size-7);
        margin-block: 0;
    }

    .title {
        font-size: 24px;
    }
</style>