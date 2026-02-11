<script lang="ts">
    import { user } from '$lib/store';
    import Login from '$lib/components/Login.svelte';
    import { auth } from '$lib/firebase';
    import { signOut } from 'firebase/auth';
    import RecentPuddle from '$lib/components/RecentPuddle.svelte';
    import UploadForm from '$lib/components/UploadForm.svelte';
</script>

<svelte:head>
    <title>Puddle Rater</title>
    <meta name="description" content="Rate my puddle" />
</svelte:head>

<section>
    <RecentPuddle />
    {#if $user}
        <h1>Welcome, {$user.displayName}</h1>
        <UploadForm />
        <button on:click={() => signOut(auth)}>Logout</button>
    {:else}
        <Login />
    {/if}
</section>

<style>
    section {
        text-align: center;
    }
</style>

