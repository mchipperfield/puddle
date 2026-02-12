<script lang="ts">
    import { user } from '$lib/store';
    import Login from '$lib/components/Login.svelte';
    import RecentPuddle from '$lib/components/RecentPuddle.svelte';
    import UploadForm from '$lib/components/UploadForm.svelte';
    import type { PageData } from './$types';
    import { signOut } from 'firebase/auth';
    import { auth } from '$lib/firebase';

    export let data: PageData;
</script>

<svelte:head>
    <title>Puddle Rater</title>
    <meta name="description" content="Rate my puddle" />
</svelte:head>

<section>
    <main>
        <RecentPuddle puddle={data.recentPuddle} />
        {#if $user}
            <UploadForm />         
            <button on:click={() => signOut(auth)}>Sign out</button>
        {:else}
            <Login />
        {/if}
    </main>
</section>

<style>
    section {
        text-align: center;
    }
</style>

