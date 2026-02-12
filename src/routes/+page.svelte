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

</svelte:head>

<section>
	<main>
		<div class="w3-content" style="max-width: 768px">
			<main class="w3-container">
				<div class="w3-margin-top w3-margin-bottom">
					<RecentPuddle puddle={data.recentPuddle} />
				</div>

				{#if $user}
					<div class="w3-margin-top">
						<UploadForm />
						<button
							on:click={() => signOut(auth)}
							class="w3-button w3-red w3-round-large w3-margin-top w3-margin-bottom w3-auto"
							style="display:block;">Sign out</button
						>
					</div>
				{:else}
					<div
						class="w3-panel w3-card-4 w3-theme-l1 w3-round-large w3-center w3-padding w3-margin-top"
					>
						<h1>Rate My Puddle</h1>
						<p>
							The world's most ridiculous platform for puddle enthusiasts. See a puddle? Snap it,
							upload it, and let our AI connoisseur rate its quality.
						</p>
						<Login />
					</div>
				{/if}
			</main>
		</div>
	</main>
</section>

