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
        <div class="w3-content" style="max-width:768px">
            <header class="w3-container w3-center w3-margin-bottom">
                <h1>Puddle</h1>
                <p class="w3-opacity">A social media app for sharing pictures of puddles.</p>
            </header>

            <main>
                <RecentPuddle puddle={data.recentPuddle} />

                {#if $user}
                    <div class="w3-margin-top">
                        <UploadForm />
                        <button on:click={() => signOut(auth)} class="w3-button w3-red w3-round-large w3-margin-top w3-margin-bottom w3-auto" style="display:block;">Sign out</button>
                    </div>
                {:else}
                    <div class="w3-panel w3-light-grey w3-round-large w3-center w3-padding w3-margin-top">
                        <p>Please log in to upload your own puddle.</p>
                        <Login />
                    </div>
                {/if}
            </main>
        </div>
    </main>
</section>

