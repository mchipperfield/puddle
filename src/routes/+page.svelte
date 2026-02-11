<script lang="ts">
    import { user } from '$lib/store';
    import Login from '$lib/components/Login.svelte';
    import { auth } from '$lib/firebase';
    import { signOut } from 'firebase/auth';
</script>

<svelte:head>
    <title>Puddle Rater</title>
    <meta name="description" content="Rate my puddle" />
</svelte:head>

<section>
    {#if $user}
        <h1>Welcome, {$user.displayName}</h1>
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

