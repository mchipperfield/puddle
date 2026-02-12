<script lang="ts">
	export let puddle: {
		imageUrl: string;
		rating: string;
		userName: string;
		createdAt: string;
	} | null = null;
</script>

<div class="w3-card w3-round-large w3-center">
	<header class="w3-container w3-light-grey">
		<h3>Most Recent Puddle</h3>
	</header>
	<div class="w3-container w3-padding">
		{#if puddle}
			<div>
				<img src={puddle.imageUrl} alt="Recent Puddle" class="w3-image w3-round-large" />
				<div class="w3-margin-top">
					<p class="w3-large w3-serif"><i>"{puddle.rating}"</i></p>
					<p class="w3-opacity">by {puddle.userName}</p>
					<p class="w3-opacity">Uploaded on: {new Date(puddle.createdAt).toLocaleDateString()}</p>
				</div>
			</div>
		{:else}
			<p>No puddles have been uploaded yet.</p>
		{/if}
	</div>
</div>
