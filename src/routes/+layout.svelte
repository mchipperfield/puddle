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

<slot />


	<!-- Footer -->
<footer class="w3-container w3-margin-top w3-padding">
		<div style="display: flex; justify-content: space-between; align-items: center;">
			<div class="w3-panel w3-leftbar w3-light-grey w3-padding">
				<p class="w3-serif"><i>"For Victoria..."</i></p>
			</div>
			<div class="w3-small w3-right-align">
				<span>&copy; 2026 Matthew Chipperfield</span>
				<address>
					<a href="https://github.com/mchipperfield/puddle">https://github.com/mchipperfield/puddle</a><br />
					<a href="https://ratethispuddle.com">ratethispuddle.com</a>
				</address>
			</div>
		</div>
	</footer>