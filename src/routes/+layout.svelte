<script lang="ts">
    import { onMount } from 'svelte';
    import { auth } from '$lib/firebase';
    import { user } from '$lib/store';
    import { onAuthStateChanged } from 'firebase/auth';

    onMount(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            user.set(firebaseUser);
        });

        return () => unsubscribe();
    });
</script>

<slot />
