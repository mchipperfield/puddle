<script lang="ts">
    import '../app.css';
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

<!-- Page container -->
<div class="w3-auto w3-theme-l4">
    <!-- Navigation -->
    <nav class="w3-bar w3-theme-d2">
        <a href="/browse" class="w3-bar-item w3-button w3-right">Browse</a>
        <a href="/" class="w3-bar-item w3-button w3-right">Rate</a>
    </nav>

    <!-- Main -->
     <main class="w3-content w3-container w3-theme-l4 w3-padding w3-mobile">
        <slot />
     </main>

    <!-- Footer -->
    <footer class="w3-container w3-theme-d2 w3-margin-top w3-padding w3-cell-row">
            <div class="w3-panel w3-leftbar w3-theme-l4 w3-left w3-mobile w3-round-xlarge">
                <p class="w3-serif"><i>"Inspired by Victoria..."</i></p>
            </div>
            <div class="w3-panel w3-small w3-right-align w3-right w3-mobile">
                <span>&copy; 2026 Matthew Chipperfield</span>
                <address>
                    <a href="https://github.com/mchipperfield/puddle">https://github.com/mchipperfield/puddle</a><br />
                    <a href="https://ratemypuddle.app">ratemypuddle.app</a>
                </address>
            </div>
    </footer>

</div>