<script lang="ts">
    import { user } from '$lib/store';
    import { auth } from '$lib/firebase';
    import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

    async function login() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }
</script>

{#if !$user}
	<button on:click={login} class="w3-button w3-blue w3-round-large">Sign in with Google</button>
{/if}